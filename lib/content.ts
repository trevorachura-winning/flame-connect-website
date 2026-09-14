import { PRODUCTS, getProduct } from "../content/products";
import { SERVICES, getService } from "../content/services";
import { ARTICLES, getArticle, sortedArticles, ARTICLE_CATEGORIES } from "../content/articles";
import path from "node:path";
import fs from "node:fs";

/**
 * Content validation — runs at import time, which means it runs during
 * `next build` and `next start`. Bad content fails the build loudly instead
 * of shipping a public site with broken links or unverified claims.
 *
 * Claim discipline (brief section 24): banned phrases that would overstate
 * capability or status are rejected here, not in review meetings.
 */

const BANNED_CLAIMS = [
  /\brevolutionary\b/i,
  /\bbest in africa\b/i,
  /\bworld[- ]class\b/i,
  /\bcutting[- ]edge\b/i,
  /\bguaranteed (results?|growth|roi)\b/i,
  /\bnumber one\b/i,
  /\b#1\b/,
  /\bindustry[- ]leading\b/i,
];

const STATIC_ROUTES = [
  "/", "/products", "/services", "/flame-os", "/community", "/resources",
  "/about", "/trust", "/contact", "/sign-in", "/privacy",
];

function collectStrings(value: unknown, into: string[] = []): string[] {
  if (typeof value === "string") into.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, into));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => collectStrings(v, into));
  return into;
}

function assertContent(): void {
  const problems: string[] = [];

  // Unique slugs
  for (const [kind, list] of [
    ["product", PRODUCTS],
    ["service", SERVICES],
    ["article", ARTICLES],
  ] as const) {
    const seen = new Set<string>();
    for (const item of list) {
      if (seen.has(item.slug)) problems.push(`Duplicate ${kind} slug: ${item.slug}`);
      seen.add(item.slug);
    }
  }

  // Cross references resolve
  for (const s of SERVICES) {
    for (const p of s.relatedProductSlugs) {
      if (!getProduct(p)) problems.push(`Service ${s.slug} references unknown product ${p}`);
    }
  }
  for (const p of PRODUCTS) {
    if (!getService(p.relatedServiceSlug)) problems.push(`Product ${p.slug} references unknown service ${p.relatedServiceSlug}`);
  }
  for (const a of ARTICLES) {
    if (a.relatedProductSlug && !getProduct(a.relatedProductSlug)) problems.push(`Article ${a.slug} references unknown product ${a.relatedProductSlug}`);
    if (a.relatedServiceSlug && !getService(a.relatedServiceSlug)) problems.push(`Article ${a.slug} references unknown service ${a.relatedServiceSlug}`);
    if (!(ARTICLE_CATEGORIES as readonly string[]).includes(a.category)) problems.push(`Article ${a.slug} has unknown category ${a.category}`);
  }

  // Claim discipline
  const everything = [...collectStrings(PRODUCTS), ...collectStrings(SERVICES), ...collectStrings(ARTICLES)];
  for (const text of everything) {
    for (const rule of BANNED_CLAIMS) {
      if (rule.test(text)) problems.push(`Banned claim phrase ${rule} found in: "${text.slice(0, 90)}…"`);
    }
  }

  // Referenced images exist on disk
  const imageRefs = SERVICES.map((s) => s.image.src);
  for (const src of imageRefs) {
    const p = path.join(process.cwd(), "public", src);
    if (!fs.existsSync(p)) problems.push(`Missing public asset referenced in content: ${src}`);
  }

  // Expected routes derived from content
  const derived = [
    ...STATIC_ROUTES,
    ...PRODUCTS.map((p) => `/products/${p.slug}`),
    ...SERVICES.map((s) => `/services/${s.slug}`),
    ...ARTICLES.map((a) => `/resources/${a.slug}`),
  ];
  const dupes = derived.filter((r, i) => derived.indexOf(r) !== i);
  if (dupes.length) problems.push(`Duplicate routes derived: ${dupes.join(", ")}`);

  if (problems.length) {
    throw new Error(`Flame Connect content validation failed:\n - ${problems.join("\n - ")}`);
  }
}

if (process.env.NEXT_RUNTIME !== "edge") {
  assertContent();
}

export { PRODUCTS, SERVICES, ARTICLES, getProduct, getService, getArticle, sortedArticles, ARTICLE_CATEGORIES };

export const ALL_ROUTES: string[] = (() => {
  const routes = [
    ...STATIC_ROUTES,
    ...PRODUCTS.map((p) => `/products/${p.slug}`),
    ...SERVICES.map((s) => `/services/${s.slug}`),
    ...ARTICLES.map((a) => `/resources/${a.slug}`),
  ];
  return routes;
})();
