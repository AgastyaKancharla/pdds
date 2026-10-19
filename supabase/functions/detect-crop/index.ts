/**
 * AGASTYAONE AGRICULTURE — PDDs
 * Supabase Edge Function: detect-crop
 * Secure Server-Side Multimodal Gateway (OpenRouter Free Tier)
 */

// Setup CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const DEFAULT_MODEL = 'nvidia/nemotron-3.5-super-vl:free';
const MAX_IMAGE_PAYLOAD_BYTES = 4 * 1024 * 1024; // 4 MB base64 payload limit

/**
 * Per-user daily scan cap. The upstream free tier has a hard daily ceiling for the whole
 * project, so without a per-user cap one heavy user or a loop could consume the day's
 * capacity for every farmer. Override with AI_DAILY_SCAN_LIMIT once a paid upstream tier
 * makes a higher per-user number affordable.
 */
const DEFAULT_DAILY_SCAN_LIMIT = 15;

interface RequestPayload {
  imageBase64: string;
  mimeType?: string;
  cropHint?: string;
}

interface QuotaDecision {
  allowed: boolean;
  scans_used: number;
  daily_limit: number;
  scans_remaining: number;
}

/**
 * Calls a Postgres RPC as the END USER, forwarding their bearer token rather than using a
 * service-role key. Postgres validates the JWT and the function derives the account from
 * auth.uid(), so an invalid or forged token simply has no identity and is refused — this is
 * what replaces the previous check, which only verified that the header started with
 * "Bearer " and never confirmed it belonged to anyone.
 */
