/**
 * On-device Maize classifier: wires the generic TFLite runner (tfliteOnDeviceModel.ts)
 * to the trained Maize model and its catalog class map.
 *
 * Not yet called from the farmer-facing Scan flow -- the app has no crop-selection step
 * yet, and running this blind on a non-maize photo would force a confident but wrong
 * guess among these 4 classes (the model has no "not maize" class). Kept ready here
 * so it's a single wiring step once that UX decision is made.
 */
import { classifyImageOnDevice, type OnDeviceClassification } from './tfliteOnDeviceModel';
import { getMaizeModelMapping, type MaizeModelClassMapping } from './maizeModelClassMap';

const MODEL_URL = '/models/agastyaone_maize_brain.tflite';

// Verified directly against the trained model's own embedded metadata.json ("names" field,
// extracted from the .tflite file's appended zip) -- not just assumed from dataset order.
const MAIZE_CLASS_NAMES = ['healthy', 'helminthosporium_leaf_blight', 'spodoptera_frugiperda', 'zonocerus_variegatus'];

export interface MaizeOnDeviceResult extends OnDeviceClassification {
  mapping: MaizeModelClassMapping;
}

export async function classifyMaizeImage(imageUri: string): Promise<MaizeOnDeviceResult[]> {
  const predictions = await classifyImageOnDevice(imageUri, MODEL_URL, MAIZE_CLASS_NAMES);
  return predictions.map((prediction) => ({
    ...prediction,
    mapping: getMaizeModelMapping(prediction.modelLabel) ?? { modelLabel: prediction.modelLabel, diseaseId: null },
  }));
}
