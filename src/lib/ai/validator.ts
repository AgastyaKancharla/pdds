import type {
  DiagnosticStatus,
  NormalizedDiagnosis,
  ConditionType,
  DifferentialHypothesis,
  DiagnosticTier,
  ExpertReviewRecord,
} from './types';
import { MOCK_CROPS, MOCK_DISEASES } from '../mockData';
import { getDiseaseKnowledge } from '../knowledge';

export interface RawAiOutput {
  status?: string;
  cropId?: string;
  cropNameEn?: string;
  diseaseId?: string;
  diseaseNameEn?: string;
  conditionType?: string;
  urgencyColor?: string;
  visualSymptoms?: string[];
  limitations?: string[];
  recommendedActions?: string[];
  userFacingMessageEn?: string;
  reason?: string;
  imageQuality?: {
    assessable?: boolean;
    issues?: ('blurry' | 'dark' | 'overexposed' | 'too_distant' | 'glare' | 'low_resolution')[];
  };
  differentialHypotheses?: DifferentialHypothesis[];
  diagnosticTier?: DiagnosticTier;
  expertReview?: ExpertReviewRecord;
}

const VALID_STATUSES: Set<DiagnosticStatus> = new Set([
  'supported_diagnosis',
  'uncertain',
  'unsupported_crop',
  'unsupported_disease',
  'abiotic_stress',
  'nutrient_deficiency',
  'not_plant',
  'unusable_image',
  'provider_unavailable',
  'expert_assessment_required',
]);

