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
- `NEXT_PUBLIC_FLAME_OS_URL` — **the switch that makes product CTAs go live** for
  the *shared platform layer*. It drives the site-wide "Explore Flame OS" CTA and,
  via `productCtaHref()`, **every** product whose CTA kind is `try` or `access`
  (Flame Sales, Flame Academy, Flame Lens, Flame Ready). Do not point it at a
  single product's deployment — that repoints the other products' buttons at an
  app they do not belong to. Until set, those CTAs resolve to the on-site access
  route and the Trust board shows the platform as "in validation". Set this only
  when the Flame OS deployment has passed its own readiness gates (see the
  platform repository's `docs/PLATFORM_STATUS.md`).
- `NEXT_PUBLIC_FLAME_SALES_URL` — **the Flame Sales platform origin** (per-product,
  added Sept 2026). Drives header + drawer "Sign in" only, so wiring Flame Sales
  up cannot change any other product's CTA. Must be an absolute http(s) URL;
  `lib/site.ts` throws at build time on a malformed value rather than shipping a
  broken button.
- `NEXT_PUBLIC_FLAME_SALES_SIGNIN_PATH` — auth path appended to that origin for
  the "Sign in" link. **Defaults to `/login`.** Set to `/signin`, `/auth`, `/`
  etc. to match the platform's actual routing — configuration only, no code
  change. Verify with `npm run platform:check`.
- `LEAD_WEBHOOK_URL` — form delivery target (CRM/lead inbox automation). Without
  it, submissions are validated and recorded server-side (metadata only).
- `LEAD_NOTIFICATION_EMAIL` — reserved for direct notification wiring.
- `NEXT_PUBLIC_ANALYTICS_ID` — analytics measurement ID. Without it, no
  third-party analytics script is loaded at all.

## Wiring a deployed product app (Flame Sales)

Confirmed origin: `https://flame-connect-salesos-ai.vercel.app`

**`NEXT_PUBLIC_*` values are inlined at BUILD time.** Setting one in Vercel does
not take effect on a restart — it requires a redeploy, because most routes here
are statically prerendered and the link is baked into the emitted HTML.

1. Vercel → project → **Settings → Environment Variables**.
2. Add `NEXT_PUBLIC_FLAME_SALES_URL` = `https://flame-connect-salesos-ai.vercel.app`
   for Production (and Preview, if you want PR deploys to carry the link).
3. Add `NEXT_PUBLIC_FLAME_SALES_SIGNIN_PATH` **only if the platform's auth route
   is not `/login`.**
4. **Redeploy** (Deployments → latest → ⋯ → Redeploy). A new commit also works.
5. Verify on the deployed site: header "Sign in" is an external `<a>` pointing at
   the platform, and the mobile drawer's Sign in matches.
6. Run the gate from a machine with outbound network. It reads `.env.local`
   automatically, exactly like `next dev`:

   ```bash
   npm run platform:check              # warns, exits 0
   npm run platform:check -- --strict  # fails on a bad link
   ```

   Or override inline without a `.env.local`:

   ```bash
   NEXT_PUBLIC_FLAME_SALES_URL=https://flame-connect-salesos-ai.vercel.app \
     npm run platform:check
   ```

   It reports `INCONCLUSIVE` (not failure) when it cannot reach the host, so a
   sandbox or restricted runner never reds the build.

Local development: put the same values in `.env.local` (git-ignored) and restart
`npm run dev`.

### Rollback

Unset `NEXT_PUBLIC_FLAME_SALES_URL` and redeploy. `signInHref()` falls back to
the on-site `/sign-in` page, which renders honest "not yet live" copy — the same
state as before, with no dead button. Every deploy is a static snapshot, so
redeploying the previous one also works.

## Pre-launch checklist (from the brief's Appendix C)

- [ ] Legal/company name → `lib/site.ts` `legalName` (footer + JSON-LD update automatically)
- [ ] Official domain → `NEXT_PUBLIC_SITE_URL` (sitemap, canonical, OG)
- [x] Flame Sales app domain → `NEXT_PUBLIC_FLAME_SALES_URL` (confirmed Sept 2026:
      `https://flame-connect-salesos-ai.vercel.app`; drives header/drawer "Sign in")
- [ ] Flame Sales auth path confirmed → `NEXT_PUBLIC_FLAME_SALES_SIGNIN_PATH`
      if it is not `/login` — verify with `npm run platform:check`
- [ ] Shared Flame OS/app domain → `NEXT_PUBLIC_FLAME_OS_URL` (still pending; do
      not set it to the Flame Sales origin — see the note above)
- [ ] Direct email / phone / WhatsApp → `lib/site.ts` contact fields
- [ ] Approved social accounts → `lib/site.ts` `social`
- [ ] Team list & bios approved → replace the honest pending block on `/about`
- [ ] Case studies with verified metrics & written approval → publish via `content/articles.ts` (category `Research`) or a dedicated case-study flow
- [ ] Privacy notice formal legal review → bump version on `/privacy`
- [ ] Product statuses re-confirmed against the platform repository's status doc
- [ ] `npm run content:check`, `npm run links:check`, `npm run platform:check`, `npm run build` green
- [ ] Device sweep: 320/375/414/768/1024/1440, keyboard-only, reduced-motion, slow-network
- [ ] Flame OS launch CTAs verified in production after `NEXT_PUBLIC_FLAME_OS_URL` is set
- [ ] Flame Sales "Sign in" verified in production (header + mobile drawer land on a
      real auth screen, not a 404) after `NEXT_PUBLIC_FLAME_SALES_URL` is set

## Release discipline

1. All changes through PRs against `main`; CI must pass.
2. Status changes are content changes — same review bar.
3. The Trust page status board is the public source of truth; it must never lag
   reality in the optimistic direction.
4. Rollback: every deploy is a static snapshot; redeploy the previous one.
