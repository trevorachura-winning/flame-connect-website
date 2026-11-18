import Link from "next/link";
import { Icon, type IconName } from "../Icons";
import { Reveal } from "../Reveal";
import type { Service } from "../../content/services";
import s from "../../styles/marketing/marketing.module.css";
import mo from "../../styles/marketing/motion.module.css";

const PILLAR_ICONS: Record<string, IconName> = {
  "digital-communications": "megaphone",
  "ai-in-business": "workflow",
  "consulting-thought-leadership": "compass",
};

/**
 * Three service pillars as challenge → entry point cards. The "start with"
 * line is the first listed output of each service — a concrete, low-risk
 * first engagement rather than an abstract capability list.
 */
export function ServiceOutcomeCards({ services }: { services: readonly Service[] }) {
  return (
    <div className={s.cols3}>
      {services.map((service, i) => (
        <Reveal key={service.slug} delay={i * 0.08}>
          <article className={`card lift ${s.serviceCard} ${mo.spot}`} data-spotlight="">
            <span className="card-icon">
              <Icon name={PILLAR_ICONS[service.slug] ?? "spark"} size={22} />
            </span>
            <h3>{service.name}</h3>
            <p>{service.cardCopy}</p>
            <div className={s.entry}>
              <span className={s.kickerMuted}>Often starts with</span>
              <p>{service.outputs[0]}</p>
            </div>
            <Link href={`/services/${service.slug}`} className="text-link">
              Explore the service<span className="sr-only">: {service.name}</span>{" "}
              <Icon name="arrow-right" size={16} />
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
