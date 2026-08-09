# CLAUDE.md

Guidance for AI assistants (and humans) working in this repository.

## Overview

PDDS (Plant Disease Detection System) lets a user photograph a plant, get an AI diagnosis of what's wrong with it, and chat with an AI "Plant Doctor" for grounded follow-up advice. It also has a "How to Grow" plant lifecycle education module and per-user detection history.

It's a microservices monorepo: a Next.js frontend talks to a Node/Express gateway, which proxies to four backend services (one Python ML service, one Python RAG chat service, two Node/Express content services).

> **README vs. reality**: the README and `docker-compose.yml` describe the chat service as using Ollama + ChromaDB. **That's not what's actually running.** `services/chat` uses **Anthropic Claude** (`anthropic` SDK, model `claude-sonnet-4-6`) and **Pinecone** for retrieval. The `ollama` container in `docker-compose.yml` is provisioned but nothing uses it. `ml/data/seed_knowledge_base.py` seeds ChromaDB, but the chat service never reads from Chroma — it pulls disease knowledge from the `detection` service's MongoDB-backed `KnowledgeService` instead. Trust the code, not the README, on this point.

## Architecture

| Service | Path | Tech | Responsibility |
|---|---|---|---|
| **web** | `apps/web/` | Next.js 14 (App Router) + TypeScript + Tailwind, on Vercel | Frontend UI: upload/detect, chat, growth guides, history, auth |
| **gateway** | `services/gateway/` | Node/Express | Auth (JWT), rate limiting, request logging, reverse-proxies everything else |
| **detection** | `services/detection/` | FastAPI + PyTorch/timm (EfficientNet-B4) | Runs disease classification on uploaded images |
| **chat** | `services/chat/` | FastAPI + Anthropic Claude + Pinecone | RAG-backed "Plant Doctor" chatbot, grounded in a detection's disease info |
| **education** | `services/education/` | Node/Express + Mongoose | "How to Grow" plant lifecycle content |
| **history** | `services/history/` | Node/Express + Mongoose | Detection history and stats |

A Flutter mobile app (`apps/mobile`) is mentioned in the README but **does not exist in this repo** — treat it as aspirational, not present.

**Request flow**: browser → gateway (`/api/v1/*`) → gateway proxies to the matching backend service. Auth (`/api/v1/auth`) is handled directly by the gateway (Postgres via Supabase-backed users/profiles). The gateway does *not* forward the raw JWT downstream — it verifies the token itself and forwards user identity via `x-user-id` / `x-user-email` / `x-user-role` headers.

**Shared data**: the MongoDB `detections` collection is written by `detection` (classification result + disease info), appended to by `chat` (`chat_history` array, via `$push`), and read directly by `history` (`mongoose.connection.collection('detections')`). Any schema change here needs to stay compatible across all three services — none of them own it exclusively.

**Databases**: Postgres via Supabase (`users`, `profiles`, `usage_tracking` — see `services/gateway/db/migrations/001_init.sql`) for auth; MongoDB for `detections`, `plants` (education), and an ad hoc `diseases` collection (no committed schema); Redis for caching/rate limiting.

## Repository layout

```
apps/web/            Next.js frontend (App Router)
services/gateway/     Node/Express API gateway + auth
services/detection/   FastAPI ML inference service
services/chat/        FastAPI RAG chat service (Claude + Pinecone)
services/education/   Node/Express plant lifecycle content
services/history/     Node/Express detection history/stats
ml/                   Standalone training/data-prep scripts (not part of any running service)
infra/docker/         Dockerfiles actually used by docker-compose.yml (context = repo root)
infra/k8s/            Minimal — just a namespace manifest so far, no deployments
```

**Duplicate Dockerfiles**: every service also has its own `services/<name>/Dockerfile`, separate from and inconsistent with `infra/docker/<name>/Dockerfile` (e.g. different exposed ports). `docker-compose.yml` uses the `infra/docker/*` versions — treat those as authoritative and the `services/*/Dockerfile` copies as stale.

## Development setup & commands

Quick start:
```bash
cp .env.example .env      # fill in Supabase keys (see Environment variables below)
docker-compose up -d      # mongodb, redis, chromadb, ollama, gateway, detection, chat, education, history
cd apps/web && npm i && npm run dev
```

Per-service commands (verbatim from each `package.json`):

| Service | dev | build | test | lint |
|---|---|---|---|---|
| `apps/web` | `npm run dev` | `npm run build` | — | `npm run lint` |
| `services/gateway` | `npm run dev` (nodemon) | — | `npm run test` (jest --coverage) | `npm run lint` |
| `services/education` | `npm run dev` (nodemon) | — | `npm run test` (jest --coverage) | — |
| `services/history` | `npm run dev` (nodemon) | — | `npm run test` (jest --coverage) | — |

Python services (`services/detection`, `services/chat`) have no package-manager scripts — run directly:
```bash
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 2   # detection
uvicorn main:app --host 0.0.0.0 --port 8002 --workers 2   # chat
```

