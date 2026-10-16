# PDDS/HereForNature: Architecture vs. Global Competitors

**Date:** 2026-10-13
**Scope:** Our current frontend/backend/AI architecture, compared against Plantix, PictureThis, Plant.id/Kindwise, and Pl@ntNet. Builds on the existing `reports/Plant diagnosis app market research.md` (which covers accuracy claims, monetization, datasets) — this report focuses specifically on *how each product is built*.

---

## 1. Bottom line up front

**We are not using the same architecture as any major competitor, and the difference that matters most is this: every competitor with a real disease/species-ID product uses a custom-trained computer-vision classifier (CNN or ViT) as its core engine. We use a general-purpose multimodal LLM (via OpenRouter's free tier) with a prompt that lists our catalog IDs and asks it to pick one.**

That's not automatically wrong for a project at our current stage (zero budget, no labeled training data, no ML engineer on the team) — it's a reasonable way to get a working demo without months of dataset collection. But it is a materially different, and currently more fragile, foundation than what Plantix/Kindwise/Pl@ntNet run in production, and it's worth being honest about that trade-off rather than implying we're "AI-powered" in the same sense they are.

Everything else about our stack (React 19 + Vite, Supabase backend, no native app) is a legitimate, modern choice — just built for a very different (much smaller, much earlier-stage) scale than the competitors below.

---

## 2. Our current architecture (as of this codebase)

| Layer | What we actually have |
|---|---|
| **Frontend framework** | React 19 + Vite 6 + TypeScript. Plain CSS (`App.css`), no UI component library (no Tailwind/MUI/Chakra). |
| **Routing/navigation** | None — a single `Screen` string state (`'home' \| 'scan' \| 'result' \| 'history'`) swapped via `useState` in `App.tsx`. No React Router. |
| **State management** | React's own `useState`/`useContext` only (`LanguageContext` for EN/TE). No Redux/Zustand/React Query. |
| **Platform target** | Pure mobile web (PWA-*styled*, not fully PWA — see below). Camera access via HTML5 `<input capture="environment">` / MediaDevices, not a native camera API. Expo/React Native were explicitly removed per `AGENTS.md`. |
| **"Offline" support** | A `manifest.json` exists (installable look/icon/theme-color) but **no service worker is registered anywhere in the code** — so the app cannot actually load or serve a cached shell without network. What we do have is a client-side `localStorage` cache (`src/lib/cache/`) for *previously fetched* knowledge-catalog data and scan results, and a `navigator.onLine` check that shows a clean "offline" error message instead of fabricating a result. That is **graceful offline failure**, not offline functionality. |
| **AI/ML engine** | No trained model of our own, anywhere. The Supabase Edge Function `detect-crop` calls a **free general-purpose vision-capable LLM** on OpenRouter (default `dots-studio/dots-3-note-preview:free`) with a long text prompt instructing it to return structured JSON and map its answer to one of our ~16 cataloged disease IDs. A separate validator (`src/lib/ai/validator.ts`) checks the model's claimed crop/disease ID against our own `MOCK_CROPS`/`MOCK_DISEASES` registry and downgrades anything not recognized to "unsupported." |
| **Backend** | Supabase (hosted Postgres + Auth + Storage + one Edge Function). No separate application server, no containers, no GPU inference host of our own. |
| **Auth** | Supabase Anonymous Auth (`signInAnonymously`) by default, with a `localStorage`-based guest-ID fallback if Supabase is unreachable. No social/phone login implemented yet. |
| **Database** | 5 SQL migrations (scan history, RLS policies, storage bucket security, a "diagnostic tier"/demo-flag addition). Row-Level Security is explicitly used to isolate each user's scan history. |
| **Knowledge base** | A fully static, hand-curated TypeScript catalog (`src/lib/knowledge/catalog.ts`) — ~16 crop-disease entries, bilingual (EN/TE), each with an explicit evidence-status flag and citations. This is bundled into the app, not fetched from a database — it IS the "database" for agronomic content. |
| **i18n** | A small custom `translate()` lookup (`src/lib/i18n.ts`), not `react-intl`/`i18next`. |
| **Testing** | Vitest only (192 unit/integration tests, all passing). No Playwright/Testing-Library wired into CI; browser-level verification has been done manually in this session via a one-off Playwright script, not as a repeatable test. |
| **Deployment** | Vercel (static SPA build via `vite build` → `dist/`), Supabase project for backend. No CI/CD pipeline file found in the repo. |

**What does NOT exist, that you might expect from the name "AI Crop Doctor":** any trained image classifier, any on-device model, any model-training pipeline, any labeled training dataset of our own, any GPU inference infrastructure, any real-time image-quality/relevance filter beyond a simple pixel-variance heuristic (`evaluatePixelBuffer` in `detection.ts`, which just rejects blank/flat-color images — it cannot tell "crop leaf" from "random green object").

---

## 3. Competitor architecture summary

| Company | Mobile frontend | Offline capability | Core AI engine | Backend infra (public evidence) | Engineering transparency |
|---|---|---|---|---|---|
| **Plantix** (PEAT GmbH / Helm AG) | Android confirmed (Wikipedia); a related product (SKYFLD) uses **Flutter** — core Plantix app's framework itself not independently confirmed | **Offline reference library only** — the actual "Health Check" photo diagnosis is sent to Plantix's server; this is the same "offline failure, not offline diagnosis" pattern we have, just with a richer always-available library on top | Custom-trained deep-learning classifier (claimed 90+ disease/pest classes, 90%+ self-reported accuracy — see the earlier market-research report for the full accuracy-claims caveat) | **AWS**; Python/TypeScript microservices (Flask, PostgreSQL, MongoDB, Redis, Jenkins, Docker), processing "tens of thousands of images/day" per a (now-closed) job listing | Job listings only; no public engineering blog or GitHub org |
| **PictureThis** (Glority) | Not publicly documented (native vs. cross-platform unconfirmed) | Offline ID advertised in a store listing; mechanism undocumented | Custom-trained classifier (Glority holds its own "Plant group identification" US patents) | Not publicly documented (only a weak, ambiguous `amazon.com`/`google.com` network-traffic signal from a third-party security scan — not strong enough to call "AWS") | None found — the most closed of the four |
| **Plant.id / Kindwise** | Not an app at all for its core product — **Plant.id/plant.health/crop.health are REST APIs** meant to be embedded in other software. Kindwise's own demo client is an explicit **Progressive Web App**, installable from a mobile browser | Its original consumer app (FlowerChecker) was **discontinued in Oct 2024**; the PWA demo itself isn't offline-capable, just installable | Custom-trained classifier (reported ~61% top-3 disease accuracy in 2022, now 548 disease classes — see earlier report) | Not publicly documented at all | None found — no blog, jobs, or GitHub org for infra |
| **Pl@ntNet** (Inria/CIRAD/INRAE/IRD) | Native Android + iOS (per an older record) + a web app | Offline/embedded mode advertised; technical details (on-device model format) undocumented | Custom-trained deep CNN ("Identification Engine"), species-ID only (no disease detection) | Cloud-hosted "Identification Engine" for serving; **training runs on French national HPC (GENCI/IDRIS Jean Zay)**, not commercial cloud | **By far the most open** — public GitHub org, published systems-performance papers (arXiv:2108.04033, arXiv:2406.03356), real user/throughput numbers (10M+ users, ~400K images/day as of 2021) |

**Pattern worth naming explicitly:** No production deployment by any of these four companies uses a general-purpose multimodal LLM (GPT-4V/Gemini/Claude-class) as its primary diagnosis engine — every one of them trained its own narrow classifier. Our own research (both passes) found zero published case studies of anyone shipping a crop-disease app on top of a general vision-LLM in production. That doesn't mean it can't work — it means we're doing something genuinely different from the rest of the field, not a smaller version of the same thing.

---

## 4. Gap analysis: what's actually missing, ranked by how much it matters

### 4.1 No trained model = diagnosis quality is unverified and uncapped-cost
This is the single biggest structural gap. Competitors' classifiers have a bounded, known class set and (whatever its real-world accuracy is) a calibrated confidence score. Our pipeline asks a free general LLM to "pick one of 16 IDs" from a text prompt — its behavior on an image slightly outside our prompt's examples is unpredictable, and it has no true confidence signal (our own validator has to downgrade anything it doesn't recognize, which is a safety net, not a quality mechanism). It's also running on a **free-tier** model with no SLA — if OpenRouter changes its free model roster (which the research explicitly flagged as the single fastest-moving fact in this space), the app's core feature can silently degrade or stop working.

### 4.2 No real offline mode, despite PWA-style branding
We have a `manifest.json` and app-like icons, but no service worker — so unlike Plantix (offline reference library) or Pl@ntNet/PictureThis (offline ID advertised), our app cannot do anything useful without a live connection, including showing the already-cataloged disease information a farmer has already looked up before. This is a real, fixable gap: our own knowledge catalog is already 100% local/bundled data — it just isn't being served through a service worker for true offline access.

### 4.3 No dedicated backend/inference layer of our own
Every competitor with a documented backend (Plantix: AWS/Flask/Postgres/Mongo/Redis; Pl@ntNet: cloud Identification Engine + national HPC for training) runs purpose-built infrastructure sized for image-classification workloads. We run entirely on Supabase's generic BaaS (Postgres + Auth + Storage + one Edge Function) calling out to a third-party's free LLM endpoint. This is appropriate for our current traffic level and budget, but it has no path to "tens of thousands of images/day" without a redesign — there's no model-serving layer to scale in the first place.

### 4.4 No image-quality/relevance pre-filter beyond pixel variance
`evaluatePixelBuffer()` can reject a blank/flat-color image, but it has no actual "is this a leaf/plant" check — a photo of literally any textured object would pass this filter and go straight to the LLM. Competitors that run their own classifiers typically have the classifier itself serve this role (low confidence across all classes = "not a plant"); we don't have an equivalent signal.

### 4.5 No routing, no component library, no state library
These are much smaller gaps given our current screen count (4), but worth flagging since they'll bite as the app grows: adding a 5th/6th screen, deep-linking to a specific scan result, or sharing state across more than 2-3 components will get increasingly awkward without React Router and a real state layer. None of the competitors' architecture evidence speaks to this (it's internal plumbing, not user-facing), but it's a standard, low-risk upgrade worth doing before the screen count grows further.

### 4.6 No CI/CD pipeline
No GitHub Actions/CI config was found in the repo — tests and builds are run manually. All four competitors (to the extent documented) describe at least some automated pipeline (Plantix's job listing explicitly names Jenkins).

### 4.7 What we're honestly ahead on
It's not all gaps. Our evidence-integrity system (`EvidenceStatus`, per-claim `ClaimEvidenceNote`, mandatory RBK/VAA suppression caveats on every chemical dose) is something **no competitor in either research pass was found to do** — the market research explicitly notes "no verifiable dosage information was found for any app," and flags Plantix's commission-based agri-input monetization as a structural conflict of interest around treatment recommendations. Our bilingual (EN/TE) depth, AP-district-specific sourcing, and transparent "provisional/unverified" labeling is a genuine differentiator, not a gap — it's just independent of which ML architecture we use.

---

## 5. What this means, without over-claiming a recommendation

Changing our AI engine to a trained classifier is the highest-leverage architectural change available, but it is also the most expensive one — it requires a labeled dataset (PlantVillage + PlantDoc are the two most commonly cited starting points per our own research, with the explicit caveat that PlantVillage-trained models crash from ~99% lab accuracy to ~31% field accuracy — Mohanty/Hughes/Salathé 2016), a training pipeline, and someone to own model quality over time. That's a real project, not a quick swap.

The smaller, more tractable items (real offline support via a service worker, basic React Router, a CI pipeline) are things we could reasonably take on without new hires or budget.

Since AgastyaOne will be making the call on priority and resourcing here — a few things I'd want your input on before going further:

1. Is the near-term goal to keep this as a working demo/showcase (in which case the LLM-based approach is fine as-is, and I'd prioritize the offline/PWA fix since it's cheap and visible), or is there a real path to training our own classifier (in which case dataset sourcing is the actual first task, not an architecture change)?
2. Do you want me to scope out what a real offline-first PWA conversion would take (service worker + cache strategy) as a concrete next task?
3. Should "add React Router + a CI pipeline" go on the backlog now, or wait until the app has more than 4 screens?

---

*Sources: `reports/Plant diagnosis app market research.md` and its `research_notes/Plant diagnosis app market research/` (accuracy claims, monetization, datasets); `research_notes/PDDS architecture vs competitors/competitor_tech_stacks.md` (this pass — frontend/backend infra); direct reading of this repository's own source code (`src/`, `supabase/`, `package.json`, `vite.config.ts`) on 2026-10-13. Every competitor claim above carries the same evidence caveats as the source research notes — several rely on job listings or WebSearch snippets rather than directly-opened primary documents, and are flagged as such in the underlying notes files.*
