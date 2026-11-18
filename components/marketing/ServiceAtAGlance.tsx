import type { Service } from "../../content/services";
import s from "../../styles/marketing/marketing.module.css";

/** Detail-page summary strip: challenge → delivery → outcome in one glance. */
export function ServiceAtAGlance({ service }: { service: Service }) {
  return (
    <div className={s.glance} role="group" aria-label={`${service.name} at a glance`}>
      <div className={s.glanceCell}>
        <span className={s.kicker}>The challenge</span>
        <p>{service.problems[0]}.</p>
      </div>
      <div className={s.glanceCell}>
        <span className={s.kicker}>How we deliver</span>
        <p>Assess, learn, improve, then implement and scale what the evidence supports.</p>
      </div>
      <div className={`${s.glanceCell} ${s.glanceCellOutcome}`}>
        <span className={s.kicker}>Realistic outcome</span>
        <p>{service.outcomeStatement}</p>
      </div>
    </div>
  );
}
