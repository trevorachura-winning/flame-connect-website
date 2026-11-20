import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const comp = readFileSync("components/WhatsAppEnquiry.tsx", "utf8");

test("main site: WhatsApp links ask for the enquiry first and keep a plain-link fallback", () => {
  assert.match(comp, /<dialog/);
  assert.match(comp, /Your enquiry/);
  assert.match(comp, /Send on WhatsApp/);
  assert.match(comp, /href=\{href\}/);
  assert.match(comp, /href=\{sendHref\} target="_blank"/);
  assert.doesNotMatch(comp, /window\.open\(/);
  assert.match(readFileSync("components/Footer.tsx", "utf8"), /<WhatsAppEnquiry>/);
  assert.match(readFileSync("components/ContactPageClient.tsx", "utf8"), /<WhatsAppEnquiry>/);
});

test("approved social accounts appear on the site and in Organization sameAs", () => {
  const site = readFileSync("lib/site.ts", "utf8");
  assert.match(site, /instagram: "https:\/\/www\.instagram\.com\/flame__connect\/"/);
  assert.match(site, /linkedin: "https:\/\/www\.linkedin\.com\/company\/flameconnect-africa\/"/);
  assert.match(readFileSync("components/Footer.tsx", "utf8"), /SITE\.social\.instagram/);
  assert.match(readFileSync("lib/seo.ts", "utf8"), /sameAs: socials/);
});
