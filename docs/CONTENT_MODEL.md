# Content model

The brief (section 20) asks for an editor-friendly content layer with draft/review/
publish workflow. This repository implements that as a **code-reviewed content
registry**: content lives in typed, human-editable files, and the review workflow
is the pull request — gated by the content and link checks in CI. A headless CMS
can later adopt the same shapes; the registry is the schema.

## Registry files

| File | Content type | Notes |
|---|---|---|
| `content/products.ts` | Product | Name, slug, status, purpose, outcomes (3–5), 3-step how-it-works, trust notes, requirements, FAQs, CTA, SEO |
| `content/services.ts` | Service | Proposition, who-for, problems, capabilities, outputs, outcome statement, image, FAQs, SEO + shared engagement stages |
| `content/articles.ts` | Insight/Playbook/Research/Field note | Structured sections, actions, explicit limits, related product/service, SEO |
| `content/home.ts` | Shared copy | Approach stages, Africa-first points, community surfaces/principles, operating principles, responsible-AI commitments |
| `content/navigation.ts` | Navigation | Top nav and footer columns |
| `lib/site.ts` | Global settings | Contacts, socials, domains, announcement ribbon — including **pending** items |

## Hard rules the registry enforces

1. **Type-only external imports.** Content files may import types from elsewhere
   but never runtime values — this is what lets `scripts/check-content.mjs`
   evaluate the registry standalone in CI.
2. **Product status vocabulary is closed:** `live | pilot | development`.
   Public microcopy for each status is fixed by the brief's Appendix A and lives
   in `content/products.ts` / `app/trust/page.tsx`.
3. **Claim discipline is automated.** The banned-phrase list (revolutionary,
   best in Africa, world-class, guaranteed results, industry-leading, …) is
   applied at build time (`lib/content.ts`) and in CI (`scripts/check-content.mjs`).
   Adding a page never bypasses it.
4. **Template integrity.** Product pages require ≥3 outcomes and exactly 3
   how-it-works steps (brief section 16).
5. **No future-dated articles.** `scripts/check-content.mjs` fails on dates in
   the future; publish by merging, not by pre-dating.

## How to publish an article

1. Add an entry to `ARTICLES` in `content/articles.ts` following an existing entry.
2. Fill `sections`, `actions`, `limits` — limits are mandatory in spirit; the
   editorial standard (Resources page) promises them publicly.
3. Run `npm run content:check && npm run links:check`.
4. Open a PR. CI re-runs both gates plus typecheck and a production build.
5. Merge = publish (the site is statically rendered at deploy).

## How to change a product's status

Status lives in exactly one place: `content/products.ts` → `status` (+ the human
`statusNote`). The products grid, detail page, Trust status board and sitemap all
derive from it. Change it in one PR; the board updates everywhere at once.

## Pending decisions (Appendix C)

The registry models pending facts as `null` in `lib/site.ts` (never as invented
strings). UI renders explicit pending copy. When marketing confirms a value, set
it in one PR and the footer, contact page, Trust page and JSON-LD all pick it up.
