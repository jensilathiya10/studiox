import { useSearchParams } from "react-router";
import { ContactForm } from "@/components/ContactForm";
import { Meta } from "@/components/Meta";
import { PageHero } from "@/components/ui";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

export default function Contact() {
  const [params] = useSearchParams();
  const slug = params.get("service");
  const defaultType = services.find((s) => s.slug === slug)?.formValue ?? "";

  return (
    <>
      <Meta
        title="Contact"
        description="Contact STUDIO_X, a photography and videography studio in Nana Varachha, Surat. Send an inquiry or message us on Instagram."
        path="/contact"
      />
      <PageHero
        n="04"
        label="Contact"
        title={["Let’s create", <span key="a" className="acc">something.</span>]}
        intro="Have a story in mind? We’d love to hear about it."
      />

      <section id="inquiry" className="sec-paper pb-20 md:pb-32">
        <div className="container-x grid gap-16 border-t border-line pt-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <ContactForm key={defaultType} defaultType={defaultType} />
          </div>

          <aside className="space-y-10 md:col-span-4 md:col-start-9" aria-label="Studio details">
            <div>
              <h2 className="eyebrow mb-3">Message us</h2>
              <a href={site.instagram.dm} target="_blank" rel="noopener noreferrer" className="link-underline font-semibold text-[#a63a20]">
                Direct message on Instagram ↗
              </a>
              <p className="mt-2 text-sm text-mute">
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline">@{site.instagram.handle}</a>
              </p>
              {site.contact.email && (
                <p className="mt-4 text-sm"><a href={`mailto:${site.contact.email}`} className="link-underline">{site.contact.email}</a></p>
              )}
              {site.contact.phone && (
                <p className="mt-1 text-sm"><a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="link-underline">{site.contact.phone}</a></p>
              )}
            </div>

            <div>
              <h2 className="eyebrow mb-3">Visit the studio</h2>
              <address className="space-y-1 text-sm not-italic text-mute">
                {site.address.lines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
                <span className="block">{site.address.locality}, {site.address.region} {site.address.postalCode}</span>
                <span className="block">{site.address.country}</span>
              </address>
              <ul className="mt-4 space-y-2 text-sm font-semibold">
                <li><a href={site.maps.directions} target="_blank" rel="noopener noreferrer" className="link-underline text-[#a63a20]">Directions on Google Maps ↗</a></li>
                <li><a href={site.maps.view} target="_blank" rel="noopener noreferrer" className="link-underline">View on map ↗</a></li>
              </ul>
              <p className="mt-4 text-xs text-mute">Please message ahead to arrange a visit.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
