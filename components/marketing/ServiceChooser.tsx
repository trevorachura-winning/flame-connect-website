import Link from "next/link";
import { Icon } from "../Icons";
import type { Service } from "../../content/services";
import s from "../../styles/marketing/marketing.module.css";

/** "Start from your challenge" — routes a visitor by problem, not by jargon. */
export function ServiceChooser({
  items,
  services,
}: {
  items: readonly { challenge: string; serviceSlug: string }[];
  services: readonly Service[];
}) {
  return (
    <ul className={s.chooser}>
      {items.map((item) => {
        const service = services.find((sv) => sv.slug === item.serviceSlug);
        if (!service) return null;
        return (
          <li key={item.challenge}>
            <Link href={`/services/${service.slug}`} className={s.chooserLink}>
              <span className={s.chooserQuote}>&ldquo;{item.challenge}&rdquo;</span>
              <span className={s.chooserRoute}>{service.name}</span>
              <span className={s.chooserArrow} aria-hidden="true"><Icon name="arrow-right" size={18} /></span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
