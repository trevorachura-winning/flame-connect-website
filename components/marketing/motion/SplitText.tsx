import type { CSSProperties } from "react";
import m from "../../../styles/marketing/motion.module.css";

/**
 * Masked word-by-word headline reveal. Server component: renders plain
 * inline words (screen readers read the sentence normally); the animation is
 * triggered by an ancestor <InView> setting data-inview. `accent` marks the
 * trailing words that take the Flame accent colour, e.g. the promise's
 * "African progress." Word count is small, so the DOM cost is trivial.
 */
export function SplitText({
  text,
  accent,
  delayMs = 0,
}: {
  text: string;
  accent?: string;
  delayMs?: number;
}) {
  const accentStart = accent && text.endsWith(accent) ? text.length - accent.length : -1;
  const words: { word: string; isAccent: boolean }[] = [];
  let cursor = 0;
  for (const word of text.split(" ")) {
    words.push({ word, isAccent: accentStart >= 0 && cursor >= accentStart });
    cursor += word.length + 1;
  }
  return (
    <>
      {words.map(({ word, isAccent }, i) => (
        <span key={`${word}-${i}`}>
          <span className={m.w}>
            <span
              className={`${m.wi}${isAccent ? ` ${m.accent}` : ""}`}
              style={{ "--i": i, "--d": `${delayMs}ms` } as CSSProperties}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
