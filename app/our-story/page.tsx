import Link from "next/link";
import type { CSSProperties } from "react";
import { CTABand } from "../../components/CTABand";
import { Icon } from "../../components/Icons";
import { InView } from "../../components/marketing/motion/InView";
import { SplitText } from "../../components/marketing/motion/SplitText";
import { StoryArt } from "../../components/story/StoryArt";
import { CHAPTERS, MENTORS_NOTE, STORY_INTRO, TOOLKIT, VALUES, VISION } from "../../content/story";
import { pageMetadata } from "../../lib/seo";
import m from "../../styles/marketing/motion.module.css";
import st from "../../styles/story.module.css";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

export const metadata = pageMetadata({
  title: "Our story: from a design desk in Kampala to a technology company",
  description:
    "How Flame Connect grew from a graphics business in 2019, through video, web design and marketing, into a Ugandan technology company focused on Digitizing Africa.",
  path: "/our-story",
});

export default function OurStoryPage() {
  return (
    <div className={m.scope}>
      <section className="page-hero white">
        <div className={`container ${m.heroIntro} ${st.hero}`}>
          <span className={`eyebrow ${m.rise}`} style={v({ "--i": 0 })}>Our story · Since 2019</span>
          <h1 className="display-1" style={{ marginTop: "0.8rem" }}>
            <SplitText text={STORY_INTRO.title} accent="Digitizing Africa." delayMs={100} />
          </h1>
          <p className={`lede ${m.rise}`} style={v({ "--i": 3, "--d": "150ms", marginInline: "auto" })}>
            {STORY_INTRO.lede}
          </p>
        </div>
      </section>

      {/* How the toolkit grew: chips light up in order along one trace. */}
      <section className="section tight" aria-labelledby="toolkit-title">
        <div className="container">
          <InView className={st.toolkit}>
            <h2 id="toolkit-title" className={st.kicker}>How our toolkit grew</h2>
            <ol className={st.chips}>
              {TOOLKIT.map((tool, i) => (
                <li key={tool} style={v({ "--i": i })}>
                  <span>{tool}</span>
                </li>
              ))}
            </ol>
          </InView>
        </div>
      </section>

      {/* The journey: a circuit spine that draws as each chapter arrives. */}
      <section className="section" aria-labelledby="journey-title">
        <div className="container">
          <h2 id="journey-title" className="sr-only">Our journey</h2>
          <ol className={st.timeline}>
            {CHAPTERS.map((c, i) => (
              <InView as="li" key={c.title} className={st.chapter} margin="0px 0px -18% 0px">
                <span className={st.node} aria-hidden="true" />
                <div className={st.card} style={v({ "--side": i % 2 })}>
                  <div className={st.artWrap}>
                    <StoryArt art={c.art} />
                  </div>
                  <div className={st.copy}>
                    <p className={st.when}>{c.when}</p>
                    <h3>{c.title}</h3>
                    {c.body.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                    <p className={st.learnt}>
                      <span>What we learnt</span>
                      {c.learnt}
                    </p>
                  </div>
                </div>
              </InView>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="section paper2" aria-labelledby="values-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>What carried us</span>
            <h2 id="values-title" className="display-2">
              <SplitText text="People, collaboration and impact." accent="impact." />
            </h2>
          </InView>
          <InView className={st.values}>
            {VALUES.map((val, i) => (
              <article key={val.title} className={st.value} style={v({ "--i": i })}>
                <span className={st.valueIcon} aria-hidden="true">
                  <Icon name={i === 0 ? "users" : i === 1 ? "handshake" : "target"} size={22} />
                </span>
                <h3>{val.title}</h3>
                <p>{val.copy}</p>
              </article>
            ))}
          </InView>
          <p className={st.mentors}>{MENTORS_NOTE}</p>
        </div>
      </section>

      {/* Vision: ripples from Kampala outward. */}
      <section className="section" aria-labelledby="vision-title">
        <div className={`container ${st.visionGrid}`}>
          <InView className={st.ripples} aria-hidden="true">
            {VISION.rings
              .slice()
              .reverse()
              .map((ring, i) => (
                <span key={ring} className={st.ring} style={v({ "--r": VISION.rings.length - 1 - i })}>
                  <em>{ring}</em>
                </span>
              ))}
            <span className={st.core}>
              <b>Kampala</b>
            </span>
          </InView>
          <div>
            <span className="eyebrow">Where we are going</span>
            <h2 id="vision-title" className="display-2" style={{ marginTop: "0.7rem" }}>
              {VISION.title}
            </h2>
            <p className="lede" style={{ marginTop: "1rem" }}>{VISION.copy}</p>
            <p className="sr-only">Our growth plan: {VISION.rings.join(", then ")}.</p>
            <p style={{ marginTop: "1.4rem", display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
              <Link href="/team" className="text-link">
                Meet the team <Icon name="arrow-right" size={16} />
              </Link>
              <Link href="/about" className="text-link">
                About Flame Connect <Icon name="arrow-right" size={16} />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CTABand
        question="Want to be part of the next chapter?"
        copy="Whether you are a business ready to use AI well, or a partner who shares the vision, we would love to hear from you."
        primary={{ label: "Take the free AI assessment", href: "/assessment" }}
        secondary={{ label: "Talk to us", href: "/contact" }}
      />
    </div>
  );
}
