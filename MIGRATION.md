# Migration: Next.js → React + Vite

The brief requires a static React 19 + Vite + TypeScript SPA (no Next.js). The earlier build was Next.js 16.

## Kept (ported with minimal change)
- `src/lib/site.ts`, `content.ts`, `inquiry.ts`: business facts, portfolio/services data, shared form validation.
- Photography (`public/images` → `src/assets/photos`, now processed by vite-imagetools into AVIF/WebP + srcset).
- Components: Header, Footer, Lightbox, ServicesList, ProcessTimeline, ContactForm. Logic unchanged; Next imports replaced (`next/link` → `react-router`, `next/image` → `<Picture>`).
- All page copy (About, Services, Contact, Privacy) and design tokens (restyled to the new palette).
- Contact delivery via Resend, now `api/contact.ts` (Vercel function).

## Replaced
| Was | Now |
|---|---|
| App Router pages | React Router, every route `lazy()` |
| `next/font/google` | Self-hosted `@fontsource-variable/*` |
| `next/image` | vite-imagetools + `<Picture>` |
| `generateMetadata`, `sitemap.ts`, `robots.ts`, OG route | React 19 `<title>/<meta>` hoisting, static `public/sitemap.xml`, `robots.txt`, static `og.jpg` |
| `/api/inquiry` route handler | `/api/contact` serverless function (+ dev middleware in `vite.config.ts`) |
| Parallax + custom cursor + CSS-only intro | Dropped (brief forbids parallax stacks / loaders); replaced by the scroll-scrubbed canvas hero |

## Removed
Next.js, `.next`, `next.config.ts`, the OG image route, eslint-config-next.

## Later revisions (same stack, new design)
- v2: replaced the 400vh scroll-scrubbed canvas hero with a one-screen hero (frame-sequence code, `scripts/`, `public/seq` removed).
- v3 ("Paper & Vermilion"): new identity (Bricolage Grotesque + Manrope, paper/ink/vermilion), arch-masked hero, overlapping portfolio collage, services index, vermilion contact band. See `DESIGN_PLAN.md`.
- Router switched from the data router to React Router's declarative mode to keep the entry bundle small.
