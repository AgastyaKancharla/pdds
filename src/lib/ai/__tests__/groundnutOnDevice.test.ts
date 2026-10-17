import { describe, it, expect, vi } from 'vitest';
import { classifyGroundnutImage } from '../groundnutOnDevice';
import * as tfliteOnDeviceModel from '../tfliteOnDeviceModel';

describe('classifyGroundnutImage', () => {
  it('maps the model classes to the right catalog entries, highest confidence first', async () => {
    vi.spyOn(tfliteOnDeviceModel, 'classifyImageOnDevice').mockResolvedValue([
      { modelLabel: 'rust', confidence: 0.81 },
      { modelLabel: 'early_leaf_spot', confidence: 0.1 },
      { modelLabel: 'healthy_leaf', confidence: 0.05 },
      { modelLabel: 'late_leaf_spot', confidence: 0.03 },
      { modelLabel: 'nutrition_deficiency', confidence: 0.01 },
    ]);

    const results = await classifyGroundnutImage('data:image/jpeg;base64,fake');

    expect(results[0].modelLabel).toBe('rust');
    expect(results[0].mapping.diseaseId).toBe('disease-groundnut-rust');
    expect(results.find((r) => r.modelLabel === 'early_leaf_spot')?.mapping.diseaseId).toBe(
      'disease-groundnut-tikka'
    );
    expect(results.find((r) => r.modelLabel === 'late_leaf_spot')?.mapping.diseaseId).toBe(
      'disease-groundnut-tikka'
    );
    expect(results.find((r) => r.modelLabel === 'healthy_leaf')?.mapping.status).toBe('healthy');
  });

  it('never fabricates a diseaseId for the unmapped nutrition_deficiency class', async () => {
    vi.spyOn(tfliteOnDeviceModel, 'classifyImageOnDevice').mockResolvedValue([
      { modelLabel: 'nutrition_deficiency', confidence: 0.92 },
      { modelLabel: 'rust', confidence: 0.03 },
      { modelLabel: 'healthy_leaf', confidence: 0.02 },
      { modelLabel: 'early_leaf_spot', confidence: 0.02 },
      { modelLabel: 'late_leaf_spot', confidence: 0.01 },
    ]);

    const results = await classifyGroundnutImage('data:image/jpeg;base64,fake');

    expect(results[0].modelLabel).toBe('nutrition_deficiency');
    expect(results[0].mapping.diseaseId).toBeNull();
    expect(results[0].mapping.status).toBeUndefined();
  });

  it('falls back to an unmapped entry instead of throwing on an unrecognized label', async () => {
    vi.spyOn(tfliteOnDeviceModel, 'classifyImageOnDevice').mockResolvedValue([
      { modelLabel: 'some_unexpected_label', confidence: 0.5 },
    ]);

    const results = await classifyGroundnutImage('data:image/jpeg;base64,fake');

    expect(results[0].mapping.diseaseId).toBeNull();
  });
});
