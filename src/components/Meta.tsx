import { site } from "@/lib/site";

/**
 * Per-route head tags. React 19 hoists <title>, <meta> and <link> rendered
 * anywhere in the tree into <head>. Canonical and Open Graph URLs are only
 * emitted once SITE_URL is configured, so we never publish wrong absolute URLs.
 */
export function Meta({ title, description, path }: { title: string; description: string; path: string }) {
  const full = title === site.name ? title : `${title} | ${site.name}`;
  const abs = site.origin ? site.url(path) : null;
  return (
    <>
      <title>{full}</title>
      <meta name="description" content={description} />
      {abs && <link rel="canonical" href={abs} />}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      {abs && <meta property="og:url" content={abs} />}
      {abs && <meta property="og:image" content={site.url("/og.jpg")} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={full} />
      <meta name="twitter:description" content={description} />
      {abs && <meta name="twitter:image" content={site.url("/og.jpg")} />}
    </>
  );
}

/** LocalBusiness data built only from verified facts in site.ts. */
export function LocalBusinessLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    slogan: site.tagline,
    ...(site.origin ? { url: site.origin, image: site.url("/og.jpg") } : {}),
    sameAs: [site.instagram.url],
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.lines.join(", "),
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    areaServed: { "@type": "City", name: "Surat" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