export function validateAndNormalizeAiResponse(
  raw: unknown,
  providerMeta: { provider?: string; model?: string; latencyMs?: number; isDemoSample?: boolean } = {}
): NormalizedDiagnosis {
  const timestamp = new Date().toISOString();

  if (!raw || typeof raw !== 'object') {
    return createFallbackDiagnosis('uncertain', providerMeta, {
      messageEn: 'Unable to parse diagnostic response from AI provider.',
      limitations: ['Malformed response from upstream model.'],
    });
  }

  const data = raw as RawAiOutput;

  // Normalize status
  let status: DiagnosticStatus = 'uncertain';
  if (data.status && VALID_STATUSES.has(data.status as DiagnosticStatus)) {
    status = data.status as DiagnosticStatus;
  } else if (data.reason === 'not_crop' || data.reason === 'not_plant') {
    status = 'not_plant';
  } else if (data.reason === 'unclear' || data.reason === 'unusable_image') {
    status = 'unusable_image';
  } else if (data.reason === 'healthy') {
    status = 'supported_diagnosis';
  } else if (data.reason === 'abiotic_stress' || data.reason === 'abiotic') {
    status = 'abiotic_stress';
  } else if (data.reason === 'nutrient_deficiency') {
    status = 'nutrient_deficiency';
  } else if (data.reason === 'unsupported_crop') {
    status = 'unsupported_crop';
  } else if (data.cropId && data.diseaseId) {
    status = 'supported_diagnosis';
  }

  // Quality Enforcement: If image is explicitly flagged unassessable, reject regardless of diagnosis guess
  if (data.imageQuality && data.imageQuality.assessable === false) {
    status = 'unusable_image';
  }

  // Validate crop & disease references if claimed as supported
  let matchedCrop = data.cropId ? MOCK_CROPS.find((c) => c.id === data.cropId) : undefined;
  let matchedDisease = data.diseaseId ? MOCK_DISEASES.find((d) => d.id === data.diseaseId) : undefined;

  // Condition type normalization
  let conditionType: ConditionType = 'unknown';
  if (data.conditionType === 'healthy' || data.reason === 'healthy') {
    conditionType = 'healthy';
  } else if (data.conditionType === 'abiotic' || status === 'abiotic_stress') {
    conditionType = 'abiotic';
  } else if (data.conditionType === 'nutrient_deficiency' || status === 'nutrient_deficiency') {
    conditionType = 'nutrient_deficiency';
  } else if (data.conditionType === 'pest' || (matchedDisease && matchedDisease.type.toLowerCase().includes('pest'))) {
    conditionType = 'pest';
  } else if (data.conditionType === 'disease' || matchedDisease) {
    conditionType = 'disease';
  }

  // Urgency color validation
  let urgencyColor: 'red' | 'yellow' | 'green' = 'yellow';
  if (conditionType === 'healthy') {
    urgencyColor = 'green';
  } else if (conditionType === 'abiotic' || conditionType === 'nutrient_deficiency') {
    urgencyColor = 'yellow';
  } else if (matchedDisease?.urgency_color) {
    urgencyColor = matchedDisease.urgency_color;
  } else if (data.urgencyColor === 'red' || data.urgencyColor === 'green' || data.urgencyColor === 'yellow') {
    urgencyColor = data.urgencyColor;
  }

  // If status is supported_diagnosis but neither crop nor disease matches our validated registry
  if (status === 'supported_diagnosis' && conditionType !== 'healthy' && (!matchedCrop || !matchedDisease)) {
    // If crop is known but disease is not in catalog
    if (matchedCrop && !matchedDisease) {
      status = 'unsupported_disease';
    } else {
      status = 'unsupported_crop';
    }
  }

  const knowledgeEntry = matchedDisease ? getDiseaseKnowledge(matchedDisease.id) : null;

  const symptoms = Array.isArray(data.visualSymptoms) && data.visualSymptoms.length > 0
    ? data.visualSymptoms.map(String)
    : matchedDisease ? [matchedDisease.symptoms_en] : [];

  const limitations = Array.isArray(data.limitations) && data.limitations.length > 0
    ? data.limitations.map(String)
    : [
        'Single photograph visual assessment only.',
        'Environmental stress, root pathology, and soil chemistry cannot be verified without physical soil testing.',
      ];

  if (
    (knowledgeEntry?.evidenceStatus === 'provisional' ||
      knowledgeEntry?.evidenceStatus === 'unverified' ||
      knowledgeEntry?.evidenceStatus === 'conflicting') &&
    !limitations.some((l) => l.toLowerCase().includes('reference') || l.toLowerCase().includes('validation'))
  ) {
    if (knowledgeEntry.evidenceStatus === 'conflicting') {
      limitations.push('Conflicting evidence reference: chemical treatments are disproven or disputed by biosecurity authorities.');
    } else {
      limitations.push('Provisional / unverified reference: multi-season field validation in progress with local research stations.');
    }
  }

  const actions = Array.isArray(data.recommendedActions) && data.recommendedActions.length > 0
    ? data.recommendedActions.map(String)
    : [
        'Inspect surrounding crop rows for similar foliar patterns.',
        'Consult with your local Rythu Bharosa Kendra (RBK) or Agriculture Extension Officer prior to chemical application.',
      ];

  const userFacingMessageEn = data.userFacingMessageEn || getDefaultMessageEn(status, matchedCrop?.name_en);

  // Strict Provenance Guardrails (Phase 5.2 Priority 1):
  // 1. If flagged demo sample, it is strictly 'demonstration_sample'.
  // 2. CRITICAL SECURITY GUARDRAIL: No trusted, server-authenticated expert-review workflow
  //    exists in the application today.
  //    Neither an incoming model response, nor a client payload, nor a cached/legacy object
  //    can obtain 'expert_confirmed' status. Any attempt by an unverified response to inject
  //    expertReview credentials or self-certify as expert_confirmed is strictly demoted to
  //    'ai_preliminary_hypothesis' (or 'legacy_or_unknown' if provider metadata is missing).
  // 3. Missing or legacy provider provenance is strictly marked 'legacy_or_unknown'.
  let diagnosticTier: DiagnosticTier = 'ai_preliminary_hypothesis';
  const expertReview: ExpertReviewRecord | undefined = undefined;

  if (providerMeta.isDemoSample || providerMeta.provider === 'demo') {
    diagnosticTier = 'demonstration_sample';
  } else if (!providerMeta.provider || providerMeta.provider === 'legacy' || providerMeta.provider === 'unknown') {
    diagnosticTier = 'legacy_or_unknown';
  } else {
    diagnosticTier = 'ai_preliminary_hypothesis';
  }

  return {
    schemaVersion: '1.0.0',
    status,
    diagnosticTier,
    provenance: {
      tier: diagnosticTier,
      expertReview,
    },
    expertReview,
    plantIdentification: {
      identified: !!matchedCrop || !!data.cropNameEn,
      cropId: matchedCrop?.id || data.cropId,
      cropNameEn: matchedCrop?.name_en || data.cropNameEn,
    },
    conditionAssessment: {
      conditionType,
      diseaseId: (status === 'supported_diagnosis' && conditionType !== 'healthy')
        ? (matchedDisease?.id || data.diseaseId)
        : undefined,
      diseaseNameEn: conditionType === 'healthy'
        ? 'Healthy Crop'
        : (status === 'supported_diagnosis' ? (matchedDisease?.name_en || data.diseaseNameEn) : undefined),
      visualSymptoms: symptoms,
      urgencyColor,
      differentialHypotheses: data.differentialHypotheses,
    },
    imageQuality: data.imageQuality
      ? {
          assessable: data.imageQuality.assessable ?? true,
          issues: data.imageQuality.issues,
        }
      : undefined,
    differentialHypotheses: data.differentialHypotheses,
    limitations,
    recommendedActions: actions,
    evidenceReferences: knowledgeEntry?.sources?.length
      ? knowledgeEntry.sources.map((s) => `${s.title} (${s.organization})`)
      : [
          'Vyavasaya Panchangam (ANGRAU)',
          'ICAR Crop Protection Advisory Guidelines',
        ],
    metadata: {
      provider: providerMeta.provider || 'unknown',
      model: providerMeta.model || 'unknown',
      latencyMs: providerMeta.latencyMs,
      timestamp,
      isDemoSample: providerMeta.isDemoSample ?? false,
    },
    userFacingMessageEn,
  };
}

