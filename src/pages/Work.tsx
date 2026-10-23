import { Meta } from "@/components/Meta";
import { PortfolioGallery } from "@/components/WorkGrid";
import { DemoNotice, Lines, PageHero, Rv, TextLink } from "@/components/ui";

export default function Work() {
  return (
    <>
      <Meta
        title="Work"
        description="Browse STUDIO_X photography and cinematic film stories: weddings, pre-wedding, portraits, fashion, events and commercial work in Surat."
        path="/work"
      />
      <PageHero
        n="01"
        label="Work"
        title={["The work,", <span key="a" className="acc">in frames.</span>]}
        intro="Filter by category, then select any image to see it full screen."
      />
      <section className="sec-ink overflow-hidden pb-20 pt-10 md:pb-32 md:pt-16">
        <div className="container-x">
          <PortfolioGallery />
          <DemoNotice className="mt-16 border-t border-line pt-6" />
        </div>
      </section>
      <section className="sec-paper py-16 md:py-28">
        <div className="container-x">
          <Lines lines={["Imagining something", <span key="a" className="acc">of your own?</span>]} className="text-[clamp(2.8rem,8vw,8rem)]" />
          <Rv className="mt-8">
            <TextLink to="/contact#inquiry">Tell us about it</TextLink>
          </Rv>
        </div>
      </section>
    </>
  );
}
