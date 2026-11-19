/**
 * Free AI readiness assessment (Product Owner request, 19 Nov 2026).
 *
 * Twelve questions across the six areas that AI readiness frameworks
 * commonly measure: strategy, data, technology, people, processes and
 * governance. Each answer scores 1 to 4. Scoring runs in the browser, so the
 * visitor sees a result instantly; the answers are also emailed to Flame
 * Connect (lib/assessment-submit.ts).
 *
 * This is a self-assessment to start a conversation, not an audit. The copy
 * on the page says so.
 */

export type PillarKey = "strategy" | "data" | "technology" | "people" | "process" | "governance";

export interface Question {
  id: string;
  pillar: PillarKey;
  text: string;
  /** Four answers, weakest first; the score is the position (1 to 4). */
  options: [string, string, string, string];
}

export interface Pillar {
  key: PillarKey;
  name: string;
  /** What to do next when this area scores lowest. */
  nextStep: string;
}

export const PILLARS: Pillar[] = [
  {
    key: "strategy",
    name: "Strategy and leadership",
    nextStep:
      "Agree two or three business problems AI should help with, name an owner for each and decide how you will measure success.",
  },
  {
    key: "data",
    name: "Data",
    nextStep:
      "Move your most important records, such as customers, sales and stock, into one shared digital place, and agree who keeps them up to date.",
  },
  {
    key: "technology",
    name: "Technology",
    nextStep:
      "Fix the basics first: reliable devices and connectivity for key staff, and a simple way for your main tools to share information.",
  },
  {
    key: "people",
    name: "People and skills",
    nextStep:
      "Give your team short, practical sessions on everyday AI tools, and make time for people to practise on their real work.",
  },
  {
    key: "process",
    name: "Processes",
    nextStep:
      "Map one important workflow from start to finish before automating anything, and agree what ‘better’ will look like.",
  },
  {
    key: "governance",
    name: "Governance and responsible use",
    nextStep:
      "Write a one-page AI use guide: which tools staff may use, which data must never go into them and who approves new tools.",
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    pillar: "strategy",
    text: "How clearly has leadership defined what AI should achieve for your organisation?",
    options: ["Not discussed yet", "Interested, but no clear goals", "Goals agreed for one or two areas", "Clear goals, owners and a budget"],
  },
  {
    id: "q2",
    pillar: "strategy",
    text: "Have you identified specific problems where AI could help?",
    options: ["Not yet", "A few ideas, not prioritised", "A short list we have prioritised", "Prioritised use cases with measures of success"],
  },
  {
    id: "q3",
    pillar: "data",
    text: "Where does your key business information live today?",
    options: ["Mostly on paper, in notebooks or in people’s heads", "Scattered across spreadsheets and phones", "Mostly in shared digital systems", "Organised systems we can easily report from"],
  },
  {
    id: "q4",
    pillar: "data",
    text: "How much do you trust your data to be accurate and up to date?",
    options: ["Very little", "Some of it", "Most of it", "We check and maintain it regularly"],
  },
  {
    id: "q5",
    pillar: "technology",
    text: "How reliable are your devices and internet for daily work?",
    options: ["Often a barrier", "Workable, with frequent interruptions", "Reliable for most work", "Reliable, with a backup when something fails"],
  },
  {
    id: "q6",
    pillar: "technology",
    text: "How well do the tools your team uses work together?",
    options: ["We mostly work manually", "Separate tools, lots of copying between them", "Some tools share information", "Core tools are connected and automated where useful"],
  },
  {
    id: "q7",
    pillar: "people",
    text: "How comfortable is your team with digital tools and AI assistants?",
    options: ["Not comfortable yet", "A few people experiment", "Many use them for some tasks", "Most use them well and share what works"],
  },
  {
    id: "q8",
    pillar: "people",
    text: "Does your team have time and support to learn new skills?",
    options: ["No time or support", "Occasional, self-driven learning", "Some planned training", "Regular training with clear skill goals"],
  },
  {
    id: "q9",
    pillar: "process",
    text: "Are your main workflows written down?",
    options: ["Not at all", "A few, mostly in people’s heads", "Our key workflows are documented", "Documented, measured and improved regularly"],
  },
  {
    id: "q10",
    pillar: "process",
    text: "When you introduce a new tool, how do you check whether it worked?",
    options: ["We don’t check", "Informal feedback", "A few agreed measures", "Clear before-and-after measures"],
  },
  {
    id: "q11",
    pillar: "governance",
    text: "Do you have guidance on how staff may use AI tools?",
    options: ["None", "Informal, unwritten rules", "Written guidance for some uses", "A clear policy, with training and review"],
  },
  {
    id: "q12",
    pillar: "governance",
    text: "How well do you protect personal and client data?",
    options: ["Not sure what we hold", "Basic precautions", "Clear access rules and consent", "Regular reviews against data protection law"],
  },
];

export interface Level {
  min: number;
  name: string;
  summary: string;
}

/** Overall score bands, 0 to 100, highest first. */
export const LEVELS: Level[] = [
  {
    min: 80,
    name: "Ready to scale",
    summary: "You have strong foundations. The opportunity now is to scale what works, with clear measures and good governance.",
  },
  {
    min: 60,
    name: "Ready to pilot",
    summary: "You are ready to test AI on one or two well-chosen problems. A focused pilot will show what works before you invest more.",
  },
  {
    min: 35,
    name: "Building foundations",
    summary: "Some foundations are in place. Strengthening the weaker areas first will make any AI investment far more likely to pay off.",
  },
  {
    min: 0,
    name: "Getting started",
    summary: "You are at the beginning, which is a good place to make sound choices. Start with the basics below before buying any AI tool.",
  },
];

export const SECTORS = [
  "Retail and trade",
  "Financial services",
  "Education and training",
  "Health",
  "Agriculture",
  "Manufacturing",
  "NGO or development",
  "Government or public sector",
  "Professional services",
  "Hospitality and tourism",
  "Technology",
  "Other",
] as const;

export const ORG_SIZES = ["Just me", "2 to 10 people", "11 to 50 people", "51 to 250 people", "More than 250 people"] as const;

export type Answers = Record<string, number>;

export interface Result {
  score: number;
  level: Level;
  pillars: { key: PillarKey; name: string; score: number }[];
  nextSteps: { pillar: string; text: string }[];
}

/** Score answers (1 to 4 each). Pillar and overall scores are 0 to 100. */
export function scoreAssessment(answers: Answers): Result {
  const pillars = PILLARS.map((p) => {
    const qs = QUESTIONS.filter((q) => q.pillar === p.key);
    const total = qs.reduce((sum, q) => sum + (answers[q.id] ?? 1), 0);
    const score = Math.round(((total - qs.length) / (qs.length * 3)) * 100);
    return { key: p.key, name: p.name, score };
  });
  const all = QUESTIONS.reduce((sum, q) => sum + (answers[q.id] ?? 1), 0);
  const score = Math.round(((all - QUESTIONS.length) / (QUESTIONS.length * 3)) * 100);
  const level = LEVELS.find((l) => score >= l.min) ?? LEVELS[LEVELS.length - 1];
  const nextSteps = [...pillars]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((p) => ({ pillar: p.name, text: PILLARS.find((x) => x.key === p.key)!.nextStep }));
  return { score, level, pillars, nextSteps };
}
