import { Suspense } from "react";
import { ResourcesClient } from "../../components/ResourcesClient";
import { sortedArticles, ARTICLE_CATEGORIES } from "../../lib/content";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Resources — useful ideas for the work in front of you",
  description:
    "Explore practical guides, field notes, research and perspectives on AI, digital communication, business growth and transformation in African contexts.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <Suspense
      fallback={
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Resources</span>
            <h1 className="display-1">Useful ideas for the work in front of you.</h1>
          </div>
        </section>
      }
    >
      <ResourcesClient articles={sortedArticles()} categories={ARTICLE_CATEGORIES} />
    </Suspense>
  );
}
