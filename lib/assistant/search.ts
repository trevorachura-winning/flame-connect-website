/**
 * Tiny on-device search for the help robot. No network, no AI model: it
 * scores website passages against the visitor's question and returns the
 * best matches with a short snippet. Pure functions, no imports, so it is
 * easy to test and cheap to ship.
 */

export interface AssistantDoc {
  id: string;
  title: string;
  url: string;
  kind: "Page" | "Service" | "Product" | "Insight" | "FAQ" | "Team" | "Company" | "Contact";
  text: string;
  /** Extra words people might use for this passage. */
  keywords?: string[];
}

export interface AssistantHit {
  doc: AssistantDoc;
  score: number;
  snippet: string;
}

const STOP = new Set(
  "a an and are as at be by can do does for from how i in is it me my of on or our the this to what when where which who why will with you your we us about tell please want need get".split(" "),
);

/** Words visitors use, mapped to words the site uses. */
const SYNONYMS: Record<string, string[]> = {
  price: ["quote", "cost", "pricing"],
  prices: ["quote", "cost"],
  cost: ["quote", "price"],
  costs: ["quote", "price"],
  pricing: ["quote"],
  charge: ["quote"],
  fee: ["quote"],
  fees: ["quote"],
  pay: ["payments", "quote"],
  phone: ["whatsapp", "contact"],
  call: ["whatsapp", "contact"],
  email: ["contact"],
  reach: ["contact"],
  location: ["kampala", "uganda"],
  located: ["kampala", "uganda"],
  office: ["kampala"],
  where: ["kampala"],
  erp: ["business", "systems", "erp"],
  system: ["systems"],
  software: ["systems", "tools", "platform"],
  app: ["platform", "tools"],
  website: ["web", "digital", "presence"],
  site: ["web", "digital"],
  video: ["video", "film", "production"],
  film: ["video"],
  photo: ["photography"],
  photos: ["photography"],
  logo: ["brand", "design"],
  branding: ["brand"],
  design: ["graphic", "design", "brand"],
  quiz: ["assessment", "readiness"],
  test: ["assessment"],
  score: ["assessment", "readiness"],
  readiness: ["assessment"],
  crm: ["flame", "os"],
  sales: ["flame", "os", "pipeline"],
  school: ["academy", "learning"],
  schools: ["academy"],
  learn: ["academy", "training", "learning"],
  training: ["academy", "learning", "workshops"],
  course: ["academy", "learning"],
  courses: ["academy"],
  team: ["team", "people"],
  founder: ["trevor", "founder"],
  ceo: ["founder", "managing", "director"],
  cto: ["chief", "technology", "derrick"],
  coo: ["chief", "operating", "raphile"],
  started: ["2019", "story"],
  history: ["story", "2019"],
  mission: ["mission"],
  vision: ["vision"],
  values: ["values", "people", "collaboration", "innovation"],
  automate: ["automation", "workflow"],
  automation: ["workflow", "automation"],
  chatbot: ["assistants"],
  privacy: ["privacy", "data"],
  safe: ["responsible", "governance"],
  responsible: ["responsible", "governance", "oversight"],
};

export function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function stem(t: string): string {
  return t.length > 4 ? t.replace(/(ing|ers|ies|ed|es|s)$/, "") : t;
}

function expand(q: string[]): { term: string; weight: number }[] {
  const out = new Map<string, number>();
  for (const t of q) {
    out.set(stem(t), Math.max(out.get(stem(t)) ?? 0, 1));
    for (const s of SYNONYMS[t] ?? []) out.set(stem(s), Math.max(out.get(stem(s)) ?? 0, 0.7));
  }
  return [...out].map(([term, weight]) => ({ term, weight }));
}

/** Best one or two sentences of a passage for the query. */
export function snippet(text: string, terms: string[], max = 220): string {
  if (text.length <= max + 40) return text.trim();
  // Split at sentence ends only (keeps "Next.js" and "e.g." intact).
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z0-9“"])/);
  let best = sentences[0] ?? "";
  let bestScore = -1;
  for (let i = 0; i < sentences.length; i++) {
    const st = new Set(tokens(sentences[i]).map(stem));
    const sc = terms.reduce((n, t) => n + (st.has(t) ? 1 : 0), 0);
    if (sc > bestScore) {
      bestScore = sc;
      const next = sentences[i + 1];
      best = next && (sentences[i] + " " + next).length <= max ? `${sentences[i]} ${next}` : sentences[i];
    }
  }
  best = best.trim();
  return best.length > max ? best.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : best;
}

/** Rank passages for a question. Returns [] when nothing is a reasonable match. */
export function search(query: string, docs: AssistantDoc[], limit = 4): AssistantHit[] {
  const q = tokens(query);
  if (!q.length) return [];
  const terms = expand(q);
  const hits: AssistantHit[] = [];
  for (const doc of docs) {
    const title = new Set(tokens(doc.title).map(stem));
    const keys = new Set((doc.keywords ?? []).flatMap(tokens).map(stem));
    const body = tokens(doc.text).map(stem);
    const bodySet = new Set(body);
    let score = 0;
    let matched = 0;
    for (const { term, weight } of terms) {
      let s = 0;
      if (title.has(term)) s += 3;
      if (keys.has(term)) s += 2.5;
      if (bodySet.has(term)) s += 1 + Math.min(1, body.filter((b) => b === term).length / 4);
      if (s > 0) matched += weight >= 1 ? 1 : 0;
      score += s * weight;
    }
    if (score <= 0) continue;
    // Reward covering more of the question; prefer short, focused passages.
    score *= 0.6 + 0.4 * (matched / q.length);
    score /= 1 + Math.log10(1 + body.length / 120);
    hits.push({ doc, score, snippet: snippet(doc.text, terms.map((t) => t.term)) });
  }
  hits.sort((a, b) => b.score - a.score);
  const top = hits[0]?.score ?? 0;
  // Drop weak matches so the robot can say honestly that it does not know.
  return top < 1.2 ? [] : hits.filter((h) => h.score >= top * 0.35).slice(0, limit);
}
