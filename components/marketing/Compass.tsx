import type { CSSProperties } from "react";
import { CORE_VALUES, MISSION, VISION } from "../../content/company";
import { Icon, type IconName } from "../Icons";
import { InView } from "./motion/InView";
import c from "../../styles/compass.module.css";

const ICONS: IconName[] = ["users", "handshake", "spark"];

/**
 * Home page: mission, vision and core values before the story begins.
 * As it enters the screen, the mission and vision rise word by word, a
 * current runs along the trace linking them, then travels through the three
 * values, lighting each in turn. Static under reduced motion.
 */
export function Compass() {
  const words = (text: string, offset = 0) =>
    text.split(" ").map((w, i) => (
      <span key={`${w}-${i}`} className={c.word} style={{ "--w": i + offset } as CSSProperties}>
        {w}{" "}
      </span>
    ));

  return (
    <section className={c.section} aria-labelledby="compass-title">
      <InView className={`container ${c.inner}`} margin="0px 0px -15% 0px">
        <p className={c.eyebrow}>Who we are</p>
        <h2 id="compass-title" className="sr-only">Our mission, vision and core values</h2>

        <div className={c.pair}>
          <article className={c.statement}>
            <p className={c.label}>
              <Icon name="target" size={16} /> Our mission
            </p>
            <p className={c.line}>{words(MISSION)}</p>
          </article>
          <span className={c.link} aria-hidden="true">
            <span className={c.linkPulse} />
          </span>
          <article className={c.statement}>
            <p className={c.label}>
              <Icon name="eye" size={16} /> Our vision
            </p>
            <p className={c.line}>{words(VISION, 6)}</p>
          </article>
        </div>

        <div className={c.valuesHead}>
          <p className={c.label}>Our core values</p>
        </div>
        <div className={c.valuesWrap}>
          <span className={c.rail} aria-hidden="true">
            <span className={c.railPulse} />
          </span>
        <ol className={c.values}>
          {CORE_VALUES.map((v, i) => (
            <li key={v.title} className={c.value} style={{ "--v": i } as CSSProperties}>
              <span className={c.node} aria-hidden="true">
                <Icon name={ICONS[i]} size={20} />
              </span>
              <h3>{v.title}</h3>
              <p>{v.copy}</p>
            </li>
          ))}
        </ol>
        </div>
      </InView>
    </section>
  );
}
