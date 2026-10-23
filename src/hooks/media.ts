import { useSyncExternalStore } from "react";

function media(query: string) {
  return {
    subscribe: (cb: () => void) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    get: () => window.matchMedia(query).matches,
  };
}

const reduced = media("(prefers-reduced-motion: reduce)");
const small = media("(max-width: 768px)");

export const useReducedMotion = () => useSyncExternalStore(reduced.subscribe, reduced.get, () => false);

/** Small screens or Save-Data users get the lighter mobile frame set. */
export const useLightSequence = () => {
  const isSmall = useSyncExternalStore(small.subscribe, small.get, () => false);
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return isSmall || saveData;
};
