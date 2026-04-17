# Applify Deployment Guide

Complete guide to deploy Applify-AI to Vercel and production environments.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Vercel Deployment](#vercel-deployment)
3. [Environment Variables](#environment-variables)
4. [CI/CD Pipeline](#cicd-pipeline)
5. [Production Deployment](#production-deployment)
6. [Troubleshooting](#troubleshooting)

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- Git
- Vercel account (for cloud deployment)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/SruthiKondiparthy/applify-ai.git
cd applify-ai
```

2. Install dependencies:
```bash
# Backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

3. Create environment files:

**Backend `.env`:**
```env
APPLIFY_MODEL=deepseek
DEEPSEEK_API_KEY=your-key-here
PORT=8000
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Start development servers:

**Terminal 1 - Backend:**
```bash
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Access at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Vercel Deployment

### Deploy Frontend Only

1. **Connect GitHub Repository:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` as root directory

2. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Set Environment Variables:**
   - Go to Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL`

4. **Deploy:**
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

### Deploy Backend

1. **Create Vercel Project for Backend:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Do NOT select a framework (use default settings)

2. **Configure Build Settings:**
   - Build Command: `pip install -r requirements.txt`
   - Runtime: Python 3.11
   - Root Directory: `.` (root)

3. **Set Environment Variables:**
   - `APPLIFY_MODEL=deepseek`
   - `DEEPSEEK_API_KEY=your-api-key`
   - `PYTHONUNBUFFERED=1`

4. **Deploy:**
   - Click "Deploy"
   - Your API will be at `https://your-backend.vercel.app`

## Environment Variables

### Backend (`.env`)

```env
# AI/LLM
APPLIFY_MODEL=deepseek
DEEPSEEK_API_KEY=your_deepseek_api_key
OPENAI_API_KEY=optional_openai_key

# Server
PORT=8000
PYTHONUNBUFFERED=1

# Optional
DEBUG=False
CORS_ORIGINS=https://your-frontend.vercel.app
```

### Frontend (`.env.local`)

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app

# App Configuration
NEXT_PUBLIC_APP_NAME=Applify
NODE_ENV=production
```

### Vercel Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

**Frontend Project:**
```
NEXT_PUBLIC_API_URL = https://your-backend.vercel.app
```

**Backend Project:**
```
APPLIFY_MODEL = deepseek
DEEPSEEK_API_KEY = your_api_key
PYTHONUNBUFFERED = 1
```

## CI/CD Pipeline

GitHub Actions workflows are configured for automatic deployment:

### `.github/workflows/deploy-frontend.yml`
- Triggers on: Push to `main` with changes in `frontend/`
- Steps:
  1. Checkout code
  2. Setup Node.js 18
  3. Install dependencies
  4. Build Next.js app
  5. Deploy to Vercel

### `.github/workflows/deploy-backend.yml`
- Triggers on: Push to `main` with changes in backend files
- Steps:
  1. Checkout code
  2. Setup Python 3.11
  3. Install dependencies
  4. Run tests
  5. Deploy to Vercel

### Setup CI/CD

1. Go to GitHub repository Settings
2. Add Secrets:
   - `VERCEL_TOKEN` - Get from https://vercel.com/account/tokens
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Project ID for backend
   - `VERCEL_FRONTEND_PROJECT_ID` - Project ID for frontend

3. Secrets are automatically available in workflows

## Production Deployment

### Using Docker

1. **Build Docker images:**
```bash
docker-compose -f docker-compose.prod.yml build
```

2. **Run containers:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

3. **Access application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

### Using Kubernetes

1. **Create deployment files** (example provided below)
2. **Apply to cluster:**
```bash
kubectl apply -f k8s/
```

### Health Checks

**Backend health endpoint:**
```bash
curl http://localhost:8000/docs
```

**Frontend health:**
```bash
curl http://localhost:3000
```

## Performance Optimization

### Frontend

- ✅ Next.js Image Optimization
- ✅ Code Splitting
- ✅ CSS Modules
- ✅ Minification enabled
- ✅ SWC compiler for faster builds

### Backend

- ✅ Uvicorn workers
- ✅ CORS optimization
- ✅ Request compression
- ✅ Database connection pooling (when added)

## Monitoring

### Vercel Analytics

1. Enable in Vercel Dashboard
2. Monitor:
   - Response times
   - Error rates
   - Deployment success

### Application Monitoring

Recommended services:
- **Error Tracking**: Sentry
- **Logging**: LogRocket
- **Uptime**: StatusPage.io

## Troubleshooting

### 504 Gateway Timeout

**Problem**: Vercel functions timeout after 60 seconds

**Solution**:
1. Optimize API response times
2. Move heavy computation to backend
3. Increase timeout (Pro plan required)

### CORS Errors

**Problem**: Frontend can't reach backend

**Solution**:
```python
# In main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Build Fails

**Frontend:**
```bash
# Clear cache and rebuild
npm cache clean --force
npm run build
```

**Backend:**
```bash
# Check Python version
python --version  # Should be 3.11+

# Verify dependencies
pip install -r requirements.txt
```

### Environment Variables Not Working

1. Verify variable names match (case-sensitive)
2. For Next.js, prefix with `NEXT_PUBLIC_` for client-side
3. Redeploy after changing variables
4. Check Vercel Dashboard for env var status

## Security Checklist

- [ ] Enable CORS restrictions (not `*`)
- [ ] Use HTTPS only (automatic with Vercel)
- [ ] Secure API keys in Vercel Secrets
- [ ] Enable rate limiting on backend
- [ ] Validate all user inputs
- [ ] Set secure headers
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Performance Targets

- Frontend Lighthouse Score: 90+
- Backend API Response: <200ms
- Time to First Byte (TTFB): <1s
- LCP (Largest Contentful Paint): <2.5s

## Support

For deployment issues:
1. Check Vercel Dashboard logs
2. Review GitHub Actions workflow logs
3. Open an issue on GitHub
4. Contact Vercel support

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)