ML training/data prep (standalone, not run as part of any service):
```bash
python ml/data/prepare_dataset.py --output_dir ./data/PlantVillage --verify
python ml/models/train.py --epochs 50 --batch-size 32
```

**Frontend build note**: `apps/web/next.config.js` sets `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true` — `npm run build` will **not** fail on lint or type errors. Run `npm run lint` / `tsc` yourself to actually catch issues; don't treat a successful build as a correctness signal.

## Testing & CI status

**There is no working test suite in this repo right now.** Jest/pytest/supertest are declared as dependencies and `npm test` scripts exist, but:
- No `*.test.js` / `*.spec.js` files exist anywhere (gateway/education/history).
- `services/detection/tests/` and `services/chat/tests/` contain only empty `__init__.py` files.
- `apps/web` has no test framework configured at all.

**There is also no CI.** The README shows a CI badge pointing at `.github/workflows/ci.yml`, but that directory doesn't exist in this repo — workflow files were deliberately never committed (the commit history notes the token used lacked `workflow` scope). Don't assume a pipeline is validating anything on push; running `npm test`/`pytest` locally will pass trivially (no tests to fail) rather than prove correctness.

If you add real functionality, consider writing the first tests for it — there's no existing suite to follow, so match the framework already declared per service (Jest for Node services, pytest/pytest-asyncio for the Python services).

## Code conventions

- **Node services** (gateway/education/history) use CommonJS (`require`/`module.exports`), not ESM. Consistent JSON response envelope: `{ success: boolean, data?, error?: string }`.
- **Python services** (detection/chat) use FastAPI `lifespan` context managers for startup/shutdown, and a "static class as service" pattern — `ModelService`, `Database`, `KnowledgeService`, `RAGService` all use `@classmethod`/`@staticmethod` with class-level state rather than dependency-injected instances. Follow this pattern rather than introducing instance-based services.
- **No linter/formatter config files exist** anywhere in the repo (no `.eslintrc*`, `.prettierrc*`, `ruff.toml`). ESLint runs on framework defaults only (`eslint-config-next` for the frontend).
- **Frontend styling is split, and this is intentional, not an oversight**: `tailwind.config.js` defines a custom palette (`forest`, `chlorophyll`, `mint`, `parchment`) and `globals.css` has `@apply`-based classes (`btn-primary`, `card`, `severity-*`), but the actual page components mostly use inline `style={{ ... }}` with raw hex codes instead. This was a deliberate fix for Vercel build failures (see git history). When editing these pages, match the inline-style pattern already in use rather than "fixing" it back to Tailwind classes, unless you're deliberately addressing the underlying build issue.
- **Commit convention**: Conventional Commits (`feat:`, `fix:`, `chore:`), used consistently across the repo's history. Follow it.

## Environment variables

Defined in `.env.example`: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `MONGO_URI`, `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `CHROMA_HOST`, `CHROMA_PORT`, `OLLAMA_HOST`, `OLLAMA_MODEL`, `GATEWAY_PORT`, `DETECTION_SERVICE_URL`, `CHAT_SERVICE_URL`, `EDUCATION_SERVICE_URL`, `HISTORY_SERVICE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_API_URL`, `MODEL_PATH`, `CONFIDENCE_THRESHOLD`, `IMAGE_SIZE`, `NUM_CLASSES`.

**Gaps** — these are read by the code but missing from `.env.example`:
- **`MONGO_URL` vs `MONGO_URI` mismatch**: `.env.example` defines `MONGO_URI`, but the actual service code reads `MONGO_URL`. If you're setting up a local `.env`, you likely need both names (or to check the specific service) until this is reconciled.
- Gateway: `JWT_SECRET`, `JWT_EXPIRES_IN`, `ALLOWED_ORIGINS`, `NODE_ENV`, `DATABASE_URL`, `LOG_LEVEL`.
- Chat: `ANTHROPIC_API_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX` — required since chat actually calls Claude/Pinecone, not Ollama.
- Detection storage: `AWS_S3_BUCKET`, `AWS_REGION`, `MINIO_ENDPOINT`, `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`.

## Known gaps / inconsistencies (read before assuming otherwise)

- Chat service's actual stack (Claude + Pinecone) contradicts the README/docker-compose (Ollama + ChromaDB) — see Overview.
- `ollama` container and `ml/data/seed_knowledge_base.py` (ChromaDB seeding) are provisioned/present but unused by any running code path.
- Each service has two Dockerfiles; only the `infra/docker/*` ones are used by `docker-compose.yml`.
- No tests exist despite test tooling being declared; no CI pipeline exists despite a README badge referencing one.
- `MONGO_URL`/`MONGO_URI` naming mismatch between code and `.env.example`; several env vars used in code are undocumented in `.env.example` (see above).
- No `LICENSE` or `CONTRIBUTING.md` in the repo.
- Frontend production builds ignore ESLint and TypeScript errors (`next.config.js`) — a green build doesn't mean the code is clean.
