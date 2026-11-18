import Link from "next/link";
import Image from "next/image";
import { SectionHead } from "../../components/SectionHead";
import { CTABand } from "../../components/CTABand";
import { Icon } from "../../components/Icons";
import { Reveal } from "../../components/Reveal";
import { OPERATING_PRINCIPLES, ABOUT_MODEL, APPROACH_STAGES } from "../../content/home";
import { pageMetadata } from "../../lib/seo";
import s from "../../styles/marketing/marketing.module.css";

export const metadata = pageMetadata({
  title: "About Flame Connect",
  description:
    "Flame Connect is an AI Centre of Change built in Uganda for African realities — services, practical tools, community and thought leadership in one model.",
  path: "/about",
});

const VALUES = [
  "Build what is useful.",
  "Explain what is true.",
  "Design with people, not around them.",
  "Make access part of the product.",
  "Learn in public where appropriate.",
  "Measure what changes.",
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero white">
        <div className="container page-hero-grid">
          <div>
            <span className="eyebrow">About Flame Connect · AI Centre of Change</span>
            <h1 className="display-1" style={{ fontSize: "clamp(2.3rem, 5.2vw, 3.9rem)" }}>
              Technology should fit the people and places using it.
            </h1>
            <p className="lede">
              Flame Connect was built around a simple belief: African businesses and communities
              should not be passive consumers of technological change. We should help shape it,
              apply it and create value from it on our own terms.
            </p>
            <div className="hero-actions">
              <a href="#our-model" className={`btn btn-dark ${s.wrapBtn}`}>
                How the model works <Icon name="arrow-right" size={18} />
              </a>
              <Link href="/contact?intent=partnership" className={`btn btn-outline ${s.wrapBtn}`}>
                Partner with us
              </Link>
            </div>
          </div>
          <div className="frame">
            <Image
              src="/images/about-team.jpg"
              alt="African technology strategist in a Kampala working environment, relaxed and confident."
              width={1122}
              height={1402}
              priority
              sizes="(max-width: 62rem) 92vw, 44vw"
              style={{ aspectRatio: "4/5" }}
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
                work sits at the intersection of technology, communication, business improvement
                and learning.
              </p>
              <p>
                We are developing a model that combines services, practical tools, community and
                thought leadership because meaningful change rarely comes from software alone.
                Organizations need clarity, people need capability and solutions need to fit the
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

      {/* The model — services, tools, community, thought leadership */}
      <section id="our-model" className="section paper2" aria-labelledby="model-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our model</span>
            <h2 id="model-title" className="display-2">Four parts, one aim: change that lasts.</h2>
            <p className="lede">
              Software alone rarely changes how an organization works. We combine four connected
              parts so clarity, capability and tools arrive together.
            </p>
          </div>
          <ol className={`${s.cols4} ${s.model} list-plain`}>
            {ABOUT_MODEL.map((part, i) => (
              <Reveal as="li" key={part.name} delay={i * 0.06}>
                <article className={`card lift ${s.modelItem}`}>
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
            copy="Six principles govern everything from product design to the claims we allow on this website."
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
      <section className="band motif section">
        <div className={`container ${s.split}`}>
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
          <Reveal delay={0.1}>
            <div className="proof-item" style={{ background: "rgba(255,255,255,.05)" }}>
              <b>Said carefully, on purpose.</b>
              <p>
                That city is a long-range vision requiring partnerships, infrastructure and
                sustained ecosystem development. It is not an existing Flame facility, and we will
                never present it as one. Ambition communicated honestly is ambition worth joining.
              </p>
            </div>
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

      {/* Team — honest pending block instead of unnamed placeholders (brief §12) */}
      <section className="section paper2 tight">
        <div className="container" style={{ maxWidth: "48rem" }}>
          <Reveal>
            <div className="pending-block">
              <span className="eyebrow" style={{ justifyContent: "center" }}>Team</span>
              <h3 style={{ marginTop: "0.6rem" }}>Meet the team — soon, with real faces.</h3>
              <p>
                We will introduce the people behind Flame Connect with real photography and short,
                role-focused bios once the list is approved. Until then we publish no ceremonial
                biographies and no stock-photo stand-ins — the work and this site speak first.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        question="Want to build this with us?"
        copy="We are open to partnerships with businesses, institutions, development organizations, investors and ecosystem actors who share the ambition."
        primary={{ label: "Partner with Flame", href: "/contact?intent=partnership" }}
        secondary={{ label: "See how we work", href: "/services" }}
      />
    </>
  );
}
