import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { SectionHead } from "../../../components/SectionHead";
import { Faq } from "../../../components/Faq";
import { Icon } from "../../../components/Icons";
import { Reveal } from "../../../components/Reveal";
import { JsonLd } from "../../../components/JsonLd";
import { SERVICES, ENGAGEMENT_STAGES, getService } from "../../../content/services";
import { getProduct } from "../../../lib/content";
import { StatusBadge } from "../../../components/StatusBadge";
import { pageMetadata, faqJsonLd } from "../../../lib/seo";

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
            </div>
          </div>
          <div className="frame">
            <Image src={service.image.src} alt={service.image.alt} width={1536} height={1024} priority sizes="(max-width: 62rem) 92vw, 46vw" />
          </div>
        </div>
      </section>

      {/* 2 — Who it's for + 3 — Problems */}
      <section className="section tight">
        <div className="container split" style={{ alignItems: "start" }}>
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
          <div className="grid cols-4">
            {service.capabilities.map((cap, i) => (
              <Reveal key={cap} delay={(i % 4) * 0.05}>
                <div className="card" style={{ padding: "1.15rem", flexDirection: "row", alignItems: "center", gap: "0.7rem" }}>
                  <Icon name="check" size={17} />
                  <span style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--ink)" }}>{cap}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — How we work + 6 — Outputs */}
      <section className="section tight">
        <div className="container split" style={{ alignItems: "start" }}>
          <Reveal>
            <SectionHead eyebrow="How we work" title="The engagement arc" />
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
              eyebrow="Tools that travel with this service"
              title="Products in this space"
              copy="Our tools often arrive inside service engagements — scoped to your workflow, with status shown honestly."
              light
            />
            <div className="grid cols-3">
              {relatedProducts.map((product) => (
                <article key={product.slug} className="proof-item">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                    <b>{product.name}</b>
                    <StatusBadge status={product.status} />
                  </div>
                  <p>{product.purpose}</p>
                  <Link href={`/products/${product.slug}`} className="text-link" style={{ color: "var(--amber)", marginTop: "0.7rem", display: "inline-flex" }}>
                    View product <Icon name="arrow-right" size={15} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8 — Proof approach (no fabricated client claims) */}
      <section className="section tight">
        <div className="container">
          <Reveal>
            <div className="callout" style={{ borderLeftColor: "var(--navy)" }}>
              <h3>Proof, promised properly</h3>
              <p style={{ color: "var(--ink-soft)" }}>
                We do not publish client names, logos or metrics without written approval and
                verifiable evidence. As case studies clear that bar, they will appear in Resources —
                with the problem, the constraints, what changed and what we learned. Until then, we
                would rather show you our method than invent a highlight reel.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

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
