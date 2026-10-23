# STUDIO_X: Design Plan (v3, "Paper & Vermilion")

## What exists (inspected)
- Stack: React 19 + Vite + TypeScript + Tailwind 4, React Router (declarative, lazy routes). Kept. No Next.js.
- Working and kept: inquiry validation + `/api/contact` (Resend), lightbox on native `<dialog>`, image pipeline (vite-imagetools → AVIF/WebP), SEO helpers, routes (Home, Work, Services, About, Contact, Privacy, 404).
- Assets (updated): the studio supplied its own work: 11 Instagram posts, `logo.jpg` and 3 films. These replaced the earlier licensed placeholder photographs. See `ASSETS.md` for what is still missing.
- UI/UX Pro Max: installed (`.claude/skills/ui-ux-pro-max`). Used for typography/colour guidance ("bold typography, near-black, vermillion, type-as-hero") plus its accessibility, touch and reduced-motion rules.
- Measured problems in the previous build (Lighthouse, production): Work page mobile 59 and Home desktop 63, caused by main-thread layout/paint (CSS multi-column masonry, large clip-path/zoom layers), not JavaScript.

## Reference study (trionn.com)
Could read structure and voice; the site's preloader never finished in the automation browser, so rendered visuals were not seen. Taken as *principles*, not copied:
- Oversized headlines with deliberate line breaks; short declarative copy; repeated "let's talk" invitations.
- Work as a plain, confident vertical list: big names, one-line descriptions, "explore" affordance.
- Numbered sequences, small eyebrows, one playful interactive hero detail.
- Crop-mark corners on the loading screen → reinterpreted as **viewfinder marks** (photography-native).

## Identity
- **Palette:** paper `#EFE7DA`, ink `#121110`, muted vermilion `#C8452A` (accent: CTA, active states, contact band only), smoke `#675F54` / ash `#A39B8E` for secondary text. Sections alternate paper and ink; contact is the single vermilion band.
- **Type:** Bricolage Grotesque (variable: weight + **width axis**) for display, set uppercase, tight, huge; Manrope for body; Instrument Serif italic only for rare pull-quotes.
- **Signature shape:** the **arch** (jharokha/window silhouette), used as one photo mask, not as ornament. No patterns.
- **Signature interaction (repeated everywhere):** mask reveal on entry + width-axis/scale response on hover + a small "View" cursor on desktop.

## Hero (one viewport)
Asymmetric: `WE MAKE / MOMENTS / IMMORTAL.` left, tall arch-masked photograph right, small secondary image overlapping for depth, vermilion round CTA, wordmark settling in the header, viewfinder corner marks. Entrance ≈1.2s, CSS only, once per session; pointer depth ±8–14px on desktop only.

## Sections (home)
Hero → Selected work (overlapping collage, huge titles) → Studio story → Services (interactive rows) → Film (still, real playback only when a film exists) → Instagram strip (native horizontal scroll) → Contact (vermilion band + form) → Footer.
Other routes: Work (filterable pattern grid), Services, About, Contact, Privacy, 404, each with its own composition.

## Motion budget
Native CSS + one IntersectionObserver + rAF only while the pointer moves. No scroll hijack, no pinned sections, no continuous animation, reduced-motion = final state.

## Performance plan
CSS grid (no multi-column), `content-visibility: auto` on below-the-fold sections, no `will-change` on large layers, hero image preloaded with explicit sizes, smaller gallery candidates, lazy everything else.

## Missing real assets (owner checklist) → see `ASSETS.md`
