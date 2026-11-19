import { AssessmentClient } from "../../components/AssessmentClient";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Free AI readiness assessment",
  description:
    "Twelve quick questions across strategy, data, technology, people, processes and governance. Get your AI readiness score and three practical next steps in about five minutes.",
  path: "/assessment",
});

export default function AssessmentPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="assessment-title">
        <div className="container">
          <span className="eyebrow">Free AI readiness assessment</span>
          <h1 id="assessment-title" className="display-1">
            How ready is your organisation for AI?
          </h1>
          <p className="lede">
            Answer twelve quick questions across six areas: strategy, data, technology, people,
            processes and governance. You get your score and three practical next steps straight
            away. It takes about five minutes and costs nothing.
          </p>
        </div>
      </section>
      <section className="section" aria-label="Assessment">
        <div className="container">
          <AssessmentClient />
        </div>
      </section>
    </>
  );
}
