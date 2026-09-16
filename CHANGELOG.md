# Changelog

## 0.3.0 — 2026-09-16

**Flame Sales platform wired into "Sign in".** The platform is deployed at
`https://flame-connect-salesos-ai.vercel.app`; header and drawer Sign in now go
there instead of the on-site fallback page. Resolves the Appendix C item
"product/app domain" for Flame Sales specifically.

- **New `NEXT_PUBLIC_FLAME_SALES_URL`** — a *per-product* app origin, deliberately
  separate from `NEXT_PUBLIC_FLAME_OS_URL`. That existing variable also drives
  `productCtaHref()`, so pointing it at the Flame Sales deployment would have
  silently repointed the Flame Lens / Flame Ready / Flame Academy launch buttons
  at an app they do not belong to. Those keep their honest access-request
  fallback until they have deployments of their own.
- **New `NEXT_PUBLIC_FLAME_SALES_SIGNIN_PATH`** — the auth path appended to the
  origin, default `/login`. Configurable because auth routes differ by stack and
  the website build cannot verify the platform's own routes. Changing it needs no
  code change.
- **`signInHref()` precedence:** Flame Sales → Flame OS → on-site `/sign-in`.
  `flameOsAppHref()` now falls through to `signInHref()` instead of hardcoding
  `/sign-in`, so the generic "Sign in" buttons on the homepage and `/flame-os`
  land on the same live destination as the header rather than a fallback page.
  Verified: zero internal `/sign-in` hrefs remain on `/`, `/flame-os`,
  `/products`, `/about`, `/contact`.
- **`lib/site.ts` validates app URLs at build time** and throws on a malformed
  value (missing protocol, non-http scheme, bad sign-in path) instead of shipping
  a broken button. Matches the fail-loudly convention in `lib/content.ts`.
- **New gate `npm run platform:check`** (`scripts/check-platform-link.mjs`) —
  fetches the URLs the site actually renders and reports 404s. It loads
  `lib/site.ts` directly so it cannot drift from the config. Non-strict by
  default (a transient platform outage should not red the website build);
  `--strict` fails. Network-unreachable is reported as INCONCLUSIVE, never as a
  failure. Wired into CI as a step, with the env passed to the production build
  so URL shape is validated there too. Set `FLAME_SALES_URL` /
  `FLAME_SALES_SIGNIN_PATH` as repository Variables to activate it.
- **`/sign-in` fallback page made state-aware.** Its copy claimed "Sign-in opens
  when the platform does", which a working header link would have contradicted.
  It now switches headline, lede and primary action when a platform is
  configured, and lists both configured app domains.
- External sign-in anchors now carry `rel="noopener noreferrer"`.
- Docs: `.env.example` and `docs/DEPLOYMENT.md` document both variables, the
  build-time inlining caveat (a Vercel env change needs a **redeploy**, not a
  restart), the exact wiring steps, verification, and rollback.

Deliberately **not** changed: the Flame Sales product page still shows status
`pilot` with a "Request access" button resolving to the contact form. Relabelling
it to a launch CTA is a content/status decision under the release discipline
("status changes are content changes — same review bar"), so it is left for an
explicit call rather than implied by an env var.

## 0.2.0 — 2026-09-16

**UI craft pass — "clarity".** Same brand palette, same two typefaces, same
content and same dark/light rhythm. No copy changed, no routes added, no new
dependencies. This is a finish-and-motion pass across the shared design system,
so it applies to all 18 routes at once.

- **Whitespace & rhythm:** section padding opens up to `clamp(4.5rem, 9vw, 8rem)`
  (was ~6.5rem max); grid gaps 1.1rem → 1.5rem; section heads get more air below.
- **Typography:** display weights eased from 900 → 800/750/700 with tighter
  tracking (`-0.045em` on display-1) and `text-wrap: balance`; body moved to
  17px with a three-step ink ladder (`--ink` / `--ink-soft` / `--ink-faint`)
  instead of two. Headings read calmer at large sizes.
- **Surfaces & elevation:** flat 1px outlines replaced by hairline borders
  (`rgba(7,17,31,.075)`) plus a three-level layered shadow scale
  (`--shadow-1/2/3`). Radii stepped up (cards 20px, frames 28px, hero 36px).
- **Light Blue #EAF2FF is now an accent surface.** Large alternating sections
  use a whisper-cool `--paper-2: #f1f6fd` so full Light Blue stays reserved for
  chips, wells and table headers; `.section.panel-blue` restores the full tint
  where a section should read as a panel. Recorded in docs/BRAND.md.
