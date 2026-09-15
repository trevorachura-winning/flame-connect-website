# Security review — 2026-09-15 (v0.1.3)

Scope: codebase audit + dependency scan of the Next.js website. Live-site HTTP
checks run via OWASP ZAP baseline (`.github/workflows/security.yml`, weekly +
on demand). Test only infrastructure you own.

## Findings and resolutions

| # | Area | Assessment | Action |
|---|---|---|---|
| 1 | Dependencies | `npm audit` flagged 2 PostCSS advisories (moderate/high) via the Next.js build toolchain. Build-time only (no user-controlled CSS, no `.map` serving), but fixed cleanly | ✅ `overrides.postcss ^8.5.6` → **0 vulnerabilities** (CI `npm ci` enforces the lockfile) |
| 2 | Lead API (`app/api/lead/route.ts`) | Sound baseline: per-IP rate limiting (5/min, in-memory), 16KB body cap, JSON parse guard, honeypot, intent allowlist, field-length caps, consent required, no reflection of user input in responses, free text never logged, 405 on GET | ✅ Rate-limit key now prefers `x-real-ip` (Vercel-set) over client-spoofable first `x-forwarded-for` hop |
| 3 | JSON-LD (`components/JsonLd.tsx`) | Static trusted content only, but an early `</script>` could theoretically break out of the tag | ✅ `<` escaped to `\u003c` before injection (defense-in-depth) |
| 4 | Security headers (`next.config.mjs`) | `nosniff`, `Referrer-Policy`, `Permissions-Policy`, CSP `frame-ancestors` allowlist (Arena/E2B preview + self). XFO intentionally dropped (CSP supersedes in modern browsers) | Keep. Optional future: full CSP with nonces; HSTS automatic on `vercel.app`, verify when attaching custom domain |
| 5 | Secrets hygiene | No `.env` in repo; `.env.example` placeholders only; `NEXT_PUBLIC_*` vars are non-secret by design | ✅ verified clean |
| 6 | Dangerous sinks | single `dangerouslySetInnerHTML` (item 3, hardened); no `eval`, no DOM APIs; content registry has no `</script>` payloads | ✅ verified clean |
| 7 | Data exposure | sitemap/robots expose public routes only; OG/icon routes read local files; Portals page is demo-mode until Supabase migrations run | ✅ as designed |

## Documented limitations (by design)

- Rate limit is per serverless instance; a motivated attacker rotating
  instances can exceed it. Acceptable at marketing volume; upgrade path is
  Upstash/edge KV when lead volume grows.
- No full Content-Security-Policy yet: Next.js inline runtime needs nonces;
  frame-ancestors + nosniff + strict referrer covers this static marketing
  surface. Revisit when app surfaces (dashboards) move in.
- The lead webhook URL is env-controlled (not user-controlled) so no SSRF
  surface exists from the endpoint.

## How to re-run this review

```powershell
npm audit            # dependency advisories (expect: 0 vulnerabilities)
npm run validate     # content + link + type + build gates
npm run build        # full production build
```

Plus the automated weekly ZAP baseline in the Actions tab ("Security baseline").
