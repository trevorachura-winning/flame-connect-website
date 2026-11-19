import type { ReactElement } from "react";
import type { StoryArt as Art } from "../../content/story";
import st from "../../styles/story.module.css";

/**
 * Original line illustrations for each chapter. Strokes draw themselves when
 * the chapter enters the screen (styles/story.module.css); static otherwise.
 * Decorative: the chapter text carries the meaning.
 */
export function StoryArt({ art }: { art: Art }) {
  return (
    <svg className={st.art} viewBox="0 0 240 160" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`sky-${art}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eaf2ff" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="240" height="160" rx="18" fill={`url(#sky-${art})`} />
      {SCENES[art]}
    </svg>
  );
}

const L = (d: string, accent = false, w = 2.2) => (
  <path d={d} pathLength={1} className={`${st.draw} ${accent ? st.accentStroke : ""}`} strokeWidth={w} />
);

const SCENES: Record<Art, ReactElement> = {
  // Pen tool drawing a curve with anchor points.
  design: (
    <g>
      {L("M40 112 C 80 40, 150 150, 200 58", true, 3)}
      <rect x="35" y="107" width="10" height="10" rx="2" className={st.node} />
      <rect x="195" y="53" width="10" height="10" rx="2" className={st.node} />
      {L("M80 72 L 118 92")}
      {L("M150 118 L 176 96")}
      <circle cx="80" cy="72" r="4" className={st.dot} />
      <circle cx="176" cy="96" r="4" className={st.dot} />
      {L("M120 30 L 138 30 L 132 48 L 126 48 Z")}
      {L("M129 48 L 129 60")}
    </g>
  ),
  // Template cards with a spark: smart tools.
  canva: (
    <g>
      {L("M38 34 h70 v92 h-70 Z")}
      {L("M120 34 h82 v40 h-82 Z")}
      {L("M120 86 h82 v40 h-82 Z")}
      {L("M50 50 h46 M50 62 h34 M50 108 h40", false, 2)}
      {L("M132 52 h44 M132 104 h30", false, 2)}
      {L("M184 92 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z", true, 2.4)}
    </g>
  ),
  // Three people linking up.
  people: (
    <g>
      {L("M70 92 L 120 60 L 170 92 Z", true, 2.4)}
      <circle cx="70" cy="92" r="16" className={st.person} />
      <circle cx="120" cy="60" r="16" className={st.person} />
      <circle cx="170" cy="92" r="16" className={st.person} />
      {L("M50 136 q20 -22 40 0 M100 104 q20 -22 40 0 M150 136 q20 -22 40 0", false, 2)}
    </g>
  ),
  // Camera, a play button and a browser window.
  video: (
    <g>
      {L("M32 52 h86 v60 h-86 Z")}
      {L("M118 70 l24 -12 v48 l-24 -12")}
      {L("M66 70 l18 12 l-18 12 Z", true, 2.6)}
      {L("M150 96 h62 v42 h-62 Z")}
      {L("M150 106 h62", false, 1.8)}
      <circle cx="157" cy="101" r="1.8" className={st.dot} />
      <circle cx="163" cy="101" r="1.8" className={st.dot} />
      {L("M32 128 h86", true, 2)}
      <circle cx="74" cy="128" r="4" className={st.dot} />
    </g>
  ),
  // A growing network with a guiding star (mentors).
  team: (
    <g>
      {L("M60 110 L 104 76 L 150 104 L 190 70 M104 76 L 120 120 L 150 104 M60 110 L 120 120", false, 2)}
      {[
        [60, 110], [104, 76], [150, 104], [190, 70], [120, 120],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="9" className={st.person} />
      ))}
      {L("M58 26 l5 11 l12 2 l-9 8 l2 12 l-10 -6 l-10 6 l2 -12 l-9 -8 l12 -2 Z", true, 2.2)}
      {L("M68 52 Q 90 70 104 72", true, 1.6)}
    </g>
  ),
  // A chip with traces running out: a technology company.
  chip: (
    <g>
      {L("M90 50 h60 v60 h-60 Z", false, 2.6)}
      {L("M104 64 h32 v32 h-32 Z", true, 2.4)}
      {L("M100 50 v-18 M120 50 v-24 M140 50 v-18 M100 110 v18 M120 110 v24 M140 110 v18", false, 2)}
      {L("M90 70 h-26 l-10 -10 h-20 M90 90 h-26 l-10 10 h-20 M150 70 h26 l10 -10 h20 M150 90 h26 l10 10 h20", true, 2)}
      <circle cx="34" cy="60" r="3.5" className={st.dot} />
      <circle cx="34" cy="100" r="3.5" className={st.dot} />
      <circle cx="206" cy="60" r="3.5" className={st.dot} />
      <circle cx="206" cy="100" r="3.5" className={st.dot} />
    </g>
  ),
};
