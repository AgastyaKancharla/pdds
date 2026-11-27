import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Guards the per-user daily AI scan quota.
 *
 * Why this exists: before it, the scan Edge Function accepted any request whose
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
  const edgeFn = readFileSync(resolve(repoRoot, 'supabase/functions/diagnose-plant/index.ts'), 'utf-8');
  const migration = readFileSync(resolve(repoRoot, 'supabase/migrations/005_add_ai_scan_quota.sql'), 'utf-8');

  describe('Edge Function gateway (diagnose-plant)', () => {
    const upstream = 'api.anthropic.com/v1/messages';

    it('claims a slot before calling the upstream AI provider', () => {
      const claimAt = edgeFn.indexOf("'claim_ai_scan_slot'");
      const callAt = edgeFn.indexOf('await callClaude(');
      expect(edgeFn).toContain(upstream);
      expect(claimAt).toBeGreaterThan(-1);
      expect(callAt).toBeGreaterThan(-1);
      expect(claimAt, 'the quota must be claimed before the upstream call, not after').toBeLessThan(callAt);
    });

    it('only claims a slot after the payload has been validated', () => {
      // A malformed or oversized request must not cost the farmer part of their allowance.
      const payloadCheckAt = edgeFn.indexOf('A photo is required.');
      const sizeCheckAt = edgeFn.indexOf("'PayloadTooLarge'");
      const claimAt = edgeFn.indexOf("'claim_ai_scan_slot'");
      expect(payloadCheckAt).toBeGreaterThan(-1);
      expect(payloadCheckAt).toBeLessThan(claimAt);
      expect(sizeCheckAt).toBeLessThan(claimAt);
    });

    it('fails closed when the quota backend or AI key is not configured', () => {
      const guardAt = edgeFn.indexOf('The scan allowance service is not configured.');
      const keyGuardAt = edgeFn.indexOf('The AI key is not configured on the server.');
      const callAt = edgeFn.indexOf('await callClaude(');
      expect(guardAt).toBeGreaterThan(-1);
      expect(keyGuardAt).toBeGreaterThan(-1);
      expect(guardAt).toBeLessThan(callAt);
      expect(keyGuardAt).toBeLessThan(callAt);
      // An unreadable quota response must refuse rather than proceed.
      expect(edgeFn).toContain('QuotaUnavailable');
    });

    it("forwards the caller's own token, never a service-role key", () => {
      expect(edgeFn).toMatch(/claim\.status === 401 \|\| claim\.status === 403/);
      expect(edgeFn).toContain('Authorization: `Bearer ${userJwt}`');
      expect(edgeFn).not.toContain('SERVICE_ROLE');
      expect(edgeFn).not.toContain('service_role');
    });

    it('refunds the slot exactly once, after every model in the chain has failed', () => {
      expect(edgeFn).toMatch(/const refundSlot = async \(\) =>/);
      const refundCalls = (edgeFn.match(/await refundSlot\(\)/g) || []).length;
      expect(refundCalls).toBe(1);
      const loopAt = edgeFn.indexOf('for (const model of models)');
      const refundAt = edgeFn.indexOf('await refundSlot()');
      expect(loopAt).toBeGreaterThan(-1);
      expect(refundAt).toBeGreaterThan(loopAt);
      for (const failure of ['AiProviderError', 'AiMalformedOutput', 'AiTimeout', 'AiRateLimited']) {
        expect(edgeFn, `${failure} path must exist`).toContain(failure);
      }
      expect(edgeFn).toContain('release_ai_scan_slot');
    });

    it('explains the limit and points the farmer at a human, not just an error code', () => {
      expect(edgeFn).toContain('DailyScanLimitReached');
      const limitBlock = edgeFn.slice(edgeFn.indexOf("error: 'DailyScanLimitReached'"));
      expect(limitBlock).toContain('extension office');
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
});
