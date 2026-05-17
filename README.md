# EcoSync — AI-Native Ecosystem Orchestration Engine

> An intelligent startup-mentor matching platform powered by **Google Gemini**, **Firebase Authentication**, and a multi-stage AI pipeline built on **FastAPI** + **Supabase** vector storage.

---

## Architecture Overview

EcoSync follows a **5-stage AI pipeline** architecture that transforms messy, unstructured startup and mentor profiles into high-confidence, explainable match recommendations.

```
┌──────────────────────────────────────────────────────────────────┐
│              ADMIN DASHBOARD (Next.js Frontend)                  │
│     Programme Organizer · Mentor Hub · Startup Dashboard         │
└────────────────┬─────────────────────────────────┬───────────────┘
                 │ REST API                        │ Auth (JWT)
                 ▼                                 ▼
┌────────────────────────────┐       ┌──────────────────────────┐
│  EcoSync AI Engine         │       │  Firebase Authentication │
│  (FastAPI · Python)        │◄──────│  Email/Password · Google │
│                            │       │  Issues ID Token (JWT)   │
│  ① Extraction (Gemini)     │       └──────────────────────────┘
│  ② Embeddings (text-004)   │
│  ③ Graph Intelligence (HGT)│       ┌──────────────────────────┐
│  ④ RAG Retrieval           │──────►│  Supabase (PostgreSQL)   │
│  ⑤ Hybrid Ranker + Explain │       │  pgvector · 384d vectors │
└────────────────────────────┘       │  State Machine Lifecycle │
                                     └──────────────────────────┘
```

---

## Google Technologies Used

| Technology | Purpose | Stage |
|---|---|---|
| **Gemini 1.5 Flash** | Extracts structured JSON from messy startup/mentor profile text | ① Data Ingestion & Extraction |
| **text-embedding-004** | Generates 384-dimensional semantic vectors for companies, mentors, and knowledge chunks | ② Semantic Mapping |
| **Gemini 1.5 Pro** | Produces human-readable explainability narratives for top match recommendations | ⑤ Hybrid Ranker & Explainability |
| **Firebase Authentication** | Handles user sign-up/sign-in (Email/Password, Google OAuth), issues JWT tokens for API authorization | Auth Layer |

---

## AI Pipeline — 5 Stages

### ① Data Ingestion & Extraction (`services/extraction.py`)
Converts unstructured, messy profile text into clean, structured JSON using **Gemini 1.5 Flash** with constrained JSON output.

### ② Semantic Mapping (`services/embeddings.py`)
Transforms structured profiles into **384-dimensional dense vectors** using Google's **text-embedding-004** model. These embeddings are stored in Supabase with the `pgvector` extension for efficient similarity search.

### ③ Graph Intelligence (`services/graph_builder.py` & `services/hgt_model.py`)
Builds a **PyTorch Heterogeneous Graph** from the ecosystem data (companies, mentors, programmes, relationships). Uses **PyTorch Geometric's LinkPredictionHGT** (Heterogeneous Graph Transformer) to predict match success probability via `torch.no_grad()` inference, mapping Supabase UUIDs to PyTorch node indices.

### ④ RAG Retrieval (`services/rag_retriever.py`)
Performs **cosine similarity search** over the `knowledge_chunks` table to retrieve contextually relevant ecosystem information — past relationships, programme outcomes, and mentor expertise fragments — to ground the ranking in real data.

### ⑤ Hybrid Ranker & Explainability (`services/hybrid_ranker.py` & `services/explainability.py`)
Combines all signals using a weighted fusion formula:

```
ranking_score = 0.3 × Semantic + 0.4 × Graph + 0.3 × Historical
```

The top-ranked mentor is then passed to **Gemini 1.5 Pro** to generate a human-readable explanation of why this match was recommended.

---

## State Machine & Lifecycle (`services/match_service.py`)

```
  ┌──────────────┐     Admin      ┌──────────────┐     Feedback    ┌──────────────┐
  │   PENDING    │───Approval────►│    ACTIVE     │───Submitted───►│  COMPLETED   │
  │ (AI Match)   │                │ (Relationship)│                │  (Feedback)  │
  └──────────────┘                └──────────────┘                └──────────────┘
```

- `POST /api/matches/generate/{startup_id}` → Triggers full AI pipeline → Creates `match_recommendations` with status `pending`
- `POST /api/matches/approve/{match_id}` → Executes state machine → Moves recommendation to an `active` relationship

---

