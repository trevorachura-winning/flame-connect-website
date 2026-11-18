import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import ts from "typescript";

// Compile the project's dependency-free TS delivery helper in memory so the
// same production implementation is tested without a separate test framework.
const src = readFileSync(fileURLToPath(new URL("../lib/lead-delivery.ts", import.meta.url)), "utf8");
const js = ts.transpileModule(src, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { deliverLead } = await import("data:text/javascript;base64," + Buffer.from(js).toString("base64"));

test("missing webhook does not acknowledge receipt or call fetch", async () => {
  const r = await deliverLead(undefined, { email: "test@example.com" }, async () => {
    throw new Error("must not send");
  });
  assert.deepEqual(r, { ok: false, reason: "not-configured" });
});

test("a 2xx webhook response acknowledges receipt", async () => {
  let calls = 0;
  const r = await deliverLead("https://webhook.example/lead", { source: "website" }, async (url, init) => {
    calls++;
    assert.equal(url, "https://webhook.example/lead");
    assert.equal(init.method, "POST");
    assert.equal(init.headers["Content-Type"], "application/json");
    assert.deepEqual(JSON.parse(init.body), { source: "website" });
    assert.ok(init.signal);
    return new Response(null, { status: 204 });
  });
  assert.equal(calls, 1);
  assert.deepEqual(r, { ok: true });
});

test("non-2xx webhook response does not acknowledge receipt", async () => {
  const r = await deliverLead("https://webhook.example/lead", { source: "website" }, async () =>
    new Response(null, { status: 500 })
  );
  assert.deepEqual(r, { ok: false, reason: "rejected" });
});

test("network failures do not acknowledge receipt", async () => {
  const r = await deliverLead("https://webhook.example/lead", { source: "website" }, async () => {
    throw new Error("network down");
  });
  assert.deepEqual(r, { ok: false, reason: "network-error" });
});
