import { useState } from "react";
import { Link } from "react-router";
import { services } from "@/lib/content";
import { images } from "@/lib/images";
import { Picture } from "./Picture";

/**
 * Large-type service index. On desktop, hovering or focusing a row swaps the
 * arch-shaped preview on the right. On touch every row is simply a link with
 * its own small thumbnail: nothing is hover-only.
 */
export function ServicesIndex() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <ul className="border-t border-line md:col-span-8">
        {services.map((s, i) => (
          <li key={s.slug} className="border-b border-line">
            <Link
              to={`/contact?service=${s.slug}#inquiry`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2 py-5 md:gap-x-8 md:py-7"
            >
              <span className="self-start pt-2 text-xs font-bold tabular-nums text-mute md:pt-4">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="proj-title display block text-[clamp(1.9rem,5.4vw,5.2rem)] !leading-[0.95]">{s.title}</span>
                <span className="mt-2 block max-w-lg text-sm text-mute md:text-base">{s.short}</span>
              </span>
              <span className="flex items-center gap-4">
                <span className="arch block h-24 w-16 shrink-0 bg-paper-2 md:hidden" aria-hidden="true">
                  <Picture img={images[s.image]} alt="" sizes="64px" className="h-full w-full object-cover" />
                </span>
                <span className="hidden md:block" aria-hidden="true"><span className="proj-arrow">→</span></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="relative hidden md:col-span-4 md:block" aria-hidden="true">
        <div className="arch sticky top-28 aspect-[3/4] w-full bg-paper-2">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className={`absolute inset-0 transition-[opacity,transform] duration-[800ms] [transition-timing-function:var(--ease)] ${
                i === active ? "scale-100 opacity-100" : "scale-[1.05] opacity-0"
              }`}
            >
              <Picture img={images[s.image]} alt="" sizes="30vw" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
