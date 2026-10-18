/**
 * AGASTYAONE AGRICULTURE — PDDs
 * Phase 3: Agricultural Knowledge Service & Offline Reference Utilities
 */

import { AGRICULTURAL_KNOWLEDGE_CATALOG } from './catalog';
import type {
  AgriculturalKnowledgeCatalog,
  ClaimEvidenceNote,
  ConditionCategory,
  CropKnowledgeEntry,
  DiseaseKnowledgeEntry,
  KnowledgeSource,
  LookalikeCondition,
  SeverityBand,
  TreatmentCategory,
} from './types';
import type { Crop, Disease } from '../../types/database';

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

/**
 * Synthesizes a legacy `Crop` record from a curated catalog entry. ResultScreen.tsx still
 * resolves its render-gating `crop`/`disease` state from the legacy `Crop`/`Disease` shape
 * (via `getMockCrop`/`getMockDisease`), which only covers the original 10 crops. Any crop
 * added to the catalog afterward (e.g. Brinjal) would otherwise never populate that state and
 * would always hit the "not found" fallback view, even though `getCropKnowledge` resolves it
 * fine. This bridges the gap without requiring every new catalog crop to also be hand-added
 * to the legacy mock arrays.
 */
export function cropKnowledgeToCrop(entry: CropKnowledgeEntry): Crop {
  return {
    id: entry.id,
    name_en: entry.name_en,
    name_te: entry.name_te,
    category: entry.category,
    tier: 2,
    ap_regions: entry.apMajorDistricts.length > 0 ? entry.apMajorDistricts : null,
    growing_season: entry.growingSeasons.length > 0 ? entry.growingSeasons.join(' / ') : null,
    image_url: null,
    created_at: new Date().toISOString(),
  };
}

