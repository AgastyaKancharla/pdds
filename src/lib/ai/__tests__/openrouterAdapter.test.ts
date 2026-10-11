import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OpenRouterAdapter } from '../openrouterAdapter';

describe('OpenRouter AI Provider Adapter', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('fails safely with AUTH_MISSING if API key is not configured', async () => {
    const adapter = new OpenRouterAdapter({ apiKey: '' });
    const response = await adapter.diagnose({
      imageBase64: 'fake-base64',
    });

    expect(response.success).toBe(false);
    expect(response.error?.code).toBe('AUTH_MISSING');
    expect(response.diagnosis?.status).toBe('provider_unavailable');
  });

  it('constructs correct payload and parses valid response', async () => {
    const mockApiResponse = {
      choices: [
        {
          message: {
            content: JSON.stringify({
              status: 'supported_diagnosis',
              cropId: 'crop-rice',
              diseaseId: 'disease-rice-blast',
              cropNameEn: 'Paddy / Rice',
              cropNameTe: 'వరి',
              visualSymptoms: ['Spindle lesions'],
            }),
          },
        },
      ],
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockApiResponse,
    } as Response);

    const adapter = new OpenRouterAdapter({
      apiKey: 'test-fake-key',
      modelId: 'dots-studio/dots-3-note-preview:free',
    });

    const response = await adapter.diagnose({
      imageBase64: 'base64sample123',
      mimeType: 'image/jpeg',
    });

    expect(response.success).toBe(true);
    expect(response.diagnosis?.status).toBe('supported_diagnosis');
    expect(response.diagnosis?.plantIdentification.cropId).toBe('crop-rice');
    expect(response.diagnosis?.conditionAssessment.diseaseId).toBe('disease-rice-blast');
    expect(response.diagnosis?.metadata.model).toBe('dots-studio/dots-3-note-preview:free');

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    const fetchArgs = (globalThis.fetch as any).mock.calls[0];
    expect(fetchArgs[0]).toBe('https://openrouter.ai/api/v1/chat/completions');
    const sentBody = JSON.parse(fetchArgs[1].body);
    expect(sentBody.model).toBe('dots-studio/dots-3-note-preview:free');
    expect(sentBody.messages[0].content[1].image_url.url).toContain('base64sample123');
  });

  it('handles 429 rate limit exceeded gracefully with retryable error', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({ error: 'Rate limit exceeded' }),
    } as Response);

    const adapter = new OpenRouterAdapter({
      apiKey: 'test-key',
    });

    const response = await adapter.diagnose({
      imageBase64: 'sample',
    });

    expect(response.success).toBe(false);
    expect(response.error?.code).toBe('RATE_LIMIT_EXCEEDED');
    expect(response.error?.retryable).toBe(true);
    expect(response.diagnosis?.status).toBe('provider_unavailable');
  });

  it('handles upstream 502/503 errors gracefully', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({ error: 'Service Unavailable' }),
    } as Response);

    const adapter = new OpenRouterAdapter({ apiKey: 'test-key' });
    const response = await adapter.diagnose({ imageBase64: 'sample' });

    expect(response.success).toBe(false);
    expect(response.error?.code).toBe('UPSTREAM_HTTP_503');
    expect(response.error?.retryable).toBe(true);
  });

  it('handles malformed JSON response safely', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        choices: [{ message: { content: 'not-valid-json' } }],
      }),
    } as Response);

    const adapter = new OpenRouterAdapter({ apiKey: 'test-key' });
    const response = await adapter.diagnose({ imageBase64: 'sample' });

    expect(response.success).toBe(false);
    expect(response.error?.code).toBe('JSON_PARSE_ERROR');
    expect(response.diagnosis?.status).toBe('uncertain');
  });

  it('handles network timeouts cleanly', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new DOMException('The operation was aborted', 'AbortError'));

    const adapter = new OpenRouterAdapter({ apiKey: 'test-key', timeoutMs: 50 });
    const response = await adapter.diagnose({ imageBase64: 'sample' });

    expect(response.success).toBe(false);
    expect(response.error?.code).toBe('TIMEOUT');
    expect(response.error?.retryable).toBe(true);
  });
});
