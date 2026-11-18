import Link from "next/link";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { pageMetadata } from "../../lib/seo";
import { SITE } from "../../lib/site";
import { whatsappHref } from "../../lib/links";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description:
    "How Flame Connect collects, uses and protects personal information when you visit our website or contact us, and the choices and rights you have.",
  path: "/privacy",
});

const LAST_UPDATED = "2026-11-18";

export default function PrivacyPage() {
  const updated = new Date(LAST_UPDATED).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const wa = whatsappHref("Hello Flame Connect — privacy request");

  return (
    <>
      <section className="page-hero white">
        <div className="container" style={{ maxWidth: "52rem" }}>
          <Breadcrumbs items={[{ name: "Privacy notice", href: "/privacy" }]} />
          <span className="eyebrow">Privacy</span>
          <h1 className="display-2">Privacy notice</h1>
          <p className="lede">
            This notice explains how {SITE.name} collects, uses and protects personal information
            when you visit our website, contact us or join the Flame Sales early-access list.
          </p>
          <p className="small muted" style={{ marginTop: "1rem" }}>
            Last updated: <time dateTime={LAST_UPDATED}>{updated}</time>
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="container prose" style={{ maxWidth: "52rem" }}>
          <h2>1. Who we are</h2>
          <p>
            {SITE.name} is an AI, digital and transformation company based in {SITE.officeLocation}.
            We are responsible for the personal information described in this notice. You can
            contact us about privacy at any time using the details in section 11.
          </p>

          <h2>2. Information we collect</h2>
          <ul>
            <li>
              <b>Information you send us.</b> When you contact us by email or WhatsApp, including
              through the enquiry composer on our <Link href="/contact">contact page</Link>, we
              receive what you choose to send: typically your name, organisation, email address or
              phone number, and the details of your enquiry.
            </li>
            <li>
              <b>Early-access and update requests.</b> If you ask to join the Flame Sales
              early-access list or receive updates, we keep your contact details and your request.
            </li>
            <li>
              <b>Technical information.</b> Like most websites, our hosting provider automatically
              processes basic technical data — such as IP address, browser type, device and pages
              requested — to deliver the site securely and reliably.
            </li>
          </ul>
          <p>
            Our website has no user accounts and does not store the messages you write in the
            enquiry composer: your message is only sent when you press send in your own email or
            WhatsApp app. We do not knowingly collect sensitive personal data, and we ask you not
            to send passwords, financial details or confidential third-party information.
          </p>

          <h2>3. How we use your information</h2>
          <ul>
            <li>To respond to enquiries and arrange consultations.</li>
            <li>To provide, scope and deliver the services you request from us.</li>
            <li>To manage the Flame Sales early-access list and send updates you asked for.</li>
            <li>To operate, secure and improve our website.</li>
            <li>To meet our legal and regulatory obligations.</li>
          </ul>

          <h2>4. Legal basis</h2>
          <p>
            We process personal information on the basis of your consent, to take steps at your
            request before entering into a contract, for our legitimate interests in running and
            improving our business (balanced against your rights), and where the law requires it.
            We aim to handle personal information in line with applicable data protection laws,
            including Uganda&rsquo;s Data Protection and Privacy Act, 2019.
          </p>

          <h2>5. Sharing your information</h2>
          <p>
            We do not sell personal information. We share it only with trusted service providers
            who help us operate — for example website hosting, email and messaging services — and
            only as needed for those services; with professional advisers where necessary; or
            where required by law. When you contact us by WhatsApp or email, those services also
            process your messages under their own privacy terms.
          </p>

          <h2>6. International transfers</h2>
          <p>
            Some of our service providers may process information outside Uganda. Where this
            happens, we take reasonable steps to ensure your information remains protected.
          </p>

          <h2>7. Retention</h2>
          <p>
            We keep personal information only for as long as needed for the purposes above — for
            example, for the duration of an enquiry or engagement and a reasonable period
            afterwards — or as required by law. You can ask to be removed from the early-access or
            updates list at any time.
          </p>

          <h2>8. Security</h2>
          <p>
            We use appropriate technical and organisational measures to protect personal
            information, including access controls and secure (HTTPS) connections. No method of
            transmission or storage is completely secure, but we work to protect your information
            and to respond promptly to any incident.
          </p>

          <h2>9. Cookies and analytics</h2>
          <p>
            {SITE.analyticsId
              ? "We use analytics to understand, in aggregate, how visitors use our website. Analytics data does not include the content of your enquiries."
              : "Our website does not use advertising or third-party tracking cookies, and we do not currently run third-party analytics. If this changes, we will update this notice first."}
          </p>

          <h2>10. Your rights</h2>
          <p>Subject to applicable law, you can ask us to:</p>
          <ul>
            <li>access the personal information we hold about you;</li>
            <li>correct information that is inaccurate or incomplete;</li>
            <li>delete your information, or restrict how we use it;</li>
            <li>object to processing, including for marketing; and</li>
            <li>withdraw your consent at any time, where we rely on consent.</li>
          </ul>
          <p>
            We will respond within a reasonable time. If you are not satisfied with our response,
            you may complain to the relevant data protection authority — in Uganda, the Personal
            Data Protection Office.
          </p>

          <h2>11. Contact us</h2>
          <p>
            For privacy questions or requests, contact {SITE.name}
            {SITE.contactEmail ? <> by email at <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a></> : null}
            {wa ? <>{SITE.contactEmail ? " or " : " "}on <a href={wa} rel="noopener noreferrer">WhatsApp</a></> : null}
            {!SITE.contactEmail && !wa ? <> through our <Link href="/contact">contact page</Link></> : null}. {SITE.name},{" "}
            {SITE.officeLocation}.
          </p>

          <h2>12. Children</h2>
          <p>
            Our website and services are intended for businesses and professionals, not for
            children, and we do not knowingly collect information from children.
          </p>

          <h2>13. Changes to this notice</h2>
          <p>
            We may update this notice from time to time. The latest version will always be on this
            page, with the date it was last updated.
          </p>
        </div>
      </section>
    </>
  );
}
