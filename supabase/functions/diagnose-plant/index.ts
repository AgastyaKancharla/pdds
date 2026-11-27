/**
 * HereForNature (PDDS) — Supabase Edge Function: diagnose-plant
 *
 * Photo → plant identification → up to three possible problems, using Claude vision.
 *
 * Pipeline (mirrors how Plantix / Kindwise structure diagnosis):
 *   1. Is there a plant in the photo, and is the photo usable? (named reasons + a retake tip)
 *   2. Which plant is it? (any plant — catalog crops are matched to our verified ids)
 *   3. Healthy, or which problems could it be? (ranked, at most 3, with visible evidence)
 *
 * Design rules that follow from the research (reports/How plant disease detection works.md):
 *   - Never one confident guess: return a short ranked list with likelihood words, not
 *     percentages — a model's self-reported confidence barely tracks accuracy.
 *   - Constrain answers to our catalog where possible; that is both the biggest accuracy lever
 *     and what links an answer to vetted treatment/safety content.
 *   - Treatment text is never written here. The client shows verified catalog guidance, and for
 *     anything outside the catalog only general, non-chemical care steps.
 *
 * Models: Claude Sonnet 5.5 first, Claude Haiku 5.5 as fallback (overload, timeout, bad output).
 * Output uses structured outputs (output_config.format = json_schema), so the response always
 * matches REPORT_SCHEMA. (Forced tool_choice is not supported on current Claude models.)
 *
 * Required secret: ANTHROPIC_API_KEY. Optional: ANTHROPIC_PRIMARY_MODEL, ANTHROPIC_FALLBACK_MODEL,
 * AI_DAILY_SCAN_LIMIT. SUPABASE_URL / SUPABASE_ANON_KEY are provided by the platform.
 */
import catalogIndex from './catalogIndex.json' with { type: 'json' };

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const DEFAULT_PRIMARY_MODEL = 'claude-sonnet-5-5';
const DEFAULT_FALLBACK_MODEL = 'claude-haiku-5-5';
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';
const MAX_TOKENS = 1500;
const MODEL_TIMEOUT_MS = 40_000;
const MAX_IMAGE_PAYLOAD_CHARS = 7 * 1024 * 1024; // base64 chars (~5 MB image)
const DEFAULT_DAILY_SCAN_LIMIT = 50;
const ALLOWED_MEDIA_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

interface CatalogCrop { id: string; name: string; scientificName: string }
interface CatalogCondition { id: string; cropId: string; name: string; category: string; keySymptoms: string[] }
const CATALOG = catalogIndex as { crops: CatalogCrop[]; conditions: CatalogCondition[] };
const CROP_IDS = new Set(CATALOG.crops.map((c) => c.id));
const CONDITION_BY_ID = new Map(CATALOG.conditions.map((c) => [c.id, c]));

const PHOTO_ISSUES = ['none', 'blurry', 'too_dark', 'too_bright', 'too_far', 'too_close', 'obstructed', 'not_a_plant', 'other'] as const;
const CATEGORIES = ['fungal_disease', 'bacterial_disease', 'viral_disease', 'pest', 'nutrient_deficiency', 'abiotic_stress', 'other'] as const;

