"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorHalo.module.css";

/**
 * Tech pointer reticle (Product Owner request, 19 Nov 2026).
 *
 * Four corner brackets trail the custom arrow cursor (styles/tech-pointer.css)
 * and lock onto links and buttons, framing them like a targeting system.
 * Purely decorative: pointer-events none, aria-hidden, never moves focus.
 * Off on touch, coarse pointers and reduced motion.
 */
const INTERACTIVE = "a, button, summary, select, [role='button'], [role='tab'], [role='menuitem'], label[for]";
const IDLE = 26; // reticle size when free-floating
const PAD = 6; // breathing room around a locked target

export function CursorHalo() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    // current and target box: x, y (top-left), w, h
    const cur = { x: -100, y: -100, w: IDLE, h: IDLE };
    const tgt = { x: -100, y: -100, w: IDLE, h: IDLE };
    let initialized = false;
    let locked: Element | null = null;
    let px = 0;
    let py = 0;

    const hide = () => {
      el.dataset.visible = "false";
      locked = null;
    };

    const setTarget = () => {
      if (locked && locked.isConnected) {
        const r = locked.getBoundingClientRect();
        tgt.x = r.left - PAD;
        tgt.y = r.top - PAD;
        tgt.w = r.width + PAD * 2;
        tgt.h = r.height + PAD * 2;
      } else {
        tgt.x = px - IDLE / 2;
        tgt.y = py - IDLE / 2;
        tgt.w = IDLE;
        tgt.h = IDLE;
      }
    };

    const animate = () => {
      setTarget();
      const k = locked ? 0.28 : 0.22;
      cur.x += (tgt.x - cur.x) * k;
      cur.y += (tgt.y - cur.y) * k;
      cur.w += (tgt.w - cur.w) * k;
      cur.h += (tgt.h - cur.h) * k;
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      el.style.width = `${cur.w}px`;
      el.style.height = `${cur.h}px`;
      const settled =
        Math.abs(tgt.x - cur.x) + Math.abs(tgt.y - cur.y) + Math.abs(tgt.w - cur.w) + Math.abs(tgt.h - cur.h) < 0.6;
      frame = settled ? 0 : window.requestAnimationFrame(animate);
    };

    const kick = () => {
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const move = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType !== "mouse") {
        hide();
        return;
      }
      px = event.clientX;
      py = event.clientY;
      const target = event.target instanceof Element ? event.target.closest(INTERACTIVE) : null;
      // Very large targets (whole cards) would make the frame jump around; only lock to controls.
      if (target) {
        const r = target.getBoundingClientRect();
        locked = r.width < 520 && r.height < 160 ? target : null;
      } else {
        locked = null;
      }
      el.dataset.locked = locked ? "true" : "false";
      el.dataset.dim =
        event.target instanceof Element && Boolean(event.target.closest("[data-spotlight]")) && !locked ? "true" : "false";
      if (!initialized) {
        setTarget();
        Object.assign(cur, tgt);
        initialized = true;
      }
      el.dataset.visible = "true";
      kick();
    };

    const down = () => {
      el.dataset.pressed = "true";
    };
    const up = () => {
      el.dataset.pressed = "false";
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("scroll", kick, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    finePointer.addEventListener("change", hide);
    reducedMotion.addEventListener("change", hide);

    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      window.removeEventListener("scroll", kick);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      finePointer.removeEventListener("change", hide);
      reducedMotion.removeEventListener("change", hide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={ref} className={styles.reticle} aria-hidden="true" data-visible="false">
      <i className={styles.tl} />
      <i className={styles.tr} />
      <i className={styles.bl} />
      <i className={styles.br} />
      <b className={styles.dot} />
    </span>
  );
}
