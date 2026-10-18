import { describe, it, expect, vi } from 'vitest';
import { classifyMaizeImage } from '../maizeOnDevice';
import * as tfliteOnDeviceModel from '../tfliteOnDeviceModel';

describe('classifyMaizeImage', () => {
  it('maps armyworm and turcicum blight to the right catalog entries', async () => {
    vi.spyOn(tfliteOnDeviceModel, 'classifyImageOnDevice').mockResolvedValue([
      { modelLabel: 'spodoptera_frugiperda', confidence: 0.77 },
      { modelLabel: 'helminthosporium_leaf_blight', confidence: 0.15 },
      { modelLabel: 'healthy', confidence: 0.05 },
      { modelLabel: 'zonocerus_variegatus', confidence: 0.03 },
    ]);

    const results = await classifyMaizeImage('data:image/jpeg;base64,fake');

    expect(results[0].modelLabel).toBe('spodoptera_frugiperda');
    expect(results[0].mapping.diseaseId).toBe('disease-maize-armyworm');
    expect(results.find((r) => r.modelLabel === 'helminthosporium_leaf_blight')?.mapping.diseaseId).toBe(
      'disease-maize-turcicumblight'
    );
    expect(results.find((r) => r.modelLabel === 'healthy')?.mapping.status).toBe('healthy');
  });

  it('never fabricates a diseaseId for the unmapped grasshopper class', async () => {
    vi.spyOn(tfliteOnDeviceModel, 'classifyImageOnDevice').mockResolvedValue([
      { modelLabel: 'zonocerus_variegatus', confidence: 0.9 },
      { modelLabel: 'healthy', confidence: 0.1 },
    ]);

    const results = await classifyMaizeImage('data:image/jpeg;base64,fake');

    expect(results[0].mapping.diseaseId).toBeNull();
    expect(results[0].mapping.status).toBeUndefined();
  });
});
