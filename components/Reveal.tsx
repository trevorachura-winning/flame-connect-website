"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties, type ElementType } from "react";

/**
 * Restrained scroll-reveal. Adds `.in` when the element enters the viewport.
 * Under prefers-reduced-motion the CSS forces everything visible; this adds
 * `.in` immediately as well so no content can ever be stuck hidden.
 *
 * `variant` maps to a CSS class in app/globals.css:
 *   up (default) · left · right · scale · fade · none
 * `blur={false}` opts a node out of the blur-to-sharp settle — use it on
 * large media so we never pay for filtering a full-bleed image.
 */
const VARIANTS: Record<string, string> = {
  up: "",
  left: "from-left",
  right: "from-right",
  scale: "from-scale",
  fade: "fade-only",
  none: "fade-only no-blur",
};

export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  variant = "up",
  blur = true,
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
  variant?: keyof typeof VARIANTS;
  blur?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const variantClass = VARIANTS[variant] ?? "";
  const classes = ["reveal", variantClass, blur ? "" : "no-blur", className]
    .filter(Boolean)
    .join(" ");
  const style = { "--reveal-delay": `${delay}s` } as CSSProperties;

  return (
    <Tag ref={ref as never} className={classes} style={style}>
      {children}
    </Tag>
  );
}

export type RevealElement = ElementType;
