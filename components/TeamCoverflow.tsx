"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import type { TeamMember } from "../content/team";
import { teamCoverflowOffset, teamAutoplayEnabled } from "../lib/team-coverflow";
import { Icon } from "./Icons";
import styles from "../styles/team-coverflow.module.css";

const AUTOPLAY_MS = 3000;

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
  // Moves on its own every 3 s until someone clicks, swipes or uses the keys;
  // any of those stops it for good. Hover and focus pause it.
  const [playing, setPlaying] = useState(n >= 2);
  const [hovering, setHovering] = useState(false);
  const [reduced, setReduced] = useState(false);
  const drag = useRef<{ x: number; dx: number; moved: boolean; t: number; lastX: number; lastT: number; v: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
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

  /** Active portrait leans towards a mouse pointer, with a light sheen across it. */
  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el || e.pointerType !== "mouse" || reduced) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--tx", (x * 2 - 1).toFixed(3));
    el.style.setProperty("--ty", (y * 2 - 1).toFixed(3));
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  };
  const untilt = () => {
    const el = stageRef.current;
    if (!el) return;
    el.style.setProperty("--tx", "0");
    el.style.setProperty("--ty", "0");
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, dx: 0, moved: false, t: e.timeStamp, lastX: e.clientX, lastT: e.timeStamp, v: 0 };
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    tilt(e);
    if (!drag.current) return;
    const dt = Math.max(1, e.timeStamp - drag.current.lastT);
    drag.current.v = (e.clientX - drag.current.lastX) / dt; // px per ms
    drag.current.lastX = e.clientX;
    drag.current.lastT = e.timeStamp;
    const dx = e.clientX - drag.current.x;
    drag.current.dx = dx;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    setDragX(dx);
  };
  const onUp = () => {
    if (!drag.current) return;
    const { dx, moved, v } = drag.current;
    drag.current = null;
    setDragX(0);
    // Prevent the synthetic click after a swipe from also selecting a card.
    if (moved) {
      suppressClick.current = true;
      window.setTimeout(() => { suppressClick.current = false; }, 0);
    }
    // A long drag or a quick flick both move one person.
    const flick = Math.abs(v) > 0.45 && Math.abs(dx) > 14;
    if (Math.abs(dx) > 50 || flick) { setPlaying(false); go(active + ((flick ? v : dx) < 0 ? 1 : -1)); }
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
        ref={stageRef}
        className={styles.stage}
        tabIndex={n > 1 ? 0 : -1}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={() => { onUp(); untilt(); }}
        aria-label={n > 1 ? "Use the left and right arrow keys to move between people" : `${current.name}, ${current.role}`}
        style={{ "--drag": `${dragX}px` } as CSSProperties}
        data-dragging={dragX !== 0 || undefined}
        data-two-person={n === 2 || undefined}
        data-single={n === 1 || undefined}
      >
        <div className={styles.glow} aria-hidden="true" />
        {/* Signature: current runs along the circuit traces into the active plinth. */}
        <svg className={styles.circuit} viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
          <g className={styles.traces}>
            <path d="M0 455 H230 L300 525 H430" />
            <path d="M1000 455 H770 L700 525 H570" />
            <path d="M0 330 H120 L170 380 H240" />
            <path d="M1000 330 H880 L830 380 H760" />
            <circle cx="240" cy="380" r="4" />
            <circle cx="760" cy="380" r="4" />
          </g>
          <g className={styles.pulses} key={active}>
            <path d="M0 455 H230 L300 525 H430" pathLength={100} />
            <path d="M1000 455 H770 L700 525 H570" pathLength={100} />
          </g>
        </svg>
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
              <div className={styles.portrait}>
                <img className={styles.photo} src={m.photo} alt="" draggable={false} loading={ad <= 1 ? "eager" : "lazy"} />
                {d === 0 && <span className={styles.sheen} style={{ "--mask": `url(${m.photo})` } as CSSProperties} aria-hidden="true" />}
              </div>
              <div className={styles.plinth}>
                <strong>{m.name}</strong>
                <span className={styles.plinthRole}>{m.role}</span>
              </div>
            </div>
          );
        })}
      </div>

      {n > 1 && (
        <ol className={`${styles.controls} ${styles.names}`} aria-label="Team members">
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
        </ol>
      )}

      <article className={styles.profile} aria-live="polite" key={current.slug}>
        <div className={styles.profileMain}>
          <p className={styles.role}>{current.role}</p>
          <h2>{current.name}</h2>
          {(current.linkedin || current.instagram) && (
            <nav className={styles.socialLinks} aria-label={`${current.name} social profiles`}>
              {current.linkedin && (
                <a
                  href={current.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${current.name} on LinkedIn (opens in a new tab)`}
                  title="LinkedIn"
                >
                  <Icon name="linkedin" size={19} />
                </a>
              )}
              {current.instagram && (
                <a
                  href={current.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${current.name} on Instagram (opens in a new tab)`}
                  title="Instagram"
                >
                  <Icon name="instagram" size={19} />
                </a>
              )}
            </nav>
          )}
          <p className={styles.bioText}>{current.bio}</p>
        </div>

        {((current.focusAreas?.length ?? 0) > 0 || (current.credentials?.length ?? 0) > 0 || (current.skills?.length ?? 0) > 0 || !!current.qualification) && (
          <div className={styles.profileSide}>
            {current.focusAreas && current.focusAreas.length > 0 && (
              <section aria-label={`What ${current.name.split(" ")[0]} leads`}>
                <h3 className={styles.sideHeading}>What {current.name.split(" ")[0]} leads</h3>
                <dl className={styles.focusList}>
                  {current.focusAreas.map((focus, i) => (
                    <div className={styles.focusItem} key={focus.title} style={{ "--i": i } as CSSProperties}>
                      <dt>{focus.title}</dt>
                      <dd>{focus.description}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
            {current.qualification && (
              <section className={styles.cvSection} aria-label="Education">
                <h3 className={styles.cvHeading}>Education</h3>
                <p className={styles.cvRow}>
                  <span className={styles.cvTitle}>{current.qualification}</span>
                </p>
              </section>
            )}
            {(current.credentials?.length ?? 0) > 0 && (
              <section className={styles.cvSection} aria-label="Certifications">
                <h3 className={styles.cvHeading}>Certifications</h3>
                <ul className={styles.cvList}>
                  {(current.credentials ?? []).map((credential) => (
                    <li className={styles.cvRow} key={`${credential.name}-${credential.issuer}`}>
                      <span className={styles.cvTitle}>{credential.name}</span>
                      <span className={styles.cvMeta}>
                        {credential.issuer} · {credential.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {(current.skills?.length ?? 0) > 0 && (
              <section className={styles.cvSection} aria-label="Skills">
                <h3 className={styles.cvHeading}>Skills</h3>
                <dl className={styles.skillTable}>
                  {(current.skills ?? []).map((set) => (
                    <div key={set.group}>
                      <dt>{set.group}</dt>
                      <dd>{set.items.join(" · ")}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>
        )}
      </article>
    </div>
  );
}
