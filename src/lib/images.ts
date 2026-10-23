/**
 * Central image registry for STUDIO_X's own photography.
 *
 * Originals live in src/assets/portfolio (clean-named copies of the studio's files; the raw
 * downloads stay untouched in src/assets/photos). To add or swap an image:
 *   1. Put a JPG (1440px+ wide) in src/assets/portfolio.
 *   2. Add a key below with its file name (no extension) and descriptive alt text.
 * vite-imagetools builds AVIF + WebP at several widths with explicit dimensions.
 */
export type ImgSet = {
  sources: { avif: string; webp: string };
  img: { src: string; w: number; h: number };
};

const modules = import.meta.glob("../assets/portfolio/*.jpg", {
  eager: true,
  import: "default",
  query: { w: "480;800;1280;1440", format: "avif;webp", as: "picture" },
}) as Record<string, ImgSet>;

export type Img = { set: ImgSet; alt: string };

const defs = {
  weddingDance: ["wedding-garden-dance", "A bride in a coral saree and a groom in an ivory sherwani hold hands and dance with raised arms on a sunlit lawn"],
  weddingIvory: ["wedding-ivory-coral", "A groom in an embroidered ivory sherwani and a bride in a coral saree stand close together beneath palm leaves"],
  weddingGarlands: ["wedding-garlands", "A smiling bride and groom wearing marigold and rose garlands, her head resting against his, in warm evening light"],
  weddingFields: ["wedding-green-fields", "A couple in cream traditional outfits embracing in a green field, trees softly blurred behind"],
  weddingProcession: ["wedding-procession", "A bride and groom walk along a stone path through a garden as family members clap and a small white dog follows"],
  weddingShringar: ["wedding-shringar", "Bridal jewellery, necklaces and bangles laid out on red fabric beneath a painted camel scene, with the word Shringar in gold lettering"],
  preMidnight: ["prewedding-midnight-stroller", "A couple walking along a city street at night under old buildings, captioned Midnight Stroller"],
  preWalking: ["prewedding-walking-toward", "A groom in a cream sherwani and a bride in a red lehenga walking down a street beside a decorated car, captioned Walking Toward"],
  preGarden: ["prewedding-still-garden", "A couple standing close beside a stone Buddha and plants in a landscaped garden"],
  preArch: ["prewedding-arched-door", "A couple posing in front of a grand arched doorway in a stone building, both in sunglasses"],
  preClay: ["prewedding-clay-laughter", "A man and a woman laughing together at a pottery wheel, hands in wet clay"],
  messy1: ["messy-1", "A couple sitting close together in a muddy field, their white clothes and hands covered in mud"],
  messy2: ["messy-2", "Close-up of a bearded man and a woman touching noses, mud streaked across their faces"],
  messy3: ["messy-3", "Two pairs of legs standing in thick mud, jeans and white trousers caked to the knee"],
  messy4: ["messy-4", "A woman hugging a man tightly with her eyes closed, mud on their clothes, trees softly blurred behind"],
  messyAll: ["messy-all", "Four-frame carousel of a muddy couple shoot titled Messy Clothes, Full Hearts"],
  weddingDoorway: ["wedding-doorway", "A bride in a red lehenga standing on the steps of a white palace-style building, framed by a scalloped archway and carved wooden doors"],
  weddingCarvedDoors: ["wedding-carved-doors", "A groom in an ivory sherwani and a bride in a red embroidered lehenga stand in front of a huge carved wooden door"],
  weddingHandInHand: ["wedding-hand-in-hand", "A groom in a cream sherwani and a bride in a red lehenga with a long veil walk away holding hands across a lawn"],
  weddingGardenPath: ["wedding-garden-path", "A couple in ivory and red wedding clothes embracing beside a curving garden path under tall trees"],
  weddingMandap: ["wedding-mandap-from-above", "An aerial view of a wedding venue with a hexagonal floral mandap surrounded by rows of blue chairs in a green garden"],
  weddingArchedCourtyard: ["wedding-arched-courtyard", "A couple walking through the arched entrance of a courtyard building, a bouquet in hand"],
  weddingHenna: ["wedding-henna-smile", "Close-up of a smiling bride in a green outfit with a henna-decorated hand and a ring bracelet"],
  weddingFountain: ["wedding-quiet-fountain", "A couple walking past a stone fountain in a quiet courtyard, bare branches softly blurred in the foreground"],
  preLittleArch: ["prewedding-little-arch", "A couple dancing in front of a small peach-coloured arched chapel, he holding a sunflower"],
  prePalms: ["prewedding-among-palms", "A couple holding hands in front of large fan palm leaves, she in a pale lehenga and he in a black suit"],
  preArches: ["prewedding-under-the-arches", "A couple laughing together beneath cream arches, she in a sage-green lehenga and he in a beige jacket"],
  preGardenWalk: ["prewedding-garden-walk", "A bride in a pale lehenga and a groom walking hand in hand across a lawn with palm trees behind them"],
} as const;

export type ImageKey = keyof typeof defs;

export const images = Object.fromEntries(
  (Object.keys(defs) as ImageKey[]).map((k) => {
    const [file, alt] = defs[k];
    const set = modules[`../assets/portfolio/${file}.jpg`];
    if (!set) throw new Error(`Missing photo: src/assets/portfolio/${file}.jpg`);
    return [k, { set, alt }];
  }),
) as Record<ImageKey, Img>;
