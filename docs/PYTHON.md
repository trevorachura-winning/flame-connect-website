# Python in the Flame Connect website repository

Python sits beside the Next.js site in three clearly separated places.

| Folder | What it is | Deployed? |
|---|---|---|
| `python/flame_core/` | Shared Python core. Assessment scoring that mirrors `content/assessment.ts`. | Bundled into the Vercel functions |
| `api/py/` | Live Python functions on Vercel | Yes, with the website |
| `tools/` | Behind-the-scenes scripts (image and SEO audits) | No |
| `services/flame-api/` | FastAPI service, starting point for future Flame OS and Flame Academy back-end work | No, hosted separately when needed |

## 1. Live API on the website (Vercel)

- `GET /api/py/health` confirms the Python runtime is serving.
- `POST /api/py/assessment` with `{"answers": {"q1": 1-4, ..., "q12": 1-4}}` returns the same AI readiness result the site shows in the browser. It stores nothing.

Functions use only the Python standard library, so no `requirements.txt` sits at the repository root. `vercel.json` bundles `python/**` with them. The website itself does not call these endpoints yet.

## 2. One source of truth for the assessment

Questions, pillars and score bands live in `content/assessment.ts`. After changing them run:

```
node scripts/export-assessment.mjs
```

It regenerates `python/flame_core/assessment_data.json` and the parity fixtures. Tests fail if the Python data is stale or if Python and TypeScript ever score differently.

## 3. Tools (never deployed)

```
pip install -r tools/requirements.txt
python tools/image_audit.py                # flag heavy or oversized images in public/
python tools/image_audit.py --write-webp out/   # optimised copies to review; public/ is untouched
python tools/seo_audit.py                  # titles, descriptions, h1, canonical, og:image, noindex
python tools/seo_audit.py --base https://staging.flameconnect.tech --allow-noindex
```

## 4. FastAPI service

```
pip install -r services/flame-api/requirements-dev.txt
uvicorn app.main:app --reload --app-dir services/flame-api   # http://127.0.0.1:8000/docs
docker build -f services/flame-api/Dockerfile -t flame-api .  # from the repository root
```

Allowed browser origins come from `ALLOWED_ORIGINS` (defaults to www and staging). Hosting is not chosen yet.

## Tests

```
python -m pytest -q tests/python services/flame-api/tests
```

CI runs these in a separate `python` job (about one minute per pull request).
