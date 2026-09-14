# Brand implementation

Source: **Flame Connect — Brand Snapshot** (official, supplied September 2026).
This document maps the snapshot to code. It resolves two Appendix C items:
official colour tokens and logo direction. Remaining open item: the *source
vector/raster logo asset* itself (see "Logo asset status" below).

## Colour tokens

| Token | Hex | Role (brand guide) | CSS variable |
|---|---|---|---|
| Flame Orange | `#F4511E` | Primary accent — energy, keylines, buttons, emphasis | `--flame` |
| Deep Navy | `#07111F` | Dark canvas | `--navy-canvas` / `--navy-deep` |
| Ink Navy | `#111827` | Headings / UI | `--ink` |
| Light Blue | `#EAF2FF` | Soft cards, panels, secondary surfaces | `--panel` / `--paper-2` |
| White | `#FFFFFF` | Primary neutral | `--paper` / `--card` |
| Slate | `#374151` | Body copy | `--ink-soft` |

### Accessibility derivation (documented exception, not a new brand colour)

Pure Flame Orange at small sizes does not meet WCAG 2.2 AA on white (3.48:1)
or on Light Blue (3.09:1). The brand guide both (a) names orange for buttons
and (b) requires the site target AA. Resolution, held constant everywhere:

- **Dark surfaces (Deep Navy):** pure `#F4511E` is used for orange text/icons (5.45:1 ✓).
- **Orange text on light surfaces:** `--flame-strong: #C43D0A` (5.23:1 white, 4.64:1 light blue ✓).
- **Orange-filled buttons with white labels:** `--flame-btn: #CE3F0C` (4.84:1 ✓),
  hover `--flame-btn-hover: #A53408`. Hover/focus *keylines* keep pure `#F4511E`.
- Focus ring stays pure Flame Orange (3:1 non-text requirement ✓).

These tints are computed derivations for legibility, recorded here so no one
"invents" additional oranges later. If the brand team issues official
interaction tones, swap the three variables in `app/globals.css`.

## Typography

- Headings / section titles / strong statements: **Montserrat** 600–800 — site uses the variable cut with 800/900 for display.
- Body / UI / captions / CTAs: **Poppins** 400–600 — self-hosted 400/500/600/700.
- Both bundled as static assets (no third-party font requests, low-bandwidth friendly).

## Graphic system → CSS mapping

- **Dark/light rhythm:** `.band` deep-navy sections alternate with white (`.section`)
  and light-blue (`.section.paper2`) surfaces.
- **Orange keylines:** eyebrow rules, card hover outlines (`border-color: var(--flame)`),
  active-nav underlines, callout rails, focus rings.
- **Cards:** rounded rectangles (`--radius-*`), restrained `--shadow`, clean internal spacing.
- **Whitespace:** generous section rhythm per the guide; content never edge-to-edge.

## Logo asset status

`components/BrandLogo.tsx` is a **faithful vector recreation** of the supplied
full-colour lockup from the snapshot: flame-lens mark, stacked FLAME CONNECT
Montserrat wordmark, circuit flourish, and the "Digitizing Africa" signature
(optional per placement). Usage rules from the guide are enforced by design:
full-colour only, proportions locked (aspect computed from the lockup), clear
space via layout, no recoloured/alternate treatments; the compact variant simply
omits the signature for small placements.

**Action item (Appendix C):** when the brand team supplies the official
SVG/AI/PNG source, drop it into `public/brand/` and swap the component's
internals — every placement (header, drawer, footer, favicon, OG image) updates
from this one component. Until then, the recreation is the canonical mark on
this site and should be visually diffed against the source file at first
opportunity.

## Imagery & video

- Photography direction follows the guide + brief: contemporary African
  professionals, Kampala/East African context, warm natural light, documentary
  realism; no robot heads, blue holograms, staged handshakes or wildlife shorthand.
- The Flame OS ambient loop is Deep Navy + Flame glow — the brand canvas, animated
  at broadcast-safe file size (~140KB), never autoplaying off-screen or under
  reduced-motion.

## Voice (already wired into content system)

- Use: practical, clear, evidence-led, human-controlled, Africa-centred, confident.
- Avoid: unsupported superlatives, vague future-tech language, overclaiming
  readiness or impact — enforced by the claim-discipline gates
  (`lib/content.ts`, `scripts/check-content.mjs`).

Additional brand line in use: **"Uganda outward to Africa"** (footer location
line, via `lib/site.ts`), and logo signature **"Digitizing Africa"** reserved to
the logo lockup.
