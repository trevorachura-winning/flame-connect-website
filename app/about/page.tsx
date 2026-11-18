import Link from "next/link";
import Image from "next/image";
import { SectionHead } from "../../components/SectionHead";
import { CTABand } from "../../components/CTABand";
import { Icon } from "../../components/Icons";
import { Reveal } from "../../components/Reveal";
import { OPERATING_PRINCIPLES, ABOUT_MODEL, APPROACH_STAGES } from "../../content/home";
import { pageMetadata } from "../../lib/seo";
import s from "../../styles/marketing/marketing.module.css";
import m from "../../styles/marketing/motion.module.css";
import type { CSSProperties } from "react";
import { InView } from "../../components/marketing/motion/InView";
import { SplitText } from "../../components/marketing/motion/SplitText";
import { SpotlightGroup } from "../../components/marketing/motion/SpotlightGroup";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

export const metadata = pageMetadata({
  title: "About Flame Connect",
  description:
    "Flame Connect is an AI Centre of Change built in Uganda for the way Africa works. We bring expert services, our own platforms and practical insight together in one model.",
  path: "/about",
});

const VALUES = [
  "Build what is useful.",
  "Explain what is true.",
  "Design with people, not around them.",
  "Make access part of the product.",
  "Share what we learn.",
  "Measure what changes.",
];

export default function AboutPage() {
  return (
    <div className={m.scope}>
      <section className="page-hero white">
        <div className="container page-hero-grid">
          <div className={m.heroIntro}>
            <span className={`eyebrow ${m.rise}`}>About Flame Connect · AI Centre of Change</span>
            <h1 className="display-1" style={{ fontSize: "clamp(2.3rem, 5.2vw, 3.9rem)" }}>
              <SplitText text="Technology should fit the people and places using it." accent="places using it." delayMs={80} />
            </h1>
            <p className={`lede ${m.rise}`} style={v({ "--i": 8 })}>
              Flame Connect was built around a simple belief: African businesses and communities
              should not be passive consumers of technological change. We should help shape it,
              apply it and create value from it on our own terms.
            </p>
            <div className={`hero-actions ${m.rise}`} style={v({ "--i": 9 })}>
              <a href="#our-model" className={`btn btn-dark ${s.wrapBtn}`}>
                How the model works <Icon name="arrow-right" size={18} />
              </a>
              <Link href="/contact?intent=partnership" className={`btn btn-outline ${s.wrapBtn}`}>
                Partner with us
              </Link>
            </div>
          </div>
          <div className={`frame ${m.zoom}`}>
            <Image
              src="/images/community-learning.jpg"
              alt="African professionals learning and working together in a collaborative session."
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 62rem) 92vw, 44vw"
              style={{ aspectRatio: "4/3", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section tight">
        <div className={`container ${s.split}`}>
          <Reveal>
            <SectionHead eyebrow="Our story" title="Built in Uganda. Working across Africa." />
            <div className="prose">
              <p>
                Flame Connect is based in Uganda and is being built for a wider African future. Our
                work brings together technology, communication, business improvement
                and learning.
              </p>
              <p>
                We are building a model that combines expert services, our own platforms and
                practical insight, because real change rarely comes from software alone.
                Organisations need clarity, people need skills and solutions need to fit the
                environment in which they will be used.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "grid", gap: "1rem" }}>
              <div className="card">
                <span className="card-icon"><Icon name="target" size={20} /></span>
                <h3 style={{ fontSize: "1.1rem" }}>Mission</h3>
                <p>
                  To build practical AI tools, skills and communities that help people make better
                  decisions, strengthen everyday work and create measurable outcomes.
                </p>
              </div>
              <div className="card">
                <span className="card-icon"><Icon name="eye" size={20} /></span>
                <h3 style={{ fontSize: "1.1rem" }}>Vision</h3>
                <p>
                  An Africa where businesses and communities actively shape how AI is used, build
                  relevant capability and share in the value it creates.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The model — services, platform, insight */}
      <section id="our-model" className="section paper2" aria-labelledby="model-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>Our model</span>
            <h2 id="model-title" className="display-2">
              <SplitText text="Three ways we create change that lasts." accent="change that lasts." />
            </h2>
            <p className={`lede ${m.rise}`} style={v({ "--i": 3 })}>
              Software on its own rarely changes how an organisation works. We combine expert
              services, our own platforms and practical insight, so clarity, skills and tools
              arrive together.
            </p>
          </InView>
          <SpotlightGroup>
          <ol className={`${s.cols3} ${s.model} list-plain`}>
            {ABOUT_MODEL.map((part, i) => (
              <Reveal as="li" key={part.name} delay={i * 0.06}>
                <article className={`card lift ${s.modelItem} ${m.spot}`} data-spotlight="">
                  <h3>{part.name}</h3>
                  <p>{part.copy}</p>
                  <div className="card-foot">
                    <Link href={part.href} className="text-link">
                      {part.cta} <Icon name="arrow-right" size={16} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
          </SpotlightGroup>
          <Reveal>
            <p className={s.turn}>
              Every engagement follows one method:{" "}
              <span>{APPROACH_STAGES.map((st) => `${st.key}.`).join(" ")}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Operating principles"
            title="How the work gets done"
            copy="Six principles guide everything we do, from how we design products to what we allow ourselves to claim on this website."
          />
          <div className={s.cols3}>
            {OPERATING_PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.name} delay={(i % 3) * 0.06}>
                <div className="card value-card" style={{ height: "100%" }}>
                  <b className="num">{String(i + 1).padStart(2, "0")}</b>
                  <h3>{principle.name}</h3>
                  <p style={{ margin: 0 }}>{principle.meaning}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Long-term ambition */}
      <section className={`band motif section ${m.bandRise}`}>
        <div className="container" style={{ maxWidth: "52rem" }}>
          <Reveal>
            <span className="eyebrow light">Long-term ambition</span>
            <h2 className="display-2" style={{ margin: "0.85rem 0 1rem" }}>
              An ambition that outlasts any single product.
            </h2>
            <p className="lede light">
              Over the long term, Flame Connect wants to contribute to a stronger African innovation
              ecosystem and help make Uganda a recognised home for technology, learning and
              practical problem-solving. A future technology and innovation city is part of that
              ambition.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section tight">
        <div className="container">
          <SectionHead eyebrow="Values in behaviour" title="What you can hold us to" />
          <ul className={`${s.cols3} list-plain`}>
            {VALUES.map((value, i) => (
              <Reveal as="li" key={value} delay={(i % 3) * 0.05}>
                <div className="card" style={{ flexDirection: "row", alignItems: "center", gap: "0.8rem", padding: "1.2rem 1.3rem", height: "100%" }}>
                  <Icon name="check" size={18} />
                  <span style={{ fontWeight: 600, color: "var(--navy-deep)", fontFamily: "var(--font-display)" }}>{value}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>


      <CTABand
        question="Want to build this with us?"
        copy="We welcome partnerships with businesses, institutions, development organisations, investors and others who share this ambition."
        primary={{ label: "Partner with Flame", href: "/contact?intent=partnership" }}
        secondary={{ label: "See how we work", href: "/services" }}
      />
    </div>
  );
}
