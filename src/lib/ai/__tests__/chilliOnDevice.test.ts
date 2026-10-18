import { describe, it, expect, vi } from 'vitest';
import { classifyChilliImage } from '../chilliOnDevice';
import * as tfliteOnDeviceModel from '../tfliteOnDeviceModel';

describe('classifyChilliImage', () => {
  it('maps Virus to Leaf Curl and Healthy to the healthy status', async () => {
    vi.spyOn(tfliteOnDeviceModel, 'classifyImageOnDevice').mockResolvedValue([
      { modelLabel: 'Virus', confidence: 0.79 },
      { modelLabel: 'Mites', confidence: 0.13 },
      { modelLabel: 'Healthy', confidence: 0.08 },
    ]);

    const results = await classifyChilliImage('data:image/jpeg;base64,fake');

    expect(results[0].modelLabel).toBe('Virus');
    expect(results[0].mapping.diseaseId).toBe('disease-chilli-leaf-curl');
    expect(results.find((r) => r.modelLabel === 'Healthy')?.mapping.status).toBe('healthy');
  });

  it('never remaps Mites to the catalog Thrips entry', async () => {
    vi.spyOn(tfliteOnDeviceModel, 'classifyImageOnDevice').mockResolvedValue([
      { modelLabel: 'Mites', confidence: 0.91 },
      { modelLabel: 'Healthy', confidence: 0.09 },
    ]);

    const results = await classifyChilliImage('data:image/jpeg;base64,fake');

    expect(results[0].mapping.diseaseId).toBeNull();
    expect(results[0].mapping.diseaseId).not.toBe('disease-chilli-thrips');
  });
});
