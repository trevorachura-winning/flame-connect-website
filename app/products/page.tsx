import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { CTABand } from "../../components/CTABand";
import { Faq } from "../../components/Faq";
import { Icon } from "../../components/Icons";
import { JsonLd } from "../../components/JsonLd";
import { StatusBadge } from "../../components/StatusBadge";
import { InView } from "../../components/marketing/motion/InView";
import { SplitText } from "../../components/marketing/motion/SplitText";
import { HeroStage } from "../../components/marketing/motion/HeroStage";
import { SpotlightGroup } from "../../components/marketing/motion/SpotlightGroup";
import { PRODUCTS } from "../../lib/content";
import { productCtaHref } from "../../lib/links";
import { pageMetadata, faqJsonLd } from "../../lib/seo";
import s from "../../styles/marketing/marketing.module.css";
import m from "../../styles/marketing/motion.module.css";

const product = PRODUCTS[0];

export const metadata = pageMetadata({
  title: product.seo.title,
  description: product.seo.description,
  path: "/products",
});

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/**
 * Flagship product page (launch line-up, 18 Nov 2026): one platform —
 * Flame Sales, CRM + marketing automation — presented as launching soon with
 * an early-access list. Status and copy come from content/products.ts.
 */
export default function ProductsPage() {
  const cta = productCtaHref(product);
  const features = product.features ?? [];

  return (
    <div className={m.scope}>
      {/* Hero */}
      <section className="hero hero-home motif" aria-labelledby="product-title">
        <div className={`container ${s.split}`}>
          <div className={m.heroIntro}>
            <div className={m.rise} style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", alignItems: "center" }}>
              <span className="eyebrow">Flame Sales · CRM &amp; marketing automation</span>
              <StatusBadge status={product.status} />
            </div>
            <h1 id="product-title" className="display-1" style={{ marginTop: "1rem", fontSize: "clamp(2.4rem, 4.8vw, 4rem)" }}>
              <SplitText text={product.headline} accent="one simple platform." delayMs={100} />
            </h1>
            <p className={`lede ${m.rise}`} style={v({ "--i": 6, "--d": "150ms" })}>{product.body}</p>
            <div className={`hero-actions ${m.rise}`} style={v({ "--i": 7, "--d": "150ms" })}>
              <Link href={cta.href} className={`btn btn-primary ${s.wrapBtn}`}>
                {product.cta.label} <Icon name="arrow-right" size={18} />
              </Link>
              <Link href="/contact?intent=consultation&product=flame-sales" className={`btn btn-outline ${s.wrapBtn}`}>
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
                src="/images/field-operations.jpg"
                alt="Two professionals reviewing customer follow-ups on a tablet outside a small business in an East African city."
                width={1536}
                height={1024}
                priority
                sizes="(max-width: 62rem) 92vw, 46vw"
              />
            </div>
            <div className={`${m.layer} ${m.glassCard}`} style={v({ "--depth": 18, "--sdepth": 12 })}>
              <b>One platform</b>
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
              <SplitText text="Everything you need to grow, in one place." accent="in one place." />
            </h2>
            <p className={`lede ${m.rise}`} style={v({ "--i": 3 })}>
              Customers, pipeline, campaigns and follow-up usually live in different tools — or in
              someone&rsquo;s head. Flame Sales is built to bring them together.
            </p>
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
              <SplitText text="Start with what you already have." accent="already have." />
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
            <span className={`eyebrow light ${m.rise}`}>What changes for your business</span>
            <h2 id="outcomes-title" className="display-2" style={{ margin: "0.85rem 0 1.2rem" }}>
              <SplitText text="Fewer missed follow-ups. More customers won." accent="More customers won." />
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
            <span className={`eyebrow light ${m.rise}`}>Built for African businesses</span>
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
            Prefer a guided setup? Flame Sales can be rolled out as part of our{" "}
            <Link href="/services/ai-in-business" className="text-link">AI in Business</Link> service.
          </p>
        </div>
      </section>

      <CTABand
        question="Be among the first to use Flame Sales."
        copy="Join early access to hear first, see the platform before public launch and help shape what it does for businesses like yours."
        primary={{ label: product.cta.label, href: cta.href }}
        secondary={{ label: "Talk to our team", href: "/contact?intent=consultation&product=flame-sales" }}
      />
    </div>
  );
}
