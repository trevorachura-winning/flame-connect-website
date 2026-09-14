#!/usr/bin/env node
/**
 * Link gate — scans every route/component/content source file for href
 * literals and verifies internal targets resolve to a real route, so the
 * brief's rule "no product CTA leads to a placeholder or 404" is enforced
 * in CI rather than discovered by users.
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
  const js = ts.transpileModule(fs.readFileSync(abs, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const module = { exports: {} };
  cache.set(abs, module);
  const localRequire = (spec) => {
    if (spec.startsWith("./") || spec.startsWith("../")) {
      const resolved = path.normalize(path.join(path.dirname(abs), spec));
      const rel = path.relative(ROOT, resolved) + ".ts";
      if (fs.existsSync(path.join(ROOT, rel))) return loadTs(rel, cache);
      return {};
    }
    return {};
  };
  vm.runInNewContext(`(function(require, module, exports) { ${js} })`, vm.createContext({ console }))(localRequire, module, module.exports);
  return module.exports;
}

const { PRODUCTS } = loadTs("content/products.ts");
const { SERVICES } = loadTs("content/services.ts");
const { ARTICLES } = loadTs("content/articles.ts");

const STATIC_ROUTES = new Set([
  "/", "/products", "/services", "/flame-os", "/community", "/resources",
  "/about", "/trust", "/contact", "/sign-in", "/privacy",
]);
const ROUTES = new Set([
  ...STATIC_ROUTES,
  ...PRODUCTS.map((p) => `/products/${p.slug}`),
  ...SERVICES.map((s) => `/services/${s.slug}`),
  ...ARTICLES.map((a) => `/resources/${a.slug}`),
]);
const CONTENT_PREFIXES = ["/products/", "/services/", "/resources/"];
const ALLOWED_EXTERNAL = [
  "https://github.com/trevorachura-winning/flame-connect-salesos-ai",
];

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git", "public"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(tsx?|css)$/.test(entry.name)) yield full;
  }
}

const hrefRe = /href\s*=\s*[{]?["'`]([^"'`}]+)["'`]/g;
const templateRe = /href\s*=\s*\{`([^`]+)`/g;

for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  const src = fs.readFileSync(file, "utf8");

  for (const re of [hrefRe, templateRe]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(src))) {
      let raw = m[1];
      const line = src.slice(0, m.index).split("\n").length;
      if (raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("#")) continue;
      if (raw.includes("${")) {
        // Template-dynamic: validate the static path family only.
        const prefix = raw.slice(0, raw.indexOf("${"));
        const base = prefix.split("?")[0];
        const family = CONTENT_PREFIXES.find((p) => base.startsWith(p) || p.startsWith(base));
        if (!family && !STATIC_ROUTES.has(base) && !ALLOWED_EXTERNAL.some((e) => e.startsWith(base)))
          problems.push(`${rel}:${line} unverifiable dynamic href prefix "${raw}"`);
        continue;
      }
      if (/^https?:\/\//.test(raw)) {
        if (!ALLOWED_EXTERNAL.includes(raw) && !raw.startsWith("https://github.com/trevorachura-winning/"))
          problems.push(`${rel}:${line} external href not on the approved list: ${raw}`);
        continue;
      }
      const to = raw.split("?")[0].split("#")[0];
      if (!to.startsWith("/")) continue;
      if (ROUTES.has(to)) continue;
      problems.push(`${rel}:${line} internal href does not resolve to a route: ${raw}`);
    }
  }
}

if (problems.length) {
  console.error(`Link check FAILED with ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
console.log(`Link check passed: ${ROUTES.size} routes verified across source files.`);
