// Build the real robot index from the content files and run sample questions.
// Usage: node tests/assistant/run-index.mjs "question" ...
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file).exports;
  const js = ts.transpileModule(readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.Preserve } }).outputText;
  const mod = { exports: {} };
  cache.set(file, mod);
  const req = (p) => {
    if (!p.startsWith(".")) return {};
    const base = path.resolve(path.dirname(file), p);
    for (const c of [base + ".ts", base + ".tsx", base + "/index.ts"]) { try { readFileSync(c); return load(c); } catch {} }
    return {};
  };
  vm.runInNewContext(js, { module: mod, exports: mod.exports, require: req, process: { env: {} } });
  return mod.exports;
}
export { load };
export function robot() {
  const { buildAssistantIndex } = load("lib/assistant/index.ts");
  const { search } = load("lib/assistant/search.ts");
  return { docs: buildAssistantIndex(), search };
}
if (process.argv[1].endsWith("run-index.mjs")) {
  const { docs, search } = robot();
  console.log(`${docs.length} passages`);
  for (const q of process.argv.slice(2)) {
    const hits = search(q, docs);
    console.log(`\nQ: ${q}`);
    hits.slice(0, 2).forEach((h) => console.log(`  ${h.score.toFixed(2)} [${h.doc.kind}] ${h.doc.title} -> ${h.doc.url}\n     ${h.snippet}`));
    if (!hits.length) console.log("  (no match)");
  }
}
