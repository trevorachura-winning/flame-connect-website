import { Suspense } from "react";
import Link from "next/link";
import { ResourcesExplorer } from "../../components/marketing/ResourcesExplorer";
import { CTABand } from "../../components/CTABand";
import { Reveal } from "../../components/Reveal";
import { SectionHead } from "../../components/SectionHead";
import { InsightCard } from "../../components/InsightCard";
import { sortedArticles, ARTICLE_CATEGORIES } from "../../lib/content";
import { pageMetadata } from "../../lib/seo";
import s from "../../styles/marketing/marketing.module.css";

export const metadata = pageMetadata({
  title: "Resources — useful ideas for the work in front of you",
  description:
    "Explore practical guides, field notes, research and perspectives on AI, digital communication, business growth and transformation in African contexts.",
  path: "/resources",
});

const EDITORIAL_STANDARD = [
  { h: "Why it matters", p: "Every piece opens with the stake, not the summary." },
  { h: "What we are seeing", p: "Observations are labelled as evidence or as direction — never blurred." },
  { h: "What you can do", p: "Actions a reader can take without buying anything." },
  { h: "What stays uncertain", p: "Limits are stated in the open, including about our own products." },
];

export default function ResourcesPage() {
  const articles = sortedArticles();
  return (
    <>
      {/* The explorer reads ?category= on the client. The fallback is a full,
          linked, server-rendered list so the page is useful before (or
          without) JavaScript and for crawlers. */}
      <Suspense
        fallback={
          <>
            <section className="page-hero motif">
              <div className="container">
                <span className="eyebrow">Resources</span>
                <h1 className="display-1">Useful ideas for the work in front of you.</h1>
              </div>
            </section>
            <section className="section tight">
              <div className={`container ${s.cols3}`}>
                {articles.map((article) => (
                  <InsightCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          </>
        }
      >
        <ResourcesExplorer articles={articles} categories={ARTICLE_CATEGORIES} />
      </Suspense>

      <section className="section paper2 tight">
        <div className={`container ${s.cols2}`}>
          <Reveal>
            <div className="card" style={{ height: "100%" }}>
              <span className="eyebrow">Case studies</span>
              <h3 style={{ marginTop: "0.5rem" }}>Evidence arrives when evidence exists.</h3>
              <p>
                Client stories will be published only with written approval and verified metrics —
                problem, constraints, intervention, what changed, what we learned. That bar matters
                more to us than a fast-looking portfolio.
              </p>
              <div className="card-foot">
                <Link href="/trust" className="text-link">How we treat claims</Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card" style={{ height: "100%" }}>
              <span className="eyebrow">Events & learning</span>
              <h3 style={{ marginTop: "0.5rem" }}>Sessions announced via the community.</h3>
              <p>
                Practice Lab sessions, workshops and Academy cohorts are announced to community
                members first. No speculative dates here — join and the real schedule reaches you.
              </p>
              <div className="card-foot">
                <Link href="/community#join" className="text-link">Join the community</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <SectionHead eyebrow="Editorial standard" title="How these pieces are written" />
          <ol className={`${s.cols4} list-plain`}>
            {EDITORIAL_STANDARD.map((item, i) => (
              <Reveal as="li" key={item.h} delay={i * 0.05}>
                <div className="card value-card" style={{ height: "100%" }}>
                  <b className="num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</b>
                  <h3 style={{ fontSize: "1.05rem" }}>{item.h}</h3>
                  <p style={{ margin: 0 }}>{item.p}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTABand
        question="Have a challenge worth a playbook?"
        copy="The best resources start as real problems. Share yours — if it teaches something useful, we will write it up in the open."
        primary={{ label: "Suggest a topic", href: "/contact?intent=other" }}
        secondary={{ label: "Book a discovery consultation", href: "/contact?intent=consultation" }}
      />
    </>
  );
}
