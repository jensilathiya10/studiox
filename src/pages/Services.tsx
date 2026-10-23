import { Link } from "react-router";
import { Meta } from "@/components/Meta";
import { Picture } from "@/components/Picture";
import { Lines, PageHero, Rv } from "@/components/ui";
import { reveal } from "@/hooks/reveal";
import { services } from "@/lib/content";
import { images } from "@/lib/images";

export default function Services() {
  return (
    <>
      <Meta
        title="Photography & Film Services in Surat"
        description="Photography, cinematic videography, wedding and celebration coverage, portrait and fashion shoots, event coverage and commercial visual content from STUDIO_X in Surat."
        path="/services"
      />
      <PageHero
        n="02"
        label="Services"
        title={["Made around", <span key="a" className="acc">your story.</span>]}
        intro="Every project is different, so every package is built with you. We don’t publish fixed prices; tell us what you have in mind and we’ll put together a proposal."
      />

      {services.map((s, i) => {
        const dark = i % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} className={`${dark ? "sec-ink" : "sec-paper"} border-t border-line py-14 md:py-24`}>
            <div className="container-x grid items-center gap-10 md:grid-cols-12 md:gap-8">
              <div ref={reveal} className={`rv-mask arch-mask md:col-span-4 ${dark ? "md:order-2 md:col-start-9" : "md:col-start-1"}`}>
                <div className="arch aspect-[3/4] bg-paper-2">
                  <Picture img={images[s.image]} sizes="(min-width: 768px) 30vw, 90vw" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className={`md:col-span-7 ${dark ? "md:order-1 md:col-start-1" : "md:col-start-6"}`}>
                <Rv as="p" className="eyebrow">
                  <span className="acc tabular-nums">({String(i + 1).padStart(2, "0")})</span>
                </Rv>
                <Lines lines={[s.title]} className="mt-3 text-[clamp(2.4rem,6vw,6rem)] !leading-[0.92]" />
                <Rv as="p" delay={150} className="mt-6 max-w-xl text-lg">{s.long}</Rv>
                <Rv as="ul" delay={250} className="mt-6 max-w-xl space-y-2 border-t border-line pt-5 text-sm text-mute">
                  {s.includes.map((x) => (
                    <li key={x} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-current" />
                      {x}
                    </li>
                  ))}
                </Rv>
                <Link to={`/contact?service=${s.slug}#inquiry`} className="btn mt-8">
                  Inquire about this
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <section className="sec-red py-16 md:py-28">
        <div className="container-x grid gap-8 md:grid-cols-12">
          <Lines lines={["Custom", <span key="a" className="acc">packages.</span>]} className="text-[clamp(3rem,9vw,9rem)] md:col-span-7" />
          <Rv className="space-y-5 md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-lg">Need photography and film together, coverage across several days, or something that doesn’t fit a category? We’ll shape a package around your schedule and deliverables.</p>
            <p className="text-sm text-mute">Listed inclusions are a starting point, confirmed with you before any booking.</p>
            <Link to="/contact#inquiry" className="btn">Start an inquiry</Link>
          </Rv>
        </div>
      </section>
    </>
  );
}
