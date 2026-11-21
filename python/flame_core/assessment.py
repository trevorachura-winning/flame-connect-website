"""AI readiness assessment scoring.

Mirrors ``scoreAssessment`` in content/assessment.ts. The questions, pillars
and levels come from ``assessment_data.json``, generated from the TypeScript
source by ``scripts/export-assessment.mjs``; tests/python checks both
implementations give identical results.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Mapping

_DATA = json.loads((Path(__file__).with_name("assessment_data.json")).read_text(encoding="utf-8"))
PILLARS: list[dict] = _DATA["pillars"]
QUESTIONS: list[dict] = _DATA["questions"]
LEVELS: list[dict] = _DATA["levels"]  # highest band first
QUESTION_IDS = {q["id"] for q in QUESTIONS}


class AssessmentError(ValueError):
    """Raised when answers are malformed."""


def _js_round(x: float) -> int:
    # JavaScript Math.round: halves round up (towards +infinity).
    import math

    return math.floor(x + 0.5)


def validate(answers: Mapping[str, object]) -> dict[str, int]:
    if not isinstance(answers, Mapping):
        raise AssessmentError("answers must be an object of question id to score")
    clean: dict[str, int] = {}
    for key, value in answers.items():
        if key not in QUESTION_IDS:
            raise AssessmentError(f"unknown question id: {key!r}")
        if isinstance(value, bool) or not isinstance(value, int) or not 1 <= value <= 4:
            raise AssessmentError(f"{key} must be a whole number from 1 to 4")
        clean[key] = value
    return clean


def score_assessment(answers: Mapping[str, object]) -> dict:
    """Score answers (1 to 4 each; missing answers count as 1). Returns 0 to 100 scores."""
    a = validate(answers)
    pillars = []
    for p in PILLARS:
        qs = [q for q in QUESTIONS if q["pillar"] == p["key"]]
        total = sum(a.get(q["id"], 1) for q in qs)
        pillars.append({"key": p["key"], "name": p["name"], "score": _js_round((total - len(qs)) / (len(qs) * 3) * 100)})
    total = sum(a.get(q["id"], 1) for q in QUESTIONS)
    score = _js_round((total - len(QUESTIONS)) / (len(QUESTIONS) * 3) * 100)
    level = next((lv for lv in LEVELS if score >= lv["min"]), LEVELS[-1])
    # Stable sort, lowest first, like Array.prototype.sort in modern engines.
    weakest = sorted(pillars, key=lambda p: p["score"])[:3]
    next_steps = [{"pillar": p["name"], "text": next(x["nextStep"] for x in PILLARS if x["key"] == p["key"])} for p in weakest]
    return {"score": score, "level": level, "pillars": pillars, "nextSteps": next_steps}
