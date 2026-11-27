import { MOCK_DISEASES, MOCK_CROPS, SAMPLE_CROP_IMAGE } from './mockData';
import type { UrgencyColor, DetectionFailureReason } from '../types/database';
import type { DiagnosticTier, NormalizedDiagnosis } from './ai/types';
import { createFallbackDiagnosis } from './ai/validator';
import { hasOnDeviceModel, classifyWithOnDeviceModel, getOnDeviceCropIds } from './ai/onDeviceRegistry';
import { getCropKnowledge } from './knowledge';

export interface DetectionSuccess {
  detected: true;
  cropId: string;
  diseaseId: string;
  cropNameEn?: string;
  confidence?: number;
  isDemoSample?: boolean;
  diagnosticTier?: DiagnosticTier;
  normalizedDiagnosis?: NormalizedDiagnosis;
}

export interface DetectionFailure {
  detected: false;
  reason: DetectionFailureReason;
  messageEn: string;
  cropNameEn?: string;
  cropId?: string;
  isDemoSample?: boolean;
  diagnosticTier?: DiagnosticTier;
  normalizedDiagnosis?: NormalizedDiagnosis;
}

export type DetectionResult = DetectionSuccess | DetectionFailure;

/**
 * @deprecated Categorical urgency must be determined by validated disease catalog data, not raw AI confidence scores.
 * High confidence on a minor leaf spot should not be labeled urgent red, nor should low confidence on lethal blight be labeled green.
 * Retained for legacy backward compatibility.
 */
export function urgencyFromConfidence(confidence?: number): UrgencyColor {
  if (confidence === undefined || confidence === null) return 'yellow';
  if (confidence >= 0.75) return 'red';
  if (confidence >= 0.4) return 'yellow';
  return 'green';
}

export interface PixelEvaluation {
  isCrop: boolean;
  reason?: 'not_crop' | 'unclear';
}

/**
 * Fast client-side pixel degeneracy pre-screening.
 * Detects extreme non-photographic inputs (100% blank frames, completely transparent captures,
 * or zero-texture synthetic flat color blocks) before network dispatch.
 *
 * NOTE: Color hue (greenness) is NEVER used as a criterion for plant existence.
 * Necrotic brown foliar lesions, yellow chlorosis, purple anthocyanin, and white cotton bolls
 * must never be rejected by client-side heuristics.
 */
export function evaluatePixelBuffer(
  data: Uint8ClampedArray | Uint8Array,
  width: number,
  height: number
): { isCrop: boolean; reason?: 'not_crop' | 'unclear' } {
  const totalPixels = width * height;
  if (totalPixels === 0) {
    return { isCrop: false, reason: 'unclear' };
  }

  let blankOrTransparentPixels = 0;
  let validPixelCount = 0;
  let sumLuma = 0;
  let sumLumaSq = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Transparent, over-saturated pure white or pitch black
    if (a < 15 || (r > 252 && g > 252 && b > 252) || (r < 4 && g < 4 && b < 4)) {
      blankOrTransparentPixels++;
    }

    if (a >= 40) {
      // Standard Rec. 601 luma
      const luma = 0.299 * r + 0.587 * g + 0.114 * b;
      sumLuma += luma;
      sumLumaSq += luma * luma;
      validPixelCount++;
    }
  }

  // 1. Extreme degeneracy: >= 98% blank or transparent
  if (blankOrTransparentPixels / totalPixels >= 0.98) {
    return { isCrop: false, reason: 'unclear' };
  }

  // 2. Flat zero-texture artificial graphic test:
  // Natural field photos have luminance variance > 8. Synthetic flat color swatches have variance < 2.
  if (validPixelCount > 30) {
    const mean = sumLuma / validPixelCount;
    const variance = sumLumaSq / validPixelCount - mean * mean;
    if (variance < 4.0) {
      // Completely flat, single-color graphic block with zero texture
      return { isCrop: false, reason: 'not_crop' };
    }
  }

  // Allow all natural photographic foliage of any color (green, chlorotic yellow, necrotic brown, cotton white)
  return { isCrop: true };
}

