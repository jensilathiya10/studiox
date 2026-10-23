/**
 * Lets a page tell the header where "past the hero" is. The hero registers a
 * 1px sentinel at its bottom edge; the header turns solid once it scrolls above
 * the viewport. Pages without a hero fall back to a top-of-page sentinel.
 */
let el: Element | null = null;
const subs = new Set<() => void>();

export const headerSentinel = {
  set(next: Element | null) {
    el = next;
    subs.forEach((f) => f());
  },
  subscribe(cb: () => void) {
    subs.add(cb);
    return () => subs.delete(cb);
  },
  get: () => el,
};

/** Ref callback for the hero's bottom sentinel. */
export const heroSentinelRef = (node: Element | null) => {
  headerSentinel.set(node);
  return () => headerSentinel.set(null);
};
