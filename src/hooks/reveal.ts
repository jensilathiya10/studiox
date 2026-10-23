let io: IntersectionObserver | null = null;

function observer() {
  io ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io?.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  return io;
}

/**
 * Ref callback: reveals the element once, the first time it enters the viewport.
 * Usage: <div ref={reveal} className="rv">…</div>  (also .rv-lines, .rv-mask)
 */
export function reveal(el: Element | null) {
  if (!el) return;
  const o = observer();
  o.observe(el);
  return () => o.unobserve(el);
}
