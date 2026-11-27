import { getAllSupportedCrops, getAllSupportedDiseases, getConditionCategory } from './service';

/**
 * A compact, prompt-sized index of the verified knowledge catalog. The `diagnose-plant` Edge
 * Function gives this list to the vision model so that, when a photo matches something we have
 * a verified guide for, the model answers with OUR catalog id instead of a free-text name. That
 * is what links an AI observation to vetted treatment and safety content.
 *
 * The Edge Function cannot import from src/, so a copy is committed at
 * supabase/functions/diagnose-plant/catalogIndex.json. `catalogIndex.test.ts` fails whenever
 * that copy drifts from the catalog; regenerate it with:
 *   UPDATE_CATALOG_INDEX=1 npx vitest run src/lib/knowledge/__tests__/catalogIndex.test.ts
 */
export interface CatalogIndexCrop {
  id: string;
  name: string;
  scientificName: string;
}

export interface CatalogIndexCondition {
  id: string;
  cropId: string;
  name: string;
  category: string;
  keySymptoms: string[];
}

export interface CatalogIndex {
  crops: CatalogIndexCrop[];
  conditions: CatalogIndexCondition[];
}

const MAX_SYMPTOMS = 2;
const MAX_SYMPTOM_CHARS = 140;

function shorten(text: string): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > MAX_SYMPTOM_CHARS ? `${clean.slice(0, MAX_SYMPTOM_CHARS - 1).trimEnd()}…` : clean;
}

export function buildCatalogIndex(): CatalogIndex {
  const crops = getAllSupportedCrops()
    .map((c) => ({ id: c.id, name: c.name_en, scientificName: c.scientificName }))
    .sort((a, b) => a.id.localeCompare(b.id));

  const conditions = getAllSupportedDiseases()
    .map((d) => ({
      id: d.id,
      cropId: d.cropId,
      name: d.name_en,
      category: getConditionCategory(d),
      keySymptoms: (d.observableSymptoms_en || []).slice(0, MAX_SYMPTOMS).map(shorten),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  return { crops, conditions };
}
