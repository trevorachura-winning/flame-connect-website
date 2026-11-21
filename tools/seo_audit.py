"""Check every page in a live sitemap for the basics of search and sharing.

Usage:
    python tools/seo_audit.py                                   # www.flameconnect.tech
    python tools/seo_audit.py --base https://staging.flameconnect.tech --allow-noindex

Checks per page: HTTP 200, one <h1>, title 30 to 65 characters, meta
description 70 to 160 characters, canonical URL, Open Graph image that loads,
and no noindex (unless --allow-noindex, for staging).
"""

from __future__ import annotations

import argparse
import re
import sys
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

try:
    import requests
except ImportError:  # pragma: no cover
    sys.exit("Install requests first: pip install -r tools/requirements.txt")

UA = {"User-Agent": "FlameConnectSEOAudit/1.0 (+https://www.flameconnect.tech)"}


class Head(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta, self.links, self.h1, self.title, self._in_title = {}, {}, 0, "", False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "meta":
            key = a.get("property") or a.get("name")
            if key and "content" in a:
                self.meta.setdefault(key.lower(), a["content"])
        elif tag == "link" and a.get("rel") and a.get("href"):
            self.links.setdefault(a["rel"].lower(), a["href"])
        elif tag == "h1":
            self.h1 += 1
        elif tag == "title":
            self._in_title = True

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data


def check(url: str, session: requests.Session, allow_noindex: bool) -> list[str]:
    r = session.get(url, headers=UA, timeout=20)
    if r.status_code != 200:
        return [f"status {r.status_code}"]
    p = Head()
    p.feed(r.text)
    issues = []
    t = p.title.strip()
    if not 30 <= len(t) <= 65:
        issues.append(f"title {len(t)} chars")
    d = p.meta.get("description", "")
    if not 70 <= len(d) <= 160:
        issues.append(f"description {len(d)} chars")
    if p.h1 != 1:
        issues.append(f"{p.h1} h1 tags")
    if "canonical" not in p.links:
        issues.append("no canonical")
    og = p.meta.get("og:image")
    if not og:
        issues.append("no og:image")
    else:
        img = session.get(urljoin(url, og), headers=UA, timeout=20)
        if img.status_code != 200 or not img.headers.get("content-type", "").startswith("image/"):
            issues.append(f"og:image {img.status_code}")
    robots = (r.headers.get("x-robots-tag", "") + " " + p.meta.get("robots", "")).lower()
    if "noindex" in robots and not allow_noindex:
        issues.append("noindex")
    return issues


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--base", default="https://www.flameconnect.tech")
    ap.add_argument("--allow-noindex", action="store_true", help="expected on staging")
    args = ap.parse_args()

    s = requests.Session()
    xml = s.get(args.base.rstrip("/") + "/sitemap.xml", headers=UA, timeout=20).text
    base_host = urlparse(args.base).netloc
    urls = [urlparse(u)._replace(netloc=base_host).geturl() for u in re.findall(r"<loc>([^<]+)</loc>", xml)]
    failures = 0
    for u in urls:
        issues = check(u, s, args.allow_noindex)
        failures += bool(issues)
        print(f"{'!' if issues else ' '} {urlparse(u).path or '/':<52} {'; '.join(issues) or 'ok'}")
    print(f"\n{len(urls)} pages checked, {failures} with issues.")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
