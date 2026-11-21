"""GET /api/py/health: confirms the Python runtime is serving."""

import os
import sys

# python/ is bundled with the function (vercel.json "includeFiles").
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "python"))

import platform
from http.server import BaseHTTPRequestHandler

import flame_core  # noqa: E402
from flame_core.http import send_json  # noqa: E402


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        send_json(self, 200, {"status": "ok", "service": "flame-connect-python", "python": platform.python_version(), "core": flame_core.__version__})

    def log_message(self, *args):  # keep function logs quiet
        pass
