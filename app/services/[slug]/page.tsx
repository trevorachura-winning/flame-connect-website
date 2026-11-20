import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { SectionHead } from "../../../components/SectionHead";
import { Faq } from "../../../components/Faq";
import { Icon } from "../../../components/Icons";
import { Reveal } from "../../../components/Reveal";
import { JsonLd } from "../../../components/JsonLd";
import { SERVICES, ENGAGEMENT_STAGES, QUOTE_NOTE, getService } from "../../../content/services";
import { getProduct } from "../../../lib/content";
import { StatusBadge } from "../../../components/StatusBadge";
import { pageMetadata, faqJsonLd } from "../../../lib/seo";
import { ServiceAtAGlance } from "../../../components/marketing/ServiceAtAGlance";
import s from "../../../styles/marketing/marketing.module.css";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const relatedProducts = service.relatedProductSlugs
    .map(getProduct)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      {/* 1 — Hero */}
      <section className="page-hero white">
        <div className="container page-hero-grid">
          <div>
            <Breadcrumbs items={[{ name: "Services", href: "/services" }, { name: service.name, href: `/services/${service.slug}` }]} />
            <span className="eyebrow">{service.eyebrow}</span>
            <h1 className="display-1" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}>{service.proposition}</h1>
            <p className="lede">{service.description}</p>
            <div className="hero-actions">
              <Link href={`/contact?intent=consultation&service=${service.slug}`} className="btn btn-primary">
                Book a consultation <Icon name="arrow-right" size={17} />
              </Link>
              {service.slug === "ai-in-business" && (
                <Link href="/assessment" className="btn btn-outline">
                  Take the free AI readiness assessment
                </Link>
              )}
            </div>
          </div>
          <div className="frame">
            <Image src={service.image.src} alt={service.image.alt} width={1536} height={1024} priority sizes="(max-width: 62rem) 92vw, 46vw" />
          </div>
        </div>
      </section>

      {/* 1b — At a glance: challenge → delivery → outcome */}
      <section className="section tight" style={{ paddingBottom: 0 }} aria-label={`${service.name} at a glance`}>
        <div className="container">
          <Reveal>
            <ServiceAtAGlance service={service} />
          </Reveal>
        </div>
      </section>

      {/* 2 — Who it's for + 3 — Problems */}
      <section className="section tight">
        <div className={`container ${s.split} ${s.splitTop}`}>
          <Reveal>
            <SectionHead eyebrow="Who it is for" title="Built for these situations" />
            <ul className="tick-list">
              {service.whoFor.map((w) => (
                <li key={w}><Icon name="users" size={18} /> {w}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHead eyebrow="Problems we help solve" title="Recognise any of these?" />
            <ul className="tick-list">
              {service.problems.map((p) => (
                <li key={p}><Icon name="target" size={18} /> {p}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 4 — What we can do */}
      <section className="section paper2 tight">
        <div className="container">
          <SectionHead eyebrow="What we can do" title={`${service.name} capabilities`} />
          <div className={s.cols4}>
            {service.capabilities.map((cap, i) => (
              <Reveal key={cap} delay={(i % 4) * 0.05}>
                <div className="card" style={{ padding: "1.15rem", flexDirection: "row", alignItems: "center", gap: "0.7rem", height: "100%" }}>
                  <Icon name="check" size={17} />
                  <span style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--ink)" }}>{cap}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4b — Named sub-services */}
      {service.offerings && (
        <section className="section tight">
          <div className="container">
            <SectionHead eyebrow={service.offerings.eyebrow} title={service.offerings.title} copy={service.offerings.intro} />
            <div className={s.cols3}>
              {service.offerings.items.map((item, i) => (
                <Reveal key={item.name} delay={(i % 3) * 0.05}>
                  <article className="card" style={{ height: "100%" }}>
                    <h3>{item.name}</h3>
                    <p>{item.detail}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4c — Two quote-only ways to work with us */}
      {service.packages && (
        <section className="section paper2 tight">
          <div className="container">
            <SectionHead eyebrow="Ways to work with us" title="Start small or build the whole system" />
            <div className={s.cols2}>
              {service.packages.map((pkg, i) => (
                <Reveal key={pkg.name} delay={i * 0.08}>
                  <article className="card" style={{ height: "100%" }}>
                    <span className="eyebrow">{pkg.name}</span>
                    <h3>{pkg.bestFor}</h3>
                    <ul className="tick-list" style={{ margin: "0.4rem 0 1.2rem" }}>
                      {pkg.includes.map((line) => (
                        <li key={line}><Icon name="check" size={17} /> {line}</li>
                      ))}
                    </ul>
                    <div className="card-foot">
                      <Link
                        href={`/contact?intent=consultation&service=${service.slug}&package=${encodeURIComponent(pkg.name)}`}
                        className={i === 1 ? "btn btn-primary btn-sm" : "btn btn-outline btn-sm"}
                      >
                        Get a quote <Icon name="arrow-right" size={15} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="small" style={{ marginTop: "1.2rem", maxWidth: "46rem" }}>{QUOTE_NOTE}</p>
          </div>
        </section>
      )}

      {/* 5 — How we work + 6 — Outputs */}
      <section className="section tight">
        <div className={`container ${s.split} ${s.splitTop}`}>
          <Reveal>
            <SectionHead eyebrow="How we work" title="Assess. Learn. Improve. Implement." />
            <ol className="list-plain" style={{ counterReset: "s" }}>
              {ENGAGEMENT_STAGES.map((stage) => (
                <li key={stage.stage} style={{ borderLeft: "2px solid var(--line)", paddingLeft: "1rem" }}>
                  <b style={{ fontFamily: "var(--font-display)", color: "var(--navy-deep)" }}>{stage.stage}</b>
                  <p className="small" style={{ marginTop: "0.2rem" }}>{stage.what}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHead eyebrow="Typical outputs" title="What you leave with" />
            <ul className="tick-list">
              {service.outputs.map((o) => (
                <li key={o}><Icon name="layers" size={18} /> {o}</li>
              ))}
            </ul>
            <div className="callout" style={{ marginTop: "1.6rem" }}>
              <h3>The outcome we are actually selling</h3>
              <p style={{ color: "var(--ink-soft)" }}>{service.outcomeStatement}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7 — Related tools */}
      {relatedProducts.length > 0 && (
        <section className="band motif section tight">
          <div className="container">
            <SectionHead
              eyebrow="Our platforms"
              title="Platforms that travel with this service"
              copy="We can roll out our platforms as part of this service, set up around how your organisation works."
              light
            />
            <div className={s.cols3}>
              {relatedProducts.map((product) => (
                <article key={product.slug} className="proof-item">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                    <b>{product.name}</b>
                    <StatusBadge status={product.status} />
                  </div>
                  <p>{product.purpose}</p>
                  <Link href={`/products/${product.slug}`} className="text-link" style={{ color: "var(--flame)", marginTop: "0.7rem", display: "inline-flex" }}>
                    Meet {product.name} <Icon name="arrow-right" size={15} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9 — FAQs */}
      <section className="section paper2 tight">
        <div className="container" style={{ maxWidth: "56rem" }}>
          <SectionHead eyebrow="Questions" title="Before you ask" />
          <Faq items={service.faqs} />
          <JsonLd data={faqJsonLd(service.faqs)} />
        </div>
      </section>

      {/* 10 — Final CTA */}
      <section className="section tight">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="display-3">Ready to talk through {service.name}?</h2>
          <p className="lede" style={{ margin: "0.9rem auto 0" }}>
            Start with the problem. We will bring the structure.
          </p>
          <div className="hero-actions" style={{ justifyContent: "center" }}>
            <Link href={`/contact?intent=consultation&service=${service.slug}`} className="btn btn-primary">
              Book a consultation <Icon name="arrow-right" size={17} />
            </Link>
            <Link href="/services" className="btn btn-outline">All services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
