/**
 * Marketing workstream tests — run with:  node --test tests/marketing/
 * No extra dependencies: TS sources are transpiled with the repo's own
 * `typescript` devDependency (same approach as scripts/check-content.mjs).
 *
 * Guards the promises the marketing pages make:
 *   - new copy passes the site's claim discipline (banned phrases, no
 *     invented percentages or client counts)
 *   - every marketing href resolves to a real route
 *   - service chooser + product gateway derive from the registries
 *   - resource search behaves predictably
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const ROOT = process.cwd();
const cache = new Map();
function load(file) {
  const abs = path.join(ROOT, file);
  if (cache.has(abs)) return cache.get(abs).exports;
  const js = ts.transpileModule(fs.readFileSync(abs, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  cache.set(abs, mod);
  const req = (spec) => {
    if (spec.startsWith("node:")) return {};
    if (!spec.startsWith(".")) throw new Error(`${file} imports package ${spec}`);
    const rel = path.relative(ROOT, path.join(path.dirname(abs), spec));
    return load(fs.existsSync(path.join(ROOT, rel + ".ts")) ? rel + ".ts" : rel);
  };
  vm.runInNewContext(`(function(require, module, exports){${js}})`, vm.createContext({ process: { env: {} }, URL, URLSearchParams, encodeURIComponent }))(req, mod, mod.exports);
  return mod.exports;
}

const home = load("content/home.ts");
const { SERVICES, SERVICE_CHOOSER } = load("content/services.ts");
const { PRODUCTS } = load("content/products.ts");
const { ARTICLES, ARTICLE_CATEGORIES } = load("content/articles.ts");
const { filterArticles } = load("components/marketing/resourceSearch.ts");

const STATIC = ["/", "/products", "/services", "/flame-os", "/community", "/resources", "/about", "/trust", "/contact", "/privacy"];
const ROUTES = new Set([
  ...STATIC,
  ...PRODUCTS.map((p) => `/products/${p.slug}`),
  ...SERVICES.map((s) => `/services/${s.slug}`),
  ...ARTICLES.map((a) => `/resources/${a.slug}`),
]);
const routeOf = (href) => href.split(/[?#]/)[0] || "/";

const BANNED = [/\brevolutionary\b/i, /\bbest in africa\b/i, /\bworld[- ]class\b/i, /\bcutting[- ]edge\b/i,
  /\bguaranteed (results?|growth|roi)\b/i, /\bnumber one\b/i, /#1\b/, /\bindustry[- ]leading\b/i];
const strings = (v, out = []) => {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => strings(x, out));
  return out;
};
const NEW_COPY = { HOME_HERO: home.HOME_HERO, HOME_CHALLENGES: home.HOME_CHALLENGES, HOME_PROOF_POINTS: home.HOME_PROOF_POINTS, ABOUT_MODEL: home.ABOUT_MODEL, SERVICE_CHOOSER };

test("new marketing copy passes claim discipline", () => {
  for (const text of strings(NEW_COPY)) {
    for (const rule of BANNED) assert.ok(!rule.test(text), `banned phrase ${rule} in "${text}"`);
    assert.ok(!/\d+\s?%/.test(text), `unsourced percentage in "${text}"`);
    assert.ok(!/\b\d+\+?\s+(clients|customers|businesses|organizations|users)\b/i.test(text), `unsourced count in "${text}"`);
  }
});

test("marketing page sources contain no banned phrases", () => {
  const files = ["app/page.tsx", "app/about/page.tsx", "app/services/page.tsx", "app/resources/page.tsx",
    ...fs.readdirSync(path.join(ROOT, "components/marketing"), { recursive: true })
      .filter((f) => /\.(tsx?|mjs)$/.test(String(f)))
      .map((f) => `components/marketing/${f}`)];
  for (const f of files) {
    const src = fs.readFileSync(path.join(ROOT, f), "utf8");
    for (const rule of BANNED) assert.ok(!rule.test(src), `${f}: banned phrase ${rule}`);
  }
});

test("every marketing content href resolves to a route", () => {
  const hrefs = [...home.HOME_PROOF_POINTS, ...home.ABOUT_MODEL].map((x) => x.href);
  for (const href of hrefs) assert.ok(ROUTES.has(routeOf(href)), `unknown route ${href}`);
});

test("literal hrefs in marketing pages resolve", () => {
  const files = ["app/page.tsx", "app/about/page.tsx", "app/services/page.tsx", "app/resources/page.tsx", "app/services/[slug]/page.tsx", "app/resources/[slug]/page.tsx"];
  for (const f of files) {
    const src = fs.readFileSync(path.join(ROOT, f), "utf8");
    for (const m of src.matchAll(/href="(\/[^"]*)"/g)) assert.ok(ROUTES.has(routeOf(m[1])), `${f}: ${m[1]}`);
  }
});

test("service chooser covers all three service lines with valid slugs", () => {
  const slugs = new Set(SERVICES.map((s) => s.slug));
  for (const item of SERVICE_CHOOSER) assert.ok(slugs.has(item.serviceSlug), item.serviceSlug);
  assert.deepEqual(new Set(SERVICE_CHOOSER.map((i) => i.serviceSlug)), slugs);
});

test("service pillars stay the approved three", () => {
  assert.deepEqual([...SERVICES.map((s) => s.name)], ["Digital & Communications", "AI in Business", "Consulting & Thought Leadership"]);
  for (const s of SERVICES) {
    assert.ok(s.problems.length >= 3, `${s.slug} needs problems for the challenge step`);
    assert.ok(s.outputs.length >= 1 && s.outcomeStatement, `${s.slug} needs an entry output and outcome`);
  }
});

test("homepage states no product status of its own", () => {
  const src = fs.readFileSync(path.join(ROOT, "app/page.tsx"), "utf8") + fs.readFileSync(path.join(ROOT, "components/marketing/ProductGateway.tsx"), "utf8");
  assert.ok(!/\b(now live|available now|launched)\b/i.test(src), "status language must come from content/products.ts");
});

test("resource search: empty query returns all, category filters, terms AND together", () => {
  assert.equal(filterArticles(ARTICLES, null, "").length, ARTICLES.length);
  assert.equal(filterArticles(ARTICLES, null, "   ").length, ARTICLES.length);
  for (const cat of ARTICLE_CATEGORIES) {
    assert.ok(filterArticles(ARTICLES, cat, "").every((a) => a.category === cat));
  }
  const readiness = filterArticles(ARTICLES, null, "READINESS");
  assert.ok(readiness.some((a) => a.slug === "ai-readiness-is-a-people-problem-first"));
  assert.equal(filterArticles(ARTICLES, null, "readiness zzzz-no-match").length, 0);
  assert.equal(filterArticles(ARTICLES, "Research", "workflow").length, filterArticles(ARTICLES, "Research", "").filter((a) => /workflow/i.test(a.title + a.summary + a.sections.map((s) => s.heading).join(" "))).length);
});

/* ---------------- Website-only release (Nov 2026) ---------------- */
const walk = (dir) =>
  fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]
  );
