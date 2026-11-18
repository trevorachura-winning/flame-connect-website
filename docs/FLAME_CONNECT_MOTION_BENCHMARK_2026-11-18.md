# Motion Benchmark — Datamellon screen recording
**Recorded reference:** user-provided 23.85-second screen recording, 1920x870, 18 Nov 2026.  
**Reference:** https://datamellon.com  
**Purpose:** Borrow interaction design patterns, not visuals, branding, copy, assets, testimonials or code.

## Direct observations from the recording
- ~0–2 s: Dark canvas, layered subtle particles, horizontal brand/logo strip, strong headings and floating cards.
- ~2–5 s: High-contrast, very large headings; animated/prominent emphasized words; call-to-action buttons with gentle hover treatment.
- ~5–9 s: Product/service tiles, faint glow accents, scroll-led sectional reveals.
- ~9–12 s: A numbered multi-stage process layout using oversized step numerals and alternating copy.
- ~12–14 s: Strong conversion section followed by a content-rich footer.
- ~14–18 s: A full-width services mega-menu containing grouped links in multiple columns and an internal scroll area.
- ~18–24 s: The reference returns near the top of the site; a horizontally moving logo strip is visible.
- Throughout: a visible subtle circular pointer follower. The recording is not sufficient to infer its precise underlying easing function or implementation library.

## Flame Connect application (original execution)
### Codex: shared-site foundation
- Decorative orange pointer-following halo, never replaces native cursor or consumes pointer events; disabled for reduced motion and coarse pointers.
- Shared header/mega-menu/navigation architecture, tested with keyboard focus, Escape, touch, meaningful grouping and robust hover/focus boundaries.
- Shared performance and accessibility gates, SEO, form/contact/backend delivery, product/platform link truth.

### Claude: page-scoped marketing experience
- Home, About, Services and Resources; locally scoped marketing components and CSS modules.
- Scroll entrances, staged process sections, card motion, hero composition and restrained content transitions.
- Use existing typographic/colour tokens and official logo; authentic African imagery, no fake client references.
- If globally shared styles/header/layout need changes, document the precise request to Codex; do not edit shared files.

## Motion rules
- Typography: Montserrat; body: Poppins; orange #F4511E, deep navy #07111F, ink #111827, Flame Blue #153A8A, light blue #EAF2FF.
- Prefer composited transforms/opacity, passive pointer listeners and requestAnimationFrame, with cleanup.
- No scroll hijacking, forced smooth scrolling or perpetual high-CPU loops.
- Disable decorative motion for prefers-reduced-motion and low-capability devices where appropriate.
- Mobile: gestures and navigation must not depend on hover; 44px target goal.
- Logo marquee ONLY for permissioned or otherwise verified brand associations; may use Flame's own product families/approved ecosystem marks instead.
- Keep LCP imagery optimized; benchmark Core Web Vitals, network overhead and keyboard navigation.
- Acceptance: compare 1440/768/390/320px layouts and reduced-motion/keyboard cases with screenshots and tested results.

## Coordination / governance
- Source repo: trevorachura-winning/flame-connect-website.
- PR #2: documentation and role planning; PR #3: Codex lead integrity; PR #4: Codex cursor halo.
- Claude must branch from current main, not from an unmerged Codex PR; avoid app/layout.tsx, app/globals.css, components/Header.tsx and all form backend.
- No merging or deployment without Product Owner release approval.