## Database Architecture (Supabase + pgvector)

| Table | Purpose |
|---|---|
| `companies` | Startup profiles with `embedding VECTOR(384)` for extracted needs vectors |
| `mentors` | Mentor profiles with `embedding VECTOR(384)` for expertise vectors |
| `knowledge_chunks` | Ecosystem context fragments with `embedding VECTOR(384)` for RAG retrieval |
| `match_recommendations` | AI-generated matches with semantic, graph, and confidence scores (status: `pending`) |
| `relationships` | Approved active mentorships (status: `active` or `completed`) |
| `feedback` | Post-relationship feedback and outcome scores |
| `organizers` | Programme organizer profiles |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16, React 19, TailwindCSS 4, Framer Motion, Radix UI |
| **Backend** | Python 3.11+, FastAPI, Uvicorn |
| **AI / ML** | Google Gemini 1.5 Flash & Pro, text-embedding-004, PyTorch, PyTorch Geometric |
| **Database** | Supabase (PostgreSQL + pgvector), 384d vector embeddings |
| **Auth** | Firebase Authentication (Email/Password, Google Sign-In, JWT) |
| **Visualization** | react-force-graph-2d (Ecosystem Graph) |

---

## Project Structure

```
ecosystem-os/
├── ai_engine/                    # Python FastAPI backend
│   ├── main.py                   # API entry point & route definitions
│   ├── database.py               # Supabase client initialization
│   ├── models.py                 # Pydantic data models
│   └── services/
│       ├── extraction.py         # ① Gemini 1.5 Flash — data extraction
│       ├── embeddings.py         # ② text-embedding-004 — semantic vectors
│       ├── graph_builder.py      # ③ PyTorch HGT — graph construction
│       ├── hgt_model.py          # ③ HGT model definition & inference
│       ├── rag_retriever.py      # ④ Cosine similarity RAG retrieval
│       ├── hybrid_ranker.py      # ⑤ Weighted fusion ranking
│       ├── explainability.py     # ⑤ Gemini 1.5 Pro — match explanations
│       ├── match_service.py      # State machine & lifecycle management
│       └── generator.py          # Programme detail generation
├── frontend/                     # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── admin/            # Programme Organizer Control Center
│   │   │   ├── mentor/           # Mentor Productivity Hub
│   │   │   ├── startup/          # Startup Growth Assistant
│   │   │   ├── auth/             # Sign-in / Sign-up flows
│   │   │   └── login/            # Role selection landing
│   │   ├── components/ui/        # Shared UI components
│   │   └── lib/
│   │       ├── firebase.ts       # Firebase Auth client
│   │       └── supabase.ts       # Supabase client & helpers
│   └── package.json
├── .env                          # Environment variables (see below)
└── test.sql                      # Database schema (pgvector enabled)
```

---

## Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.11
- **pip** (Python package manager)
- A **Supabase** project with `pgvector` extension enabled
- A **Google Cloud / AI Studio** API key for Gemini
- A **Firebase** project with Authentication enabled

---

## Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ecosystem-os.git
cd ecosystem-os
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 3. Set up the database

Run the schema in your Supabase SQL Editor:

```sql
-- Enable pgvector extension for 384d embeddings
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Then run the contents of test.sql to create all tables
```

### 4. Start the Backend (AI Engine)

```bash
cd ai_engine
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The API server will start at `http://127.0.0.1:8000`. Verify with:

```bash
curl http://127.0.0.1:8000/health
# Expected: {"status":"healthy","database":"connected"}
```

### 5. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Root status check |
| `GET` | `/health` | Database connectivity health check |
| `POST` | `/api/extract/startup` | Extract structured data from messy startup profile text using Gemini |
| `POST` | `/api/generate/programme` | AI-generate programme details from partial inputs |
| `POST` | `/api/matches/generate/{startup_id}` | Trigger full 5-stage AI matching pipeline for a startup |
| `POST` | `/api/matches/approve/{match_id}` | Approve a pending match → create active relationship |

---

## Frontend Portals

| Portal | Path | Description |
|---|---|---|
| **Programme Organizer** | `/admin/*` | System-level governance, ecosystem graph, match approvals, analytics |
| **Mentor Hub** | `/mentor/*` | Portfolio management, session scheduling, startup insights, AI recommendations |
| **Startup Dashboard** | `/startup/*` | Growth pathway, mentor matching, funding radar, milestone tracking |

---

## License

This project is developed for the EcoSync hackathon. All rights reserved.
