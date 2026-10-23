import type { ImageKey } from "./images";

/* ------------------------------------------------------------------ *
 * Portfolio: the studio's own work. Titles are descriptive working
 * titles (two are the studio's own captions: "Midnight Stroller" and
 * "Walking Toward"). Edit titles, categories and add `year` when known.
 * Categories with no work are intentionally not listed: add a category
 * here only once it has images.
 * ------------------------------------------------------------------ */
export const categories = [
  { slug: "weddings", label: "Weddings" },
  { slug: "pre-wedding", label: "Pre-wedding" },
  { slug: "details", label: "Details" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export type Project = {
  id: string;
  title: string;
  category: CategorySlug;
  image: ImageKey;
  /** CSS aspect-ratio of the image tile (width / height). */
  ratio: string;
  year?: number;
  note?: string;
};

export const projects: Project[] = [
  { id: "garlands", title: "Garlands", category: "weddings", image: "weddingGarlands", ratio: "4 / 5" },
  { id: "messy-ii", title: "Messy Clothes, Full Hearts II", category: "pre-wedding", image: "messy2", ratio: "1440 / 460" },
  { id: "ivory-and-coral", title: "Ivory & Coral", category: "weddings", image: "weddingIvory", ratio: "4 / 5" },
  { id: "midnight-stroller", title: "Midnight Stroller", category: "pre-wedding", image: "preMidnight", ratio: "4 / 5" },
  { id: "the-procession", title: "The Procession", category: "weddings", image: "weddingProcession", ratio: "4 / 5" },
  { id: "walking-toward", title: "Walking Toward", category: "pre-wedding", image: "preWalking", ratio: "4 / 5" },
  { id: "garden-celebration", title: "Garden Celebration", category: "weddings", image: "weddingDance", ratio: "4 / 5" },
  { id: "clay-and-laughter", title: "Clay & Laughter", category: "pre-wedding", image: "preClay", ratio: "4 / 5" },
  { id: "shringar", title: "Shringar", category: "details", image: "weddingShringar", ratio: "4 / 5" },
  { id: "messy-i", title: "Messy Clothes, Full Hearts I", category: "pre-wedding", image: "messy1", ratio: "1440 / 460" },
  { id: "green-fields", title: "Green Fields", category: "weddings", image: "weddingFields", ratio: "4 / 5" },
  { id: "the-arched-door", title: "The Arched Door", category: "pre-wedding", image: "preArch", ratio: "4 / 5" },
  { id: "messy-iii", title: "Messy Clothes, Full Hearts III", category: "pre-wedding", image: "messy3", ratio: "1440 / 335" },
  { id: "still-garden", title: "Still Garden", category: "pre-wedding", image: "preGarden", ratio: "4 / 5" },
  { id: "hand-in-hand", title: "Hand in Hand", category: "weddings", image: "weddingHandInHand", ratio: "955 / 1445" },
  { id: "carved-doors", title: "Carved Doors", category: "weddings", image: "weddingCarvedDoors", ratio: "1170 / 981" },
  { id: "doorway", title: "Doorway", category: "weddings", image: "weddingDoorway", ratio: "663 / 999" },
  { id: "garden-path", title: "Garden Path", category: "weddings", image: "weddingGardenPath", ratio: "1399 / 1732" },
  { id: "the-little-arch", title: "The Little Arch", category: "pre-wedding", image: "preLittleArch", ratio: "773 / 1186" },
  { id: "among-the-palms", title: "Among the Palms", category: "pre-wedding", image: "prePalms", ratio: "813 / 990" },
  { id: "under-the-arches", title: "Under the Arches", category: "pre-wedding", image: "preArches", ratio: "1170 / 1463" },
  { id: "garden-walk", title: "Garden Walk", category: "pre-wedding", image: "preGardenWalk", ratio: "1080 / 596" },
  { id: "arched-courtyard", title: "Arched Courtyard", category: "pre-wedding", image: "weddingArchedCourtyard", ratio: "1170 / 483" },
  { id: "quiet-fountain", title: "Quiet Fountain", category: "pre-wedding", image: "weddingFountain", ratio: "1170 / 484" },
  { id: "henna-and-smile", title: "Henna & Smile", category: "details", image: "weddingHenna", ratio: "1170 / 484" },
  { id: "mandap-from-above", title: "The Mandap from Above", category: "details", image: "weddingMandap", ratio: "1277 / 1519" },
  { id: "messy-iv", title: "Messy Clothes, Full Hearts IV", category: "pre-wedding", image: "messy4", ratio: "1440 / 420" },
];

export const categoryLabel = (slug: CategorySlug) => categories.find((c) => c.slug === slug)?.label ?? slug;
export const getProject = (id: string) => projects.find((p) => p.id === id);

/* ------------------------------------------------------------------ *
 * Films (public/film). Each opens in an accessible dialog on demand and
 * never autoplays; nothing is downloaded until the visitor presses play.
 * Titles are descriptive working titles: edit freely.
 * ------------------------------------------------------------------ */
export type Film = {
  id: string;
  title: string;
  src: string;
  poster: string;
  /** "16 / 9" or "9 / 16" */
  ratio: string;
  length: string;
  size: string;
};

export const films: Film[] = [
  { id: "wedding", title: "Wedding film", src: "/film/film-c.mp4", poster: "/film/poster-c.jpg", ratio: "16 / 9", length: "2:00", size: "31 MB" },
  { id: "teaser", title: "Pre-wedding teaser", src: "/film/film-a.mp4", poster: "/film/poster-a.jpg", ratio: "16 / 9", length: "0:59", size: "5 MB" },
  { id: "reel", title: "Cinematic reel", src: "/film/film-b.mp4", poster: "/film/poster-b.jpg", ratio: "9 / 16", length: "1:28", size: "7 MB" },
];

/* ------------------------------------------------------------------ *
 * Services: suggested list. Confirm with the owner before treating as
 * final. No prices on purpose.
 * ------------------------------------------------------------------ */
export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  includes: string[];
  image: ImageKey;
  formValue: string;
};

export const services: Service[] = [
  {
    slug: "photography",
    title: "Photography",
    short: "Considered, natural photographs for the moments that matter to you.",
    long: "Photography shaped around the people in front of the lens: honest light, calm direction and an edit that feels like you.",
    includes: ["A conversation about the story first", "Planned and candid coverage", "Natural colour and skin tones", "A curated, edited gallery"],
    image: "weddingIvory",
    formValue: "Photography",
  },
  {
    slug: "cinematic-videography",
    title: "Cinematic videography",
    short: "Films built from real moments, natural sound and careful edits.",
    long: "Short films composed with the same care as our photographs, so you can feel the day again rather than just watch it.",
    includes: ["Highlight film", "Natural sound and music guidance", "Edited for screens and sharing", "Photography and film can run together"],
    image: "preMidnight",
    formValue: "Cinematic videography",
  },
  {
    slug: "wedding-celebrations",
    title: "Wedding & celebration coverage",
    short: "From the first ritual to the last dance, unhurried and unobtrusive.",
    long: "Coverage that follows the feeling of the day: the nerves, the laughter, the family, the details you spent months on.",
    includes: ["Planning conversation", "Single or multi-day coverage", "Candid and portrait storytelling", "Pre-wedding sessions on request"],
    image: "weddingProcession",
    formValue: "Wedding & celebration coverage",
  },
  {
    slug: "portrait-fashion",
    title: "Portrait & fashion shoots",
    short: "Editorial portraits with strong light and quiet confidence.",
    long: "Portraits and fashion work for individuals, creatives and brands, directed with a clear visual idea and a calm set.",
    includes: ["Concept and mood discussion", "Studio or location shoot", "Retouching to a natural finish", "Print and web-ready files"],
    image: "preLittleArch",
    formValue: "Portrait & fashion shoots",
  },
  {
    slug: "events",
    title: "Event coverage",
    short: "Gatherings, launches and celebrations, documented as they felt.",
    long: "Coverage for private and public events that captures atmosphere, people and the moments in between.",
    includes: ["Pre-event briefing", "Photography, film, or both", "Quick highlights on request", "Full edited gallery"],
    image: "weddingDance",
    formValue: "Event coverage",
  },
  {
    slug: "commercial",
    title: "Commercial visual content",
    short: "Imagery for brands, spaces and products that deserves a second look.",
    long: "Brand, product and jewellery photography and film, built around a consistent visual language for web, campaigns and print.",
    includes: ["Creative brief and shot list", "Studio or on-site production", "Consistent colour and styling", "Licensed delivery for agreed usage"],
    image: "weddingShringar",
    formValue: "Commercial visual content",
  },
];

export const inquiryTypes = [...services.map((s) => s.formValue), "Something else"];

/* ------------------------------------------------------------------ *
 * Instagram strip: the studio's own posts. Add `href` with the post URL
 * to link each tile to its post; otherwise it links to the profile.
 * There is no live feed integration; this strip is curated by hand.
 * ------------------------------------------------------------------ */
export const instagramTiles: { image: ImageKey; href?: string }[] = [
  { image: "weddingGarlands" },
  { image: "messyAll" },
  { image: "preMidnight" },
  { image: "weddingShringar" },
  { image: "weddingIvory" },
  { image: "preWalking" },
  { image: "preClay" },
  { image: "weddingProcession" },
  { image: "weddingCarvedDoors" },
  { image: "preLittleArch" },
  { image: "weddingMandap" },
  { image: "preArches" },
];
