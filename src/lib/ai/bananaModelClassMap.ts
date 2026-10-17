/**
 * Maps the 3 output classes of the Banana classifier (trained on
 * Project-AgML/banana_disease_classification_tanzania, CC0-1.0, source: Mduma & Leo,
 * Data in Brief 2023 / NM-AIST Harvard Dataverse) to this app's own catalog condition IDs.
 *
 * Geographic provenance: photos were collected in Tanzania, not Andhra Pradesh. Fusarium
 * wilt (Panama Wilt) is the same pathogen worldwide, but treat the resulting model the
 * same as Rice's Vietnam-trained one: a solid first version, not an AP-validated product.
 *
 * `cropId` is always 'crop-banana' for every class here.
 * `diseaseId: null` means "recognized, but no catalog entry exists yet" -- Black
 * Sigatoka is a real, common banana disease this model can recognize, but this app has
 * no written guidance for it yet, so it must not be shown as if it did.
 * `status: 'healthy'` is not a disease/pest id; the app's existing healthy-crop path
 * handles it (urgencyColor green, healthyCropTitle banner).
 */
export interface BananaModelClassMapping {
  modelLabel: string;
  diseaseId: string | null;
  status?: 'healthy';
}

export const BANANA_MODEL_CLASS_MAP: BananaModelClassMapping[] = [
  { modelLabel: 'healthy', diseaseId: null, status: 'healthy' },
  { modelLabel: 'fusarium_wilt', diseaseId: 'disease-banana-panamawilt' },

  // Real disease, no catalog entry yet -- show an honest "detected: X, no guide yet,
  // consult RBK" response, never fabricate treatment steps.
  { modelLabel: 'black_sigatoka', diseaseId: null },
];

export function getBananaModelMapping(modelLabel: string): BananaModelClassMapping | undefined {
  return BANANA_MODEL_CLASS_MAP.find((m) => m.modelLabel === modelLabel);
}
