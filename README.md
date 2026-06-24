# 🌿 PDDS — Plant Disease Detection System

> AI-powered platform that detects plant diseases, provides treatment recommendations, and educates users on plant care.

---

## 📌 Overview

PDDS is a production-grade, multimodal AI platform built for anyone who wants to know what's happening with their plant or crop — from home gardeners to large-scale farmers.

**Core flow:** Upload a plant image → Get instant disease diagnosis → Confidence score + severity → Treatment plan → Ask follow-up questions via AI chatbot

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   CLIENT LAYER                       │
│        Next.js 14 (Web)  +  Flutter (Mobile)        │
└───────────────────┬─────────────────────────────────┘
                    │ HTTPS / WebSocket
┌───────────────────▼─────────────────────────────────┐
│                 API GATEWAY                          │
│          Node.js — Auth, Rate Limit, Routing         │
└──┬──────────┬──────────┬──────────┬──────────┬──────┘
   │          │          │          │          │
┌──▼──┐  ┌───▼───┐  ┌───▼───┐  ┌───▼───┐  ┌──▼────┐
│Auth │  │Detect │  │ Chat  │  │Eductn │  │History│
│Svc  │  │ Svc   │  │  Svc  │  │  Svc  │  │  Svc  │
│Node │  │FastAPI│  │FastAPI│  │ Node  │  │ Node  │
└──┬──┘  └───┬───┘  └───┬───┘  └───┬───┘  └──┬────┘
   │          │          │          │          │
┌──▼──────────▼──────────▼──────────▼──────────▼─────┐
│                    DATA LAYER                        │
│   PostgreSQL │ MongoDB │ Redis │ Pinecone │ AWS S3  │
└─────────────────────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────┐
│                   AI / ML LAYER                      │
│  EfficientNet-B4 (CNN) │ NLP Engine │ RAG Pipeline  │
└─────────────────────────────────────────────────────┘
```

---

## 🗂️ Project Structure

```
pdds/
├── apps/
│   ├── web/              # Next.js 14 frontend
│   └── mobile/           # Flutter mobile app
├── services/
│   ├── gateway/          # Node.js API gateway
│   ├── detection/        # FastAPI — CNN disease detection
│   ├── chat/             # FastAPI — RAG chatbot (Plant Doctor)
│   ├── education/        # Node.js — How to Grow module
│   └── history/          # Node.js — Detection history
├── ml/
│   ├── models/           # Model training & export scripts
│   ├── data/             # Dataset preparation scripts
│   └── notebooks/        # Jupyter exploration notebooks
├── infra/
│   ├── docker/           # Dockerfiles per service
│   └── k8s/              # Kubernetes manifests
├── docs/                 # Architecture & API documentation
├── .github/workflows/    # CI/CD pipelines
└── docker-compose.yml    # Local development orchestration
```

---

## 🧠 Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Web Frontend | Next.js 14 (App Router) | SSR, SEO, performance |
| Mobile | Flutter | Cross-platform, single codebase |
| API Gateway | Node.js + Express | Fast routing, middleware |
| ML Serving | FastAPI + Python | Native Python ML ecosystem |
| CNN Model | PyTorch + EfficientNet-B4 | Best accuracy/speed tradeoff |
| NLP | spaCy + custom rules | Lightweight entity extraction |
| LLM / Chatbot | Anthropic Claude API | Grounded, accurate reasoning |
| Vector DB | Pinecone | Managed RAG at scale |
| Primary DB | PostgreSQL (Supabase) | Users, auth, ACID compliance |
| Document DB | MongoDB | Disease knowledge, detections |
| Cache | Redis | Sessions, inference queue |
| Image Storage | AWS S3 | Plant images, model artifacts |
| Deployment | Vercel (web) + Docker/K8s | Fast deploys + scalability |
| CI/CD | GitHub Actions | Automated test + deploy |

---

## 🚀 V1 Features

- [x] Image upload (1–4 images) → CNN disease detection
- [x] Confidence score (0–100%) + severity (Mild/Moderate/Critical)
- [x] Disease name, causes, treatment steps, prevention, citations
- [x] Contextual AI chat on detection result (Plant Doctor)
- [x] Symptom text input → NLP diagnosis
- [x] How to Grow lifecycle module
- [x] Detection history + health tracking
- [x] User auth (email + Google OAuth)

## 🔵 V2 Roadmap

- [ ] Offline mode (TensorFlow Lite on-device)
- [ ] Multi-language: Hindi, Spanish, Swahili, French
- [ ] Batch field scanning for large farms
- [ ] IoT sensor integration
- [ ] Seed-to-sale farm OS
- [ ] Marketplace

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker + Docker Compose
- Flutter 3.x

### Local Development

```bash
# Clone the repo
git clone https://github.com/AgastyaKancharla/pdds.git
cd pdds

# Start all services
docker-compose up -d

# Web frontend
cd apps/web
npm install
npm run dev

# Detection service
cd services/detection
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

---

## 📖 Documentation

- [System Architecture](docs/architecture.md)
- [API Reference](docs/api.md)
- [ML Pipeline](docs/ml-pipeline.md)
- [Database Schemas](docs/database.md)
- [Deployment Guide](docs/deployment.md)

---

## 📄 License

MIT © AgastyaKancharla
