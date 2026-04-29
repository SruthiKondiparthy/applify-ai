import json
from pathlib import Path

from fastapi.testclient import TestClient

import main

TESTDATA_DIR = Path(__file__).parent / "testdata"


def _load_json(filename: str):
    return json.loads((TESTDATA_DIR / filename).read_text(encoding="utf-8"))


client = TestClient(main.app)


def test_generate_resume_returns_expected_shape(monkeypatch):
    candidate = _load_json("candidate_input.json")

    def mock_generate_documents(payload):
        assert payload["name"] == candidate["name"]
        return {
            "cv_text": "Generated CV",
            "cover_letter_text": "Generated Cover Letter",
            "unterlagen_info": "Attach certificates",
            "cv_simple": "Simple CV",
            "cover_letter_simple": "Simple Cover Letter",
        }

    monkeypatch.setattr(main.ai, "generate_documents", mock_generate_documents)

    response = client.post("/generate-resume", json=candidate)

    assert response.status_code == 200
    data = response.json()
    assert data["cv_text"] == "Generated CV"
    assert data["cover_letter_text"] == "Generated Cover Letter"
    assert data["unterlagen_info"] == "Attach certificates"
    assert "generated_at" in data


def test_analyze_compatibility_returns_gap_analysis(monkeypatch):
    payload = _load_json("resume_compatibility_input.json")

    def mock_ask_for_json(prompt: str):
        assert "JOB_DESCRIPTION" in prompt
        assert "RESUME_TEXT" in prompt
        return {
            "match_score": 78,
            "requirements": ["Python", "FastAPI", "Docker", "AWS"],
            "strengths": ["Python", "FastAPI", "Docker"],
            "gaps": ["AWS", "CI/CD"],
            "recommended_documents": ["Resume", "Cover Letter", "Project Portfolio"],
        }

    monkeypatch.setattr(main.ai, "ask_for_json", mock_ask_for_json)

    response = client.post("/analyze-compatibility", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert data["match_score"] == 78
    assert "AWS" in data["gaps"]
    assert "generated_at" in data


def test_extract_jd_requirements_returns_structured_fields(monkeypatch):
    payload = _load_json("jd_requirements_input.json")

    def mock_ask_for_json(prompt: str):
        assert "JOB_DESCRIPTION" in prompt
        return {
            "job_title": "Senior Backend Developer",
            "key_requirements": ["Build scalable APIs", "Own backend architecture"],
            "must_have_skills": ["Python", "FastAPI", "Docker", "AWS"],
            "optional_skills": ["Kubernetes", "Terraform"],
            "keywords": ["scalability", "microservices", "cloud"],
            "suggested_resume_sections": ["Summary", "Experience", "Projects", "Skills"],
        }

    monkeypatch.setattr(main.ai, "ask_for_json", mock_ask_for_json)

    response = client.post("/extract-jd-requirements", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert data["job_title"] == "Senior Backend Developer"
    assert "Python" in data["must_have_skills"]
    assert "generated_at" in data


def test_analyze_compatibility_validation_error():
    response = client.post("/analyze-compatibility", json={"job_description": "Missing resume_text"})
    assert response.status_code == 422


def test_extract_jd_requirements_accepts_plain_text(monkeypatch):
    jd_text = "Need Python, FastAPI, and Docker for backend role"

    def mock_ask_for_json(prompt: str):
        assert jd_text in prompt
        return {
            "job_title": "Backend Developer",
            "key_requirements": ["Build APIs"],
            "must_have_skills": ["Python", "FastAPI", "Docker"],
            "optional_skills": [],
            "keywords": ["backend"],
            "suggested_resume_sections": ["Experience"],
        }

    monkeypatch.setattr(main.ai, "ask_for_json", mock_ask_for_json)

    response = client.post(
        "/extract-jd-requirements",
        content=jd_text,
        headers={"content-type": "text/plain"},
    )

    assert response.status_code == 200
    assert response.json()["job_title"] == "Backend Developer"

    def test_extract_jd_requirements_falls_back_when_llm_fails(monkeypatch):
    payload = _load_json("jd_requirements_input.json")

    def mock_ask_for_json(_prompt: str):
        raise RuntimeError("LLM engine error: All LLM providers failed")

    monkeypatch.setattr(main.ai, "ask_for_json", mock_ask_for_json)

    response = client.post("/extract-jd-requirements", json=payload)

    assert response.status_code == 200
    data = response.json()
    assert data["fallback_mode"] is True
    assert "warning" in data
    assert "generated_at" in data
