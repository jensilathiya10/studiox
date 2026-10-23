import { lazy, Suspense, useMemo, useState, type CSSProperties } from "react";
import { useSearchParams } from "react-router";
import { images } from "@/lib/images";
import { categories, categoryLabel, projects as allProjects, type CategorySlug, type Project } from "@/lib/content";
import { reveal } from "@/hooks/reveal";
import type { LightboxItem } from "./Lightbox";
import { Picture } from "./Picture";

// Loaded the first time any image is opened.
const Lightbox = lazy(() => import("./Lightbox"));

const toItem = (p: Project): LightboxItem => ({
  img: images[p.image],
  title: p.title,
  meta: [categoryLabel(p.category), p.note].filter(Boolean).join(" · "),
});

/** Owns lightbox state; mounts the lightbox chunk only after the first open. */
function useViewer(items: LightboxItem[]) {
  const [index, setIndex] = useState<number | null>(null);
  const [everOpened, setEverOpened] = useState(false);
  const open = (i: number) => {
    setEverOpened(true);
    setIndex(i);
  };
  const viewer = everOpened ? (
    <Suspense fallback={null}>
      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onChange={setIndex} />
    </Suspense>
  ) : null;
  return { open, viewer };
}

/** Pointer position inside a tile → --mx (-1..1) so the title can drift with it. rAF-free: one style write per move. */
const follow = (e: React.PointerEvent<HTMLElement>) => {
  if (e.pointerType !== "mouse") return;
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
};
const unfollow = (e: React.PointerEvent<HTMLElement>) => e.currentTarget.style.setProperty("--mx", "0");

/* ------------------------------------------------------------------ *
 * Home: overlapping editorial collage with oversized titles
 * ------------------------------------------------------------------ */
type Slot = { wrap: string; image: string; title: string };

// Each slot places an image on the 12-column grid and tells its title where to overlap it.
const slots: Slot[] = [
  { wrap: "md:col-span-12", image: "", title: "md:left-[1%] md:bottom-[-0.3em]" },
  { wrap: "md:col-span-5 md:col-start-1 md:mt-4", image: "", title: "md:left-[-3%] md:bottom-[-0.3em]" },
  { wrap: "md:col-span-5 md:col-start-8 md:mt-24", image: "", title: "md:right-[-3%] md:bottom-[-0.3em] md:text-right" },
  { wrap: "md:col-span-4 md:col-start-2 md:mt-4", image: "", title: "md:left-[-3%] md:bottom-[-0.3em]" },
  { wrap: "md:col-span-5 md:col-start-7 md:mt-20", image: "", title: "md:right-[-3%] md:bottom-[-0.3em] md:text-right" },
  { wrap: "md:col-span-4 md:col-start-1 md:mt-4", image: "", title: "md:left-[-3%] md:bottom-[-0.3em]" },
];

