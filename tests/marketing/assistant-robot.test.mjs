import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { robot } from "../assistant/run-index.mjs";

const { docs, search } = robot();
const top = (q) => search(q, docs)[0];

test("index covers the site and every passage links to a real route", () => {
  assert.ok(docs.length > 60, `only ${docs.length} passages`);
  for (const d of docs) {
    assert.ok(d.url.startsWith("/"), `${d.id} has no internal url`);
    assert.ok(d.title && d.text, `${d.id} is empty`);
  }
  assert.equal(new Set(docs.map((d) => d.id)).size, docs.length, "duplicate ids");
});

test("answers common questions from site content", () => {
  assert.equal(top("How do I contact you?").doc.url, "/contact");
  assert.equal(top("free assessment").doc.url, "/assessment");
  assert.match(top("who is the CTO").doc.title, /Derrick/);
  assert.match(top("Do you build ERP systems?").doc.title, /ERP|Business systems/i);
  assert.match(top("How much does it cost?").snippet, /quote/i);
});

test("says it does not know rather than guessing", () => {
  assert.equal(search("pizza delivery near me", docs).length, 0);
  assert.equal(search("", docs).length, 0);
});

test("robot is mounted site wide, lazy loads its index and sends nothing", () => {
  const layout = readFileSync("app/layout.tsx", "utf8");
  assert.match(layout, /<AssistantRobot \/>/);
  const ui = readFileSync("components/assistant/AssistantRobot.tsx", "utf8");
  assert.match(ui, /import\("\.\.\/\.\.\/lib\/assistant\/index"\)/, "index must be dynamically imported");
  assert.doesNotMatch(ui, /^import .*lib\/assistant\/index/m, "index must not be statically imported");
  assert.doesNotMatch(ui, /fetch\(/, "robot must not send what visitors type");
  assert.ok(existsSync("styles/assistant.module.css"));
  const css = readFileSync("styles/assistant.module.css", "utf8");
  assert.match(css, /prefers-reduced-motion/);
});

test("visible robot copy follows house style", () => {
  const ui = readFileSync("components/assistant/AssistantRobot.tsx", "utf8");
  const strings = [...ui.matchAll(/>([^<>{}]{3,})</g)].map((m) => m[1]);
  for (const s of strings) assert.doesNotMatch(s, /[–—]| - /, `dash in "${s}"`);
});
