# Flame Connect | Team Page publication handoff

**Draft PR:** #44 — `feat/team-page`  
**Status:** Two-person visual preview prepared, not approved for publication.

## Team roster prepared in the branch

| Person | Role on Flame Connect (Product Owner supplied) | Evidence and profile | Publication |
| --- | --- | --- | --- |
| Moses Owena | Art Director | CV dated 28 October 2026: cinematography, creative direction, visual storytelling, film production; Makerere University Bachelor of Performing Arts in Drama and Film. `public/team/moses-owena.webp` is committed. | `publicationApproved: false`; obtain his approval of portrait and final bio. |
| Aaron Mwesigwa Mwebaze | Managing Partner & Chief Marketing Officer | Product Owner assigns marketing, digital communications, development policy research and partnerships. Supplied profile confirms international relations and development policy research, Uganda foreign service experience, completed UCU degree, pursuing MA at Mae Fah Luang University with TICA scholarship. `public/team/aaron-mwesigwa.webp` is committed. | `publicationApproved: false`; obtain his approval of portrait, final job title and bio. LinkedIn URL came from his supplied profile. |
| Trevor Achura | Founder and Managing Director | Product Owner supplied role. | Awaiting approved photograph and bio; not in the registry yet. |
| Ron | Managing Partner, Operations | Product Owner supplied remit only. | Awaiting full confirmed name, photo, bio, consent. |

No extra team members, client relationships, promotional statistics or testimonials are implied by the public team copy.

## Existing design and interactions

Keep Claude's custom 3D cover-flow design. Selected portrait remains in colour with a navy name plinth and Flame Orange underline; unselected neighbour sits back in greyscale. The section below shows the person's role and 2–3 sentence bio with a native disclosure (“What Moses leads” / “What Aaron leads”) for focus areas and education. For two people, the second portrait occupies one stable neighbour position, with no autoplay or dots. Arrow keys, swipe, arrows and reduced-motion controls remain supported.

Do not add unnecessary grain, role-coloured effects, pointer parallax or modify the main navigation without Product Owner approval.

## Portrait sources

- Moses WebP: 900 × 1260 transparent cutout based on his submitted portrait, seated pose preserved. Check facial similarity and edges before public release.
- Aaron WebP: 900 × 1260 transparent cutout based on his submitted conference photograph. Original photograph pixels were retained so his face, glasses, suit and crossed arms are not redrawn. Note that segmentation edges near shoulders warrant visual inspection before public release.
- Both images are committed in `public/team/`; `content/team.ts` references those paths.

## Required publication actions

1. Both people approve their own public portrait, biography and title. Record consent privately; do not publish consent records in the repository.
2. Set `publicationApproved: true` only for profiles actually approved. The route remains `noindex` and omitted from sitemap/footer/About links while anyone in the registry is unapproved.
3. Perform real-browser QA on the Vercel PR preview at widths 320, 375, 414, 768, 1024 and 1440 px. Check portrait cutout edges, overflow, focus, disclosure, text contrast, mobile touch and drag, keyboard operation, reduced motion and console errors.
4. Run `npm run content:check`, `npm run links:check`, `npm run test:marketing`, `npm run typecheck`, `npm run build`.
5. Confirm the two photo resources load over HTTP from preview. Check both people before publication.
6. PR #44 remains draft and must not merge or deploy to production without Product Owner approval.

The corporate website Coming Soon gate remains unchanged at **20 November 2026, 12:00 EAT**. No backend, database, login or product behaviour is changed.
