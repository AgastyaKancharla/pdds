import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { detectDisease, __setAiLiveDiagnosisEnabledForTests } from '../detection';

/**
 * `supabase.functions` is a getter on the real client, so stubbing the property on the
 * instance does not stick. The module is mocked instead, which is also closer to how the
 * gateway failure actually reaches detectDisease.
 */
const invokeMock = vi.fn();
vi.mock('../supabase', () => ({
  supabase: {
    functions: {
      invoke: (...args: unknown[]) => invokeMock(...args),
    },
  },
}));

/**
 * Guards the per-user daily AI scan quota.
 *
 * Why this exists: before it, the detect-crop Edge Function accepted any request whose
 * Authorization header merely started with "Bearer " — it never confirmed the token
 * belonged to anyone — and applied no per-user limit. With a hard daily cap on the upstream
 * free tier, that meant a single user or script could spend the whole day's capacity for
 * every farmer, and the server-side provider key was effectively open to anyone who knew
 * the URL.
 *
 * The Edge Function and migration run in Deno/Postgres, not in this Vitest environment, so
 * these assertions are made against their source. They are contract tests: they pin the
 * safety-relevant decisions (fail closed, refund on failure, no client-writable counter)
 * so a later edit cannot quietly undo them.
 */
describe('Per-user daily AI scan quota', () => {
  const repoRoot = resolve(__dirname, '../../..');
  const edgeFn = readFileSync(resolve(repoRoot, 'supabase/functions/detect-crop/index.ts'), 'utf-8');
  const migration = readFileSync(resolve(repoRoot, 'supabase/migrations/005_add_ai_scan_quota.sql'), 'utf-8');

  describe('Edge Function gateway', () => {
    it('claims a slot before calling the upstream AI provider', () => {
      const claimAt = edgeFn.indexOf('claim_ai_scan_slot');
      const upstreamAt = edgeFn.indexOf('openrouter.ai/api/v1/chat/completions');
      expect(claimAt).toBeGreaterThan(-1);
      expect(upstreamAt).toBeGreaterThan(-1);
      expect(claimAt, 'the quota must be claimed before the upstream call, not after').toBeLessThan(upstreamAt);
    });

    it('only claims a slot after the payload has been validated', () => {
      // A malformed or oversized request must not cost the farmer part of their allowance.
      const payloadCheckAt = edgeFn.indexOf('imageBase64 string is required');
      const sizeCheckAt = edgeFn.indexOf('PayloadTooLarge');
      const claimAt = edgeFn.indexOf('claim_ai_scan_slot');
      expect(payloadCheckAt).toBeLessThan(claimAt);
      expect(sizeCheckAt).toBeLessThan(claimAt);
    });

    it('fails closed when the quota backend is not configured', () => {
      // Falling through to an unmetered upstream call would recreate the exposure the quota
      // exists to close, so a missing SUPABASE_URL/ANON_KEY must refuse the request.
      expect(edgeFn).toContain('Scan quota backend is not configured');
      const guardAt = edgeFn.indexOf('Scan quota backend is not configured');
      const upstreamAt = edgeFn.indexOf('openrouter.ai/api/v1/chat/completions');
      expect(guardAt).toBeLessThan(upstreamAt);
      // Equally, an unreadable quota response must refuse rather than proceed.
      expect(edgeFn).toContain('QuotaUnavailable');
    });

    it('authenticates by resolving the token to an account, not by inspecting the header shape', () => {
      // The forwarded JWT is validated by Postgres, and the quota function derives the user
      // from auth.uid(); a token that resolves to nobody yields 401/403 and is refused.
      expect(edgeFn).toContain('auth.uid');
      expect(edgeFn).toMatch(/claim\.status === 401 \|\| claim\.status === 403/);
      // The caller's own token is forwarded — a service-role key would bypass RLS and make
      // every request look like the same privileged identity.
      expect(edgeFn).not.toContain('SERVICE_ROLE');
      expect(edgeFn).not.toContain('service_role');
    });

    it('refunds the slot on every upstream failure path', () => {
      // The upstream free tier is rate-limited and intermittently unavailable. A farmer must
      // not lose part of their daily allowance for a diagnosis they never received.
      expect(edgeFn, 'refundSlot helper must be defined').toMatch(/const refundSlot = async \(\) =>/);

      // Each model attempt loops through four failure modes -- non-2xx, empty body,
      // unparseable body, and the network/timeout catch -- recording the failure and moving
      // to the next model rather than calling refundSlot() per path. refundSlot() is called
      // exactly once, after every model in the chain has been exhausted, which every failure
      // mode converges on regardless of which one(s) fired.
      const refundCallCount = (edgeFn.match(/await refundSlot\(\)/g) || []).length;
      expect(refundCallCount).toBe(1);

      const loopEnd = edgeFn.lastIndexOf('}\n\n  // Every model in the chain failed');
      const refundAt = edgeFn.indexOf('await refundSlot()');
      expect(loopEnd, 'the retry loop over attemptOrder must exist').toBeGreaterThan(-1);
      expect(refundAt, 'refundSlot() must run after the retry loop, not inside a single attempt')
        .toBeGreaterThan(loopEnd);

      for (const failurePath of ['UpstreamProviderError', 'EmptyResponse', 'MalformedOutput', 'GatewayTimeout']) {
        expect(edgeFn, `${failurePath} path must exist`).toContain(failurePath);
        // Every failure mode must record itself via lastFailure so the single refundSlot()
        // call after the loop is reached no matter which one(s) fired.
        const pathAt = edgeFn.indexOf(failurePath);
        const sliceAroundPath = edgeFn.slice(Math.max(0, pathAt - 400), pathAt + 50);
        expect(sliceAroundPath, `${failurePath} must set lastFailure before continuing to the next model`)
          .toMatch(/lastFailure = \{/);
      }
      expect(edgeFn).toContain('release_ai_scan_slot');
    });

    it('explains the limit bilingually and points the farmer at a human, not just an error code', () => {
      expect(edgeFn).toContain('DailyScanLimitReached');
      const limitBlock = edgeFn.slice(edgeFn.indexOf('DailyScanLimitReached'));
      expect(limitBlock).toContain('userFacingMessageEn');
      expect(limitBlock).toContain('userFacingMessageTe');
      // Running out of scans must not dead-end: RBK can inspect the crop in person, which
      // is more reliable than any photo diagnosis.
      expect(limitBlock).toContain('Rythu Bharosa Kendra');
      expect(limitBlock).toContain('రైతు భరోసా కేంద్రం');
      // 429 is the correct status so clients and proxies treat it as rate limiting.
      expect(limitBlock).toContain('429');
    });

    it('returns remaining-scan counts so the cap is never a surprise', () => {
      expect(edgeFn).toContain('scansRemainingToday');
      expect(edgeFn).toContain('dailyLimit');
    });

    it('keeps the per-user limit configurable without a code change', () => {
      expect(edgeFn).toContain('AI_DAILY_SCAN_LIMIT');
      expect(edgeFn).toContain('DEFAULT_DAILY_SCAN_LIMIT');
    });
  });

  describe('Migration 005', () => {
    it('enables RLS and gives clients no way to write their own counter', () => {
      expect(migration).toMatch(/alter table public\.ai_scan_quota enable row level security/i);
      // A client that could UPDATE this table could reset its own quota, so only SELECT is
      // granted and no insert/update/delete policy exists.
      expect(migration).toMatch(/for select/i);
      expect(migration).not.toMatch(/create policy[\s\S]{0,200}for (insert|update|delete)/i);
      expect(migration).toMatch(/grant select on table public\.ai_scan_quota to authenticated/i);
    });

    it('enforces the limit inside a single atomic statement', () => {
      // Two concurrent requests must not both read "one slot left" and both proceed. The
      // conditional ON CONFLICT ... WHERE makes the increment itself the check.
      expect(migration).toMatch(/on conflict \(user_id, quota_date\) do update/i);
      expect(migration).toMatch(/where q\.scan_count < p_daily_limit/i);
    });

    it('hardens both SECURITY DEFINER functions with an explicit search_path', () => {
      // Count the SQL clauses only — the phrase also appears in an explanatory comment, so
      // match it at the start of a line as it is actually written in a function definition.
      const definerCount = (migration.match(/^security definer$/gim) || []).length;
      const searchPathCount = (migration.match(/^set search_path = public, pg_temp$/gim) || []).length;
      expect(definerCount, 'both quota functions must be SECURITY DEFINER').toBe(2);
      expect(searchPathCount, 'every SECURITY DEFINER function needs a pinned search_path').toBe(definerCount);
    });

    it('derives the account from auth.uid() so a caller cannot affect another user', () => {
      expect(migration).toMatch(/v_user_id uuid := auth\.uid\(\)/);
      expect(migration).toMatch(/raise exception 'authentication required'/i);
      expect(migration).not.toMatch(/create or replace function public\.claim_ai_scan_slot\(p_user_id/i);
    });

    it('resets on the local Indian day boundary, not UTC', () => {
      // A quota resetting at 05:30 local time would look arbitrary to a farmer in AP.
      expect(migration).toContain("at time zone 'Asia/Kolkata'");
    });

    it('cannot drive the counter negative', () => {
      expect(migration).toMatch(/check \(scan_count >= 0\)/i);
      expect(migration).toMatch(/greatest\(scan_count - 1, 0\)/i);
    });

    it('revokes default grants from anon so an unauthenticated caller cannot execute either function', () => {
      expect(migration).toMatch(/revoke all on function public\.claim_ai_scan_slot\(integer\) from public, anon/i);
      expect(migration).toMatch(/revoke all on function public\.release_ai_scan_slot\(\) from public, anon/i);
    });
  });

  describe('Client handling of a quota refusal', () => {
    const image = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';

    // These tests exercise the gateway-dispatch branch of detectDisease (quota/error-body
    // handling), which the real app currently never reaches by default — live AI diagnosis
    // is paused (see detection.ts) pending budget and a measured accuracy baseline. Opt back
    // in for just this block, and always reset to the real default afterward.
    beforeEach(() => {
      __setAiLiveDiagnosisEnabledForTests(true);
    });
    afterEach(() => {
      __setAiLiveDiagnosisEnabledForTests(false);
    });

    it('surfaces the gateway\'s own explanation instead of a generic failure, and never invents a diagnosis', async () => {
      // Mirrors how supabase-js reports a non-2xx function response: an error carrying the
      // underlying Response on `context`.
      const quotaBody = {
        error: 'DailyScanLimitReached',
        userFacingMessageEn: "You have used all 15 of today's scans.",
        userFacingMessageTe: 'ఈ రోజు మీకు కేటాయించిన 15 స్కాన్‌లు పూర్తయ్యాయి.',
      };

      invokeMock.mockResolvedValueOnce({
        data: null,
        error: {
          name: 'FunctionsHttpError',
          message: 'Edge Function returned a non-2xx status code',
          context: { json: async () => quotaBody },
        },
      });

      const result = await detectDisease(image, image);

      expect(result.detected, 'a quota refusal must never be reported as a detection').toBe(false);
      if (!result.detected) {
        expect(result.messageEn).toBe(quotaBody.userFacingMessageEn);
        expect(result.messageTe).toBe(quotaBody.userFacingMessageTe);
      }
    });

    it('falls back to the honest generic unavailable message for any other gateway error', async () => {
      // A quota refusal is special-cased; everything else must keep the existing behaviour
      // of reporting unavailability rather than guessing.
      invokeMock.mockResolvedValueOnce({
        data: null,
        error: {
          name: 'FunctionsHttpError',
          message: 'Edge Function returned a non-2xx status code',
          context: { json: async () => ({ error: 'UpstreamProviderError' }) },
        },
      });

      const result = await detectDisease(image, image);
      expect(result.detected).toBe(false);
      if (!result.detected) {
        expect(result.reason).toBe('provider_unavailable');
        expect(result.messageEn).toMatch(/unavailable/i);
      }
    });

    it('does not crash when the gateway error body cannot be read', async () => {
      // Reading the body is best-effort: a malformed or missing body must degrade to the
      // generic path, never throw out of detectDisease.
      invokeMock.mockResolvedValueOnce({
        data: null,
        error: {
          name: 'FunctionsHttpError',
          message: 'Edge Function returned a non-2xx status code',
          context: {
            json: async () => {
              throw new Error('not json');
            },
          },
        },
      });

      const result = await detectDisease(image, image);
      expect(result.detected).toBe(false);
      if (!result.detected) {
        expect(result.reason).toBe('provider_unavailable');
      }
    });
  });
});
