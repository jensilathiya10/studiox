import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router";
import { reveal } from "@/hooks/reveal";
import { site } from "@/lib/site";

export const delayStyle = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/** Display headline whose lines rise out of a mask when scrolled into view. Wrap emphasis in <span className="acc">. */
export function Lines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  return (
    <Tag ref={reveal} className={`display rv-lines ${className}`} style={delayStyle(delay)}>
      {lines.map((l, i) => (
        <span key={i} className="ln" style={{ ["--i" as string]: i } as CSSProperties}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade-up wrapper. */
export function Rv({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
}: {
  as?: "div" | "p" | "ul" | "li" | "ol";
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <Tag ref={reveal} className={`rv ${className}`} style={delayStyle(delay)}>
      {children}
    </Tag>
  );
}

/** Numbered section marker: "(01) Selected work" */
export function Marker({ n, children, className = "" }: { n: string; children: ReactNode; className?: string }) {
  return (
    <Rv as="p" className={`eyebrow flex items-center gap-3 ${className}`}>
      <span className="acc tabular-nums">({n})</span>
      <span>{children}</span>
    </Rv>
  );
}

export function TextLink({ to, children, external }: { to: string; children: ReactNode; external?: boolean }) {
  const cls = "link-underline inline-flex items-center gap-3 text-[0.78rem] font-bold uppercase tracking-[0.18em]";
  const arrow = <span aria-hidden="true">{external ? "↗" : "→"}</span>;
  return external ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>
      {children} {arrow}
    </a>
  ) : (
    <Link to={to} className={cls}>
      {children} {arrow}
    </Link>
  );
}

/** Honest disclosure while the site uses licensed demonstration imagery. */
export function DemoNotice({ className = "" }: { className?: string }) {
  if (!site.showDemoNotice) return null;
  return (
    <p className={`max-w-xl text-xs text-mute ${className}`}>
      Most images here are licensed demonstration photographs, not STUDIO_X client work. The “Messy Clothes, Full
      Hearts” series is the studio’s own; the rest are being replaced.
    </p>
  );
}

/** Opening block for inner pages: marker, oversized headline, short intro, viewfinder corners. */
export function PageHero({
  n,
  label,
  title,
  intro,
  children,
}: {
  n: string;
  label: string;
  title: ReactNode[];
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="sec-paper relative overflow-hidden pb-14 pt-36 md:pb-20 md:pt-44">
      <span className="vf left-5 top-24 hidden md:block" aria-hidden="true" />
      <span className="vf right-5 top-24 hidden md:block" aria-hidden="true" />
      <div className="container-x">
        <div className="mb-8 md:mb-12">
          <Marker n={n}>{label}</Marker>
        </div>
        <Lines as="h1" lines={title} className="text-[clamp(3.2rem,12vw,11.5rem)]" />
        {intro && (
          <Rv as="p" delay={250} className="mt-8 max-w-xl text-lg text-mute md:mt-12 md:text-xl">
            {intro}
          </Rv>
        )}
        {children}
      </div>
    </section>
  );
}
