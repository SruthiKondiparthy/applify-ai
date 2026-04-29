from api.ai_engine import AIEngine


def test_parse_json_plain_object():
    output = '{"cv_text": "ok", "cover_letter_text": "ok"}'
    parsed = AIEngine._parse_json(output)
    assert parsed["cv_text"] == "ok"


def test_parse_json_with_wrapped_text():
    output = 'Here is your result:\n{"match_score": 90, "gaps": ["AWS"]}\nThanks!'
    parsed = AIEngine._parse_json(output)
    assert parsed["match_score"] == 90
    assert parsed["gaps"] == ["AWS"]


def test_generate_documents_uses_ask_for_json(monkeypatch):
    engine = AIEngine()
    captured = {}

    def mock_ask(prompt: str):
        captured["prompt"] = prompt
        return {"cv_text": "Generated CV"}

    monkeypatch.setattr(engine, "ask_for_json", mock_ask)

    result = engine.generate_documents({"name": "Max", "job_description": "Backend role"})

    assert result["cv_text"] == "Generated CV"
    assert "USER_CANDIDATE_DATA" in captured["prompt"]
    assert "Max" in captured["prompt"]
