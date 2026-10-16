import { MOCK_DISEASES, MOCK_CROPS, SAMPLE_CROP_IMAGE } from './mockData';
import { supabase } from './supabase';
import type { UrgencyColor, DetectionFailureReason } from '../types/database';
import type { DiagnosticTier, NormalizedDiagnosis } from './ai/types';
import { validateAndNormalizeAiResponse, createFallbackDiagnosis } from './ai/validator';

export interface DetectionSuccess {
  detected: true;
  cropId: string;
  diseaseId: string;
  cropNameEn?: string;
  cropNameTe?: string;
  confidence?: number;
  isDemoSample?: boolean;
  diagnosticTier?: DiagnosticTier;
  normalizedDiagnosis?: NormalizedDiagnosis;
}

export interface DetectionFailure {
  detected: false;
  reason: DetectionFailureReason;
  messageEn: string;
  messageTe: string;
  cropNameEn?: string;
  cropNameTe?: string;
  cropId?: string;
  isDemoSample?: boolean;
  diagnosticTier?: DiagnosticTier;
  normalizedDiagnosis?: NormalizedDiagnosis;
}

export type DetectionResult = DetectionSuccess | DetectionFailure;

/**
 * Master switch for live, photo-based AI diagnosis. OFF by default: there is currently no
 * budget for the upstream AI provider, and the diagnostic accuracy of the underlying
 * general-purpose vision LLM has never been measured (see data/evaluation_manifest.json —
 * 400 fixtures specified, 0 verified on disk). Shipping an unmeasured pesticide/treatment
 * recommendation to real farmers is a safety risk this project's whole evidence-integrity
 * design exists to avoid, so the honest default is "paused," not "best effort."
 *
 * This gates ONLY the real photo -> AI gateway call. It does not touch:
 *  - the 🧪 demo/sample path (pure local mock data, see the isDemoSample branch above),
 *  - the bundled agricultural knowledge catalog (fully browsable offline), or
 *  - scan history / any other feature.
 *
 * Flip to true once there is a funded upstream tier (or a trained classifier) AND a measured
 * accuracy baseline to stand behind — not before.
 */
let aiLiveDiagnosisEnabled = false;

/**
 * Test-only seam for exercising the gateway-dispatch branch below. Never call this from
 * application code — the real app always runs with the module default above.
 */
export function __setAiLiveDiagnosisEnabledForTests(enabled: boolean): void {
  aiLiveDiagnosisEnabled = enabled;
}

/**
 * Read-only check for UI code (e.g. ScanScreen) that wants to warn the farmer BEFORE they
 * take a photo, rather than after they wait through the "analyzing" spinner only to receive
 * the paused message. Intentionally has no corresponding public setter — only
 * __setAiLiveDiagnosisEnabledForTests (test-only) and the module constant above control it.
 */
export function isAiLiveDiagnosisEnabled(): boolean {
  return aiLiveDiagnosisEnabled;
}

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

interface GatewayErrorBody {
  error?: string;
  userFacingMessageEn?: string;
  userFacingMessageTe?: string;
}

/**
 * Reads the JSON body of a failed Edge Function response. supabase-js reports a non-2xx
 * function response as an error whose `context` carries the underlying Response, so the
 * gateway's own explanation (e.g. the daily scan limit, with its reset time and RBK
 * referral) is only reachable this way. Returns null on anything unexpected — a diagnosis
 * is never derived from here, only an explanatory message, so failing to read it is
 * harmless and must never throw into the caller.
 */
async function readGatewayErrorBody(error: unknown): Promise<GatewayErrorBody | null> {
  try {
    const context = (error as { context?: unknown })?.context;
    if (!context || typeof context !== 'object') return null;
    const response = context as { json?: () => Promise<unknown> };
    if (typeof response.json !== 'function') return null;
    const body = await response.json();
    if (!body || typeof body !== 'object') return null;
    return body as GatewayErrorBody;
  } catch {
    return null;
  }
}

/**
 * Main crop disease detection function.
 * Dispatches request through secure server-side Supabase Edge Function gateway.
 * Zero direct calls to external AI APIs from the client.
 */
