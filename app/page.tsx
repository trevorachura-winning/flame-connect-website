import Link from "next/link";
import Image from "next/image";
import { SectionHead } from "../components/SectionHead";
import { CTABand } from "../components/CTABand";
import { InsightCard } from "../components/InsightCard";
import { Icon } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { Parallax } from "../components/Parallax";
import { ChallengeList } from "../components/marketing/ChallengeList";
import { ServiceOutcomeCards } from "../components/marketing/ServiceOutcomeCards";
import { ProductGateway } from "../components/marketing/ProductGateway";
import { ProofGrid } from "../components/marketing/ProofGrid";
import { PRODUCTS, SERVICES, sortedArticles } from "../lib/content";
import {
  APPROACH_STAGES,
  AFRICA_FIRST_POINTS,
  HOME_HERO,
  HOME_CHALLENGES,
  HOME_PROOF_POINTS,
} from "../content/home";
import { pageMetadata } from "../lib/seo";
import s from "../styles/marketing/marketing.module.css";

export const metadata = pageMetadata({
  title: "Flame Connect | Digitize Africa",
  description:
    "Flame Connect is an AI Centre of Change in Kampala, Uganda — practical AI, digital communications and transformation support for African organizations.",
  path: "/",
});

/**
 * Homepage narrative (marketing revamp, Nov 2026):
 *   1 hero (promise + one primary action) → 2 why change stalls (problem)
 *   → 3 services as practical change → 4 method → 5 tools, honestly labelled
 *   → 6 Africa-first → 7 evidence + latest thinking → 8 consultation CTA.
 * One primary CTA throughout: a discovery consultation.
 */
