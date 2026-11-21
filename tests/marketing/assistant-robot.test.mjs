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
  // The only network call is the opt-in call back, gated by phone and consent.
  assert.match(ui, /submitCallback\(/);
  assert.match(ui, /!canSend \|\| !consent\) return;/);
  assert.match(ui, /const canSend = phoneOk \|\| emailOk;/);
  assert.match(ui, /type="email"/);
  assert.ok(existsSync("styles/assistant.module.css"));
  const css = readFileSync("styles/assistant.module.css", "utf8");
  assert.match(css, /prefers-reduced-motion/);
});

test("visible robot copy follows house style", () => {
  const ui = readFileSync("components/assistant/AssistantRobot.tsx", "utf8");
  const strings = [...ui.matchAll(/>([^<>{}]{3,})</g)].map((m) => m[1]);
  for (const s of strings) assert.doesNotMatch(s, /[–—]| - /, `dash in "${s}"`);
});

test("privacy notice covers the robot and the panel carries no privacy footnote", () => {
  const privacy = readFileSync("app/privacy/page.tsx", "utf8");
  assert.match(privacy, /Ask Flame help robot/);
  assert.match(privacy, /ask our team to contact you/);
  assert.match(privacy, /phone number or email address/);
  assert.match(privacy, /kept only in\s+your own browser/);
  const ui = readFileSync("components/assistant/AssistantRobot.tsx", "utf8");
  assert.doesNotMatch(ui, /Nothing you type/);
});

test("first visit shows a welcome with an optional name, never a required gate", () => {
  const ui = readFileSync("components/assistant/AssistantRobot.tsx", "utf8");
  assert.match(ui, /Welcome to Flame Connect/);
  assert.match(ui, /\(optional\)/);
  assert.match(ui, />Skip</);
  const welcome = ui.slice(ui.indexOf("Welcome to Flame Connect") - 600, ui.indexOf(">Skip<"));
  assert.doesNotMatch(welcome, /required/, "welcome must not require anything");
  assert.doesNotMatch(welcome, /type="tel"/, "no phone number on the welcome screen");
});

test("call back is offered only for no answer or buying intent", () => {
  const ui = readFileSync("components/assistant/AssistantRobot.tsx", "utf8");
  assert.match(ui, /!hits\.length \|\| INTENT\.test\(text\)/);
  const INTENT = new RegExp(ui.match(/const INTENT = \/(.+)\/i;/)[1], "i");
  for (const q of ["How much does it cost?", "Can I get a quote", "I want to book a consultation"]) assert.ok(INTENT.test(q), q);
  for (const q of ["Who is the CTO", "What is Flame OS", "Tell me your story"]) assert.ok(!INTENT.test(q), q);
});

test("knowledge base entries are safe to publish", async () => {
  const { load } = await import("../assistant/run-index.mjs");
  const { KNOWLEDGE_BASE } = load("content/knowledge-base.ts");
  const { PRODUCTS } = load("content/products.ts");
  const { SERVICES } = load("content/services.ts");
  const { ARTICLES } = load("content/articles.ts");
  const routes = new Set(["/", "/about", "/assessment", "/contact", "/insights", "/our-story", "/privacy", "/products", "/services", "/team", "/trust",
    ...PRODUCTS.map((p) => `/products/${p.slug}`), ...SERVICES.map((s) => `/services/${s.slug}`), ...ARTICLES.map((a) => `/insights/${a.slug}`)]);
  const ids = new Set();
  for (const k of KNOWLEDGE_BASE) {
    assert.ok(!ids.has(k.id), `duplicate id ${k.id}`); ids.add(k.id);
    assert.ok(k.question.trim() && k.answer.trim(), `${k.id} is empty`);
    assert.ok(routes.has(k.link.split("?")[0]), `${k.id} links to unknown page ${k.link}`);
    assert.match(k.updated, /^\d{4}-\d{2}-\d{2}$/, `${k.id} needs an updated date`);
    for (const t of [k.question, k.answer]) {
      assert.doesNotMatch(t, /[–—]| - /, `${k.id}: no dashes in visible copy`);
      assert.doesNotMatch(t, /\b(UGX|USh|USD|KES)\b|\$\s?\d/, `${k.id}: no published prices`);
      assert.doesNotMatch(t, /\b(organization|color|optimize|analyze)\b/i, `${k.id}: use British English`);
    }
    assert.ok(k.answer.length <= 320, `${k.id}: keep answers short`);
  }
  for (const p of PRODUCTS.filter((x) => x.status === "development")) {
    for (const k of KNOWLEDGE_BASE.filter((e) => e.link === `/products/${p.slug}`)) {
      assert.match(k.answer, /launching soon/i, `${k.id}: ${p.name} has not launched`);
    }
  }
});

test("knowledge base answers win for the questions they cover", () => {
  assert.equal(top("give me a brief").doc.id, "kb-about-brief");
  assert.equal(top("Where are you?").doc.id, "kb-location");
  assert.equal(top("how much does it cost").doc.id, "kb-pricing");
});

test("compliance basics: no pre-ticked consent, regulator named, privacy linked from contact form", () => {
  assert.match(readFileSync("components/AssessmentClient.tsx", "utf8"), /contactMe: false,/);
  const privacy = readFileSync("app/privacy/page.tsx", "utf8");
  assert.match(privacy, /pdpo\.go\.ug/);
  assert.match(privacy, /automated means alone/);
  assert.doesNotMatch(privacy, /the only form on our website/);
  assert.match(readFileSync("components/EnquiryComposer.tsx", "utf8"), /href="\/privacy"/);
});
