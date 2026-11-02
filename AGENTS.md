# HereForNature - Architecture & Guidelines

This project is a React Web application powered by Vite, TypeScript, and Supabase.

- **Dev Server**: `npm run dev` (starts Vite dev server)
- **Build**: `npm run build` (`tsc && vite build`)
- **Framework**: React 19 + Vite 6 (Pure Web - Expo and React Native have been completely removed)
- **Target Platforms**: Mobile web browsers (Safari, Chrome) & Desktop browsers
- **Camera/Photo Capture**: HTML5 MediaDevices / File inputs with `capture="environment"`

## Cursor Cloud specific instructions

- Node.js 22 is the version CI uses (`.github/workflows/ci.yml`). The default Cloud Agent image already provides it through nvm, and a login shell finds `node` and `npm` on `PATH`.
- Install dependencies with `npm ci`. The lockfile is authoritative, and running `npm ci` again is safe.
- Checks that match CI: `npx tsc --noEmit`, `npm test` (Vitest), and `npm run build`.
- `npm run dev` serves the app on `0.0.0.0:5173` (`vite.config.ts` sets `host: true` and `port: 5173`).
- When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are unset, scan history stays in browser local storage. The sample-crop diagnosis and the crop library still run. `.env.test` is loaded only by Vitest.
- Live photo diagnosis calls a Supabase Edge Function. The OpenRouter API key belongs in that function's environment as `OPENROUTER_API_KEY`.