export default function HomePage() {
  const insights = sortedArticles().slice(0, 3);

  return (
    <>
      {/* 1 — Hero */}
      <section className="hero hero-home motif" aria-labelledby="home-title">
        <div className="container hero-grid">
          <div>
            <Reveal delay={0.04} variant="fade">
              <span className="eyebrow">{HOME_HERO.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 id="home-title" className="display-1">
                Practical AI for <span className="accent">African progress.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="lede">{HOME_HERO.lede}</p>
            </Reveal>
            <Reveal delay={0.26} variant="fade">
              <div className="hero-actions">
                <Link href="/contact?intent=consultation" className={`btn btn-primary ${s.wrapBtn}`}>
                  Book a discovery consultation <Icon name="arrow-right" size={18} />
                </Link>
                <Link href="/services" className={`btn btn-outline ${s.wrapBtn}`}>
                  See how we help
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.34} variant="fade">
              <div className="hero-points">
                {HOME_HERO.points.map((point) => (
                  <span key={point}>
                    <Icon name="check" size={16} /> {point}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2} variant="scale" blur={false}>
            <Parallax strength={0.045}>
              <div className="hero-media">
                <div className="frame">
                  <Image
                    src="/images/home-hero.jpg"
                    alt="African business team reviewing a digital workflow together in a modern Kampala workspace."
                    width={1774}
                    height={887}
                    priority
                    sizes="(max-width: 62rem) 92vw, 46vw"
                  />
                </div>
                <div className="hero-card">
                  <b>AI Centre of Change</b>
                  <span>Assess. Learn. Improve. Implement.</span>
                </div>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* 2 — The problem */}
      <section className="section" aria-labelledby="stalls-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why change stalls</span>
            <h2 id="stalls-title" className="display-2">
              Most organizations are not short of technology. They are short of traction.
            </h2>
          </div>
          <ChallengeList items={HOME_CHALLENGES} />
          <Reveal>
            <p className={s.turn}>
              We start with the problem, the people and the operating reality —{" "}
              <span>then choose the technology.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 — Practical change: three service lines */}
      <section className="section paper2" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we do</span>
            <h2 id="services-title" className="display-2">From possibility to practical change.</h2>
            <p className="lede">
              Three service lines, one way of working. Each one begins with a focused, low-risk
              first engagement and builds your team&rsquo;s own capability as it goes.
            </p>
          </div>
          <ServiceOutcomeCards services={SERVICES} />
        </div>
      </section>

      {/* 4 — Method */}
      <section className="band motif section approach" aria-labelledby="method-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow light">How we work</span>
            <h2 id="method-title" className="display-2">Assess. Learn. Improve. Implement.</h2>
            <p className="lede light">
              We understand the current reality before prescribing a tool, build shared
              understanding, improve the process or experience, then implement and measure what
              works.
            </p>
          </div>
          <ol className="grid cols-4 approach-rail list-plain" style={{ gap: "1.25rem" }}>
            {APPROACH_STAGES.map((stage, i) => (
              <Reveal as="li" key={stage.key} delay={i * 0.08}>
                <div className="approach-step">
                  <span className="step-no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{stage.key}</h3>
                  <p>{stage.copy}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 — Tools, honestly labelled */}
      <section className="section" aria-labelledby="tools-title">
        <div className={`container ${s.split} ${s.splitTop}`}>
          <Reveal variant="fade">
            <span className="eyebrow">Flame OS and the product family</span>
            <h2 id="tools-title" className="display-2" style={{ margin: "0.85rem 0 1rem" }}>
              Tools built around real work — with their status in plain sight.
            </h2>
            <p className="lede">
              Flame OS is the shared platform layer behind a growing family of practical tools for
              sales, insight, readiness, learning, automation, reach and impact. Most are still being
              built; each one says so.
            </p>
            <div className={s.actions}>
              <Link href="/flame-os" className={`btn btn-dark ${s.wrapBtn}`}>
                Explore Flame OS <Icon name="arrow-right" size={18} />
              </Link>
              <Link href="/products" className={`btn btn-outline ${s.wrapBtn}`}>
                All products
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} variant="fade" blur={false}>
            <ProductGateway products={PRODUCTS} />
          </Reveal>
        </div>
      </section>

      {/* 6 — Built for African realities */}
      <section className="section paper2" aria-labelledby="africa-title">
        <div className={`container ${s.split}`}>
          <Reveal delay={0.1} variant="fade" blur={false}>
            <div className={s.collage}>
              <div className={`${s.photo} ${s.photoTall}`}>
                <Image
                  src="/images/sme-mobile.jpg"
                  alt="Ugandan small business owner managing daily work with a smartphone and notebook in her shop."
                  width={1024}
                  height={1536}
                  sizes="(max-width: 44rem) 92vw, (max-width: 62rem) 50vw, 26vw"
                />
              </div>
              <div className={s.collageStack}>
                <div className={`${s.photo} ${s.photoWide}`}>
                  <Image
                    src="/images/field-operations.jpg"
                    alt="Two professionals reviewing work on a tablet outside a small enterprise in an East African city."
                    width={1536}
                    height={1024}
                    sizes="(max-width: 44rem) 46vw, (max-width: 62rem) 44vw, 22vw"
                  />
                </div>
                <div className={`${s.photo} ${s.photoWide}`}>
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
          <Reveal variant="fade">
            <span className="eyebrow">Built for African realities</span>
            <h2 id="africa-title" className="display-2" style={{ margin: "0.85rem 0 1rem" }}>
              Africa-first is a design decision.
            </h2>
            <p className="lede">
              Local relevance is not a visual theme. It means designing for mobile use, variable
              connectivity, affordability, different levels of digital maturity and the realities of
              how work gets done across African markets.
            </p>
            <ul className="tick-list" style={{ marginTop: "1.4rem" }}>
              {AFRICA_FIRST_POINTS.map((point) => (
                <li key={point}>
                  <Icon name="check" size={18} /> {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 7 — Evidence + latest thinking */}
      <section className="section" aria-labelledby="evidence-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Evidence before claims</span>
            <h2 id="evidence-title" className="display-2">What you can check for yourself.</h2>
            <p className="lede">
              We would rather show our method and our working notes than invent a highlight reel.
              Here is what is public today.
            </p>
          </div>
          <ProofGrid items={HOME_PROOF_POINTS} />

          <div className="section-head" style={{ marginTop: "clamp(3.5rem, 7vw, 5.5rem)" }}>
            <span className="eyebrow">Latest thinking</span>
            <h2 className="display-3">Ideas grounded in African practice.</h2>
          </div>
          <div className={s.cols3}>
            {insights.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.08}>
                <InsightCard article={article} />
              </Reveal>
            ))}
          </div>
          <div className={s.center}>
            <Link href="/resources" className={`btn btn-dark ${s.wrapBtn}`}>
              Explore all resources <Icon name="arrow-right" size={18} />
            </Link>
            <p className="small" style={{ marginTop: "1rem", color: "var(--ink-faint)" }}>
              Want to test tools and shape what gets built next?{" "}
              <Link href="/community#join" className="text-link">Join the Flame community</Link>
            </p>
          </div>
        </div>
      </section>

      {/* 8 — Conversion */}
      <CTABand
        question="What are you trying to change?"
        copy="Tell us the problem, workflow or opportunity you are working on. In a discovery consultation we will help you identify the most useful next step — a service, a tool, a learning path or a focused pilot."
        primary={{ label: "Book a discovery consultation", href: "/contact?intent=consultation" }}
        secondary={{ label: "Explore our services", href: "/services" }}
      />
    </>
  );
}
