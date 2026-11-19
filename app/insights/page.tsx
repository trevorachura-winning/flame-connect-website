import { Suspense } from "react";
import { ResourcesExplorer } from "../../components/marketing/ResourcesExplorer";
import { CTABand } from "../../components/CTABand";
import { InsightCard } from "../../components/InsightCard";
import { sortedArticles, ARTICLE_CATEGORIES } from "../../lib/content";
import { pageMetadata } from "../../lib/seo";
import { CASE_STUDIES } from "../../content/case-studies";
import { READING } from "../../content/reading";
import s from "../../styles/marketing/marketing.module.css";
import h from "../../styles/insights.module.css";

export const metadata = pageMetadata({
  title: "Insights on AI and digital transformation in Africa",
  description:
    "Practical playbooks, perspectives and real examples of AI transforming businesses in Africa, plus the reports and conversations worth reading.",
  path: "/insights",
});


export default function InsightsPage() {
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
                <span className="eyebrow">Insights</span>
                <h1 className="display-1">Practical thinking on AI and digital change in Africa.</h1>
              </div>
            </section>
            <section id="our-thinking" className="section tight">
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

      <section id="ai-in-africa" className="section" aria-labelledby="cases-title" style={{ scrollMarginTop: "6rem" }}>
        <div className="container">
          <div className={h.head}>
            <span className="eyebrow">Case studies</span>
            <h2 id="cases-title" className="display-2" style={{ marginTop: "0.7rem" }}>
              AI at work across Africa.
            </h2>
            <p>
              Real examples of AI changing how organisations on the continent work, and the lesson each holds
              for your business. Every example links to its original source.
            </p>
            <p className={h.note}>
              These are public examples, not Flame Connect client projects. Our own case studies will appear
              here once clients have approved them.
            </p>
          </div>
          <div className={h.cases}>
            {CASE_STUDIES.map((c) => (
              <article key={c.slug} className={h.case} aria-labelledby={`case-${c.slug}`}>
                <div className={h.caseMeta}>
                  <b>{c.country}</b>
                  <span>{c.sector}</span>
                </div>
                <h3 id={`case-${c.slug}`}>{c.name}</h3>
                <p>{c.summary}</p>
                <p className={h.lesson}>
                  <b>What it shows</b>
                  {c.lesson}
                </p>
                <div className={h.sources}>
                  <span>Source{c.sources.length > 1 ? "s" : ""}:</span>
                  {c.sources.map((src) => (
                    <a key={src.href} href={src.href} target="_blank" rel="noopener">
                      {src.label} <span aria-hidden="true">↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="in-the-conversation" className="section tight" aria-labelledby="reading-title" style={{ scrollMarginTop: "6rem" }}>
        <div className="container">
          <div className={h.head}>
            <span className="eyebrow">In the conversation</span>
            <h2 id="reading-title" className="display-2" style={{ marginTop: "0.7rem" }}>
              Worth reading.
            </h2>
            <p>
              Reports, research and reporting on AI in Africa that shape how we think. Summaries are ours;
              the originals belong to their publishers.
            </p>
          </div>
          <ul className={h.reading}>
            {READING.map((r) => (
              <li key={r.href}>
                <div>
                  <h3>
                    <a href={r.href} target="_blank" rel="noopener">
                      {r.title} <span aria-hidden="true">↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </h3>
                  <p className={h.pub}>
                    {r.publisher} · {r.year}
                  </p>
                </div>
                <p>{r.why}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand
        question="Have a challenge worth a playbook?"
        copy="Our best insights start as real problems. Share yours. If it teaches something useful, we will write about it openly."
        primary={{ label: "Suggest a topic", href: "/contact?intent=other" }}
        secondary={{ label: "Book a discovery consultation", href: "/contact?intent=consultation" }}
      />
    </>
  );
}
