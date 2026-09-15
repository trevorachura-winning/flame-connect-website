# Changelog

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
