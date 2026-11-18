import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const page = readFileSync("public/coming-soon/index.html", "utf8");
const gate = readFileSync("middleware.ts", "utf8");

test("pre-launch contact channels use Product Owner-approved destinations", () => {
  assert.match(page, /href="mailto:flameconnect1@gmail\.com\?subject=/);
  assert.match(page, /href="https:\/\/wa\.me\/256764018701\?text=/);
  assert.match(page, />Chat on WhatsApp<\/a>/);
  assert.match(page, />Email us<\/a>/);
  assert.match(page, /rel="noopener noreferrer"/);
});

test("coming soon gate and countdown retain Friday 20 Nov at 12 EAT", () => {
  assert.match(page, /Date\.UTC\(2026, 10, 20, 9, 0, 0\)/);
  assert.match(gate, /Date\.UTC\(2026, 10, 20, 9, 0, 0\)/);
  assert.match(page, /Friday 20 November 2026/);
  assert.match(page, /12:00 EAT/);
});

test("coming-soon contact buttons are accessible and do not claim website delivery", () => {
  assert.match(page, /aria-label="Contact Flame Connect before launch"/);
  assert.match(page, /\.prelaunch-actions a:focus-visible/);
  assert.match(page, /min-height: 48px/);
  assert.doesNotMatch(page, /<form\b/i);
});
