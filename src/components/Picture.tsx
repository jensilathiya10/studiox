import type { Img } from "@/lib/images";

type Props = {
  img: Img;
  /** Required: tells the browser which candidate to download. */
  sizes: string;
  eager?: boolean;
  className?: string;
  alt?: string;
};

/** AVIF → WebP → JPEG-less responsive image with intrinsic width/height (no layout shift). */
export function Picture({ img, sizes, eager = false, className = "", alt }: Props) {
  const { set } = img;
  return (
    <picture>
      <source type="image/avif" srcSet={set.sources.avif} sizes={sizes} />
      <source type="image/webp" srcSet={set.sources.webp} sizes={sizes} />
      <img
        src={set.img.src}
        width={set.img.w}
        height={set.img.h}
        alt={alt ?? img.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
