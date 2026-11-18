# Flame Connect Website

The corporate website for **Flame Connect — AI Centre of Change**.

> **Digitize Africa.**

Built from the Flame Connect comprehensive website brief (14 September 2026): corporate
positioning + services + products + Flame OS + community + resources + trust, designed
access-first for Uganda, East Africa and wider African markets.

## What this repository contains

A [Next.js](https://nextjs.org) App Router site, statically rendered wherever honesty
allows it, with the full public surface of the company:

| Surface | Route | Notes |
|---|---|---|
| Home | `/` | Positioning, pillars, approach, Flame OS, product family, Africa-first, community, insights |
| Products | `/products` + 7 detail pages | Honest status badges: **Live · Pilot · In development** |
| Services | `/services` + 3 detail pages | Digital & Communications · AI in Business · Consulting & Thought Leadership |
| Flame OS | `/flame-os` | Platform story, capability blocks, labelled concept UI, ambient loop |
| Community | `/community` | Tools Lab · Playbooks · Practice Lab · Flame Academy, principles, join route |
| Resources | `/resources` + articles | Insights · Playbooks · Research · Field notes with an explicit editorial standard |
| About | `/about` | Story, mission/vision, principles, honest team-pending block |
| Trust | `/trust` | Responsible AI commitments, security/privacy/accessibility, **public product status board** |
| Contact | `/contact` | Enquiry composer that opens a prefilled email or WhatsApp message — no server, no stored data |
| Privacy | `/privacy` | Plain-language notice, flagged pending legal review |

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Validation (the same gates CI runs):

```bash
npm run content:check   # content integrity + claim discipline
npm run links:check     # every internal href resolves to a route
npm run test:marketing  # claim discipline, routes, website-only rules
npm run typecheck
npm run build
```

## Design principles wired into the code

- **Website only — the point of sale.** No sign-in, no accounts, no backend and
  no links into the Flame platforms (Nov 2026 Product Owner decision). The tools
  are presented under Products; every product action is an on-site enquiry
  (`lib/links.ts`). Enquiries leave via the visitor's own email or WhatsApp,
  prefilled by `components/EnquiryComposer.tsx`. Set the public contact details
  in `lib/site.ts` (`contactEmail`, `contactWhatsApp`) before launch.
- **Never an invented fact.** Contact details, legal name, team members, case-study
  metrics and social handles that the brief marks "pending confirmation" render as
  honest pending states rather than plausible-looking fabrications (`lib/site.ts`).
- **Claim discipline in CI.** Banned overclaim phrases fail the build
  (`lib/content.ts` + `scripts/check-content.mjs`).
- **Access-first.** WCAG 2.2 AA target, mobile-first from 320px, reduced-motion
  honoured everywhere, compressed responsive imagery, ~140KB ambient video with
  `preload="none"`, no autoplay-by-default third-party scripts.
- **Restrained motion.** Scroll reveals and hover states only; everything is static
  under `prefers-reduced-motion`.

## Environment contract

See `.env.example`. Names only — values are never committed. Only
`NEXT_PUBLIC_SITE_URL` (canonical domain) and the optional analytics ID are read;
without them the site still runs fully.

## Documentation

- [`docs/CONTENT_MODEL.md`](docs/CONTENT_MODEL.md) — the editor-friendly content registry
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — environments, pre-launch gates, Appendix C checklist
- [`docs/CLAIMS_AND_GOVERNANCE.md`](docs/CLAIMS_AND_GOVERNANCE.md) — how claims and statuses are governed
- [`CHANGELOG.md`](CHANGELOG.md)

## License status

Source-visible but **no license selected yet**, matching the platform repository's
documented decision process. Do not describe this project as open source until a
canonical `LICENSE` file is committed.

## Brand

Visual system follows the official **Flame Connect — Brand Snapshot**: Flame
Orange `#F4511E`, Deep Navy `#07111F`, Ink Navy `#111827`, Light Blue `#EAF2FF`,
White, Slate `#374151`; Montserrat/Poppins; dark/light rhythm with orange
keylines. AA-safe interaction tones and the logo recreation are documented in
[`docs/BRAND.md`](docs/BRAND.md).
