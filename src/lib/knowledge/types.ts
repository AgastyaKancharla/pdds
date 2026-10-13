/**
 * AGASTYAONE AGRICULTURE — PDDs
 * Phase 3: Agricultural Knowledge Base Types & Schema
 */

export type EvidenceStatus =
  | 'verified_reference'
  | 'provisional'
  | 'unverified'
  | 'conflicting'
  | 'demonstration_only';

export type TreatmentCategory = 'organic' | 'chemical' | 'preventive';

export interface KnowledgeSource {
  title: string;
  organization: string;
  author?: string;
  url?: string;
  reviewDate: string; // ISO date string YYYY-MM-DD
  /**
   * True ONLY if `url` links directly to the specific document named in `title`
   * (not merely the organization's homepage/landing page) AND `pageOrSection`
   * identifies the supporting page, passage, table, or pesticide-label section.
   *
   * Default/omitted means NOT verified: as of the Phase 5.4 evidence-integrity
   * audit, every source currently in this catalog links only to an organization's
   * homepage (e.g. https://ppqs.gov.in), not to the specific bulletin/label page
   * that documents the claim. This field is never set to true without a real,
   * non-fabricated deep link — do not invent one to flip this flag.
   */
  specificDocumentVerified?: boolean;
  /** Supporting page, passage, table, or pesticide-label section. Only meaningful when specificDocumentVerified is true. */
  pageOrSection?: string;
}

/**
 * A claim's own verification status, DELIBERATELY SEPARATE from the disease-wide
 * `EvidenceStatus` above. `EvidenceStatus` covers an entire disease entry (symptoms,
 * lookalikes, prevention, treatments) together; `ClaimEvidenceNote.verificationStatus`
 * covers exactly one specific field's exact text. A disease being 'unverified' or
 * 'conflicting' overall must never be read as verifying — or as failing to flag —
 * any one specific numeric claim, and a claim-evidence note existing at all must never
 * be read as making the parent disease's overall evidenceStatus 'verified_reference'.
 * 'unsupported' is distinct from 'unverified': it means sources exist but are only
 * generic/homepage-level for this specific claim (recorded, inspected, found insufficient),
 * whereas 'unverified' means simply not yet checked.
 */
export type ClaimVerificationStatus = 'verified' | 'provisional' | 'unverified' | 'conflicting' | 'unsupported';

/**
 * A minimal, explicit claim-level evidence record attached to one specific numeric or
 * otherwise consequential field on a disease entry — e.g. a spray water volume inside a
 * treatment's `safetyCaution_en/_te`, or a quantity inside `escalationThreshold_en/_te`.
 * Never auto-derived from the disease's `sources[]`/`evidenceStatus`: a general source
 * being listed, or the disease being `unverified`/`conflicting`, does NOT by itself
 * create, satisfy, or upgrade a claim note. `locator` is the only thing that could ever
 * justify `verificationStatus: 'verified'`, and it is never fabricated — if no real
 * page/section/table/label was actually found, this stays 'unsupported' or 'unverified'.
 * Rendered additively in the UI (see ResultScreen.tsx) — it never replaces or edits the
 * underlying guidance text, only qualifies it.
 */
export interface ClaimEvidenceNote {
  /** Stable id matching how the UI looks this note up (see getClaimEvidenceNote in service.ts). */
  claimId: string;
  /** Human-readable pointer to the exact field this note qualifies, for docs/tests only. */
  fieldRef: string;
  verificationStatus: ClaimVerificationStatus;
  /** Indexes into this disease's own `sources[]` that are relevant (not necessarily sufficient) for this claim. */
  sourceIndexes?: number[];
  /** Exact page/section/table/label locator, only when one was actually found — never invented. */
  locator?: string;
  limitation_en: string;
  limitation_te: string;
}

export interface LookalikeCondition {
  id: string;
  name_en: string;
  name_te: string;
  isPathological: boolean; // true = pest/disease, false = nutrient deficiency / abiotic stress / weather
  differentiatingFactors_en: string;
  differentiatingFactors_te: string;
}

