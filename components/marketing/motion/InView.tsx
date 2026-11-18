"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Tag = "div" | "section" | "header" | "h1" | "h2" | "h3" | "p" | "ol" | "ul" | "li" | "article" | "span";

/**
 * Sets data-inview="true" once the element enters the viewport. All visual
 * states live in styles/marketing/motion.module.css and only hide content
 * when scripting is enabled AND reduced motion is not requested — so the
 * page is fully readable without JS, before hydration fails, or for anyone
 * who prefers less motion. One observer per element, disconnected after use.
 */
export function InView({
  as: Tag = "div",
  children,
  className,
  style,
  id,
  margin = "0px 0px -8% 0px",
  ...rest
}: {
  as?: Tag;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  margin?: string;
} & Record<`aria-${string}`, string | undefined>) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      el.dataset.inview = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.inview = "true";
            io.disconnect();
          }
        }
      },
      { rootMargin: margin, threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return (
    <Tag ref={ref as never} className={className} style={style} id={id} {...rest}>
      {children}
    </Tag>
  );
}
