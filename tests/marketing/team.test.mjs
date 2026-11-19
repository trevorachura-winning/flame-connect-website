import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const read = (path) => readFileSync(path, "utf8");

function loadTs(path) {
  const js = ts.transpileModule(read(path), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const mod = { exports: {} };
  const ctx = vm.createContext({ module: mod, exports: mod.exports });
  vm.runInContext("(function(require, module, exports) {" + js + "})", ctx)(
    () => { throw new Error("Unexpected import in " + path); },
    mod,
    mod.exports,
  );
  return mod.exports;
}

const { TEAM, TEAM_IS_PREVIEW } = loadTs("content/team.ts");
const { teamCoverflowOffset, teamAutoplayEnabled } = loadTs("lib/team-coverflow.ts");

test("no fictional team profiles or unused placeholder portrait remain", () => {
  assert.equal(existsSync("public/team/placeholder.svg"), false);
  for (const person of TEAM) {
    assert.notEqual(person.name, "Team member");
    assert.ok(!person.slug.startsWith("member-"));
    assert.ok(!person.photo.includes("placeholder"));
    assert.ok(!Object.hasOwn(person, "placeholder"));
  }
});

test("each public profile has verifiable identity, portrait file and publication consent", () => {
  const seen = new Set();
  for (const person of TEAM) {
    assert.ok(person.name.trim().length > 3, "Missing team member name");
    assert.ok(person.role.trim().length > 2, person.name + " has no confirmed role");
    assert.ok(person.bio.trim().length > 50, person.name + " needs a meaningful bio");
    assert.equal(person.publicationApproved, true, person.name + " needs explicit consent");
    assert.match(person.photo, /^\/team\/[a-z0-9-]+\.webp$/);
    assert.ok(existsSync("public" + person.photo), "Missing portrait: " + person.photo);
    assert.ok(!seen.has(person.slug), "Duplicate slug: " + person.slug);
    seen.add(person.slug);
  }
});

test("page remains noindex and unlinked until two approved profiles exist", () => {
  assert.equal(TEAM_IS_PREVIEW, TEAM.length < 2 || TEAM.some((m) => !m.publicationApproved));
  const page = read("app/team/page.tsx");
  const sitemap = read("app/sitemap.ts");
  const navigation = read("content/navigation.ts");
  const about = read("app/about/page.tsx");
  assert.match(page, /TEAM_IS_PREVIEW\s*\?\s*\{\s*\.\.\.base,\s*robots:\s*\{\s*index:\s*false/);
  assert.match(sitemap, /route !== "\/team" \|\| !TEAM_IS_PREVIEW/);
  assert.match(navigation, /!\s*TEAM_IS_PREVIEW[\s\S]*?label: "Team"/);
  assert.match(about, /!TEAM_IS_PREVIEW &&/);
  if (TEAM.length < 2) assert.equal(TEAM_IS_PREVIEW, true);
  else assert.equal(TEAM_IS_PREVIEW, false);
});

test("team is a recognised route in content, link and marketing registries", () => {
  for (const path of ["lib/content.ts", "scripts/check-links.mjs", "tests/marketing/marketing.test.mjs"]) {
    assert.match(read(path), /"\/team"/, path + " does not include /team");
  }
});

test("two-person geometry never duplicates cards and keeps the neighbour on one side", () => {
  assert.equal(teamCoverflowOffset(0, 0, 2), 0);
  assert.equal(teamCoverflowOffset(1, 0, 2), 1);
  assert.equal(teamCoverflowOffset(0, 1, 2), 1);
  assert.equal(teamCoverflowOffset(1, 1, 2), 0);
  assert.equal(teamAutoplayEnabled(2, false), false);
  assert.equal(teamAutoplayEnabled(3, true), false);
  assert.equal(teamAutoplayEnabled(3, false), true);
  const component = read("components/TeamCoverflow.tsx");
  assert.match(component, /n >= 3 && <ol/);
  assert.match(component, /!reduced && n >= 3/);
});

test("three-person and five-person coverflow still uses shortest wrap offset", () => {
  assert.equal(teamCoverflowOffset(2, 0, 3), -1);
  assert.equal(teamCoverflowOffset(0, 2, 3), 1);
  assert.equal(teamCoverflowOffset(4, 0, 5), -1);
  assert.equal(teamCoverflowOffset(0, 4, 5), 1);
  assert.equal(teamCoverflowOffset(2, 2, 5), 0);
});