export function createFallbackDiagnosis(
  status: DiagnosticStatus,
  providerMeta: { provider?: string; model?: string; latencyMs?: number; isDemoSample?: boolean } = {},
  custom?: { messageEn?: string; limitations?: string[] }
): NormalizedDiagnosis {
  const diagnosticTier: DiagnosticTier = providerMeta.isDemoSample
    ? 'demonstration_sample'
    : (!providerMeta.provider || providerMeta.provider === 'legacy' || providerMeta.provider === 'unknown')
    ? 'legacy_or_unknown'
    : 'ai_preliminary_hypothesis';

  return {
    schemaVersion: '1.0.0',
    status,
    diagnosticTier,
    provenance: {
      tier: diagnosticTier,
    },
    plantIdentification: {
      identified: false,
    },
    conditionAssessment: {
      conditionType: 'unknown',
      visualSymptoms: [],
      urgencyColor: 'yellow',
    },
    limitations: custom?.limitations || ['Automated diagnostic assessment could not be completed.'],
    recommendedActions: [
      'Take a clear, close-up photograph in natural daylight focused on the affected foliage.',
      'Consult a local agricultural extension officer.',
    ],
    evidenceReferences: ['ICAR Crop Protection Advisory Guidelines'],
    metadata: {
      provider: providerMeta.provider || 'unknown',
      model: providerMeta.model || 'unknown',
      latencyMs: providerMeta.latencyMs,
      timestamp: new Date().toISOString(),
      isDemoSample: providerMeta.isDemoSample ?? false,
    },
    userFacingMessageEn: custom?.messageEn || getDefaultMessageEn(status),
  };
}

function getDefaultMessageEn(status: DiagnosticStatus, cropName?: string): string {
  switch (status) {
    case 'not_plant':
      return 'The uploaded image appears to be a graphic, document, or non-plant object. Please photograph a crop leaf.';
    case 'unusable_image':
      return 'The photograph is unclear or out of focus. Please capture a sharp photo in good daylight.';
    case 'unsupported_crop':
      return cropName
        ? `We identified this crop as ${cropName}, but remedies are not yet cataloged for this crop.`
        : 'The plant in this image is not yet supported in the current catalog.';
    case 'unsupported_disease':
      return cropName
        ? `The crop is recognized as ${cropName}, but this specific condition is not in our database. Please contact your local agricultural officer.`
        : 'This specific condition is not in our database.';
    case 'abiotic_stress':
      return 'Symptoms appear consistent with weather, moisture, or environmental stress rather than an infectious disease. Inspect field drainage and sunlight.';
    case 'nutrient_deficiency':
      return 'Symptoms appear consistent with nutrient deficiency rather than an infectious disease. Soil/tissue testing is recommended before applying remedies.';
    case 'provider_unavailable':
      return 'The AI diagnostic service is currently unavailable. Please check your connectivity and retry.';
    case 'expert_assessment_required':
      return 'Symptoms appear ambiguous or severe. Physical inspection by an Agricultural Extension Officer is recommended.';
    case 'supported_diagnosis':
      return 'Preliminary AI diagnostic observation completed.';
    case 'uncertain':
    default:
      return 'Unable to determine plant health with certainty. Please capture a clearer photograph.';
  }
}

