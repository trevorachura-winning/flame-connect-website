/**
 * Flame Connect — introductory AI readiness self-check.
 *
 * This is an educational self-assessment, NOT a diagnostic, certification,
 * product launch, audited evaluation or AI-generated expert recommendation.
 * Answers are scored locally; no form data is transmitted or stored.
 */
export const READINESS_DIMENSIONS = [
  {
    id: "people",
    name: "People & skills",
    description: "AI awareness, practical capability and leadership support.",
    action: "Run a short AI literacy session, identify practical skills gaps, and appoint a responsible internal champion.",
  },
  {
    id: "process",
    name: "Processes & use cases",
    description: "Clearly understood work, suitable use cases and measurable outcomes.",
    action: "Map one repeated workflow, define a specific outcome, and test a small, low-risk use case with a human reviewer.",
  },
  {
    id: "data",
    name: "Data & technology",
    description: "Accessible information, data quality and dependable digital tools.",
    action: "Audit the data and tools needed for one pilot. Check ownership, quality, permissions and practical connectivity first.",
  },
  {
    id: "governance",
    name: "Governance & trust",
    description: "Privacy, oversight, accountability and safe use.",
    action: "Document simple rules for approved tools, sensitive information and mandatory human review before using AI in real workflows.",
  },
] as const;

export type DimensionId = (typeof READINESS_DIMENSIONS)[number]["id"];

export const READINESS_QUESTIONS: ReadonlyArray<{
  id: string;
  dimension: DimensionId;
  question: string;
  hint: string;
}> = [
  {
    id: "p1",
    dimension: "people",
    question: "How prepared are your people to understand basic AI opportunities and limitations?",
    hint: "Think about practical awareness across everyday teams, not just IT staff.",
  },
  {
    id: "p2",
    dimension: "people",
    question: "How confidently can teams identify tasks that AI might help with?",
    hint: "For example, drafting, summarising, research support or repetitive information work.",
  },
  {
    id: "p3",
    dimension: "people",
    question: "How actively does leadership support responsible AI learning and experimentation?",
    hint: "Consider time, clear ownership, staff guidance and realistic expectations.",
  },
  {
    id: "w1",
    dimension: "process",
    question: "How clearly are your important recurring workflows documented and understood?",
    hint: "AI works best when the underlying process and its pain points are visible.",
  },
  {
    id: "w2",
    dimension: "process",
    question: "How well have you identified and prioritised potential AI use cases?",
    hint: "Prioritisation should consider value, effort, risk and available evidence.",
  },
  {
    id: "w3",
    dimension: "process",
    question: "How consistently do you define measurable outcomes before testing new digital tools?",
    hint: "Think about time saved, error reduction, service quality or another relevant measure.",
  },
  {
    id: "d1",
    dimension: "data",
    question: "How accessible is the information needed for your priority workflows?",
    hint: "Consider approved access to documents, spreadsheets, records and systems.",
  },
  {
    id: "d2",
    dimension: "data",
    question: "How well is the quality and ownership of that information managed?",
    hint: "Look for completeness, accuracy, current records and clear responsibility.",
  },
  {
    id: "d3",
    dimension: "data",
    question: "How dependable are your existing digital tools and connectivity for small pilots?",
    hint: "Consider real constraints such as mobile devices, budgets and network reliability.",
  },
  {
    id: "g1",
    dimension: "governance",
    question: "How clear are your rules about privacy and what data may be entered into AI tools?",
    hint: "A safe experiment should never require uploading confidential information casually.",
  },
  {
    id: "g2",
    dimension: "governance",
    question: "How reliably are AI outputs checked by a responsible person before use?",
    hint: "This matters especially for customer-facing, legal, financial and HR decisions.",
  },
  {
    id: "g3",
    dimension: "governance",
    question: "How clearly is someone accountable for monitoring AI-related risks and decisions?",
    hint: "Responsible adoption needs ownership and a route for raising problems.",
  },
] as const;

export const READINESS_CHOICES = [
  { score: 0, label: "Not started", detail: "We have not addressed this yet." },
  { score: 1, label: "Early thinking", detail: "We have discussed it but taken few steps." },
  { score: 2, label: "Partly in place", detail: "Some teams or practices are progressing." },
  { score: 3, label: "Mostly in place", detail: "The approach is being used fairly consistently." },
  { score: 4, label: "Well established", detail: "We have clear practices and evidence of regular use." },
] as const;

export type ReadinessAnswers = Record<string, number>;

export type ReadinessResult = {
  overall: number;
  level: string;
  interpretation: string;
  byDimension: Array<{ id: DimensionId; name: string; score: number; action: string }>;
  priorities: Array<{ id: DimensionId; name: string; score: number; action: string }>;
};

export function calculateReadiness(answers: ReadinessAnswers): ReadinessResult {
  for (const question of READINESS_QUESTIONS) {
    const answer = answers[question.id];
    if (!Number.isInteger(answer) || answer < 0 || answer > 4) {
      throw new Error(`Missing or invalid response for ${question.id}`);
    }
  }

  const byDimension = READINESS_DIMENSIONS.map((dimension) => {
    const items = READINESS_QUESTIONS.filter((q) => q.dimension === dimension.id);
    const total = items.reduce((sum, question) => sum + answers[question.id], 0);
    return {
      id: dimension.id,
      name: dimension.name,
      score: Math.round((total / (items.length * 4)) * 100),
      action: dimension.action,
    };
  });

  const total = READINESS_QUESTIONS.reduce((sum, q) => sum + answers[q.id], 0);
  const overall = Math.round((total / (READINESS_QUESTIONS.length * 4)) * 100);

  const level =
    overall < 25
      ? "Exploring"
      : overall < 50
        ? "Building foundations"
        : overall < 75
          ? "Preparing to pilot"
          : "Stronger foundations";

  const interpretation =
    overall < 25
      ? "Focus first on awareness, ownership and clear ground rules before choosing tools."
      : overall < 50
        ? "Some foundations exist. Start with one workflow and address the weakest areas before piloting."
        : overall < 75
          ? "You may be positioned to test a focused, low-risk use case with human oversight."
          : "You report many useful foundations. Validate them with evidence before expanding AI use.";

  // Scores and priorities are self-reported; the result does not certify readiness.
  const priorities = [...byDimension].sort((a, b) => a.score - b.score).slice(0, 2);
  return { overall, level, interpretation, byDimension, priorities };
}

export function formatReadinessSummary(result: ReadinessResult): string {
  return [
    "Flame Connect — AI Readiness Self-Check",
    `Indicative self-reported score: ${result.overall}/100 — ${result.level}`,
    result.interpretation,
    "",
    ...result.byDimension.map((d) => `${d.name}: ${d.score}/100`),
    "",
    "Suggested starting actions:",
    ...result.priorities.map((d, i) => `${i + 1}. ${d.name}: ${d.action}`),
    "",
    "Educational self-assessment only. Not an AI audit, certification or guarantee.",
  ].join("\n");
}
