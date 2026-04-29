import os
import re
from datetime import datetime
from typing import Any, Dict

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from api.ai_engine import AIEngine
from api.format_engine import render_cover_letter_text, render_cv_text
from api.schemas import CandidateInput, ResumeCompatibilityInput
from api.utils import create_docx_from_text, create_pdf_from_text

load_dotenv()

app = FastAPI(title="Genr8CV Backend", version="1.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ai = AIEngine()

def _local_extract_jd_requirements(job_description: str) -> Dict[str, Any]:
    chunks = [part.strip() for part in re.split(r"[\n.;]", job_description) if part.strip()]

    skill_hints = [
        "python", "fastapi", "docker", "aws", "kubernetes", "terraform",
        "react", "node", "typescript", "sql", "java", "ci/cd"
    ]
    jd_lower = job_description.lower()
    must_have = [skill for skill in skill_hints if skill in jd_lower]

    words = re.findall(r"[A-Za-z0-9+#.\-]{4,}", jd_lower)
    stop = {"with", "from", "that", "this", "your", "have", "will", "role", "job", "must", "nice", "need"}
    keywords = []
    for w in words:
        if w in stop:
            continue
        if w not in keywords:
            keywords.append(w)
        if len(keywords) >= 12:
            break

    return {
        "job_title": "Role extracted from JD",
        "key_requirements": chunks[:6] or ["Review responsibilities and convert to resume bullets."],
        "must_have_skills": must_have or keywords[:6],
        "optional_skills": keywords[6:10],
        "keywords": keywords,
        "suggested_resume_sections": ["Summary", "Skills", "Experience", "Projects", "Education"],
        "fallback_mode": True,
    }

async def _extract_job_description(request: Request) -> str:
    content_type = (request.headers.get("content-type") or "").lower()

    if "application/json" in content_type:
        payload = await request.json()
        if isinstance(payload, dict):
            jd = str(payload.get("job_description", "")).strip()
            if jd:
                return jd
        if isinstance(payload, str):
            jd = payload.strip()
            if jd:
                return jd

    raw_text = (await request.body()).decode("utf-8", errors="ignore").strip()
    if raw_text:
        return raw_text

    raise HTTPException(
        status_code=422,
        detail=(
            "Provide the job description either as raw text/plain body or JSON: "
            '{"job_description": "..."}'
        ),
    )
@app.post("/generate-resume", response_model=Dict[str, Any])
async def generate_resume(candidate: CandidateInput):
    payload = candidate.model_dump() if hasattr(candidate, "model_dump") else candidate.dict()
    try:
        model_out = ai.generate_documents(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    cv_text = model_out.get("cv_text", "")
    cover_letter_text = model_out.get("cover_letter_text", "")
    unterlagen_info = model_out.get("unterlagen_info", "")
    cv_simple = model_out.get("cv_simple", "")
    cover_letter_simple = model_out.get("cover_letter_simple", "")

    try:
        if isinstance(model_out.get("cv_data"), dict):
            cv_text = render_cv_text(model_out["cv_data"])
        if isinstance(model_out.get("cover_letter_data"), dict):
            cover_letter_text = render_cover_letter_text(model_out["cover_letter_data"])
    except Exception:
        pass

    response = {
        "cv_text": cv_text,
        "cover_letter_text": cover_letter_text,
        "unterlagen_info": unterlagen_info,
        "cv_simple": cv_simple,
        "cover_letter_simple": cover_letter_simple,
        "generated_at": datetime.utcnow().isoformat() + "Z",
    }

    if candidate.want_pdf:
        try:
            pdf_bytes = create_pdf_from_text(
                f"Lebenslauf - {candidate.name}",
                cv_text + "\n\n" + cover_letter_text,
            )
            docx_bytes = create_docx_from_text(
                f"Lebenslauf - {candidate.name}",
                cv_text + "\n\n" + cover_letter_text,
            )
            import base64

            response["pdf_base64"] = base64.b64encode(pdf_bytes).decode("utf-8")
            response["docx_base64"] = base64.b64encode(docx_bytes).decode("utf-8")
        except Exception as e:
            response["pdf_error"] = str(e)

    return response


@app.post("/analyze-compatibility", response_model=Dict[str, Any])
async def analyze_compatibility(payload: ResumeCompatibilityInput):
    prompt = f"""
You are a resume analyst for job applications.
Return JSON only with this exact structure:
{{
  "match_score": <integer 0-100>,
  "requirements": ["..."],
  "strengths": ["..."],
  "gaps": ["..."],
  "recommended_documents": ["..."]
}}
Use concise bullet-style text.

JOB_DESCRIPTION:
{payload.job_description}

RESUME_TEXT:
{payload.resume_text}
"""
    try:
        result = ai.ask_for_json(prompt)
        result["generated_at"] = datetime.utcnow().isoformat() + "Z"
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/extract-jd-requirements", response_model=Dict[str, Any])
async def extract_jd_requirements(request: Request):
    job_description = await _extract_job_description(request)

    prompt = f"""
You are a hiring assistant. Extract role requirements from a job description.
Return JSON only with this exact structure:
{{
  "job_title": "...",
  "key_requirements": ["..."],
  "must_have_skills": ["..."],
  "optional_skills": ["..."],
  "keywords": ["..."],
  "suggested_resume_sections": ["..."]
}}

JOB_DESCRIPTION:
{job_description}
"""
    try:
        result = ai.ask_for_json(prompt)
        result["generated_at"] = datetime.utcnow().isoformat() + "Z"
        return result
    except Exception:
        fallback = _local_extract_jd_requirements(job_description)
        fallback["generated_at"] = datetime.utcnow().isoformat() + "Z"
        fallback["warning"] = "LLM unavailable, returned local fallback extraction."
        return fallback


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)
