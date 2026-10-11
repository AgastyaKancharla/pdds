import type {
  AiProviderAdapter,
  AiInferenceRequest,
  AiInferenceResponse,
} from './types';
import { validateAndNormalizeAiResponse, createFallbackDiagnosis } from './validator';

export const DEFAULT_OPENROUTER_FREE_MODEL = 'dots-studio/dots-3-note-preview:free';

export interface OpenRouterAdapterConfig {
  apiKey: string;
  modelId?: string;
  baseUrl?: string;
  timeoutMs?: number;
}

export class OpenRouterAdapter implements AiProviderAdapter {
  readonly providerId = 'openrouter';
  readonly modelId: string;
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(config: OpenRouterAdapterConfig) {
    this.apiKey = config.apiKey;
    this.modelId = config.modelId || DEFAULT_OPENROUTER_FREE_MODEL;
    this.baseUrl = config.baseUrl || 'https://openrouter.ai/api/v1';
    this.timeoutMs = config.timeoutMs || 20000;
  }

  async diagnose(request: AiInferenceRequest): Promise<AiInferenceResponse> {
    const startTime = Date.now();

    if (!this.apiKey) {
      return {
        success: false,
        diagnosis: createFallbackDiagnosis('provider_unavailable', {
          provider: this.providerId,
          model: this.modelId,
          latencyMs: 0,
        }, {
          messageEn: 'OpenRouter credentials are not configured on the server.',
          messageTe: 'సర్వర్‌లో OpenRouter ఆధారాలు కాన్ఫిగర్ చేయబడలేదు.',
        }),
        error: {
          code: 'AUTH_MISSING',
          messageEn: 'Server AI provider credential missing.',
          messageTe: 'సర్వర్ AI ప్రొవైడర్ ఆధారాలు లేవు.',
          retryable: false,
        },
      };
    }

    const cleanBase64 = request.imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    const mimeType = request.mimeType || 'image/jpeg';
    const dataUri = `data:${mimeType};base64,${cleanBase64}`;

    const promptText = `You are HereForNature's AI crop health analyzer for Andhra Pradesh agriculture.
Analyze this crop image and respond with valid JSON ONLY.

Rules:
1. Image Quality Assessment:
   Assess if image is usable for diagnostic evaluation. If blurry, dark, overexposed, or unidentifiable:
   {"status": "unusable_image", "reason": "unclear", "imageQuality": {"assessable": false, "issues": ["blurry_or_unclear"]}, "userFacingMessageEn": "Image is unclear or out of focus. Please retake in good lighting.", "userFacingMessageTe": "చిత్రం అస్పష్టంగా ఉంది. మంచి వెలుతురులో మళ్లీ తీయండి."}

2. If NOT an agricultural plant/crop (e.g. human, animal, logo, vehicle, paper, furniture):
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
   - crop-rice: disease-rice-blast (Rice Blast)
   - crop-chilli: disease-chilli-leaf-curl (Chilli Leaf Curl Virus)
   - crop-cotton: disease-cotton-bollworm (Pink Bollworm)
   - crop-groundnut: disease-groundnut-tikka (Tikka Leaf Spot)
   - crop-maize: disease-maize-armyworm (Fall Armyworm)
   - crop-sugarcane: disease-sugarcane-redrot (Red Rot)
   - crop-tomato: disease-tomato-earlyblight (Early Blight)
   - crop-mango: disease-mango-anthracnose (Anthracnose)
   - crop-banana: disease-banana-panamawilt (Panama Wilt)
   - crop-turmeric: disease-turmeric-rhizomerot (Rhizome Rot)

   If recognized crop and disease match one above:
   {"status": "supported_diagnosis", "cropId": "crop-rice", "diseaseId": "disease-rice-blast", "cropNameEn": "Paddy / Rice", "cropNameTe": "వరి", "visualSymptoms": ["Spindle lesions", "Brown margins"], "differentialHypotheses": [{"conditionName": "Brown Spot", "likelihood": "moderate", "reasoning": "Lesion margins"}]}

   If crop is recognized but disease is NOT in catalog above:
   {"status": "unsupported_disease", "cropNameEn": "[Crop]", "cropNameTe": "[Crop Te]", "userFacingMessageEn": "Identified as [Crop], but this specific disease is not in catalog."}

   If crop itself is NOT in catalog above:
   {"status": "unsupported_crop", "cropNameEn": "[Crop]", "userFacingMessageEn": "Crop not currently supported in database."}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://herefornature.agastyaone.org',
          'X-Title': 'AgastyaOne Agriculture PDDs',
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: this.modelId,
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: promptText },
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
      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        const errorStatus = response.status;
        const isQuota = errorStatus === 429;
        const isUnavailable = errorStatus === 502 || errorStatus === 503 || errorStatus === 504;

        return {
          success: false,
          diagnosis: createFallbackDiagnosis(
            isQuota ? 'provider_unavailable' : 'provider_unavailable',
            { provider: this.providerId, model: this.modelId, latencyMs },
            {
              messageEn: isQuota
                ? 'AI diagnostic capacity temporarily exceeded. Please retry in a few moments.'
                : 'AI diagnostic service is currently unavailable. Please check your connectivity and retry.',
              messageTe: isQuota
                ? 'AI సామర్థ్యం ప్రస్తుతానికి మించిపోయింది. దయచేసి కొద్దిసేపటి తర్వాత మళ్లీ ప్రయత్నించండి.'
                : 'AI సేవ ప్రస్తుతం అందుబాటులో లేదు. దయచేసి కనెక్షన్ తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.',
            }
          ),
          error: {
            code: isQuota ? 'RATE_LIMIT_EXCEEDED' : `UPSTREAM_HTTP_${errorStatus}`,
            messageEn: isQuota ? 'Rate limit exceeded.' : 'Upstream provider error.',
            messageTe: isQuota ? 'అభ్యర్థన పరిమితి మించిపోయింది.' : 'సర్వర్ ప్రొవైడర్ లోపం.',
            retryable: isQuota || isUnavailable,
          },
        };
      }

      const resBody = await response.json();
      const rawContent = resBody?.choices?.[0]?.message?.content;

      if (!rawContent) {
        return {
          success: false,
          diagnosis: createFallbackDiagnosis('uncertain', {
            provider: this.providerId,
            model: this.modelId,
            latencyMs,
          }),
          error: {
            code: 'EMPTY_RESPONSE',
            messageEn: 'Provider returned an empty response.',
            messageTe: 'AI ప్రొవైడర్ ఖాళీ సమాధానాన్ని ఇచ్చింది.',
            retryable: true,
          },
        };
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(rawContent);
      } catch {
        return {
          success: false,
          diagnosis: createFallbackDiagnosis('uncertain', {
            provider: this.providerId,
            model: this.modelId,
            latencyMs,
          }),
          error: {
            code: 'JSON_PARSE_ERROR',
            messageEn: 'Unable to parse model JSON output.',
            messageTe: 'మోడల్ అవుట్‌పుట్‌ను చదవలేకపోయాము.',
            retryable: true,
          },
        };
      }

      const normalized = validateAndNormalizeAiResponse(parsed, {
        provider: this.providerId,
        model: this.modelId,
        latencyMs,
      });

      return {
        success: true,
        diagnosis: normalized,
      };
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      const latencyMs = Date.now() - startTime;
      const isAbort = err instanceof Error && err.name === 'AbortError';

      return {
        success: false,
        diagnosis: createFallbackDiagnosis('provider_unavailable', {
          provider: this.providerId,
          model: this.modelId,
          latencyMs,
        }, {
          messageEn: isAbort
            ? 'AI analysis timed out. Please check network speed and retry.'
            : 'Network connection to AI gateway failed.',
          messageTe: isAbort
            ? 'AI విశ్లేషణ సమయం ముగిసింది. దయచేసి మళ్లీ ప్రయత్నించండి.'
            : 'AI గేట్‌వేకి నెట్‌వర్క్ కనెక్షన్ విఫలమైంది.',
        }),
        error: {
          code: isAbort ? 'TIMEOUT' : 'NETWORK_ERROR',
          messageEn: isAbort ? 'Request timed out.' : 'Network error.',
          messageTe: isAbort ? 'సమయం ముగిసింది.' : 'నెట్‌వర్క్ లోపం.',
          retryable: true,
        },
      };
    }
  }
}