export async function detectDisease(
  imageUri: string,
  base64?: string,
  options?: { isDemoSample?: boolean }
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
        cropNameTe: 'వరి',
      },
      conditionAssessment: {
        conditionType: 'disease',
        diseaseId: 'disease-rice-blast',
        diseaseNameEn: matchedDisease?.name_en || 'Rice Blast',
        diseaseNameTe: matchedDisease?.name_te || 'అగ్గి తెగులు',
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
      userFacingMessageTe: 'నమూనా ప్రదర్శన ప్రివ్యూ: అగ్గి తెగులు.',
    };

    return {
      detected: true,
      cropId: 'crop-rice',
      diseaseId: 'disease-rice-blast',
      cropNameEn: matchedCrop?.name_en || 'Paddy / Rice',
      cropNameTe: matchedCrop?.name_te || 'వరి',
      isDemoSample: true,
      normalizedDiagnosis: demoDiagnosis,
    };
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
      messageTe: fallbackDiag.userFacingMessageTe,
      normalizedDiagnosis: fallbackDiag,
    };
  }

  // 2b. Live AI diagnosis is currently paused (see aiLiveDiagnosisEnabled doc comment above).
  // This is checked AFTER the free client-side pixel pre-filter (so obviously-bad images
  // still get an honest, immediate rejection) and BEFORE anything that would call the paid
  // upstream provider.
  if (!aiLiveDiagnosisEnabled) {
    const pausedDiag = createFallbackDiagnosis(
      'provider_unavailable',
      { provider: 'gateway', model: 'ai_scanning_paused' },
      {
        messageEn:
          "Live AI photo diagnosis is temporarily paused. Browse your crop's known conditions below, or visit your Rythu Bharosa Kendra (RBK) for an in-person check.",
        messageTe:
          'ప్రత్యక్ష AI ఫోటో నిర్ధారణ తాత్కాలికంగా నిలిపివేయబడింది. క్రింద మీ పంట తెలిసిన పరిస్థితులను చూడండి, లేదా ప్రత్యక్ష తనిఖీ కోసం మీ రైతు భరోసా కేంద్రం (RBK) ని సందర్శించండి.',
      }
    );
    return {
      detected: false,
      reason: 'provider_unavailable',
      messageEn: pausedDiag.userFacingMessageEn,
      messageTe: pausedDiag.userFacingMessageTe,
      normalizedDiagnosis: pausedDiag,
    };
  }

  // 3. Dispatch through Supabase Edge Function Gateway
  if (base64 && supabase) {
    try {
      if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        const offlineDiag = createFallbackDiagnosis('provider_unavailable', {
          provider: 'gateway',
          model: 'offline_detection',
        });
        return {
          detected: false,
          reason: 'provider_unavailable',
          messageEn: offlineDiag.userFacingMessageEn,
          messageTe: offlineDiag.userFacingMessageTe,
          normalizedDiagnosis: offlineDiag,
        };
      }

      const cleanBase64 = base64.replace(/^data:image\/[a-z]+;base64,/, '');
      const mimeType = base64.startsWith('data:image/png') ? 'image/png' : 'image/jpeg';

      const { data, error } = await supabase.functions.invoke('detect-crop', {
        body: {
          imageBase64: cleanBase64,
          mimeType,
        },
      });

      // A non-2xx gateway response surfaces as `error`, with the body reachable through
      // error.context. Without reading it, a farmer who has used today's scan allowance
      // would see a generic "service unavailable" and have no idea why or when it resets —
      // so the gateway's own bilingual explanation is extracted and surfaced here.
      if (error) {
        const gatewayBody = await readGatewayErrorBody(error);
        if (gatewayBody?.error === 'DailyScanLimitReached') {
          const quotaDiag = createFallbackDiagnosis('provider_unavailable', {
            provider: 'gateway',
            model: 'daily_quota',
          });
          return {
            detected: false,
            reason: 'provider_unavailable',
            messageEn: gatewayBody.userFacingMessageEn || quotaDiag.userFacingMessageEn,
            messageTe: gatewayBody.userFacingMessageTe || quotaDiag.userFacingMessageTe,
            normalizedDiagnosis: {
              ...quotaDiag,
              userFacingMessageEn: gatewayBody.userFacingMessageEn || quotaDiag.userFacingMessageEn,
              userFacingMessageTe: gatewayBody.userFacingMessageTe || quotaDiag.userFacingMessageTe,
            },
          };
        }
      }

      if (!error && data && data.success && data.rawResult) {
        const normalized = validateAndNormalizeAiResponse(data.rawResult, data.metadata || {
          provider: 'openrouter',
          model: 'server_gateway',
        });

        if (normalized.status === 'supported_diagnosis') {
          if (normalized.conditionAssessment.conditionType === 'healthy') {
            return {
              detected: false,
              reason: 'healthy',
              messageEn: normalized.userFacingMessageEn,
              messageTe: normalized.userFacingMessageTe,
              cropId: normalized.plantIdentification.cropId,
              cropNameEn: normalized.plantIdentification.cropNameEn,
              cropNameTe: normalized.plantIdentification.cropNameTe,
              normalizedDiagnosis: normalized,
            };
          }

          if (normalized.plantIdentification.cropId && normalized.conditionAssessment.diseaseId) {
            return {
              detected: true,
              cropId: normalized.plantIdentification.cropId,
              diseaseId: normalized.conditionAssessment.diseaseId,
              cropNameEn: normalized.plantIdentification.cropNameEn,
              cropNameTe: normalized.plantIdentification.cropNameTe,
              normalizedDiagnosis: normalized,
            };
          }
        }

        if (normalized.status === 'not_plant') {
          return {
            detected: false,
            reason: 'not_crop',
            messageEn: normalized.userFacingMessageEn,
            messageTe: normalized.userFacingMessageTe,
            normalizedDiagnosis: normalized,
          };
        }

        if (normalized.status === 'unusable_image' || normalized.status === 'uncertain') {
          return {
            detected: false,
            reason: 'unclear',
            messageEn: normalized.userFacingMessageEn,
            messageTe: normalized.userFacingMessageTe,
            normalizedDiagnosis: normalized,
          };
        }

        if (normalized.status === 'unsupported_crop' || normalized.status === 'unsupported_disease') {
          return {
            detected: false,
            reason: 'unsupported_crop',
            messageEn: normalized.userFacingMessageEn,
            messageTe: normalized.userFacingMessageTe,
            cropNameEn: normalized.plantIdentification.cropNameEn,
            cropNameTe: normalized.plantIdentification.cropNameTe,
            cropId: normalized.plantIdentification.cropId,
            normalizedDiagnosis: normalized,
          };
        }

        if (normalized.status === 'abiotic_stress') {
          return {
            detected: false,
            reason: 'abiotic_stress',
            messageEn: normalized.userFacingMessageEn,
            messageTe: normalized.userFacingMessageTe,
            cropNameEn: normalized.plantIdentification.cropNameEn,
            cropNameTe: normalized.plantIdentification.cropNameTe,
            cropId: normalized.plantIdentification.cropId,
            normalizedDiagnosis: normalized,
          };
        }

        if (normalized.status === 'nutrient_deficiency') {
          return {
            detected: false,
            reason: 'nutrient_deficiency',
            messageEn: normalized.userFacingMessageEn,
            messageTe: normalized.userFacingMessageTe,
            cropNameEn: normalized.plantIdentification.cropNameEn,
            cropNameTe: normalized.plantIdentification.cropNameTe,
            cropId: normalized.plantIdentification.cropId,
            normalizedDiagnosis: normalized,
          };
        }
      }
    } catch (gatewayErr) {
      console.warn('[HereForNature] Gateway invocation error:', gatewayErr);
    }
  }

  // 4. Safe offline / unavailable fallback (No fake diagnosis invented)
  const unavailableDiag = createFallbackDiagnosis('provider_unavailable', {
    provider: 'gateway',
    model: 'edge_function',
  });

  return {
    detected: false,
    reason: 'provider_unavailable',
    messageEn: unavailableDiag.userFacingMessageEn,
    messageTe: unavailableDiag.userFacingMessageTe,
    normalizedDiagnosis: unavailableDiag,
  };
}
