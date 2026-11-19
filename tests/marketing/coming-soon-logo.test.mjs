import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const html = readFileSync("public/coming-soon/index.html", "utf8");
const component = readFileSync("components/BrandLogo.tsx", "utf8");
const header = readFileSync("components/Header.tsx", "utf8");
const footer = readFileSync("components/Footer.tsx", "utf8");

// Official logo supplied by the brand owner on 19 Nov 2026.
const FILES = [
  "public/brand/flame-connect-logo.png",
  "public/brand/flame-connect-logo-inverse.png",
  "public/brand/flame-connect-logo-tagline.png",
  "public/brand/flame-connect-logo-tagline-inverse.png",
  "public/brand/flame-connect-mark.png",
];

test("the official logo files exist and the old wordmark files are gone", () => {
  for (const f of FILES) assert.ok(existsSync(f), f);
  assert.ok(!existsSync("public/brand/flame-connect-wordmark.png"));
  assert.ok(!existsSync("public/brand/flame-connect-wordmark-inverse.png"));
});

test("Coming Soon shows the official logo with its tagline, on dark", () => {
  assert.match(html, /class="brand-logo" src="\/brand\/flame-connect-logo-tagline-inverse\.png" alt="Flame Connect\. Digitizing Africa" width="1341" height="528"/);
  assert.match(html, /\.brand-logo \{[^}]*width: auto;[^}]*object-fit: contain;/);
});

test("main site uses the same official logo: header without tagline, footer with it", () => {
  assert.match(component, /\/brand\/flame-connect-logo\$\{tagline \? "-tagline" : ""\}\$\{tone === "dark" \? "-inverse" : ""\}\.png/);
  assert.match(header, /<BrandLogo height=\{44\} priority \/>/);
  assert.match(footer, /<BrandLogo height=\{88\} tone="dark" tagline \/>/);
});

test("the logo change leaves launch timing unchanged", () => {
  assert.match(html, /Date\.UTC\(2026, 10, 20, 9, 0, 0\)/);
  assert.match(html, /Friday 20 November 2026/);
});
