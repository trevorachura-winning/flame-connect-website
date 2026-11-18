import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const compile = ts.transpileModule(readFileSync("lib/seo.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function createSEO() {
  const exports = {};
  const context = vm.createContext({ exports, module: { exports } });
  vm.runInContext(
    "(function(require, module, exports) {" + compile + "})",
    context
  )((specifier) => {
    assert.equal(specifier, "./site");
    return { SITE: { name: "Flame Connect", siteUrl: "https://www.flameconnect.tech", social: {} } };
  }, context.module, exports);
  return exports;
}

test("already branded homepage title does not duplicate | Flame Connect", () => {
  const seo = createSEO();
  const metadata = seo.pageMetadata({
    title: "Flame Connect | Practical AI for African progress",
    description: "Practical AI",
    path: "/",
  });
  assert.equal(metadata.title.absolute, "Flame Connect | Practical AI for African progress");
  assert.equal(metadata.alternates.canonical, "https://www.flameconnect.tech/");
  assert.equal(metadata.openGraph.url, "https://www.flameconnect.tech/");
});

test("ordinary page title still inherits the brand suffix from the root template", () => {
  const seo = createSEO();
  const metadata = seo.pageMetadata({ title: "Privacy notice", description: "Privacy", path: "/privacy" });
  assert.equal(metadata.title, "Privacy notice");
});

test("browser and app theme use approved Flame Deep Navy", () => {
  const layout = readFileSync("app/layout.tsx", "utf8");
  const manifest = readFileSync("app/manifest.ts", "utf8");
  assert.match(layout, /themeColor:\s*"#07111F"/);
  assert.match(manifest, /theme_color:\s*"#07111F"/);
  assert.match(manifest, /background_color:\s*"#07111F"/);
});