- **Motion:** one signature easing curve (`cubic-bezier(.32,.72,0,1)`) and a
  four-step duration scale replace the mixed ad-hoc timings. Reveals now rise
  26px and settle with a blur-to-sharp — **on pointer devices only**, so mobile
  keeps a plain fade-and-rise (access-first / low-bandwidth principle).
- **New `Reveal` variants** (`up` / `left` / `right` / `scale` / `fade` / `none`)
  and a `blur={false}` opt-out used for large media; homepage splits now enter
  directionally and the hero cascades line by line.
- **New `Parallax` component** — rAF-throttled, IntersectionObserver-gated,
  ~±25px of travel on the hero media. Skipped entirely under
  `prefers-reduced-motion` and on touch/coarse-pointer devices.
- **Header:** 84px → 68px, condensing to 60px on scroll with the lockup scaling
  to 0.88. Translucency moved to `saturate(180%) blur(20px)`. Nav hover no
  longer paints a Light Blue pill; the active item keeps its flame keyline,
  which now scales in from the centre.
- **Micro-interactions:** buttons lift and glow (hover stays *darker* for AA —
  the feedback is motion, not a lighter fill), card icons spring, product glyphs
  tilt, image frames Ken-Burns on hover, chevrons travel, Flame OS progress bars
  sweep in with their section, ribbon dot pulses, social icons rise and fill.
- **Reduced motion** now also disables parallax, ambient glow drift and the bar
  sweep, in addition to the existing transition hard-stop.

Verified: content gate ✓ · link gate (27 routes) ✓ · typecheck ✓ · production
build ✓ (36/36 pages) · all 30 public URLs return 200 ✓.

## 0.1.4 — 2026-09-15

- Mobile hero fix: the "AI Centre of Change" badge card was clipped behind the
  hero image frame on small screens (CSS painting order — static card vs
  positioned frame). Card now stays positioned with z-index in the mobile
  breakpoint; overlap preserved, title fully visible.

## 0.1.3 — 2026-09-15

- Security review (see docs/SECURITY_REVIEW.md): pinned PostCSS to a patched
  release via npm overrides (npm audit now 0 vulnerabilities), hardened lead
  rate-limiting against spoofed x-forwarded-for (prefers Vercel-set
  x-real-ip), escaped `<` in JSON-LD injection, added weekly/on-demand OWASP
  ZAP baseline workflow for the live site.

## 0.1.2 — 2026-09-15

- Official tagline/vision set to **"Digitize Africa."** (founder-confirmed):
  hero headline, browser titles, manifest, OG share card and `SITE.tagline`.
- Legal company name set to **Flame Connect** (founder-confirmed): footer shows
  the name instead of the pending placeholder; Trust page updated.
- Appendix C remaining: official domains, contact email/phone/WhatsApp,
  analytics IDs.

## 0.1.1 — 2026-09-15

- **Official logo artwork integrated.** BrandLogo now composes the brand
  owner's supplied mark + wordmark (alpha-matted, trimmed); retired the
  interim vector reconstruction. Footer uses the sanctioned inverse wordmark
  (light circuit) on navy. Favicon and the OG share card now derive from the
  official mark. Canonical files live in `public/brand/` so future artwork
  swaps are a file replace (see docs/BRAND.md).
- Appendix C status: brand/logo assets resolved.

## 0.1.0 — 2026-09-14

First full public website build from the Flame Connect comprehensive website brief.

- Complete route surface: home, 7 product pages, 3 service pages, Flame OS,
  community, resources (6 published pieces), about, trust + product status board,
  contact, privacy, sign-in fallback, 404/error states.
- Content registry with build-time validation (unique slugs, cross-references,
  claim-discipline banned phrases, asset existence).
- Link gate verifying every internal href resolves to a route.
- Lead capture endpoint: server-side validation, honeypot, per-IP rate limiting,
  optional webhook delivery, free-text never logged.
- Flame OS ambient loop: procedurally rendered 9s seamless video (~140KB) with
  poster, in-view autoplay only, disabled under reduced-motion.
- Editorial imagery library rendered for: hero collaboration, digital &
  communications, AI workflow session, community learning, SME mobile work,
  roundtable, founder portrait, field operations, urban Kampala, trust review.
- Structured data: Organization, WebSite, BreadcrumbList, Article, FAQPage.
  Product schema intentionally omitted until launch status makes it accurate.
- CI: npm ci, content gate, link gate, typecheck, production build.

Known honest-pending items (mirroring the brief's Appendix C): legal company name,
direct contact points, approved social accounts, team list, client evidence,
product app domain. Each renders as an explicit pending state on the site.
