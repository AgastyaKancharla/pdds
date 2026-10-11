/**
 * AGASTYAONE AGRICULTURE — PDDs
 * Application-Owned Versioned AI Diagnostic Response Schema & Types
 * Version: 1.0.0
 */

export type DiagnosticStatus =
  | 'supported_diagnosis'
  | 'uncertain'
  | 'unsupported_crop'
  | 'unsupported_disease'
  | 'abiotic_stress'
  | 'nutrient_deficiency'
  | 'not_plant'
  | 'unusable_image'
  | 'provider_unavailable'
  | 'expert_assessment_required';

export type ConditionType = 'disease' | 'pest' | 'healthy' | 'abiotic' | 'nutrient_deficiency' | 'unknown';

export interface PlantIdentification {
  identified: boolean;
  cropId?: string;
  cropNameEn?: string;
  cropNameTe?: string;
  botanicalName?: string;
}

export interface DifferentialHypothesis {
  conditionName?: string;
  conditionNameEn?: string;
  conditionNameTe?: string;
  distinguishingFeaturesEn?: string;
  distinguishingFeaturesTe?: string;
  likelihood?: string;
  reasoning?: string;
  isAbiotic?: boolean;
}

export interface ImageQualityAssessment {
  assessable: boolean;
  issues?: ('blurry' | 'dark' | 'overexposed' | 'too_distant' | 'glare' | 'low_resolution')[];
}

export interface ConditionAssessment {
  conditionType: ConditionType;
  diseaseId?: string;
  diseaseNameEn?: string;
  diseaseNameTe?: string;
  visualSymptoms: string[];
  urgencyColor: 'red' | 'yellow' | 'green';
  differentialHypotheses?: DifferentialHypothesis[];
}

export interface DiagnosticMetadata {
  provider: string;
  model: string;
  latencyMs?: number;
  timestamp: string;
  isDemoSample?: boolean;
}

export type DiagnosticTier =
  | 'ai_preliminary_hypothesis'
  | 'demonstration_sample'
  | 'expert_confirmed'
  | 'legacy_or_unknown';

export interface ExpertReviewRecord {
  reviewedBy: string;
  reviewerRole: 'agronomist' | 'pathologist' | 'extension_officer';
  institution: string;
  reviewTimestamp: string;
  confirmationOutcome: 'confirmed' | 'rejected' | 'modified';
  notes?: string;
}

export interface NormalizedDiagnosis {
  schemaVersion: '1.0.0';
  status: DiagnosticStatus;
  diagnosticTier: DiagnosticTier;
  provenance?: {
    tier: DiagnosticTier;
    expertReview?: ExpertReviewRecord;
  };
  expertReview?: ExpertReviewRecord;
  plantIdentification: PlantIdentification;
  conditionAssessment: ConditionAssessment;
  imageQuality?: ImageQualityAssessment;
  differentialHypotheses?: DifferentialHypothesis[];
  limitations: string[];
  recommendedActions: string[];
  evidenceReferences: string[];
  metadata: DiagnosticMetadata;
  userFacingMessageEn: string;
  userFacingMessageTe: string;
}

export interface AiInferenceRequest {
  imageBase64: string;
  mimeType?: string;
  task?: 'crop_disease_diagnosis';
  cropHint?: string;
}

export interface AiInferenceResponse {
  success: boolean;
  diagnosis?: NormalizedDiagnosis;
  error?: {
    code: string;
    messageEn: string;
    messageTe: string;
    retryable: boolean;
  };
}

export interface AiProviderAdapter {
  readonly providerId: string;
  readonly modelId: string;
  diagnose(request: AiInferenceRequest): Promise<AiInferenceResponse>;
}
