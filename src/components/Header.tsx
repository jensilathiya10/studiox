import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { nav, site } from "@/lib/site";
import { headerSentinel } from "@/lib/headerSentinel";

const SEEN_KEY = "sx-hero-seen";

export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  // The wordmark settles into place once per session.
  const [settle] = useState(() => {
    try {
      return sessionStorage.getItem(SEEN_KEY) !== "1";
    } catch {
      return true;
    }
  });
  const topSentinel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const heroSentinel = useSyncExternalStore(headerSentinel.subscribe, headerSentinel.get, () => null);

  // Close the menu whenever the route changes.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Transparent over the hero; solid once the hero (or, elsewhere, the first pixels) has scrolled past.
  useEffect(() => {
    const el = heroSentinel ?? topSentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSolid(e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [heroSentinel, pathname]);

  // Mobile menu: scroll lock, Escape, focus trap, focus return.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const btn = toggle.current;
    const focusables = () => Array.from(menu.current?.querySelectorAll<HTMLElement>("a[href]") ?? []).concat(btn ? [btn] : []);
    const focusTimer = window.setTimeout(() => menu.current?.querySelector<HTMLElement>("a[href]")?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      btn?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <div ref={topSentinel} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-px w-px" />
      <header
        className={`fixed inset-x-0 top-0 z-50 text-ink transition-[background-color,border-color] duration-500 ${
          solid && !open ? "border-b border-ink/15 bg-paper" : "border-b border-transparent"
        } ${open ? "text-paper" : ""}`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between">
          <Link
            to="/"
            aria-label={`${site.name} home`}
            className={`relative z-[60] font-display text-[1.35rem] font-extrabold uppercase [font-stretch:84%] ${settle ? "wordmark-settle" : "tracking-[0.02em]"}`}
          >
            <span className="flex items-center gap-3">
              <img src={open ? "/logo-paper.png" : "/logo-ink.png"} width="48" height="20" alt="" className="h-5 w-auto" />
              <span className="wordmark">STUDIO<span className="acc">_</span>X</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} className="nav-link link-underline text-[0.8rem] font-bold uppercase tracking-[0.16em]">
                {item.label}
              </NavLink>
            ))}
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[0.8rem] font-bold uppercase tracking-[0.16em]"
            >
              Instagram ↗
            </a>
          </nav>

          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-[60] -mr-3 flex h-12 items-center gap-3 px-3 text-[0.8rem] font-bold uppercase tracking-[0.16em] md:hidden"
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-2.5 w-6">
              <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menu}
        inert={!open}
        className={`sec-ink fixed inset-0 z-40 flex flex-col justify-between px-[var(--gutter)] pb-10 pt-28 md:hidden ${
          open
            ? "visible opacity-100 [transition:opacity_400ms_ease,visibility_0s_linear_0s]"
            : "invisible opacity-0 [transition:opacity_400ms_ease,visibility_0s_linear_400ms]"
        }`}
      >
        <nav aria-label="Mobile">
          <ul>
            {[{ to: "/", label: "Home" }, ...nav].map((item, i) => (
              <li key={item.to} className="overflow-hidden border-b border-line">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  style={{ transitionDelay: open ? `${100 + i * 70}ms` : "0ms" }}
                  className={({ isActive }) =>
                    `display block py-3 text-[clamp(2.8rem,14vw,4.6rem)] transition-transform duration-700 [transition-timing-function:var(--ease)] ${
                      isActive ? "text-vermilion" : ""
                    } ${open ? "translate-y-0" : "translate-y-full"}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2 text-sm text-mute">
          <p>
            {site.address.locality}, {site.address.region}, {site.address.country}
          </p>
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline text-fg">
            Instagram @{site.instagram.handle} ↗
          </a>
        </div>
      </div>
    </>
  );
}
