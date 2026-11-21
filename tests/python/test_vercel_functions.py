"""Run the Vercel Python handlers on a local HTTP server and call them."""

import importlib.util
import json
import threading
import urllib.error
import urllib.request
from http.server import HTTPServer
from pathlib import Path

import pytest

API = Path(__file__).resolve().parents[2] / "api" / "py"


def load(name):
    spec = importlib.util.spec_from_file_location(f"api_py_{name}", API / f"{name}.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.handler


@pytest.fixture()
def serve():
    servers = []

    def start(name):
        srv = HTTPServer(("127.0.0.1", 0), load(name))
        threading.Thread(target=srv.serve_forever, daemon=True).start()
        servers.append(srv)
        return f"http://127.0.0.1:{srv.server_port}"

    yield start
    for s in servers:
        s.shutdown()


def call(url, data=None):
    req = urllib.request.Request(url, data=data, method="POST" if data is not None else "GET", headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as res:
            return res.status, json.loads(res.read())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read())


def test_health(serve):
    status, body = call(serve("health"))
    assert status == 200 and body["status"] == "ok"


def test_assessment_scores(serve):
    status, body = call(serve("assessment"), json.dumps({"answers": {f"q{i}": 4 for i in range(1, 13)}}).encode())
    assert status == 200 and body["score"] == 100 and body["level"]["name"] == "Ready to scale"


@pytest.mark.parametrize("payload,code", [(b"not json", 400), (json.dumps({"answers": {"q1": 9}}).encode(), 422), (json.dumps({}).encode(), 422), (b"x" * 9000, 413)])
def test_assessment_rejects(serve, payload, code):
    status, body = call(serve("assessment"), payload)
    assert status == code and "error" in body


def test_assessment_get_not_allowed(serve):
    status, _ = call(serve("assessment"))
    assert status == 405
