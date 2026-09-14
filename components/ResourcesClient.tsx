"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { InsightCard } from "./InsightCard";
import { CTABand } from "./CTABand";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import type { Article, ArticleCategory } from "../content/articles";

export function ResourcesClient({
  articles,
  categories,
}: {
  articles: Article[];
  categories: ArticleCategory[];
}) {
  const params = useSearchParams();
  const active = categories.find((c) => c === params.get("category")) ?? null;
  const shown = articles.filter((a) => !active || a.category === active);

  return (
    <>
      <section className="page-hero motif">
        <div className="container">
          <span className="eyebrow">Resources</span>
          <h1 className="display-1">Useful ideas for the work in front of you.</h1>
          <p className="lede">
            Practical guides, field notes, research and perspectives on AI, digital communication,
            business growth and transformation in African contexts. Written to be used, not just read.
          </p>
          <div className="chip-row" style={{ marginTop: "1.6rem" }}>
            <Link href="/resources" className={`chip chip-link${!active ? " on" : ""}`}>All</Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/resources?category=${encodeURIComponent(cat)}`}
                className={`chip chip-link${active === cat ? " on" : ""}`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          {shown.length === 0 ? (
            <div className="pending-block">
              <h3>Nothing in this category yet</h3>
              <p>
                {active === "Research"
                  ? "Longer research is in progress. We publish when the evidence is ready, not to fill a slot — subscribe and it will reach you honestly labelled."
                  : "More is coming. Try another category meanwhile."}
              </p>
            </div>
          ) : (
            <div className="grid cols-3">
              {shown.map((article, i) => (
                <Reveal key={article.slug} delay={(i % 3) * 0.06}>
                  <InsightCard article={article} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section paper2 tight">
        <div className="container grid cols-2">
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
          <div className="grid cols-4">
            {[
              { h: "Why it matters", p: "Every piece opens with the stake, not the summary." },
              { h: "What we are seeing", p: "Observations are labelled as evidence or as direction — never blurred." },
              { h: "What you can do", p: "Actions a reader can take without buying anything." },
              { h: "What stays uncertain", p: "Limits are stated in the open, including about our own products." },
            ].map((item, i) => (
              <Reveal key={item.h} delay={i * 0.05}>
                <div className="card value-card" style={{ height: "100%" }}>
                  <b className="num">{String(i + 1).padStart(2, "0")}</b>
                  <h3 style={{ fontSize: "1.05rem" }}>{item.h}</h3>
                  <p style={{ margin: 0 }}>{item.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        question="Have a challenge worth a playbook?"
        copy="The best resources start as real problems. Share yours — if it teaches something useful, we will write it up in the open."
        primary={{ label: "Suggest a topic", href: "/contact?intent=other" }}
        secondary={{ label: "Explore free tools", href: "/products" }}
      />
    </>
  );
}
