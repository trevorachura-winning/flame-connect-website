import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { CTABand } from "../components/CTABand";
import { InsightCard } from "../components/InsightCard";
import { Icon } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { ChallengeList } from "../components/marketing/ChallengeList";
import { ServiceOutcomeCards } from "../components/marketing/ServiceOutcomeCards";
import { StatusBadge } from "../components/StatusBadge";
import { InView } from "../components/marketing/motion/InView";
import { SplitText } from "../components/marketing/motion/SplitText";
import { HeroStage } from "../components/marketing/motion/HeroStage";
import { SpotlightGroup } from "../components/marketing/motion/SpotlightGroup";
import { MethodRail } from "../components/marketing/motion/MethodRail";
import { Marquee } from "../components/marketing/motion/Marquee";
import { PathwayCards } from "../components/marketing/motion/PathwayCards";
import { PRODUCTS, SERVICES, sortedArticles } from "../lib/content";
import {
  APPROACH_STAGES,
  AFRICA_FIRST_POINTS,
  HOME_HERO,
  HOME_CHALLENGES,
  HOME_PATHWAYS,
  METHOD_OUTPUTS,
} from "../content/home";
import { pageMetadata } from "../lib/seo";
import s from "../styles/marketing/marketing.module.css";
import m from "../styles/marketing/motion.module.css";

export const metadata = pageMetadata({
  title: "Flame Connect | Practical AI for African progress",
  description:
    "Flame Connect is an AI Centre of Change in Kampala, Uganda — practical AI, digital communications and transformation support for African organizations. Digitizing Africa.",
  path: "/",
});

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/**
 * Homepage narrative (marketing revamp, Nov 2026):
 *   1 hero (promise, staged entrance, layered depth) → 2 practice strip
 *   → 3 why change stalls → 4 three service lines → 5 method rail
 *   → 6 tools, honestly labelled → 7 Africa-first → 8 evidence + thinking
 *   → 9 where to start → 10 consultation CTA.
 */
