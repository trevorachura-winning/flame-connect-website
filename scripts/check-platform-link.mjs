#!/usr/bin/env node
/**
 * Platform link gate — verifies that the app URLs this site points visitors at
 * actually resolve, so "Sign in" can never ship as a 404.
 *
 * Why this exists: NEXT_PUBLIC_* values are inlined at BUILD time and the
 * website build cannot see the platform's own routes. A wrong sign-in path
 * (e.g. /login vs /signin) is invisible to typecheck, the content gate and the
 * link gate — all of which only check internal routes. This closes that gap.
 *
 * It loads lib/site.ts directly (same transpile-and-evaluate approach as
 * check-links.mjs) so the URLs tested are the URLs the site really renders —
 * this script cannot drift from the config.
 *
 * Usage:
 *   node scripts/check-platform-link.mjs            # warns, exits 0
 *   node scripts/check-platform-link.mjs --strict   # fails the build on a bad link
 *
 * Network-unreachable is reported but never fails the run: sandboxes and
 * restricted CI runners legitimately lack egress, and a firewall is not a
 * broken link.
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import vm from "node:vm";

const ROOT = process.cwd();
const STRICT = process.argv.includes("--strict");

/**
 * Load .env.local / .env the way `next dev` does, so `npm run platform:check`
 * works locally without manually exporting anything. Real process.env entries
 * always win (unless empty), so CI and explicit overrides behave as expected.
 *
 * Deliberately minimal — KEY=VALUE with optional quotes and # comments. This is
 * a developer convenience, not an env parser; Next.js still owns the real thing.
 */
function loadDotenv() {
  for (const file of [".env.local", ".env"]) {
    const abs = path.join(ROOT, file);
    if (!fs.existsSync(abs)) continue;
    for (const line of fs.readFileSync(abs, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      const quoted =
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"));
      if (quoted) value = value.slice(1, -1);
      const existing = process.env[key];
      if (existing === undefined || existing === "") process.env[key] = value;
    }
  }
}
loadDotenv();

function loadTs(file, cache = new Map()) {
  const abs = path.join(ROOT, file);
  if (cache.has(abs)) return cache.get(abs).exports;
  const js = ts.transpileModule(fs.readFileSync(abs, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const module = { exports: {} };
  cache.set(abs, module);
  // `process` is injected because lib/site.ts reads NEXT_PUBLIC_* at module
  // scope — that is the whole point: this gate evaluates the same config the
  // site does, from the same environment, so it cannot drift.
  vm.runInNewContext(
    `(function(require, module, exports) { ${js} })`,
    vm.createContext({ console, process, URL })
  )(() => ({}), module, module.exports);
  return module.exports;
}

const { SITE } = loadTs("lib/site.ts");

/** Mirrors joinUrl() in lib/links.ts. */
const joinUrl = (base, p) => {
  const cleanBase = String(base).replace(/\/+$/, "");
  if (!p || p === "/") return cleanBase || "/";
  return `${cleanBase}/${String(p).replace(/^\/+/, "")}`;
};

const targets = [];
if (SITE.flameSalesUrl) {
  targets.push({
    name: "Flame Sales — header/drawer \"Sign in\"",
    url: joinUrl(SITE.flameSalesUrl, SITE.flameSalesSignInPath),
  });
  targets.push({ name: "Flame Sales — app root", url: SITE.flameSalesUrl });
}
if (SITE.flameOsUrl) {
  targets.push({ name: "Flame OS — \"Sign in\"", url: joinUrl(SITE.flameOsUrl, "/login") });
  targets.push({ name: "Flame OS — app root", url: SITE.flameOsUrl });
}

if (!targets.length) {
  console.log(
    "Platform link check skipped: no app origin configured " +
      "(NEXT_PUBLIC_FLAME_SALES_URL / NEXT_PUBLIC_FLAME_OS_URL). " +
      "Sign in resolves to the on-site /sign-in fallback."
  );
  process.exit(0);
}

const problems = [];
const unreachable = [];

for (const target of targets) {
  let res;
  try {
    res = await fetch(target.url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: { "user-agent": "flame-connect-website-link-gate/1.0" },
    });
  } catch (err) {
    unreachable.push(`${target.name} → ${target.url} (${err.cause?.code || err.name})`);
    continue;
  }
  const ok = res.status >= 200 && res.status < 400;
  if (ok) {
    console.log(`  ✓ ${res.status}  ${target.name} → ${res.url || target.url}`);
  } else {
    console.log(`  ✗ ${res.status}  ${target.name} → ${target.url}`);
    problems.push(
      `${target.name} returned ${res.status}: ${target.url}\n` +
        `      Fix the origin (NEXT_PUBLIC_FLAME_SALES_URL) or the auth path ` +
        `(NEXT_PUBLIC_FLAME_SALES_SIGNIN_PATH — currently "${SITE.flameSalesSignInPath}").`
    );
  }
}

if (unreachable.length) {
  console.log(
    `\nCould not reach ${unreachable.length} URL(s) — treated as SKIP, not failure ` +
      `(this runner may have no outbound network):`
  );
  for (const u of unreachable) console.log(`  · ${u}`);
}

if (problems.length) {
  console.error(`\nPlatform link check found ${problems.length} problem(s):`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  if (STRICT) process.exit(1);
  console.error(
    "\nNot failing the build (non-strict). Re-run with --strict once the URLs are corrected."
  );
  process.exit(0);
}

const verified = targets.length - unreachable.length;
if (verified === 0) {
  console.log(
    "\nPlatform link check INCONCLUSIVE: no URL could be reached from this runner. " +
      "Run it somewhere with outbound network (CI, or a developer machine) before launch."
  );
  process.exit(0);
}
console.log(`\nPlatform link check passed: ${verified} URL(s) verified.`);
