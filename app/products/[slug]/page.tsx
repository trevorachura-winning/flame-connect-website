import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { SectionHead } from "../../../components/SectionHead";
import { StatusBadge } from "../../../components/StatusBadge";
import { Faq } from "../../../components/Faq";
import { Icon } from "../../../components/Icons";
import { Reveal } from "../../../components/Reveal";
import { OsMock } from "../../../components/OsMock";
import { JsonLd } from "../../../components/JsonLd";
import { PRODUCTS, getProduct, getService } from "../../../lib/content";
import { STATUS_LABEL } from "../../../content/products";
import { productCtaHref } from "../../../lib/links";
import { pageMetadata, faqJsonLd } from "../../../lib/seo";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: `/products/${product.slug}`,
  });
}

const CTA_KIND_LABEL: Record<string, string> = {
  try: "Available to try",
  access: "Request access",
  waitlist: "Join the waitlist",
  talk: "Start a conversation",
};

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const cta = productCtaHref(product);
  const relatedService = getService(product.relatedServiceSlug);
  const others = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  const CtaLink = cta.external ? (
    <a href={cta.href} className="btn btn-primary">
      {product.cta.label} <Icon name="arrow-up-right" size={17} />
    </a>
  ) : (
    <Link href={cta.href} className="btn btn-primary">
      {product.cta.label} <Icon name="arrow-right" size={17} />
    </Link>
  );

  return (
    <>
      <section className="page-hero white">
        <div className="container">
          <Breadcrumbs items={[{ name: "Products", href: "/products" }, { name: product.name, href: `/products/${product.slug}` }]} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", alignItems: "center", marginBottom: "0.4rem" }}>
            <StatusBadge status={product.status} />
            <span className="small muted">{CTA_KIND_LABEL[product.cta.kind]}</span>
          </div>
          <h1 className="display-1">{product.headline}</h1>
          <p className="lede">{product.body}</p>
          <p className="small muted" style={{ marginTop: "1rem", maxWidth: "44rem" }}>
            <b style={{ color: "var(--navy-deep)" }}>{STATUS_LABEL[product.status]}.</b> {product.statusNote}
          </p>
          <div className="hero-actions">
            {CtaLink}
            <Link href="/contact?intent=consultation" className="btn btn-outline">Book a consultation</Link>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section tight">
        <div className="container">
          <SectionHead eyebrow="What it's for" title="Outcomes this tool is designed to create" />
          <div className="grid cols-2">
            {product.outcomes.map((outcome, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <article className="card" style={{ height: "100%", flexDirection: "row", alignItems: "flex-start", gap: "0.9rem" }}>
                  <span className="card-icon" style={{ width: "2.4rem", height: "2.4rem", flex: "none" }}>
                    <Icon name="target" size={19} />
                  </span>
                  <p style={{ margin: 0 }}>{outcome}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section paper2 tight">
        <div className="container">
          <SectionHead eyebrow="How it works" title={`${product.name} in three steps`} />
          <div className="grid cols-3">
            {product.howItWorks.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <article className="card lift" style={{ height: "100%" }}>
                  <span className="step-no" style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.9rem", color: "transparent", WebkitTextStroke: "1.4px var(--flame)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 style={{ fontSize: "1.15rem" }}>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interface note */}
      <section className="section tight">
        <div className="container split">
          <Reveal>
            <SectionHead
              eyebrow="Interface"
              title="What the experience is becoming"
              copy="Until live product screens are stable and verified, we show clearly labelled concept views instead of polished fakes. What you see here marks direction, not a promise of shipped pixels."
            />
            <div className="chip-row">
              {product.audiences.map((a) => (
                <span className="chip" key={a}>{a}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <OsMock
              rows={[
                { label: product.howItWorks[0]?.title ?? "Step 1", bar: 78, value: "in focus" },
                { label: product.howItWorks[1]?.title ?? "Step 2", bar: 56, value: "guided" },
                { label: product.howItWorks[2]?.title ?? "Step 3", bar: 34, value: "with support" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Trust notes */}
      <section className="band motif section tight">
        <div className="container split" style={{ alignItems: "start" }}>
          <Reveal>
            <span className="eyebrow light">Data · privacy · human control</span>
            <h2 className="display-3" style={{ margin: "0.8rem 0 1rem" }}>
              The boundaries are part of the product.
            </h2>
            <p className="lede light">
              What a tool refuses to do matters as much as what it does. These are the standing
              commitments for {product.name}.
            </p>
            {product.requirements.length > 0 && (
              <p className="lede light" style={{ marginTop: "1rem" }}>
                <b style={{ color: "#fff" }}>To start:</b> {product.requirements.join(" ")}
              </p>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="tick-list">
              {product.trustNotes.map((note) => (
                <li key={note}><Icon name="shield" size={18} /> {note}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section tight">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <SectionHead eyebrow="Questions" title="Honest answers" />
          <Faq items={product.faqs} />
          <JsonLd data={faqJsonLd(product.faqs)} />
        </div>
      </section>

      {/* Related + final CTA */}
      <section className="section paper2 tight">
        <div className="container">
          {relatedService && (
            <Reveal>
              <div className="card" style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <span className="card-icon"><Icon name="handshake" size={20} /></span>
                <div style={{ flex: 1, minWidth: "16rem" }}>
                  <b style={{ fontFamily: "var(--font-display)", color: "var(--navy-deep)" }}>
                    Prefer to start with a guided engagement?
                  </b>
                  <p className="small" style={{ marginTop: "0.25rem" }}>
                    {product.name} often arrives inside an {relatedService.name} engagement — we scope it around your workflow.
                  </p>
                </div>
                <Link href={`/services/${relatedService.slug}`} className="btn btn-dark btn-sm">
                  Explore {relatedService.name}
                </Link>
              </div>
            </Reveal>
          )}
          <SectionHead eyebrow="Keep exploring" title="Other tools in the family" />
          <div className="grid cols-3">
            {others.map((p) => (
              <article key={p.slug} className="card lift">
                <div className="product-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "1.08rem", margin: 0 }}>{p.name}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <p>{p.purpose}</p>
                <div className="card-foot">
                  <Link href={`/products/${p.slug}`} className="text-link">View product <Icon name="arrow-right" size={15} /></Link>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.4rem" }}>
            {CtaLink}
          </div>
        </div>
      </section>
    </>
  );
}
