/**
 * Single source of truth for verified business information.
 * Anything not listed here (phone, email, hours, team, awards, prices) has NOT
 * been verified and must not be invented. Optional values come from env vars.
 */
const address = {
  lines: [
    "The Galleria Business Hub 2, Office 130",
    "Savlia Circle, near Mahavir Circle",
    "Yogi Chowk Ground, Chikuwadi, Nana Varachha",
  ],
  locality: "Surat",
  region: "Gujarat",
  postalCode: "395011",
  country: "India",
  countryCode: "IN",
};

const fullAddress = `${address.lines.join(", ")}, ${address.locality}, ${address.region} ${address.postalCode}, ${address.country}`;

/** Production origin (SITE_URL at build time). Empty until the domain is known. */
const origin = (typeof __SITE_URL__ === "string" ? __SITE_URL__ : "").replace(/\/$/, "");

export const site = {
  name: "STUDIO_X",
  tagline: "Your Story. Our Vision.",
  description:
    "STUDIO_X is a photography and cinematic film studio in Surat, Gujarat. Visual storytellers creating art in every frame.",

  origin,
  /** Absolute URL when the production origin is known, otherwise a root-relative path. */
  url: (path = "/") => `${origin}${path}`,

  instagram: {
    handle: "studio__x",
    url: "https://www.instagram.com/studio__x/",
    /** Opens an Instagram direct message thread. */
    dm: "https://ig.me/m/studio__x",
  },

  address: { ...address, full: fullAddress },
  maps: {
    view: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`,
  },

  /** Optional, shown only when provided via VITE_ env vars. Never invent these. */
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || null,
    phone: import.meta.env.VITE_CONTACT_PHONE || null,
  },

  /**
   * If any placeholder (non-studio) imagery is added again, set this true so the site
   * says so. All current imagery is the studio's own.
   */
  showDemoNotice: false,
} as const;

export const nav = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
