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
        // The vendored TF.js/TFLite UMD bundles and WASM glue scripts also end as plain
        // .js files in the build output (Vite copies public/ verbatim), so the glob above
        // would otherwise sweep them into the EAGER precache for every visitor -- exactly
        // what the CacheFirst runtime rule below is meant to avoid. Excluded here; they're
        // cached lazily on first real on-device-diagnosis use instead.
        globIgnores: ['vendor/**', 'tflite-wasm/**'],
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
          // On-device model weights (.tflite, several MB each), the vendored TF.js/TFLite
          // UMD bundles (public/vendor/), and the TFLite WASM runtime + its glue scripts
          // (public/tflite-wasm/, ~3.6MB per variant, 4 variants) are deliberately NOT in
          // the eager precache list above -- a farmer on limited mobile data shouldn't have
          // their first app load blocked on ~25MB of ML assets they may never use. Cache
          // them lazily on first real use instead (CacheFirst), so on-device diagnosis
          // still works offline from the second scan onward. Re-running a crop's model does
          // not change its filename, so a retrained replacement needs a new filename (e.g.
          // `_v2`) to bust this cache -- unlike a diagnosis result, a model file update is
          // safe to version this way.
          {
            urlPattern: /\/(models|tflite-wasm|vendor)\/.*\.(tflite|wasm|js)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'on-device-model-assets',
              expiration: { maxEntries: 30 },
            },
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
