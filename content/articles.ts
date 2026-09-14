export type ArticleCategory = "Insights" | "Playbooks" | "Research" | "Field notes";

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  date: string; // ISO
  readingTime: string;
  author: { name: string; role: string };
  sections: ArticleSection[];
  actions: string[];
  limits: string[];
  relatedServiceSlug?: string;
  relatedProductSlug?: string;
  seo: { title: string; description: string };
}

const EDITORIAL = {
  name: "Flame Connect Editorial Team",
  role: "AI Centre of Change, Kampala",
};

export const ARTICLES: Article[] = [
  {
    slug: "ai-readiness-is-a-people-problem-first",
    title: "AI readiness is a people problem first",
    summary:
      "Most organizations asking about AI are not blocked by technology. They are blocked by unclear priorities, unmapped workflows and unspoken fear. Readiness work starts there.",
    category: "Insights",
    date: "2026-09-01",
    readingTime: "6 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why this matters",
        paragraphs: [
          "Across the organizations we meet, the AI conversation usually begins with a tool question: which platform, which model, which vendor. It is rarely the right first question. The organizations that get value from AI are not the ones that moved fastest on procurement — they are the ones that understood their own work clearly enough to know where help was needed.",
          "Readiness is commonly framed as an infrastructure question: do we have the data, the systems, the connectivity. Those matter. But in practice, the first constraints are human: nobody has agreed what problem to solve, the workflow as documented does not match the workflow as lived, and the people closest to the work have not been asked what actually slows them down.",
        ],
      },
      {
        heading: "What we are seeing",
        paragraphs: [
          "In structured readiness assessments, the same pattern repeats. Capability scores are middling but fixable. Data quality is uneven but rarely impossible. The real spread appears in two places: governance — who is allowed to decide, and what must stay human — and shared understanding, where the leader's picture of the workflow differs sharply from the operator's.",
          "That gap is not a problem to hide. It is the most useful diagnostic signal available, because disagreement between roles almost always marks the spot where a workflow is held together by memory and goodwill rather than by design.",
        ],
      },
      {
        heading: "Practical implications",
        paragraphs: [
          "A readiness review that earns its cost produces three things: a prioritised list of use cases tied to real work, a gap list that names what must be fixed before scale, and a shared language the whole leadership team can argue with. If an assessment produces only a score, it has told you very little.",
        ],
        list: [
          "Treat different answers between roles as findings, not failures.",
          "Score governance and process alongside data and tools.",
          "End every assessment with two candidate pilots, not forty ideas.",
        ],
      },
    ],
    actions: [
      "Run one honest readiness review with both a leader and an operator in the room.",
      "Write down your top three candidate AI use cases and the workflow each one touches.",
      "Name one decision that must always stay with a person, before you automate anything.",
    ],
    limits: [
      "These observations come from our own assessments and community sessions, not a continental survey.",
      "Readiness frameworks evolve; treat any score as a conversation starter, not a certification.",
    ],
    relatedProductSlug: "flame-ready",
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "AI readiness is a people problem first — Flame Connect",
      description:
        "Most AI adoption is blocked by unclear priorities and unmapped workflows, not technology. What readiness work should actually start with.",
    },
  },
  {
    slug: "map-one-workflow-before-automation",
    title: "Playbook: map one workflow before you automate anything",
    summary:
      "A one-afternoon method for documenting a real workflow — including its exceptions — so automation decisions are made on evidence instead of enthusiasm.",
    category: "Playbooks",
    date: "2026-08-24",
    readingTime: "7 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why this matters",
        paragraphs: [
          "Automation projects fail quietly. A tool is installed on top of a process nobody has written down, exceptions pile up, and within a quarter the team has routed around it. The cheapest insurance is unglamorous: one afternoon, one workflow, one wall of sticky notes.",
          "This playbook is the exact mapping exercise we run before any engagement. It requires no software and produces a document your whole team can argue with.",
        ],
      },
      {
        heading: "The method",
        paragraphs: [
          "Choose one workflow that is frequent, painful and bounded — lead follow-up, invoice chasing, client onboarding. Bounded means you can say where it starts and where it ends. Gather the two or three people who actually do it, not only the people who manage it.",
        ],
        list: [
          "Step 1 (20 min): List every step from trigger to done, one sticky note per step, in the order it really happens.",
          "Step 2 (20 min): Mark the exceptions — the five percent of cases that take fifty percent of the time.",
          "Step 3 (20 min): Mark every handoff between people or systems. Handoffs are where work silently waits.",
          "Step 4 (20 min): Mark the judgement calls — steps where a human decides something that depends on context.",
          "Step 5 (20 min): Agree as a group what 'good' looks like: speed, quality, cost, or the thing your customer actually feels.",
        ],
      },
      {
        heading: "Reading the map",
        paragraphs: [
          "Automate candidates are steps that are frequent, rules-based and low-judgement. Steps heavy with judgement are assistant candidates — technology that prepares, a person that decides. The exceptions list tells you what will break a naive automation, and it becomes your test plan.",
          "If the group cannot agree on what 'good' looks like, stop. That disagreement is the finding; automate nothing until success has a definition.",
        ],
      },
    ],
    actions: [
      "Block one afternoon this month and map a single workflow using the five steps.",
      "Circle exactly one automation candidate and one assistant candidate on the map.",
      "Write the success measure for a pilot before you speak to any vendor — including us.",
    ],
    limits: [
      "A map shows one workflow, not the whole organization; resist generalising from a single afternoon.",
      "Workflows change after automation; plan to re-map after the first pilot, not before it.",
    ],
    relatedServiceSlug: "ai-in-business",
    relatedProductSlug: "flame-forge",
    seo: {
      title: "Map one workflow before you automate anything — Flame Connect",
      description:
        "A one-afternoon playbook for documenting a real workflow so automation decisions rest on evidence, not enthusiasm.",
    },
  },
  {
    slug: "five-questions-before-any-ai-tool",
    title: "Five questions to ask before buying any AI tool",
    summary:
      "A short filter for vendor demos and internal proposals alike. If a tool cannot answer these plainly, the risk is not in the model — it is in the purchase.",
    category: "Playbooks",
    date: "2026-08-10",
    readingTime: "5 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why this matters",
        paragraphs: [
          "The AI market rewards confident demos. Buyers — especially those without deep technical teams — need a counterweight: questions that work regardless of what is under the hood. These five have served our clients well, and we hold our own products to them.",
        ],
      },
      {
        heading: "The questions",
        paragraphs: [
          "Ask them in writing. Good vendors answer in documents, not only on calls.",
        ],
        list: [
          "1. What specific workflow does this improve, and how will we measure the change from a baseline we already have?",
          "2. What happens when the AI is wrong or unavailable — what is the fallback, and who finds out first?",
          "3. Which decisions does the tool never make on its own, and how is that boundary enforced technically, not just promised?",
          "4. What happens to our data — where does it live, who can see it, and is it used to train anything?",
          "5. What does leaving look like — can we export our data and our history in a format we can actually use?",
        ],
      },
      {
        heading: "Practical implications",
        paragraphs: [
          "Notice that none of these questions require understanding the model. They test the things that actually determine whether a tool earns its place: fit to real work, behaviour under failure, human control, data conduct and reversibility. A vendor who resists written answers is telling you something important.",
        ],
      },
    ],
    actions: [
      "Send these five questions to your next vendor before the demo, not after.",
      "Score the answers with the person who owns the workflow, not only the person who owns the budget.",
      "Keep the written answers; they become your acceptance criteria later.",
    ],
    limits: [
      "These questions filter obvious misfit; they do not replace due diligence for high-stakes deployments.",
      "Our own tools are works in progress — ask us these questions too and judge the answers.",
    ],
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "Five questions to ask before buying any AI tool — Flame Connect",
      description:
        "A practical vendor filter for AI tools: workflow fit, failure behaviour, human control, data conduct and exit.",
    },
  },
  {
    slug: "human-in-the-loop-in-practice",
    title: "'Human in the loop' is a design decision, not a slogan",
    summary:
      "Every AI product claims human oversight. Fewer specify where it lives, how it is enforced and what happens when it is inconvenient. Here is what the principle looks like as engineering.",
    category: "Insights",
    date: "2026-07-28",
    readingTime: "6 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why this matters",
        paragraphs: [
          "'Human in the loop' appears in nearly every responsible-AI statement, including ours. Used loosely, it means nothing — a person somewhere in the building, technically able to intervene in theory. Used precisely, it is a set of enforceable design choices that can be inspected.",
        ],
      },
      {
        heading: "What the principle looks like as engineering",
        paragraphs: [
          "In our own products, the principle resolves into concrete mechanisms. Deterministic scoring sits beside any generative narrative, so a model outage degrades the explanation, never the arithmetic. Consequential actions — sending a customer-facing communication, changing data at scale — require an explicit human click. And every governed use case is registered with its risk tier, so the level of oversight is decided before the feature ships rather than after something goes wrong.",
        ],
        list: [
          "Approval gates: consequential actions are impossible without a named person's action, not merely possible to review.",
          "Deterministic baselines: when AI narrative fails, the system falls back to calculations a person can audit.",
          "Use-case registers: each AI application is documented with purpose, risk tier and required controls.",
          "Visible limitations: product status and confidence are exposed in the interface instead of smoothed over.",
        ],
      },
      {
        heading: "Practical implications",
        paragraphs: [
          "For buyers: ask where the loop actually is, and test it. For builders: if removing the human would merely be embarrassing in a meeting, that is governance by reputation, not by design. Design the oversight so it survives a busy Tuesday.",
        ],
      },
    ],
    actions: [
      "For any AI system you use, name the exact click or signature where a human approves a consequential action.",
      "Ask for the fallback: what does the system do on its worst day?",
      "Write your non-negotiables — the decisions that stay human — before the next procurement.",
    ],
    limits: [
      "Our own mechanisms are documented publicly in the platform repository and remain under active validation.",
      "This describes baseline practice, not a claim of perfection; oversight design is an ongoing discipline.",
    ],
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "Human in the loop is a design decision — Flame Connect",
      description:
        "What human oversight means as enforceable engineering: approval gates, deterministic baselines, use-case registers and visible limitations.",
    },
  },
  {
    slug: "field-notes-what-early-testers-showed-us",
    title: "Field notes: what early testers in Uganda changed in our products",
    summary:
      "Qualitative observations from early alpha testing and community sessions in Kampala — the assumptions that broke, and what we changed because of them.",
    category: "Field notes",
    date: "2026-09-08",
    readingTime: "6 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why we publish this",
        paragraphs: [
          "We say community feedback shapes our tools, and that claim deserves receipts. These notes are qualitative — observations from early testing sessions and structured feedback on our public alphas — and they are published in that spirit: honest about what broke, specific about what changed.",
        ],
      },
      {
        heading: "What we observed",
        paragraphs: [
          "First: mobile-first was not a preference, it was the default reality. Testers arrived on Android phones first and laptops second, often on constrained data. Features that assumed a wide screen or heavy assets were quietly abandoned, regardless of how useful the scoring underneath was.",
          "Second: vocabulary decided trust. Words like 'algorithm' and 'model' closed conversations; words like 'checklist', 'score with reasons' and 'draft for your review' opened them. The capability barely changed between those framings — the willingness to test it changed completely.",
          "Third: the CSV upload was the feature. Teams that 'did not have data' turned out to have years of it in spreadsheets and exercise books. Meeting teams at their actual data reality produced more adoption energy than any connector roadmap we described.",
        ],
      },
      {
        heading: "What we changed",
        paragraphs: [
          "We rebuilt primary flows around a 320-pixel baseline before adding desktop polish. We rewrote result screens so every score arrives with its stated reasons in plain language. And we kept the CSV/Excel-first path as a permanent design decision rather than a temporary bridge, because for our users it is not a compromise — it is the product.",
        ],
      },
    ],
    actions: [
      "If you are building for African markets: test on the phone your users carry, on the connection they pay for.",
      "Rewrite one screen of your product in the plainest language you can and watch what happens to completion.",
      "Ask users where their data really lives before designing your import experience.",
    ],
    limits: [
      "These are qualitative observations from a small early group, not survey statistics — we publish them as direction, not proof.",
      "What we observed in Kampala will not map perfectly onto every market; treat local testing as non-negotiable.",
    ],
    relatedProductSlug: "flame-lens",
    seo: {
      title: "Field notes: what early testers changed in our products — Flame Connect",
      description:
        "Qualitative observations from early product testing in Uganda: mobile-first reality, the vocabulary of trust, and why CSV-first is a feature.",
    },
  },
  {
    slug: "sales-discipline-before-sales-software",
    title: "Sales discipline beats sales software",
    summary:
      "Follow-up cadence, honest pipeline stages and a daily focus list move revenue more reliably than any platform. The software's job is to make that discipline easier to keep.",
    category: "Playbooks",
    date: "2026-08-17",
    readingTime: "5 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why this matters",
        paragraphs: [
          "Ask a struggling sales team what they need and the answer is usually a system. Watch the same team for a week and the gap is usually rhythm: follow-ups that depend on memory, pipeline stages that mean different things to different people, and a Monday that starts with inbox triage instead of the three conversations that matter most.",
        ],
      },
      {
        heading: "The discipline underneath",
        paragraphs: [
          "Three habits carry more weight than any tool. A defined follow-up cadence — agreed response windows that do not collapse when the week gets busy. Shared stage definitions — a 'qualified' lead means the same thing to everyone. And a daily focus list — a short, ranked set of actions decided before the day's noise begins.",
        ],
        list: [
          "Cadence: write down response windows per lead stage and keep them visible.",
          "Stages: define each pipeline stage by evidence, not optimism.",
          "Focus: choose tomorrow's top three actions before you close today.",
        ],
      },
      {
        heading: "Where software actually helps",
        paragraphs: [
          "This is the design philosophy behind Flame Sales, and it is worth stating plainly: software should make a good rhythm easier to keep, not substitute for having one. Scoring that explains itself, reminders that surface the follow-up due today, debriefs that turn a lost deal into next month's better decision — these are valuable precisely because they serve discipline rather than replacing it.",
        ],
      },
    ],
    actions: [
      "Agree follow-up windows per pipeline stage and put them where the team works.",
      "Rewrite your stage names as evidence: what must be true for a lead to sit here?",
      "Run two weeks of daily focus lists before evaluating any new tool.",
    ],
    limits: [
      "Discipline-first is a philosophy, not a law — the right system still matters at scale.",
      "Flame Sales is in pilot; we make no revenue claims for it yet, by design.",
    ],
    relatedProductSlug: "flame-sales",
    seo: {
      title: "Sales discipline beats sales software — Flame Connect",
      description:
        "Follow-up cadence, honest pipeline stages and daily focus lists move revenue more reliably than platforms. What software should actually do.",
    },
  },
];

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "Insights",
  "Playbooks",
  "Research",
  "Field notes",
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const sortedArticles = () =>
  [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
