#!/usr/bin/env node
/**
 * Build a fully static demo snapshot of the site into out/ + zip it.
 *
 * Since the website-only release (Nov 2026) the site has no API routes, so a
 * static export needs no special handling. If an app/api folder ever
 * reappears, it is moved aside for the export and ALWAYS restored
 * (restoration guarded, never skipped by exit paths). Safe to re-run;
 * refuses to start if a previous run left a stash behind.
 */
import { spawnSync, execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const apiDir = path.join(ROOT, "app", "api");
const stash = path.join(ROOT, ".api-stash");

if (fs.existsSync(stash)) {
  console.error(".api-stash exists from a previous interrupted run — restore it first (mv .api-stash app/api).");
  process.exit(1);
}

let status = 1;
let moved = false;
try {
  if (fs.existsSync(apiDir)) {
    fs.renameSync(apiDir, stash);
    moved = true;
  }
  const res = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    cwd: ROOT,
    env: {
      ...process.env,
      NEXT_OUTPUT: "export",
      NEXT_PUBLIC_STATIC_DEMO: "1",
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://flameconnect.example",
    },
  });
  status = res.status ?? 1;
} finally {
  if (moved) fs.renameSync(stash, apiDir);
}

if (status !== 0) {
  console.error("Static export build failed.");
  process.exit(status);
}

// Zip for easy sharing.
const outDir = path.join(ROOT, "out");
const zipPath = path.join(ROOT, "flame-connect-website-static.zip");
fs.rmSync(zipPath, { force: true });
try {
  execFileSync("zip", ["-qr", zipPath, "."], { cwd: outDir, stdio: "inherit" });
  console.log(`\nStatic snapshot: ${outDir}`);
  console.log(`Zip archive:     ${zipPath}`);
} catch {
  console.log(`\nStatic snapshot ready in ${outDir} (zip not available — zip that folder to share).`);
}
