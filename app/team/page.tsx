import { TeamCoverflow } from "../../components/TeamCoverflow";
import { CTABand } from "../../components/CTABand";
import { TEAM, TEAM_IS_PREVIEW } from "../../content/team";
import { pageMetadata } from "../../lib/seo";

const base = pageMetadata({
  title: "Meet the Flame Connect team",
  description:
    "The people behind Flame Connect, an AI Centre of Change in Kampala helping African organisations put AI and digital tools to work.",
  path: "/team",
});

// Kept out of search until the real team is in place.
export const metadata = TEAM_IS_PREVIEW ? { ...base, robots: { index: false, follow: false } } : base;

export default function TeamPage() {
  return (
    <>
      <section className="page-hero white">
        <div className="container" style={{ maxWidth: "48rem", textAlign: "center" }}>
          <span className="eyebrow">Our team</span>
          <h1 className="display-1" style={{ marginTop: "0.8rem" }}>
            The people behind the change.
          </h1>
          <p className="lede" style={{ marginTop: "1rem", marginInline: "auto" }}>
            Strategists, builders and storytellers working from Kampala to help African organisations put AI and
            digital tools to work.
          </p>
          {TEAM_IS_PREVIEW && (
            <p className="pending-tag" style={{ marginTop: "1rem", display: "inline-block" }}>
              Preview: names, roles and photos are placeholders until the team is confirmed.
            </p>
          )}
        </div>
      </section>
      <section className="section tight">
        <div className="container">
          <TeamCoverflow team={TEAM} />
        </div>
      </section>
      <CTABand
        question="Want to work with us?"
        copy="Start with the free AI readiness assessment, or tell us what you are trying to improve."
        primary={{ label: "Take the free AI assessment", href: "/assessment" }}
        secondary={{ label: "Talk to us", href: "/contact" }}
      />
    </>
  );
}
