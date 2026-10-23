# STUDIO_X

Photography and cinematic films website for STUDIO_X, Surat. React 19 + Vite + TypeScript + Tailwind 4, React Router with lazy routes. No Next.js, no animation library: motion is native CSS plus one IntersectionObserver and short pointer-driven rAF loops.

```bash
npm install
npm run dev        # http://localhost:3000 (also serves /api/contact)
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run lint
```

See `DESIGN_PLAN.md` (identity, decisions) and `ASSETS.md` (what the studio still needs to supply).

## Where to edit things

| What | File |
| --- | --- |
| Address, Instagram, optional phone/email, temporary-imagery notice | `src/lib/site.ts` |
| Image files + alt text | `src/lib/images.ts` (files live in `src/assets/portfolio`) |
| Portfolio projects, categories, services, film, Instagram strip | `src/lib/content.ts` |
| Hero photograph | `public/hero/` + `src/components/Hero.tsx` + preload in `index.html` |
| Colours, type, motion | `src/index.css` (tokens at the top) |
| Page copy | `src/pages/*.tsx` |

## Adding or replacing imagery

Portfolio images live in `src/assets/portfolio` (clean-named JPGs, 1440px+ wide). To add one: drop the file there, add a key with alt text in `src/lib/images.ts`, then add a project in `src/lib/content.ts`. The build produces AVIF + WebP at several widths with intrinsic dimensions. `src/assets/photos` is just an inbox for raw downloads and is not built.

- **Hero:** export a 3:4 crop as `public/hero/hero-{480,720,960,1200}.{avif,webp}`; update `alt` in `Hero.tsx`.
- **Logo:** `public/logo-paper.png` / `logo-ink.png` (transparent), favicon `public/icon.png`, social card `public/og.jpg`.

## Film

Films live in `public/film` and are listed in `src/lib/content.ts` (`films`). Each opens in an accessible dialog with the browser's own controls, never autoplays, and loads no video bytes until play is pressed (only the small poster images). To add one, copy an H.264 MP4 and a poster JPG into `public/film` and add an entry.

## Inquiry form (Vercel + Resend)

`api/contact.ts` is a Vercel Function. Set these in the Vercel project (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Email delivery via Resend (server-side only) |
| `SITE_URL` | Production origin for canonical URLs, Open Graph, sitemap |
| `VITE_CONTACT_EMAIL`, `VITE_CONTACT_PHONE` | Optional public contact details |

Until the Resend variables exist, the form validates but tells visitors it is **not connected** and points to Instagram. It never shows a fake success. To use another provider, change only `deliver()` in `api/contact.ts`. Spam protection: honeypot, minimum-time check, body-size cap and a per-instance IP rate limit (add a WAF or shared store for multi-instance hosting). Hosting elsewhere (Netlify, Cloudflare) means adapting the one function's wrapper.

## Verify before launch

- Services, project titles and categories are suggestions, not confirmed offerings.
- About copy describes philosophy only; add team, experience or awards only when verified.
- Privacy policy has a bracketed retention-period placeholder and has had no legal review.
- No cookies or analytics, so no consent banner. Add one if tracking is added.
- `vite.config.ts` sets an inline PostCSS config because a parent folder (`D:\`) contains an unrelated `postcss.config.mjs`.
