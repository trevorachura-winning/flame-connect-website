import Image from "next/image";

/**
 * Flame Connect brand lockup — built from the OFFICIAL logo artwork supplied
 * by the brand owner (Sept 2026): the flame-leaf mark and the FLAME CONNECT
 * wordmark with its navy circuit flourish.
 *
 * Source files (alpha-matted PNGs, single source of truth):
 *   public/brand/flame-connect-mark.png              — mark only, square
 *   public/brand/flame-connect-wordmark.png          — wordmark, navy circuit (light surfaces)
 *   public/brand/flame-connect-wordmark-inverse.png  — wordmark, light circuit (dark surfaces)
 *
 * Brand rules honoured: supplied full-colour treatment only, proportions
 * preserved, clear space via layout, no recoloured or alternate treatments
 * (the inverse wordmark only lightens the circuit ink, since navy reads 1:1
 * on the navy footer). next/image serves size-appropriate optimized variants.
 */
export function BrandLogo({
  height = 44,
  variant = "full",
  tone = "light",
  priority = false,
}: {
  /** Rendered lockup height in px (mark height; wordmark scales with it). */
  height?: number;
  /** full = mark + wordmark; mark = flame-leaf mark only. */
  variant?: "full" | "mark";
  /** light = on white/light surfaces; dark = on navy surfaces (light circuit wordmark). */
  tone?: "light" | "dark";
  /** Eagerly load (above-the-fold placements like the sticky header). */
  priority?: boolean;
}) {
  const mark = (
    <Image
      src="/brand/flame-connect-mark.png"
      alt={variant === "mark" ? "Flame Connect" : ""}
      width={512}
      height={512}
      priority={priority}
      style={{ display: "block", height: `${height}px`, width: "auto" }}
    />
  );

  if (variant === "mark") return mark;

  const wordHeight = Math.round(height * 0.74);
  const wordmark = (
    <Image
      src={
        tone === "dark"
          ? "/brand/flame-connect-wordmark-inverse.png"
          : "/brand/flame-connect-wordmark.png"
      }
      alt=""
      width={1024}
      height={354}
      priority={priority}
      style={{ display: "block", height: `${wordHeight}px`, width: "auto" }}
    />
  );

  return (
    <span
      role="img"
      aria-label="Flame Connect"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: `${Math.max(8, Math.round(height * 0.22))}px`,
        lineHeight: 0,
      }}
    >
      {mark}
      {wordmark}
    </span>
  );
}
