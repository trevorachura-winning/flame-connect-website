import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import vm from "node:vm";

function getOrigin(configured) {
  const script = ts.transpileModule(fs.readFileSync("lib/site.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  const context = vm.createContext({
    process: { env: configured === undefined ? {} : { NEXT_PUBLIC_SITE_URL: configured } },
    exports: mod.exports,
    module: mod,
  });
  vm.runInContext(script, context);
  return mod.exports.SITE.siteUrl;
}

test("www domain is the fallback for unset or empty site origin", () => {
  assert.equal(getOrigin(undefined), "https://www.flameconnect.tech");
  assert.equal(getOrigin(""), "https://www.flameconnect.tech");
});

test("legacy apex origin is normalized to www", () => {
  assert.equal(getOrigin("https://flameconnect.tech"), "https://www.flameconnect.tech");
  assert.equal(getOrigin("https://flameconnect.tech/"), "https://www.flameconnect.tech");
});

test("www production origin stays unchanged", () => {
  assert.equal(getOrigin("https://www.flameconnect.tech"), "https://www.flameconnect.tech");
});