/** Same bridging purpose as `cropKnowledgeToCrop`, for the `Disease` shape. */
export function diseaseKnowledgeToDisease(entry: DiseaseKnowledgeEntry): Disease {
  return {
    id: entry.id,
    crop_id: entry.cropId,
    name_en: entry.name_en,
    name_te: entry.name_te,
    type: entry.pathogenOrVector_en,
    symptoms_en: entry.observableSymptoms_en.join(' '),
    symptoms_te: entry.observableSymptoms_te.join(' '),
    affected_parts: entry.affectedParts,
    urgency_level: entry.urgencyLevel,
    urgency_color: entry.urgencyColor,
    ap_specific_tip_en: null,
    ap_specific_tip_te: null,
    created_at: new Date().toISOString(),
  };
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

/**
 * True ONLY when a source is both flagged as pointing to a specific document
 * (`specificDocumentVerified`) AND names a real, non-blank supporting page/passage/
 * table/label section (`pageOrSection`). Either condition missing, empty, or
 * whitespace-only fails conservatively to "not verified" — a homepage-only
 * citation must never be presented as document-verified, and a missing/blank
 * section must never silently suppress the homepage-only disclosure.
 */
export function isSourceDocumentVerified(source: Pick<KnowledgeSource, 'specificDocumentVerified' | 'pageOrSection'>): boolean {
  return !!source.specificDocumentVerified && !!source.pageOrSection && source.pageOrSection.trim().length > 0;
}

/**
 * True when a disease defines a non-empty `chemicalTabDetail_en`/`_te` for the given
 * language. Extracted as a small pure predicate (Phase 5.4 test-coverage fix) so that
 * ResultScreen.tsx's statutory-safety-box condition and its regression tests call the
 * exact same function, rather than the test re-implementing the check separately and
 * risking drift from the real branching logic.
 */
export function hasChemicalTabDetail(
  disease: Pick<DiseaseKnowledgeEntry, 'chemicalTabDetail_en' | 'chemicalTabDetail_te'> | null | undefined,
  language: 'en' | 'te'
): boolean {
  if (!disease) return false;
  const text = language === 'en' ? disease.chemicalTabDetail_en : disease.chemicalTabDetail_te;
  return !!text;
}

/**
 * Looks up the claim-level evidence note for one specific claimId on a disease, or
 * undefined if that disease defines no such note. This is the single source of truth
 * both ResultScreen.tsx and its regression tests call — never re-implemented separately —
 * so a test can never drift from what the UI actually renders.
 *
 * Deliberately does NOT fall back to, derive from, or get bypassed by the disease's
 * overall `evidenceStatus` or `sources[]`: a disease-wide status can never silently
 * create, satisfy, or hide a specific claim's note (see ClaimEvidenceNote's doc comment
 * in types.ts for the Phase 5.6A/5.6B/5.6C rationale this closes).
 */
export function getClaimEvidenceNote(
  disease: Pick<DiseaseKnowledgeEntry, 'claimEvidence'> | null | undefined,
  claimId: string
): ClaimEvidenceNote | undefined {
  if (!disease?.claimEvidence) return undefined;
  return disease.claimEvidence.find((note) => note.claimId === claimId);
}

/**
 * Resolves an entry's condition category, defaulting to 'disease' when unset so that entries
 * written before non-pathogenic conditions were catalogued keep their existing meaning.
 * Centralised here so the default can never drift between the UI, the AI validator and tests.
 */
export function getConditionCategory(
  disease: Pick<DiseaseKnowledgeEntry, 'conditionCategory'> | null | undefined
): ConditionCategory {
  return disease?.conditionCategory ?? 'disease';
}

/**
 * True when a condition is NOT caused by a pest or pathogen — a nutrient deficiency, a
 * physiological disorder, or abiotic stress.
 *
 * This is a SAFETY predicate, not a cosmetic one. Spraying a pesticide or fungicide at one of
 * these conditions cannot work: the cause is nutrition, soil chemistry or weather, so the spray
 * costs the farmer money, risks phytotoxic leaf burn, and leaves the real cause untreated while
 * the crop keeps declining. Callers use this to suppress pesticide guidance entirely rather than
 * relying on an entry merely happening to have no chemical treatments listed.
 */
export function isNonPathogenicCondition(
  disease: Pick<DiseaseKnowledgeEntry, 'conditionCategory'> | null | undefined
): boolean {
  const category = getConditionCategory(disease);
  return (
    category === 'nutrient_deficiency' ||
    category === 'physiological_disorder' ||
    category === 'abiotic_stress'
  );
}

/**
 * Whether pesticide/fungicide guidance may be shown for this condition at all.
 *
 * Deliberately phrased as an allow-check rather than a block-check: a brand-new condition
 * category added later defaults to non-pathogenic handling only if explicitly listed in
 * `isNonPathogenicCondition`, so the conservative path is the one that needs no extra thought
 * at the call site. Returns false for a missing entry — an unknown condition never gets
 * chemical guidance, matching `getTreatmentsForCategory`'s existing guarantee 3.
 */
export function allowsChemicalPestControl(
  disease: Pick<DiseaseKnowledgeEntry, 'conditionCategory'> | null | undefined
): boolean {
  if (!disease) return false;
  return !isNonPathogenicCondition(disease);
}

/**
 * Returns every catalogued condition for a crop, ordered most urgent first and then
 * alphabetically within an urgency level so the ordering is stable across renders.
 *
 * Added for the multi-condition expansion: crops now carry several conditions, and the UI needs
 * a deterministic, clinically-sensible order rather than object-key insertion order.
 */
export function getConditionsForCrop(cropId?: string | null): DiseaseKnowledgeEntry[] {
  if (!cropId) return [];
  const urgencyRank: Record<DiseaseKnowledgeEntry['urgencyLevel'], number> = {
    High: 0,
    Medium: 1,
    Low: 2,
  };
  return Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases)
    .filter((entry) => entry.cropId === cropId)
    .sort((a, b) => {
      const rank = urgencyRank[a.urgencyLevel] - urgencyRank[b.urgencyLevel];
      if (rank !== 0) return rank;
      return a.name_en.localeCompare(b.name_en);
    });
}

/**
 * Severity band for a condition at a given level, or undefined when that condition defines no
 * bands (correct for all-or-nothing conditions such as a systemic virus).
 */
export function getSeverityBand(
  disease: Pick<DiseaseKnowledgeEntry, 'severityBands'> | null | undefined,
  level: SeverityBand['level']
): SeverityBand | undefined {
  if (!disease?.severityBands) return undefined;
  return disease.severityBands.find((band) => band.level === level);
}

/**
 * True when this condition cannot be confidently diagnosed from a standard canopy or leaf photo
 * and genuinely needs a specific capture (a split cane, an exposed root collar, a leaf underside).
 * The UI uses this to cap how settled a diagnosis is allowed to look, so an image that physically
 * cannot contain the deciding evidence never reads as a confirmed answer.
 */
export function requiresSpecialCapture(
  disease: Pick<DiseaseKnowledgeEntry, 'captureGuidance'> | null | undefined
): boolean {
  return !!disease?.captureGuidance?.requiredForConfidence;
}

