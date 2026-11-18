import Link from "next/link";
import { Icon } from "../Icons";
import { Reveal } from "../Reveal";
import s from "../../styles/marketing/marketing.module.css";

/** Evidence we can point to today — every card links to a real page. */
export function ProofGrid({
  items,
}: {
  items: readonly { label: string; title: string; copy: string; href: string; cta: string }[];
}) {
  return (
    <div className={s.cols3}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.07}>
          <article className={`card ${s.proofCard}`}>
            <span className={s.kicker}>{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <div className="card-foot">
              <Link href={item.href} className="text-link">
                {item.cta} <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
