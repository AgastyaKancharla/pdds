import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // The app shell and the bundled agronomic catalog must be usable without a connection:
      // a farmer in a field with no signal should still be able to open a condition they
      // looked up earlier. The catalog is compiled into the JS bundle, so precaching the
      // build output is what makes the reference content genuinely offline-available.
      registerType: 'autoUpdate',
      // The existing public/manifest.json stays the single source of truth for app metadata —
      // the plugin only generates and registers the service worker.
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        navigateFallback: '/index.html',
        // SAFETY: a diagnosis must never be served from cache. A stale or replayed result
        // would be indistinguishable from a live one on screen, which is exactly the class of
        // silent-wrong-answer this project exists to avoid. Every Supabase call (the
        // detect-crop AI gateway, auth, scan history) is therefore network-only — if the
        // network is down, the app's existing offline path shows an honest "service
        // unavailable" message instead of a cached guess.
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/[a-z0-9-]+\.supabase\.co\/.*/i,
            handler: 'NetworkOnly',
          },
        ],
        // Keep the precache from silently ballooning if the bundle grows.
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        // Off in dev so the service worker never serves stale assets while developing.
        enabled: false,
      },
    }),
  ],
  server: {
    port: 5173,
    host: true,
  },
});
