import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { CTABand } from "../../components/CTABand";
import { Icon } from "../../components/Icons";
import { StatusBadge } from "../../components/StatusBadge";
import { InView } from "../../components/marketing/motion/InView";
import { SplitText } from "../../components/marketing/motion/SplitText";
import { SpotlightGroup } from "../../components/marketing/motion/SpotlightGroup";
import { PRODUCTS } from "../../lib/content";
import { productCtaHref } from "../../lib/links";
import { pageMetadata } from "../../lib/seo";
import s from "../../styles/marketing/marketing.module.css";
import m from "../../styles/marketing/motion.module.css";

export const metadata = pageMetadata({
  title: "Products — Flame OS and Flame Academy",
  description:
    "Flame OS, the growth operating system for African businesses, and Flame Academy, the digital-skills platform for Africa's education sector. Both launching soon.",
  path: "/products",
});

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/** Products overview (launch line-up, 18 Nov 2026): Flame OS + Flame Academy. */
export default function ProductsPage() {
  return (
    <div className={m.scope}>
      <section className="page-hero motif" aria-labelledby="products-title">
        <div className={`container ${m.heroIntro}`}>
          <span className={`eyebrow ${m.rise}`}>Products</span>
          <h1 id="products-title" className="display-1">
            <SplitText text="Platforms built for African progress." accent="African progress." delayMs={80} />
          </h1>
          <p className={`lede ${m.rise}`} style={v({ "--i": 5 })}>
            Two platforms, one aim: help African businesses grow and help young Africans build the
            digital skills to lead that growth. Both are launching soon.
          </p>
        </div>
      </section>

      <section className="section tight" aria-label="Our products">
        <SpotlightGroup className="container">
          <div style={{ display: "grid", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            {PRODUCTS.map((product, i) => {
              const cta = productCtaHref(product);
              return (
                <InView key={product.slug} className={m.rise}>
                  <article
                    className={`${s.story}${i % 2 === 1 ? ` ${s.storyReverse}` : ""} ${m.spot}`}
                    data-spotlight=""
                    aria-labelledby={`p-${product.slug}`}
                  >
                    <div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", alignItems: "center" }}>
                        <span className="eyebrow">{product.category}</span>
                        <StatusBadge status={product.status} />
                      </div>
                      <h2 id={`p-${product.slug}`} className={`display-2 ${s.storyTitle}`}>{product.name}</h2>
                      <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem", color: "var(--ink)", margin: "0 0 0.6rem" }}>
                        {product.tagline}
                      </p>
                      <p className={s.storyProp}>{product.body}</p>
                      <ul className="tick-list" style={{ marginTop: "1.1rem" }}>
                        {(product.features ?? []).map((f) => (
                          <li key={f.name}>
                            <Icon name="check" size={17} /> <span><b>{f.name}</b></span>
                          </li>
                        ))}
                      </ul>
                      <div className={s.actions}>
                        <Link href={`/products/${product.slug}`} className={`btn btn-dark ${s.wrapBtn}`}>
                          Explore {product.name} <Icon name="arrow-right" size={18} />
                        </Link>
                        <Link href={cta.href} className={`btn btn-outline ${s.wrapBtn}`}>
                          {product.cta.label}
                        </Link>
                      </div>
                    </div>
                    {product.image && (
                      <div className={`${s.storyMedia} ${m.zoom}`}>
                        <Image
                          src={product.image.src}
                          alt={product.image.alt}
                          width={product.image.width}
                          height={product.image.height}
                          sizes="(max-width: 62rem) 92vw, 40vw"
                          priority={i === 0}
                        />
                      </div>
                    )}
                  </article>
                </InView>
              );
            })}
          </div>
        </SpotlightGroup>
      </section>

      <CTABand
        question="Want to be first in line?"
        copy="Join early access for Flame OS or register your institution's interest in Flame Academy — or talk to our team about what you need."
        primary={{ label: "Talk to our team", href: "/contact?intent=consultation" }}
        secondary={{ label: "Explore our services", href: "/services" }}
      />
    </div>
  );
}
