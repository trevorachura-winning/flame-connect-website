import { SITE, type Intent } from "./site";
import type { Product, ProductCtaKind } from "../content/products";

/**
 * CTA resolution — the brief's golden rule: "Never a dead button."
 *
 * Precedence for "Sign in":
 *   1. NEXT_PUBLIC_FLAME_SALES_URL  → the deployed Flame Sales platform
 *   2. NEXT_PUBLIC_FLAME_OS_URL     → a shared Flame OS deployment's login
 *   3. neither                      → the on-site /sign-in fallback page
 *
 * The two app settings are kept separate on purpose. `flameOsUrl` also drives
 * productCtaHref() below, so pointing it at the Flame Sales deployment would
 * silently repoint every other product's launch button at Flame Sales. A
 * per-product app gets its own variable; unset products keep resolving to an
 * on-site route that always works (the enquiry form, pre-set to the right
 * intent and product context).
 */

export function contactHref(intent: Intent, product?: string): string {
  const params = new URLSearchParams({ intent });
  if (product) params.set("product", product);
  return `/contact?${params.toString()}`;
}

/** Join an origin and a path without doubling or dropping the separator. */
function joinUrl(base: string, path: string): string {
  const cleanBase = base.replace(/\/+$/, "");
  if (!path || path === "/") return cleanBase || "/";
  return `${cleanBase}/${path.replace(/^\/+/, "")}`;
}

export function signInHref(): { href: string; external: boolean } {
  // 1 — Flame Sales platform is deployed: sign in goes to its own auth route.
  //     The path is configurable because auth routes differ by stack and this
  //     build cannot verify the platform's routes from here.
  if (SITE.flameSalesUrl) {
    return { href: joinUrl(SITE.flameSalesUrl, SITE.flameSalesSignInPath), external: true };
  }
  // 2 — a shared Flame OS deployment exists.
  if (SITE.flameOsUrl) return { href: joinUrl(SITE.flameOsUrl, "/login"), external: true };
  // 3 — neither configured: honest on-site fallback.
  return { href: "/sign-in", external: false };
}

/**
 * Direct entry to the Flame Sales app root — the platform performs its own
 * auth redirect from there. Falls back to a pre-contextualised access request
 * when unconfigured, so the button stays honest either way.
 *
 * Not yet wired into the Flame Sales product page: that button is labelled
 * "Request access" for a limited pilot, and relabelling it is a content/status
 * decision (see docs/DEPLOYMENT.md and the release discipline note).
 */
export function flameSalesAppHref(): { href: string; external: boolean } {
  if (SITE.flameSalesUrl) return { href: SITE.flameSalesUrl, external: true };
  return { href: contactHref("access", "flame-sales"), external: false };
}

/**
 * "Explore Flame OS" / generic in-page "Sign in" buttons.
 *
 * Falls through to signInHref() rather than hardcoding /sign-in: when there is
 * no separate shared-platform deployment, the only sign-in that actually exists
 * is the per-product one (currently Flame Sales). Routing every "Sign in" to the
 * same live destination keeps the site coherent — and if nothing is deployed,
 * signInHref() still resolves to the on-site fallback, so no button dead-ends.
 */
export function flameOsAppHref(): { href: string; external: boolean } {
  if (SITE.flameOsUrl) return { href: SITE.flameOsUrl, external: true };
  return signInHref();
}

export function exploreToolsHref(): string {
  return "/products";
}

export function productCtaHref(product: Product): { href: string; external: boolean } {
  const kind: ProductCtaKind = product.cta.kind;
  if (kind === "try" || kind === "access") {
    if (SITE.flameOsUrl) return { href: SITE.flameOsUrl, external: true };
    // No live app configured: honest access request instead of a broken launch.
    return { href: contactHref(product.cta.intent, product.slug), external: false };
  }
  if (kind === "waitlist") return { href: contactHref("waitlist", product.slug), external: false };
  return { href: contactHref("consultation", product.slug), external: false };
}
