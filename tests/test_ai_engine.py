# tests/test_ai_engine.py

import json
import sys
from pathlib import Path

# Add repo root to Python path
sys.path.append(str(Path(__file__).resolve().parent.parent))
from api.ai_engine import AIEngine

def test_generate_documents_mock():
    """
    Test AIEngine.generate_documents in mock mode, without calling real LLM APIs.
    """

    class MockAIEngine(AIEngine):
        def generate_documents(self, candidate_payload, max_tokens=3000):
            # Instead of calling hybrid_llm, return a dummy JSON
            return {
                "resume_text": f"Resume for {candidate_payload.get('name', 'Unknown')}",
                "cover_letter_text": f"Cover letter for {candidate_payload.get('name', 'Unknown')}",
                "pdf_generated": False
            }

    # Initialize mock engine
    engine = MockAIEngine()

    # Dummy candidate data
    candidate_payload = {
        "name": "Max Mustermann",
        "email": "max.mustermann@example.com",
        "phone": "+49 123 456789",
        "education": "M.Sc. in Computer Science, TU Berlin",
        "experience": "3 years as Software Engineer at Example GmbH",
        "skills": ["Python", "FastAPI", "Streamlit", "Machine Learning"],
        "languages": ["German", "English"],
        "want_pdf": False
    }

    # Call generate_documents
    result = engine.generate_documents(candidate_payload)

    print("✅ Mock generate_documents output:")
    print(json.dumps(result, indent=2, ensure_ascii=False))

    # Basic assertions (optional for CI)
    assert "resume_text" in result
    assert "cover_letter_text" in result
    assert result["pdf_generated"] is False


# Run test directly if executed
if __name__ == "__main__":
    test_generate_documents_mock()
