import Link from "next/link";
import Image from "next/image";
import { SectionHead } from "../../components/SectionHead";
import { CTABand } from "../../components/CTABand";
import { Icon, type IconName } from "../../components/Icons";
import { Reveal } from "../../components/Reveal";
import { AmbientVideo } from "../../components/AmbientVideo";
import { OsMock } from "../../components/OsMock";
import { ProductCard } from "../../components/ProductCard";
import { PRODUCTS } from "../../lib/content";
import { flameOsAppHref } from "../../lib/links";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Flame OS | Connected AI Tools for Better Work",
  description:
    "Discover the shared platform behind Flame Connect's growing family of tools for sales, insight, readiness, learning, automation and impact.",
  path: "/flame-os",
});

const CAPABILITIES: { name: string; copy: string; icon: IconName }[] = [
  {
    name: "Shared identity",
    copy: "One account can connect a user to relevant tools and organization context.",
    icon: "users",
  },
  {
    name: "Organization context",
    copy: "Tools can work with the structure, goals and operating context of a business or team.",
    icon: "globe",
  },
  {
    name: "AI orchestration",
    copy: "Common AI services can support multiple use cases with clearer controls and monitoring.",
    icon: "workflow",
  },
  {
    name: "Analytics",
    copy: "Usage and outcome signals can be measured across tools and journeys.",
    icon: "chart",
  },
  {
    name: "Audit & governance",
    copy: "Important actions and decisions can be made more traceable and easier to review.",
    icon: "shield",
  },
  {
    name: "Extensible product layer",
    copy: "New tools can reuse the same foundation instead of rebuilding core capabilities.",
    icon: "layers",
  },
];

export default function FlameOsPage() {
  const app = flameOsAppHref();
  const liveFamily = PRODUCTS.filter((p) => p.status !== "development").slice(0, 3);

  return (
    <>
      {/* Hero with ambient media */}
      <section className="band motif" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.5 }} aria-hidden="true">
          <AmbientVideo src="/videos/ember-loop.mp4" poster="/videos/ember-poster.jpg" className="hero-video" />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2, padding: "clamp(4rem, 9vw, 7.5rem) 0" }}>
          <Reveal>
            <span className="eyebrow light">Flame OS</span>
            <h1 className="display-1" style={{ maxWidth: "46rem", margin: "1rem 0 1.2rem" }}>
              One connected foundation for practical AI tools.
            </h1>
            <p className="lede light" style={{ maxWidth: "44rem" }}>
              Flame OS is the shared platform layer that connects users, organizations, tools,
              analytics and AI capabilities across the Flame product family.
            </p>
            <div className="hero-actions">
              <Link href="/products" className="btn btn-primary">
                Explore products <Icon name="arrow-right" size={18} />
              </Link>
              {app.external ? (
                <a href={app.href} className="btn btn-ghost">Sign in</a>
              ) : (
                <Link href={app.href} className="btn btn-ghost">Sign in</Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why a platform */}
      <section className="section tight">
        <div className="container split">
          <Reveal>
            <SectionHead
              eyebrow="One platform, many tools"
              title="Why a platform instead of disconnected apps?"
              copy="Instead of building isolated tools, Flame OS creates reusable foundations for identity, organization context, scoring, AI orchestration, analytics, audit and governance. This makes it easier to improve products consistently while keeping the user experience connected."
            />
            <div className="callout">
              <h3>Status, stated plainly</h3>
              <p style={{ color: "var(--ink-soft)" }}>
                Flame OS exists in source and is build-validated, but it is{" "}
                <b>not yet production-deployed</b>. That is why Sign in and Launch actions currently
                route to access updates rather than a live app. When the deployment gates on our{" "}
                <Link href="/trust#product-status">Trust page</Link> turn green, these buttons will
                point at the real thing.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <OsMock />
          </Reveal>
        </div>
      </section>

      {/* Capability blocks */}
      <section className="band motif section">
        <div className="container">
          <SectionHead
            eyebrow="Platform capabilities"
            title="What the shared layer provides"
            light
          />
          <div className="os-cap-grid">
            {CAPABILITIES.map((cap, i) => (
              <Reveal key={cap.name} delay={(i % 3) * 0.07}>
                <div className="os-cap" style={{ height: "100%" }}>
                  <span className="card-icon"><Icon name={cap.icon} size={20} /></span>
                  <h3>{cap.name}</h3>
                  <p>{cap.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The family on top */}
      <section className="section paper2">
        <div className="container">
          <SectionHead
            eyebrow="The family it carries"
            title="Tools already riding on the foundation"
            copy="The public alphas and the pilot workspace are the first proof that one platform can serve many very different jobs."
          />
          <div className="grid cols-3">
            {liveFamily.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.07}>
                <ProductCard product={product} flame={i % 2 === 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Governance band */}
      <section className="section tight">
        <div className="container split">
          <Reveal delay={0.1} className="media-frame" >
            <Image
              src="/images/trust-review.jpg"
              alt="Professional carefully reviewing an AI recommendation with a colleague before approval — human oversight by design."
              width={1536}
              height={1024}
              sizes="(max-width: 62rem) 92vw, 46vw"
              style={{ borderRadius: "var(--radius-l)" }}
            />
          </Reveal>
          <Reveal>
            <SectionHead
              eyebrow="Governance is a feature"
              title="Built to be inspected, not just trusted."
              copy="Deterministic scoring with visible rationale, human approval on consequential actions, registered AI use cases with risk tiers, organization-scoped data with tenant-isolation testing — the platform's controls are public, because accountability thrives in daylight."
            />
            <div className="hero-actions">
              <Link href="/trust" className="btn btn-dark">Read the Trust commitments</Link>
              <a
                href="https://github.com/trevorachura-winning/flame-connect-salesos-ai"
                className="btn btn-outline"
              >
                Inspect the source <Icon name="github" size={17} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Developer handover note */}
      <section className="section paper2 tight">
        <div className="container">
          <div className="callout" style={{ borderLeftColor: "var(--navy)" }}>
            <h3>For engineers and partners</h3>
            <p style={{ color: "var(--ink-soft)" }}>
              The platform principle is “one shared platform, many tools”: shared identity, org
              intelligence, a CSV/Excel-first connector layer, deterministic scoring, model-agnostic
              AI orchestration with visible fallback, and an event/audit layer. The repository,
              architecture docs and deployment gates are public — including the checks the platform
              still has to pass before we call it production-ready.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        question="Want to hear when Flame OS opens?"
        copy="Join the access list and we will tell you — with an honest description of what is ready, what is pilot and what is still being built."
        primary={{ label: "Request access updates", href: "/contact?intent=access" }}
        secondary={{ label: "Explore free tools", href: "/products" }}
      />
    </>
  );
}