const REPORT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['is_plant', 'photo_usable', 'photo_issue', 'retake_tip', 'plant', 'health_status', 'candidates', 'follow_up_question', 'summary', 'general_care'],
  properties: {
    is_plant: { type: 'boolean', description: 'True if a real plant (or clearly identifiable plant part) is the main subject.' },
    photo_usable: { type: 'boolean', description: 'False if the photo is too poor to judge plant health at all.' },
    photo_issue: { type: 'string', enum: [...PHOTO_ISSUES] },
    retake_tip: { type: 'string', description: 'One short, specific tip to get a better photo. Empty string if the photo is fine.' },
    plant: {
      type: 'object',
      additionalProperties: false,
      required: ['common_name', 'scientific_name', 'catalog_crop_id', 'identification_confidence'],
      properties: {
        common_name: { type: 'string', description: 'Common English name. Empty string if no plant.' },
        scientific_name: { type: 'string', description: 'Genus species if known, genus alone if unsure, else empty string.' },
        catalog_crop_id: { type: 'string', description: 'Matching crop id from the catalog, or empty string if the plant is not in the catalog.' },
        identification_confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
      },
    },
    health_status: { type: 'string', enum: ['healthy', 'problem_found', 'uncertain'] },
    candidates: {
      type: 'array',
      description: 'Possible problems, most likely first. Empty if healthy or no plant.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'catalog_condition_id', 'category', 'likelihood', 'visible_evidence'],
        properties: {
          name: { type: 'string', description: 'Common English name of the problem.' },
          catalog_condition_id: { type: 'string', description: 'Matching condition id from the catalog (must belong to the identified crop), or empty string.' },
          category: { type: 'string', enum: [...CATEGORIES] },
          likelihood: { type: 'string', enum: ['likely', 'possible'] },
          visible_evidence: { type: 'string', description: 'What in THIS photo supports it, in one plain sentence.' },
        },
      },
    },
    follow_up_question: { type: 'string', description: 'One yes/no question the farmer can answer to tell the top two candidates apart. Empty string if not needed.' },
    summary: { type: 'string', description: 'Two short plain-English sentences for a farmer: what the plant is and what you see.' },
    general_care: {
      type: 'array',
      items: { type: 'string' },
      description: 'Up to 4 safe, non-chemical next steps (sanitation, watering, isolation, getting expert confirmation). Never pesticide names or doses.',
    },
  },
} as const;

function buildSystemPrompt(): string {
  const crops = CATALOG.crops.map((c) => `${c.id} | ${c.name} (${c.scientificName})`).join('\n');
  const conditions = CATALOG.conditions
    .map((c) => `${c.id} | ${c.cropId} | ${c.name} | ${c.category} | ${c.keySymptoms.join(' ; ')}`)
    .join('\n');

  return `You are the plant-health vision analyst for HereForNature, an app used by farmers and gardeners in every country.
You look at ONE photo and report what you can actually see. You never invent details that are not visible.

How to analyse, in order:
1. Plant check: is a real plant (leaf, stem, fruit, flower, whole plant or crop field) the main subject? Drawings, screens showing a plant, plastic plants, food on a plate, people, animals and objects are not plants. If not a plant, set is_plant=false, photo_issue="not_a_plant", leave plant names empty and candidates empty.
2. Photo quality: if blur, darkness, glare, distance or obstruction makes health impossible to judge, set photo_usable=false, pick the matching photo_issue and give one specific retake_tip (e.g. "Move closer so one affected leaf fills the frame, in daylight"). Still identify the plant if you can.
3. Identify the plant: any species — crops, vegetables, fruit trees, ornamentals, houseplants, weeds. If it matches a crop in the CATALOG CROPS list, put that id in catalog_crop_id; otherwise empty string. Be honest with identification_confidence.
4. Health: decide healthy / problem_found / uncertain. Consider pests, fungal, bacterial and viral disease, nutrient deficiency AND abiotic stress (water, heat, sunscald, herbicide, mechanical damage, natural ageing). Many leaf spots are not infections.
5. Candidates: at most 3, most likely first. Use likelihood "likely" ONLY when the visible signs are distinctive; otherwise "possible". If the crop is in the catalog and a catalog condition for THAT crop fits, use its id in catalog_condition_id and its name. Never put a condition id that belongs to a different crop. A condition outside the catalog is fine — give its common name and leave the id empty.
6. If the top two candidates are hard to tell apart from the photo, ask one yes/no follow_up_question a farmer could answer by looking at the plant.
7. general_care: up to 4 safe, non-chemical steps that are sensible whatever the exact cause. Never name pesticides, fungicides or doses — the app shows verified treatment guidance separately.

Write for a farmer: plain words, short sentences, no jargon without explanation.
Answer only with the JSON object described by the schema.

CATALOG CROPS (id | name):
${crops}

CATALOG CONDITIONS (id | crop id | name | category | key symptoms):
${conditions}`;
}

