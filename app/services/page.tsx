import Link from "next/link";
import Image from "next/image";
import { SectionHead } from "../../components/SectionHead";
import { CTABand } from "../../components/CTABand";
import { Icon } from "../../components/Icons";
import { Reveal } from "../../components/Reveal";
import { SERVICES, ENGAGEMENT_STAGES } from "../../content/services";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "AI, Digital & Transformation Services",
  description:
    "Explore Digital & Communications, AI in Business and transformation consulting built around practical African business needs.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero motif">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1 className="display-1">Strategy, communication and AI that move into real work.</h1>
          <p className="lede">
            Flame Connect combines advisory, creative capability, practical AI and implementation
            support so organizations can improve how they communicate, decide, operate and grow.
          </p>
          <div className="hero-actions">
            <Link href="/contact?intent=consultation" className="btn btn-primary">
              Talk to us about your challenge <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container" style={{ display: "grid", gap: "2.5rem" }}>
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug}>
              <article
                className="card service-row"
                style={{ padding: "clamp(1.4rem, 3vw, 2.4rem)" }}
              >
                <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                  <span className="eyebrow">{service.eyebrow}</span>
                  <h2 className="display-3" style={{ margin: "0.7rem 0 0.8rem" }}>{service.name}</h2>
                  <p className="lede" style={{ fontSize: "1.02rem" }}>{service.proposition}</p>
                  <ul className="tick-list" style={{ marginTop: "1.1rem" }}>
                    {service.capabilities.slice(0, 4).map((cap) => (
                      <li key={cap}><Icon name="check" size={17} /> {cap}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: "1.4rem" }}>
                    <Link href={`/services/${service.slug}`} className="btn btn-dark btn-sm">
                      Explore {service.name} <Icon name="arrow-right" size={16} />
                    </Link>
                  </div>
                </div>
                <div className="media-frame" style={{ order: i % 2 === 1 ? 1 : 2, borderRadius: "var(--radius-m)", overflow: "hidden" }}>
                  <Image src={service.image.src} alt={service.image.alt} width={1536} height={1024} sizes="(max-width: 62rem) 92vw, 42vw" style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio: "4/3" }} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="band motif section">
        <div className="container">
          <SectionHead
            eyebrow="How engagements run"
            title="One engagement model, three service lines."
            copy="Every engagement follows the same arc — diagnose before design, test before scale — so the work produces evidence, not just documents."
            light
          />
          <div className="steps-grid">
            {ENGAGEMENT_STAGES.map((stage, i) => (
              <Reveal key={stage.stage} delay={i * 0.06}>
                <div className="proof-item" style={{ height: "100%" }}>
                  <b style={{ color: "var(--amber)" }}>{stage.stage}</b>
                  <p style={{ marginBottom: "0.6rem" }}>{stage.what}</p>
                  <p style={{ fontSize: "0.8rem", color: "#8f9dca" }}>{stage.outputs}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        question="Which service line fits your challenge?"
        copy="You do not need to know. Describe the problem and the outcome you want — we will recommend the route, including when the honest answer is 'none of ours'."
        primary={{ label: "Book a consultation", href: "/contact?intent=consultation" }}
        secondary={{ label: "Explore free tools", href: "/products" }}
      />
    </>
  );
}
