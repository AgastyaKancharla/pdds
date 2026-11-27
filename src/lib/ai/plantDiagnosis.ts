import { supabase } from '../supabase';
import { ensureAnonymousSession } from '../auth';
import { getDiseaseKnowledge, isCropSupported } from '../knowledge';

/**
 * Client for the `diagnose-plant` Edge Function (Claude vision): photo check → plant ID →
 * up to three possible problems. See supabase/functions/diagnose-plant/index.ts.
 */

export type PhotoIssue =
  | 'none'
  | 'blurry'
  | 'too_dark'
  | 'too_bright'
  | 'too_far'
  | 'too_close'
  | 'obstructed'
  | 'not_a_plant'
  | 'other';

export type CandidateCategory =
  | 'fungal_disease'
  | 'bacterial_disease'
  | 'viral_disease'
  | 'pest'
  | 'nutrient_deficiency'
  | 'abiotic_stress'
  | 'other';

export interface DiagnosisCandidate {
  name: string;
  /** Verified catalog condition id, or '' when the problem is outside our catalog. */
  catalog_condition_id: string;
  category: CandidateCategory;
  likelihood: 'likely' | 'possible';
  visible_evidence: string;
}

export interface PlantDiagnosis {
  is_plant: boolean;
  photo_usable: boolean;
  photo_issue: PhotoIssue;
  retake_tip: string;
  plant: {
    common_name: string;
    scientific_name: string;
    /** Verified catalog crop id, or '' when the plant is outside our catalog. */
    catalog_crop_id: string;
    identification_confidence: 'high' | 'medium' | 'low';
  };
  health_status: 'healthy' | 'problem_found' | 'uncertain';
  candidates: DiagnosisCandidate[];
  follow_up_question: string;
  summary: string;
  general_care: string[];
}

export interface DiagnosisQuota {
  scansUsedToday: number;
  dailyLimit: number;
  scansRemainingToday: number;
}

export type DiagnosisErrorKind =
  | 'offline'
  | 'not_configured'
  | 'auth'
  | 'daily_limit'
  | 'rate_limited'
  | 'bad_image'
  | 'timeout'
  | 'server';

export type DiagnosisOutcome =
  | { ok: true; diagnosis: PlantDiagnosis; quota?: DiagnosisQuota; model?: string }
  | { ok: false; kind: DiagnosisErrorKind; message: string; retryable: boolean };

/** What the result screen should lead with. Derived only from the model's own report. */
export type DiagnosisView = 'not_plant' | 'unclear_photo' | 'healthy' | 'likely' | 'possible' | 'uncertain';

export function getDiagnosisView(d: PlantDiagnosis): DiagnosisView {
  if (!d.is_plant) return 'not_plant';
  if (!d.photo_usable) return 'unclear_photo';
  if (d.health_status === 'healthy') return 'healthy';
  if (d.candidates.length === 0) return 'uncertain';
  if (d.health_status === 'problem_found' && d.candidates[0].likelihood === 'likely') return 'likely';
  if (d.health_status === 'problem_found') return 'possible';
  return 'uncertain';
}

/**
 * Defensive second pass on the client: an id is only kept if this build's catalog has it and
 * the condition belongs to the identified crop. Anything else is shown as an unverified,
 * AI-named result with no treatment guide attached.
 */
export function normalizeDiagnosis(raw: unknown): PlantDiagnosis | null {
  if (!raw || typeof raw !== 'object') return null;
  const d = raw as PlantDiagnosis;
  if (typeof d.is_plant !== 'boolean' || !d.plant || !Array.isArray(d.candidates)) return null;

  const cropId = d.plant.catalog_crop_id && isCropSupported(d.plant.catalog_crop_id) ? d.plant.catalog_crop_id : '';
  const candidates = d.candidates.slice(0, 3).map((c) => {
    const condition = c.catalog_condition_id ? getDiseaseKnowledge(c.catalog_condition_id) : null;
    const keep = !!condition && !!cropId && condition.cropId === cropId;
    return { ...c, catalog_condition_id: keep ? c.catalog_condition_id : '' };
  });

  return {
    ...d,
    plant: { ...d.plant, catalog_crop_id: cropId },
    candidates,
    general_care: Array.isArray(d.general_care) ? d.general_care.slice(0, 4) : [],
  };
}