export default function HomePage() {
  const insights = sortedArticles().slice(0, 3);
  const marquee = [
    ...SERVICES.map((sv) => ({ text: sv.name, kind: "service" as const })),
    ...APPROACH_STAGES.map((st) => ({ text: st.key, kind: "method" as const })),
    ...PRODUCTS.flatMap((p) => [
      { text: p.name, kind: "product" as const },
      ...(p.features ?? []).map((f) => ({ text: f.name, kind: "product" as const })),
    ]),
  ];

  return (
    <div className={m.scope}>
      {/* 1 — Hero */}
      <section className="hero hero-home motif" aria-labelledby="home-title">
        <div className={`container ${s.split}`}>
          <div className={m.heroIntro}>
            <span className={`eyebrow ${m.rise}`} style={v({ "--i": 0 })}>{HOME_HERO.eyebrow}</span>
            <h1 id="home-title" className="display-1" style={{ marginTop: "1rem" }}>
              <SplitText text={HOME_HERO.title} accent="African progress." delayMs={120} />
            </h1>
            <p className={`lede ${m.rise}`} style={v({ "--i": 4, "--d": "150ms" })}>{HOME_HERO.lede}</p>
            <div className={`hero-actions ${m.rise}`} style={v({ "--i": 5, "--d": "150ms" })}>
              <Link href="/contact?intent=consultation" className={`btn btn-primary ${s.wrapBtn}`}>
                Book a discovery consultation <Icon name="arrow-right" size={18} />
              </Link>
              <Link href="/products" className={`btn btn-outline ${s.wrapBtn}`}>
                Explore our products
              </Link>
            </div>
            <div className={`hero-points ${m.rise}`} style={v({ "--i": 6, "--d": "150ms" })}>
              {HOME_HERO.points.map((point) => (
                <span key={point}>
                  <Icon name="check" size={16} /> {point}
                </span>
              ))}
            </div>
            <p className={`${m.signature} ${m.rise}`} style={v({ "--i": 7, "--d": "150ms" })}>
              {HOME_HERO.signature}
            </p>
          </div>

          <HeroStage>
            <div className={`${m.layer} ${m.heroMain}`} style={v({ "--depth": 6, "--sdepth": -24 })}>
              <Image
                src="/images/home-hero.jpg"
                alt="African business team reviewing a digital workflow together in a modern Kampala workspace."
                width={1774}
                height={887}
                priority
                sizes="(max-width: 62rem) 92vw, 46vw"
              />
            </div>
            <div className={`${m.layer} ${m.heroInset}`} style={v({ "--depth": -14, "--sdepth": 36 })}>
              <Image
                src="/images/sme-mobile.jpg"
                alt="Ugandan small business owner managing daily work with a smartphone in her shop."
                width={1024}
                height={1536}
                sizes="(max-width: 44rem) 34vw, 16vw"
              />
            </div>
            <div className={`${m.layer} ${m.glassCard}`} style={v({ "--depth": 18, "--sdepth": 14 })}>
              <b>AI Centre of Change</b>
              <span>Assess. Learn. Improve. Implement.</span>
              <div className={m.methodTicks} aria-hidden="true">
                {APPROACH_STAGES.map((st, i) => (
                  <i key={st.key} style={v({ "--i": i })} />
                ))}
              </div>
            </div>
            <div className={`${m.layer} ${m.chip}`} style={v({ "--depth": 26, "--sdepth": -10 })}>
              <span className={m.pulse} aria-hidden="true" /> Human-controlled AI
            </div>
          </HeroStage>
        </div>
      </section>

      {/* 2 — Practice strip: Flame's own services, method and product family */}
      <Marquee label="Flame Connect service lines, method and product family" items={marquee} />

      {/* 3 — The problem */}
      <section className="section" aria-labelledby="stalls-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>Why change stalls</span>
            <h2 id="stalls-title" className="display-2">
              <SplitText text="Most organizations are not short of technology. They are short of traction." accent="short of traction." />
            </h2>
          </InView>
          <ChallengeList items={HOME_CHALLENGES} />
          <Reveal>
            <p className={s.turn}>
              We start with the problem, the people and the operating reality —{" "}
              <span>then choose the technology.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 4 — Practical change: three service lines */}
      <section className="section paper2" aria-labelledby="services-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>What we do</span>
            <h2 id="services-title" className="display-2">
              <SplitText text="From possibility to practical change." accent="practical change." />
            </h2>
            <p className={`lede ${m.rise}`} style={v({ "--i": 3 })}>
              Three service lines, one way of working. Each begins with a focused, low-risk first
              engagement and builds your team&rsquo;s own capability as it goes.
            </p>
          </InView>
          <SpotlightGroup>
            <ServiceOutcomeCards services={SERVICES} />
          </SpotlightGroup>
        </div>
      </section>

      {/* 5 — Method: scroll-linked numbered rail */}
      <section className={`band motif section ${m.bandRise}`} aria-labelledby="method-title">
        <div className="container">
          <InView className="section-head center">
            <span className={`eyebrow light ${m.rise}`}>How we work</span>
            <h2 id="method-title" className="display-2">
              <SplitText text="Assess. Learn. Improve. Implement." accent="Implement." />
            </h2>
            <p className={`lede light ${m.rise}`} style={v({ "--i": 3 })}>
              We understand the current reality before prescribing a tool, build shared
              understanding, improve the process, then implement and measure what works.
            </p>
          </InView>
          <MethodRail
            labelledBy="method-title"
            steps={APPROACH_STAGES.map((st) => ({ key: st.key, copy: st.copy, output: METHOD_OUTPUTS[st.key] }))}
          />
        </div>
      </section>

      {/* 6 — Our platforms: Flame OS + Flame Academy (launching soon) */}
      <section className="section" aria-labelledby="tools-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>Our platforms · launching soon</span>
            <h2 id="tools-title" className="display-2">
              <SplitText text="Two platforms built for African progress." accent="African progress." />
            </h2>
            <p className={`lede ${m.rise}`} style={v({ "--i": 5 })}>
              One helps businesses win and keep customers. The other helps young Africans build the
              digital skills to lead what comes next.
            </p>
          </InView>
          <SpotlightGroup className={s.cols2}>
            {PRODUCTS.map((product, i) => (
              <InView key={product.slug} className={m.rise} style={v({ "--i": i })}>
                <article className={`card lift ${m.spot}`} data-spotlight="" style={{ height: "100%", padding: 0, overflow: "hidden" }}>
                  {product.image && (
                    <div className={m.zoom} style={{ aspectRatio: "16 / 9", overflow: "hidden", background: "var(--panel)" }}>
                      <Image
                        src={product.image.src}
                        alt={product.image.alt}
                        width={product.image.width}
                        height={product.image.height}
                        sizes="(max-width: 44rem) 92vw, 46vw"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  )}
                  <div style={{ padding: "clamp(1.4rem, 2.6vw, 2rem)", display: "grid", gap: "0.7rem", flex: 1 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center" }}>
                      <span className="eyebrow">{product.category}</span>
                      <StatusBadge status={product.status} />
                    </div>
                    <h3 style={{ fontSize: "clamp(1.5rem, 2.6vw, 1.9rem)", margin: 0 }}>{product.name}</h3>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--ink)", margin: 0 }}>{product.tagline}</p>
                    <p style={{ margin: 0 }}>{product.purpose}</p>
                    <div className="chip-row" style={{ marginTop: "0.3rem" }}>
                      {(product.features ?? []).map((f) => (
                        <span key={f.name} className="chip">{f.name}</span>
                      ))}
                    </div>
                    <div className={s.actions} style={{ marginTop: "0.8rem" }}>
                      <Link href={`/products/${product.slug}`} className={`btn btn-dark btn-sm ${s.wrapBtn}`}>
                        Explore {product.name} <Icon name="arrow-right" size={16} />
                      </Link>
                      <Link href={`/contact?intent=waitlist&product=${product.slug}`} className={`btn btn-outline btn-sm ${s.wrapBtn}`}>
                        {product.cta.label}
                      </Link>
                    </div>
                  </div>
                </article>
              </InView>
            ))}
          </SpotlightGroup>
        </div>
      </section>

      {/* 7 — Built for African realities */}
      <section className="section paper2" aria-labelledby="africa-title">
        <div className={`container ${s.split}`}>
          <Reveal variant="fade" blur={false}>
            <div className={s.collage}>
              <div className={`${s.photo} ${s.photoTall} ${m.imgDrift}`}>
                <Image
                  src="/images/sme-mobile.jpg"
                  alt="Ugandan small business owner managing daily work with a smartphone and notebook in her shop."
                  width={1024}
                  height={1536}
                  sizes="(max-width: 44rem) 92vw, (max-width: 62rem) 50vw, 26vw"
                />
              </div>
              <div className={s.collageStack}>
                <div className={`${s.photo} ${s.photoWide} ${m.imgDrift}`}>
                  <Image
                    src="/images/field-operations.jpg"
                    alt="Two professionals reviewing work on a tablet outside a small enterprise in an East African city."
                    width={1536}
                    height={1024}
                    sizes="(max-width: 44rem) 46vw, (max-width: 62rem) 44vw, 22vw"
                  />
                </div>
                <div className={`${s.photo} ${s.photoWide} ${m.imgDrift}`}>
                  <Image
                    src="/images/urban-context.jpg"
                    alt="Contemporary Kampala commercial district with professionals on the move."
                    width={1536}
                    height={1024}
                    sizes="(max-width: 44rem) 46vw, (max-width: 62rem) 44vw, 22vw"
                  />
                </div>
              </div>
            </div>
          </Reveal>
          <InView>
            <span className={`eyebrow ${m.rise}`}>Built for African realities</span>
            <h2 id="africa-title" className="display-2" style={{ margin: "0.85rem 0 1rem" }}>
              <SplitText text="Africa-first is a design decision." accent="design decision." />
            </h2>
            <p className={`lede ${m.rise}`} style={v({ "--i": 3 })}>
              Local relevance is not a visual theme. It means designing for mobile use, variable
              connectivity, affordability, different levels of digital maturity and the realities of
              how work gets done across African markets.
            </p>
            <ul className="tick-list" style={{ marginTop: "1.4rem" }}>
              {AFRICA_FIRST_POINTS.map((point, i) => (
                <li key={point} className={m.rise} style={v({ "--i": 4 + i })}>
                  <Icon name="check" size={18} /> {point}
                </li>
              ))}
            </ul>
          </InView>
        </div>
      </section>

      {/* 8 — Latest thinking */}
      <section className="section" aria-labelledby="insights-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>Latest thinking</span>
            <h2 id="insights-title" className="display-2">
              <SplitText text="Ideas grounded in African practice." accent="African practice." />
            </h2>
            <p className={`lede ${m.rise}`} style={v({ "--i": 3 })}>
              Practical field notes, playbooks and perspectives on AI, digital communication and
              business growth.
            </p>
          </InView>
          <SpotlightGroup className={s.cols3}>
            {insights.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.08}>
                <div className={m.spot} data-spotlight="" style={{ borderRadius: "var(--radius-m)", height: "100%" }}>
                  <InsightCard article={article} />
                </div>
              </Reveal>
            ))}
          </SpotlightGroup>
          <div className={s.center}>
            <Link href="/resources" className={`btn btn-dark ${s.wrapBtn}`}>
              Explore all resources <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9 — Where to start */}
      <section className="section paper2" aria-labelledby="start-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>Where would you like to start?</span>
            <h2 id="start-title" className="display-2">
              <SplitText text="Three ways in. One conversation away." accent="One conversation away." />
            </h2>
          </InView>
          <PathwayCards paths={HOME_PATHWAYS} />
        </div>
      </section>

      {/* 10 — Conversion */}
      <CTABand
        question="What are you trying to change?"
        copy="Tell us the problem, workflow or opportunity you are working on. In a discovery consultation we will help you identify the most useful next step — a service, a tool, a learning path or a focused pilot."
        primary={{ label: "Book a discovery consultation", href: "/contact?intent=consultation" }}
        secondary={{ label: "Explore our services", href: "/services" }}
      />
    </div>
  );
}
