import { Link } from "react-router";
import { ContactForm } from "@/components/ContactForm";
import { FilmShowcase } from "@/components/FilmShowcase";
import Hero from "@/components/Hero";
import { Meta } from "@/components/Meta";
import { Picture } from "@/components/Picture";
import { ServicesIndex } from "@/components/ServicesIndex";
import { DemoNotice, Lines, Marker, Rv, TextLink } from "@/components/ui";
import { FeaturedWork } from "@/components/WorkGrid";
import { reveal } from "@/hooks/reveal";
import { instagramTiles } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const featured = ["messy-ii", "garlands", "midnight-stroller", "walking-toward", "carved-doors", "the-procession"];

export default function Home() {
  return (
    <>
      <Meta
        title="STUDIO_X"
        description="STUDIO_X is a photography and cinematic film studio in Surat, Gujarat, creating wedding, portrait, event and commercial stories. Your Story. Our Vision."
        path="/"
      />
      <Hero />

      {/* 01 · Selected work */}
      <section id="work" className="sec-ink overflow-hidden py-16 md:py-28">
        <div className="container-x">
          <Marker n="01">Selected work</Marker>
          <div className="mt-6 flex flex-col justify-between gap-8 md:mb-8 md:flex-row md:items-end">
            <Lines lines={["Selected", <span key="w" className="acc">work.</span>]} className="text-[clamp(3.4rem,13vw,13rem)]" />
            <Rv className="max-w-xs space-y-5 md:pb-4">
              <p className="text-mute">Weddings, portraits, events and films, composed as stories. Select any image to view it full screen.</p>
              <TextLink to="/work">View all work</TextLink>
            </Rv>
          </div>
          <div className="mt-10 md:mt-20">
            <FeaturedWork ids={featured} />
          </div>
          <DemoNotice className="mt-16" />
        </div>
      </section>

      {/* 02 · Studio story */}
      <section className="sec-paper cv overflow-hidden py-16 md:py-28">
        <div className="container-x">
          <Marker n="02">Studio</Marker>
          <Lines
            lines={["Behind every frame,", <span key="f" className="acc">there is a feeling.</span>]}
            className="mt-6 text-[clamp(2.7rem,8.6vw,9rem)]"
          />
          <div className="mt-12 grid items-end gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
            <div ref={reveal} className="rv-mask arch-mask md:col-span-4">
              <div className="arch aspect-[3/4] bg-paper-2">
                <Picture img={images.preClay} sizes="(min-width: 768px) 30vw, 90vw" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-4 md:col-start-6 md:pb-6">
              <Rv as="p" className="serif-i text-4xl leading-[1.05] md:text-5xl">
                We look for the quiet in-between moments.
              </Rv>
              <Rv as="p" delay={150} className="mt-6 text-lg text-mute">
                STUDIO_X is a photography and videography studio in Surat. The glance, the laugh, the hands that hold on: we shape them into photographs and films you’ll want to return to. Visual stories, not just photographs.
              </Rv>
              <Rv delay={250} className="mt-8">
                <TextLink to="/about">About the studio</TextLink>
              </Rv>
            </div>
            <div ref={reveal} className="rv-mask md:col-span-3 md:col-start-10">
              <div className="aspect-[4/5] overflow-hidden bg-paper-2">
                <Picture img={images.preGarden} sizes="(min-width: 768px) 24vw, 70vw" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 · Services */}
      <section className="sec-paper cv border-t border-line py-16 md:py-28">
        <div className="container-x">
          <Marker n="03">Services</Marker>
          <div className="mb-10 mt-6 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <Lines lines={["What we", <span key="m" className="acc">make.</span>]} className="text-[clamp(3.2rem,11vw,11rem)]" />
            <Rv className="max-w-xs space-y-5 md:pb-3">
              <p className="text-mute">Choose a starting point, or tell us something entirely different. Every row opens an inquiry.</p>
              <TextLink to="/services">Services in detail</TextLink>
            </Rv>
          </div>
          <ServicesIndex />
        </div>
      </section>

      {/* 04 · Film */}
      <FilmShowcase />

      {/* 05 · Instagram */}
      <section className="sec-paper cv overflow-hidden py-16 md:py-28">
        <div className="container-x">
          <Marker n="05">Instagram</Marker>
          <div className="mb-10 mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Lines lines={["Follow the", <span key="s" className="acc">stories.</span>]} className="text-[clamp(3rem,10vw,10rem)]" />
            <Rv>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline text-[0.78rem] font-bold uppercase tracking-[0.18em]">
                Follow the stories on Instagram ↗
              </a>
            </Rv>
          </div>
        </div>
        {/* native horizontal scroller: keyboard-focusable, no snapping */}
        <ul className="hscroll flex gap-4 px-[var(--gutter)] pb-5" tabIndex={0} aria-label="Instagram gallery, scroll horizontally">
          {instagramTiles.map((t, i) => {
            const img = images[t.image];
            return (
              <li key={`${t.image}-${i}`} className="w-[min(62vw,17rem)] shrink-0">
                <a
                  href={t.href ?? site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open STUDIO_X on Instagram. Image: ${img.alt}`}
                  className={`group relative block aspect-[4/5] overflow-hidden bg-paper-2 ${i % 2 ? "mt-8" : ""}`}
                >
                  <Picture img={img} alt="" sizes="(min-width: 768px) 272px, 62vw" className="zoom-img h-full w-full object-cover" />
                  <span className="cap absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent p-3 pt-10 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-paper">
                    Instagram <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="container-x">
          <DemoNotice className="mt-4" />
        </div>
      </section>

      {/* 06 · Contact */}
      <section id="inquiry" className="sec-red cv overflow-hidden py-16 md:py-28">
        <div className="container-x">
          <Marker n="06">Contact</Marker>
          <Lines
            lines={["Let’s create", "something", <span key="u" className="acc">unforgettable.</span>]}
            className="mt-6 text-[clamp(3rem,11.4vw,12rem)]"
          />
          <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-4">
              <Rv as="p" className="max-w-xs text-xl">Have a story in mind? We’d love to hear about it.</Rv>
              <Rv delay={150} className="mt-8 space-y-3 text-sm font-semibold">
                <p>
                  <a href={site.instagram.dm} target="_blank" rel="noopener noreferrer" className="link-underline">Message us on Instagram ↗</a>
                </p>
                {site.contact.email && (
                  <p><a href={`mailto:${site.contact.email}`} className="link-underline">{site.contact.email}</a></p>
                )}
                <p className="font-normal text-mute">{site.address.locality}, {site.address.region}, {site.address.country}</p>
                <p>
                  <Link to="/contact" className="link-underline">Full contact details →</Link>
                </p>
              </Rv>
            </div>
            <div className="sec-paper p-6 md:col-span-7 md:col-start-6 md:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
