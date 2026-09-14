# Claims & content governance

The brief (section 24) requires that every measurable claim has an owner and a
source. This repository treats that as an engineering property, not only an
editorial one.

## Mechanisms

1. **Banned-phrase automation** — `lib/content.ts` (build time) and
   `scripts/check-content.mjs` (CI) reject overclaim vocabulary.
2. **Single-source statuses** — product status exists only in
   `content/products.ts`; every surface derives from it.
3. **Pending-as-null** — unconfirmed facts are `null` in `lib/site.ts` and render
   as visible pending states, so the site can never silently fabricate details.
4. **Structured-data honesty** — FAQ/Article schema only where content genuinely
   qualifies; Product schema intentionally absent until launch status is real.
5. **No dead buttons** — `lib/links.ts` resolves every interactive promise to a
   route that exists; `scripts/check-links.mjs` enforces the rule across the codebase.
6. **Evidence page discipline** — case studies and metrics publish only with
   verified sources and written approval; the site publicly explains this rather
   than padding with placeholders (see `/resources`, service pages, `/trust`).

## Roles (from the brief)

| Role | Owns |
|---|---|
| Business owner | Positioning, service scope, product status, claims |
| Content lead | Copy, resources, metadata, editorial calendar |
| Designer | Visual system, responsive layouts, imagery |
| Developer | Implementation, performance, accessibility, security, integrations |
| Product owner | Product descriptions, screenshots, status, destination URLs |
| Legal/privacy reviewer | Privacy, terms, consent language |

## Claim exceptions register

Any factual claim needing verification before launch lives in the Appendix C
checklist of `docs/DEPLOYMENT.md`. When confirmed, remove it from the checklist in
the same PR that sets the value. Nothing on the site may assert what that
checklist still marks pending.
