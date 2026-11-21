"""Flame Connect API: starting point for a separate Python service.

Not deployed with the website. Intended home for future Flame OS / Flame
Academy back-end work. Reuses the shared core in ../../python/flame_core.

Run locally:
    pip install -r services/flame-api/requirements.txt
    uvicorn app.main:app --reload --app-dir services/flame-api
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "python"))
import flame_core  # noqa: E402
from flame_core import AssessmentError, score_assessment  # noqa: E402

app = FastAPI(title="Flame Connect API", version=flame_core.__version__, docs_url="/docs", redoc_url=None)

# Only the Flame Connect sites may call this API from a browser.
ALLOWED = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "https://www.flameconnect.tech,https://staging.flameconnect.tech").split(",") if o.strip()]
app.add_middleware(CORSMiddleware, allow_origins=ALLOWED, allow_methods=["GET", "POST"], allow_headers=["Content-Type"])


class AssessmentIn(BaseModel):
    answers: dict[str, int] = Field(..., description="Question id (q1 to q12) to answer score 1 to 4")


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "flame-api", "core": flame_core.__version__}


@app.post("/assessment/score")
def assessment_score(body: AssessmentIn) -> dict:
    try:
        return score_assessment(body.answers)
    except AssessmentError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
