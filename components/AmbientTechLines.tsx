import styles from "./AmbientTechLines.module.css";

/**
 * Ambient circuit/network lines, deliberately original and very lightweight.
 * Static SVG markup; the small traveling pulses are CSS-only and the entire
 * decorative layer is hidden from screen readers and pointer interactions.
 */
const routes = [
  "M-50 485 L95 405 L245 447 L410 342 L590 370 L745 235 L940 265 L1240 90",
  "M-20 238 L160 273 L320 178 L490 202 L630 125 L845 164 L1025 75 L1250 100",
  "M-50 575 L132 533 L300 565 L500 465 L676 487 L840 390 L1090 417 L1250 310",
  "M50 -15 L218 74 L356 48 L520 142 L710 91 L890 145 L1050 76 L1240 150",
  "M-30 97 L122 131 L292 85 L466 144 L600 216 L815 186 L1010 264 L1235 202",
  "M80 610 L207 536 L310 421 L405 460 L535 388 L666 402 L838 306 L1050 320 L1250 250",
  "M-40 347 L160 314 L299 342 L500 300 L705 332 L870 246 L1020 289 L1220 237",
  "M225 -10 L295 113 L252 232 L385 282 L345 390 L465 478 L505 630",
  "M876 -30 L792 79 L868 198 L784 301 L848 424 L768 527 L805 645",
  "M1145 -20 L1070 114 L1114 205 L1033 319 L1110 420 L1041 630",
];
const nodes = [
  [95, 405], [245, 447], [410, 342], [745, 235], [940, 265],
  [160, 273], [490, 202], [845, 164], [132, 533], [500, 465],
  [840, 390], [218, 74], [520, 142], [890, 145], [600, 216],
  [815, 186], [310, 421], [535, 388], [705, 332], [1020, 289],
] as const;

export function AmbientTechLines({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div className={`${styles.layer} ${tone === "dark" ? styles.dark : styles.light}`} aria-hidden="true">
      <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className={styles.svg}>
        <g className={styles.base}>
          {routes.map((d, index) => <path d={d} key={index} />)}
        </g>
        <g className={styles.pulses}>
          {routes.slice(0, 7).map((d, index) => (
            <path
              d={d}
              key={index}
              pathLength="600"
              style={{ animationDelay: `${-index * 1.6}s` }}
            />
          ))}
        </g>
        <g className={styles.nodes}>
          {nodes.map(([x, y], index) => (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={index % 5 === 0 ? 3 : 1.6}
              style={{ animationDelay: `${-index * 0.37}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
