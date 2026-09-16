import Link from "next/link";
import Image from "next/image";
import { SectionHead } from "../components/SectionHead";
import { CTABand } from "../components/CTABand";
import { ProductCard } from "../components/ProductCard";
import { InsightCard } from "../components/InsightCard";
import { Icon, type IconName } from "../components/Icons";
import { Reveal } from "../components/Reveal";
import { Parallax } from "../components/Parallax";
import { OsMock } from "../components/OsMock";
import { PRODUCTS, SERVICES, sortedArticles } from "../lib/content";
import { APPROACH_STAGES, AFRICA_FIRST_POINTS, COMMUNITY_SURFACES } from "../content/home";
import { flameOsAppHref } from "../lib/links";
import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Flame Connect | Digitize Africa",
  description:
    "Flame Connect helps African businesses and communities use AI, digital communications and practical tools to improve decisions, workflows and growth.",
  path: "/",
});

const PILLAR_ICONS: Record<string, IconName> = {
  "digital-communications": "megaphone",
  "ai-in-business": "workflow",
  "consulting-thought-leadership": "compass",
};

export default function HomePage() {
  const osApp = flameOsAppHref();
  const insights = sortedArticles().slice(0, 3);

  return (
    <>
      {/* 1 — Hero. Staggered cascade: each line settles in turn. */}
      <section className="hero hero-home motif">
        <div className="container hero-grid">
          <div>
            <Reveal delay={0.04} variant="fade">
              <span className="eyebrow">AI · Digital · Transformation · Africa</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-1">
                Digitize <span className="accent">Africa.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="lede">
                Flame Connect helps businesses, professionals and communities turn technology into
                better decisions, stronger communication, smarter workflows and measurable growth.
              </p>
            </Reveal>
            <Reveal delay={0.26} variant="fade">
              <div className="hero-actions">
                <Link href="/products" className="btn btn-primary">
                  Explore free tools <Icon name="arrow-right" size={18} />
                </Link>
                <Link href="/contact?intent=consultation" className="btn btn-dark">
                  Book a consultation
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.34} variant="fade">
              <div className="hero-points">
                <span><Icon name="check" size={16} /> Services and products</span>
                <span><Icon name="check" size={16} /> Human-controlled AI</span>
                <span><Icon name="check" size={16} /> Ugandan-rooted, Africa-focused</span>
              </div>
            </Reveal>
          </div>
          {/* No blur filter over a large image — it would cost a full-frame
              composite for no visible gain. Parallax carries the depth here. */}
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

      {/* 2 — What Flame Connect does */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title="From possibility to practical change."
            copy="Technology creates value when it fits the problem, the people and the operating context. We connect strategy, capability, communication and implementation so change can move beyond presentations into everyday work."
          />
          <div className="grid cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <article className="card lift pillar-card" style={{ height: "100%" }}>
                  <span className="card-icon">
                    <Icon name={PILLAR_ICONS[service.slug] ?? "spark"} size={22} />
                  </span>
                  <h3>{service.name}</h3>
                  <p>{service.cardCopy}</p>
                  <div className="card-foot">
                    <Link href={`/services/${service.slug}`} className="text-link">
                      Explore {service.name.split(" ")[0] === "Digital" ? "Digital & Communications" : service.name === "AI in Business" ? "AI in Business" : "Consulting"} <Icon name="arrow-right" size={16} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Approach */}
      <section className="band motif section approach">
        <div className="container">
          <SectionHead
            eyebrow="How we work"
            title="Assess. Learn. Improve. Implement."
            copy="We start by understanding the current reality, not by prescribing a tool. We assess needs, build shared understanding, improve the process or experience, then implement and measure what works."
            light
          />
          <div className="grid cols-4 approach-rail">
            {APPROACH_STAGES.map((stage, i) => (
              <Reveal key={stage.key} delay={i * 0.08}>
                <div className="approach-step">
                  <span className="step-no">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{stage.key}</h3>
                  <p>{stage.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Flame OS */}
      <section className="section paper2">
        <div className="container split">
          <Reveal variant="left">
            <span className="eyebrow">One platform. A growing family of tools.</span>
            <h2 className="display-2" style={{ margin: "0.85rem 0 1rem" }}>Meet Flame OS.</h2>
            <p className="lede">
              Flame OS is the shared platform layer behind a growing set of practical tools for
              sales, insight, readiness, learning, automation, reach and impact. It brings identity,
              organization context, analytics, AI orchestration and governance into one connected
              experience.
            </p>
            <div className="hero-actions">
              <Link href="/flame-os" className="btn btn-primary">
                Explore Flame OS <Icon name="arrow-right" size={18} />
              </Link>
              {osApp.external ? (
                <a href={osApp.href} className="btn btn-outline">Sign in</a>
              ) : (
                <Link href={osApp.href} className="btn btn-outline">Sign in</Link>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.12} variant="right" blur={false}>
            <OsMock />
          </Reveal>
        </div>
      </section>

      {/* 5 — Product family */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="The product family"
            title="Tools built around real work."
            copy="Start with the problem you need to solve. Each Flame tool is designed to make a specific part of work clearer, faster or easier to improve — and each one shows its status honestly."
          />
          <div className="grid cols-3">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 0.08}>
                <ProductCard product={product} flame={i % 2 === 1} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: "center", marginTop: "2.2rem" }}>
              <Link href="/products" className="btn btn-dark">
                See the full product family <Icon name="arrow-right" size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6 — Built for African realities */}
      <section className="section paper2">
        <div className="container split">
          <Reveal delay={0.1} variant="left" blur={false}>
            <div className="collage">
              <div className="c-a">
                <div className="frame tall">
                  <Image src="/images/sme-mobile.jpg" alt="Ugandan small business owner managing daily work with a smartphone and notebook in her shop." width={1024} height={1536} sizes="(max-width: 62rem) 92vw, 38vw" />
                </div>
              </div>
              <div className="c-b">
                <div className="frame wide">
                  <Image src="/images/field-operations.jpg" alt="Two professionals reviewing work on a tablet outside a small enterprise in an East African city." width={1536} height={1024} sizes="(max-width: 62rem) 92vw, 30vw" />
                </div>
                <div className="frame wide">
                  <Image src="/images/urban-context.jpg" alt="Contemporary Kampala commercial district with professionals on the move." width={1536} height={1024} sizes="(max-width: 62rem) 92vw, 30vw" />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal variant="right">
            <span className="eyebrow">Built for African realities</span>
            <h2 className="display-2" style={{ margin: "0.85rem 0 1rem" }}>
              Africa-first is a design decision.
            </h2>
            <p className="lede">
              For us, local relevance is not a visual theme. It means designing for mobile use,
              variable connectivity, affordability, different levels of digital maturity, local
              institutions and the realities of how work gets done across African markets.
            </p>
            <ul className="tick-list" style={{ marginTop: "1.4rem" }}>
              {AFRICA_FIRST_POINTS.map((point) => (
                <li key={point}><Icon name="check" size={18} /> {point}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 7 — Community */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Community"
            title="Build with the people who will use it."
            copy="Flame Connect is building a community where practitioners, businesses and learners can test tools, share playbooks, practise new skills and shape what gets built next."
          />
          <div className="grid cols-4">
            {COMMUNITY_SURFACES.map((surface, i) => (
              <Reveal key={surface.name} delay={i * 0.07}>
                <article className="card lift" style={{ height: "100%" }}>
                  <h3 style={{ fontSize: "1.12rem" }}>{surface.name}</h3>
                  <p>{surface.purpose}</p>
                  <div className="card-foot">
                    <Link href={surface.href} className="text-link">
                      {surface.cta} <Icon name="arrow-right" size={16} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: "center", marginTop: "2.2rem" }}>
              <Link href="/community#join" className="btn btn-primary">
                Join the Flame community <Icon name="arrow-right" size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8 — Insights */}
      <section className="section white">
        <div className="container">
          <SectionHead
            eyebrow="Resources"
            title="Ideas grounded in African practice."
            copy="Read field notes, practical guides, research and perspectives on AI, digital communication, business growth and transformation in African contexts."
          />
          <div className="grid cols-3">
            {insights.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.08}>
                <InsightCard article={article} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign: "center", marginTop: "2.2rem" }}>
              <Link href="/resources" className="btn btn-dark">
                Explore insights <Icon name="arrow-right" size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9 — Final conversion */}
      <CTABand />
    </>
  );
}
