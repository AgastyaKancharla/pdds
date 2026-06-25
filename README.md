# 🌿 PDDS — Plant Disease Detection System

> Point your camera at any plant → know what's wrong → know exactly what to do.

[![CI](https://github.com/AgastyaKancharla/pdds/actions/workflows/ci.yml/badge.svg)](https://github.com/AgastyaKancharla/pdds/actions)

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + TypeScript + Tailwind — **Vercel** |
| Auth + DB + Storage | **Supabase** (Postgres + GoTrue + Storage) |
| API Gateway | Node.js + Express — Docker |
| ML Detection | FastAPI + EfficientNet-B4 — Docker |
| AI Chat | FastAPI + Ollama (Llama 3) + ChromaDB — Docker |
| Education + History | Node.js — Docker |

## Quick Start

```bash
git clone https://github.com/AgastyaKancharla/pdds.git && cd pdds
cp .env.example .env          # fill in Supabase keys
docker-compose up -d          # start all backend services
cd apps/web && npm i && npm run dev
```

## Structure

```
pdds/
├── apps/web/          Next.js 14 frontend (→ Vercel)
├── apps/mobile/       Flutter app
├── services/
│   ├── gateway/       Node.js API gateway
│   ├── detection/     FastAPI + EfficientNet-B4
│   ├── chat/          FastAPI + Ollama + ChromaDB
│   ├── education/     Node.js
│   └── history/       Node.js
├── ml/                Training scripts + dataset prep
├── infra/             Dockerfiles + K8s manifests
└── .github/workflows/ CI/CD
```
