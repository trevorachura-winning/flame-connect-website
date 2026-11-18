import { Suspense } from "react";
import { ContactPageClient } from "../../components/ContactPageClient";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Contact us: tell us what you are trying to improve",
  description:
    "Tell us the problem you want to solve. It might be a clearer online presence, an AI adoption plan, a practical automation, a custom tool, a learning programme or a research partner.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Contact</span>
            <h1 className="display-1">Tell us what you are trying to improve.</h1>
          </div>
        </section>
      }
    >
      <ContactPageClient />
    </Suspense>
  );
}
