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

test("team drafts have real identities and published profiles need consent and files", () => {
  const seen = new Set();
  for (const person of TEAM) {
    assert.ok(person.name.trim().length > 3, "Missing team member name");
    assert.ok(person.role.trim().length > 2, person.name + " has no confirmed role");
    assert.ok(person.bio.trim().length > 50, person.name + " needs a meaningful bio");
    assert.equal(typeof person.publicationApproved, "boolean");
    assert.match(person.photo, /^\/team\/[a-z0-9-]+\.webp$/);
    if (person.publicationApproved) {
      assert.ok(existsSync("public" + person.photo), "Approved portrait missing: " + person.photo);
    } else {
      assert.equal(TEAM_IS_PREVIEW, true, "Unapproved people must never appear in an indexable page");
    }
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
  if (TEAM.length < 2 || TEAM.some((person) => !person.publicationApproved)) {
    assert.equal(TEAM_IS_PREVIEW, true, "Unapproved team profiles must remain noindex");
  } else {
    assert.equal(TEAM_IS_PREVIEW, false, "Approved team may be indexed");
  }
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
  // Product Owner (19 Nov 2026): no arrow or Play buttons. It moves on its own
  // every 3 s until someone interacts; dots stay for direct choice.
  assert.match(component, /AUTOPLAY_MS = 3000/);
  assert.doesNotMatch(component, /Previous person|Next person|aria-pressed/);
  assert.match(component, /aria-label="Team members"/);
});

test("three-person and five-person coverflow still uses shortest wrap offset", () => {
  assert.equal(teamCoverflowOffset(2, 0, 3), -1);
  assert.equal(teamCoverflowOffset(0, 2, 3), 1);
  assert.equal(teamCoverflowOffset(4, 0, 5), -1);
  assert.equal(teamCoverflowOffset(0, 4, 5), 1);
  assert.equal(teamCoverflowOffset(2, 2, 5), 0);
});

test("Moses Owena is staged as Art Director with verified responsibilities", () => {
  const moses = TEAM.find((m) => m.slug === "moses-owena");
  assert.ok(moses, "Moses profile should exist");
  assert.equal(moses.name, "Moses Owena");
  assert.equal(moses.role, "Art Director");
  assert.equal(moses.publicationApproved, true);
  assert.equal(moses.photo, "/team/moses-owena.webp");
  assert.equal(moses.focusAreas.length, 4);
  assert.match(moses.qualification, /Makerere University/);
  const component = read("components/TeamCoverflow.tsx");
  // Nov 2026 polish: focus areas and credentials sit in an always-visible
  // profile panel beside the bio instead of a collapsed disclosure.
  assert.match(component, /className=\{styles.profileSide\}/);
  assert.match(component, /current\.focusAreas\.map/);
});


test("Aaron Mwesigwa Mwebaze has his user-assigned marketing leadership and verified policy background", () => {
  const aaron = TEAM.find((person) => person.slug === "aaron-mwesigwa-mwebaze");
  assert.ok(aaron, "Aaron must be present in the two-person preview");
  assert.equal(aaron.role, "Managing Partner & Chief Marketing Officer");
  assert.equal(aaron.publicationApproved, true);
  assert.equal(aaron.photo, "/team/aaron-mwesigwa.webp");
  assert.match(aaron.bio, /Uganda’s foreign service/);
  assert.match(aaron.qualification, /Mae Fah Luang University/);
  assert.equal(aaron.focusAreas.length, 4);
  assert.match(aaron.linkedin, /^https:\/\/www\.linkedin\.com\/in\//);
});

test("both supplied cut-outs are committed, real WebP images", () => {
  for (const member of TEAM) {
    const file = "public" + member.photo;
    assert.ok(existsSync(file), "Portrait missing: " + file);
    const header = readFileSync(file).subarray(0, 12);
    assert.equal(header.toString("ascii", 0, 4), "RIFF", member.name);
    assert.equal(header.toString("ascii", 8, 12), "WEBP", member.name);
  }
});


test("Trevor Achura leads the team with an approved portrait and authentic AI CERTS credential", () => {
  const trevor = TEAM.find((member) => member.slug === "trevor-achura");
  assert.ok(trevor, "Founder profile must be present");
  assert.equal(TEAM[0].slug, "trevor-achura", "Founder's portrait should be the first coverflow slide");
  assert.equal(trevor.name, "Trevor Achura");
  assert.equal(trevor.role, "Founder & Managing Director");
  assert.equal(trevor.photo, "/team/trevor-achura.webp");
  assert.equal(trevor.publicationApproved, true, "The owner approved his portrait and revised copy");
  assert.equal(trevor.focusAreas.length, 4);
  assert.ok(trevor.credentials?.length >= 1);
  assert.deepEqual(
    Array.from(trevor.credentials[0] && [trevor.credentials[0].name, trevor.credentials[0].issuer, trevor.credentials[0].year]),
    ["AI+ Sales", "AI CERTS", "2026"]
  );
  assert.equal(trevor.credentials[0].category, "Certification");
  assert.ok(trevor.credentials.every((credential) => credential.category === "Certification"), "Owner: all three are certifications");
  assert.ok(trevor.skills?.length >= 3, "Skill sets from the résumé are shown");
  assert.doesNotMatch(JSON.stringify(trevor.credentials), /Diploma/i, "Owner: describe it as a training certificate, not a diploma");
  assert.doesNotMatch(trevor.bio, /\blaw\b|LLB|Bachelor of Laws/i);
  const component = read("components/TeamCoverflow.tsx");
  assert.match(component, /Skills &amp; certifications/);
  assert.match(component, /\(current\.credentials \?\? \[\]\)\.map/);
  assert.ok(existsSync("public/team/trevor-achura.webp"));
});


test("team social URLs match owner-supplied destinations", () => {
  const trevor = TEAM.find((m) => m.slug === "trevor-achura");
  const moses = TEAM.find((m) => m.slug === "moses-owena");
  const aaron = TEAM.find((m) => m.slug === "aaron-mwesigwa-mwebaze");
  assert.equal(trevor.linkedin, "https://www.linkedin.com/in/trevor-jeremiah-achura-457b6743b");
  assert.equal(moses.linkedin, "https://www.linkedin.com/in/moses-owena-791bbb202");
  assert.equal(moses.instagram, "https://www.instagram.com/moses_owena/");
  assert.equal(aaron.linkedin, "https://www.linkedin.com/in/mwebaze-aaron-6089a1224");
  for (const member of TEAM) {
    for (const address of [member.linkedin, member.instagram].filter(Boolean)) {
      const url = new URL(address);
      assert.equal(url.protocol, "https:");
      assert.ok(["www.linkedin.com", "www.instagram.com"].includes(url.hostname));
      assert.ok(!address.includes(String.fromCharCode(92)), "URL must not contain escape slashes");
    }
  }
});

test("social profile icons link to actual accounts with accessible labels", () => {
  const component = read("components/TeamCoverflow.tsx");
  const css = read("styles/team-coverflow.module.css");
  assert.ok(component.includes("href={current.linkedin}"));
  assert.ok(component.includes("href={current.instagram}"));
  assert.ok(component.includes('name="linkedin"'));
  assert.ok(component.includes('name="instagram"'));
  assert.ok(component.includes('rel="noopener noreferrer"'));
  assert.ok(component.includes("on LinkedIn (opens in a new tab)"));
  assert.ok(component.includes("on Instagram (opens in a new tab)"));
  assert.ok(css.includes(".socialLinks a:focus-visible"));
  assert.ok(css.includes("width: 48px;") && css.includes("height: 48px;"));
});
