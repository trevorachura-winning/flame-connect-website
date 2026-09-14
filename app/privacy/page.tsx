import Link from "next/link";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { pageMetadata } from "../../lib/seo";
import { SITE } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description:
    "What data Flame Connect collects through this website, why, and the choices you have — in plain language.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero white">
        <div className="container" style={{ maxWidth: "52rem" }}>
          <Breadcrumbs items={[{ name: "Privacy notice", href: "/privacy" }]} />
          <span className="eyebrow">Privacy</span>
          <h1 className="display-2">A privacy notice you can actually read.</h1>
          <p className="lede">
            This notice covers the Flame Connect website. It is written in plain language on
            purpose, and it will be reviewed formally before the site’s public launch — like every
            other claim we make.
          </p>
        </div>
      </section>

      <section className="section tight">
        <div className="container prose" style={{ maxWidth: "52rem" }}>
          <h2>What we collect</h2>
          <p>
            When you use a form on this site, we collect the fields you fill in: typically your
            name, work email, organization, country, the kind of help you want and your description
            of the challenge. Newsletter and community sign-ups collect only your email address.
          </p>
          <p>
            We deliberately do not collect sensitive personal data through this website. Please do
            not send passwords, confidential client information or sensitive personal data through
            any Flame form — the forms themselves warn you of the same.
          </p>

          <h2>Why we collect it</h2>
          <ul>
            <li>To respond to your enquiry with something useful rather than a generic reply.</li>
            <li>To deliver community updates, learning announcements or product access news you asked for.</li>
            <li>To understand, at an aggregate level, which services and tools people are interested in.</li>
          </ul>

          <h2>Analytics</h2>
          <p>
            {SITE.analyticsId
              ? "This deployment runs a configured analytics measurement ID. Analytics capture page-level and aggregate behaviour only; form free-text content is never sent to analytics."
              : "This site runs no third-party analytics scripts by default. If analytics are introduced, they will be aggregate-only, will never receive your form text, and this notice will be updated before they go live."}
          </p>

          <h2>What we never do</h2>
          <ul>
            <li>No pre-checked marketing consent boxes.</li>
            <li>No sale of personal data.</li>
            <li>No use of your enquiry content to train AI models.</li>
            <li>No cross-site tracking pixels.</li>
          </ul>

          <h2>Retention and your choices</h2>
          <p>
            Enquiry records are kept only as long as they are useful for the conversation and any
            engagement that follows. You can ask to see, correct or delete your details at any time
            through the <Link href="/contact">contact page</Link>
            {SITE.contactEmail ? <> or by emailing <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a></> : null}.
            Community and newsletter lists include a working unsubscribe in every message.
          </p>

          <h2>Where data is processed</h2>
          <p>
            Website hosting and form processing use reputable cloud providers. When the final
            processor list is confirmed it will be named here — one of the launch items on our{" "}
            <Link href="/trust">Trust page</Link>.
          </p>

          <div className="callout" style={{ marginTop: "2rem" }}>
            <h3>Status of this notice</h3>
            <p style={{ color: "var(--ink-soft)" }}>
              Version 0.1 · Prepared {new Date("2026-09-14").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} ·
              Pending formal legal review before public launch. The intent will not weaken: minimum
              data, plain language, real choices.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
