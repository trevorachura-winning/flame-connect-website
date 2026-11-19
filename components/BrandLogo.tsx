import Image from "next/image";

/**
 * Flame Connect logo: the OFFICIAL lockup supplied by the brand owner
 * (19 Nov 2026): the flame-leaf mark, the FLAME CONNECT wordmark with its
 * navy circuit flourish and the "Digitizing Africa" tagline.
 *
 * Source files (transparent PNGs cut from the supplied artwork, single source
 * of truth; never redraw or recolour beyond the inverse below):
 *   public/brand/flame-connect-logo.png                   lockup, light surfaces
 *   public/brand/flame-connect-logo-inverse.png           lockup, dark surfaces
 *   public/brand/flame-connect-logo-tagline.png           lockup + tagline, light surfaces
 *   public/brand/flame-connect-logo-tagline-inverse.png   lockup + tagline, dark surfaces
 *   public/brand/flame-connect-mark.png                   mark only, square
 *
 * The inverse files only turn the navy circuit and tagline to near-white so
 * they read on navy; the orange is unchanged. The tagline version is for
 * sizes where its text stays readable (about 80px tall and up); smaller
 * placements such as the sticky header use the lockup without it.
 */
const RATIO = 1341 / 528;

export function BrandLogo({
  height = 40,
  variant = "full",
  tone = "light",
  tagline = false,
  priority = false,
}: {
  /** Rendered logo height in px. */
  height?: number;
  /** full = mark + wordmark; mark = flame-leaf mark only. */
  variant?: "full" | "mark";
  /** light = on white/light surfaces; dark = on navy surfaces. */
  tone?: "light" | "dark";
  /** Include the "Digitizing Africa" tagline (use at about 80px tall and up). */
  tagline?: boolean;
  /** Eagerly load (above-the-fold placements like the sticky header). */
  priority?: boolean;
}) {
  if (variant === "mark") {
    return (
      <Image
        src="/brand/flame-connect-mark.png"
        alt="Flame Connect"
        width={512}
        height={512}
        priority={priority}
        style={{ display: "block", height: `${height}px`, width: "auto" }}
      />
    );
  }

  const file = `/brand/flame-connect-logo${tagline ? "-tagline" : ""}${tone === "dark" ? "-inverse" : ""}.png`;
  return (
    <Image
      src={file}
      alt={tagline ? "Flame Connect. Digitizing Africa" : "Flame Connect"}
      width={1341}
      height={528}
      priority={priority}
      style={{ display: "block", height: `${height}px`, width: `${Math.round(height * RATIO)}px`, maxWidth: "100%", objectFit: "contain" }}
    />
  );
}
