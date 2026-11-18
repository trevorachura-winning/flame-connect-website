import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { CTABand } from "../CTABand";
import { Faq } from "../Faq";
import { Icon } from "../Icons";
import { JsonLd } from "../JsonLd";
import { StatusBadge } from "../StatusBadge";
import { InView } from "./motion/InView";
import { SplitText } from "./motion/SplitText";
import { HeroStage } from "./motion/HeroStage";
import { SpotlightGroup } from "./motion/SpotlightGroup";
import { productCtaHref } from "../../lib/links";
import { faqJsonLd } from "../../lib/seo";
import type { Product } from "../../content/products";
import s from "../../styles/marketing/marketing.module.css";
import m from "../../styles/marketing/motion.module.css";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/**
 * Product landing page (launch line-up, 18 Nov 2026), rendered for each
 * product in content/products.ts: Flame OS and Flame Academy. Both are
 * launching soon; status and copy come only from the registry.
 */
export function ProductLanding({ product }: { product: Product }) {
  const cta = productCtaHref(product);
  const features = product.features ?? [];

  return (
    <div className={m.scope}>
      {/* Hero */}
      <section className="hero hero-home motif" aria-labelledby="product-title">
        <div className={`container ${s.split}`}>
          <div className={m.heroIntro}>
            <div className={m.rise} style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", alignItems: "center" }}>
              <span className="eyebrow">{product.name} · {product.category}</span>
              <StatusBadge status={product.status} />
            </div>
            <h1 id="product-title" className="display-1" style={{ marginTop: "1rem", fontSize: "clamp(2.4rem, 4.8vw, 4rem)" }}>
              <SplitText text={product.headline} accent={product.headline.split(" ").slice(-2).join(" ")} delayMs={100} />
            </h1>
            <p className={`lede ${m.rise}`} style={v({ "--i": 6, "--d": "150ms" })}>{product.body}</p>
            <div className={`hero-actions ${m.rise}`} style={v({ "--i": 7, "--d": "150ms" })}>
              <Link href={cta.href} className={`btn btn-primary ${s.wrapBtn}`}>
                {product.cta.label} <Icon name="arrow-right" size={18} />
              </Link>
              <Link href={`/contact?intent=consultation&product=${product.slug}`} className={`btn btn-outline ${s.wrapBtn}`}>
                Talk to our team
              </Link>
            </div>
            <p className={`small ${m.rise}`} style={v({ "--i": 8, "--d": "150ms", color: "var(--ink-faint)", marginTop: "1rem" })}>
              {product.statusNote}
            </p>
          </div>

          <HeroStage>
            <div className={`${m.layer} ${m.heroMain}`} style={v({ "--depth": 6, "--sdepth": -20 })}>
              <Image
                src={product.image?.src ?? "/images/field-operations.jpg"}
                alt={product.image?.alt ?? ""}
                width={product.image?.width ?? 1536}
                height={product.image?.height ?? 1024}
                priority
                sizes="(max-width: 62rem) 92vw, 46vw"
              />
            </div>
            <div className={`${m.layer} ${m.glassCard}`} style={v({ "--depth": 18, "--sdepth": 12 })}>
              <b>{product.tagline ?? product.name}</b>
              <span>{features.map((f) => f.name).join(" · ")}</span>
              <div className={m.methodTicks} aria-hidden="true">
                {features.map((f, i) => (
                  <i key={f.name} style={v({ "--i": i })} />
                ))}
              </div>
            </div>
            <div className={`${m.layer} ${m.chip}`} style={v({ "--depth": 24, "--sdepth": -10 })}>
              <span className={m.pulse} aria-hidden="true" /> Launching soon
            </div>
          </HeroStage>
        </div>
      </section>

      {/* Features */}
      <section className="section paper2" aria-labelledby="features-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>What it does</span>
            <h2 id="features-title" className="display-2">
              <SplitText text={`What ${product.name} brings together.`} />
            </h2>
            <p className={`lede ${m.rise}`} style={v({ "--i": 3 })}>{product.purpose}</p>
          </InView>
          <SpotlightGroup className={s.cols4}>
            {features.map((f, i) => (
              <InView key={f.name} className={m.rise} style={v({ "--i": i })}>
                <article className={`card lift ${m.spot}`} data-spotlight="" style={{ height: "100%" }}>
                  <span className="card-icon"><Icon name={f.icon} size={22} /></span>
                  <h3>{f.name}</h3>
                  <p>{f.copy}</p>
                </article>
              </InView>
            ))}
          </SpotlightGroup>
        </div>
      </section>

      {/* How it works */}
      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>How it works</span>
            <h2 id="how-title" className="display-2">
              <SplitText text="How it works." accent="works." />
            </h2>
          </InView>
          <InView as="ol" className={`${s.cols3} list-plain`}>
            {product.howItWorks.map((step, i) => (
              <li key={step.title} className={m.rise} style={v({ "--i": i })}>
                <span className={s.bigNo} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>{step.title}</h3>
                <p style={{ margin: 0, color: "var(--ink-soft)" }}>{step.body}</p>
              </li>
            ))}
          </InView>
        </div>
      </section>

      {/* Outcomes + built for Africa */}
      <section className={`band motif section ${m.bandRise}`} aria-labelledby="outcomes-title">
        <div className={`container ${s.split} ${s.splitTop}`}>
          <InView>
            <span className={`eyebrow light ${m.rise}`}>What changes</span>
            <h2 id="outcomes-title" className="display-2" style={{ margin: "0.85rem 0 1.2rem" }}>
              <SplitText text="The difference it is built to make." />
            </h2>
            <ul className="tick-list">
              {product.outcomes.map((o, i) => (
                <li key={o} className={m.rise} style={v({ "--i": 3 + i })}>
                  <Icon name="check" size={18} /> {o}
                </li>
              ))}
            </ul>
          </InView>
          <InView>
            <span className={`eyebrow light ${m.rise}`}>Built for African realities</span>
            <ul className="tick-list" style={{ marginTop: "1.2rem" }}>
              {product.trustNotes.map((note, i) => (
                <li key={note} className={m.rise} style={v({ "--i": 1 + i })}>
                  <Icon name="shield" size={18} /> {note}
                </li>
              ))}
            </ul>
            <p className={`lede light ${m.rise}`} style={v({ "--i": 6, marginTop: "1.2rem" })}>
              <b style={{ color: "#fff" }}>To start:</b> {product.requirements.join(" ")}
            </p>
          </InView>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-title">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>Questions</span>
            <h2 id="faq-title" className="display-2">
              <SplitText text="Before you join." />
            </h2>
          </InView>
          <Faq items={product.faqs} />
          <JsonLd data={faqJsonLd(product.faqs)} />
          <p className="small" style={{ marginTop: "1.6rem", color: "var(--ink-faint)" }}>
            Prefer a guided rollout? {product.name} can be delivered as part of our{" "}
            <Link href={`/services/${product.relatedServiceSlug}`} className="text-link">
              {product.relatedServiceSlug === "ai-in-business" ? "AI in Business" : "Consulting & Thought Leadership"}
            </Link>{" "}
            service.
          </p>
        </div>
      </section>

      <CTABand
        question={`Hear first when ${product.name} launches.`}
        copy={product.statusNote}
        primary={{ label: product.cta.label, href: cta.href }}
        secondary={{ label: "Talk to our team", href: `/contact?intent=consultation&product=${product.slug}` }}
      />
    </div>
  );
}
