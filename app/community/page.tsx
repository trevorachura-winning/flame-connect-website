import Link from "next/link";
import Image from "next/image";
import { SectionHead } from "../../components/SectionHead";
import { Icon, type IconName } from "../../components/Icons";
import { Reveal } from "../../components/Reveal";
import { COMMUNITY_SURFACES, COMMUNITY_PRINCIPLES } from "../../content/home";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Flame Community | Learn, Test and Build Practical AI Skills",
  description:
    "Join practical learning, tools, playbooks and community experiments designed to make AI and digital work more useful in African contexts.",
  path: "/community",
});

const SURFACE_ICONS: Record<string, IconName> = {
  "Tools Lab": "flask",
  Playbooks: "book",
  "Practice Lab": "target",
  "Flame Academy": "graduation",
};

export default function CommunityPage() {
  return (
    <>
      <section className="page-hero white">
        <div className="container page-hero-grid">
          <div>
            <span className="eyebrow">Community</span>
            <h1 className="display-1" style={{ fontSize: "clamp(2.3rem, 5.2vw, 3.8rem)" }}>
              Learn, test, share and shape what comes next.
            </h1>
            <p className="lede">
              The Flame community brings together people who want to use AI and digital tools more
              practically. It is a space for experiments, playbooks, hands-on learning, peer exchange
              and feedback that can shape better products.
            </p>
            <div className="hero-actions">
              <Link href="#join" className="btn btn-primary">
                Join the Flame community <Icon name="arrow-right" size={18} />
              </Link>
              <Link href="/resources?category=Playbooks" className="btn btn-outline">Browse playbooks</Link>
            </div>
          </div>
          <div className="frame">
            <Image
              src="/images/community-learning.jpg"
              alt="Hands-on AI learning workshop in Uganda with professionals working in small groups while a facilitator helps."
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 62rem) 92vw, 46vw"
            />
          </div>
        </div>
      </section>

      {/* Surfaces */}
      <section className="section tight">
        <div className="container">
          <SectionHead
            eyebrow="Four surfaces"
            title="Where the community lives"
          />
          <div className="grid cols-2">
            {COMMUNITY_SURFACES.map((surface, i) => (
              <Reveal key={surface.name} delay={(i % 2) * 0.08}>
                <article className="card lift" style={{ height: "100%" }}>
                  <span className="card-icon"><Icon name={SURFACE_ICONS[surface.name] ?? "spark"} size={22} /></span>
                  <h3>{surface.name}</h3>
                  <p>{surface.purpose}</p>
                  <div className="card-foot">
                    <Link href={surface.href} className="text-link">
                      {surface.cta} <Icon name="arrow-right" size={16} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Lab formats */}
      <section id="practice" className="band motif section" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="container split" style={{ alignItems: "start" }}>
          <Reveal>
            <span className="eyebrow light">Practice Lab</span>
            <h2 className="display-2" style={{ margin: "0.85rem 0 1rem" }}>
              Hands-on formats, announced in the open.
            </h2>
            <p className="lede light">
              Practice Lab sessions turn ideas into repeatable capability: mapping a workflow,
              scoring a pipeline, pressure-testing a campaign draft. Sessions run in Kampala and
              online, and they are announced through community channels rather than scheduled
              speculatively here.
            </p>
            <p className="small" style={{ color: "#9fb0dd", marginTop: "1rem" }}>
              No dates invented — join the community and session announcements reach you as they
              are confirmed.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="tick-list">
              <li><Icon name="check" size={18} /> Small groups, real workflows, visible outcomes.</li>
              <li><Icon name="check" size={18} /> Materials published as playbooks afterwards.</li>
              <li><Icon name="check" size={18} /> Mobile-friendly participation; no travel required for online formats.</li>
              <li><Icon name="check" size={18} /> Facilitated by practitioners, not lecture theatres.</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="section tight">
        <div className="container">
          <SectionHead
            eyebrow="Community principles"
            title="The rules the community runs on"
          />
          <div className="grid cols-3">
            {COMMUNITY_PRINCIPLES.slice(0, 3).map((principle, i) => (
              <Reveal key={principle} delay={i * 0.06}>
                <div className="card value-card" style={{ height: "100%" }}>
                  <b className="num">{String(i + 1).padStart(2, "0")}</b>
                  <p style={{ margin: 0 }}>{principle}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="grid cols-2" style={{ marginTop: "1.1rem" }}>
            {COMMUNITY_PRINCIPLES.slice(3).map((principle, i) => (
              <Reveal key={principle} delay={i * 0.06}>
                <div className="card value-card" style={{ height: "100%" }}>
                  <b className="num">{String(i + 4).padStart(2, "0")}</b>
                  <p style={{ margin: 0 }}>{principle}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Learn in public */}
      <section className="section paper2 tight">
        <div className="container split">
          <Reveal>
            <SectionHead
              eyebrow="Learn in public"
              title="The product is source-visible."
              copy="Our platform repository — tools, governance registers, deployment gates — is public on GitHub. Community members can read the roadmap, the governance policy and even the checklists we hold ourselves to."
            />
            <a href="https://github.com/trevorachura-winning/flame-connect-salesos-ai" className="btn btn-dark">
              Visit the repository <Icon name="github" size={17} />
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="callout">
              <h3>Honest scope</h3>
              <p style={{ color: "var(--ink-soft)" }}>
                We are building this community carefully, starting in Kampala. We will not claim a
                continent-wide active community until participation data supports it — growth claims
                arrive with numbers, not before them.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Join */}
      <section id="join" className="band motif section" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="container" style={{ maxWidth: "46rem", textAlign: "center" }}>
          <Reveal>
            <h2 className="display-2" style={{ marginBottom: "1rem" }}>Join the Flame community.</h2>
            <p className="lede light" style={{ marginInline: "auto" }}>
              Tell us who you are and what you want to learn, test or share. We will add you to the
              community updates and the next Practice Lab announcements.
            </p>
            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <Link href="/contact?intent=community" className="btn btn-primary">
                Join via the community form <Icon name="arrow-right" size={18} />
              </Link>
            </div>
            <p className="small" style={{ color: "#9fb0dd", marginTop: "1.2rem" }}>
              Your details are used for community communication only unless you ask for more — see
              the <Link href="/privacy">privacy notice</Link>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
