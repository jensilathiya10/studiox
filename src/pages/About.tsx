import { Meta } from "@/components/Meta";
import { Picture } from "@/components/Picture";
import { Lines, Marker, PageHero, Rv, TextLink } from "@/components/ui";
import { reveal } from "@/hooks/reveal";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const themes = [
  { title: "Eternal stories", body: "The moments that matter rarely repeat. We work to hold on to them: the glance across a room, the hands that never let go, the sound of a familiar laugh." },
  { title: "Lens artistry", body: "Light, composition and timing are craft. We treat every frame as something to be made with intention, not simply collected." },
  { title: "Cinematic storytelling", body: "Stills and films share one language. We think in sequences, pacing and atmosphere, so a gallery or a film reads like a story with a beginning, middle and end." },
];

export default function About() {
  return (
    <>
      <Meta
        title="About the Studio"
        description="STUDIO_X is a Surat photography and videography studio of visual storytellers, creating art in every frame through eternal stories, lens artistry and cinematic storytelling."
        path="/about"
      />
      <PageHero
        n="03"
        label="Studio"
        title={["Visual", <span key="a" className="acc">storytellers.</span>]}
        intro="STUDIO_X is a photography and videography studio in Surat, Gujarat, creating art in every frame."
      />

      <section className="sec-paper pb-16 md:pb-28">
        <div className="container-x grid items-end gap-10 md:grid-cols-12 md:gap-8">
          <div ref={reveal} className="rv-mask md:col-span-7">
            <div className="aspect-[3/2] overflow-hidden bg-paper-2">
              <Picture img={images.messy2} eager sizes="(min-width: 768px) 58vw, 100vw" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Rv as="p" className="serif-i text-4xl leading-[1.05] md:text-5xl">
              Our work begins with listening, and ends with something you’ll want to return to.
            </Rv>
            <Rv as="p" delay={150} className="mt-6 text-mute">
              We believe the most meaningful photographs do more than capture a moment. They bring you back to it. That shapes how we plan, how we shoot and how we edit.
            </Rv>
          </div>
        </div>
      </section>

      <section className="sec-ink py-16 md:py-28">
        <div className="container-x">
          <Marker n="01">What we believe in</Marker>
          <ol className="mt-10 border-t border-line">
            {themes.map((t, i) => (
              <Rv as="li" key={t.title} className="grid gap-3 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-12">
                <span className="acc text-xs font-bold tabular-nums md:col-span-1 md:pt-5">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="display text-[clamp(2.2rem,5.4vw,5.4rem)] md:col-span-7">{t.title}</h2>
                <p className="max-w-sm text-mute md:col-span-4 md:pt-3">{t.body}</p>
              </Rv>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec-paper py-16 md:py-28">
        <div className="container-x grid items-center gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Lines lines={["How we", <span key="a" className="acc">work.</span>]} className="text-[clamp(3.2rem,10vw,10rem)]" />
            <div className="mt-8 max-w-lg space-y-5 text-lg">
              <Rv as="p">We start by understanding the story you want told, the people involved and the feeling you hope to keep. On the day, we direct lightly and observe closely, so the pictures feel like you rather than a pose.</Rv>
              <Rv as="p" delay={120} className="text-mute">Every frame is then edited with restraint: natural skin tones, balanced highlights and shadows, and a consistent look from the first image to the last.</Rv>
            </div>
            <Rv className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <TextLink to="/work">See the work</TextLink>
              <TextLink to={site.instagram.url} external>Instagram</TextLink>
            </Rv>
          </div>
          <div ref={reveal} className="rv-mask arch-mask md:col-span-4 md:col-start-9">
            <div className="arch aspect-[3/4] bg-paper-2">
              <Picture img={images.weddingFields} sizes="(min-width: 768px) 30vw, 90vw" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="sec-red py-16 md:py-24">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Lines lines={["Your story", <span key="a" className="acc">deserves telling.</span>]} className="text-[clamp(2.8rem,8vw,8rem)]" />
          <Rv>
            <TextLink to="/contact#inquiry">Start a conversation</TextLink>
          </Rv>
        </div>
      </section>
    </>
  );
}
