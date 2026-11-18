# Claude Code — Flame Connect Corporate Website Polish
**Date:** 18 Nov 2026 | **Role:** Principal Software Architect & Marketing Experience Lead  
**Repo:** `https://github.com/trevorachura-winning/flame-connect-website`  
**Goal:** Polish the existing Next.js/Vercel corporate marketing experience; do NOT build or alter the Flame Sales AI SaaS in `flame-connect-salesos-ai`.

## Read FIRST
1. Verify latest `main` SHA, clean status, open PRs and branches. Previous observed `main` was `5ea57733...`, v0.3.1; it is not an assumed current base.
2. Read `README.md`, `package.json`, `CHANGELOG.md`, `docs/BRAND.md`, `docs/DEPLOYMENT.md`, `docs/CONTENT_MODEL.md`, `docs/CLAIMS_AND_GOVERNANCE.md`, `content/products.ts`, `lib/links.ts`, and the new `docs/FLAME_CONNECT_WEBSITE_REVAMP_MASTER_BRIEF_2026-11-18.md`.
3. Read `AGENTS.md` and `docs/BUILD_STATUS.md` **if they exist** (not present at initial audit). Inspect historical v0.4.0 patch only if found; do not blindly land it.
4. Give a brief verified baseline, page-level UX critique and file-scoped plan before writing.

## Team and ownership
The founder is Product Owner and **sole merge/deploy authority**. ChatGPT/Codex is Lead Full-Stack Engineer working in parallel on product/status links, contact/lead delivery, SEO infrastructure, shared layout/navigation/tokens, performance/security checks, integration QA and Vercel/domain readiness. Copilot assists review.

**Your exclusive page scope:**
- `app/page.tsx` — premium home / first-fold conversion / storytelling.
- `app/about/**` — Uganda-rooted company narrative and credibility.
- `app/services/**` — existing three service lines, clear challenge-to-outcome explanation.
- `app/resources/**` — readable, searchable-feeling resource layout and editorial UX.
- `content/home.ts`, `content/services.ts`, `content/articles.ts` — truthful sourced content only.
- **New** `components/marketing/**`, locally scoped CSS modules `styles/marketing/**`; focused page-level tests.

**Do not edit without explicit reassignment:** `app/layout.tsx`, `app/globals.css`, `components/BrandLogo.tsx`, nav/footer, `lib/links.ts`, `lib/site.ts`, `content/products.ts`, product/Flame OS/Trust/Contact/API routes, `.env.example`, `package.json`, build/deployment config, GitHub workflows or shared SEO modules. Put requested changes for Codex in PR notes.

## Brand / content rules
- Brand: **Flame Connect — AI Centre of Change**, promise **Practical AI for African progress.**, signature **Digitizing Africa.**
- Orange `#F4511E`, dark navy `#07111F`, ink `#111827`, blue `#153A8A`, light blue `#EAF2FF`. Montserrat headings; Poppins body. Existing official logo only.
- Apple-level craft and African corporate authenticity; no generic neon gradients, fake team portraits, unlicensed imagery, fabricated customers, invented metrics or statuses. Existing AA-safe orange rules must remain.
- Maintain semantic markup, visible keyboard focus, logical headings, optimized imagery, 44px touch target goals, responsive 320–1440px, low-bandwidth support and `prefers-reduced-motion`.
- Service pillars: **Digital & Communications; AI in Business; Consulting & Thought Leadership.** Preserve approved status vocabulary and valid routes.
- Narrative: problem → practical change → method **Assess. Learn. Improve. Implement.** → credible examples → consultation CTA.
- Avoid changing product claims: Flame Sales AI is separate and pivoting; Lens/Ready/Academy etc. stay whatever the verified registry and Product Owner confirm, not assumed live.

## Safe execution
```powershell
git clone https://github.com/trevorachura-winning/flame-connect-website.git
cd flame-connect-website
git fetch origin
git switch main
git pull --ff-only origin main
git switch -c feat/claude-marketing-polish-20261118
npm ci
npm run dev
```
If already cloned, open that folder and start at `git fetch origin`. Preserve dirty local changes. If branch name exists use a new suffix. Never commit credentials. Never push main.

## Scope of deliverable
1. Audited before/after improvement plan for Home, About, Services and Resources.
2. Implemented polished responsive pages and scoped reusable components.
3. Do not alter navigation/global CSS or integrations; send exact recommendations to Codex.
4. Run `npm run content:check`, `npm run links:check`, `npm run typecheck`, `npm run build` and relevant focused UI checks; report real results. Platform network checks may be inconclusive.
5. Collect 1440/768/390/320 screenshots, keyboard, reduced-motion and overflow evidence.
6. Open reviewable **feature PR**, not production deployment. PR must list current base SHA, all touched files, changes, screens, command outputs, content/imagery pending owner approval, failed/blocked checks and proposed shared changes.

**Strict gate:** Do not merge, deploy, attach domain, change DNS or change product statuses. The founder authorizes every production release.

**Start now:** inspect the repo and share audit + exact files; then implement within this bounded marketing workstream and prepare the PR. The full downloadable Word implementation brief is available from the project chat; this markdown file is the persistent repo-level Claude instruction.
