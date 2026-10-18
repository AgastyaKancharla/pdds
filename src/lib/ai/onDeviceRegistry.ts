/**
 * Single dispatch point from a crop ID to its trained on-device TFLite classifier, if one
 * exists. The Scan flow uses this to decide whether a farmer's photo can be classified
 * locally (free, instant, works offline) before ever considering the paid cloud gateway.
 *
 * Add a new crop here the same day its on-device wrapper (e.g. riceOnDevice.ts) is wired in
 * -- this registry is the only place the Scan flow needs updating to pick it up.
 */
import type { OnDeviceClassification } from './tfliteOnDeviceModel';
import { classifyGroundnutImage } from './groundnutOnDevice';
import { classifyMaizeImage } from './maizeOnDevice';
import { classifyBananaImage } from './bananaOnDevice';
import { classifyChilliImage } from './chilliOnDevice';

export interface OnDeviceMappingResult extends OnDeviceClassification {
  mapping: {
    modelLabel: string;
    diseaseId: string | null;
    status?: 'healthy';
  };
}

type OnDeviceClassifier = (imageUri: string) => Promise<OnDeviceMappingResult[]>;

export const ON_DEVICE_MODEL_REGISTRY: Record<string, OnDeviceClassifier> = {
  'crop-groundnut': classifyGroundnutImage,
  'crop-maize': classifyMaizeImage,
  'crop-banana': classifyBananaImage,
  'crop-chilli': classifyChilliImage,
};

export function hasOnDeviceModel(cropId?: string | null): boolean {
  return !!cropId && Object.prototype.hasOwnProperty.call(ON_DEVICE_MODEL_REGISTRY, cropId);
}

export function getOnDeviceCropIds(): string[] {
  return Object.keys(ON_DEVICE_MODEL_REGISTRY);
}

/** Returns null when `cropId` has no registered on-device model -- never throws. */
export async function classifyWithOnDeviceModel(
  cropId: string,
  imageUri: string
): Promise<OnDeviceMappingResult[] | null> {
  const classifier = ON_DEVICE_MODEL_REGISTRY[cropId];
  if (!classifier) return null;
  return classifier(imageUri);
}
