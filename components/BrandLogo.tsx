/**
 * Flame Connect brand lockup.
 *
 * Faithful vector recreation of the supplied full-colour logo from the
 * official "Flame Connect — Brand Snapshot" (Sept 2026): orange flame-lens
 * mark, stacked FLAME CONNECT wordmark in Montserrat 800, circuit flourish,
 * and the "Digitizing Africa" logo signature.
 *
 * Brand rules honoured: supplied full-colour treatment only, proportions
 * preserved, generous clear space handled by layout, no recoloured or
 * alternate treatments. Replace with the official vector/raster asset when
 * the brand team supplies the source file (Appendix C — brand assets).
 *
 * The wordmark uses the site-loaded Montserrat variable font so text renders
 * in the exact brand typeface.
 *
 * Canonical on-disk assets live in public/brand/ (flame-connect-mark.svg,
 * flame-connect-logo.svg, flame-connect-logo-compact.svg). Keep this
 * component's geometry in step with them — when the official outlined vector
 * replaces them, this component swaps to it in the same change.
 */
export function BrandLogo({
  height = 44,
  variant = "full",
  withStrapline = true,
}: {
  /** Rendered height in px; width scales proportionally (560:210 full / 210:210 mark). */
  height?: number;
  /** full = mark + wordmark (+optional strapline); mark = flame-lens disc only. */
  variant?: "full" | "mark";
  withStrapline?: boolean;
}) {
  const aspect = variant === "mark" ? 210 / 210 : withStrapline ? 560 / 210 : 560 / 178;
  const width = Math.round(height * aspect);
  const vb = variant === "mark" ? "0 0 210 210" : withStrapline ? "0 0 560 210" : "0 0 560 178";

  return (
    <svg
      role="img"
      aria-label={variant === "mark" ? "Flame Connect mark" : "Flame Connect — Digitizing Africa"}
      width={width}
      height={height}
      viewBox={vb}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {/* Flame-lens mark */}
      <g>
        <circle cx="105" cy="105" r="76" fill="#F4511E" />
        {/* upper flame sweep */}
        <path
          d="M20 88c38-34 132-34 170 0 12 11-4 26-16 16-28-24-110-24-138 0-12 10-28-5-16-16Z"
          fill="#FFFFFF"
        />
        {/* lower flame sweep */}
        <path
          d="M30 126c34-26 116-26 150 0 10 9-3 21-13 13-26-18-98-18-124 0-10 8-23-4-13-13Z"
          fill="#FFFFFF"
          opacity="0.92"
        />
      </g>

      {variant === "full" && (
        <>
          {/* circuit flourish (top-right of wordmark) */}
          <g stroke="#7C8FAE" strokeWidth="4" strokeLinecap="round" fill="#7C8FAE">
            <path d="M418 74 436 52" fill="none" />
            <path d="M424 82 444 70" fill="none" opacity="0.85" />
            <path d="M430 90 452 84" fill="none" opacity="0.7" />
            <circle cx="438" cy="48" r="5.5" />
            <circle cx="447" cy="68" r="5" opacity="0.85" />
            <circle cx="455" cy="82" r="4.5" opacity="0.7" />
          </g>

          {/* wordmark */}
          <text
            x="216"
            y="92"
            fontFamily="'Montserrat Variable', Montserrat, sans-serif"
            fontWeight="800"
            fontSize="64"
            letterSpacing="2"
            fill="#F4511E"
          >
            FLAME
          </text>
          <text
            x="216"
            y="160"
            fontFamily="'Montserrat Variable', Montserrat, sans-serif"
            fontWeight="800"
            fontSize="64"
            letterSpacing="2"
            fill="#F4511E"
          >
            CONNECT
          </text>

          {/* logo signature */}
          {withStrapline && (
            <text
              x="218"
              y="194"
              fontFamily="'Poppins', system-ui, sans-serif"
              fontWeight="500"
              fontSize="21"
              letterSpacing="1.2"
              fill="#6B7280"
            >
              Digitizing Africa
            </text>
          )}
        </>
      )}
    </svg>
  );
}
