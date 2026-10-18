/**
 * Maps the 5 output classes of the Sugarcane classifier (trained on the Mendeley
 * "Sugarcane Leaf Disease Dataset", DOI 10.17632/9424skmnrk.1, CC BY 4.0, source:
 * Daphal & Koli 2022, Maharashtra-collected field photos) to this app's own catalog
 * condition IDs.
 *
 * Geographic provenance: this dataset was collected in Maharashtra, not Andhra
 * Pradesh. Red Rot (Colletotrichum falcatum) is the same pathogen nationwide, but
 * treat the resulting model like Rice's Vietnam-trained one: a solid first version,
 * not an AP-validated product.
 *
 * `cropId` is always 'crop-sugarcane' for every class here.
 * `diseaseId: null` means "recognized, but no catalog entry exists yet" -- Mosaic,
 * Rust and Yellow disease are real, legitimate sugarcane issues this model can
 * recognize, but this app has no written guidance for them yet, so they must not be
 * shown as if it did.
 * `status: 'healthy'` is not a disease/pest id; the app's existing healthy-crop path
 * handles it (urgencyColor green, healthyCropTitle banner).
 */
export interface SugarcaneModelClassMapping {
  modelLabel: string;
  diseaseId: string | null;
  status?: 'healthy';
}

export const SUGARCANE_MODEL_CLASS_MAP: SugarcaneModelClassMapping[] = [
  { modelLabel: 'Healthy', diseaseId: null, status: 'healthy' },
  { modelLabel: 'Redrot', diseaseId: 'disease-sugarcane-redrot' },

  // Real diseases, no catalog entry yet -- show an honest "detected: X, no guide
  // yet, consult RBK" response, never fabricate treatment steps.
  { modelLabel: 'Mosaic', diseaseId: null },
  { modelLabel: 'Rust', diseaseId: null },
  { modelLabel: 'Yellow_disease', diseaseId: null },
];

export function getSugarcaneModelMapping(modelLabel: string): SugarcaneModelClassMapping | undefined {
  return SUGARCANE_MODEL_CLASS_MAP.find((m) => m.modelLabel === modelLabel);
}
