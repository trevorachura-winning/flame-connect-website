import Link from "next/link";
import Image from "next/image";
import { Icon } from "../Icons";
import type { Service } from "../../content/services";
import s from "../../styles/marketing/marketing.module.css";

/**
 * One service line told as challenge → what we do → realistic outcome.
 * Content comes straight from content/services.ts (problems, capabilities,
 * outcomeStatement) so the overview and the detail page cannot disagree.
 */
export function ServiceStory({ service, reverse = false }: { service: Service; reverse?: boolean }) {
  return (
    <article
      className={`${s.story}${reverse ? ` ${s.storyReverse}` : ""}`}
      aria-labelledby={`svc-${service.slug}`}
    >
      <div>
        <span className="eyebrow">{service.eyebrow}</span>
        <h2 id={`svc-${service.slug}`} className={`display-3 ${s.storyTitle}`}>
          {service.name}
        </h2>
        <p className={s.storyProp}>{service.proposition}</p>
        <ol className={s.journey}>
          <li className={s.journeyStep}>
            <span className={s.journeyDot} aria-hidden="true"><Icon name="target" size={16} /></span>
            <div>
              <span className={s.kicker}>The challenge</span>
              <p>{[service.problems[0], service.problems[2]].filter(Boolean).join(". ")}.</p>
            </div>
          </li>
          <li className={s.journeyStep}>
            <span className={s.journeyDot} aria-hidden="true"><Icon name="layers" size={16} /></span>
            <div>
              <span className={s.kicker}>What we do</span>
              <ul>
                {service.capabilities.slice(0, 3).map((cap) => (
                  <li key={cap}>{cap}</li>
                ))}
              </ul>
            </div>
          </li>
          <li className={`${s.journeyStep} ${s.journeyStepOutcome}`}>
            <span className={s.journeyDot} aria-hidden="true"><Icon name="check" size={16} /></span>
            <div>
              <span className={s.kicker}>The outcome</span>
              <p>{service.outcomeStatement}</p>
            </div>
          </li>
        </ol>
        <div className={s.actions}>
          <Link href={`/services/${service.slug}`} className={`btn btn-dark btn-sm ${s.wrapBtn}`}>
            Explore {service.name} <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
      <div className={s.storyMedia}>
        <Image
          src={service.image.src}
          alt={service.image.alt}
          width={1536}
          height={1024}
          sizes="(max-width: 62rem) 92vw, 40vw"
        />
      </div>
    </article>
  );
}
