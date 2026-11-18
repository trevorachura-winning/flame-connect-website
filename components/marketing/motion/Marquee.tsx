import m from "../../../styles/marketing/motion.module.css";

/**
 * A slow strip of Flame Connect's OWN service lines and product family —
 * never third-party or client logos (benchmark rule: logo marquees only for
 * verified associations). Pure CSS; pauses on hover/focus; under reduced
 * motion it becomes a static, wrapped list and the duplicate is hidden.
 */
export function Marquee({
  label,
  items,
}: {
  label: string;
  items: readonly { text: string; kind: "service" | "product" | "method" }[];
}) {
  const group = (hidden: boolean) => (
    <ul className={m.group} aria-hidden={hidden ? "true" : undefined}>
      {items.map((item) => (
        <li key={item.text} className={item.kind === "product" ? m.mProduct : undefined}>
          {item.text}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={m.marquee} role="region" aria-label={label} tabIndex={0} data-allow-overflow="">
      <div className={m.track}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
