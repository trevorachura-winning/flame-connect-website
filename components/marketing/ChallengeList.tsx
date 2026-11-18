import { Reveal } from "../Reveal";
import s from "../../styles/marketing/marketing.module.css";

/** Editorial numbered list for the homepage "why change stalls" problem frame. */
export function ChallengeList({
  items,
}: {
  items: readonly { title: string; copy: string }[];
}) {
  return (
    <ol className={s.challengeList}>
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 0.06} className={s.challenge}>
          <span className={s.challengeNo} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </Reveal>
      ))}
    </ol>
  );
}
