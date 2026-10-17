/**
 * Maps the 4 output classes of the Maize classifier (trained on
 * Project-AgML/corn_leaf_pest_classification, CC-BY-4.0, source: Tchokogoue et al.,
 * Data in Brief 2025, Cameroon-collected field photos) to this app's own catalog
 * condition IDs.
 *
 * 'helminthosporium_leaf_blight' is the older name for the fungus Exserohilum
 * turcicum -- the exact pathogen behind `disease-maize-turcicumblight`.
 * 'spodoptera_frugiperda' is Fall Armyworm's scientific name -- the exact pest
 * behind `disease-maize-armyworm`. Both catalog diseases are covered by this one
 * dataset.
 *
 * Geographic provenance: this dataset was collected in Cameroon, not Andhra Pradesh.
 * The pest and fungus are the same species found in AP, but the photos aren't local --
 * treat the resulting model like Rice's Vietnam-trained one: a solid first version,
 * not an AP-validated product.
 *
 * `cropId` is always 'crop-maize' for every class here.
 * `status: 'healthy'` is not a disease/pest id; the app's existing healthy-crop path
 * handles it (urgencyColor green, healthyCropTitle banner).
 */
export interface MaizeModelClassMapping {
  modelLabel: string;
  diseaseId: string | null;
  status?: 'healthy';
}

export const MAIZE_MODEL_CLASS_MAP: MaizeModelClassMapping[] = [
  { modelLabel: 'healthy', diseaseId: null, status: 'healthy' },
  { modelLabel: 'helminthosporium_leaf_blight', diseaseId: 'disease-maize-turcicumblight' },
  { modelLabel: 'spodoptera_frugiperda', diseaseId: 'disease-maize-armyworm' },

  // A grasshopper pest, not in the catalog yet -- show an honest "detected: X, no
  // guide yet, consult RBK" response, never fabricate treatment steps.
  { modelLabel: 'zonocerus_variegatus', diseaseId: null },
];

export function getMaizeModelMapping(modelLabel: string): MaizeModelClassMapping | undefined {
  return MAIZE_MODEL_CLASS_MAP.find((m) => m.modelLabel === modelLabel);
}
