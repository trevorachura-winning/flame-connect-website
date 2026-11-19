import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const nav = readFileSync("components/MegaNavigation.tsx", "utf8");
const css = readFileSync("components/MegaNavigation.module.css", "utf8");
const header = readFileSync("components/Header.tsx", "utf8");

test("mega menu derives product names and status labels from product registry", () => {
  assert.match(nav, /import \{ PRODUCTS, STATUS_LABEL \} from "\.\.\/content\/products"/);
  assert.match(nav, /PRODUCTS\.map\(\(product\)/);
  assert.match(nav, /STATUS_LABEL\[product\.status\]/);
});

test("disclosures use native buttons and explicit accessible state", () => {
  assert.match(nav, /aria-expanded=\{visible\}/);
  assert.match(nav, /aria-controls=\{menuId\}/);
  assert.match(nav, /onClick=\{\(\) => setOpen\(/);
  assert.match(nav, /event\.key === "Escape"/);
  assert.match(nav, /onMouseEnter/);
  assert.match(nav, /aria-expanded=\{expanded === item\.label\}/);
});

test("mobile drawer manages focus and both menu controls have large targets", () => {
  assert.match(header, /trapTab/);
  assert.match(header, /drawerRef/);
  assert.match(css, /width:\s*44px;/);
  assert.match(css, /height:\s*44px;/);
  assert.match(css, /min-height:\s*44px;/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("website-only sign-in and backend are not reintroduced", () => {
  assert.doesNotMatch(nav, /["']\/(sign-in|login|signin)(?:["'?]|$)/);
  assert.doesNotMatch(header, />\s*Sign in\s*</i);
  // Nov 2026 Product Owner decision: the free AI assessment is the primary
  // header action; "Talk to us" covers non-AI enquiries. Booking a
  // consultation follows the assessment results and lives in the Services menu.
  assert.match(header, /href="\/assessment"/);
  assert.match(header, /Talk to us/);
  assert.match(nav, /href="\/contact\?intent=consultation"/);
  assert.match(nav, /onPointerDown/);
  assert.match(nav, /aria-current/);
});