const SYSTEM_PROMPT = buildSystemPrompt();

interface QuotaDecision { allowed: boolean; scans_used: number; daily_limit: number; scans_remaining: number }

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}

async function callUserRpc(supabaseUrl: string, anonKey: string, userJwt: string, fnName: string, body: Record<string, unknown>) {
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/${fnName}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: anonKey, Authorization: `Bearer ${userJwt}` },
    body: JSON.stringify(body),
  });
  let data: unknown = null;
  try { data = await res.json(); } catch { data = null; }
  return { ok: res.ok, status: res.status, data };
}

function str(value: unknown, max = 400): string {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '';
}

function pick<T extends readonly string[]>(value: unknown, allowed: T, fallback: T[number]): T[number] {
  if (typeof value !== 'string') return fallback;
  const v = value.trim().toLowerCase();
  return (allowed as readonly string[]).find((a) => a === v) ?? fallback;
}

/** Re-validates the model's report so the client never receives an id we can't back up. */
function sanitizeReport(raw: Record<string, unknown>) {
  const plantRaw = (raw.plant ?? {}) as Record<string, unknown>;
  let cropId = str(plantRaw.catalog_crop_id, 60);
  if (!CROP_IDS.has(cropId)) cropId = '';

  const isPlant = raw.is_plant === true;
  const candidatesRaw = Array.isArray(raw.candidates) ? raw.candidates.slice(0, 3) : [];
  const candidates = isPlant
    ? candidatesRaw
        .map((c) => {
          const cand = (c ?? {}) as Record<string, unknown>;
          let conditionId = str(cand.catalog_condition_id, 80);
          const condition = CONDITION_BY_ID.get(conditionId);
          // A catalog condition is only trusted when it belongs to the identified catalog crop.
          if (!condition || !cropId || condition.cropId !== cropId) conditionId = '';
          return {
            name: str(cand.name, 120) || (condition && conditionId ? condition.name : ''),
            catalog_condition_id: conditionId,
            category: pick(cand.category, CATEGORIES, 'other'),
            likelihood: pick(cand.likelihood, ['likely', 'possible'] as const, 'possible'),
            visible_evidence: str(cand.visible_evidence, 300),
          };
        })
        .filter((c) => c.name.length > 0)
    : [];

  // At most one "likely": if the model marked several, only the first keeps it.
  let seenLikely = false;
  for (const c of candidates) {
    if (c.likelihood === 'likely') {
      if (seenLikely) c.likelihood = 'possible';
      seenLikely = true;
    }
  }

  let health = pick(raw.health_status, ['healthy', 'problem_found', 'uncertain'] as const, 'uncertain');
  if (health === 'problem_found' && candidates.length === 0) health = 'uncertain';
  if (!isPlant) health = 'uncertain';

  return {
    is_plant: isPlant,
    photo_usable: isPlant ? raw.photo_usable !== false : false,
    photo_issue: isPlant ? pick(raw.photo_issue, PHOTO_ISSUES, 'none') : 'not_a_plant',
    retake_tip: str(raw.retake_tip, 200),
    plant: {
      common_name: isPlant ? str(plantRaw.common_name, 100) : '',
      scientific_name: isPlant ? str(plantRaw.scientific_name, 100) : '',
      catalog_crop_id: isPlant ? cropId : '',
      identification_confidence: pick(plantRaw.identification_confidence, ['high', 'medium', 'low'] as const, 'low'),
    },
    health_status: health,
    candidates: health === 'healthy' ? [] : candidates,
    follow_up_question: str(raw.follow_up_question, 200),
    summary: str(raw.summary, 400),
    general_care: (Array.isArray(raw.general_care) ? raw.general_care : [])
      .map((s) => str(s, 200))
      .filter((s) => s.length > 0)
      .slice(0, 4),
  };
}

interface ModelAttempt { ok: true; report: Record<string, unknown>; model: string; usage?: unknown }
interface ModelFailure { ok: false; status: number; error: string; message: string; retryable: boolean }

