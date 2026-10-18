/**
 * On-device Banana classifier: wires the generic TFLite runner (tfliteOnDeviceModel.ts)
 * to the trained Banana model and its catalog class map.
 *
 * Not yet called from the farmer-facing Scan flow -- the app has no crop-selection step
 * yet, and running this blind on a non-banana photo would force a confident but wrong
 * guess among these 3 classes (the model has no "not banana" class). Kept ready here
 * so it's a single wiring step once that UX decision is made.
 */
import { classifyImageOnDevice, type OnDeviceClassification } from './tfliteOnDeviceModel';
import { getBananaModelMapping, type BananaModelClassMapping } from './bananaModelClassMap';

const MODEL_URL = '/models/agastyaone_banana_brain.tflite';

// Verified directly against the trained model's own embedded metadata.json ("names" field,
// extracted from the .tflite file's appended zip) -- not just assumed from dataset order.
const BANANA_CLASS_NAMES = ['black_sigatoka', 'fusarium_wilt', 'healthy'];

export interface BananaOnDeviceResult extends OnDeviceClassification {
  mapping: BananaModelClassMapping;
}

export async function classifyBananaImage(imageUri: string): Promise<BananaOnDeviceResult[]> {
  const predictions = await classifyImageOnDevice(imageUri, MODEL_URL, BANANA_CLASS_NAMES);
  return predictions.map((prediction) => ({
    ...prediction,
    mapping: getBananaModelMapping(prediction.modelLabel) ?? { modelLabel: prediction.modelLabel, diseaseId: null },
  }));
}
