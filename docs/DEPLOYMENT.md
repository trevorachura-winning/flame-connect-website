# Deployment & launch runbook

## Environments

| Stage | Purpose | Required configuration |
|---|---|---|
| Local | Development | none (site runs fully with fallbacks) |
| Preview | PR review | `NEXT_PUBLIC_SITE_URL` |
| Production | Public site | all confirmed Appendix C values |

Recommended hosting: Vercel, matching the brief's technical direction. The site is
statically rendered except `/contact` (search params) and `POST /api/lead`.

## Environment variables

See `.env.example` (names only, never values):

- `NEXT_PUBLIC_SITE_URL` — canonical/origin for metadata, sitemap, OG.
- `NEXT_PUBLIC_FLAME_OS_URL` — **the switch that makes product CTAs go live.**
  Until set, CTAs resolve to the on-site access route and the Trust board shows
  the platform as "in validation". Set this only when the Flame OS deployment has
  passed its own readiness gates (see the platform repository's
  `docs/PLATFORM_STATUS.md`).
- `LEAD_WEBHOOK_URL` — form delivery target (CRM/lead inbox automation). Without
  it, submissions are validated and recorded server-side (metadata only).
- `LEAD_NOTIFICATION_EMAIL` — reserved for direct notification wiring.
- `NEXT_PUBLIC_ANALYTICS_ID` — analytics measurement ID. Without it, no
  third-party analytics script is loaded at all.

## Pre-launch checklist (from the brief's Appendix C)

- [ ] Legal/company name → `lib/site.ts` `legalName` (footer + JSON-LD update automatically)
- [ ] Official domain → `NEXT_PUBLIC_SITE_URL` (sitemap, canonical, OG)
- [ ] Flame OS/app domain → `NEXT_PUBLIC_FLAME_OS_URL`
- [ ] Direct email / phone / WhatsApp → `lib/site.ts` contact fields
- [ ] Approved social accounts → `lib/site.ts` `social`
- [ ] Team list & bios approved → replace the honest pending block on `/about`
- [ ] Case studies with verified metrics & written approval → publish via `content/articles.ts` (category `Research`) or a dedicated case-study flow
- [ ] Privacy notice formal legal review → bump version on `/privacy`
- [ ] Product statuses re-confirmed against the platform repository's status doc
- [ ] `npm run content:check`, `npm run links:check`, `npm run build` green
- [ ] Device sweep: 320/375/414/768/1024/1440, keyboard-only, reduced-motion, slow-network
- [ ] Flame OS launch CTAs verified in production after `NEXT_PUBLIC_FLAME_OS_URL` is set

## Release discipline

1. All changes through PRs against `main`; CI must pass.
2. Status changes are content changes — same review bar.
3. The Trust page status board is the public source of truth; it must never lag
   reality in the optimistic direction.
4. Rollback: every deploy is a static snapshot; redeploy the previous one.
