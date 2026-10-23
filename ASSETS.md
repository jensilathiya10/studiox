# Asset status

The site now runs entirely on the studio's own files (no stock imagery). What is in and what is still needed:

| Asset | Status | Notes |
| --- | --- | --- |
| Portfolio photographs | **In.** 27 images from 17 Instagram posts, in `src/assets/portfolio` | Raw downloads remain untouched in `src/assets/photos`. Two posts carry baked-in captions ("Midnight Stroller", "Walking Toward") and the jewellery post has Hindi lettering; the "Messy Clothes, Full Hearts" carousel was cut into four frames (frame 3 cropped above its caption) |
| Logo | **In.** `logo.jpg` converted to transparent PNGs (`public/logo-paper.png`, `logo-ink.png`), favicon `public/icon.png`, social image `public/og.jpg` | The wordmark text is still typeset in the display font beside the mark |
| Films | **In.** 3 films in `public/film` (wedding 2:00 / 31 MB, pre-wedding teaser 0:59 / 5 MB, vertical reel 1:28 / 7 MB), posters extracted from the films | Loads only when a visitor presses play. The 31 MB file is heavy for mobile data; consider a smaller encode |
| Instagram template frames | Trimmed | Several posts were framed templates (borders, couple initials, "ENDLESS" lettering, a quote). I cropped to the photograph only; three-panel collages were split into separate images. Couple names in the filenames are not used anywhere on the site |
| Higher-resolution originals | Wanted | Instagram downloads are 1440 × 1800. Print/large-screen use and a sharper hero would benefit from the original camera exports |
| Project titles, categories, years | Working titles | Edit in `src/lib/content.ts`. Weddings, Pre-wedding and Details have work, so only those filters exist |
| Portraits, fashion, events, commercial photographs | **Missing** | Listed as services; no work shown yet. Add images + a category to display them |
| Client consent | **Confirm** | The wedding film shows the couple's names; confirm clients are happy for their films and photos to be published |
| Confirmed list of services | Unverified | Six suggested services in `src/lib/content.ts` |
| Public phone / email / hours | Missing (only address and Instagram verified) | `VITE_CONTACT_EMAIL`, `VITE_CONTACT_PHONE` |
| Production domain | Missing | `SITE_URL` |
| Email delivery account | Missing | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` |
| Privacy retention period, legal review | Placeholder | `src/pages/Privacy.tsx` |
