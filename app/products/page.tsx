import Link from "next/link";
import { SectionHead } from "../../components/SectionHead";
import { ProductCard } from "../../components/ProductCard";
import { CTABand } from "../../components/CTABand";
import { Reveal } from "../../components/Reveal";
import { PRODUCTS } from "../../lib/content";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Products — a growing toolkit for better work",
  description:
    "Flame tools are designed around practical business and community needs — sales, insight, readiness, learning, automation, communication and measurement.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero motif">
        <div className="container">
          <span className="eyebrow">Products</span>
          <h1 className="display-1">A growing toolkit for better work.</h1>
          <p className="lede">
            Flame tools are designed around practical business and community needs — sales, insight,
            readiness, learning, automation, communication and measurement. Some are live, some are
            in pilot and others are being developed with users. Each one shows its status plainly —
            because useful technology starts with honest labels.
          </p>
          <div className="chip-row" style={{ marginTop: "1.4rem" }} role="list" aria-label="Status legend">
            <span className="status live" role="listitem">Live</span>
            <span className="status pilot" role="listitem">Pilot</span>
            <span className="status development" role="listitem">In development</span>
            <span className="chip">Status definitions are on the Trust page</span>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="grid cols-3">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 0.07}>
                <ProductCard product={product} flame={i % 2 === 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper2">
        <div className="container split">
          <Reveal>
            <SectionHead
              eyebrow="Built on one foundation"
              title="Every tool rides on Flame OS."
              copy="Shared identity, organization context, AI orchestration, analytics and governance mean the tools improve together — and the experience stays connected as the family grows."
            />
            <Link href="/flame-os" className="btn btn-dark">Explore Flame OS</Link>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="tick-list" style={{ gap: "1rem" }}>
              <li><span style={{ display: "block" }}><b style={{ color: "var(--navy-deep)" }}>Honest by default.</b> Live means live. Pilot means limited. In development means we are still testing with users — and every page says which is which.</span></li>
              <li><span style={{ display: "block" }}><b style={{ color: "var(--navy-deep)" }}>Start where you are.</b> Several tools work from the spreadsheets and workflows you already have — no migration ceremony required.</span></li>
              <li><span style={{ display: "block" }}><b style={{ color: "var(--navy-deep)" }}>Feedback shapes the roadmap.</b> The community tests tools early and tells us what to build next, in public.</span></li>
            </ul>
          </Reveal>
        </div>
      </section>

      <CTABand
        question="Not sure which tool fits your problem?"
        copy="Start with the challenge, not the catalogue. Tell us what you are trying to improve and we will point you at the right tool, service or learning path."
        primary={{ label: "Talk to us about your challenge", href: "/contact?intent=consultation" }}
        secondary={{ label: "Check product status", href: "/trust#product-status" }}
      />
    </>
  );
}
