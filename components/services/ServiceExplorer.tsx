"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { ServiceArt, type ServiceArtKey } from "./ServiceArt";
import s from "../../styles/service-explorer.module.css";

export interface ExplorerItem {
  name: string;
  detail: string;
  art: ServiceArtKey;
}

/**
 * Interactive sub-service explorer: pick a service on the left (or the chips
 * on a phone) and its illustration redraws on the right. Built as an ARIA
 * tablist so it works with a keyboard and screen readers.
 */
export function ServiceExplorer({ items }: { items: ExplorerItem[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const current = items[active];

  function onKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const last = items.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  }

  return (
    <div className={s.explorer}>
      <div className={s.list} role="tablist" aria-orientation="vertical" aria-label="Services">
        {items.map((item, i) => (
          <button
            key={item.name}
            id={`${base}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${base}-panel`}
            tabIndex={i === active ? 0 : -1}
            className={s.tab}
            data-active={i === active || undefined}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className={s.num} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span className={s.tabText}>
              <b>{item.name}</b>
              <span className={s.tabDetail}>{item.detail}</span>
            </span>
          </button>
        ))}
      </div>

      <div
        id={`${base}-panel`}
        role="tabpanel"
        aria-labelledby={`${base}-tab-${active}`}
        className={s.stage}
      >
        <div key={current.art} className={s.artWrap}>
          <ServiceArt kind={current.art} label={`Illustration: ${current.name}`} />
        </div>
        <div className={s.caption} aria-live="polite">
          <b>{current.name}</b>
          <p>{current.detail}</p>
        </div>
      </div>
    </div>
  );
}
