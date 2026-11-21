"""Python scoring must match the website's TypeScript scoring exactly."""

import json
from pathlib import Path

import pytest

from flame_core import AssessmentError, score_assessment

FIXTURES = json.loads((Path(__file__).with_name("assessment_fixtures.json")).read_text())


@pytest.mark.parametrize("case", FIXTURES)
def test_matches_typescript(case):
    r = score_assessment(case["answers"])
    exp = case["expected"]
    assert r["score"] == exp["score"]
    assert r["level"]["name"] == exp["level"]
    assert [[p["key"], p["score"]] for p in r["pillars"]] == exp["pillars"]
    assert [n["pillar"] for n in r["nextSteps"]] == exp["nextSteps"]


@pytest.mark.parametrize("bad", [{"q99": 2}, {"q1": 0}, {"q1": 5}, {"q1": "3"}, {"q1": True}, {"q1": 2.5}, ["q1"]])
def test_rejects_bad_answers(bad):
    with pytest.raises(AssessmentError):
        score_assessment(bad)
