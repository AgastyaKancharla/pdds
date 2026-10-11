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
}

export interface LookalikeCondition {
  id: string;
  name_en: string;
  name_te: string;
  isPathological: boolean; // true = pest/disease, false = nutrient deficiency / abiotic stress / weather
  differentiatingFactors_en: string;
  differentiatingFactors_te: string;
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
