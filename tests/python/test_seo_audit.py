"""SEO audit checks, run against sample pages (no network)."""

import importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location("seo_audit", Path(__file__).resolve().parents[2] / "tools" / "seo_audit.py")
seo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(seo)

GOOD = """<html><head><title>AI Consulting and Automation in Uganda | Flame Connect</title>
<meta name="description" content="Practical AI readiness, workflow automation and custom business tools for organisations across Africa.">
<link rel="canonical" href="https://www.flameconnect.tech/x"><meta property="og:image" content="/opengraph-image"></head>
<body><h1>One heading</h1></body></html>"""


class Res:
    def __init__(self, status, text="", headers=None):
        self.status_code, self.text, self.headers = status, text, headers or {}


class Session:
    def __init__(self, page, img_status=200, headers=None):
        self.page, self.img_status, self.headers = page, img_status, headers

    def get(self, url, **_):
        if url.endswith("/opengraph-image"):
            return Res(self.img_status, headers={"content-type": "image/png"})
        return Res(200, self.page, self.headers)


def test_good_page_passes():
    assert seo.check("https://www.flameconnect.tech/x", Session(GOOD), False) == []


def test_flags_problems():
    bad = GOOD.replace("<h1>One heading</h1>", "").replace('rel="canonical"', 'rel="other"')
    issues = seo.check("https://www.flameconnect.tech/x", Session(bad, img_status=404, headers={"x-robots-tag": "noindex"}), False)
    assert {"0 h1 tags", "no canonical", "og:image 404", "noindex"} <= set(issues)


def test_noindex_allowed_on_staging():
    assert seo.check("https://staging.flameconnect.tech/x", Session(GOOD, headers={"x-robots-tag": "noindex"}), True) == []