/**
 * What kind of condition an entry describes. A `DiseaseKnowledgeEntry` is NOT always an
 * infectious disease: nutrient deficiencies, physiological disorders and abiotic stress are
 * catalogued in the same record shape so the differential-diagnosis machinery can weigh them
 * against pathogens directly, which is the whole point of listing them.
 *
 * This drives SAFETY behaviour, not just a label. For any value other than 'disease' or 'pest',
 * a pesticide or fungicide is the wrong answer by definition — spraying a zinc deficiency wastes
 * the farmer's money and can scorch the crop. The UI must never present chemical pest-control
 * guidance for a 'nutrient_deficiency', 'physiological_disorder' or 'abiotic_stress' entry;
 * their `treatments[]` carry corrective agronomy (soil amendment, irrigation, nutrition) instead.
 */
export type ConditionCategory =
  | 'disease'
  | 'pest'
  | 'nutrient_deficiency'
  | 'physiological_disorder'
  | 'abiotic_stress';

/**
 * Crop-specific instruction for what to actually photograph. A generic "photograph the plant"
 * makes several conditions undiagnosable from imagery: sugarcane red rot needs a split cane,
 * groundnut stem rot needs the collar region with topsoil cleared, tomato late blight needs the
 * leaf underside. Attached per condition because the required anatomy differs by condition, not
 * only by crop, and surfaced to the farmer so a low-confidence result can be retried usefully.
 */
export interface CaptureGuidance {
  /** Short imperative instruction, e.g. "Photograph the underside of the affected leaf." */
  instruction_en: string;
  instruction_te: string;
  /** Why this specific view is required — what evidence it reveals that a canopy shot cannot. */
  rationale_en?: string;
  rationale_te?: string;
  /**
   * True when the condition genuinely cannot be confirmed from a standard canopy/leaf photo at all
   * (e.g. internal cane discolouration, root galls, larvae inside a boll). Used to cap displayed
   * confidence and to push the farmer toward the correct capture or toward expert escalation,
   * rather than letting a canopy-only image imply a settled diagnosis.
   */
  requiredForConfidence?: boolean;
}

/**
 * One field-checkable question whose answer separates this condition from a specific lookalike.
 * These exist because single-image classification genuinely cannot resolve certain pairs — thrips
 * vs. broad mites on chilli differ mainly by the DIRECTION of leaf curl, which a farmer can state
 * in one word and a photo often cannot settle.
 *
 * Stored as data now and rendered as a read-only checklist; the interactive version that feeds
 * answers back into the diagnosis is a later change. `pointsToward`/`pointsAway` are condition
 * IDs so the eventual interactive version can re-rank without the text being re-parsed.
 */
export interface FieldFollowUpQuestion {
  id: string;
  question_en: string;
  question_te: string;
  /** What a "yes" supports — human-readable, paired with `pointsTowardIds` for machine use. */
  ifYes_en: string;
  ifYes_te: string;
  ifNo_en: string;
  ifNo_te: string;
  /** Condition IDs a "yes" makes more likely. */
  pointsTowardIds?: string[];
  /** Condition IDs a "yes" makes less likely. */
  pointsAwayIds?: string[];
}

/**
 * A severity band with the visual threshold that defines it and what the farmer should do at that
 * level. Thresholds are deliberately expressed as something countable or estimable in the field
 * (percentage of leaf area, tillers per square metre) rather than as a vague "mild/severe", because
 * the economic decision — is spraying even worth the cost — depends on the actual level.
 */
export interface SeverityBand {
  level: 'mild' | 'moderate' | 'severe';
  /** Observable threshold, e.g. "Under 10% of leaf area shows lesions". */
  threshold_en: string;
  threshold_te: string;
  /** What to do at this level, including whether intervention is economically justified. */
  action_en: string;
  action_te: string;
}

export interface PreventionStep {
  stepNumber: number;
  practice_en: string;
  practice_te: string;
  targetTiming?: string;
}