const SOURCES = [...walk("app"), ...walk("components"), ...walk("content"), ...walk("lib")].filter((f) => /\.(tsx?|mjs)$/.test(f));

test("no sign-in, login or platform-app links anywhere in the site", () => {
  for (const f of SOURCES) {
    const src = fs.readFileSync(path.join(ROOT, f), "utf8");
    // Visible "Sign in"/"Log in" UI text or routes (comments explaining the removal are allowed).
    const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    assert.ok(!/>\s*(Sign|Log) ?in\b/i.test(code), `${f}: visible sign-in text`);
    assert.ok(!/["'`]\/(sign-in|login|signin)["'`?#]/.test(code), `${f}: sign-in route`);
    assert.ok(!/FLAME_(OS|SALES)_URL|flame(Os|Sales)Url/.test(code), `${f}: platform app URL`);
  }
});

test("no backend: no API routes, server actions or fetch calls", () => {
  assert.ok(!fs.existsSync(path.join(ROOT, "app/api")), "app/api must not exist");
  for (const f of SOURCES) {
    const src = fs.readFileSync(path.join(ROOT, f), "utf8");
    assert.ok(!/\bfetch\(/.test(src), `${f}: fetch() call`);
    assert.ok(!/^\s*["']use server["']/m.test(src), `${f}: server action`);
  }
});

test("enquiry links: null until contact details are confirmed, correctly encoded when set", () => {
  const ctx = (email, wa) => {
    const site = load("lib/site.ts");
    site.SITE.contactEmail = email;
    site.SITE.contactWhatsApp = wa;
    return load("lib/links.ts");
  };
  let links = ctx(null, null);
  assert.equal(links.mailtoHref("Hi", "Body"), null);
  assert.equal(links.whatsappHref("Hi"), null);
  links = ctx("hello@example.org", "+256 700 000000");
  const mail = links.mailtoHref("Book a consultation — AI in Business", "Line 1\nName: A & B");
  assert.ok(mail.startsWith("mailto:hello@example.org?subject="));
  assert.ok(!mail.includes("+"), "spaces must be %20, not +, for mail clients");
  assert.ok(decodeURIComponent(mail).includes("Name: A & B"));
  assert.equal(links.whatsappHref("Hi there"), "https://wa.me/256700000000?text=Hi%20there");
  assert.equal(links.contactHref("waitlist", "flame-lens"), "/contact?intent=waitlist&product=flame-lens");
});

test("every product CTA stays on-site", () => {
  const links = load("lib/links.ts");
  for (const p of PRODUCTS) {
    const cta = links.productCtaHref(p);
    assert.equal(cta.external, false);
    assert.ok(cta.href.startsWith("/contact?"), `${p.slug}: ${cta.href}`);
    assert.ok(!/sign in|log in|launch/i.test(p.cta.label), `${p.slug}: CTA label "${p.cta.label}"`);
  }
});

/* ---------------- Motion system (Nov 2026) ---------------- */
const MOTION_CSS = fs.readFileSync(path.join(ROOT, "styles/marketing/motion.module.css"), "utf8");

test("motion: hidden states only apply with scripting on and no reduced-motion preference", () => {
  // Every rule that hides content (.wi transform / .rise opacity) must sit
  // inside the scripting+no-preference guard, so no-JS and reduced-motion
  // visitors always see everything.
  const guard = "@media (scripting: enabled) and (prefers-reduced-motion: no-preference)";
  assert.ok(MOTION_CSS.includes(guard));
  const outside = MOTION_CSS.split(guard)[0];
  assert.ok(!/\.rise\s*\{[^}]*opacity:\s*0/.test(outside), ".rise hidden outside guard");
  assert.ok(!/\.wi\s*\{[^}]*translate/.test(outside), ".wi hidden outside guard");
  assert.ok(/@media \(prefers-reduced-motion: reduce\)/.test(MOTION_CSS), "reduced-motion overrides present");
});

test("motion: every page using reveal classes has a trigger (InView or CSS hero intro)", () => {
  const files = ["app/page.tsx", "app/about/page.tsx", "app/services/page.tsx", "components/marketing/ResourcesExplorer.tsx"];
  for (const f of files) {
    const src = fs.readFileSync(path.join(ROOT, f), "utf8");
    if (/\.rise\b|<SplitText/.test(src)) {
      assert.ok(/<InView|heroIntro/.test(src), `${f}: reveal classes without a trigger`);
    }
  }
});

test("motion: no animation libraries and no perpetual JS loops", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
  for (const lib of ["framer-motion", "motion", "gsap", "lenis", "locomotive-scroll", "aos"]) {
    assert.ok(!deps.includes(lib), `unexpected animation dependency ${lib}`);
  }
  const dir = path.join(ROOT, "components/marketing/motion");
  for (const f of fs.readdirSync(dir)) {
    const src = fs.readFileSync(path.join(dir, f), "utf8");
    assert.ok(!/setInterval\(/.test(src), `${f}: setInterval loop`);
    if (/requestAnimationFrame/.test(src)) {
      assert.ok(/cancelAnimationFrame/.test(src), `${f}: rAF without cleanup`);
      assert.ok(/prefers-reduced-motion: reduce/.test(src), `${f}: rAF without reduced-motion opt-out`);
    }
    if (/addEventListener\("(scroll|pointermove)"/.test(src)) {
      assert.ok(/passive: true/.test(src), `${f}: non-passive scroll/pointer listener`);
      assert.ok(/removeEventListener/.test(src), `${f}: listener without cleanup`);
    }
    assert.ok(!/preventDefault\(\)|scrollTo\(|wheel/.test(src), `${f}: possible scroll hijacking`);
  }
  const loops = MOTION_CSS.match(/animation:[^;]*infinite[^;]*;/g) ?? [];
  assert.deepEqual(loops, ["animation: marquee 48s linear infinite;"], "only the pausable marquee may loop");
  assert.ok(/\.marquee:hover \.track,\s*\.marquee:focus-within \.track\s*\{\s*animation-play-state: paused/.test(MOTION_CSS), "marquee must pause on hover/focus");
});

test("signature is the confirmed 'Digitizing Africa.'", () => {
  assert.equal(home.HOME_HERO.signature, "Digitizing Africa.");
});
