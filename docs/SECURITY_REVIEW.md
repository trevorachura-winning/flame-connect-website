# Flame Connect Website — Security Review

**Scope and model:** website-only marketing/point-of-sale release, updated 19 Nov 2026. This is a public Next.js website, **not** the Flame Sales application.

## Current attack surface
- Before Friday 20 Nov 2026 12:00 EAT, `middleware.ts` rewrites production requests to a public Coming Soon HTML page with contact links. Browser-side countdown does not transmit visitor input.
- `/api/lead` and retired sign-in URLs appear to render Coming Soon until the gate opens; this must not be mistaken for an active backend or working sign-in.
- Public content and product status registry, metadata and SEO routes.
- Browser-side enquiry composer with `mailto:` and WhatsApp click-to-chat destinations.
- No site-managed user accounts, login, server-side contact API, lead database or CRM storage.
- `app/api/lead` was removed by the approved website-only release (#5/#7). Old findings about rate-limiting or webhook delivery apply only to earlier versions; they are **not active controls**.

## Controls and considerations
1. **Input handling:** enquiry fields are composed locally. There is no website API receiving their contents. Prefilled email/WhatsApp URLs must remain correctly encoded. Never ask for sensitive personal/company data.
2. **No delivery assertion:** the site cannot know that the user pressed Send in their external app; communications are not recorded automatically. UI must never claim a message was submitted by the site.
3. **External links:** WhatsApp links use the approved digits-only `256764018701` and `rel="noopener noreferrer"` on new-tab anchors. Email uses `mailto:flameconnect1@gmail.com`.
4. **JSON-LD:** `components/JsonLd.tsx` escapes `<` to avoid prematurely terminating a script tag; use reviewed static content only.
5. **Headers:** review `next.config.mjs` for CSP, content-type sniffing, Referrer-Policy and Permissions-Policy on each release. Verify HSTS and redirects for the live custom domain.
6. **Dependencies:** run the repo's package/dependency audit in CI or local environment. Do not assume historic advisory counts are still accurate.
7. **Privacy:** no first-party storage of enquiries under this release; email/WhatsApp are third-party services, and the user's message is transferred only after they send. Re-review the privacy notice before enabling analytics.
8. **Product claims:** source-of-truth status labels from `content/products.ts` and public Trust board must not overstate shipped functionality.
9. **Environment:** public `NEXT_PUBLIC_SITE_URL` config controls canonical metadata. Legacy platform and `LEAD_*` variables are unused. Do not remove account-level configuration without owner approval.

## Regression checks
```bash
npm ci
npm run content:check
npm run links:check
npm run test:marketing
npm run typecheck
npm run build
```

Additional **ungated-preview or post-launch** checks: `/api/lead` returns 404, `/sign-in` redirects to `/products`, public links work, and no console errors appear in the browser. Production-domain HTTP checks before launch cannot assess the hidden full site. Confirm dependency audits and weekly ZAP baseline separately if configured.

## Historical note
The September 2026 audit discussed an older `POST /api/lead` route with in-memory rate limiting and a `LEAD_WEBHOOK_URL` contract. That implementation is intentionally **not part of** the November website-only public release. No backend credential, login or lead persistence should be reintroduced by a marketing-site PR.
