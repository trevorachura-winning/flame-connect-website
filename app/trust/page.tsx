import Link from "next/link";
import Image from "next/image";
import { SectionHead } from "../../components/SectionHead";
import { CTABand } from "../../components/CTABand";
import { Icon } from "../../components/Icons";
import { Reveal } from "../../components/Reveal";
import { StatusBadge } from "../../components/StatusBadge";
import { RESPONSIBLE_AI_COMMITMENTS } from "../../content/home";
import { PRODUCTS } from "../../lib/content";
import { STATUS_LABEL } from "../../content/products";
import { SITE } from "../../lib/site";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Trust, Responsible AI & Product Status",
  description:
    "How Flame Connect designs AI with human oversight, transparent status and appropriate safeguards — plus the honest live status of every product.",
  path: "/trust",
});

const STATUS_DESCRIPTIONS: Record<string, string> = {
  live: "Publicly usable today in a simplified alpha form; improving in the open with user feedback.",
  pilot: "Running with a limited group while usefulness, reliability and fit are tested.",
  development: "Being designed and tested with users; not available — a waitlist or a conversation is the honest route.",
};

export default function TrustPage() {
  return (
    <>
      <section className="page-hero white">
        <div className="container page-hero-grid">
          <div>
            <span className="eyebrow">Trust</span>
            <h1 className="display-1" style={{ fontSize: "clamp(2.3rem, 5.2vw, 3.8rem)" }}>
              Useful technology needs clear responsibility.
            </h1>
            <p className="lede">
              Flame Connect designs AI and digital solutions with human oversight, transparent
              status, appropriate safeguards and a focus on real-world usefulness. This page is
              where we say exactly what we mean by that.
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

      {/* Responsible AI commitments */}
      <section className="section tight">
        <div className="container">
          <SectionHead
            eyebrow="Responsible AI"
            title="Seven commitments, written to be checked"
            copy="These are design requirements in our products, not aspirations on a wall. Each one maps to mechanisms you can inspect."
          />
          <div className="grid cols-2">
            {RESPONSIBLE_AI_COMMITMENTS.map((commitment, i) => (
              <Reveal key={commitment} delay={(i % 2) * 0.06}>
                <div className="card" style={{ flexDirection: "row", alignItems: "flex-start", gap: "0.9rem" }}>
                  <span className="card-icon" style={{ width: "2.4rem", height: "2.4rem", flex: "none" }}>
                    <Icon name="shield" size={18} />
                  </span>
                  <p style={{ margin: 0 }}>{commitment}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="callout" style={{ marginTop: "1.6rem" }}>
              <h3>See the mechanisms</h3>
              <p style={{ color: "var(--ink-soft)" }}>
                The platform’s AI use-case register, governance policy, deterministic-fallback
                design and tenant-isolation tests are{" "}
                <a href="https://github.com/trevorachura-winning/flame-connect-salesos-ai">
                  public in the repository
                </a>
                . Oversight you cannot inspect is oversight you are asked to assume.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modules: security, privacy, accessibility */}
      <section className="section paper2 tight">
        <div className="container">
          <SectionHead eyebrow="The foundations" title="Security, privacy and access" />
          <div className="grid cols-3">
            <Reveal>
              <div className="card" style={{ height: "100%" }}>
                <span className="card-icon"><Icon name="lock" size={20} /></span>
                <h3 style={{ fontSize: "1.1rem" }}>Security</h3>
                <ul className="tick-list" style={{ marginTop: "0.4rem" }}>
                  <li><span className="small">Managed authentication with organization-scoped access control.</span></li>
                  <li><span className="small">Row-level security and tenant-isolation test harnesses.</span></li>
                  <li><span className="small">Environment separation between development, preview and production.</span></li>
                  <li><span className="small">
                    Vulnerability reports: via the{" "}
                    <a href="https://github.com/trevorachura-winning/flame-connect-salesos-ai/blob/main/SECURITY.md">
                      repository security policy
                    </a>.
                  </span></li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.07}>
              <div className="card" style={{ height: "100%" }}>
                <span className="card-icon"><Icon name="eye" size={20} /></span>
                <h3 style={{ fontSize: "1.1rem" }}>Privacy</h3>
                <ul className="tick-list" style={{ marginTop: "0.4rem" }}>
                  <li><span className="small">Minimum necessary personal data — forms ask only for context we need to respond usefully.</span></li>
                  <li><span className="small">No pre-checked marketing consent, ever.</span></li>
                  <li><span className="small">Customer content is not used to train AI models by default.</span></li>
                  <li><span className="small">Plain-language <Link href="/privacy">privacy notice</Link> with your choices spelled out.</span></li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="card" style={{ height: "100%" }}>
                <span className="card-icon"><Icon name="globe" size={20} /></span>
                <h3 style={{ fontSize: "1.1rem" }}>Accessibility & access</h3>
                <ul className="tick-list" style={{ marginTop: "0.4rem" }}>
                  <li><span className="small">This site targets WCAG 2.2 AA: keyboard-operable, visible focus, AA contrast.</span></li>
                  <li><span className="small">Mobile-first design from 320px up; restrained motion honoured under reduced-motion settings.</span></li>
                  <li><span className="small">Low-bandwidth respect: compressed media, lazy loading, no autoplay video by default.</span></li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Product status */}
      <section id="product-status" className="section tight" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="container">
          <SectionHead
            eyebrow="Product status"
            title="The honest status of everything we make"
            copy="Live, pilot and in-development are different promises. This board is the public source of truth — updated as status changes, not when marketing wishes it had."
          />
          <div className="table-scroll">
            <table className="status-board">
              <caption className="sr-only" style={{ position: "absolute", left: "-9999px" }}>
                Flame Connect product status board
              </caption>
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Status</th>
                  <th scope="col">What that means</th>
                  <th scope="col">Route</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((product) => (
                  <tr key={product.slug}>
                    <td>
                      <b>{product.name}</b>
                      <span className="small">{product.purpose}</span>
                    </td>
                    <td><StatusBadge status={product.status} /></td>
                    <td className="small">{STATUS_DESCRIPTIONS[product.status]}</td>
                    <td><Link href={`/products/${product.slug}`} className="text-link small">View</Link></td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <b>Flame OS platform</b>
                    <span className="small">Shared foundation for the product family</span>
                  </td>
                  <td><span className="status development">In validation</span></td>
                  <td className="small">
                    Build-validated in source; production deployment gates (hosting, auth, tenant
                    isolation, smoke tests) still being verified. {SITE.flameOsUrl ? "App domain configured." : "App domain not yet confirmed — see Appendix C items in the launch runbook."}
                  </td>
                  <td><Link href="/flame-os" className="text-link small">View</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="chip-row" style={{ marginTop: "1rem" }}>
            {Object.entries(STATUS_LABEL).map(([key, label]) => (
              <span key={key} className={`status ${key}`}>{label}</span>
            ))}
            <span className="chip small">Definitions above; per-product notes on each product page</span>
          </div>
        </div>
      </section>

      {/* Company details pending */}
      <section className="section paper2 tight">
        <div className="container grid cols-2">
          <Reveal>
            <div className="contact-note" style={{ height: "100%" }}>
              <span className="pending-tag">Pending confirmation</span>
              <h3>Legal & contact details</h3>
              <p>
                The registered company name, direct email, phone/WhatsApp line and approved social
                accounts are being confirmed. They will appear here and in the footer once final —
                we publish facts, not placeholders that look like facts.
              </p>
              <p style={{ marginTop: "0.6rem" }}>
                Until then, the <Link href="/contact">enquiry form</Link> is the reliable route and
                reaches the same people.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="contact-note" style={{ height: "100%" }}>
              <span className="eyebrow">Claim discipline</span>
              <h3 style={{ marginTop: "0.4rem" }}>How claims get onto this site</h3>
              <ul>
                <li>Every measurable claim needs an owner and a source before publication.</li>
                <li>No client logos, testimonials or metrics without written approval and verifiable evidence.</li>
                <li>No continent-wide claims before participation data supports them.</li>
                <li>Content checks run in CI — banned claim phrases fail the build, not the review meeting.</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        question="Have a trust or security question?"
        copy="Ask it directly. Sceptical questions get the same honest answers as friendly ones."
        primary={{ label: "Ask the team", href: "/contact?intent=other" }}
        secondary={{ label: "Read the privacy notice", href: "/privacy" }}
      />
    </>
  );
}
