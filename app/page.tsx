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
import ambient from "../components/AmbientTechLines.module.css";
import { PRODUCTS, SERVICES, sortedArticles } from "../lib/content";
import {
  APPROACH_STAGES,
  AFRICA_FIRST_POINTS,
  HOME_HERO,
  HOME_CHALLENGES,
  HOME_CHAPTERS,
  HOME_PROVERB_OPEN,
  HOME_PROVERB_CLOSE,
  HOME_SCENES,
  HOME_SCENES_NOTE,
  METHOD_OUTPUTS,
} from "../content/home";
import { pageMetadata } from "../lib/seo";
import s from "../styles/marketing/marketing.module.css";
import m from "../styles/marketing/motion.module.css";

export const metadata = pageMetadata({
  title: "Flame Connect | Practical AI for African progress",
  description:
    "Flame Connect is an AI Centre of Change in Kampala, Uganda. We offer practical AI, digital communications and transformation support for African organisations. Digitizing Africa.",
  path: "/",
});

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/**
 * Homepage: a fireside story in seven chapters (UI/UX audit, 19 Nov 2026).
 *   01 the call (proverb + promise) → 02 the people (three scenes from our
 *   field notes) → 03 the trouble → 04 the journey (one method, three
 *   services) → 05 the tools (Flame OS, Flame Academy) → 06 what we have
 *   learned (design lessons + field notes) → 07 the invitation (proverb + CTA).
 */
