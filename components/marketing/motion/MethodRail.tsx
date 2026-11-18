"use client";

import { useEffect, useRef } from "react";
import m from "../../../styles/marketing/motion.module.css";

export interface MethodStep {
  key: string;
  copy: string;
  /** What the client leaves this stage with (restated from content/services.ts). */
  output?: string;
}

/**
 * Animated numbered process. A progress line fills as the rail scrolls
 * through the viewport centre; each step activates as the line reaches its
 * node (oversized numerals fill with Flame Orange). No scroll hijacking:
 * the page scrolls normally and we only read positions (rAF-batched,
 * passive). Without JS or with reduced motion the rail renders complete.
 */
export function MethodRail({ steps, labelledBy }: { steps: readonly MethodStep[]; labelledBy?: string }) {
  const ref = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rail.querySelectorAll<HTMLElement>("[data-step]").forEach((s) => (s.dataset.active = "true"));
      return;
    }
    rail.dataset.armed = "true";
    const items = Array.from(rail.querySelectorAll<HTMLElement>("[data-step]"));
    let frame = 0;

    const paint = () => {
      frame = 0;
      const r = rail.getBoundingClientRect();
      const focus = window.innerHeight * 0.6;
      const p = Math.max(0, Math.min(1, (focus - r.top) / Math.max(1, r.height)));
      rail.style.setProperty("--p", p.toFixed(4));
      for (const item of items) {
        const node = item.querySelector<HTMLElement>("[data-node]");
        const nr = (node ?? item).getBoundingClientRect();
        item.dataset.active = nr.top + nr.height / 2 <= focus ? "true" : "false";
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    let listening = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !listening) {
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule, { passive: true });
        listening = true;
        schedule();
      } else if (!entry.isIntersecting && listening) {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        listening = false;
        schedule(); // settle final state when leaving
      }
    });
    io.observe(rail);
    schedule();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={ref} className={m.rail} aria-labelledby={labelledBy}>
      {steps.map((step, i) => (
        <li key={step.key} className={m.step} data-step="">
          <span className={m.stepNode} data-node="" aria-hidden="true" />
          <div className={m.stepBody}>
            <span className={m.stepNo} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <h3>
              <span className="sr-only">Step {i + 1}: </span>
              {step.key}
            </h3>
            <p>{step.copy}</p>
            {step.output && (
              <span className={m.stepOut}>
                <b>You leave with</b>
                {step.output}
              </span>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
