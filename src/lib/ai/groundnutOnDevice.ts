/**
 * On-device Groundnut classifier: wires the generic TFLite runner (tfliteOnDeviceModel.ts)
 * to the trained Groundnut model and its catalog class map.
 *
 * Not yet called from the farmer-facing Scan flow -- the app has no crop-selection step
 * yet, and running this blind on a non-groundnut photo would force a confident but wrong
 * guess among these 5 classes (the model has no "not groundnut" class). Kept ready here
 * so it's a single wiring step once that UX decision is made.
 */
import { classifyImageOnDevice, type OnDeviceClassification } from './tfliteOnDeviceModel';
import { getGroundnutModelMapping, type GroundnutModelClassMapping } from './groundnutModelClassMap';

const MODEL_URL = '/models/agastyaone_groundnut_brain.tflite';

// Verified directly against the trained model's own embedded metadata.json ("names" field,
// extracted from the .tflite file's appended zip) -- not just assumed from dataset order.
// Re-verify this the same way for every future crop model before trusting its order:
//   python3 -c "import zipfile; z=zipfile.ZipFile('model.tflite'); print(z.read('metadata.json'))"
const GROUNDNUT_CLASS_NAMES = ['early_leaf_spot', 'healthy_leaf', 'late_leaf_spot', 'nutrition_deficiency', 'rust'];

export interface GroundnutOnDeviceResult extends OnDeviceClassification {
  mapping: GroundnutModelClassMapping;
}

export async function classifyGroundnutImage(imageUri: string): Promise<GroundnutOnDeviceResult[]> {
  const predictions = await classifyImageOnDevice(imageUri, MODEL_URL, GROUNDNUT_CLASS_NAMES);
  return predictions.map((prediction) => ({
    ...prediction,
    mapping: getGroundnutModelMapping(prediction.modelLabel) ?? { modelLabel: prediction.modelLabel, diseaseId: null },
  }));
}
