import { SITE, type Intent } from "./site";
import type { Product, ProductCtaKind } from "../content/products";

/**
 * CTA resolution — the brief's golden rule: "Never a dead button."
 *
 * Product actions prefer the live Flame OS app when NEXT_PUBLIC_FLAME_OS_URL is
 * configured. Until then (Appendix C — app domain unconfirmed), every action
 * resolves to an on-site route that always works: the enquiry form, pre-set to
 * the right intent and product context.
 */

export function contactHref(intent: Intent, product?: string): string {
  const params = new URLSearchParams({ intent });
  if (product) params.set("product", product);
  return `/contact?${params.toString()}`;
}

export function signInHref(): { href: string; external: boolean } {
  if (SITE.flameOsUrl) return { href: `${SITE.flameOsUrl}/login`, external: true };
  return { href: "/sign-in", external: false };
}

export function flameOsAppHref(): { href: string; external: boolean } {
  if (SITE.flameOsUrl) return { href: SITE.flameOsUrl, external: true };
  return { href: "/sign-in", external: false };
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
