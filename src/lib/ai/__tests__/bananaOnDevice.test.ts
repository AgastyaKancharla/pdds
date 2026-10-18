import { describe, it, expect, vi } from 'vitest';
import { classifyBananaImage } from '../bananaOnDevice';
import * as tfliteOnDeviceModel from '../tfliteOnDeviceModel';

describe('classifyBananaImage', () => {
  it('maps fusarium_wilt to Panama Wilt and healthy to the healthy status', async () => {
    vi.spyOn(tfliteOnDeviceModel, 'classifyImageOnDevice').mockResolvedValue([
      { modelLabel: 'fusarium_wilt', confidence: 0.82 },
      { modelLabel: 'healthy', confidence: 0.12 },
      { modelLabel: 'black_sigatoka', confidence: 0.06 },
    ]);

    const results = await classifyBananaImage('data:image/jpeg;base64,fake');

    expect(results[0].modelLabel).toBe('fusarium_wilt');
    expect(results[0].mapping.diseaseId).toBe('disease-banana-panamawilt');
    expect(results.find((r) => r.modelLabel === 'healthy')?.mapping.status).toBe('healthy');
  });

  it('never fabricates a diseaseId for the unmapped black_sigatoka class', async () => {
    vi.spyOn(tfliteOnDeviceModel, 'classifyImageOnDevice').mockResolvedValue([
      { modelLabel: 'black_sigatoka', confidence: 0.88 },
      { modelLabel: 'healthy', confidence: 0.12 },
    ]);

    const results = await classifyBananaImage('data:image/jpeg;base64,fake');

    expect(results[0].mapping.diseaseId).toBeNull();
    expect(results[0].mapping.status).toBeUndefined();
  });
});
