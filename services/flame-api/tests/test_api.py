import pytest

pytest.importorskip("fastapi")
pytest.importorskip("httpx")

from fastapi.testclient import TestClient  # noqa: E402

from app.main import app  # noqa: E402

client = TestClient(app)


def test_health():
    r = client.get("/health")
    assert r.status_code == 200 and r.json()["status"] == "ok"


def test_score():
    r = client.post("/assessment/score", json={"answers": {f"q{i}": 1 for i in range(1, 13)}})
    assert r.status_code == 200 and r.json()["score"] == 0


def test_rejects_unknown_question():
    r = client.post("/assessment/score", json={"answers": {"q99": 2}})
    assert r.status_code == 422
