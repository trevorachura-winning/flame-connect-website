"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Gentle scroll parallax — the depth cue behind a calm layout.
 *
 * Deliberately conservative:
 *   · runs off a single rAF-throttled scroll listener (no per-frame work)
 *   · only writes a CSS custom property; compositing stays on the GPU
 *   · skipped entirely under prefers-reduced-motion and on touch devices,
 *     honouring the access-first / low-bandwidth principles in docs/BRAND.md
 *   · `strength` is a fraction of viewport height, so ~0.05 ≈ ±25px of travel
 */
export function Parallax({
  children,
  strength = 0.05,
  className = "",
}: {
  children: ReactNode;
  /** Travel as a fraction of viewport height. Keep it small — subtlety is the point. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduced || coarse || !("IntersectionObserver" in window)) return;

    let frame = 0;
    let inView = false;

    const update = () => {
      frame = 0;
      if (!inView) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 when the element centre is a viewport below, +1 when a viewport above
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const clamped = Math.max(-1, Math.min(1, progress));
      el.style.setProperty("--parallax-y", `${(-clamped * strength * 100).toFixed(2)}px`);
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting;
          if (inView) request();
        });
      },
      { rootMargin: "12% 0px 12% 0px" }
    );

    io.observe(el);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`parallax${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
