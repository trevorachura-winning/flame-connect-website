# Flame Connect team page — publication handoff

**Draft PR:** #44 (branch `feat/team-page`)  
**Status:** Engineering staged; **not ready to merge or publish** until real, approved profiles arrive.

## Verified roster inputs

| Person | What is known | What is still required |
| --- | --- | --- |
| Trevor Achura | Founder / Flame Connect project lead. The owner identified Trevor as a person to include. | Owner-approved final job title, a reviewed two to three sentence bio, transparent portrait, permission to publish, optional LinkedIn |
| Moses Owena | Product Owner confirmed **Art Director**. Profile details are grounded in his 28 October 2026 CV, including film direction, cinematography and creative content strategy. | The approved transparent portrait must be uploaded as `public/team/moses-owena.webp`; Moses must approve the final bio and portrait for publication. Optional LinkedIn is not supplied. |

Do not copy another agency's staff, use stock faces or generate realistic portraits as substitutes for unprovided team members. Never assume consent merely because a photograph was shared elsewhere.

## Portrait preparation (after approved source images are provided)

- Each subject supplies a clear waist-up original photo facing camera and authorises its use on Flame Connect.
- A **transparent-background WebP** at **900 × 1260 px** has been prepared from Moses's supplied seated portrait. The pose is intentionally kept seated, not fabricated standing. Inspect the cut-out edges and confirm that the edited result faithfully represents him before publication.
- Save to `public/team/<firstname-lastname>.webp` and reference `/team/<firstname-lastname>.webp`.
- Inspect transparency and head/shoulder cropping at 320/375/414/768/1024/1440 px. Confirm professional but accurate representation.
- Keep the person's permission in approved team records outside the public repository; `publicationApproved: true` is set in source code only after permission is confirmed.

## How to activate the page

1. Moses Owena is staged in `content/team.ts` with `publicationApproved: false`. Upload his approved image to `public/team/moses-owena.webp`. Add at least one more confirmed entry before the public team page can launch. Each needs `slug`, `name`, `role`, `bio`, `photo` and `publicationApproved: true`; `linkedin` optional.
2. Keep bios genuinely specific and warm, in British English, two or three sentences each. No invented career history, quotes or honours.
3. `TEAM_IS_PREVIEW` becomes false with two approved profiles. Then `/team` becomes indexable, appears in the sitemap and the Company footer and About link automatically appear.
4. The existing carousel supports exactly two profiles without autoplay or dots. For three or more, the wrap-around layout, dots and autoplay resume.
5. Run `npm run content:check`, `npm run links:check`, `npm run test:marketing`, `npm run typecheck`, `npm run build`.
6. Perform **actual browser acceptance** at 320, 375, 414, 768, 1024, 1440. Check no sideways scroll, uncropped portraits, keyboard focus, arrow keys, drag/swipe, hover/focus pause with three or more, reduced-motion, 44px controls, console and image fetch errors.
7. Review PR #44 and obtain explicit Product Owner approval before merging or deploying.

## Release notes

- The preview remains `noindex` and unlinked because only one person is staged and his publication approval is pending. The profile photo file has not yet been transferred into the GitHub repository, so the current branch cannot pass visual portrait acceptance.
- This branch does **not** change the public Coming Soon gate or the Friday 20 Nov 2026, 12:00 EAT release timestamp.
- The untouched six-item main navigation remains Services, Products, Insights, About, Responsible AI, Contact. No new About dropdown is introduced without approval.
- No database, login, backend or assessment submission behavior is changed.
