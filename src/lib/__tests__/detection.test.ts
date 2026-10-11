import { describe, it, expect, vi } from 'vitest';
import {
  detectDisease,
  urgencyFromConfidence,
  evaluatePixelBuffer,
} from '../detection';
import { SAMPLE_CROP_IMAGE } from '../mockData';
import { supabase } from '../supabase';

vi.mock('../supabase', () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
  },
}));

describe('Detection Layer & Removal of Fabricated Outcomes', () => {
  it('explicitly identifies sample crop tests as demonstration samples with diagnosticTier', async () => {
    const result = await detectDisease(SAMPLE_CROP_IMAGE, undefined, { isDemoSample: true });

    expect(result.detected).toBe(true);
    if (result.detected) {
      expect(result.isDemoSample).toBe(true);
      expect(result.cropId).toBe('crop-rice');
      expect(result.diseaseId).toBe('disease-rice-blast');
      expect(result.normalizedDiagnosis?.metadata.isDemoSample).toBe(true);
      expect(result.normalizedDiagnosis?.metadata.provider).toBe('demo');
      expect(result.normalizedDiagnosis?.diagnosticTier).toBe('demonstration_sample');
      expect(result.normalizedDiagnosis?.userFacingMessageEn).toContain('Demonstration sample');
    }
  });

  it('correctly maps abiotic stress response from gateway', async () => {
    vi.mocked(supabase!.functions.invoke).mockResolvedValueOnce({
      data: {
        success: true,
        rawResult: {
          status: 'abiotic_stress',
          cropId: 'crop-rice',
          cropNameEn: 'Paddy / Rice',
          visualSymptoms: ['Leaf tip scorching from drought'],
        },
      },
      error: null,
    });

    const result = await detectDisease('data:image/jpeg;base64,realImage', 'realImage');
    expect(result.detected).toBe(false);
    if (!result.detected) {
      expect(result.reason).toBe('abiotic_stress');
      expect(result.normalizedDiagnosis?.status).toBe('abiotic_stress');
      expect(result.normalizedDiagnosis?.conditionAssessment.conditionType).toBe('abiotic');
    }
  });

  it('correctly maps nutrient deficiency response from gateway', async () => {
    vi.mocked(supabase!.functions.invoke).mockResolvedValueOnce({
      data: {
        success: true,
        rawResult: {
          status: 'nutrient_deficiency',
          cropId: 'crop-maize',
          cropNameEn: 'Maize',
          visualSymptoms: ['Zinc deficiency chlorosis'],
        },
      },
      error: null,
    });

    const result = await detectDisease('data:image/jpeg;base64,realImage', 'realImage');
    expect(result.detected).toBe(false);
    if (!result.detected) {
      expect(result.reason).toBe('nutrient_deficiency');
      expect(result.normalizedDiagnosis?.status).toBe('nutrient_deficiency');
      expect(result.normalizedDiagnosis?.conditionAssessment.conditionType).toBe('nutrient_deficiency');
    }
  });


  it('maps urgency color predictably without relying on random scores', () => {
    expect(urgencyFromConfidence(0.8)).toBe('red');
    expect(urgencyFromConfidence(0.5)).toBe('yellow');
    expect(urgencyFromConfidence(0.2)).toBe('green');
    expect(urgencyFromConfidence(undefined)).toBe('yellow');
  });

  it('evaluates pixel buffer and rejects solid non-plant backgrounds', () => {
    // 64x64 white background (solid background)
    const size = 64;
    const data = new Uint8ClampedArray(size * size * 4);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 250;     // R
      data[i + 1] = 250; // G
      data[i + 2] = 250; // B
      data[i + 3] = 255; // A
    }

    const evalResult = evaluatePixelBuffer(data, size, size);
    expect(evalResult.isCrop).toBe(false);
    expect(evalResult.reason).toBe('not_crop');
  });

  it('evaluates pixel buffer and rejects artificial graphics', () => {
    const size = 64;
    const data = new Uint8ClampedArray(size * size * 4);
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 200;     // R
      data[i + 1] = 20;  // G
      data[i + 2] = 200; // B (artificial magenta)
      data[i + 3] = 255;
    }

    const evalResult = evaluatePixelBuffer(data, size, size);
    expect(evalResult.isCrop).toBe(false);
    expect(evalResult.reason).toBe('not_crop');
  });

  it('accepts necrotic brown foliage lesions with natural leaf texture', () => {
    // 64x64 textured brown/tan necrotic blast lesion
    const size = 64;
    const data = new Uint8ClampedArray(size * size * 4);
    for (let i = 0; i < data.length; i += 4) {
      const noise = (i % 37); // Natural variation
      data[i] = 120 + noise;     // R (brownish)
      data[i + 1] = 70 + (noise / 2); // G (not dominantly green)
      data[i + 2] = 30;          // B
      data[i + 3] = 255;
    }

    const evalResult = evaluatePixelBuffer(data, size, size);
    expect(evalResult.isCrop).toBe(true);
  });

  it('accepts cotton bolls and yellow chlorosis with photographic variance', () => {
    const size = 64;
    const data = new Uint8ClampedArray(size * size * 4);
    for (let i = 0; i < data.length; i += 4) {
      const gradient = Math.floor(i / 16) % 50;
      data[i] = 200 + gradient;     // High brightness / cotton white
      data[i + 1] = 200 + gradient;
      data[i + 2] = 180;
      data[i + 3] = 255;
    }

    const evalResult = evaluatePixelBuffer(data, size, size);
    expect(evalResult.isCrop).toBe(true);
  });

  it('rejects completely blank or transparent canvas captures', () => {
    const size = 64;
    const data = new Uint8ClampedArray(size * size * 4); // all zeros (transparent / blank)
    const evalResult = evaluatePixelBuffer(data, size, size);
    expect(evalResult.isCrop).toBe(false);
    expect(evalResult.reason).toBe('unclear');
  });

  it('returns safe provider_unavailable result when gateway is unreachable', async () => {
    vi.mocked(supabase!.functions.invoke).mockRejectedValueOnce(
      new Error('Edge function gateway unreachable (simulated network failure)')
    );
    const result = await detectDisease('data:image/jpeg;base64,realImagePayload', 'realImagePayload');

    expect(result.detected).toBe(false);
    if (!result.detected) {
      expect(result.reason).toBe('provider_unavailable');
      expect(result.messageEn).toContain('unavailable');
      expect(result.messageTe).toBeTruthy();
    }
  });
});
