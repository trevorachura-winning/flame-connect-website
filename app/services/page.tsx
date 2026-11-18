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
import m from "../../styles/marketing/motion.module.css";
import type { CSSProperties } from "react";
import { InView } from "../../components/marketing/motion/InView";
import { SplitText } from "../../components/marketing/motion/SplitText";
import { SpotlightGroup } from "../../components/marketing/motion/SpotlightGroup";

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

export const metadata = pageMetadata({
  title: "AI, Digital & Transformation Services",
  description:
    "Digital & Communications, AI in Business and Consulting & Thought Leadership. Each one starts from a real business challenge and works towards a realistic, measurable result.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className={m.scope}>
      <section className="page-hero motif" aria-labelledby="services-title">
        <div className={`container ${m.heroIntro}`}>
          <span className={`eyebrow ${m.rise}`}>Services</span>
          <h1 id="services-title" className="display-1">
            <SplitText text="Strategy, communication and AI that move into real work." accent="work." delayMs={80} />
          </h1>
          <p className={`lede ${m.rise}`} style={v({ "--i": 6 })}>
            Three services, one way of working. We start from the challenge in front of you,
            deliver in small, tested steps and leave your team more capable and less dependent on us.
          </p>
          <div className={`hero-actions ${m.rise}`} style={v({ "--i": 7 })}>
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
        <SpotlightGroup className="container" >
          <div style={{ display: "grid", gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug}>
                <ServiceStory service={service} reverse={i % 2 === 1} />
              </Reveal>
            ))}
          </div>
        </SpotlightGroup>
      </section>

      <section id="start-from-challenge" className="section paper2 tight" aria-labelledby="chooser-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow ${m.rise}`}>Start from your challenge</span>
            <h2 id="chooser-title" className="display-2">
              <SplitText text="Which of these sounds familiar?" />
            </h2>
            <p className={`lede ${m.rise}`} style={v({ "--i": 3 })}>
              Pick the closest match. If none fit, describe the problem in a consultation and we will
              suggest a route, even when the honest answer is &ldquo;none of ours&rdquo;.
            </p>
          </InView>
          <ServiceChooser items={SERVICE_CHOOSER} services={SERVICES} />
        </div>
      </section>

      <section className={`band motif section ${m.bandRise}`} aria-labelledby="engagement-title">
        <div className="container">
          <InView className="section-head">
            <span className={`eyebrow light ${m.rise}`}>How engagements run</span>
            <h2 id="engagement-title" className="display-2">
              <SplitText text="Assess. Learn. Improve. Implement." accent="Implement." />
            </h2>
            <p className={`lede light ${m.rise}`} style={v({ "--i": 3 })}>
              Every engagement follows the same four steps as everything else we do. We understand
              before we design, and we test before we scale, so the work produces evidence as well as documents.
            </p>
          </InView>
          <InView as="ol" className={`${s.cols4} list-plain`}>
            {ENGAGEMENT_STAGES.map((stage, i) => (
              <li key={stage.stage} className={m.rise} style={v({ "--i": i })}>
                <div className="proof-item" style={{ height: "100%" }}>
                  <span className={s.bigNo} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <b style={{ color: "var(--flame)" }}>{stage.stage.replace(/^\d+\.\s*/, "")}</b>
                  <p style={{ marginBottom: "0.6rem" }}>{stage.what}</p>
                  <p style={{ fontSize: "0.82rem", color: "var(--on-navy-soft)" }}>
                    <span className="sr-only">Typical outputs: </span>
                    {stage.outputs}
                  </p>
                </div>
              </li>
            ))}
          </InView>
        </div>
      </section>

      <CTABand
        question="Not sure which service line fits?"
        copy="You do not need to know yet. Describe the problem and the result you want, and we will recommend a route in a discovery consultation."
        primary={{ label: "Book a discovery consultation", href: "/contact?intent=consultation" }}
        secondary={{ label: "Read our playbooks", href: "/resources?category=Playbooks" }}
      />
    </div>
  );
}
