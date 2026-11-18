# Flame Connect — Website Revamp & Domain Launch (Master Brief)
**Version:** 1.0 / 18 November 2026  
**Status:** Planned; not yet approved for production deployment  
**Product Owner:** Founder | **Repo:** `trevorachura-winning/flame-connect-website`

## Intent
Polish the existing corporate website into a premium, Uganda-rooted and Africa-focused company presence: credible AI/digital services, accessible product gateway, clear discovery conversion, authentic resources, clean SEO and operational lead capture. **Preserve the current Next.js/React/TypeScript codebase and keep Vercel hosting.** Do not rebuild from scratch.

**Company vs product:** Flame Connect is the **AI Centre of Change**. Flame Sales AI is a separate SaaS product (African CRM/sales automation platform benchmarked against ActiveCampaign) in `trevorachura-winning/flame-connect-salesos-ai`, with its separate Neon architecture. Never mix the SaaS repo/database into the corporate website.

## Current source baseline (verified 18 Nov 2026)
- Public repo accessible via GitHub; main commit last observed: `5ea57733e10449ebd7127136619acba872371cbf` (16 Sep); `package.json` version 0.3.1, Next.js 15/React 19/TypeScript. Recheck before work.
- Key pages already built: Home, Services, Products, Flame OS, Community, Resources, About, Trust, Contact and Privacy, plus sub-pages.
- Existing gates: `npm run content:check`, `npm run links:check`, `npm run typecheck`, `npm run build`, `npm run platform:check`.
- Historical September handoff describes unlanded 0.4.0 alignment patch. Treat as historical, not current evidence; inspect if it still exists.
- Vercel: deployment references exist in repo, but the connected Vercel account **did not expose this project** during this audit. GitHub access does not imply Vercel project/domain connected.
- New domain has been purchased but exact canonical hostname, Vercel project attachment, DNS and TLS are **unverified**. Earlier suggestion `flameconnect.tech` is not proof of purchase.
- Current `lib/site.ts` fallback `https://flameconnect.org` is not ownership evidence; override with the real verified canonical domain via `NEXT_PUBLIC_SITE_URL`.

## Official brand
- Positioning: **AI Centre of Change**; promise: **Practical AI for African progress.**; master-logo signature: **Digitizing Africa.**
- Palette: Flame Orange `#F4511E`, Deep Navy `#07111F`, Ink `#111827`, Blue `#153A8A`, Light Blue `#EAF2FF`, White and Slate.
- Montserrat headings and Poppins body. Use original logo assets in `public/brand/`; never redraw or recolor.
- Premium Apple-level restraint: intentional whitespace, excellent typography, true African business imagery, precise CTAs, restrained motion, WCAG 2.2 AA, reduced-motion, responsive from 320px.
- Existing `docs/BRAND.md` documents accessible orange variants; preserve those.

## Launch scope (by page)
1. **Home:** sharpen message and first fold, credible services/products pathways, method, Africa-first proof and one primary discovery CTA.
2. **Services:** preserve Digital & Communications; AI in Business; Consulting & Thought Leadership; clarify business problem → delivery → realistic outcomes → CTA.
3. **Products + Flame OS:** clear honest product-status gates; only verified app destinations and sign-in paths; no invented product availability.
4. **About + Resources + Community:** authentic story and sourced editorial content; approved team/client facts only; real participation routes.
5. **Trust + Contact:** responsible AI and verifiable status; contact form must actually deliver inquiries to a monitored owner; review privacy/consent.
6. **Global:** navigation, footer, metadata/sitemap, performance, mobile, accessibility, error states, official domain and analytics.

## Critical technical contracts
- `POST /api/lead` currently needs a verified **durable/monitored** delivery destination: when `LEAD_WEBHOOK_URL` is missing, validated submissions may only log metadata. Treat real lead delivery as P0; secure the integration and test receipt from the live site.
- `NEXT_PUBLIC_FLAME_SALES_URL` refers to the Sales app only, with separately verified auth path.
- **Never** point `NEXT_PUBLIC_FLAME_OS_URL` at the Sales product; it is the shared-layer URL and can misroute other products.
- Product-status vocabulary remains `live | pilot | development` and is changed only with Product Owner-approved evidence.
- Set `NEXT_PUBLIC_SITE_URL` to confirmed production hostname at build time, then redeploy; verify canonical, Open Graph, robots/sitemap and TLS.
- Do not invent client logos, team members, outcomes, certifications, statistics, contacts or social handles.

## Parallel ownership / file collision contract
**Claude Code: Principal Software Architect & Marketing Experience Lead** owns `app/page.tsx`, `app/about/**`, `app/services/**`, `app/resources/**`, relevant `content/home.ts`, `content/services.ts`, `content/articles.ts` and **new scoped** `components/marketing/**` or `styles/marketing/**`. Audit, architect, design and implement these pages on a dedicated branch/PR.

**ChatGPT/Codex: Lead Full-Stack Engineer & Release Readiness** owns `app/products/**`, `app/flame-os/**`, `app/trust/**`, `app/contact/**`, `app/api/lead/**`, `lib/site.ts`, `lib/links.ts`, shared header/footer/layout/global CSS, SEO plumbing, tests, security, performance and Vercel/domain checks. Use separate branch/PR. Copilot supports independent QA. The founder alone approves merge, domain routing and deployment.

Claude MUST NOT modify `app/layout.tsx`, `app/globals.css`, `lib/site.ts`, `lib/links.ts`, product content, contact/API routes, dependencies or Vercel config without prior allocation. Propose shared changes in the handoff instead.

## Launch gates
**Source:** recheck main/open PRs/0.4.0 and branch clean. **Function:** no broken CTA, actual lead receipt, accurate statuses. **Build:** content, links, typecheck, build, platform check (accurately record blocked/inconclusive). **Experience:** 1440/768/390/320 viewport QA, keyboard/reduced-motion/contrast, real performance measurements. **Content:** claims, identity, privacy, approved imagery. **Release:** Product Owner signs off preview, authorizes merge/deploy; Vercel production/canonical domain/TLS/redirects and live form are verified; rollback recorded. Never claim checks passed if not executed.

**Priority:** verify Vercel access; validate leads; refresh visual polish; reconcile product links; verify exact domain/DNS; independent QA; only then owner-approved deployment.

## Status note
This is the repo-held coordination brief. An extended editable Word project brief was also prepared in the project chat. The branch containing this document is **documentation-only** and must not be merged without the Product Owner's approval.
