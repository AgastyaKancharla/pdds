/**
 * On-device Chilli classifier: wires the generic TFLite runner (tfliteOnDeviceModel.ts)
 * to the trained Chilli model and its catalog class map.
 *
 * Only covers ONE of the 2 Chilli catalog conditions (Leaf Curl via 'Virus'; Thrips
 * has no mapped class here -- see chilliModelClassMap.ts).
 *
 * Not yet called from the farmer-facing Scan flow -- the app has no crop-selection step
 * yet, and running this blind on a non-chilli photo would force a confident but wrong
 * guess among these 3 classes (the model has no "not chilli" class). Kept ready here
 * so it's a single wiring step once that UX decision is made.
 */
import { classifyImageOnDevice, type OnDeviceClassification } from './tfliteOnDeviceModel';
import { getChilliModelMapping, type ChilliModelClassMapping } from './chilliModelClassMap';

const MODEL_URL = '/models/agastyaone_chilli_brain.tflite';

// Verified directly against the trained model's own embedded metadata.json ("names" field,
// extracted from the .tflite file's appended zip) -- not just assumed from dataset order.
const CHILLI_CLASS_NAMES = ['Healthy', 'Mites', 'Virus'];

export interface ChilliOnDeviceResult extends OnDeviceClassification {
  mapping: ChilliModelClassMapping;
}

export async function classifyChilliImage(imageUri: string): Promise<ChilliOnDeviceResult[]> {
  const predictions = await classifyImageOnDevice(imageUri, MODEL_URL, CHILLI_CLASS_NAMES);
  return predictions.map((prediction) => ({
    ...prediction,
    mapping: getChilliModelMapping(prediction.modelLabel) ?? { modelLabel: prediction.modelLabel, diseaseId: null },
  }));
}
