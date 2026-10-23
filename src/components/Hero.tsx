import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { Picture } from "@/components/Picture";
import { heroSentinelRef } from "@/lib/headerSentinel";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const SEEN_KEY = "sx-hero-seen";
const SIZES = "(min-width: 768px) 34vw, 62vw";

const set = (ext: string) => [480, 720, 960, 1200].map((w) => `/hero/hero-${w}.${ext} ${w}w`).join(", ");
const hd = (s: number) => ({ ["--hd" as string]: `${s}s` }) as CSSProperties;

/** Splits a line into words; each word rises out of its own mask. */
function Words({ text, from = 0, className = "" }: { text: string; from?: number; className?: string }) {
  return (
    <span className={`block ${className}`}>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="hero-word">
            <span style={{ ["--w" as string]: from + i } as CSSProperties}>{w}</span>
          </span>{" "}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  // The full entrance plays once per browser session, never on return visits to the homepage.
  const [seen] = useState(() => {
    try {
      return sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* private mode: the entrance simply replays */
    }
  }, []);

  // Pointer depth, desktop only: the arch and the small image drift a few pixels in opposite
  // directions. rAF runs only while the pointer is moving.
  const stage = useRef<HTMLElement>(null);
  const archLayer = useRef<HTMLDivElement>(null);
  const smallLayer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stage.current;
    const a = archLayer.current;
    const s = smallLayer.current;
    if (!el || !a || !s) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      a.style.transform = `translate3d(${(-x * 0.5).toFixed(2)}px, ${(-y * 0.5).toFixed(2)}px, 0)`;
      s.style.transform = `translate3d(${(x * 0.9).toFixed(2)}px, ${(y * 0.9).toFixed(2)}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.05 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      if (e.clientY > r.bottom || e.clientY < r.top) return;
      tx = ((e.clientX - r.left) / r.width - 0.5) * 24;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 16;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={stage}
      data-hero
      aria-label="STUDIO_X, photography and cinematic films"
      className={`sec-paper relative isolate flex min-h-svh flex-col overflow-hidden md:block md:h-svh md:min-h-[35rem] ${seen ? "hero-seen" : ""}`}
    >
      {/* viewfinder corner marks */}
      <span className="vf left-5 top-[5.5rem] hidden md:block" aria-hidden="true" />
      <span className="vf right-5 top-[5.5rem] hidden md:block" aria-hidden="true" />
      <span className="vf bottom-5 left-5 hidden md:block" aria-hidden="true" />
      <span className="vf bottom-5 right-5 hidden md:block" aria-hidden="true" />

      {/* Left column: headline, tagline, round CTA */}
      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pt-[calc(var(--header-h)+0.75rem)] md:h-full md:max-w-[68%] md:pt-[var(--header-h)] md:pr-0 md:[margin-inline:0]">
        <p className="hero-fade eyebrow mb-4 md:mb-6" style={hd(0.1)}>
          Photography &amp; cinematic films · {site.address.locality}, India
        </p>
        <h1 className="display text-[clamp(3rem,15.5vw,5.2rem)] md:text-[clamp(3.2rem,min(10.2vw,19svh),11rem)]">
          <Words text="We make" />
          <Words text="moments" from={2} />
          <Words text="immortal." from={3} className="acc" />
        </h1>
        <div className="mt-6 flex items-center gap-5 md:mt-9 md:gap-8">
          <Link to="/work" className="cta-round hero-pop" style={hd(1.05)} aria-label="Explore the work">
            <span>Explore</span>
            <span aria-hidden="true">↘</span>
          </Link>
          <p className="hero-fade serif-i max-w-[11rem] text-2xl leading-tight md:max-w-xs md:text-3xl" style={hd(1.2)}>
            {site.tagline}
          </p>
        </div>
      </div>

      {/* Arch photograph (the LCP element; preloaded from index.html) */}
      <div className="relative z-0 mx-auto mb-7 h-[40svh] w-[64vw] shrink-0 md:absolute md:bottom-10 md:right-[var(--gutter)] md:top-[calc(var(--header-h)+1.25rem)] md:mx-0 md:mb-0 md:h-auto md:w-[min(34vw,31rem)] md:shrink">
        <div ref={archLayer} className="h-full w-full will-change-transform">
          <div className="hero-arch arch h-full w-full bg-paper-2">
            <div className="hero-arch-img h-full w-full">
              <picture>
                <source type="image/avif" srcSet={set("avif")} sizes={SIZES} />
                <source type="image/webp" srcSet={set("webp")} sizes={SIZES} />
                <img
                  src="/hero/hero-960.webp"
                  width={1200}
                  height={1600}
                  alt="A smiling bride and groom wearing marigold and rose garlands, her head resting against his, in warm evening light"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </picture>
            </div>
          </div>
        </div>

        {/* Secondary image: overlaps the arch's lower-left edge for depth */}
        <div ref={smallLayer} className="absolute -left-[22%] bottom-[8%] z-10 w-[34%] will-change-transform md:-left-[30%] md:bottom-[9%] md:w-[40%]">
          <div className="hero-fade overflow-hidden border-[5px] border-paper bg-paper-2 shadow-[0_12px_40px_-12px_rgb(18_17_16/0.45)]" style={hd(0.9)}>
            <Picture img={images.weddingIvory} eager sizes="(min-width: 768px) 14vw, 22vw" className="aspect-[4/5] h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <div ref={heroSentinelRef} aria-hidden="true" className="absolute bottom-0 h-px w-px" />
    </section>
  );
}
