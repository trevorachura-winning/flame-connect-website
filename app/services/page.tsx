import Link from "next/link";
import { SectionHead } from "../../components/SectionHead";
import { CTABand } from "../../components/CTABand";
import { Icon } from "../../components/Icons";
import { Reveal } from "../../components/Reveal";
import { ServiceStory } from "../../components/marketing/ServiceStory";
import { ServiceChooser } from "../../components/marketing/ServiceChooser";
import { SERVICES, ENGAGEMENT_STAGES, SERVICE_CHOOSER } from "../../content/services";
import { pageMetadata } from "../../lib/seo";
import s from "../../styles/marketing/marketing.module.css";

export const metadata = pageMetadata({
  title: "AI, Digital & Transformation Services",
  description:
    "Digital & Communications, AI in Business and Consulting & Thought Leadership — each built from a real business challenge to a realistic, measurable outcome.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero motif" aria-labelledby="services-title">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1 id="services-title" className="display-1">
            Strategy, communication and AI that move into real work.
          </h1>
          <p className="lede">
            Three service lines, one engagement model. We start from the challenge in front of you,
            deliver in small tested steps and leave your team more capable — not more dependent.
          </p>
          <div className="hero-actions">
            <Link href="/contact?intent=consultation" className={`btn btn-primary ${s.wrapBtn}`}>
              Talk to us about your challenge <Icon name="arrow-right" size={18} />
            </Link>
            <a href="#start-from-challenge" className={`btn btn-outline ${s.wrapBtn}`}>
              Find the right service
            </a>
          </div>
        </div>
      </section>

      <section className="section tight" aria-label="Service lines">
        <div className="container" style={{ display: "grid", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug}>
              <ServiceStory service={service} reverse={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="start-from-challenge" className="section paper2 tight" aria-labelledby="chooser-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Start from your challenge</span>
            <h2 id="chooser-title" className="display-2">Which of these sounds familiar?</h2>
            <p className="lede">
              Pick the closest match. If none fit, describe the problem in a consultation — we will
              recommend a route, including when the honest answer is &ldquo;none of ours&rdquo;.
            </p>
          </div>
          <ServiceChooser items={SERVICE_CHOOSER} services={SERVICES} />
        </div>
      </section>

      <section className="band motif section" aria-labelledby="engagement-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow light">How engagements run</span>
            <h2 id="engagement-title" className="display-2">One engagement model, three service lines.</h2>
            <p className="lede light">
              Every engagement follows the same arc — diagnose before design, test before scale — so
              the work produces evidence, not just documents.
            </p>
          </div>
          <ol className={`${s.cols5} list-plain`}>
            {ENGAGEMENT_STAGES.map((stage, i) => (
              <Reveal as="li" key={stage.stage} delay={i * 0.06}>
                <div className="proof-item" style={{ height: "100%" }}>
                  <b style={{ color: "var(--flame)" }}>{stage.stage}</b>
                  <p style={{ marginBottom: "0.6rem" }}>{stage.what}</p>
                  <p style={{ fontSize: "0.82rem", color: "var(--on-navy-soft)" }}>
                    <span className="sr-only">Typical outputs: </span>
                    {stage.outputs}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTABand
        question="Not sure which service line fits?"
        copy="You do not need to know. Describe the problem and the outcome you want — we will recommend the route in a discovery consultation."
        primary={{ label: "Book a discovery consultation", href: "/contact?intent=consultation" }}
        secondary={{ label: "Read our playbooks", href: "/resources?category=Playbooks" }}
      />
    </>
  );
}
