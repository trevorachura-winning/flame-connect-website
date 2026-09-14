#!/usr/bin/env node
/**
 * Content gate — evaluates the TS content registry without a build step and
 * enforces the rules the site promises publicly:
 *   1. unique slugs and valid cross-references
 *   2. valid product statuses and allowed CTA kinds
 *   3. claim discipline: banned overclaim phrases fail the check
 *   4. every referenced public asset exists on disk
 *
 * Content files import types only (see docs/CONTENT_MODEL.md), which is what
 * lets this script transpile + evaluate them standalone in CI.
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import vm from "node:vm";

const ROOT = process.cwd();
const problems = [];

function loadTs(file, cache = new Map()) {
  const abs = path.join(ROOT, file);
  if (cache.has(abs)) return cache.get(abs).exports;
  const src = fs.readFileSync(abs, "utf8");
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const module = { exports: {} };
  cache.set(abs, module);
  const localRequire = (spec) => {
    if (spec.startsWith("./") || spec.startsWith("../")) {
      const resolved = path.normalize(path.join(path.dirname(abs), spec));
      const rel = path.relative(ROOT, resolved);
      const target = fs.existsSync(resolved + ".ts") ? rel + ".ts" : rel;
      // Only type-only external imports are allowed; they vanish at transpile.
      if (!fs.existsSync(path.join(ROOT, target))) {
        throw new Error(`${file} imports non-content module "${spec}" — keep content files type-only-import (docs/CONTENT_MODEL.md).`);
      }
      return loadTs(target, cache);
    }
    throw new Error(`${file} imports package "${spec}" — content files must not import packages.`);
  };
  vm.runInNewContext(`(function(require, module, exports) { ${js} })`, vm.createContext({ console }))(localRequire, module, module.exports);
  return module.exports;
}

const { PRODUCTS } = loadTs("content/products.ts");
const { SERVICES } = loadTs("content/services.ts");
const { ARTICLES } = loadTs("content/articles.ts");
const { TOP_NAV, FOOTER_NAV } = loadTs("content/navigation.ts");

// 1 — unique slugs
const checkUnique = (kind, items) => {
  const seen = new Set();
  for (const it of items) if (seen.has(it.slug)) problems.push(`Duplicate ${kind} slug "${it.slug}"`); else seen.add(it.slug);
};
checkUnique("product", PRODUCTS);
checkUnique("service", SERVICES);
checkUnique("article", ARTICLES);

// 2 — cross references + enums
const VALID_STATUS = new Set(["live", "pilot", "development"]);
const VALID_CTA = new Set(["try", "access", "waitlist", "talk"]);
for (const p of PRODUCTS) {
  if (!VALID_STATUS.has(p.status)) problems.push(`${p.slug}: unknown status "${p.status}"`);
  if (!VALID_CTA.has(p.cta?.kind)) problems.push(`${p.slug}: unknown cta kind "${p.cta?.kind}"`);
  if (!SERVICES.find((s) => s.slug === p.relatedServiceSlug)) problems.push(`${p.slug}: unknown related service "${p.relatedServiceSlug}"`);
  if ((p.outcomes?.length ?? 0) < 3) problems.push(`${p.slug}: needs at least 3 outcome cards (brief template)`);
  if (p.howItWorks?.length !== 3) problems.push(`${p.slug}: "how it works" must be exactly 3 steps (brief template)`);
}
for (const s of SERVICES) {
  for (const slug of s.relatedProductSlugs ?? []) {
    if (!PRODUCTS.find((p) => p.slug === slug)) problems.push(`${s.slug}: unknown related product "${slug}"`);
  }
}
for (const a of ARTICLES) {
  if (a.relatedProductSlug && !PRODUCTS.find((p) => p.slug === a.relatedProductSlug)) problems.push(`${a.slug}: unknown product link "${a.relatedProductSlug}"`);
  if (a.relatedServiceSlug && !SERVICES.find((s) => s.slug === a.relatedServiceSlug)) problems.push(`${a.slug}: unknown service link "${a.relatedServiceSlug}"`);
  if (new Date(a.date) > new Date()) problems.push(`${a.slug}: publication date is in the future (${a.date})`);
}

// 3 — claim discipline (brief section 24)
const BANNED = [
  /\brevolutionary\b/i, /\bbest in africa\b/i, /\bworld[- ]class\b/i, /\bcutting[- ]edge\b/i,
  /\bguaranteed (results?|growth|roi)\b/i, /\bnumber one\b/i, /\bindustry[- ]leading\b/i, /\b#1\b/,
];
const collect = (v, out = []) => {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => collect(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => collect(x, out));
  return out;
};
for (const text of [...collect(PRODUCTS), ...collect(SERVICES), ...collect(ARTICLES)]) {
  for (const rule of BANNED) {
    if (rule.test(text)) problems.push(`Banned claim phrase ${rule} in: "${text.slice(0, 80)}…"`);
  }
}

// 4 — referenced assets exist
for (const s of SERVICES) {
  if (!fs.existsSync(path.join(ROOT, "public", s.image.src))) problems.push(`${s.slug}: missing image ${s.image.src}`);
}

// 5 — navigation sanity
for (const item of TOP_NAV) {
  if (!item.href.startsWith("/")) problems.push(`Top nav "${item.label}" href must be internal: ${item.href}`);
}
void FOOTER_NAV;

if (problems.length) {
  console.error(`Content check FAILED with ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log(`Content check passed: ${PRODUCTS.length} products, ${SERVICES.length} services, ${ARTICLES.length} articles, ${TOP_NAV.length} nav items.`);
