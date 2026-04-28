import os
from datetime import datetime
from typing import Any, Dict

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from api.ai_engine import AIEngine
from api.format_engine import render_cover_letter_text, render_cv_text
from api.schemas import CandidateInput, JDRequirementsInput, ResumeCompatibilityInput
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
async def extract_jd_requirements(payload: JDRequirementsInput):
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
{payload.job_description}
"""
    try:
        result = ai.ask_for_json(prompt)
        result["generated_at"] = datetime.utcnow().isoformat() + "Z"
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)
