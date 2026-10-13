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

const DEFAULT_MODEL = 'dots-studio/dots-3-note-preview:free';
const MAX_IMAGE_PAYLOAD_BYTES = 4 * 1024 * 1024; // 4 MB base64 payload limit

interface RequestPayload {
  imageBase64: string;
  mimeType?: string;
  cropHint?: string;
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

  if (!openRouterApiKey) {
    return new Response(
      JSON.stringify({
        error: 'ConfigurationError',
        message: 'OPENROUTER_API_KEY is not configured on the server.',
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
  const timeoutId = setTimeout(() => controller.abort(), 18000); // 18s timeout

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
      return new Response(
        JSON.stringify({ error: 'EmptyResponse', message: 'Provider returned empty response.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let parsedResult: unknown;
    try {
      parsedResult = JSON.parse(content);
    } catch {
      return new Response(
        JSON.stringify({ error: 'MalformedOutput', message: 'Failed to parse model output as JSON.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Return structured payload with model metadata
    return new Response(
      JSON.stringify({
        success: true,
        rawResult: parsedResult,
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
