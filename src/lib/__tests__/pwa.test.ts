import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Guards the offline-support configuration added so the app is usable in the field without a
 * connection. These assertions are deliberately made against the Vite config source rather
 * than a built service worker, so they run in the normal unit-test pass with no build step.
 *
 * The load-bearing invariant here is the SAFETY one, not the offline one: a diagnosis must
 * never be served from cache. A cached or replayed AI result looks identical to a live one on
 * screen, which is precisely the silent-wrong-answer failure this project's whole
 * evidence-integrity design exists to prevent. Offline must mean "the reference catalog still
 * opens and scanning fails honestly", never "here is a diagnosis from earlier".
 */
describe('Offline/PWA configuration safety', () => {
  const viteConfig = readFileSync(resolve(__dirname, '../../../vite.config.ts'), 'utf-8');

  it('registers a service worker so the bundled catalog is available offline', () => {
    expect(viteConfig).toContain('VitePWA');
    expect(viteConfig).toMatch(/globPatterns/);
    // The app is a SPA: without a navigate fallback, an offline reload of any route 404s.
    expect(viteConfig).toContain('navigateFallback');
  });

  it('never caches Supabase traffic, so an AI diagnosis can never be served from cache', () => {
    expect(viteConfig).toContain('runtimeCaching');
    expect(viteConfig).toContain('supabase');
    expect(viteConfig).toContain('NetworkOnly');

    // Stronger than a substring check: the Supabase rule must be the NetworkOnly one.
    // A future edit that switches it to any caching strategy fails here. Bounded to just
    // this one rule object (up to its closing "},"), not the rest of the file -- other
    // runtime-caching rules may legitimately use a caching strategy for unrelated, static
    // assets (e.g. on-device ML model weights), which must not trip this Supabase-specific
    // safety check.
    const supabaseIndex = viteConfig.indexOf('supabase');
    const supabaseRuleEnd = viteConfig.indexOf('},', supabaseIndex) + 2;
    const supabaseRule = viteConfig.slice(supabaseIndex, supabaseRuleEnd);
    const handlerMatch = supabaseRule.match(/handler:\s*'([A-Za-z]+)'/);
    expect(handlerMatch, 'Supabase runtime-caching rule must declare a handler').toBeTruthy();
    expect(handlerMatch![1]).toBe('NetworkOnly');

    // No caching strategy that could return a stale response may apply to Supabase traffic
    // specifically -- that's the actual invariant (an AI diagnosis must never be served from
    // cache). StaleWhileRevalidate/CacheFirst on an API route is the specific mistake this
    // guards against; a different, static, non-diagnosis asset (e.g. an ML model file) is
    // fine to cache and is intentionally not covered by this check.
    for (const forbidden of ['StaleWhileRevalidate', 'CacheFirst', 'CacheOnly']) {
      expect(supabaseRule, `${forbidden} must not be used for the Supabase runtime route`).not.toContain(
        forbidden
      );
    }
  });

  it('keeps the dev service worker off so development never serves stale assets', () => {
    expect(viteConfig).toMatch(/devOptions:\s*\{[\s\S]*?enabled:\s*false/);
  });

  it('cleans up outdated precaches so a stale catalog cannot persist across releases', () => {
    // Agronomic guidance changes; a farmer must not be pinned to a superseded catalog version
    // because an old precache was never evicted.
    expect(viteConfig).toContain('cleanupOutdatedCaches');
    expect(viteConfig).toContain("registerType: 'autoUpdate'");
  });
});
