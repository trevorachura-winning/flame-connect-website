import Link from "next/link";
import { Icon } from "../../components/Icons";
import { pageMetadata } from "../../lib/seo";
import { SITE } from "../../lib/site";
import { flameSalesAppHref } from "../../lib/links";

/**
 * Sign-in fallback / status page.
 *
 * When an app origin is configured the header and drawer link straight to the
 * platform, so this page is reached by direct URL, the sitemap, or the
 * "Explore Flame OS" fallback. Its copy therefore has to stay TRUE in both
 * states — it must not claim sign-in is closed while the header proves
 * otherwise. `salesLive` switches the headline and adds a real entry point.
 */
const salesLive = Boolean(SITE.flameSalesUrl);
const sales = flameSalesAppHref();

export const metadata = pageMetadata({
  title: salesLive ? "Sign in to Flame Sales" : "Sign in — Flame OS access",
  description: salesLive
    ? "Sign in to the Flame Sales platform, or request access and an honest account of what is ready across the Flame product family."
    : "Flame OS access status and the honest route to sign in or request access while the platform completes production validation.",
  path: "/sign-in",
  type: "website",
});

export default function SignInPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "46rem" }}>
        <span className="eyebrow">{salesLive ? "Flame Sales" : "Flame OS access"}</span>
        <h1 className="display-2" style={{ margin: "1rem 0" }}>
          {salesLive
            ? "Flame Sales sign-in is live."
            : "Sign-in opens when the platform does."}
        </h1>
        <p className="lede">
          {salesLive ? (
            <>
              The Flame Sales platform is deployed and accepting sign-ins. The shared Flame OS layer
              behind the wider product family is still completing production validation — hosting,
              authentication, tenant-isolation and smoke-test gates — so the rest of the family keeps
              pointing at an access request rather than a login that leads nowhere.
            </>
          ) : (
            <>
              Flame OS is completing production validation — hosting, authentication,
              tenant-isolation and smoke-test gates. We would rather show you this page than a login
              screen that leads nowhere.
            </>
          )}
        </p>

        <div className="hero-actions">
          {salesLive ? (
            sales.external ? (
              <a href={sales.href} className="btn btn-primary" rel="noopener noreferrer">
                Sign in to Flame Sales <Icon name="arrow-up-right" size={17} />
              </a>
            ) : (
              <Link href={sales.href} className="btn btn-primary">
                Sign in to Flame Sales <Icon name="arrow-right" size={17} />
              </Link>
            )
          ) : (
            <Link href="/contact?intent=access" className="btn btn-primary">
              Request access updates <Icon name="arrow-right" size={17} />
            </Link>
          )}
          <Link href="/products" className="btn btn-outline">
            Explore free tools
          </Link>
        </div>

        <div className="card" style={{ margin: "2rem 0" }}>
          <h3 style={{ fontSize: "1.1rem" }}>Where that leaves you</h3>
          <ul className="tick-list" style={{ marginTop: "0.6rem" }}>
            <li><Icon name="check" size={17} /> <span><b>Pilot participants:</b> your access link arrives directly from the team. If you lost it, use the form below and mention your organization.</span></li>
            <li><Icon name="check" size={17} /> <span><b>Everyone else:</b> request access updates and you will hear the moment sign-in opens, with an honest account of what is ready.</span></li>
            <li><Icon name="check" size={17} /> <span><b>Curious engineers:</b> the deployment gates are public on the <Link href="/trust#product-status">Trust page</Link> and in the repository.</span></li>
          </ul>
          {salesLive && (
            <div style={{ marginTop: "1.1rem" }}>
              <Link href="/contact?intent=access" className="text-link">
                Request access updates <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          )}
        </div>

        <p className="small muted" style={{ marginTop: "1.6rem" }}>
          Configured app domains — Flame Sales:{" "}
          {SITE.flameSalesUrl ?? "not set"} · Flame OS:{" "}
          {SITE.flameOsUrl ??
            "not yet confirmed — see Appendix C items in the launch runbook."}
        </p>
      </div>
    </section>
  );
}