export default function HomePage() {
  const insights = sortedArticles().slice(0, 3);

  return (
    <div className={m.scope}>
      {/* 01 — The call */}
      <section className="hero hero-home" aria-labelledby="home-title">
        <div className={`container ${s.split} ${ambient.foreground}`}>
          <div className={m.heroIntro}>
            <span className={`eyebrow ${m.rise}`} style={v({ "--i": 0 })}>{HOME_CHAPTERS.call}</span>
            <figure className={`${s.proverb} ${m.rise}`} style={v({ "--i": 1 })}>
              <blockquote>&ldquo;{HOME_PROVERB_OPEN.text}&rdquo;</blockquote>
              <figcaption>{HOME_PROVERB_OPEN.source}</figcaption>
            </figure>
            <h1 id="home-title" className="display-1" style={{ marginTop: "0.6rem" }}>
              <SplitText text={HOME_HERO.title} accent="progress." delayMs={120} />
            </h1>
            <p className={`lede ${m.rise}`} style={v({ "--i": 4, "--d": "150ms" })}>
              {HOME_PROVERB_OPEN.meaning} {HOME_HERO.lede}
            </p>
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

      {/* 02 — The people: three scenes from our field notes */}
      <section className="section" aria-labelledby="people-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>{HOME_CHAPTERS.people}</span>
            <h2 id="people-title" className="display-2">
              <SplitText text="Every story starts with someone trying to get work done." />
            </h2>
            <p className={`lede ${m.rise}`} style={v({ "--i": 3 })}>{HOME_SCENES_NOTE}</p>
          </InView>
          <div className={s.cols3}>
            {HOME_SCENES.map((scene, i) => (
              <InView key={scene.title} className={m.rise} style={v({ "--i": i })}>
                <article className={`card ${s.scene}`}>
                  <div className={s.sceneMedia}>
                    <Image
                      src={scene.image.src}
                      alt={scene.image.alt}
                      width={scene.image.width}
                      height={scene.image.height}
                      sizes="(max-width: 44rem) 92vw, (max-width: 62rem) 46vw, 30vw"
                    />
                  </div>
                  <div className={s.sceneBody}>
                    <h3>{scene.title}</h3>
                    <p>{scene.copy}</p>
                  </div>
                </article>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — The trouble */}
      <section className="section paper2" aria-labelledby="stalls-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>{HOME_CHAPTERS.trouble}</span>
            <h2 id="stalls-title" className="display-2">
              <SplitText text="Most organisations are not short of technology. They are short of traction." accent="traction." />
            </h2>
          </InView>
          <ChallengeList items={HOME_CHALLENGES} />
          <Reveal>
            <p className={s.turn}>
              We start with the problem, the people and how the work really runs.{" "}
              <span>Then we choose the technology.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 04 — The journey: one method, walked with three service lines */}
      <section className={`band section ${m.bandRise}`} aria-labelledby="method-title">
        <div className={`container ${ambient.foreground}`}>
          <InView className="section-head center">
            <span className={`eyebrow light ${m.rise}`}>{HOME_CHAPTERS.journey}</span>
            <h2 id="method-title" className="display-2">
              <SplitText text="Assess. Learn. Improve. Implement." accent="Implement." />
            </h2>
            <p className={`lede light ${m.rise}`} style={v({ "--i": 3 })}>
              Every piece of work we take on follows the same four steps. We understand the
              situation first, build shared understanding, improve the process, then put the
              solution in place and measure what changes.
            </p>
          </InView>
          <MethodRail
            labelledBy="method-title"
            steps={APPROACH_STAGES.map((st) => ({ key: st.key, copy: st.copy, output: METHOD_OUTPUTS[st.key] }))}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>Who walks it with you</span>
            <h2 id="services-title" className="display-2">
              <SplitText text="Three service lines, one path." />
            </h2>
            <p className={`lede ${m.rise}`} style={v({ "--i": 3 })}>
              Each line brings together related services. Every one starts with a small, low-risk
              first step and builds your team&rsquo;s own skills as it goes.
            </p>
          </InView>
          <SpotlightGroup>
            <ServiceOutcomeCards services={SERVICES} />
          </SpotlightGroup>
          <div className={s.center}>
            <Link href="/assessment" className={`btn btn-dark ${s.wrapBtn}`}>
              Not sure where to start? Take the free AI readiness assessment <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 05 — The tools: our two platforms */}
      <section className="section paper2" aria-labelledby="tools-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>{HOME_CHAPTERS.tools}</span>
            <h2 id="tools-title" className="display-2">
              <SplitText text="Two platforms for the people in our story." />
            </h2>
            <p className={`lede ${m.rise}`} style={v({ "--i": 5 })}>
              Flame OS helps the shop owner follow up with every customer. Flame Academy helps the
              school teach digital skills on the phones its students already carry. Both are
              launching soon.
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

      {/* 06 — What we have learned: design lessons + field notes */}
      <section className="section" aria-labelledby="africa-title">
        <div className={`container ${s.split}`}>
          <Reveal variant="fade" blur={false}>
            <div className={s.collage}>
              <div className={`${s.photo} ${s.photoTall} ${m.imgDrift}`}>
                <Image
                  src="/images/thought-leadership.jpg"
                  alt="African technology and business leaders in a candid strategy discussion in Kampala."
                  width={1536}
                  height={1024}
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
            <span className={`eyebrow ${m.rise}`}>{HOME_CHAPTERS.lessons}</span>
            <h2 id="africa-title" className="display-2" style={{ margin: "0.85rem 0 1rem" }}>
              <SplitText text="Lessons from building here." accent="here." />
            </h2>
            <p className={`lede ${m.rise}`} style={v({ "--i": 3 })}>
              Designing for Africa is a set of decisions, not a colour scheme. Our early testers
              taught us these, and we hold every project to them.
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

      <section className="section paper2" aria-labelledby="insights-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>From our field notes</span>
            <h2 id="insights-title" className="display-2">
              <SplitText text="What we write down so others can use it." />
            </h2>
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
            <Link href="/insights" className={`btn btn-dark ${s.wrapBtn}`}>
              Explore all insights <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 07 — The invitation */}
      <CTABand
        eyebrow={HOME_CHAPTERS.invitation}
        question={`“${HOME_PROVERB_CLOSE.text}”`}
        copy={`${HOME_PROVERB_CLOSE.source}, and how we like to work. Tell us what you are trying to change and we will find the most useful next step together: a service, a tool, a learning path or a small pilot.`}
        primary={{ label: "Book a discovery consultation", href: "/contact?intent=consultation" }}
        secondary={{ label: "Explore our services", href: "/services" }}
      />
    </div>
  );
}
