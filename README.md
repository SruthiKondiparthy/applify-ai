# 🇩🇪 Applify — AI-Powered German CV & Cover Letter Generator

_Create professional Bewerbungsunterlagen in one click_

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://applify-ai.vercel.app)

Applify is a full-stack AI application that generates **German-formatted CVs (Lebenslauf)**, **Anschreiben (Cover Letters)**, and **Bewerbungsunterlagen guidance** based on official rules from **Bundesagentur für Arbeit (arbeitsagentur.de)**. The backend is powered by **Python/FastAPI** with **DeepSeek/Ollama LLMs**, and the frontend is a modern **Next.js (React)** app deployed on **Vercel**.

The user can:
- Upload an existing resume or manually enter details
- Receive a structured German **Lebenslauf (CV)**
- Generate a perfectly formatted **Anschreiben** following German employment standards
- Get **easy-language versions**
- Download everything as **PDF** or **DOCX**
- View guidance on required **Bewerbungsunterlagen**
- Use Applify LLM prompt logic to enforce correctness & structure

---

## ⭐ Features

### ✔ **1. AI-Generated German CV (Lebenslauf)**
- Follows official German CV rules
- Chronological format
- Automatic structure enforcement
- Jinja2-based resume templates
- Option to download as **PDF** or **DOCX**

### ✔ **2. AI-Generated Anschreiben (Cover Letter)**
- Includes professional structure:
  - Kontaktdaten
  - Datum/Ort
  - Betreff
  - Anrede
  - Einstieg
  - Hauptteil
  - Argumente
  - Verbindung zum Unternehmen
  - Schluss & Grußformel
- Easy-language variant (Einfache Sprache)

### ✔ **3. Bewerbungsunterlagen Info Module**
Based on Arbeitsagentur rules:
- What goes into a German application
- CV + Cover Letter + Zeugnisse
- Optional components (Deckblatt, Motivationsschreiben, Anlagenverzeichnis)

### ✔ **4. DeepSeek / Ollama / Local LLM Support**
- No OpenAI billing needed
- Fully works offline with supported models

### ✔ **5. Full Backend API**
- REST endpoint `/generate-resume`
- JSON response
- PDF & DOCX generation

### ✔ **6. Modern Next.js Frontend**
- Built with Next.js 15, React 18, TypeScript, and TailwindCSS
- State management with Zustand
- Clean, responsive UI deployed on Vercel

---

## 🏗️ Tech Stack

### **Backend**
- 🐍 Python 3.12+
- ⚡ FastAPI
- 🧠 DeepSeek / Ollama (or OpenAI if available)
- 📝 Jinja2 templates
- 📄 python-docx, ReportLab for PDF
- 🚀 Uvicorn

### **Frontend**
- ⚛️ Next.js `15.5.15` (React `18.3.1`)
- 🟦 TypeScript `5.6.3`
- 🎨 TailwindCSS `3.4.1`
- 🗂️ Zustand `4.5.5` — state management
- 🔗 Axios `1.15.1` — HTTP client
- 🔔 react-hot-toast `2.4.1` — notifications
- 🖼️ lucide-react `0.461.0` — icons

### **Infrastructure**
- 🚀 Vercel (frontend deployment)
- 🐳 Docker-ready
- ⚙️ GitHub Actions compatible
- 🔐 .env secrets isolation

---

## 📂 Project Structure

```
applify-ai/                          # Monorepo root
├── frontend/                        # Next.js frontend (deployed to Vercel)
│   ├── components/                  # Reusable React components
│   ├── pages/                       # Next.js pages (file-based routing)
│   ├── services/                    # API service layer (Axios)
│   ├── store/                       # Zustand state management
│   ├── styles/                      # Global CSS / TailwindCSS
│   ├── next.config.js               # Next.js configuration
│   ├── tailwind.config.js           # TailwindCSS configuration
│   ├── tsconfig.json                # TypeScript configuration
│   ├── package.json                 # Frontend dependencies
│   └── .env.example                 # Frontend env variable template
├── api/                             # FastAPI route handlers & logic
│   ├── ai_engine.py
│   ├── schemas.py
│   ├── format_engine.py
│   ├── utils.py
│   ├── prompts/applify_super_prompt.txt
│   └── template/
│       ├── german_resume_template.j2
│       └── german_cover_letter_template.j2
├── services/                        # Shared backend services
│   └── llm_service.py
├── tests/                           # Backend tests
├── main.py                          # FastAPI entrypoint
├── requirements.txt                 # Python dependencies
├── vercel.json                      # Vercel deployment config
├── Dockerfile.backend               # Backend Docker image
├── docker-compose.yml
├── .env.example                     # Backend env variable template
├── .gitignore
└── LICENSE
```

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.12+
- Node.js 20.x
- npm

