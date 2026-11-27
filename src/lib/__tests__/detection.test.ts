import { describe, it, expect, vi, beforeEach } from 'vitest';
import { detectDisease, urgencyFromConfidence, evaluatePixelBuffer } from '../detection';
import { SAMPLE_CROP_IMAGE } from '../mockData';
import * as onDeviceRegistry from '../ai/onDeviceRegistry';

vi.mock('../ai/onDeviceRegistry', () => ({
  hasOnDeviceModel: vi.fn(() => false),
  classifyWithOnDeviceModel: vi.fn(),
  getOnDeviceCropIds: vi.fn(() => []),
}));

describe('Detection Layer & Removal of Fabricated Outcomes', () => {
  // detectDisease now covers only the demo sample and the offline on-device models; the online
  // diagnosis of any plant is diagnosePlant() (see ai/__tests__/plantDiagnosis.test.ts).
  beforeEach(() => {
    vi.mocked(onDeviceRegistry.hasOnDeviceModel).mockReturnValue(false);
    vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockReset();
    vi.mocked(onDeviceRegistry.getOnDeviceCropIds).mockReturnValue([]);
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

  describe('On-device classification (offline)', () => {
    it('returns a disease match from the on-device model', async () => {
      vi.mocked(onDeviceRegistry.hasOnDeviceModel).mockReturnValue(true);
      vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockResolvedValue([
        { modelLabel: 'helminthosporium_leaf_blight', confidence: 0.92, mapping: { modelLabel: 'helminthosporium_leaf_blight', diseaseId: 'disease-maize-turcicumblight' } },
      ]);

      const result = await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', {
        selectedCropId: 'crop-maize',
      });
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

      const result = await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', {
        selectedCropId: 'crop-maize',
      });
      expect(result.detected).toBe(false);
      if (!result.detected) {
        expect(result.reason).toBe('unclear');
        expect(result.messageEn).toContain('zonocerus variegatus');
      }
    });

    it('falls through to the offline sweep when the on-device prediction is not confident enough', async () => {
      vi.mocked(onDeviceRegistry.hasOnDeviceModel).mockReturnValue(true);
      vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockResolvedValue([
        { modelLabel: 'helminthosporium_leaf_blight', confidence: 0.2, mapping: { modelLabel: 'helminthosporium_leaf_blight', diseaseId: 'disease-maize-turcicumblight' } },
      ]);

      await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', { selectedCropId: 'crop-maize' });
    });

    it('does not run a crop-specific model when no crop was selected and none are available', async () => {
      const result = await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', {});

      expect(onDeviceRegistry.classifyWithOnDeviceModel).not.toHaveBeenCalled();
      expect(result.detected).toBe(false);
    });

    it('fails safely, without throwing, when the on-device classifier itself throws', async () => {
      vi.mocked(onDeviceRegistry.hasOnDeviceModel).mockReturnValue(true);
      vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockRejectedValue(new Error('WASM assets failed to load'));

      const result = await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', {
        selectedCropId: 'crop-maize',
      });
      expect(result.detected).toBe(false);
    });
  });

  describe('On-device fallback sweep (offline, any crop)', () => {
    it('finds a confident match from the on-device trained models when no crop was selected', async () => {
      // No selectedCropId at all -- this is the "Not Sure / Skip" universal scanner flow,
      // which has no single crop to run on-device classification against at step 1b.
      vi.mocked(onDeviceRegistry.getOnDeviceCropIds).mockReturnValue(['crop-groundnut', 'crop-maize']);
      vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockImplementation(async (cropId: string) => {
        if (cropId === 'crop-maize') {
          return [
            {
              modelLabel: 'helminthosporium_leaf_blight',
              confidence: 0.91,
              mapping: { modelLabel: 'helminthosporium_leaf_blight', diseaseId: 'disease-maize-turcicumblight' },
            },
          ];
        }
        return [{ modelLabel: 'healthy', confidence: 0.1, mapping: { modelLabel: 'healthy', diseaseId: null } }];
      });

      const result = await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', {});
      expect(result.detected).toBe(true);
      if (result.detected) {
        expect(result.cropId).toBe('crop-maize');
        expect(result.diseaseId).toBe('disease-maize-turcicumblight');
      }
    });

    it('does not re-run the already-tried selected crop during the fallback sweep', async () => {
      vi.mocked(onDeviceRegistry.hasOnDeviceModel).mockReturnValue(true);
      vi.mocked(onDeviceRegistry.getOnDeviceCropIds).mockReturnValue(['crop-maize']);
      vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockResolvedValue([
        { modelLabel: 'helminthosporium_leaf_blight', confidence: 0.2, mapping: { modelLabel: 'helminthosporium_leaf_blight', diseaseId: 'disease-maize-turcicumblight' } },
      ]);

      await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', { selectedCropId: 'crop-maize' });

      // Called once at step 1b (low confidence, falls through) -- the sweep must skip
      // crop-maize since it was already tried, not call it a second time.
      expect(onDeviceRegistry.classifyWithOnDeviceModel).toHaveBeenCalledTimes(1);
    });

    it('gives an honest "could not identify this image" message when every on-device model fails', async () => {
      vi.mocked(onDeviceRegistry.getOnDeviceCropIds).mockReturnValue(['crop-groundnut', 'crop-banana']);
      vi.mocked(onDeviceRegistry.classifyWithOnDeviceModel).mockResolvedValue([
        { modelLabel: 'healthy', confidence: 0.1, mapping: { modelLabel: 'healthy', diseaseId: null } },
      ]);

      const result = await detectDisease('data:image/jpeg;base64,leafPhoto', 'leafPhoto', {});

      expect(result.detected).toBe(false);
      if (!result.detected) {
        expect(result.reason).toBe('provider_unavailable');
        expect(result.messageEn.toLowerCase()).toContain('could not identify this image');
        expect(result.messageEn.toLowerCase()).toContain('internet');
      }
    });
  });
});