function analyzeImageViaCanvas(imageUri: string): Promise<PixelEvaluation> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.resolve({ isCrop: true });
  }

  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const size = 64;
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) {
            resolve({ isCrop: true });
            return;
          }

          ctx.drawImage(img, 0, 0, size, size);
          const imgData = ctx.getImageData(0, 0, size, size);
          const evaluation = evaluatePixelBuffer(imgData.data, size, size);
          resolve(evaluation);
        } catch {
          resolve({ isCrop: true });
        }
      };
      img.onerror = () => resolve({ isCrop: true });
      img.src = imageUri;
    } catch {
      resolve({ isCrop: true });
    }
  });
}


/**
 * Main crop disease detection function.
 * Offline/demo detection: the demo sample and the on-device models. The online photo
 * diagnosis (any plant) is `diagnosePlant()` in ai/plantDiagnosis.ts.
 */
/**
 * A top on-device prediction below this confidence is treated as "not sure enough" and
 * falls through to the offline sweep instead. Not a measured threshold -- these models have
 * no accuracy baseline against real AP field photos yet -- just a conservative placeholder
 * above random-chance for their (small, 4-6 class) output spaces. Revisit once real usage
 * data exists.
 */
const ON_DEVICE_CONFIDENCE_THRESHOLD = 0.5;

/**
 * Runs the crop's on-device TFLite classifier when one exists and the farmer told us which
 * crop this is. Returns null (meaning "fall through to the offline sweep below") when: no
 * model is registered for this crop, the top prediction isn't confident enough, or the
 * classifier itself throws (e.g. the model/WASM assets failed to load). Never throws.
 */
async function runOnDeviceDetection(cropId: string, imageUri: string): Promise<DetectionResult | null> {
  try {
    const predictions = await classifyWithOnDeviceModel(cropId, imageUri);
    if (!predictions || predictions.length === 0) return null;

    const top = predictions[0];
    if (top.confidence < ON_DEVICE_CONFIDENCE_THRESHOLD) return null;

    const crop = getCropKnowledge(cropId);
    const cropNameEn = crop?.name_en;

    if (top.mapping.status === 'healthy') {
      return {
        detected: false,
        reason: 'healthy',
        messageEn:
          'Your plant looks healthy — the on-device model found no signs of disease or common pests in this photo.',
        cropId,
        cropNameEn,
        diagnosticTier: 'ai_preliminary_hypothesis',
      };
    }

    if (top.mapping.diseaseId) {
      return {
        detected: true,
        cropId,
        diseaseId: top.mapping.diseaseId,
        cropNameEn,
        confidence: top.confidence,
        diagnosticTier: 'ai_preliminary_hypothesis',
      };
    }

    // The model recognized a real class (e.g. a pest not yet in the catalog) but there is no
    // treatment guide for it -- be honest about what was detected rather than silently
    // falling back or fabricating guidance for an unmapped class.
    const readableLabel = top.modelLabel.replace(/_/g, ' ');
    return {
      detected: false,
      reason: 'unclear',
      messageEn: `The on-device model detected "${readableLabel}", which doesn't have a treatment guide in this app yet. Please consult your local agriculture extension office.`,
      cropId,
      cropNameEn,
    };
  } catch (err) {
    console.warn('[HereForNature] On-device classification error, falling back to the offline sweep:', err);
    return null;
  }
}

/**
 * Last-resort local fallback, tried after the selected crop's model (if any) and
 * failed to produce a usable diagnosis (network error, every model in the server's chain
 * failing, or an unrecognized response shape). Sweeps every crop with a registered on-device
 * model -- not just a crop the farmer may have selected -- since this exists specifically for
 * the "Not Sure / Skip" flow where no crop was chosen and on-device classification in step 1b
 * never ran at all. `excludeCropId` skips a crop already tried at step 1b, so a selected-crop
 * scan that already ran its on-device model doesn't redundantly run it again here.
 *
 * Tries crops in registry order and returns the first confident match; this is a safety net
 * for when the cloud is unavailable; it isn't trying to find the single best match across
 * crops the way a real multi-crop classifier would. Never throws.
 */
async function runOnDeviceFallbackSweep(
  imageUri: string,
  excludeCropId?: string
): Promise<DetectionResult | null> {
  for (const cropId of getOnDeviceCropIds()) {
    if (cropId === excludeCropId) continue;
    const result = await runOnDeviceDetection(cropId, imageUri);
    if (result) return result;
  }
  return null;
}

