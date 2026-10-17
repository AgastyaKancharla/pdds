/**
 * Maps the 3 output classes of the Chilli classifier (trained on cropped bounding
 * boxes from Project-AgML/chili_leaf_curl_detection, Apache-2.0, photos from IARI,
 * New Delhi, India) to this app's own catalog condition IDs.
 *
 * Only covers ONE of the 2 Chilli catalog conditions. 'Virus' maps to Leaf Curl.
 * 'Mites' is a real, different pest from Thrips (`disease-chilli-thrips`) -- mites and
 * thrips are different arthropods, so a Mites prediction must never be shown as Thrips.
 * Thrips stays Library/manual-browse-only until a thrips-specific dataset is found.
 *
 * Geographic provenance: New Delhi is a different agro-climatic zone from Andhra
 * Pradesh. Treat the resulting model like Rice's Vietnam-trained one: a solid first
 * version, not an AP-validated product.
 *
 * `cropId` is always 'crop-chilli' for every class here.
 * `status: 'healthy'` is not a disease/pest id; the app's existing healthy-crop path
 * handles it (urgencyColor green, healthyCropTitle banner).
 */
export interface ChilliModelClassMapping {
  modelLabel: string;
  diseaseId: string | null;
  status?: 'healthy';
}

export const CHILLI_MODEL_CLASS_MAP: ChilliModelClassMapping[] = [
  { modelLabel: 'Healthy', diseaseId: null, status: 'healthy' },
  { modelLabel: 'Virus', diseaseId: 'disease-chilli-leaf-curl' },

  // Real pest, no catalog entry yet -- and NOT the same thing as the thrips entry
  // the catalog already has. Never remap this to disease-chilli-thrips.
  { modelLabel: 'Mites', diseaseId: null },
];

export function getChilliModelMapping(modelLabel: string): ChilliModelClassMapping | undefined {
  return CHILLI_MODEL_CLASS_MAP.find((m) => m.modelLabel === modelLabel);
}
