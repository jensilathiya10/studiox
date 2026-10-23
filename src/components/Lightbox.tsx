import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Img } from "@/lib/images";
import { Picture } from "./Picture";

export type LightboxItem = { img: Img; title: string; meta?: string };

type Props = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onChange: (next: number) => void;
};

/**
 * Accessible lightbox on the native <dialog>: focus trap and restoration and
 * Escape come from the browser. Adds arrow keys, swipe, click-outside and
 * neighbour preloading. Loaded on first open via dynamic import.
 */
export default function Lightbox({ items, index, onClose, onChange }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [dir, setDir] = useState(1);
  const open = index !== null;
  const count = items.length;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);

  // Scroll lock lives in its own effect so it can never be left behind.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (step: number) => {
    if (index === null || count < 2) return;
    setDir(step);
    onChange((index + step + count) % count);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  };
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") touch.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = touch.current;
    touch.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
  };

  const item = index !== null ? items[index] : null;
  const next = index !== null ? items[(index + 1) % count] : null;
  const prev = index !== null ? items[(index - 1 + count) % count] : null;

  return (
    <dialog
      ref={ref}
      className="lightbox sec-ink"
      aria-label={item ? `${item.title}, image ${(index ?? 0) + 1} of ${count}` : "Image viewer"}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {item && (
        <div className="flex h-full flex-col" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          <div className="flex items-center justify-between px-[var(--gutter)] py-4 text-sm">
            <p className="text-mute" aria-live="polite">
              <span className="text-fg">{String((index ?? 0) + 1).padStart(2, "0")}</span>
              {" / "}
              {String(count).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="link-underline -mr-3 flex min-h-12 items-center px-3 text-xs uppercase tracking-[0.2em]"
              autoFocus
            >
              Close
            </button>
          </div>

          <div className="relative min-h-0 flex-1 touch-pan-y px-2 sm:px-[var(--gutter)]">
            <div
              key={item.img.set.img.src}
              className="lb-slide flex h-full w-full items-center justify-center"
              style={{ ["--dx" as string]: `${dir * 28}px` } as CSSProperties}
            >
              <Picture img={item.img} sizes="100vw" eager className="h-full w-full object-contain" />
            </div>

            {count > 1 && (
              <>
                <button type="button" aria-label="Previous image" onClick={() => go(-1)} className="absolute left-0 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center text-2xl text-fg/80 transition-colors hover:text-vermilion sm:left-3">
                  <span aria-hidden="true">←</span>
                </button>
                <button type="button" aria-label="Next image" onClick={() => go(1)} className="absolute right-0 top-1/2 grid h-14 w-14 -translate-y-1/2 place-items-center text-2xl text-fg/80 transition-colors hover:text-vermilion sm:right-3">
                  <span aria-hidden="true">→</span>
                </button>
              </>
            )}
          </div>

          <div className="px-[var(--gutter)] py-5 text-center">
            <p className="display text-2xl [font-stretch:92%]">{item.title}</p>
            {item.meta && <p className="mt-1 text-xs uppercase tracking-[0.2em] text-mute">{item.meta}</p>}
          </div>

          {/* Preload neighbours so paging feels instant. */}
          <div className="sr-only-x" aria-hidden="true">
            {[next, prev].map(
              (n) => n && n.img !== item.img && <Picture key={n.img.set.img.src} img={n.img} alt="" sizes="100vw" eager />,
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
