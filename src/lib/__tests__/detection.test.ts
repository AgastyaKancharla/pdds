import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  detectDisease,
  urgencyFromConfidence,
  evaluatePixelBuffer,
  isAiLiveDiagnosisEnabled,
  __setAiLiveDiagnosisEnabledForTests,
} from '../detection';
import { SAMPLE_CROP_IMAGE } from '../mockData';
import { supabase } from '../supabase';
import { translate } from '../i18n';
import * as onDeviceRegistry from '../ai/onDeviceRegistry';

vi.mock('../supabase', () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
  },
}));

vi.mock('../ai/onDeviceRegistry', () => ({
  hasOnDeviceModel: vi.fn(() => false),
  classifyWithOnDeviceModel: vi.fn(),
}));

describe('Detection Layer & Removal of Fabricated Outcomes', () => {
  // 2026-10-18: the cloud gateway was turned on for real (a funded OPENROUTER_API_KEY was
  // configured) -- see detection.ts's doc comment on aiLiveDiagnosisEnabled. Tests reset to
  // that real default here, and the small number that specifically exercise the "paused"
  // killswitch opt out of it explicitly and restore it afterward via the test-only seam.
  beforeEach(() => {
    __setAiLiveDiagnosisEnabledForTests(true);
    vi.mocked(onDeviceRegistry.hasOnDeviceModel).mockReturnValue(false);
    vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockReset();
  });
  afterEach(() => {
    __setAiLiveDiagnosisEnabledForTests(true);
  });

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
    __setAiLiveDiagnosisEnabledForTests(true); // exercising gateway-dispatch logic directly
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
    __setAiLiveDiagnosisEnabledForTests(true); // exercising gateway-dispatch logic directly
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

  describe('Live AI diagnosis enabled (current production default)', () => {
    it('exposes the enabled state via the read-only UI getter, and the killswitch still works via the test-only seam', () => {
      // ScanScreen reads this to warn the farmer BEFORE they take a photo if it's ever
      // disabled again, rather than after they wait through the "analyzing" spinner.
      expect(isAiLiveDiagnosisEnabled()).toBe(true);
      __setAiLiveDiagnosisEnabledForTests(false);
      expect(isAiLiveDiagnosisEnabled()).toBe(false);
      __setAiLiveDiagnosisEnabledForTests(true);
      expect(isAiLiveDiagnosisEnabled()).toBe(true);
    });

    it('has a real, non-empty bilingual banner string ready for the Scan screen to render if paused again', () => {
      const en = translate('aiScanningPausedBanner', 'en');
      const te = translate('aiScanningPausedBanner', 'te');
      expect(en.toLowerCase()).toContain('paused');
      expect(en).toContain('Rythu Bharosa Kendra');
      expect(te).toContain('రైతు భరోసా కేంద్రం');
      expect(en).not.toBe(te);
    });

    it('does call the gateway for a real (non-demo) scan now that the cloud path is enabled', async () => {
      const invokeSpy = vi.mocked(supabase!.functions.invoke);
      invokeSpy.mockResolvedValueOnce({
        data: { success: false },
        error: null,
      });

      await detectDisease('data:image/jpeg;base64,realImagePayload', 'realImagePayload');

      expect(invokeSpy).toHaveBeenCalledTimes(1);
    });

    it('still refuses a scan without calling the gateway when explicitly paused via the killswitch', async () => {
      __setAiLiveDiagnosisEnabledForTests(false);
      const invokeSpy = vi.mocked(supabase!.functions.invoke);
      invokeSpy.mockClear();

      const result = await detectDisease('data:image/jpeg;base64,realImagePayload', 'realImagePayload');

      expect(invokeSpy).not.toHaveBeenCalled();
      expect(result.detected).toBe(false);
      if (!result.detected) {
        expect(result.reason).toBe('provider_unavailable');
        expect(result.messageEn.toLowerCase()).toContain('paused');
        expect(result.messageEn).toContain('Rythu Bharosa Kendra');
        expect(result.messageTe).toContain('రైతు భరోసా కేంద్రం');
        expect(result.normalizedDiagnosis?.metadata.model).toBe('ai_scanning_paused');
      }
    });

    it('still honestly rejects an obviously unusable image client-side regardless of the flag', async () => {
      // The free, zero-cost pixel pre-filter must keep working whatever the cloud flag's
      // state — "enabled"/"paused" should never relabel "this isn't a photo at all".
      const blank = new Uint8ClampedArray(64 * 64 * 4).fill(255);
      const evalResult = evaluatePixelBuffer(blank, 64, 64);
      expect(evalResult.isCrop).toBe(false);
    });

    it('leaves the demo/sample path fully unaffected by the flag', async () => {
      const result = await detectDisease(SAMPLE_CROP_IMAGE, undefined, { isDemoSample: true });
      expect(result.detected).toBe(true);
      if (result.detected) {
        expect(result.isDemoSample).toBe(true);
      }
    });
  });

  describe('On-device classification (runs before the cloud gateway)', () => {
    it('returns a disease match from the on-device model without ever calling the cloud gateway', async () => {
      vi.mocked(onDeviceRegistry.hasOnDeviceModel).mockReturnValue(true);
      vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockResolvedValue([
        { modelLabel: 'helminthosporium_leaf_blight', confidence: 0.92, mapping: { modelLabel: 'helminthosporium_leaf_blight', diseaseId: 'disease-maize-turcicumblight' } },
      ]);
      const invokeSpy = vi.mocked(supabase!.functions.invoke);
      invokeSpy.mockClear();

      const result = await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', {
        selectedCropId: 'crop-maize',
      });

      expect(invokeSpy).not.toHaveBeenCalled();
      expect(result.detected).toBe(true);
      if (result.detected) {
        expect(result.cropId).toBe('crop-maize');
        expect(result.diseaseId).toBe('disease-maize-turcicumblight');
        expect(result.diagnosticTier).toBe('ai_preliminary_hypothesis');
      }
    });

    it('reports healthy from the on-device model without fabricating a disease', async () => {
      vi.mocked(onDeviceRegistry.hasOnDeviceModel).mockReturnValue(true);
      vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockResolvedValue([
        { modelLabel: 'healthy', confidence: 0.88, mapping: { modelLabel: 'healthy', diseaseId: null, status: 'healthy' } },
      ]);

      const result = await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', {
        selectedCropId: 'crop-maize',
      });

      expect(result.detected).toBe(false);
      if (!result.detected) {
        expect(result.reason).toBe('healthy');
      }
    });

    it('honestly reports an unmapped class instead of fabricating guidance or silently falling back', async () => {
      vi.mocked(onDeviceRegistry.hasOnDeviceModel).mockReturnValue(true);
      vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockResolvedValue([
        { modelLabel: 'zonocerus_variegatus', confidence: 0.75, mapping: { modelLabel: 'zonocerus_variegatus', diseaseId: null } },
      ]);
      const invokeSpy = vi.mocked(supabase!.functions.invoke);
      invokeSpy.mockClear();

      const result = await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', {
        selectedCropId: 'crop-maize',
      });

      expect(invokeSpy).not.toHaveBeenCalled();
      expect(result.detected).toBe(false);
      if (!result.detected) {
        expect(result.reason).toBe('unclear');
        expect(result.messageEn).toContain('zonocerus variegatus');
      }
    });

    it('falls through to the cloud gateway when the on-device prediction is not confident enough', async () => {
      vi.mocked(onDeviceRegistry.hasOnDeviceModel).mockReturnValue(true);
      vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockResolvedValue([
        { modelLabel: 'helminthosporium_leaf_blight', confidence: 0.2, mapping: { modelLabel: 'helminthosporium_leaf_blight', diseaseId: 'disease-maize-turcicumblight' } },
      ]);
      const invokeSpy = vi.mocked(supabase!.functions.invoke);
      invokeSpy.mockResolvedValueOnce({ data: { success: false }, error: null });

      await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', { selectedCropId: 'crop-maize' });

      expect(invokeSpy).toHaveBeenCalledTimes(1);
    });

    it('falls through to the cloud gateway when no crop was selected at all', async () => {
      const invokeSpy = vi.mocked(supabase!.functions.invoke);
      invokeSpy.mockResolvedValueOnce({ data: { success: false }, error: null });

      await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', {});

      expect(onDeviceRegistry.classifyWithOnDeviceModel).not.toHaveBeenCalled();
      expect(invokeSpy).toHaveBeenCalledTimes(1);
    });

    it('falls through to the cloud gateway, unaffected, when the on-device classifier itself throws', async () => {
      vi.mocked(onDeviceRegistry.hasOnDeviceModel).mockReturnValue(true);
      vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockRejectedValue(new Error('WASM assets failed to load'));
      const invokeSpy = vi.mocked(supabase!.functions.invoke);
      invokeSpy.mockResolvedValueOnce({ data: { success: false }, error: null });

      const result = await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', {
        selectedCropId: 'crop-maize',
      });

      expect(invokeSpy).toHaveBeenCalledTimes(1);
      expect(result.detected).toBe(false);
    });
  });
});
