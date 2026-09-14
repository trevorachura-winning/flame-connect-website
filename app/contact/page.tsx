import Link from "next/link";
import { LeadForm } from "../../components/LeadForm";
import { Icon } from "../../components/Icons";
import { pageMetadata } from "../../lib/seo";
import { SITE } from "../../lib/site";
import type { Intent } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Contact — tell us what you are trying to improve",
  description:
    "Whether you need a clearer digital presence, an AI adoption plan, a practical automation, a custom tool, a learning programme or a research partner — start with the problem.",
  path: "/contact",
});

const VALID_INTENTS: Intent[] = ["consultation", "access", "waitlist", "community", "learning", "partnership", "newsletter", "media", "other"];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; product?: string; service?: string }>;
}) {
  const params = await searchParams;
  const intent = VALID_INTENTS.includes(params.intent as Intent) ? (params.intent as Intent) : "consultation";
  const product = params.product?.slice(0, 60);
  const service = params.service?.slice(0, 60);

  return (
    <>
      <section className="page-hero motif">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1 className="display-1">Tell us what you are trying to improve.</h1>
          <p className="lede">
            Whether you need a clearer digital presence, an AI adoption plan, a practical
            automation, a custom tool, a learning programme or a partner for research and
            innovation — start with the problem. We will help identify the most useful next step.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="container split" style={{ alignItems: "start" }}>
          <div className="form-card">
            <LeadForm initialIntent={intent} initialProduct={product} initialService={service} />
          </div>

          <aside className="contact-side">
            <div className="contact-note">
              <h3>What happens next</h3>
              <ul>
                <li>A person reads every enquiry — no autoresponder pretending to care.</li>
                <li>You get a useful next step: a scoped conversation, the right tool, a learning path, or an honest "not us".</li>
                <li>One follow-up at most if we do not hear back. No nurture-sequence drip campaigns.</li>
              </ul>
            </div>

            <div className="contact-note">
              <span className="pending-tag">Pending confirmation</span>
              <h3>Direct contact details</h3>
              <p>
                {SITE.contactEmail
                  ? <>Email us at <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.</>
                  : "Our direct email, phone and WhatsApp lines are being finalised. The form is the reliable route right now — it reaches the same people, and it cannot be mis-typed."}
              </p>
              <p style={{ marginTop: "0.6rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <Icon name="map-pin" size={16} /> {SITE.officeLocation}
              </p>
            </div>

            <div className="contact-note">
              <h3>Not sure where your need fits?</h3>
              <p>
                Choose “Other” and describe the outcome you are trying to achieve. Routing problems
                are our problem, not yours.
              </p>
              <p style={{ marginTop: "0.8rem" }}>
                <Link href="/privacy" className="text-link small">
                  How your details are handled <Icon name="arrow-right" size={14} />
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
