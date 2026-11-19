"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { EnquiryComposer } from "./EnquiryComposer";
import { Icon } from "./Icons";
import { SITE, type Intent } from "../lib/site";
import m from "../styles/marketing/marketing.module.css";
import { whatsappHref } from "../lib/links";
import { WhatsAppEnquiry } from "./WhatsAppEnquiry";

const VALID_INTENTS: Intent[] = ["consultation", "access", "waitlist", "community", "learning", "partnership", "newsletter", "media", "other"];

export function ContactPageClient() {
  const params = useSearchParams();
  const rawIntent = params.get("intent") as Intent | null;
  const intent: Intent = rawIntent && VALID_INTENTS.includes(rawIntent) ? rawIntent : "consultation";
  const product = params.get("product")?.slice(0, 60) ?? undefined;
  const service = params.get("service")?.slice(0, 60) ?? undefined;
  const waLink = whatsappHref("Hello Flame Connect");

  return (
    <>
      <section className="page-hero motif">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1 className="display-1">Tell us what you are trying to improve.</h1>
          <p className="lede">
            Start with the problem. You might need a clearer online presence, an AI adoption plan, a practical
            automation, a custom tool, a learning programme or a partner for research and
            innovation. We will help you find the most useful next step.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className={`container ${m.split} ${m.splitTop}`}>
          <div className="form-card">
            <EnquiryComposer intent={intent} product={product} service={service} />
          </div>

          <aside className="contact-side">
            <div className="contact-note">
              <h3>What happens next</h3>
              <ul>
                <li>A real person reads every enquiry. There are no automatic replies.</li>
                <li>You get a useful next step: a scoped conversation, the right tool, a learning path, or an honest "not us".</li>
                <li>If we do not hear back, we follow up once at most. We will not add you to a mailing sequence.</li>
              </ul>
            </div>

            <div className="contact-note">
              {!SITE.contactEmail && !SITE.contactWhatsApp && <span className="pending-tag">Pending confirmation</span>}
              <h3>Direct contact details</h3>
              <p>
                {SITE.contactEmail || SITE.contactWhatsApp ? (
                  <>
                    {SITE.contactEmail && <>Email <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. </>}
                    {waLink && <>WhatsApp <WhatsAppEnquiry>+{(SITE.contactWhatsApp ?? "").replace(/\D/g, "")}</WhatsAppEnquiry>.</>}
                  </>
                ) : (
                  "Our public email and WhatsApp line are being finalised and will be published here before launch."
                )}
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
