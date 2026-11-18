"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import m from "../../../styles/marketing/motion.module.css";

/**
 * Layered hero depth. Children opt in with className={m.layer} and a
 * --depth (pointer) / --sdepth (scroll) custom property. Pointer parallax
 * runs only on fine pointers with hover; scroll parallax only while the
 * hero is on screen. Both are rAF-batched, passive, cleaned up on unmount,
 * and disabled for reduced motion. No layout reads inside the frame loop
 * beyond one getBoundingClientRect per scroll frame.
 */
export function HeroStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let px = 0;
    let py = 0;
    let visible = true;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const paint = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const sy = Math.max(-1, Math.min(1, -r.top / Math.max(1, r.height)));
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
      el.style.setProperty("--sy", sy.toFixed(3));
    };
    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(paint);
    };
    const onPointer = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      schedule();
    };
    const onLeave = () => {
      px = 0;
      py = 0;
      schedule();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    const host = el.closest("section") ?? el;
    if (fine) {
      host.addEventListener("pointermove", onPointer as EventListener, { passive: true });
      host.addEventListener("pointerleave", onLeave, { passive: true });
    }
    window.addEventListener("scroll", schedule, { passive: true });
    schedule();

    return () => {
      io.disconnect();
      if (fine) {
        host.removeEventListener("pointermove", onPointer as EventListener);
        host.removeEventListener("pointerleave", onLeave);
      }
      window.removeEventListener("scroll", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={`${m.heroStage} ${className}`.trim()} style={{} as CSSProperties}>
      {children}
    </div>
  );
}
