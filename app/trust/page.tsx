import Link from "next/link";
import Image from "next/image";
import { SectionHead } from "../../components/SectionHead";
import { CTABand } from "../../components/CTABand";
import { Icon } from "../../components/Icons";
import { Reveal } from "../../components/Reveal";
import { RESPONSIBLE_AI_COMMITMENTS } from "../../content/home";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Responsible AI",
  description:
    "How Flame Connect designs AI with human oversight, clear safeguards, privacy and accessibility — the commitments behind our services and platforms.",
  path: "/trust",
});

/**
 * Responsible AI (launch line-up, Nov 2026): the commitments a business
 * buyer needs, without the former product-status board or engineering notes.
 */
export default function TrustPage() {
  return (
    <>
      <section className="page-hero white">
        <div className="container page-hero-grid">
          <div>
            <span className="eyebrow">Responsible AI</span>
            <h1 className="display-1" style={{ fontSize: "clamp(2.3rem, 5.2vw, 3.8rem)" }}>
              Useful technology needs clear responsibility.
            </h1>
            <p className="lede">
              Flame Connect designs AI and digital solutions with human oversight, appropriate
              safeguards and a focus on real-world usefulness. These are the commitments behind our
              services and our platforms, Flame OS and Flame Academy.
            </p>
          </div>
          <div className="frame">
            <Image
              src="/images/trust-review.jpg"
              alt="Two African professionals carefully reviewing an AI recommendation on a laptop before approving it."
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 62rem) 92vw, 46vw"
            />
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <SectionHead
            eyebrow="Our commitments"
            title="How we use AI"
            copy="These principles shape how we advise clients and how we build our own platform."
          />
          <div className="grid cols-2">
            {RESPONSIBLE_AI_COMMITMENTS.map((commitment, i) => (
              <Reveal key={commitment} delay={(i % 2) * 0.06}>
                <div className="card" style={{ flexDirection: "row", alignItems: "flex-start", gap: "0.9rem", height: "100%" }}>
                  <span className="card-icon" style={{ width: "2.4rem", height: "2.4rem", flex: "none" }}>
                    <Icon name="shield" size={18} />
                  </span>
                  <p style={{ margin: 0 }}>{commitment}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper2 tight">
        <div className="container">
          <SectionHead eyebrow="The foundations" title="Security, privacy and access" />
          <div className="grid cols-3">
            <Reveal>
              <div className="card" style={{ height: "100%" }}>
                <span className="card-icon"><Icon name="lock" size={20} /></span>
                <h3 style={{ fontSize: "1.1rem" }}>Security</h3>
                <ul className="tick-list" style={{ marginTop: "0.4rem" }}>
                  <li><span className="small">Our platforms are designed with organisation-scoped access control.</span></li>
                  <li><span className="small">Each organisation&rsquo;s data is kept separate.</span></li>
                  <li><span className="small">Separate development, testing and production environments.</span></li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.07}>
              <div className="card" style={{ height: "100%" }}>
                <span className="card-icon"><Icon name="eye" size={20} /></span>
                <h3 style={{ fontSize: "1.1rem" }}>Privacy</h3>
                <ul className="tick-list" style={{ marginTop: "0.4rem" }}>
                  <li><span className="small">We ask only for the information we need to help.</span></li>
                  <li><span className="small">No pre-checked marketing consent, ever.</span></li>
                  <li><span className="small">Customer content is not used to train AI models by default.</span></li>
                  <li><span className="small">A plain-language <Link href="/privacy">privacy notice</Link> with your choices spelled out.</span></li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="card" style={{ height: "100%" }}>
                <span className="card-icon"><Icon name="globe" size={20} /></span>
                <h3 style={{ fontSize: "1.1rem" }}>Accessibility</h3>
                <ul className="tick-list" style={{ marginTop: "0.4rem" }}>
                  <li><span className="small">This site targets WCAG 2.2 AA: keyboard-operable, visible focus, AA contrast.</span></li>
                  <li><span className="small">Mobile-first from 320px; motion respects reduced-motion settings.</span></li>
                  <li><span className="small">Built for low bandwidth: compressed media and no autoplay video.</span></li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        question="Have a question about how we use AI?"
        copy="Ask us directly — about our services, our platforms or how we handle data."
        primary={{ label: "Talk to our team", href: "/contact?intent=other" }}
        secondary={{ label: "Read the privacy notice", href: "/privacy" }}
      />
    </>
  );
}
