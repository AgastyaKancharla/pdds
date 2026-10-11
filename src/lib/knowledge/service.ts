/**
 * AGASTYAONE AGRICULTURE — PDDs
 * Phase 3: Agricultural Knowledge Service & Offline Reference Utilities
 */

import { AGRICULTURAL_KNOWLEDGE_CATALOG } from './catalog';
import type {
  AgriculturalKnowledgeCatalog,
  CropKnowledgeEntry,
  DiseaseKnowledgeEntry,
  LookalikeCondition,
  TreatmentCategory,
} from './types';

/**
 * Returns knowledge details for a given crop ID.
 */
export function getCropKnowledge(cropId?: string | null): CropKnowledgeEntry | null {
  if (!cropId) return null;
  return AGRICULTURAL_KNOWLEDGE_CATALOG.crops[cropId] || null;
}

/**
 * Returns knowledge details for a given disease ID.
 */
export function getDiseaseKnowledge(diseaseId?: string | null): DiseaseKnowledgeEntry | null {
  if (!diseaseId) return null;
  return AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[diseaseId] || null;
}

/**
 * Returns bundled knowledge for a crop & disease scan combination.
 */
export function getKnowledgeForScan(
  cropId?: string | null,
  diseaseId?: string | null
): {
  crop: CropKnowledgeEntry | null;
  disease: DiseaseKnowledgeEntry | null;
} {
  return {
    crop: getCropKnowledge(cropId),
    disease: getDiseaseKnowledge(diseaseId),
  };
}

/**
 * Checks whether a disease identifier exists in the supported knowledge catalog.
 */
export function isDiseaseSupported(diseaseId?: string | null): boolean {
  if (!diseaseId) return false;
  return Object.prototype.hasOwnProperty.call(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases, diseaseId);
}

/**
 * Checks whether a crop identifier exists in the supported knowledge catalog.
 */
export function isCropSupported(cropId?: string | null): boolean {
  if (!cropId) return false;
  return Object.prototype.hasOwnProperty.call(AGRICULTURAL_KNOWLEDGE_CATALOG.crops, cropId);
}

/**
 * Returns lookalike conditions / differential diagnoses for a disease.
 */
export function getLookalikesForDisease(diseaseId?: string | null): LookalikeCondition[] {
  const entry = getDiseaseKnowledge(diseaseId);
  return entry ? entry.similarConditions : [];
}

/**
 * Returns all supported crops in the knowledge catalog.
 */
export function getAllSupportedCrops(): CropKnowledgeEntry[] {
  return Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.crops);
}

/**
 * Returns all supported diseases, optionally filtered by crop ID.
 */
export function getAllSupportedDiseases(cropId?: string): DiseaseKnowledgeEntry[] {
  const all = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases);
  if (!cropId) return all;
  return all.filter((d) => d.cropId === cropId);
}

/**
 * Returns the entire bundled reference catalog suitable for offline use.
 * Completely local, zero network or API dependency.
 */
export function getOfflineReferenceCatalog(): AgriculturalKnowledgeCatalog {
  return AGRICULTURAL_KNOWLEDGE_CATALOG;
}

export interface CuratedTreatmentDisplay {
  id: string;
  step_number: number;
  instruction: string;
  active_ingredient?: string;
  safety_caution?: string;
  regulatory_notice?: string;
}

/**
 * Returns treatments strictly for a specific category from the curated knowledge catalog.
 * Guarantees:
 * 1. If disease is in curated catalog, ONLY curated treatments for this category are returned.
 * 2. Empty categories return an empty array and NEVER fall back to legacy mock treatments.
 * 3. Unsupported crops/diseases NEVER receive treatment instructions.
 * 4. Commercial trade names are absent.
 */
export function getTreatmentsForCategory(
  diseaseId: string | null | undefined,
  category: TreatmentCategory,
  language: 'en' | 'te' = 'en',
  options?: { isDemoSample?: boolean }
): {
  hasCuratedEntry: boolean;
  treatments: CuratedTreatmentDisplay[];
  isEmptyCategory: boolean;
  isDemoSample: boolean;
} {
  const disease = getDiseaseKnowledge(diseaseId);
  if (disease) {
    const matched = disease.treatments.filter((t) => t.category === category);
    return {
      hasCuratedEntry: true,
      treatments: matched.map((t) => ({
        id: t.id,
        step_number: t.stepNumber,
        instruction: language === 'en' ? t.instruction_en : t.instruction_te,
        active_ingredient: language === 'en' ? t.activeIngredient_en : t.activeIngredient_te,
        safety_caution: language === 'en' ? t.safetyCaution_en : t.safetyCaution_te,
        regulatory_notice: language === 'en' ? t.regulatoryNotice_en : t.regulatoryNotice_te,
      })),
      isEmptyCategory: matched.length === 0,
      isDemoSample: false,
    };
  }

  // Demonstration sample handling: only if explicitly marked as demo sample
  if (options?.isDemoSample) {
    return {
      hasCuratedEntry: false,
      treatments: [],
      isEmptyCategory: true,
      isDemoSample: true,
    };
  }

  // Unsupported or unknown disease: NEVER return treatment instructions
  return {
    hasCuratedEntry: false,
    treatments: [],
    isEmptyCategory: true,
    isDemoSample: false,
  };
}

/**
 * Resolves knowledge for a crop and disease while offline.
 * Always respects the curated catalog boundaries, guaranteeing no mock treatments bleed into empty categories.
 */
export function getOfflineOrCachedKnowledge(
  cropId?: string | null,
  diseaseId?: string | null
): {
  crop: CropKnowledgeEntry | null;
  disease: DiseaseKnowledgeEntry | null;
  isAvailableOffline: boolean;
} {
  const crop = getCropKnowledge(cropId);
  const disease = getDiseaseKnowledge(diseaseId);
  return {
    crop,
    disease,
    isAvailableOffline: !!(crop || disease),
  };
}

