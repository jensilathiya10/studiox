import { Link } from "react-router";
import { nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="sec-ink">
      <div className="container-x pb-8 pt-16 md:pt-24">
        <img src="/logo-paper.png" width="120" height="49" alt="STUDIO_X logo" className="mb-6 h-12 w-auto" loading="lazy" />
        <p className="display text-[clamp(3.6rem,17vw,17rem)] leading-[0.8] tracking-[-0.04em]" aria-hidden="true">
          STUDIO<span className="acc">_</span>X
        </p>

        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="serif-i text-3xl">{site.tagline}</p>
            <p className="mt-3 max-w-xs text-sm text-mute">
              Photography and cinematic films from {site.address.locality}, {site.address.region}, {site.address.country}.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-6">
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2 text-sm font-semibold">
              {[{ to: "/", label: "Home" }, ...nav].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="link-underline">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow mb-4">Find us</p>
            <address className="space-y-1 text-sm not-italic text-mute">
              {site.address.lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
              <span className="block">
                {site.address.locality}, {site.address.region} {site.address.postalCode}
              </span>
            </address>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              <li>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                  Instagram @{site.instagram.handle} ↗
                </a>
              </li>
              {site.contact.email && (
                <li><a href={`mailto:${site.contact.email}`} className="link-underline">{site.contact.email}</a></li>
              )}
              {site.contact.phone && (
                <li><a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="link-underline">{site.contact.phone}</a></li>
              )}
              <li>
                <a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className="link-underline">
                  Directions on Google Maps ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-5 text-xs text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <Link to="/privacy" className="link-underline w-fit">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
