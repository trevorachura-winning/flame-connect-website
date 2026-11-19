import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const cs = readFileSync("public/coming-soon/index.html", "utf8");
const comp = readFileSync("components/WhatsAppEnquiry.tsx", "utf8");

test("coming soon: Chat on WhatsApp opens an enquiry pop-up before WhatsApp", () => {
  assert.match(cs, /data-wa-open href="https:\/\/wa\.me\/256764018701/); // works without JS
  assert.match(cs, /<dialog class="wa-dialog"/);
  assert.match(cs, /Your enquiry/);
  assert.match(cs, /showModal/);
  assert.match(cs, /send\.href = "https:\/\/wa\.me\/256764018701\?text=" \+ encodeURIComponent\(body\(\)\)/);
  assert.match(cs, /id="wa-send" href="https:\/\/wa\.me\/256764018701" target="_blank"/);
});

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

test("approved social accounts appear on the site, coming soon page and in Organization sameAs", () => {
  const site = readFileSync("lib/site.ts", "utf8");
  assert.match(site, /instagram: "https:\/\/www\.instagram\.com\/flame__connect\/"/);
  assert.match(site, /linkedin: "https:\/\/www\.linkedin\.com\/company\/flameconnect-africa\/"/);
  assert.match(cs, /href="https:\/\/www\.instagram\.com\/flame__connect\/"/);
  assert.match(cs, /href="https:\/\/www\.linkedin\.com\/company\/flameconnect-africa\/"/);
  assert.match(readFileSync("components/Footer.tsx", "utf8"), /SITE\.social\.instagram/);
  assert.match(readFileSync("lib/seo.ts", "utf8"), /sameAs: socials/);
});
