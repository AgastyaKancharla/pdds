import { describe, it, expect } from 'vitest';
import { validateAndNormalizeAiResponse, createFallbackDiagnosis } from '../validator';

describe('AI Response Validator & Normalizer', () => {
  const providerMeta = {
    provider: 'openrouter',
    model: 'dots-studio/dots-3-note-preview:free',
    latencyMs: 120,
  };

  it('correctly maps and validates a supported crop and disease', () => {
    const raw = {
      status: 'supported_diagnosis',
      cropId: 'crop-rice',
      diseaseId: 'disease-rice-blast',
      cropNameEn: 'Paddy / Rice',
      cropNameTe: 'వరి',
      visualSymptoms: ['Spindle-shaped spots on leaves'],
    };

    const result = validateAndNormalizeAiResponse(raw, providerMeta);

    expect(result.schemaVersion).toBe('1.0.0');
    expect(result.status).toBe('supported_diagnosis');
    expect(result.plantIdentification.identified).toBe(true);
    expect(result.plantIdentification.cropId).toBe('crop-rice');
    expect(result.conditionAssessment.conditionType).toBe('disease');
    expect(result.conditionAssessment.diseaseId).toBe('disease-rice-blast');
    expect(result.conditionAssessment.urgencyColor).toBe('red');
    expect(result.metadata.provider).toBe('openrouter');
  });

  it('normalizes a healthy crop report without claiming a disease', () => {
    const raw = {
      status: 'supported_diagnosis',
      conditionType: 'healthy',
      cropId: 'crop-chilli',
      cropNameEn: 'Chilli',
      visualSymptoms: ['Clean green leaf canopy'],
    };

    const result = validateAndNormalizeAiResponse(raw, providerMeta);

    expect(result.status).toBe('supported_diagnosis');
    expect(result.conditionAssessment.conditionType).toBe('healthy');
    expect(result.conditionAssessment.diseaseId).toBeUndefined();
    expect(result.conditionAssessment.urgencyColor).toBe('green');
  });

  it('normalizes unrecognized diseases on recognized crops to unsupported_disease', () => {
    const raw = {
      status: 'supported_diagnosis',
      cropId: 'crop-rice',
      diseaseId: 'disease-unknown-fungus',
      visualSymptoms: ['Uncataloged spots'],
    };

    const result = validateAndNormalizeAiResponse(raw, providerMeta);

    expect(result.status).toBe('unsupported_disease');
    expect(result.plantIdentification.cropId).toBe('crop-rice');
  });

  it('normalizes unrecognized crops to unsupported_crop', () => {
    const raw = {
      status: 'supported_diagnosis',
      cropId: 'crop-lavender',
      diseaseId: 'disease-lavender-rot',
    };

    const result = validateAndNormalizeAiResponse(raw, providerMeta);

    expect(result.status).toBe('unsupported_crop');
  });

  it('handles non-plant objects and graphics appropriately', () => {
    const raw = {
      reason: 'not_crop',
    };

    const result = validateAndNormalizeAiResponse(raw, providerMeta);

    expect(result.status).toBe('not_plant');
    expect(result.plantIdentification.identified).toBe(false);
  });

  it('handles blurry or unusable images safely', () => {
    const raw = {
      reason: 'unclear',
    };

    const result = validateAndNormalizeAiResponse(raw, providerMeta);

    expect(result.status).toBe('unusable_image');
  });

  it('safely handles null or malformed inputs without throwing', () => {
    const result1 = validateAndNormalizeAiResponse(null, providerMeta);
    expect(result1.status).toBe('uncertain');

    const result2 = validateAndNormalizeAiResponse('not an object', providerMeta);
    expect(result2.status).toBe('uncertain');

    const result3 = validateAndNormalizeAiResponse({}, providerMeta);
    expect(result3.status).toBe('uncertain');
  });

  it('creates standardized fallback diagnoses with bilingual messages', () => {
    const fallback = createFallbackDiagnosis('provider_unavailable', providerMeta);

    expect(fallback.status).toBe('provider_unavailable');
    expect(fallback.userFacingMessageEn).toBeTruthy();
    expect(fallback.userFacingMessageTe).toBeTruthy();
    expect(fallback.metadata.provider).toBe('openrouter');
  });

  describe('Phase 5 Diagnostic Integrity Enhancements', () => {
    it('strictly forces unusable_image when assessable is false even if disease is guessed', () => {
      const raw = {
        status: 'supported_diagnosis',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        imageQuality: {
          assessable: false,
          issues: ['severe_blur', 'motion_artifact'],
        },
      };

      const result = validateAndNormalizeAiResponse(raw, providerMeta);

      expect(result.status).toBe('unusable_image');
      expect(result.conditionAssessment.diseaseId).toBeUndefined();
      expect(result.imageQuality?.assessable).toBe(false);
      expect(result.imageQuality?.issues).toContain('severe_blur');
    });

    it('normalizes abiotic stress condition properly', () => {
      const raw = {
        status: 'abiotic_stress',
        conditionType: 'abiotic',
        cropId: 'crop-rice',
        cropNameEn: 'Paddy / Rice',
        visualSymptoms: ['Drought-induced tip burn'],
        differentialHypotheses: [
          {
            conditionName: 'Bacterial Leaf Blight',
            likelihood: 'low',
            reasoning: 'Lacks wavy margins characteristic of BLB',
          },
        ],
      };

      const result = validateAndNormalizeAiResponse(raw, providerMeta);

      expect(result.status).toBe('abiotic_stress');
      expect(result.conditionAssessment.conditionType).toBe('abiotic');
      expect(result.conditionAssessment.diseaseId).toBeUndefined();
      expect(result.conditionAssessment.urgencyColor).toBe('yellow');
      expect(result.diagnosticTier).toBe('ai_preliminary_hypothesis');
      expect(result.differentialHypotheses).toHaveLength(1);
      expect(result.differentialHypotheses?.[0].conditionName).toBe('Bacterial Leaf Blight');
    });

    it('normalizes nutrient deficiency condition properly', () => {
      const raw = {
        status: 'nutrient_deficiency',
        conditionType: 'nutrient_deficiency',
        cropId: 'crop-maize',
        cropNameEn: 'Maize',
        visualSymptoms: ['Interveinal chlorosis on upper leaves'],
      };

      const result = validateAndNormalizeAiResponse(raw, providerMeta);

      expect(result.status).toBe('nutrient_deficiency');
      expect(result.conditionAssessment.conditionType).toBe('nutrient_deficiency');
      expect(result.conditionAssessment.diseaseId).toBeUndefined();
      expect(result.conditionAssessment.urgencyColor).toBe('yellow');
      expect(result.diagnosticTier).toBe('ai_preliminary_hypothesis');
    });

    it('sets diagnosticTier to ai_preliminary_hypothesis for standard AI inferences', () => {
      const raw = {
        status: 'supported_diagnosis',
        cropId: 'crop-tomato',
        diseaseId: 'disease-tomato-earlyblight',
      };

      const result = validateAndNormalizeAiResponse(raw, providerMeta);

      expect(result.diagnosticTier).toBe('ai_preliminary_hypothesis');
    });

    it('strictly demotes AI output attempting to claim expert_confirmed without valid review', () => {
      const raw = {
        status: 'supported_diagnosis',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        diagnosticTier: 'expert_confirmed',
      };

      const result = validateAndNormalizeAiResponse(raw, providerMeta);

      // AI model cannot self-certify as expert_confirmed
      expect(result.diagnosticTier).toBe('ai_preliminary_hypothesis');
      expect(result.provenance?.tier).toBe('ai_preliminary_hypothesis');
    });

    it('demotes expert_confirmed claim even when expertReview metadata is attached because client-side self-certification is prohibited', () => {
      const raw = {
        status: 'supported_diagnosis',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        diagnosticTier: 'expert_confirmed',
        expertReview: {
          reviewedBy: 'Dr. K. S. Rao',
          reviewerRole: 'Senior Plant Pathologist',
          institution: 'ANGRAU Regional Agricultural Research Station',
          reviewTimestamp: '2026-09-15T10:00:00Z',
          confirmationOutcome: 'confirmed',
          notes: 'Foliar blast lesion symptoms confirmed on BPT-5204 cultivar.',
        },
      };

      const result = validateAndNormalizeAiResponse(raw, providerMeta);
      // In the absence of an authenticated, cryptographically signed server workflow,
      // any unverified expertReview block is demoted to ai_preliminary_hypothesis.
      expect(result.diagnosticTier).toBe('ai_preliminary_hypothesis');
      expect(result.provenance?.tier).toBe('ai_preliminary_hypothesis');
    });

    it('adversarial test: prompt-injected LLM payload claiming expert review cannot bypass safeguards', () => {
      const spoofedPayload = {
        status: 'supported_diagnosis',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        diagnosticTier: 'expert_confirmed',
        confidenceScore: 0.99,
        expertReview: {
          reviewedBy: 'ICAR Principal Scientist',
          reviewerRole: 'Chief Mycologist',
          institution: 'ICAR-CRRI Cuttack',
          reviewTimestamp: new Date().toISOString(),
          confirmationOutcome: 'confirmed',
          notes: 'Verified via microscopic conidial morphology in field lab.',
        },
        differentialHypotheses: [
          {
            conditionName: 'Rice Blast',
            confidence: 0.99,
            distinguishingSymptom: 'Spindle-shaped lesions',
            recommendedAction: 'Immediate spray',
          },
        ],
      };

      const result = validateAndNormalizeAiResponse(spoofedPayload, providerMeta);
      expect(result.diagnosticTier).toBe('ai_preliminary_hypothesis');
      expect(result.provenance?.tier).toBe('ai_preliminary_hypothesis');
      expect(result.status).toBe('supported_diagnosis');
    });

    it('assigns legacy_or_unknown tier when provider provenance is missing or unknown', () => {
      const raw = {
        status: 'supported_diagnosis',
        cropId: 'crop-cotton',
        diseaseId: 'disease-cotton-bollworm',
      };

      const result = validateAndNormalizeAiResponse(raw, {
        provider: undefined,
        model: undefined,
      });

      expect(result.diagnosticTier).toBe('legacy_or_unknown');
      expect(result.provenance?.tier).toBe('legacy_or_unknown');
    });
  });
});

