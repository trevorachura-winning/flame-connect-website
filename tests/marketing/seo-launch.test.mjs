import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const read = (path) => readFileSync(path, "utf8");
const code = ts.transpileModule(read("lib/seo.ts"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

const SITE = {
  name: "Flame Connect",
  legalName: "Flame Connect",
  siteUrl: "https://www.flameconnect.tech",
  shortDescription: "Practical AI for African progress.",
  contactEmail: "flameconnect1@gmail.com",
  social: { linkedin: null, youtube: null },
};
function seo() {
  const exports = {};
  const context = vm.createContext({ exports, module: { exports } });
  vm.runInContext("(function(require, module, exports) {" + code + "})", context)(
    (name) => {
      assert.equal(name, "./site");
      return { SITE };
    },
    context.module,
    exports,
  );
  return exports;
}

test("each page gets a canonical www URL and social image", () => {
  const actual = seo().pageMetadata({
    title: "AI in Business",
    description: "Practical AI adoption support in Uganda.",
    path: "/services/ai-in-business",
  });
  assert.equal(actual.alternates.canonical, "https://www.flameconnect.tech/services/ai-in-business");
  assert.equal(actual.openGraph.url, actual.alternates.canonical);
  assert.equal(actual.openGraph.type, "website");
  assert.equal(actual.openGraph.images[0].url, "/opengraph-image.png");
  assert.equal(actual.twitter.images[0], "/opengraph-image.png");
  assert.equal(actual.title, "AI in Business");
});

test("already branded titles do not repeat Flame Connect", () => {
  const a = seo().pageMetadata({ title: "About Flame Connect", description: "About", path: "/about" });
  const b = seo().pageMetadata({ title: "Flame Connect | Practical AI for African progress", description: "Home", path: "/" });
  assert.equal(a.title.absolute, "About Flame Connect");
  assert.equal(b.title.absolute, "Flame Connect | Practical AI for African progress");
});

test("article OG includes its actual publication date and not invented modified date", () => {
  const result = seo().pageMetadata({
    title: "AI readiness is a people problem first",
    description: "A practical guide.",
    path: "/insights/ai-readiness-is-a-people-problem-first",
    type: "article",
    publishedTime: "2026-09-01",
  });
  assert.equal(result.openGraph.type, "article");
  assert.equal(result.openGraph.publishedTime, "2026-09-01");
  assert.doesNotMatch(read("app/sitemap.ts"), /lastModified:\s*(now|new Date\()/);
  assert.match(read("app/insights/[slug]/page.tsx"), /publishedTime:\s*article\.date/);
});

test("organization and website graph reuse official logo and same organization ID", () => {
  const mod = seo();
  const org = mod.organizationJsonLd();
  const web = mod.websiteJsonLd();
  assert.equal(org["@id"], "https://www.flameconnect.tech/#organization");
  assert.equal(org.logo.url, "https://www.flameconnect.tech/brand/flame-connect-mark.png");
  assert.equal(org.logo.width, 512);
  assert.equal(org.address.addressLocality, "Kampala");
  assert.equal(org.email, "flameconnect1@gmail.com");
  assert.equal(web.publisher["@id"], org["@id"]);
});

test("coming soon alone is temporarily noindex and launch gate remains unchanged", () => {
  const gate = read("middleware.ts");
  const announcement = read("public/coming-soon/index.html");
  const root = read("app/layout.tsx");
  assert.match(gate, /Date\.UTC\(2026, 10, 20, 9, 0, 0\)/);
  assert.match(announcement, /Date\.UTC\(2026, 10, 20, 9, 0, 0\)/);
  assert.match(gate, /X-Robots-Tag", "noindex, noarchive"/);
  assert.match(gate, /if \(Date\.now\(\) >= LAUNCH_AT\) return NextResponse\.next\(\)/);
  assert.match(announcement, /name="robots" content="noindex,follow"/);
  assert.match(root, /robots: \{ index: true, follow: true \}/);
});

test("sitemap lists canonical content URLs without fictitious build-time dates", () => {
  const sitemap = read("app/sitemap.ts");
  assert.ok(sitemap.includes("ALL_ROUTES") && sitemap.includes(".map("), "sitemap must map canonical routes, optionally filtering unpublished pages");
  assert.match(sitemap, /SITE\.siteUrl/);
  assert.doesNotMatch(sitemap, /new Date\(\)/);
  assert.doesNotMatch(sitemap, /lastModified:\s*now/);
  assert.match(read("app/robots.ts"), /SITE\.siteUrl.*sitemap\.xml/);
});
