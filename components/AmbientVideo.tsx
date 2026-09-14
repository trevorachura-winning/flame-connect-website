"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient background video — decorative only.
 * - preload="none" (bandwidth respect), poster carries the first paint
 * - only plays in-view, muted, looped
 * - never plays under prefers-reduced-motion
 */
export function AmbientVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} className={className} muted loop playsInline preload="none" poster={poster} aria-hidden="true">
      <source src={src} type="video/mp4" />
    </video>
  );
}