interface GatewayErrorBody {
  error?: string;
  message?: string;
  retryable?: boolean;
}

async function readErrorBody(error: unknown): Promise<GatewayErrorBody | null> {
  try {
    const context = (error as { context?: unknown })?.context as { json?: () => Promise<unknown> } | undefined;
    if (!context || typeof context.json !== 'function') return null;
    const body = await context.json();
    return body && typeof body === 'object' ? (body as GatewayErrorBody) : null;
  } catch {
    return null;
  }
}

export function mapGatewayError(body: GatewayErrorBody | null, httpStatus?: number): { kind: DiagnosisErrorKind; message: string; retryable: boolean } {
  const code = body?.error;
  const serverMessage = body?.message;
  switch (code) {
    case 'DailyScanLimitReached':
      return { kind: 'daily_limit', message: serverMessage || "You've used today's scans. The limit resets after midnight.", retryable: false };
    case 'Unauthorized':
      return { kind: 'auth', message: serverMessage || 'Your session expired. Please reload the app and try again.', retryable: true };
    case 'ConfigurationError':
    case 'AiKeyRejected':
      return { kind: 'not_configured', message: 'The AI service is not set up correctly on the server. Please try again later.', retryable: false };
    case 'AiRateLimited':
      return { kind: 'rate_limited', message: 'The AI service is busy right now. Please try again in a minute.', retryable: true };
    case 'AiTimeout':
      return { kind: 'timeout', message: 'The AI took too long to answer. Please try again.', retryable: true };
    case 'PayloadTooLarge':
    case 'UnsupportedImage':
    case 'AiBadRequest':
    case 'BadRequest':
      return { kind: 'bad_image', message: serverMessage || 'This photo could not be read. Please try a different photo.', retryable: false };
    default:
      if (httpStatus === 401) return { kind: 'auth', message: 'Your session expired. Please reload the app and try again.', retryable: true };
      return { kind: 'server', message: serverMessage || 'The AI service had a problem. Please try again.', retryable: true };
  }
}

export async function diagnosePlant(imageDataUrl: string, cropHint?: string): Promise<DiagnosisOutcome> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return { ok: false, kind: 'offline', message: "You're offline. Connect to the internet to scan a photo.", retryable: true };
  }
  if (!supabase) {
    return { ok: false, kind: 'not_configured', message: 'The app is not connected to its server. Please try again later.', retryable: false };
  }

  // The gateway meters scans per signed-in (anonymous) user, so make sure a session exists.
  await ensureAnonymousSession();

  try {
    const { data, error } = await supabase.functions.invoke('diagnose-plant', {
      body: { imageBase64: imageDataUrl, cropHint: cropHint || undefined },
    });

    if (error) {
      const body = await readErrorBody(error);
      const status = (error as { context?: { status?: number } })?.context?.status;
      const isNetwork = (error as { name?: string })?.name === 'FunctionsFetchError';
      if (isNetwork && !body) {
        return { ok: false, kind: 'offline', message: 'Could not reach the server. Check your internet connection and try again.', retryable: true };
      }
      return { ok: false, ...mapGatewayError(body, status) };
    }

    const diagnosis = normalizeDiagnosis((data as { diagnosis?: unknown })?.diagnosis);
    if (!diagnosis) {
      return { ok: false, kind: 'server', message: 'The AI returned an unreadable answer. Please try again.', retryable: true };
    }
    const typed = data as { quota?: DiagnosisQuota; metadata?: { model?: string } };
    return { ok: true, diagnosis, quota: typed.quota, model: typed.metadata?.model };
  } catch (err) {
    console.warn('[HereForNature] diagnose-plant failed:', err);
    return { ok: false, kind: 'server', message: 'Something went wrong while scanning. Please try again.', retryable: true };
  }
}

export const CATEGORY_LABELS: Record<CandidateCategory, string> = {
  fungal_disease: 'Fungal disease',
  bacterial_disease: 'Bacterial disease',
  viral_disease: 'Viral disease',
  pest: 'Pest',
  nutrient_deficiency: 'Nutrient problem',
  abiotic_stress: 'Growing conditions',
  other: 'Other',
};
