"""Find images in public/ that are heavier or larger than they need to be.

Usage:
    python tools/image_audit.py                 # report only
    python tools/image_audit.py --max-kb 300 --max-px 1800
    python tools/image_audit.py --write-webp out/  # write optimised WebP copies for review

Never changes files in public/; optimised copies go to the folder you name.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    sys.exit("Install Pillow first: pip install -r tools/requirements.txt")

ROOT = Path(__file__).resolve().parents[1]
EXTS = {".jpg", ".jpeg", ".png", ".webp"}


def audit(max_kb: int, max_px: int) -> list[dict]:
    rows = []
    for path in sorted((ROOT / "public").rglob("*")):
        if path.suffix.lower() not in EXTS:
            continue
        kb = path.stat().st_size / 1024
        with Image.open(path) as im:
            w, h = im.size
        issues = []
        if kb > max_kb:
            issues.append(f"{kb:.0f} KB > {max_kb} KB")
        if max(w, h) > max_px:
            issues.append(f"{w}x{h} > {max_px}px")
        rows.append({"path": path.relative_to(ROOT).as_posix(), "kb": round(kb), "size": f"{w}x{h}", "issues": issues})
    return rows


def write_webp(rows: list[dict], out: Path, max_px: int) -> None:
    out.mkdir(parents=True, exist_ok=True)
    for r in rows:
        if not r["issues"]:
            continue
        src = ROOT / r["path"]
        with Image.open(src) as im:
            im.thumbnail((max_px, max_px))
            dest = out / (src.stem + ".webp")
            im.save(dest, "WEBP", quality=82, method=6)
        print(f"  wrote {dest} ({dest.stat().st_size // 1024} KB)")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--max-kb", type=int, default=400)
    ap.add_argument("--max-px", type=int, default=2000)
    ap.add_argument("--write-webp", type=Path, help="folder for optimised copies (public/ is never changed)")
    args = ap.parse_args()

    rows = audit(args.max_kb, args.max_px)
    flagged = [r for r in rows if r["issues"]]
    for r in rows:
        mark = "!" if r["issues"] else " "
        print(f"{mark} {r['path']:<55} {r['kb']:>6} KB  {r['size']:>10}  {'; '.join(r['issues'])}")
    print(f"\n{len(rows)} images checked, {len(flagged)} to review.")
    if args.write_webp:
        write_webp(rows, args.write_webp, args.max_px)
    return 1 if flagged else 0


if __name__ == "__main__":
    sys.exit(main())
