# Flame Connect Corporate Website — Deployment Runbook

**Release decision (18 Nov 2026):** Website-only public point of sale. No sign-in, accounts, CRM/backend, server-side contact form or direct platform-launch URLs. Products are explained under `/products` and keep their approved statuses. Enquiries open the visitor's mail or WhatsApp application; the visitor must press Send there.

## Hosting and canonical domain
- Production domain: **https://www.flameconnect.tech**. The apex `https://flameconnect.tech` redirects to www.
- Set `NEXT_PUBLIC_SITE_URL=https://www.flameconnect.tech` for **Production and Preview** in Vercel Project Settings → Environment Variables.
- Public `NEXT_PUBLIC_*` values are baked into the Next.js build. Changes require a **redeployment**, not a server restart.
- `lib/site.ts` supplies the www fallback and normalizes the former apex domain value; always confirm Vercel's actual environment settings.
- `main` is the Git production branch, with Vercel automatic deployment on merge. Confirm team, project, source SHA, and READY state before accepting release.

## Scheduled Coming Soon launch gate
- Current marketing launch gate: `middleware.ts` rewrites the two production hostnames to `public/coming-soon/index.html` **until 20 November 2026 at 12:00 EAT** (09:00 UTC).
- Preview `*.vercel.app` and localhost are not gated, so the full site remains available for QA before launch.
- The countdown page contains the same launch timestamp and reloads when the gate opens.
- **This is automatic**: the current `main` website becomes public at the stated time. To delay launch, update both `middleware.ts` and the page countdown in a reviewed PR before that time.
- While the gate is active, even old `/sign-in` and `/api/lead` paths show Coming Soon; their redirect/404 behavior can be verified only on an ungated preview or after launch.
- Keep the existing full Flame Connect logo and cinematic tech-line assets. The public Coming Soon page includes direct email/WhatsApp contact actions.

## Launch line-up
- The current product registry lists **Flame OS** and **Flame Academy**, both marked `Launching soon`.
- Friday's release is the corporate website, **not** proof that those two products have launched. Their CTAs remain on-site enquiries.
- Services and product descriptions must not promise functionality not yet shipped.

## Contact conversion
- Email: **flameconnect1@gmail.com**
- WhatsApp: **+256 764 018701**, click-to-chat `https://wa.me/256764018701`
- `components/EnquiryComposer.tsx` validates an enquiry in the browser, then opens pre-filled `mailto:` or `wa.me` links via `lib/links.ts`.
- There is **no server-side delivery guarantee**. Visitors complete Send in their own app.
- Test both channels on desktop and mobile. Don't ask visitors to send passwords or sensitive information.
- After the gate opens, `/api/lead` must return **404** and `/sign-in` must redirect to `/products`.

## Active configuration
- `NEXT_PUBLIC_SITE_URL`: required for explicit canonical production identity.
- `NEXT_PUBLIC_ANALYTICS_ID`: optional, only if approved; review consent/privacy implications.

## Legacy variables
The website-only code does **not use**:
- `NEXT_PUBLIC_FLAME_SALES_URL`
- `NEXT_PUBLIC_FLAME_OS_URL`
- `NEXT_PUBLIC_FLAME_SALES_SIGNIN_PATH`
- `LEAD_WEBHOOK_URL`
- `LEAD_NOTIFICATION_EMAIL`

**Do not delete any Vercel variables without direct Product Owner authorization.** The separate product/SaaS repositories are not affected by this website release.

## Release gates
1. Verify `main` HEAD and target PR files. Preserve the current approved cursor and tech-line design; keep unfinished assessment work separate.
2. GitHub CI must pass `npm run content:check`, `npm run links:check`, `npm run test:marketing`, `npm run typecheck` and `npm run build`.
3. Review Vercel preview with real browser at 320/375/390/768/1024/1440 px, with keyboard, touch and reduced motion; no horizontal overflow or console errors.
4. Confirm page conversion buttons resolve to working email/WhatsApp destinations and product statuses remain accurate.
5. Merge only after Product Owner approval. Vercel may deploy `main` automatically; check the resulting deployment ID and READY status.
6. Check the live **www** site: page canonical and `og:url`, `/robots.txt`, `/sitemap.xml`, Open Graph image URL, working `/contact`, redirect from `/sign-in`, 404 from `/api/lead`, no sign-in copy, footer and 375px mobile overflow, console.
7. Record PR number, merged SHA, deployment ID, test evidence and release blockers.

## Browser acceptance (mandatory, still outstanding)
- Confirm at widths **320, 375, 390, 768, 1024, 1440 px** using a real browser. Inspect header, countdown, contact CTAs, product pages, footer, mobile drawer and both form handoffs.
- Test keyboard and screen-reader labels, reduced-motion and touch/coarse pointer, console errors and horizontal overflow. CI source tests are not browser proof.
- Test email and WhatsApp destinations on an actual device; the website cannot establish whether external messages were sent.
- Confirm official logo and no missing image/font/video assets.

## Rollback
- When the latest production deployment breaks, use Vercel **Instant Rollback** to the previous verified READY production deployment.
- Do not claim rollback is possible from a connector that does not expose the target project.
- Earlier user-supplied rollback candidate: `dpl_5kbFc3vToZHw9dSmN9HrbUZ9hmkD`; independently confirm it is still the appropriate previous READY deployment before using it.
- After rollback, re-run critical live checks and document recovery.
