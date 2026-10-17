/**
 * Maps the 21 output classes of the Rice classifier (trained on minhhungg/rice-disease-
 * dataset, Apache-2.0, Vietnam-collected field photos -- see
 * supabase/migrations or docs for provenance) to this app's own catalog condition IDs.
 *
 * Only 6 of the 21 classes have an existing curated catalog entry. The rest are real,
 * legitimate rice issues the model can recognize but this app has no written guidance for
 * yet -- when the model predicts one of those, the app must show an honest "detected: X,
 * no detailed guide yet, consult RBK" response, never fabricate treatment steps for an
 * ID that resolves to nothing.
 *
 * `cropId` is always 'crop-rice' for every class here (this model only knows rice).
 * `diseaseId: null` means "recognized, but no catalog entry exists yet" -- see above.
 * `status: 'healthy'` is not a disease/pest id; the app's existing healthy-crop path
 * handles it (urgencyColor green, healthyCropTitle banner).
 */
export interface RiceModelClassMapping {
  modelLabel: string;
  diseaseId: string | null;
  status?: 'healthy';
}

export const RICE_MODEL_CLASS_MAP: RiceModelClassMapping[] = [
  // Healthy
  { modelLabel: 'Healthy', diseaseId: null, status: 'healthy' },

  // Diseases -- catalog matches
  { modelLabel: 'Blast', diseaseId: 'disease-rice-blast' },
  { modelLabel: 'Bacterial Leaf Blight', diseaseId: 'disease-rice-blb' },
  { modelLabel: 'Brown Spot', diseaseId: 'disease-rice-brownspot' },
  { modelLabel: 'Sheath Blight', diseaseId: 'disease-rice-sheathblight' },

  // Diseases -- no catalog entry yet
  { modelLabel: 'Leaf Scald', diseaseId: null },
  { modelLabel: 'Narrow Brown Spot', diseaseId: null },
  { modelLabel: 'Bakanae Disease', diseaseId: null },
  { modelLabel: 'False Smut', diseaseId: null },

  // Pests -- catalog match
  { modelLabel: 'Yellow Stem Borer', diseaseId: 'disease-rice-stemborer' },
  { modelLabel: 'Rice Gall Midge', diseaseId: 'disease-rice-gallmidge' },

  // Pests -- no catalog entry yet
  { modelLabel: 'Tungro Virus', diseaseId: null },
  { modelLabel: 'Hispa', diseaseId: null },
  { modelLabel: 'Chilo Stem Borer', diseaseId: null },
  { modelLabel: 'Rice Leaf Folder', diseaseId: null },
  { modelLabel: 'Thrips', diseaseId: null },
  { modelLabel: 'Rice Skipper', diseaseId: null },
  { modelLabel: 'Brown Plant Hopper', diseaseId: null },

  // Nutrient deficiencies -- none match the catalog's Zinc Deficiency (Khaira); this
  // dataset only covers N/P/K, so the model can never predict zinc deficiency. Khaira
  // stays Library/manual-browse-only until a dataset with zinc-deficiency examples is found.
  { modelLabel: 'Nitrogen Deficiency', diseaseId: null },
  { modelLabel: 'Potassium Deficiency', diseaseId: null },
  { modelLabel: 'Phosphorus Deficiency', diseaseId: null },
];

export function getRiceModelMapping(modelLabel: string): RiceModelClassMapping | undefined {
  return RICE_MODEL_CLASS_MAP.find((m) => m.modelLabel === modelLabel);
}
