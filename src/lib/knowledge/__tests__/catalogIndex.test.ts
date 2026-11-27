import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildCatalogIndex } from '../catalogIndex';
import { getAllSupportedCrops, getAllSupportedDiseases } from '../service';

const INDEX_PATH = resolve(__dirname, '../../../../supabase/functions/diagnose-plant/catalogIndex.json');

describe('catalog index for the diagnose-plant Edge Function', () => {
  const built = buildCatalogIndex();
  const serialized = JSON.stringify(built, null, 2) + '\n';

  if (process.env.UPDATE_CATALOG_INDEX === '1') {
    writeFileSync(INDEX_PATH, serialized);
  }

  it('covers every crop and condition in the knowledge catalog', () => {
    expect(built.crops.length).toBe(getAllSupportedCrops().length);
    expect(built.conditions.length).toBe(getAllSupportedDiseases().length);
    const cropIds = new Set(built.crops.map((c) => c.id));
    for (const condition of built.conditions) {
      expect(cropIds.has(condition.cropId)).toBe(true);
      expect(condition.name.length).toBeGreaterThan(0);
    }
  });

  it('matches the committed copy used by the Edge Function (regenerate if this fails)', () => {
    expect(existsSync(INDEX_PATH)).toBe(true);
    expect(readFileSync(INDEX_PATH, 'utf8')).toBe(serialized);
  });
});
