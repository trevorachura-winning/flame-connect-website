import { SITE, type Intent } from "./site";
import type { Product } from "../content/products";

/**
 * CTA resolution — the brief's golden rule: "Never a dead button."
 *
 * Website-only release (Nov 2026): there is no sign-in and no link into any
 * Flame platform. Every product and service action resolves to an on-site
 * route — the contact page, pre-set with the right intent and context — and
 * the contact page hands the enquiry to the visitor's own email or WhatsApp.
 */

export function contactHref(intent: Intent, product?: string): string {
  const params = new URLSearchParams({ intent });
  if (product) params.set("product", product);
  return `/contact?${params.toString()}`;
}

/** Primary conversion route used site-wide (header, CTA bands). */
export function consultationHref(): string {
  return "/contact?intent=consultation";
}

/** Product page action: always an on-site enquiry, never an app launch. */
export function productCtaHref(product: Product): { href: string; external: false } {
  const kind = product.cta.kind;
  if (kind === "waitlist") return { href: contactHref("waitlist", product.slug), external: false };
  if (kind === "talk") return { href: contactHref("consultation", product.slug), external: false };
  return { href: contactHref(product.cta.intent, product.slug), external: false };
}

/** mailto: link with a prefilled subject and body, or null when no public email is confirmed. */
export function mailtoHref(subject: string, body: string): string | null {
  if (!SITE.contactEmail) return null;
  const q = new URLSearchParams({ subject, body }).toString().replace(/\+/g, "%20");
  return `mailto:${SITE.contactEmail}?${q}`;
}

/** WhatsApp click-to-chat link with prefilled text, or null when no number is confirmed. */
export function whatsappHref(text: string): string | null {
  const digits = (SITE.contactWhatsApp ?? "").replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
