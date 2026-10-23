import { useEffect, useRef } from "react";

/**
 * Accessible film player in a native <dialog>. Loaded only when the visitor
 * presses play (dynamic import) and never autoplays: playback is the
 * visitor's choice through the browser's own controls.
 */
export default function FilmDialog({ src, poster, title, onClose }: { src: string; poster?: string; title: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  // Open modally on mount; always closed on unmount.
  useEffect(() => {
    const d = ref.current;
    const v = video.current;
    if (d && !d.open) d.showModal();
    return () => {
      v?.pause();
      if (d?.open) d.close();
    };
  }, []);

  // Scroll lock lives in its own effect so it can never be left behind.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="lightbox sec-ink"
      aria-label={title}
      onCancel={(e) => {
        // Escape: let React unmount us (which closes the dialog) instead of closing natively.
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-[var(--gutter)] py-4 text-sm">
          <p className="display text-xl [font-stretch:92%]">{title}</p>
          <button type="button" onClick={onClose} autoFocus className="link-underline -mr-3 flex min-h-12 items-center px-3 text-xs uppercase tracking-[0.2em]">
            Close
          </button>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center px-2 pb-6 sm:px-[var(--gutter)]">
          <video ref={video} controls playsInline preload="metadata" poster={poster} src={src} className="max-h-full max-w-full bg-black">
            Your browser can’t play this video.
          </video>
        </div>
      </div>
    </dialog>
  );
}
