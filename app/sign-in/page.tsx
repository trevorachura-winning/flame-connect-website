import Link from "next/link";
import { Icon } from "../../components/Icons";
import { pageMetadata } from "../../lib/seo";
import { SITE } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Sign in — Flame OS access",
  description:
    "Flame OS access status and the honest route to sign in or request access while the platform completes production validation.",
  path: "/sign-in",
  type: "website",
});

export default function SignInPage() {
  // This page renders only when no live app URL is configured — otherwise the
  // header links straight to the app. It exists so "Sign in" is never a dead button.
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "46rem" }}>
        <span className="eyebrow">Flame OS access</span>
        <h1 className="display-2" style={{ margin: "1rem 0" }}>Sign-in opens when the platform does.</h1>
        <p className="lede">
          Flame OS is completing production validation — hosting, authentication, tenant-isolation
          and smoke-test gates. We would rather show you this page than a login screen that leads
          nowhere.
        </p>

        <div className="card" style={{ margin: "1.8rem 0" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Where that leaves you</h3>
          <ul className="tick-list" style={{ marginTop: "0.6rem" }}>
            <li><Icon name="check" size={17} /> <span><b>Pilot participants:</b> your access link arrives directly from the team. If you lost it, use the form below and mention your organization.</span></li>
            <li><Icon name="check" size={17} /> <span><b>Everyone else:</b> request access updates and you will hear the moment sign-in opens, with an honest account of what is ready.</span></li>
            <li><Icon name="check" size={17} /> <span><b>Curious engineers:</b> the deployment gates are public on the <Link href="/trust#product-status">Trust page</Link> and in the repository.</span></li>
          </ul>
        </div>

        <div className="hero-actions">
          <Link href="/contact?intent=access" className="btn btn-primary">
            Request access updates <Icon name="arrow-right" size={17} />
          </Link>
          <Link href="/products" className="btn btn-outline">Explore free tools</Link>
        </div>

        <p className="small muted" style={{ marginTop: "1.6rem" }}>
          Configured app domain: {SITE.flameOsUrl ? SITE.flameOsUrl : "not yet confirmed — this page is the fallback that keeps every button honest."}
        </p>
      </div>
    </section>
  );
}