async function callClaude(apiKey: string, model: string, mediaType: string, base64: string, cropHintName: string): Promise<ModelAttempt | ModelFailure> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), MODEL_TIMEOUT_MS);
  const userText = cropHintName
    ? `The user says this is probably: ${cropHintName}. Treat that as a hint only — trust what you see.`
    : 'Analyse this plant photo.';

  try {
    const res = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model,
        max_tokens: MAX_TOKENS,
        system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
        output_config: { format: { type: 'json_schema', schema: REPORT_SCHEMA } },
        messages: [
          {
            role: 'user',
            content: [
              { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
              { type: 'text', text: userText },
            ],
          },
        ],
      }),
    });

    const bodyText = await res.text();
    if (!res.ok) {
      console.error(`[diagnose-plant] model=${model} status=${res.status} body=${bodyText.slice(0, 500)}`);
      // 400 can be model-specific (unsupported parameter), so let the fallback model try it too.
      const retryable = res.status === 429 || res.status >= 500 || res.status === 400;
      return {
        ok: false,
        status: res.status === 429 ? 429 : res.status === 400 ? 400 : 502,
        error: res.status === 401 || res.status === 403 ? 'AiKeyRejected' : res.status === 429 ? 'AiRateLimited' : res.status === 400 ? 'AiBadRequest' : 'AiProviderError',
        message: res.status === 400 ? 'The AI service could not read this image. Please try a different photo.' : `AI service error (${res.status}).`,
        retryable,
      };
    }

    let data: { content?: { type: string; text?: string }[]; usage?: unknown; stop_reason?: string } | null = null;
    try { data = JSON.parse(bodyText); } catch { data = null; }
    const text = data?.content?.find((b) => b.type === 'text')?.text ?? '';
    let report: unknown = null;
    try {
      const unfenced = text.replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '');
      const first = unfenced.indexOf('{');
      const last = unfenced.lastIndexOf('}');
      report = JSON.parse(first >= 0 && last > first ? unfenced.slice(first, last + 1) : unfenced);
    } catch {
      report = null;
    }
    if (!report || typeof report !== 'object') {
      console.error(`[diagnose-plant] model=${model} unreadable output stop=${data?.stop_reason}: ${bodyText.slice(0, 500)}`);
      return { ok: false, status: 502, error: 'AiMalformedOutput', message: 'The AI returned an unreadable answer.', retryable: true };
    }
    return { ok: true, report: report as Record<string, unknown>, model, usage: data?.usage };
  } catch (err) {
    const timeout = err instanceof Error && err.name === 'AbortError';
    console.error(`[diagnose-plant] model=${model} fetch failed timeout=${timeout} ${err instanceof Error ? err.message : String(err)}`);
    return {
      ok: false,
      status: timeout ? 504 : 502,
      error: timeout ? 'AiTimeout' : 'AiNetworkError',
      message: timeout ? 'The AI took too long to answer.' : 'Could not reach the AI service.',
      retryable: true,
    };
  } finally {
    clearTimeout(timer);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'MethodNotAllowed', message: 'Use POST.' }, 405);

  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return json({ error: 'Unauthorized', message: 'Sign-in is required to run a scan.' }, 401);
  }

  const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
  if (!apiKey) return json({ error: 'ConfigurationError', message: 'The AI key is not configured on the server.' }, 503);
  if (!supabaseUrl || !supabaseAnonKey) return json({ error: 'ConfigurationError', message: 'The scan allowance service is not configured.' }, 503);

  let payload: { imageBase64?: unknown; mimeType?: unknown; cropHint?: unknown };
  try { payload = await req.json(); } catch { return json({ error: 'BadRequest', message: 'Malformed request.' }, 400); }

  if (typeof payload.imageBase64 !== 'string' || payload.imageBase64.length < 100) {
    return json({ error: 'BadRequest', message: 'A photo is required.' }, 400);
  }
  if (payload.imageBase64.length > MAX_IMAGE_PAYLOAD_CHARS) {
    return json({ error: 'PayloadTooLarge', message: 'The photo is too large. Please use a smaller photo.' }, 413);
  }

  const dataUriMatch = payload.imageBase64.match(/^data:(image\/[a-z+]+);base64,/i);
  const mediaType = (dataUriMatch?.[1] || (typeof payload.mimeType === 'string' ? payload.mimeType : 'image/jpeg')).toLowerCase();
  if (!ALLOWED_MEDIA_TYPES.has(mediaType)) {
    return json({ error: 'UnsupportedImage', message: 'Please use a JPG, PNG or WebP photo.' }, 415);
  }
  const base64 = payload.imageBase64.replace(/^data:image\/[a-z+]+;base64,/i, '');
  const cropHintId = typeof payload.cropHint === 'string' && CROP_IDS.has(payload.cropHint) ? payload.cropHint : '';
  const cropHintName = cropHintId ? CATALOG.crops.find((c) => c.id === cropHintId)?.name ?? '' : '';

  // Claim one daily scan slot as the end user (their JWT); refunded if no diagnosis is produced.
  const userJwt = authHeader.slice('Bearer '.length).trim();
  const limitRaw = Number(Deno.env.get('AI_DAILY_SCAN_LIMIT'));
  const dailyLimit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.floor(limitRaw) : DEFAULT_DAILY_SCAN_LIMIT;

  let quota: QuotaDecision;
  try {
    const claim = await callUserRpc(supabaseUrl, supabaseAnonKey, userJwt, 'claim_ai_scan_slot', { p_daily_limit: dailyLimit });
    if (claim.status === 401 || claim.status === 403) {
      return json({ error: 'Unauthorized', message: 'Your session has expired. Please reload the app and try again.' }, 401);
    }
    if (!claim.ok || !claim.data || typeof claim.data !== 'object') throw new Error(`quota RPC status ${claim.status}`);
    quota = claim.data as QuotaDecision;
  } catch (err) {
    console.error('[diagnose-plant] quota check failed:', err);
    return json({ error: 'QuotaUnavailable', message: 'Could not check your daily scan allowance. Please try again in a moment.', retryable: true }, 503);
  }

  if (!quota.allowed) {
    return json({
      error: 'DailyScanLimitReached',
      message: `You have used all ${quota.daily_limit} of today's scans. The limit resets after midnight. For an urgent problem, contact your local agriculture extension office.`,
      quota,
    }, 429);
  }

  const refundSlot = async () => {
    try { await callUserRpc(supabaseUrl, supabaseAnonKey, userJwt, 'release_ai_scan_slot', {}); }
    catch (err) { console.error('[diagnose-plant] slot refund failed:', err); }
  };

  const models = [Deno.env.get('ANTHROPIC_PRIMARY_MODEL') || DEFAULT_PRIMARY_MODEL, Deno.env.get('ANTHROPIC_FALLBACK_MODEL') || DEFAULT_FALLBACK_MODEL];
  let lastFailure: ModelFailure | null = null;
  const startedAt = Date.now();

  for (const model of models) {
    const attempt = await callClaude(apiKey, model, mediaType, base64, cropHintName);
    if (attempt.ok) {
      const diagnosis = sanitizeReport(attempt.report);
      console.log(`[diagnose-plant] model=${model} ok in ${Date.now() - startedAt}ms usage=${JSON.stringify(attempt.usage ?? {})}`);
      return json({
        success: true,
        diagnosis,
        quota: { scansUsedToday: quota.scans_used, dailyLimit: quota.daily_limit, scansRemainingToday: quota.scans_remaining },
        metadata: { provider: 'anthropic', model, timestamp: new Date().toISOString(), latencyMs: Date.now() - startedAt },
      });
    }
    lastFailure = attempt;
    if (!attempt.retryable) break;
  }

  await refundSlot();
  const failure = lastFailure ?? { ok: false, status: 502, error: 'AiProviderError', message: 'The AI service is unavailable.', retryable: true };
  return json({ error: failure.error, message: failure.message, retryable: failure.retryable }, failure.status);
});
