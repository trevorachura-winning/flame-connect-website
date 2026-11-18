import { Suspense } from "react";
import { ResourcesExplorer } from "../../components/marketing/ResourcesExplorer";
import { CTABand } from "../../components/CTABand";
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

      <CTABand
        question="Have a challenge worth a playbook?"
        copy="The best resources start as real problems. Share yours — if it teaches something useful, we will write it up in the open."
        primary={{ label: "Suggest a topic", href: "/contact?intent=other" }}
        secondary={{ label: "Book a discovery consultation", href: "/contact?intent=consultation" }}
      />
    </>
  );
}
