"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorHalo.module.css";

/**
 * An ambient, pointer-events-free visual follower. It never replaces the
 * native cursor and never changes focus/hover targets. It is intentionally
 * disabled on touch, coarse pointers and reduced-motion preferences.
 */
export function CursorHalo() {
  const haloRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const halo = haloRef.current;
    if (!halo) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let initialized = false;

    const hide = () => {
      halo.dataset.visible = "false";
    };

    const animate = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * 0.2;
      currentY += dy * 0.2;
      halo.style.transform = `translate3d(${currentX - 22}px, ${currentY - 22}px, 0)`;
      if (Math.abs(dx) + Math.abs(dy) > 0.7) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const move = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType !== "mouse") {
        hide();
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;
      if (!initialized) {
        currentX = targetX;
        currentY = targetY;
        initialized = true;
      }

      const target = event.target;
      halo.dataset.interactive =
        target instanceof Element &&
        Boolean(target.closest("a, button, [role='button'], input, select, textarea"))
          ? "true"
          : "false";
      // Soften over cards that already have their own orange spotlight,
      // so two orange glows never stack.
      halo.dataset.dim =
        target instanceof Element && Boolean(target.closest("[data-spotlight]")) ? "true" : "false";
      halo.dataset.visible = "true";

      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    finePointer.addEventListener("change", hide);
    reducedMotion.addEventListener("change", hide);

    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      finePointer.removeEventListener("change", hide);
      reducedMotion.removeEventListener("change", hide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={haloRef} className={styles.halo} aria-hidden="true" data-visible="false" />;
}