async function callUserRpc(
  supabaseUrl: string,
  anonKey: string,
  userJwt: string,
  fnName: string,
  body: Record<string, unknown>
): Promise<{ ok: boolean; status: number; data: unknown }> {
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/${fnName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: anonKey,
      Authorization: `Bearer ${userJwt}`,
    },
    body: JSON.stringify(body),
  });

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, status: res.status, data };
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // 1. Verify caller authentication
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({
        error: 'Unauthorized',
        message: 'Valid caller authentication token is required.',
      }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // 2. Validate environment configuration
  const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
  const openRouterModel = Deno.env.get('OPENROUTER_MODEL') || DEFAULT_MODEL;
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

  if (!openRouterApiKey) {
    return new Response(
      JSON.stringify({
        error: 'ConfigurationError',
        message: 'OPENROUTER_API_KEY is not configured on the server.',
      }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Fail CLOSED if the quota backend is not configured. Falling through to an unmetered
  // upstream call would quietly recreate the exact exposure the quota exists to close.
  if (!supabaseUrl || !supabaseAnonKey) {
    return new Response(
      JSON.stringify({
        error: 'ConfigurationError',
        message: 'Scan quota backend is not configured on the server.',
      }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // 3. Parse and validate request body
  let payload: RequestPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'BadRequest', message: 'Malformed JSON payload.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (!payload.imageBase64 || typeof payload.imageBase64 !== 'string') {
    return new Response(
      JSON.stringify({ error: 'BadRequest', message: 'imageBase64 string is required.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (payload.imageBase64.length > MAX_IMAGE_PAYLOAD_BYTES) {
    return new Response(
      JSON.stringify({ error: 'PayloadTooLarge', message: 'Image payload exceeds 4 MB limit.' }),
      { status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const cleanBase64 = payload.imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
  const mimeType = payload.mimeType || 'image/jpeg';
  const dataUri = `data:${mimeType};base64,${cleanBase64}`;

  // 3b. Verify the caller and claim one daily scan slot, atomically.
  // Deliberately placed AFTER payload validation (a malformed request should not cost the
  // farmer a slot) and BEFORE the upstream call (the slot is what rations that call).
  const userJwt = authHeader.slice('Bearer '.length).trim();
  const dailyLimitRaw = Number(Deno.env.get('AI_DAILY_SCAN_LIMIT'));
  const dailyLimit =
    Number.isFinite(dailyLimitRaw) && dailyLimitRaw > 0 ? Math.floor(dailyLimitRaw) : DEFAULT_DAILY_SCAN_LIMIT;

  let quota: QuotaDecision;
  try {
    const claim = await callUserRpc(supabaseUrl, supabaseAnonKey, userJwt, 'claim_ai_scan_slot', {
      p_daily_limit: dailyLimit,
    });

    // 401/403, or the function's own "authentication required", means the token did not
    // resolve to a real account. This is the check that actually authenticates the caller.
    if (claim.status === 401 || claim.status === 403) {
      return new Response(
        JSON.stringify({
          error: 'Unauthorized',
          message: 'Valid caller authentication token is required.',
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!claim.ok || !claim.data || typeof claim.data !== 'object') {
      throw new Error(`quota RPC failed with status ${claim.status}`);
    }

    quota = claim.data as QuotaDecision;
  } catch (quotaErr) {
    // Fail closed: if the quota cannot be established, the upstream call does not happen.
    console.error('[detect-crop] Quota check failed:', quotaErr);
    return new Response(
      JSON.stringify({
        error: 'QuotaUnavailable',
        message: 'Could not verify your daily scan allowance. Please try again shortly.',
        userFacingMessageEn: 'Could not verify your daily scan allowance. Please try again shortly.',
        userFacingMessageTe:
          'మీ రోజువారీ స్కాన్ పరిమితిని ధృవీకరించలేకపోయాము. దయచేసి కొద్దిసేపటి తర్వాత మళ్లీ ప్రయత్నించండి.',
      }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  if (!quota.allowed) {
    return new Response(
      JSON.stringify({
        error: 'DailyScanLimitReached',
        message: `Daily scan limit reached (${quota.scans_used}/${quota.daily_limit}).`,
        quota,
        userFacingMessageEn: `You have used all ${quota.daily_limit} of today's scans. The limit resets after midnight. For an urgent problem, contact your Rythu Bharosa Kendra (RBK) — they can inspect the crop in person, which is more reliable than any photo diagnosis.`,
        userFacingMessageTe: `ఈ రోజు మీకు కేటాయించిన ${quota.daily_limit} స్కాన్‌లు పూర్తయ్యాయి. అర్ధరాత్రి తర్వాత పరిమితి మళ్లీ మొదలవుతుంది. అత్యవసరమైతే మీ రైతు భరోసా కేంద్రం (RBK) ను సంప్రదించండి — వారు పంటను ప్రత్యక్షంగా పరిశీలించగలరు, ఇది ఏ ఫోటో నిర్ధారణ కంటే నమ్మదగినది.`,
      }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  /**
   * Refunds the slot claimed above. Called when the upstream AI call fails, so an outage or
   * upstream rate-limit does not silently spend part of the farmer's daily allowance on a
   * diagnosis they never received. Best-effort by design: a failed refund must never turn
   * into a second error shown to the user.
   */
  const refundSlot = async () => {
    try {
      await callUserRpc(supabaseUrl, supabaseAnonKey, userJwt, 'release_ai_scan_slot', {});
    } catch (refundErr) {
      console.error('[detect-crop] Slot refund failed:', refundErr);
    }
  };

  // 4. Construct prompt for agricultural diagnosis
  const prompt = `You are HereForNature's AI crop health analyzer for Andhra Pradesh agriculture.
Analyze this crop photograph and respond strictly with valid JSON.

Rules:
1. Image Quality Assessment:
   Assess if image is usable for diagnostic evaluation. If blurry, dark, overexposed, or unidentifiable:
   {"status": "unusable_image", "reason": "unclear", "imageQuality": {"assessable": false, "issues": ["blurry_or_unclear"]}, "userFacingMessageEn": "Image is unclear or out of focus. Please retake in good lighting.", "userFacingMessageTe": "చిత్రం అస్పష్టంగా ఉంది. మంచి వెలుతురులో మళ్లీ తీయండి."}

2. If NOT an agricultural crop (person, vehicle, animal, graphic, paper, screen, logo):
   {"status": "not_plant", "reason": "not_crop", "userFacingMessageEn": "Image appears to be non-agricultural or a graphic.", "userFacingMessageTe": "చిత్రం వ్యవసాయ పంట కాదు."}

3. If HEALTHY plant with no visible pathology:
   DO NOT invent disease on healthy green foliage.
   {"status": "supported_diagnosis", "conditionType": "healthy", "cropId": "crop-rice", "cropNameEn": "Paddy / Rice", "cropNameTe": "వరి", "visualSymptoms": ["Clean green foliage", "No visible lesions"]}

4. If symptoms indicate NUTRIENT DEFICIENCY (e.g. interveinal chlorosis, uniform chlorosis, marginal scorching):
   {"status": "nutrient_deficiency", "conditionType": "nutrient_deficiency", "cropNameEn": "[Crop]", "visualSymptoms": ["Interveinal chlorosis"], "userFacingMessageEn": "Symptoms suggest nutrient deficiency rather than infectious pathogen.", "userFacingMessageTe": "లక్షణాలు తెగులు కాకుండా పోషక లోపాన్ని సూచిస్తున్నాయి."}

5. If symptoms indicate ABIOTIC / ENVIRONMENTAL STRESS (e.g. sun scald, drought scorch, moisture stress):
   {"status": "abiotic_stress", "conditionType": "abiotic", "cropNameEn": "[Crop]", "visualSymptoms": ["Sun scald", "Tip burn"], "userFacingMessageEn": "Symptoms indicate environmental stress, not an infectious disease.", "userFacingMessageTe": "లక్షణాలు పర్యావరణ ఒత్తిడిని సూచిస్తున్నాయి."}

6. If diseased or pest-damaged, map to EXACT catalog IDs where supported:
   Catalog:
   - crop-rice: disease-rice-blast (Rice Blast — spindle/diamond lesions, pointed ends, ash-grey centre; or blackened panicle neck)
   - crop-rice: disease-rice-blb (Bacterial Leaf Blight — continuous water-soaked stripes from leaf TIP or MARGIN running downward, wavy edge, straw-yellow then greyish-white; NOT discrete spots)
   - crop-rice: disease-rice-sheathblight (Sheath Blight — oval blotches on the leaf SHEATH near the water line, straw-white centre with purple-brown wavy snakeskin border, climbing upward)
   - crop-rice: disease-rice-brownspot (Brown Spot — many small SEPARATE round/oval brown spots with blunt edges scattered on the blade, worst on older LOWER leaves)
   - crop-rice: disease-rice-stemborer (Yellow Stem Borer — dead heart that pulls out easily, or white empty panicles, WITH a bore hole and powdery frass)
   - crop-rice: disease-rice-gallmidge (Rice Gall Midge — shoot converted into a hollow silvery tube like an onion leaf, plant still alive, NO bore hole and NO frass)
   - crop-rice: disease-rice-zincdeficiency (Zinc Deficiency / khaira — diffuse rust-brown blotching near midrib and leaf base, in PATCHES, with clear stunting and poor tillering; this is a nutrient disorder, not an infection)
   - crop-chilli: disease-chilli-leaf-curl (Chilli Leaf Curl Virus — leaves curl UPWARD, thickened and crinkled with vein clearing, scattered patches where the whitefly vector fed)
   - crop-chilli: disease-chilli-thrips (Thrips / Murda Complex — silvery-bronze scarring streaks on the leaf UNDERSIDE with boat-shaped upward curling concentrated at the growing tips, stunted bushy new growth)
   - crop-cotton: disease-cotton-bollworm (Pink Bollworm — rosetted flowers, bore holes plugged with frass, pink larvae inside bolls)
   - crop-cotton: disease-cotton-whitefly (Whitefly — clouds of tiny white adults on disturbance, flat scale-like nymphs on leaf undersides, sticky honeydew with black sooty mould)
   - crop-groundnut: disease-groundnut-tikka (Tikka Leaf Spot — FLAT circular reddish-brown to black spots that do not rupture or shed powder)
   - crop-groundnut: disease-groundnut-rust (Groundnut Rust — RAISED orange to reddish-brown pustules on the leaf underside that rupture and leave orange powder on the finger when rubbed)
   - crop-maize: disease-maize-armyworm (Fall Armyworm — ragged windowpane leaf tearing with heavy sawdust-like frass deep inside the whorl)
   - crop-maize: disease-maize-turcicumblight (Turcicum Leaf Blight — long elliptical cigar/boat-shaped greyish-green to tan lesions running parallel to the veins, starting on the LOWER leaves)
   - crop-sugarcane: disease-sugarcane-redrot (Red Rot)
   - crop-tomato: disease-tomato-earlyblight (Early Blight)
   - crop-mango: disease-mango-anthracnose (Anthracnose)
   - crop-banana: disease-banana-panamawilt (Panama Wilt)
   - crop-turmeric: disease-turmeric-rhizomerot (Rhizome Rot), disease-turmeric-leafspot (Turmeric Leaf Spot)

   RICE DIFFERENTIAL DISCIPLINE — several rice conditions look alike in a photograph. Do not
   guess between them on a weak image. Apply these rules:
   - Lesion SHAPE separates Blast from Brown Spot: pointed spindle with grey centre = Blast;
     round/oval blunt and uniformly brown = Brown Spot. If shape is not resolvable in the
     image, return "uncertain" rather than picking one.
   - Continuous stripes from the tip/margin = Bacterial Leaf Blight, never Brown Spot.
   - Damage on the SHEATH near the water line = Sheath Blight, not a leaf disease.
   - Dead heart or white panicle: a visible bore hole with frass = Stem Borer; a blackened
     shrivelled neck with no hole = Blast (neck blast). If neither is visible, return
     "uncertain" — these two need opposite treatments (insecticide vs fungicide) and a wrong
     call wastes the farmer's money.
   - A living silvery hollow tube with no bore hole = Gall Midge, not Stem Borer.
   - Patchy stunting with diffuse rust blotching near the midrib = Zinc Deficiency, NOT Brown
     Spot. This distinction matters: a fungicide cannot fix a zinc deficiency. When the image
     shows patchiness and stunting alongside healthy plants, prefer disease-rice-zincdeficiency.

   OTHER-CROP DIFFERENTIAL DISCIPLINE — the same rule applies to the newly added conditions.
   Where the distinguishing feature is not resolvable in the image, return "uncertain" rather
   than guessing between a pathogen and a pest, because the treatments differ:
   - Groundnut: RAISED pustules that rupture into orange powder = Rust; FLAT non-powdery
     circular spots = Tikka Leaf Spot. Both often appear on the same plant — if both are
     clearly present, report the one that dominates the image and name the other in
     differentialHypotheses.
   - Chilli: silvery-bronze scarring on the leaf underside plus distorted bushy growing tips =
     Thrips/Murda (a pest); thickened crinkled leaves with vein clearing and no scarring =
     Leaf Curl Virus. A chemical cannot cure the virus, so a wrong call here wastes money.
   - Cotton: visible clouds of small white flying adults, honeydew and sooty mould = Whitefly;
     rosetted flowers and bored bolls with pink larvae = Pink Bollworm. These are different
     pests needing different products.
   - Maize: long cigar/boat-shaped lesions running along the veins on lower leaves = Turcicum
     Leaf Blight (a fungus); ragged windowpane tearing with frass in the whorl = Fall Armyworm
     (a caterpillar). A fungicide does nothing to armyworm.
   - Turmeric: discrete dark-brown spots with a yellow halo on the leaves while the rhizome is
     firm = Leaf Spot; soft foul-smelling decaying rhizomes with collar rot = Rhizome Rot.

   If recognized crop and disease match one above:
   {"status": "supported_diagnosis", "cropId": "crop-rice", "diseaseId": "disease-rice-blast", "cropNameEn": "Paddy / Rice", "cropNameTe": "వరి", "visualSymptoms": ["Spindle lesions", "Brown margins"], "differentialHypotheses": [{"conditionName": "Brown Spot", "likelihood": "moderate", "reasoning": "Lesion margins"}]}

   If crop is recognized but disease is NOT in catalog above:
   {"status": "unsupported_disease", "cropNameEn": "[Crop]", "cropNameTe": "[Crop Te]", "userFacingMessageEn": "Identified as [Crop], but this specific disease is not in catalog."}

   If crop itself is NOT in catalog above:
   {"status": "unsupported_crop", "cropNameEn": "[Crop]", "userFacingMessageEn": "Crop not currently supported in database."}`;

  // 5. Invoke OpenRouter Free Vision API with bounded timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout -- lowered from 18s after
  // observing unexplained opaque platform-level 502s (EDGE_FUNCTION_ERROR, no console output
  // reached) on real calls taking 11-16s, well under the old 18s mark -- something between this
  // function and OpenRouter is being cut off by a shorter limit than our own AbortController, so
  // this fires our own clean, loggable timeout path first instead of hitting that opaque kill.

  try {
    const upstreamResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': 'https://herefornature.agastyaone.org',
        'X-Title': 'AgastyaOne Agriculture PDDs Gateway',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: openRouterModel,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: dataUri } },
            ],
          },
        ],
        temperature: 0.1,
        max_tokens: 800,
        response_format: { type: 'json_object' },
      }),
    });

    clearTimeout(timeoutId);

    if (!upstreamResponse.ok) {
      const status = upstreamResponse.status;
      let upstreamBodyText = '';
      try {
        upstreamBodyText = await upstreamResponse.text();
      } catch {
        upstreamBodyText = '(could not read upstream body)';
      }
      console.error(`[detect-crop] Upstream OpenRouter error. status=${status} body=${upstreamBodyText.slice(0, 1000)}`);
      // No diagnosis was produced, so the slot goes back.
      await refundSlot();
      return new Response(
        JSON.stringify({
          error: status === 429 ? 'RateLimitExceeded' : 'UpstreamProviderError',
          message: status === 429
            ? 'OpenRouter free-tier rate limit reached. Please retry in a moment.'
            : `AI service provider returned error (${status}).`,
          retryable: true,
        }),
        { status: status === 429 ? 429 : 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await upstreamResponse.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      await refundSlot();
      return new Response(
        JSON.stringify({ error: 'EmptyResponse', message: 'Provider returned empty response.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let parsedResult: unknown;
    try {
      parsedResult = JSON.parse(content);
    } catch {
      await refundSlot();
      return new Response(
        JSON.stringify({ error: 'MalformedOutput', message: 'Failed to parse model output as JSON.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return structured payload with model metadata.
    // `quota` lets the client show the farmer how many scans remain today, so hitting the
    // cap is never a surprise.
    return new Response(
      JSON.stringify({
        success: true,
        rawResult: parsedResult,
        quota: {
          scansUsedToday: quota.scans_used,
          dailyLimit: quota.daily_limit,
          scansRemainingToday: quota.scans_remaining,
        },
        metadata: {
          provider: 'openrouter',
          model: openRouterModel,
          timestamp: new Date().toISOString(),
        },
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const isTimeout = err instanceof Error && err.name === 'AbortError';
    console.error(
      `[detect-crop] Upstream fetch threw. isTimeout=${isTimeout} name=${err instanceof Error ? err.name : typeof err} message=${err instanceof Error ? err.message : String(err)}`
    );
    await refundSlot();

    return new Response(
      JSON.stringify({
        error: isTimeout ? 'GatewayTimeout' : 'NetworkError',
        message: isTimeout ? 'AI gateway timed out.' : 'Failed to connect to AI provider.',
        retryable: true,
      }),
      { status: isTimeout ? 504 : 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