function Feature({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  const slot = slots[i % slots.length];
  const img = images[p.image];
  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerMove={follow}
      onPointerLeave={unfollow}
      aria-haspopup="dialog"
      className={`group relative block w-full text-left ${slot.wrap}`}
    >
      <span ref={reveal} className="rv-mask block">
        <span className="relative block overflow-hidden bg-ink-2" style={{ aspectRatio: p.ratio }}>
          <Picture
            img={img}
            alt=""
            sizes={i % 2 === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 36vw, 100vw"}
            className="zoom-img h-full w-full object-cover"
          />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/55 to-transparent md:h-1/4" />
        </span>
      </span>
      <span
        className={`pointer-events-none mt-4 flex items-end justify-between gap-4 md:absolute md:z-10 md:mt-0 md:block md:w-[106%] ${slot.title}`}
      >
        <span className="block">
          <span className="eyebrow mb-1 block md:mb-2">
            <span className="acc tabular-nums">{String(i + 1).padStart(2, "0")}</span> · {categoryLabel(p.category)}
          </span>
          <span className="proj-title display block text-[clamp(2.1rem,5.6vw,5.6rem)] [text-wrap:balance] [text-shadow:0_2px_30px_rgb(18_17_16/0.35)]">
            {p.title}
          </span>
        </span>
        <span className="mb-1 shrink-0 md:hidden" aria-hidden="true"><span className="proj-arrow">→</span></span>
      </span>
      <span className="sr-only-x">. View image: {img.alt}</span>
    </button>
  );
}

export function FeaturedWork({ ids }: { ids: string[] }) {
  const list = useMemo(() => ids.map((id) => allProjects.find((p) => p.id === id)).filter((p): p is Project => !!p), [ids]);
  const items = useMemo(() => list.map(toItem), [list]);
  const { open, viewer } = useViewer(items);

  return (
    <>
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-12 md:gap-y-16">
        {list.map((p, i) => (
          <Feature key={p.id} p={p} i={i} onOpen={() => open(i)} />
        ))}
      </div>
      {viewer}
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Work page: filter in big type + a pattern grid (CSS grid, no columns)
 * ------------------------------------------------------------------ */
const pattern = [
  "md:col-span-5",
  "md:col-span-4 md:mt-16",
  "md:col-span-3 md:mt-6",
  "md:col-span-4",
  "md:col-span-4 md:mt-12",
  "md:col-span-4 md:mt-4",
];
/** Panoramic frames get a full row; everything else cycles through the pattern. */
const spanFor = (p: Project, i: number) => (/^\d+ \/ \d+$/.test(p.ratio) && eval_ratio(p.ratio) > 2 ? "md:col-span-12" : pattern[i % pattern.length]);
const eval_ratio = (r: string) => {
  const [a, b] = r.split("/").map((n) => Number(n.trim()));
  return a / b;
};

function Tile({ p, onOpen, delay, eager, sizes }: { p: Project; onOpen: () => void; delay: number; eager: boolean; sizes: string }) {
  const img = images[p.image];
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      style={{ ["--d" as string]: `${delay}ms` } as CSSProperties}
      className="group tile-in block w-full text-left"
    >
      <span className="relative block overflow-hidden bg-ink-2" style={{ aspectRatio: p.ratio }}>
        <Picture img={img} alt="" sizes={sizes} eager={eager} className="zoom-img h-full w-full object-cover" />
        <span className="cap absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-4 pt-20 text-paper">
          <span>
            <span className="block text-[0.68rem] font-bold uppercase tracking-[0.2em] text-paper/80">{categoryLabel(p.category)}</span>
            <span className="display mt-1 block text-[clamp(1.5rem,2.4vw,2.2rem)] [font-stretch:92%]">{p.title}</span>
          </span>
          <span className="proj-arrow !h-10 !w-10 shrink-0 text-paper" aria-hidden="true">→</span>
        </span>
      </span>
      <span className="sr-only-x">. View image: {img.alt}</span>
    </button>
  );
}

export function PortfolioGallery() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("c");
  const filter: CategorySlug | "all" = categories.some((c) => c.slug === raw) ? (raw as CategorySlug) : "all";

  const list = useMemo(() => (filter === "all" ? allProjects : allProjects.filter((p) => p.category === filter)), [filter]);
  const items = useMemo(() => list.map(toItem), [list]);
  const { open, viewer } = useViewer(items);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of allProjects) m.set(p.category, (m.get(p.category) ?? 0) + 1);
    return m;
  }, []);
  const tabs: { slug: CategorySlug | "all"; label: string; n: number }[] = [
    { slug: "all", label: "All", n: allProjects.length },
    ...categories.map((c) => ({ slug: c.slug, label: c.label, n: counts.get(c.slug) ?? 0 })),
  ];
  const select = (slug: CategorySlug | "all") => setParams(slug === "all" ? {} : { c: slug }, { preventScrollReset: true });

  return (
    <>
      <div role="group" aria-label="Filter work by category" className="flex flex-wrap gap-x-7 gap-y-1 border-b border-line pb-6">
        {tabs.map((t) => {
          const active = filter === t.slug;
          return (
            <button
              key={t.slug}
              type="button"
              aria-pressed={active}
              onClick={() => select(t.slug)}
              className={`display min-h-11 text-[clamp(1.4rem,2.6vw,2.4rem)] [font-stretch:90%] transition-colors duration-300 ${active ? "text-[#ee6a49]" : "text-fg/70 hover:text-fg"}`}
            >
              {t.label}
              <sup className="ml-1 text-[0.45em] font-bold tracking-normal tabular-nums">{String(t.n).padStart(2, "0")}</sup>
            </button>
          );
        })}
      </div>

      <p className="sr-only-x" role="status" aria-live="polite">
        Showing {list.length} {list.length === 1 ? "image" : "images"}
        {filter !== "all" ? ` in ${categoryLabel(filter)}` : ""}
      </p>

      {/* key restarts the CSS fade whenever the filter changes */}
      <div key={filter} className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-12 md:gap-y-12">
        {list.map((p, i) => (
          <div key={p.id} className={spanFor(p, i)}>
            <Tile
              p={p}
              delay={Math.min(i, 6) * 60}
              eager={i < 2}
              onOpen={() => open(i)}
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>
        ))}
      </div>
      {viewer}
    </>
  );
}
