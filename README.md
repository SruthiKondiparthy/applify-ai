# 🚀 Applify AI — Smart Job Application Generator

> AI-powered CV and cover letter generator with a modern Next.js frontend and FastAPI backend.

**Live Demo:** [https://applify-ai.vercel.app](https://applify-ai.vercel.app)  
**GitHub:** [https://github.com/SruthiKondiparthy/applify-ai](https://github.com/SruthiKondiparthy/applify-ai)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [Deploying to Vercel](#deploying-to-vercel)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Applify AI is a full-stack AI application that generates professional CVs (Lebenslauf), cover letters (Anschreiben), and application guidance following German employment standards from **Bundesagentur für Arbeit (arbeitsagentur.de)**.

### ✨ Features

- **AI-Generated CVs** — Chronological German-format Lebenslauf, ATS-optimized
- **AI-Generated Cover Letters** — Professional Anschreiben with all required sections
- **Easy-Language Variants** — Einfache Sprache versions for accessibility
- **PDF & DOCX Export** — Download ready-to-submit documents
- **Multi-LLM Support** — DeepSeek, Ollama (local), or OpenAI
- **Bewerbungsunterlagen Guidance** — Checklist based on official Arbeitsagentur rules
- **Modern React UI** — Next.js 15 with TailwindCSS, responsive and dark-themed

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 15.5.15 | React framework (SSR + routing) |
| [React](https://react.dev/) | 18.3.1 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.6.3 | Type-safe JavaScript |
| [TailwindCSS](https://tailwindcss.com/) | 3.4.1 | Utility-first CSS framework |
| [Zustand](https://zustand-demo.pmnd.rs/) | 4.5.5 | Lightweight state management |
| [Axios](https://axios-http.com/) | 1.15.1 | HTTP client |
| [Lucide React](https://lucide.dev/) | 0.461.0 | Icon library |
| [React Hot Toast](https://react-hot-toast.com/) | 2.4.1 | Toast notifications |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| [Python](https://www.python.org/) | 3.12+ | Runtime |
| [FastAPI](https://fastapi.tiangolo.com/) | 0.115.0 | REST API framework |
| [Uvicorn](https://www.uvicorn.org/) | 0.30.6 | ASGI web server |
| [Pydantic](https://docs.pydantic.dev/) | 2.7.4 | Data validation |
| [OpenAI SDK](https://github.com/openai/openai-python) | 1.50.0 | DeepSeek + OpenAI LLM access |
| [Jinja2](https://jinja.palletsprojects.com/) | 3.1.3 | Document templating |
| [python-docx](https://python-docx.readthedocs.io/) | 1.1.0 | DOCX generation |
| [ReportLab](https://www.reportlab.com/) | 4.2.0 | PDF generation |
| [pdfplumber](https://github.com/jsvine/pdfplumber) | 0.11.0 | PDF parsing |

### Infrastructure

| Tool | Purpose |
|------|---------|
| [Vercel](https://vercel.com/) | Frontend hosting & CI/CD |
| [Docker](https://www.docker.com/) | Containerization |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipelines |

---

## Project Structure

```
applify-ai/                          # Monorepo root
├── frontend/                        # Next.js frontend (React + TypeScript)
│   ├── components/                  # Reusable React components
│   ├── pages/                       # Next.js pages (file-based routing)
│   │   ├── _app.tsx                 # App wrapper
│   │   ├── _document.tsx            # HTML document
│   │   ├── index.tsx                # Landing page
│   │   └── generator.tsx            # CV generator page
│   ├── services/                    # API client services
│   ├── store/                       # Zustand state stores
│   ├── styles/                      # Global CSS (TailwindCSS)
│   ├── next.config.js               # Next.js configuration
│   ├── tailwind.config.js           # TailwindCSS configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── package.json                 # Frontend dependencies
│   └── package-lock.json            # Lockfile for deterministic installs
│
├── api/                             # FastAPI backend modules
│   ├── ai_engine.py                 # LLM integration & prompt logic
│   ├── schemas.py                   # Pydantic request/response schemas
│   ├── format_engine.py             # Document formatting
│   ├── utils.py                     # Utility functions
│   ├── prompts/
│   │   └── applify_super_prompt.txt # Master LLM prompt
│   └── template/
│       ├── german_resume_template.j2
│       └── german_cover_letter_template.j2
│
├── services/
│   └── llm_service.py               # LLM provider abstraction
│
├── tests/                           # Test suite
├── main.py                          # FastAPI entry point
├── requirements.txt                 # Python dependencies
├── vercel.json                      # Vercel deployment config
├── docker-compose.yml               # Local Docker orchestration
├── Dockerfile.backend               # Backend Docker image
├── Dockerfile.ui                    # UI Docker image
├── .env.example                     # Environment variable template
└── DEPLOYMENT.md                    # Detailed deployment guide
```

---

## Getting Started

### Prerequisites

- **Node.js** 20+ ([download](https://nodejs.org/))
- **Python** 3.12+ ([download](https://www.python.org/downloads/))
- **Git** ([download](https://git-scm.com/))
- A **DeepSeek API key** (or OpenAI key) — [get one here](https://platform.deepseek.com/)

### Clone the Repository

```bash
git clone https://github.com/SruthiKondiparthy/applify-ai.git
cd applify-ai
```

### Frontend Setup

```bash
cd frontend
npm install
```

Copy the environment file and configure it:

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### Backend Setup

```bash
# From repo root
python -m venv .venv

# Activate virtual environment
source .venv/bin/activate      # macOS/Linux
.venv\Scripts\activate         # Windows

pip install -r requirements.txt
```

Copy and configure the backend environment file:

```bash
cp .env.example .env
# Edit .env with your API keys
```

---

## Running Locally

### Start the Backend

```bash
# From repo root, with .venv activated
uvicorn main:app --reload --port 8000
```

Backend runs at: **http://localhost:8000**  
API docs (Swagger): **http://localhost:8000/docs**

### Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at: **http://localhost:3000**

### Using Docker Compose (optional)

```bash
docker-compose up --build
```

---

## Environment Variables

### Frontend (`frontend/.env.local`)

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | URL of the backend API |
| `NEXT_PUBLIC_APP_NAME` | `Applify AI` | Application display name |
| `NODE_ENV` | `development` | Node environment |

### Backend (`.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `APPLIFY_MODEL` | ✅ | LLM model to use (`deepseek`, `openai`, `ollama`) |
| `DEEPSEEK_API_KEY` | ✅ (if using DeepSeek) | DeepSeek platform API key |
| `OPENAI_API_KEY` | ✅ (if using OpenAI) | OpenAI API key |
| `PORT` | ❌ | Server port (default: `8000`) |
| `PYTHONUNBUFFERED` | ❌ | Set to `1` for real-time logging |
| `CORS_ORIGINS` | ❌ | Allowed CORS origins (e.g., your Vercel URL) |
| `DEBUG` | ❌ | Enable debug mode (`True`/`False`) |

---

## Deploying to Vercel

The frontend is deployed to Vercel. The repository includes a `vercel.json` at the root that handles the monorepo setup.

### Option 1: Deploy via Vercel Dashboard (Recommended)

The `vercel.json` at the repo root is already configured for the monorepo. Vercel will use it automatically when you import the repository.

1. Go to [vercel.com](https://vercel.com) and click **New Project**
2. Import the `applify-ai` GitHub repository
3. In the **Configure Project** step:
   - **Root Directory:** Leave as `.` (repo root — `vercel.json` handles the rest)
   - **Framework Preset:** Next.js (auto-detected)
   - **Build Command:** `npm --prefix frontend run build` (from `vercel.json`)
   - **Output Directory:** `frontend/.next` (from `vercel.json`)
   - **Install Command:** `npm --prefix frontend install` (from `vercel.json`)
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` → Your backend API URL
5. Click **Deploy**

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from repo root (vercel.json handles the rest)
vercel --prod
```

### Option 3: Automatic Deployment via GitHub Actions

The repository includes GitHub Actions workflows. Add these secrets to your repository:

| Secret | Where to find |
|--------|--------------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel project settings |
| `VERCEL_PROJECT_ID` | Vercel project settings |

Deployments trigger automatically on push to `main`.

### Production Environment Variables (Vercel Dashboard)

In **Vercel → Project → Settings → Environment Variables**, set:

```
NEXT_PUBLIC_API_URL = https://your-backend.vercel.app
```

---

## API Reference

### `POST /generate-resume`

Generate a German CV and cover letter.

**Request Body:**

```json
{
  "name": "Max Müller",
  "email": "max@example.com",
  "phone": "+49 123 456789",
  "experience": [
    {
      "title": "Software Engineer",
      "company": "Tech GmbH",
      "start": "2021-01",
      "end": "2024-01",
      "description": "..."
    }
  ],
  "education": [...],
  "skills": ["Python", "FastAPI", "React"],
  "job_description": "We are looking for a...",
  "want_pdf": true
}
```

**Response:**

```json
{
  "cv_text": "...",
  "cover_letter_text": "...",
  "cv_simple": "...",
  "cover_letter_simple": "...",
  "unterlagen_info": "...",
  "pdf_base64": "...",
  "docx_base64": "..."
}
```

Full API documentation available at `/docs` when running the backend.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests if applicable
4. Commit with a descriptive message: `git commit -m "feat: add your feature"`
5. Push to your fork: `git push origin feature/your-feature`
6. Open a Pull Request against `main`

### Development Guidelines

- **Frontend:** Follow the existing TypeScript + TailwindCSS patterns in `frontend/`
- **Backend:** Add Pydantic schemas for any new API endpoints
- **Tests:** Add tests in the `tests/` directory for new backend functionality
- **Commits:** Use [Conventional Commits](https://www.conventionalcommits.org/) format

---

## License

MIT License — free to use, modify, and distribute. See [LICENSE](LICENSE) for details.

---

## Author

**Sruthi Ravuru Kondiparthy**  
Python Developer · AI Engineer · LLM Applications Builder

[![GitHub](https://img.shields.io/badge/GitHub-SruthiKondiparthy-blue?logo=github)](https://github.com/SruthiKondiparthy/applify-ai)

