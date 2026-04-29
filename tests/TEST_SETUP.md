# Genr8CV Test Setup

This folder contains backend-focused functional tests and deterministic test data for the Genr8CV flows.

## What is covered

1. `POST /generate-resume`
2. `POST /analyze-compatibility`
3. `POST /extract-jd-requirements`
4. AIEngine JSON parsing and prompt composition behavior
5. JD extraction endpoint accepts both JSON payload and raw text/plain body

## Test data

- `tests/testdata/candidate_input.json`
- `tests/testdata/resume_compatibility_input.json`
- `tests/testdata/jd_requirements_input.json`

These payloads are realistic examples that can also be reused for manual API tests.

## Run tests

From repo root:

```bash
pytest tests/test_ai_engine.py tests/test_endpoints.py -q
```

## Notes

- Endpoint tests monkeypatch `main.ai` methods (`generate_documents` / `ask_for_json`) so they do not call external LLM providers.
- This makes the test suite stable and suitable for CI.
