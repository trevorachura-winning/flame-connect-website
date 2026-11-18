"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * One delegated pointer listener for a whole grid of cards. Cards opt in
 * with data-spotlight and the motion module's `spot` class; the listener
 * writes --mx/--my on the hovered card only (rAF-batched). Fine pointers
 * only — touch and keyboard users get the static (fully readable) card plus
 * a focus keyline from CSS.
 */
export function SpotlightGroup({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let target: HTMLElement | null = null;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      if (!target) return;
      target.style.setProperty("--mx", `${x}px`);
      target.style.setProperty("--my", `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!card || !root.contains(card)) return;
      const r = card.getBoundingClientRect();
      target = card;
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    root.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      root.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