### **1. Clone the repository**

```bash
git clone https://github.com/SruthiKondiparthy/applify-ai.git
cd applify-ai
```

### **2. Backend setup**

```bash
# Create a virtual environment
python -m venv .venv

# Activate it (macOS/Linux)
source .venv/bin/activate

# Activate it (Windows)
# .venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and fill in your API keys (see Environment Variables section)
```

### **3. Frontend setup**

```bash
cd frontend

# Install Node.js dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL (see Environment Variables section)
```

---

## ▶️ Running Locally

Open two terminal windows from the repository root:

**Terminal 1 — Start the backend:**

```bash
uvicorn main:app --reload
```

Backend runs at: `http://127.0.0.1:8000`  
API docs available at: `http://127.0.0.1:8000/docs`

**Terminal 2 — Start the frontend:**

```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## ☁️ Deployment to Vercel

The frontend is deployed to Vercel as a Next.js application. Follow these steps to deploy your own instance:

### **1. Push your code to GitHub**

Make sure your latest changes are pushed to a GitHub repository.

### **2. Create a new Vercel project**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"** and import your GitHub repository
3. Set the **Root Directory** to `frontend`
4. Vercel will auto-detect Next.js — confirm the following build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`
   - **Node.js Version:** `20.x`

### **3. Add environment variables**

In the Vercel project dashboard go to **Settings → Environment Variables** and add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.vercel.app` |
| `NEXT_PUBLIC_APP_NAME` | `Applify AI` |

### **4. Deploy**

Click **"Deploy"**. Vercel will build and publish the app. Your frontend will be live at `https://your-project.vercel.app`.

> **Note:** The backend (FastAPI) must be deployed separately (e.g., as a second Vercel project, on Render, Railway, or any Python-compatible host). Update `NEXT_PUBLIC_API_URL` with the backend's public URL.

---

## 🔐 Environment Variables

### Backend (`.env` — based on `.env.example`)

| Variable | Required | Description |
|---|---|---|
| `APPLIFY_MODEL` | ✅ | LLM to use: `deepseek` or `openai` |
| `DEEPSEEK_API_KEY` | ✅ | DeepSeek API key |
| `OPENAI_API_KEY` | ❌ | Optional OpenAI API key |
| `PORT` | ❌ | Server port (default: `8000`) |
| `PYTHONUNBUFFERED` | ❌ | Set to `1` for unbuffered output |
| `CORS_ORIGINS` | ❌ | Allowed CORS origins (e.g., `https://applify-ai.vercel.app`) |
| `DEBUG` | ❌ | Enable debug mode (default: `False`) |

### Frontend (`frontend/.env.local` — based on `frontend/.env.example`)

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ | Backend API base URL (e.g., `http://localhost:8000`) |
| `NEXT_PUBLIC_APP_NAME` | ❌ | App display name (default: `Applify AI`) |
| `NODE_ENV` | ❌ | Node environment (`development` or `production`) |

---

## 🧠 API Usage

**POST** `/generate-resume`

```json
{
  "name": "Max Müller",
  "email": "max@example.com",
  "experience": ["..."],
  "skills": ["..."],
  "job_description": "...",
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

---

## 🛣️ Roadmap

- [ ] Add LinkedIn import
- [ ] Multi-language CV support
- [ ] ATS compatibility checker
- [ ] Export to Europass CV
- [ ] User accounts + cloud storage

---

## 📜 License

MIT License — free to use, modify, distribute.

---

## 🎯 Author

**Sruthi Ravuru Kondiparthy**  
Python Developer • AI Engineer • LLM Applications Builder