export interface TreatmentGuidanceStep {
  id: string;
  stepNumber: number;
  category: TreatmentCategory;
  instruction_en: string;
  instruction_te: string;
  activeIngredient_en?: string;
  activeIngredient_te?: string;
  safetyCaution_en?: string;
  safetyCaution_te?: string;
  regulatoryNotice_en?: string;
  regulatoryNotice_te?: string;
}

export interface DiseaseKnowledgeEntry {
  id: string; // Stable identifier e.g. 'disease-rice-blast'
  cropId: string; // References CropKnowledgeEntry.id
  name_en: string;
  name_te: string;
  /**
   * What kind of condition this is. Omitted means 'disease' for backward compatibility with
   * entries written before non-pathogenic conditions were catalogued. Read it through
   * `getConditionCategory()` in service.ts rather than directly, so the default stays in one place.
   *
   * SAFETY: anything other than 'disease'/'pest' must never be offered pesticide guidance.
   */
  conditionCategory?: ConditionCategory;
  pathogenOrVector_en: string;
  pathogenOrVector_te: string;
  urgencyLevel: 'High' | 'Medium' | 'Low';
  urgencyColor: 'red' | 'yellow' | 'green';
  observableSymptoms_en: string[];
  observableSymptoms_te: string[];
  affectedParts: string[];
  similarConditions: LookalikeCondition[];
  environmentalRiskFactors_en: string[];
  environmentalRiskFactors_te: string[];
  preventionGuidance: PreventionStep[];
  treatments: TreatmentGuidanceStep[];
  escalationThreshold_en: string;
  escalationThreshold_te: string;
  /**
   * Disease-specific chemical-suppression disclosure shown on the Chemical tab when this
   * disease has no `treatments[]` entry with `category: 'chemical'` — i.e. when its
   * chemical-class discussion was folded into an organic (or other non-chemical) entry's
   * text instead of kept as a standalone 'chemical' entry (see the Phase 5.4
   * cross-tab-discoverability fix). Rendered ALONGSIDE the generic suppression notice, never
   * in place of it, so the two can never contradict each other. Omit entirely for any disease
   * whose chemical content either doesn't exist or already has its own 'chemical'-category
   * entry (e.g. Groundnut Tikka), where this field would be redundant.
   */
  chemicalTabDetail_en?: string;
  chemicalTabDetail_te?: string;
  /**
   * Claim-level evidence notes for specific numeric/consequential fields on this entry
   * (e.g. a spray volume, a lime quantity) whose evidence support differs from what the
   * disease-wide `evidenceStatus` alone would imply. Omit entirely when no field on this
   * entry needs a claim-specific note beyond the disease-wide status and sources.
   */
  claimEvidence?: ClaimEvidenceNote[];
  /**
   * What the farmer should photograph for this specific condition. Omit when a standard
   * leaf/canopy photo genuinely suffices.
   */
  captureGuidance?: CaptureGuidance;
  /**
   * Field-checkable questions that separate this condition from its lookalikes. Omit when the
   * `similarConditions` differentiating text is already settled by the image alone.
   */
  fieldFollowUps?: FieldFollowUpQuestion[];
  /**
   * Severity bands with observable thresholds and the matching action. Omit where no meaningful
   * visual threshold exists (e.g. a systemic virus, which is all-or-nothing per plant).
   */
  severityBands?: SeverityBand[];
  sources: KnowledgeSource[];
  evidenceStatus: EvidenceStatus;
  lastUpdated: string;
}

export interface CropKnowledgeEntry {
  id: string; // Stable identifier e.g. 'crop-rice'
  name_en: string;
  name_te: string;
  scientificName: string;
  category: string;
  apMajorDistricts: string[];
  growingSeasons: string[];
  commonDiseaseIds: string[];
}

export interface AgriculturalKnowledgeCatalog {
  version: string;
  lastReviewedDate: string;
  authorityStandards: string[];
  crops: Record<string, CropKnowledgeEntry>;
  diseases: Record<string, DiseaseKnowledgeEntry>;
}
