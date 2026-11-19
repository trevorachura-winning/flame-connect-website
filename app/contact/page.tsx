import { Suspense } from "react";
import { ContactPageClient } from "../../components/ContactPageClient";
import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Contact Flame Connect in Kampala, Uganda",
  description:
    "Book a consultation or tell us the problem you want to solve: an AI adoption plan, a practical automation, a stronger online presence or a learning programme.",
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
