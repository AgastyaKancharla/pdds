/**
 * Maps the 5 output classes of the Groundnut classifier (trained on
 * Project-AgML/groundnut_leaf_disease_classification_2, CC-BY-4.0, source: Aishwarya &
 * Reddy, Data in Brief 2023 / Mendeley) to this app's own catalog condition IDs.
 *
 * Geographic provenance: the dataset's README does not state where the photos were
 * collected. The source paper's authors are India-affiliated, but that is not
 * confirmation of AP-specific (or even India-specific) field conditions -- treat the
 * resulting model the same as Rice's Vietnam-trained one: a solid first version, not
 * an AP-validated product.
 *
 * `cropId` is always 'crop-groundnut' for every class here.
 * `diseaseId: null` means "recognized, but no catalog entry exists yet" (nutrition
 * deficiency is too generic to map to a specific written guide).
 * `status: 'healthy'` is not a disease/pest id; the app's existing healthy-crop path
 * handles it (urgencyColor green, healthyCropTitle banner).
 *
 * `modelLabel` values use underscores, not the HF dataset's raw space-separated label
 * text ("healthy leaf", "late leaf spot", "nutrition deficiency") -- the training
 * notebook writes each class to a folder named `label.replace(' ', '_')` before YOLO
 * trains on it, so the model's actual output class names are the underscored form.
 */
export interface GroundnutModelClassMapping {
  modelLabel: string;
  diseaseId: string | null;
  status?: 'healthy';
}

export const GROUNDNUT_MODEL_CLASS_MAP: GroundnutModelClassMapping[] = [
  { modelLabel: 'healthy_leaf', diseaseId: null, status: 'healthy' },

  // Tikka Leaf Spot catalog entry explicitly covers both the early and late stage
  // of the disease (different fungi, same written guide) -- see catalog.ts.
  { modelLabel: 'early_leaf_spot', diseaseId: 'disease-groundnut-tikka' },
  { modelLabel: 'late_leaf_spot', diseaseId: 'disease-groundnut-tikka' },

  { modelLabel: 'rust', diseaseId: 'disease-groundnut-rust' },

  // Too generic to map -- the catalog has no single "nutrient deficiency" guide for
  // groundnut, and guessing which nutrient would be fabricating a diagnosis.
  { modelLabel: 'nutrition_deficiency', diseaseId: null },
];

export function getGroundnutModelMapping(modelLabel: string): GroundnutModelClassMapping | undefined {
  return GROUNDNUT_MODEL_CLASS_MAP.find((m) => m.modelLabel === modelLabel);
}
