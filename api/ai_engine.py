import json
from pathlib import Path
from typing import Dict, Any

from dotenv import load_dotenv

load_dotenv()

from services.llm_service import hybrid_llm

PROMPT_PATH = Path(__file__).resolve().parent / "prompts" / "applify_super_prompt.txt"


def load_system_prompt() -> str:
    with open(PROMPT_PATH, "r", encoding="utf-8") as f:
        return f.read()


class AIEngine:
    def __init__(self, model: str = None):
        self.model = model
        self.system_prompt = load_system_prompt()

    @staticmethod
    def _parse_json(raw_output: str) -> Dict[str, Any]:
        try:
            parsed = json.loads(raw_output)
        except Exception:
            start = raw_output.index("{")
            end = raw_output.rindex("}") + 1
            parsed = json.loads(raw_output[start:end])

        if not isinstance(parsed, dict):
            raise RuntimeError("Model output parsed but is not a JSON object.")
        return parsed

    def ask_for_json(self, prompt: str) -> Dict[str, Any]:
        try:
            raw_output = hybrid_llm(prompt)
        except Exception as e:
            raise RuntimeError(f"LLM engine error: {str(e)}")

        try:
            return self._parse_json(raw_output)
        except Exception as e:
            raise RuntimeError(
                f"Failed to parse LLM output as JSON. Raw output:\n{raw_output}"
            ) from e

    def generate_documents(self, candidate_payload: Dict[str, Any]) -> Dict[str, Any]:
        user_json = json.dumps({"candidate": candidate_payload}, ensure_ascii=False)
        full_prompt = self.system_prompt + "\n\nUSER_CANDIDATE_DATA:\n" + user_json
        return self.ask_for_json(full_prompt)