export async function detectDisease(
  imageUri: string,
  base64?: string,
  options?: { isDemoSample?: boolean; selectedCropId?: string }
): Promise<DetectionResult> {
  // 1. Explicit Demo Sample Handling
  // Samples are transparently flagged as demo/illustrative previews and never masquerade as real live inference.
  if (
    options?.isDemoSample ||
    imageUri === SAMPLE_CROP_IMAGE ||
    (typeof imageUri === 'string' && imageUri.includes('sample-crop'))
  ) {
    const matchedCrop = MOCK_CROPS.find((c) => c.id === 'crop-rice');
    const matchedDisease = MOCK_DISEASES.find((d) => d.id === 'disease-rice-blast');

    const demoDiagnosis: NormalizedDiagnosis = {
      schemaVersion: '1.0.0',
      status: 'supported_diagnosis',
      plantIdentification: {
        identified: true,
        cropId: 'crop-rice',
        cropNameEn: 'Paddy / Rice',
      },
      conditionAssessment: {
        conditionType: 'disease',
        diseaseId: 'disease-rice-blast',
        diseaseNameEn: matchedDisease?.name_en || 'Rice Blast',
        visualSymptoms: [
          'Spindle-shaped lesions with brown borders and ash-gray centers appear on leaf blades and nodes.',
        ],
        urgencyColor: 'red',
      },
      limitations: [
        'Pre-recorded reference sample for demonstration purposes.',
        'Not a live field scan.',
      ],
      recommendedActions: [
        'Demonstration mode: explore organic, chemical, and preventive remedies.',
      ],
      evidenceReferences: ['Vyavasaya Panchangam (ANGRAU)'],
      diagnosticTier: 'demonstration_sample',
      metadata: {
        provider: 'demo',
        model: 'sample-demonstration-preset',
        isDemoSample: true,
        timestamp: new Date().toISOString(),
      },
      userFacingMessageEn: 'Demonstration sample preview: Rice Blast.',
    };

    return {
      detected: true,
      cropId: 'crop-rice',
      diseaseId: 'disease-rice-blast',
      cropNameEn: matchedCrop?.name_en || 'Paddy / Rice',
      isDemoSample: true,
      normalizedDiagnosis: demoDiagnosis,
    };
  }

  // 1b. On-device classification, when the farmer told us which crop this is and a trained
  // local model exists for it. Runs before the pixel pre-filter and entirely independent of
  // network -- it's free, instant, and works offline. Falls through to the offline sweep below
  // when no model is registered for
  // this crop, the top prediction isn't confident enough, or the farmer skipped crop selection.
  if (options?.selectedCropId && hasOnDeviceModel(options.selectedCropId)) {
    const onDeviceResult = await runOnDeviceDetection(options.selectedCropId, imageUri);
    if (onDeviceResult) return onDeviceResult;
  }

  // 2. Client-side pixel quality pre-screening
  const pixelEval = await analyzeImageViaCanvas(imageUri);
  if (!pixelEval.isCrop) {
    const isGraphic = pixelEval.reason === 'not_crop';
    const fallbackDiag = createFallbackDiagnosis(isGraphic ? 'not_plant' : 'unusable_image', {
      provider: 'client_filter',
      model: 'canvas_prefilter',
    });

    return {
      detected: false,
      reason: isGraphic ? 'not_crop' : 'unclear',
      messageEn: fallbackDiag.userFacingMessageEn,
      normalizedDiagnosis: fallbackDiag,
    };
  }

  // 3. Sweep the on-device trained models for every crop (not just a selected one), skipping
  // a crop already tried at step 1b. This is the offline path: the online photo diagnosis is
  // the Claude-powered `diagnose-plant` Edge Function, called from ScanScreen before this.
  const sweepResult = await runOnDeviceFallbackSweep(imageUri, options?.selectedCropId);
  if (sweepResult) return sweepResult;

  // 4. No on-device model recognized the photo confidently. Say so plainly and point to the
  // online scan, which identifies any plant.
  const unavailableDiag = createFallbackDiagnosis(
    'provider_unavailable',
    { provider: 'on_device', model: 'offline_sweep' },
    {
      messageEn:
        "We could not identify this image with the offline models. Connect to the internet for a full scan of any plant, or retake a clear, close-up photo of the affected leaf in good daylight.",
    }
  );

  return {
    detected: false,
    reason: 'provider_unavailable',
    messageEn: unavailableDiag.userFacingMessageEn,
    normalizedDiagnosis: unavailableDiag,
  };
}
