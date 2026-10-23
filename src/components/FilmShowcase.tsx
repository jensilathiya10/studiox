import { lazy, Suspense, useRef, useState } from "react";
import { Lines, Marker, Rv } from "@/components/ui";
import { reveal } from "@/hooks/reveal";
import { films, type Film } from "@/lib/content";

const FilmDialog = lazy(() => import("./FilmDialog"));

/**
 * "Stories in motion." Pick a film, press play: it opens in an accessible
 * dialog with the browser's own controls. Nothing autoplays and no video bytes
 * load until play is pressed (only the small poster images are fetched).
 */
export function FilmShowcase() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<Film | null>(null);
  const playBtn = useRef<HTMLButtonElement>(null);
  const film = films[active];
  const portrait = film.ratio === "9 / 16";

  const close = () => {
    setPlaying(null);
    requestAnimationFrame(() => playBtn.current?.focus()); // return focus to the control that opened it
  };

  return (
    <section className="sec-ink cv overflow-hidden py-16 md:py-28">
      <div className="container-x">
        <Marker n="04">Film</Marker>
        <Lines lines={["Stories", <span key="m" className="acc">in motion.</span>]} className="mt-6 text-[clamp(3.4rem,13vw,13rem)]" />

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end md:gap-10">
          <div ref={reveal} className="rv-mask md:col-span-8">
            <div className="flex items-center justify-center bg-ink-2" style={{ aspectRatio: "16 / 9" }}>
              <div className="relative h-full overflow-hidden" style={{ aspectRatio: film.ratio, maxWidth: "100%" }}>
                <img
                  key={film.id}
                  src={film.poster}
                  width={portrait ? 720 : 1280}
                  height={portrait ? 1280 : 720}
                  alt={`Poster frame from the ${film.title.toLowerCase()}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-ink/15" />
                <button
                  ref={playBtn}
                  type="button"
                  onClick={() => setPlaying(film)}
                  aria-haspopup="dialog"
                  aria-label={`Play ${film.title}, ${film.length}`}
                  className="group absolute inset-0 grid place-items-center"
                >
                  <span className="cta-round !w-24 group-hover:scale-105">
                    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="ml-1">
                      <path d="M6 4l14 8-14 8z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <Rv as="p" className="max-w-sm text-lg text-mute">
              Real moments, natural sound and careful editing, so you can feel the day again.
            </Rv>
            <ul className="mt-8 border-t border-line">
              {films.map((f, i) => (
                <li key={f.id} className="border-b border-line">
                  <button
                    type="button"
                    aria-pressed={i === active}
                    onClick={() => setActive(i)}
                    className="group flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span className="text-xs font-bold tabular-nums text-mute">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">
                      <span className={`display block text-[clamp(1.4rem,2.4vw,2rem)] [font-stretch:90%] transition-colors ${i === active ? "text-[#ee6a49]" : ""}`}>
                        {f.title}
                      </span>
                      <span className="text-xs text-mute">
                        {f.length} · {f.ratio === "9 / 16" ? "Vertical" : "Landscape"} · {f.size}
                      </span>
                    </span>
                    <span aria-hidden="true" className={`proj-arrow !h-9 !w-9 ${i === active ? "!bg-[#b73e24] !border-[#b73e24] !text-paper" : ""}`}>→</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {playing && (
        <Suspense fallback={null}>
          <FilmDialog src={playing.src} poster={playing.poster} title={playing.title} onClose={close} />
        </Suspense>
      )}
    </section>
  );
}
