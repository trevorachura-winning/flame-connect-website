import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync("public/coming-soon/index.html", "utf8");
const component = readFileSync("components/BrandLogo.tsx", "utf8");

test("Coming Soon uses the actual full official logo lockup from the main site", () => {
  assert.match(component, /\/brand\/flame-connect-mark\.png/);
  assert.match(component, /\/brand\/flame-connect-wordmark-inverse\.png/);
  assert.match(html, /class="brand-mark" src="\/brand\/flame-connect-mark\.png"/);
  assert.match(html, /class="brand-wordmark" src="\/brand\/flame-connect-wordmark-inverse\.png"/);
  assert.match(html, /class="brand-lockup" role="img" aria-label="Flame Connect"/);
});

test("logo retains natural asset proportions and responsive sizing", () => {
  assert.match(html, /\.brand-lockup img \{ display: block; width: auto; object-fit: contain; \}/);
  assert.match(html, /max-width: 100%/);
  assert.match(html, /class="brand-mark"[^>]+width="512" height="512"/);
  assert.match(html, /class="brand-wordmark"[^>]+width="1024" height="354"/);
});

test("the logo fix leaves launch timing unchanged", () => {
  assert.match(html, /Date\.UTC\(2026, 10, 20, 9, 0, 0\)/);
  assert.match(html, /Friday 20 November 2026/);
});
