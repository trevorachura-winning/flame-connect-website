"""POST /api/py/assessment: score AI readiness answers server-side.

Body: {"answers": {"q1": 1-4, ..., "q12": 1-4}}. Stores nothing; returns the
same result the website computes in the browser.
"""

import os
import sys

# python/ is bundled with the function (vercel.json "includeFiles").
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "python"))

import json
from http.server import BaseHTTPRequestHandler

from flame_core import AssessmentError, score_assessment  # noqa: E402
from flame_core.http import MAX_BODY, send_json  # noqa: E402


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            length = 0
        if length <= 0 or length > MAX_BODY:
            return send_json(self, 413 if length > MAX_BODY else 400, {"error": "send a JSON body under 8 KB"})
        try:
            body = json.loads(self.rfile.read(length).decode("utf-8"))
            answers = body.get("answers") if isinstance(body, dict) else None
            if answers is None:
                raise AssessmentError("missing 'answers'")
            result = score_assessment(answers)
        except (json.JSONDecodeError, UnicodeDecodeError):
            return send_json(self, 400, {"error": "body must be valid JSON"})
        except AssessmentError as exc:
            return send_json(self, 422, {"error": str(exc)})
        send_json(self, 200, result)

    def do_GET(self):
        send_json(self, 405, {"error": "use POST with {\"answers\": {...}}"})

    def log_message(self, *args):
        pass
