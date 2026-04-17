# Applify — Frontend

A **Next.js 14** frontend for the Applify AI CV & Cover Letter generator.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 |
| State | Zustand (with localStorage persistence) |
| HTTP Client | Axios |
| Icons | Lucide React |
| Notifications | React Hot Toast |

## Getting Started

### Prerequisites

- Node.js ≥ 18
- The [Applify backend](../README.md) running on `http://localhost:8000`

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL to your backend URL
```

### 3. Start development server

```bash
npm run dev
# → http://localhost:3000
```

### 4. Build for production

```bash
npm run build
npm start
```

## Docker

```bash
docker build -t applify-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8000 applify-frontend
```

## Project Structure

```
frontend/
├── pages/
│   ├── _app.tsx          # Global layout (Navbar + Footer + Toaster)
│   ├── _document.tsx     # HTML document with meta tags & fonts
│   ├── index.tsx         # Landing page
│   └── generator.tsx     # CV/Cover Letter generator
├── components/
│   ├── Navbar.tsx        # Responsive navigation
│   ├── Footer.tsx        # Site footer
│   └── ResumeForm.tsx    # Full form (experience, education, skills…)
├── services/
│   └── api.ts            # Axios client + TypeScript types
├── store/
│   └── resumeStore.ts    # Zustand store with persistence
├── styles/
│   └── globals.css       # Tailwind + custom utilities/animations
├── Dockerfile            # Multi-stage production Docker build
└── .env.example          # Environment variable template
```

## Deployment

See [../DEPLOYMENT.md](../DEPLOYMENT.md) for full Vercel and Docker deployment instructions.
