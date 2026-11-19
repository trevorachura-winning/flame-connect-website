"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import type { TeamMember } from "../content/team";
import { teamCoverflowOffset, teamAutoplayEnabled } from "../lib/team-coverflow";
import { Icon } from "./Icons";
import styles from "../styles/team-coverflow.module.css";

const AUTOPLAY_MS = 5000;

/**
 * 3D cover-flow of the team. The active person is brought forward in colour on
 * a lit plinth; neighbours fan out in perspective, in greyscale. Swipe, drag,
 * arrow keys, the name list or a click on a neighbour all move it. Autoplay
 * pauses on hover, focus, a hidden tab or the pause button, and is off for
 * reduced motion.
 */
export function TeamCoverflow({ team }: { team: TeamMember[] }) {
  const n = team.length;
  const [active, setActive] = useState(0);
  // Autoplay adds little value and can make a two-person cycle feel jumpy.
  const [playing, setPlaying] = useState(n >= 3);
  const [hovering, setHovering] = useState(false);
  const [reduced, setReduced] = useState(false);
  const drag = useRef<{ x: number; dx: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [dragX, setDragX] = useState(0);

  const go = useCallback((i: number) => {
    if (n < 2) return;
    setActive(((i % n) + n) % n);
  }, [n]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (!playing || hovering || !teamAutoplayEnabled(n, reduced)) return;
    const t = window.setInterval(() => {
      if (document.visibilityState === "visible") setActive((a) => (a + 1) % n);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [playing, hovering, reduced, n]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); setPlaying(false); go(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); setPlaying(false); go(active - 1); }
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, dx: 0, moved: false };
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    drag.current.dx = dx;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    setDragX(dx);
  };
  const onUp = () => {
    if (!drag.current) return;
    const { dx, moved } = drag.current;
    drag.current = null;
    setDragX(0);
    // Prevent the synthetic click after a swipe from also selecting a card.
    if (moved) {
      suppressClick.current = true;
      window.setTimeout(() => { suppressClick.current = false; }, 0);
    }
    if (Math.abs(dx) > 50) { setPlaying(false); go(active + (dx < 0 ? 1 : -1)); }
  };

  if (n === 0) return null;
  const current = team[active];

  return (
    <div
      className={styles.root}
      role="region"
      aria-roledescription="carousel"
      aria-label="The Flame Connect team"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      <div
        className={styles.stage}
        tabIndex={n > 1 ? 0 : -1}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onUp}
        aria-label={n > 1 ? "Use the left and right arrow keys to move between people" : `${current.name}, ${current.role}`}
        style={{ "--drag": `${dragX}px` } as CSSProperties}
        data-dragging={dragX !== 0 || undefined}
        data-two-person={n === 2 || undefined}
        data-single={n === 1 || undefined}
      >
        <div className={styles.glow} aria-hidden="true" />
        {team.map((m, i) => {
          const d = teamCoverflowOffset(i, active, n);
          const ad = Math.abs(d);
          const visible = ad <= 2;
          return (
            <div
              key={m.slug}
              className={styles.slide}
              data-active={d === 0 || undefined}
              aria-hidden={d !== 0}
              style={{ "--d": d, "--ad": ad, zIndex: 20 - ad, visibility: visible ? "visible" : "hidden" } as CSSProperties}
              onClick={() => {
                if (d !== 0 && !suppressClick.current) { setPlaying(false); go(i); }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.photo} src={m.photo} alt="" draggable={false} loading={ad <= 1 ? "eager" : "lazy"} />
              <div className={styles.plinth}>
                <strong>{m.name}</strong>
                <span>{m.role}</span>
              </div>
            </div>
          );
        })}
      </div>

      {n > 1 && <div className={styles.controls}>
        <button type="button" className={styles.arrow} onClick={() => { setPlaying(false); go(active - 1); }} aria-label="Previous person">
          <Icon name="arrow-right" size={18} style={{ transform: "scaleX(-1)" }} />
        </button>
        {n >= 3 && <ol className={styles.names} aria-label="Team members">
          {team.map((m, i) => (
            <li key={m.slug}>
              <button
                type="button"
                aria-current={i === active || undefined}
                aria-label={`${m.name}, ${m.role}`}
                onClick={() => { setPlaying(false); go(i); }}
              >
                <span className={styles.dot} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>}
        <button type="button" className={styles.arrow} onClick={() => { setPlaying(false); go(active + 1); }} aria-label="Next person">
          <Icon name="arrow-right" size={18} />
        </button>
        {!reduced && n >= 3 && (
          <button type="button" className={styles.pause} onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
            {playing ? "Pause" : "Play"}
          </button>
        )}
      </div>}

      <div className={styles.bio} aria-live="polite" key={current.slug}>
        <h2>{current.name}</h2>
        <p className={styles.role}>{current.role}</p>
        <p className={styles.bioText}>{current.bio}</p>
        {current.focusAreas && current.focusAreas.length > 0 && (
          <details className={styles.more}>
            <summary>
              <span>What {current.name.split(" ")[0]} leads</span>
              <span className={styles.moreIndicator} aria-hidden="true" />
            </summary>
            <dl className={styles.focusList}>
              {current.focusAreas.map((focus) => (
                <div className={styles.focusItem} key={focus.title}>
                  <dt>{focus.title}</dt>
                  <dd>{focus.description}</dd>
                </div>
              ))}
            </dl>
            {current.qualification && (
              <p className={styles.qualification}>
                <strong>Education</strong> {current.qualification}
              </p>
            )}
          </details>
        )}
        {current.linkedin && (
          <a href={current.linkedin} target="_blank" rel="noopener" className="text-link">
            {current.name} on LinkedIn <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </div>
  );
}
