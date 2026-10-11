import { describe, it, expect } from 'vitest';
import evaluationManifest from '../../../data/evaluation_manifest.json';

describe('Evaluation Manifest Specification Integrity', () => {
  it('correctly reports 400 fixture specifications and 0 verified disk images', () => {
    expect(evaluationManifest).toBeDefined();
    expect(evaluationManifest.total_samples).toBe(400);
    expect(evaluationManifest.samples).toHaveLength(400);
    expect(evaluationManifest.benchmark_status).toBe('specification_only');
    expect(evaluationManifest.verified_sample_count).toBe(0);
    expect(evaluationManifest.placeholder_fixture_count).toBe(400);
    expect(evaluationManifest.accuracy_measured_on_disk).toBe(false);
    expect(evaluationManifest.accuracy_claim).toContain('unmeasured');

    // Verify all 400 fixtures are explicitly marked as target specifications
    for (const sample of evaluationManifest.samples) {
      expect(sample.fixture_status).toBe('target_specification_only');
      expect(sample.file_present_on_disk).toBe(false);
    }
  });

  it('maintains expected category distributions across test partitions', () => {
    const counts: Record<string, number> = {};
    for (const s of evaluationManifest.samples) {
      const cat = s.condition_category;
      counts[cat] = (counts[cat] || 0) + 1;
    }

    expect(counts['in_catalog_disease']).toBe(200);
    expect(counts['healthy_crop']).toBe(50);
    expect(counts['nutrient_deficiency'] + (counts['abiotic'] || 0)).toBe(50);
    expect((counts['unsupported_crop'] || 0) + (counts['unsupported_disease'] || 0)).toBe(50);
    expect((counts['non_plant'] || 0) + (counts['unusable_image'] || 0)).toBe(50);
  });
});
