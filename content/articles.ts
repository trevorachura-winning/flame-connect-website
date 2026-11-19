export type ArticleCategory = "Perspectives" | "Playbooks" | "Research" | "Field notes";

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
      "Technology is rarely what holds organisations back with AI. Unclear priorities, unmapped workflows and unspoken fears do. That is where readiness work should start.",
    category: "Perspectives",
    date: "2026-09-01",
    readingTime: "6 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why this matters",
        paragraphs: [
          "In most organisations we meet, the AI conversation starts with a tool question: which platform, which model, which vendor. That is rarely the right place to begin. The organisations that get real value from AI understood their own work well enough to know where help was needed. How fast they bought something had little to do with it.",
          "Readiness is usually treated as an infrastructure question. Do we have the data, the systems, the connectivity? Those things matter. In practice, though, the first obstacles are human. Nobody has agreed which problem to solve, the workflow on paper does not match the one people actually follow, and nobody has asked the people closest to the work what slows them down.",
        ],
      },
      {
        heading: "What we are seeing",
        paragraphs: [
          "Our readiness assessments keep showing the same pattern. Skills are average but fixable. Data quality is uneven but rarely hopeless. The real differences show up in two places. One is governance: who is allowed to decide, and what must stay with a person. The other is shared understanding, where a leader's picture of the workflow is very different from the picture held by the person doing the work.",
          "Don't hide that gap. It is the most useful clue you have. When roles disagree, it almost always marks the place where a workflow runs on memory and goodwill instead of design.",
        ],
      },
      {
        heading: "Practical implications",
        paragraphs: [
          "A readiness review worth paying for gives you three things. You get a prioritised list of use cases tied to real work, a list of what must be fixed before you scale, and a shared language your leadership team can debate. If an assessment only gives you a score, it has told you very little.",
        ],
        list: [
          "When roles give different answers, treat it as a finding instead of a failure.",
          "Score governance and process alongside data and tools.",
          "End every assessment with two possible pilots instead of forty ideas.",
        ],
      },
    ],
    actions: [
      "Run one honest readiness review with both a leader and an operator in the room.",
      "Write down your top three candidate AI use cases and the workflow each one touches.",
      "Name one decision that must always stay with a person, before you automate anything.",
    ],
    limits: [
      "These observations come from our own assessments and community sessions. They are not a survey of the whole continent.",
      "Readiness frameworks change over time. Treat any score as a starting point for discussion, never as a certificate.",
    ],
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "AI readiness is a people problem first",
      description:
        "Unclear priorities and unmapped workflows hold back AI adoption far more often than technology does. Here is where readiness work should start.",
    },
  },
  {
    slug: "map-one-workflow-before-automation",
    title: "Playbook: map one workflow before you automate anything",
    summary:
      "A one-afternoon method for writing down a real workflow, exceptions included, so you decide what to automate based on evidence instead of enthusiasm.",
    category: "Playbooks",
    date: "2026-08-24",
    readingTime: "7 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why this matters",
        paragraphs: [
          "Automation projects fail quietly. Someone installs a tool on top of a process nobody has written down, the exceptions pile up, and within three months the team is working around it. The cheapest protection is simple: one afternoon, one workflow and a wall of sticky notes.",
          "This is the same mapping exercise we run before every engagement. It needs no software, and it gives your whole team a document they can debate.",
        ],
      },
      {
        heading: "The method",
        paragraphs: [
          "Choose one workflow that happens often, causes pain and has clear edges, such as lead follow-up, chasing invoices or onboarding clients. Clear edges means you can say where it starts and where it ends. Bring in the two or three people who actually do the work, as well as the people who manage it.",
        ],
        list: [
          "Step 1 (20 min): List every step from trigger to done, one sticky note per step, in the order it really happens.",
          "Step 2 (20 min): Mark the exceptions, the five percent of cases that take fifty percent of the time.",
          "Step 3 (20 min): Mark every handoff between people or systems. Handoffs are where work sits and waits without anyone noticing.",
          "Step 4 (20 min): Mark the judgement calls, where a person decides something that depends on the situation.",
          "Step 5 (20 min): Agree as a group what ‘good’ looks like: speed, quality, cost or what your customer actually notices.",
        ],
      },
      {
        heading: "Reading the map",
        paragraphs: [
          "Steps that happen often, follow clear rules and need little judgement are good candidates for automation. Steps that need a lot of judgement suit an assistant instead, where the technology prepares and a person decides. Your list of exceptions shows what would break a simple automation, and it becomes your test plan.",
          "If the group cannot agree on what ‘good’ looks like, stop there. That disagreement is your finding. Automate nothing until you have defined success.",
        ],
      },
    ],
    actions: [
      "Block one afternoon this month and map a single workflow using the five steps.",
      "Circle exactly one automation candidate and one assistant candidate on the map.",
      "Write down how you will measure a pilot's success before you speak to any vendor, including us.",
    ],
    limits: [
      "A map shows one workflow, not the whole organisation. Be careful about drawing big conclusions from a single afternoon.",
      "Workflows change once you automate them. Plan to map the workflow again after the first pilot.",
    ],
    relatedServiceSlug: "ai-in-business",
    relatedProductSlug: "flame-os",
    seo: {
      title: "Map one workflow before you automate anything",
      description:
        "A one-afternoon playbook for writing down a real workflow, so your automation decisions rest on evidence instead of enthusiasm.",
    },
  },
  {
    slug: "five-questions-before-any-ai-tool",
    title: "Five questions to ask before buying any AI tool",
    summary:
      "A short filter for vendor demos and internal proposals. If a tool cannot answer these questions plainly, the risk lies in buying it, whatever the model behind it.",
    category: "Playbooks",
    date: "2026-08-10",
    readingTime: "5 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why this matters",
        paragraphs: [
          "The AI market rewards confident demos. Buyers, especially those without large technical teams, need something to balance that: questions that work whatever is under the hood. These five have served our clients well, and we hold our own products to them too.",
        ],
      },
      {
        heading: "The questions",
        paragraphs: [
          "Ask them in writing. Good vendors will answer in a document as well as on a call.",
        ],
        list: [
          "1. What specific workflow does this improve, and how will we measure the change from a baseline we already have?",
          "2. What happens when the AI is wrong or unavailable? What is the fallback, and who finds out first?",
          "3. Which decisions does the tool never make on its own, and how is that limit enforced in the software itself instead of just promised?",
          "4. What happens to our data? Where is it stored, who can see it, and is it used to train anything?",
          "5. What happens if we leave? Can we export our data and history in a format we can actually use?",
        ],
      },
      {
        heading: "Practical implications",
        paragraphs: [
          "None of these questions need you to understand the model. They test what decides whether a tool earns its place: how well it fits real work, how it behaves when it fails, who stays in control, how it treats your data and whether you can walk away. A vendor who avoids giving written answers is telling you something important.",
        ],
      },
    ],
    actions: [
      "Send these five questions to your next vendor before the demo.",
      "Score the answers with the person who runs the workflow as well as the person who holds the budget.",
      "Keep the written answers. They become your acceptance criteria later.",
    ],
    limits: [
      "These questions catch obvious mismatches. They do not replace proper due diligence for high-stakes systems.",
      "Our own tools are still in development. Ask us these questions too, and judge our answers.",
    ],
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "Five questions to ask before buying any AI tool",
      description:
        "A practical filter for AI vendors: workflow fit, behaviour when things fail, human control, data handling and how to leave.",
    },
  },
  {
    slug: "human-in-the-loop-in-practice",
    title: "‘Human in the loop’ is a design decision",
    summary:
      "Every AI product claims human oversight. Far fewer say where it happens, how it is enforced and what happens when it gets in the way. Here is what the principle looks like when you build it.",
    category: "Perspectives",
    date: "2026-07-28",
    readingTime: "6 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why this matters",
        paragraphs: [
          "‘Human in the loop’ appears in nearly every responsible AI statement, including ours. Used loosely, it means very little: a person somewhere in the building who could, in theory, step in. Used properly, it is a set of design choices that are enforced and can be checked.",
        ],
      },
      {
        heading: "What the principle looks like in practice",
        paragraphs: [
          "In our own products, the principle becomes specific mechanisms. Fixed, rule-based scoring sits beside any AI-written explanation, so if the model goes down you lose the explanation but never the numbers. Actions with real consequences, such as sending a message to a customer or changing data in bulk, need a person to click and approve them. Every AI use case is also recorded with its risk level, so we decide how much oversight it needs before the feature ships, not after something goes wrong.",
        ],
        list: [
          "Approval gates: actions with real consequences cannot happen until a named person approves them.",
          "Rule-based fallbacks: when the AI explanation fails, the system falls back to calculations a person can check.",
          "Use-case registers: each AI feature is documented with its purpose, risk level and required controls.",
          "Visible limits: product status and confidence are shown on screen instead of being glossed over.",
        ],
      },
      {
        heading: "Practical implications",
        paragraphs: [
          "If you are buying, ask exactly where the human sits in the process, and test it. If you are building, ask what would happen if the person were removed. If the only consequence is an awkward meeting, your oversight depends on reputation instead of design. Build oversight that still works on a busy Tuesday.",
        ],
      },
    ],
    actions: [
      "For every AI system you use, name the exact click or signature where a person approves an important action.",
      "Ask for the fallback: what does the system do on its worst day?",
      "Before your next purchase, write down your non-negotiables: the decisions that always stay with people.",
    ],
    limits: [
      "Our own mechanisms are still being tested and refined.",
      "This describes our baseline practice. It is not a claim of perfection, and designing good oversight is ongoing work.",
    ],
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "Human in the loop is a design decision",
      description:
        "What human oversight looks like when it is built into the product: approval gates, rule-based fallbacks, use-case registers and visible limits.",
    },
  },
  {
    slug: "field-notes-what-early-testers-showed-us",
    title: "Field notes: what early testers in Uganda changed in our products",
    summary:
      "What we saw in early testing and community sessions in Kampala: the assumptions that turned out wrong, and what we changed as a result.",
    category: "Field notes",
    date: "2026-09-08",
    readingTime: "6 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why we publish this",
        paragraphs: [
          "We say community feedback shapes our tools, so we should show the evidence. These notes are observations from early testing sessions and structured feedback from early testers. We publish them to be honest about what broke and specific about what we changed.",
        ],
      },
      {
        heading: "What we observed",
        paragraphs: [
          "First, mobile came first for everyone. Testers used Android phones before laptops, often on limited data. People quietly stopped using features that assumed a wide screen or heavy downloads, however useful the scoring behind them was.",
          "Second, the words we used decided whether people trusted us. ‘Algorithm’ and ‘model’ ended conversations. ‘Checklist’, ‘score with reasons’ and ‘draft for your review’ started them. The feature behind the words barely changed, but people's willingness to try it changed completely.",
          "Third, the spreadsheet upload mattered most. Teams that said they ‘did not have data’ turned out to have years of it in spreadsheets and exercise books. Working with the data they really had got people more engaged than any list of future integrations we described.",
        ],
      },
      {
        heading: "What we changed",
        paragraphs: [
          "We rebuilt the main screens for a 320-pixel phone screen first and polished the desktop version after. We rewrote the results screens so every score comes with its reasons in plain language. We also kept starting from CSV or Excel as a permanent feature instead of a stopgap, because for our users it is the product, not a compromise.",
        ],
      },
    ],
    actions: [
      "If you are building for African markets, test on the phones your users carry and the data connections they pay for.",
      "Rewrite one screen of your product in the plainest language you can and watch what happens to completion.",
      "Ask users where their data really lives before designing your import experience.",
    ],
    limits: [
      "These are observations from a small early group, not survey statistics. We share them as a direction to explore, not as proof.",
      "What we saw in Kampala will not apply perfectly to every market. Always test locally.",
    ],
    relatedProductSlug: "flame-os",
    seo: {
      title: "Field notes: what early testers changed in our products",
      description:
        "What early product testing in Uganda taught us about phones, the words that build trust and why starting from spreadsheets matters.",
    },
  },
  {
    slug: "sales-discipline-before-sales-software",
    title: "Sales discipline beats sales software",
    summary:
      "A steady follow-up routine, honest pipeline stages and a daily focus list bring in revenue more reliably than any platform. Good software makes those habits easier to keep.",
    category: "Playbooks",
    date: "2026-08-17",
    readingTime: "5 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why this matters",
        paragraphs: [
          "Ask a struggling sales team what they need and they will usually say a system. Watch the same team for a week and you will usually see that they lack a routine. Follow-ups depend on memory, pipeline stages mean different things to different people, and Monday starts with clearing the inbox instead of the three conversations that matter most.",
        ],
      },
      {
        heading: "The discipline underneath",
        paragraphs: [
          "Three habits matter more than any tool. The first is a set follow-up routine, with agreed response times that hold even in a busy week. The second is shared stage definitions, so a ‘qualified’ lead means the same thing to everyone. The third is a daily focus list: a short, ranked set of actions chosen before the day gets noisy.",
        ],
        list: [
          "Routine: write down the response time for each lead stage and keep it where everyone can see it.",
          "Stages: define each pipeline stage by evidence instead of optimism.",
          "Focus: choose tomorrow's top three actions before you close today.",
        ],
      },
      {
        heading: "Where software actually helps",
        paragraphs: [
          "This is the thinking behind Flame OS. Software should make a good routine easier to keep. It cannot replace having one. Scores that explain themselves, reminders that show today's follow-ups and reviews that turn a lost deal into a better decision next month are useful because they support good habits instead of replacing them.",
        ],
      },
    ],
    actions: [
      "Agree follow-up times for each pipeline stage and put them where the team works.",
      "Rewrite each stage name as a test: what must be true for a lead to sit here?",
      "Run two weeks of daily focus lists before evaluating any new tool.",
    ],
    limits: [
      "Putting habits first is a principle, not a rule. As you grow, the right system still matters.",
      "Flame OS is launching soon. We deliberately make no revenue claims for it yet.",
    ],
    relatedProductSlug: "flame-os",
    seo: {
      title: "Sales discipline beats sales software",
      description:
        "A follow-up routine, honest pipeline stages and daily focus lists bring in revenue more reliably than platforms. Here is what software should actually do.",
    },
  },

  {
    slug: "thirty-day-ai-pilot-plan",
    title: "Playbook: a 30-day AI pilot your team can actually finish",
    summary:
      "Most AI pilots stall because they are too big, too vague or owned by nobody. Here is a four-week plan built around one workflow, one owner and one number.",
    category: "Playbooks",
    date: "2026-11-17",
    readingTime: "7 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why pilots stall",
        paragraphs: [
          "A pilot is a small, time-boxed test of whether AI improves one piece of real work. It is not a strategy, a platform purchase or a demonstration for the board. When it tries to be all of those things, it rarely ends. It simply fades.",
          "The pattern we see most often is a pilot with five goals, three departments and no single person accountable for the result. Four weeks later the team has a tool account, a few impressive screenshots and no decision. A good pilot ends with a clear yes, no or not yet.",
        ],
      },
      {
        heading: "Week one: choose the work and the number",
        paragraphs: [
          "Pick one workflow that happens often, follows a recognisable pattern and costs your team real time. Answering routine customer questions, drafting proposals, summarising reports or sorting incoming documents are common starting points.",
          "Then choose one number that would tell you the pilot worked. Hours saved per week, response time, error rate or the share of drafts that need heavy rewriting all work. Measure it for a week before any AI touches the work, so you have an honest baseline.",
        ],
        list: [
          "Name one owner who has the authority to change how the work is done.",
          "Write the workflow down, exceptions included, before choosing a tool.",
          "Agree what data the tool may and may not see.",
        ],
      },
      {
        heading: "Weeks two and three: run it alongside the real work",
        paragraphs: [
          "Run the AI-assisted version next to the current process, not instead of it. Keep a person reviewing every output that reaches a customer or a decision. Ask the people doing the work to log what helped, what they had to fix and what made them uneasy.",
          "Expect the first week to be slower. Teams are learning to write instructions, check outputs and spot errors. Judge the second week, not the first.",
        ],
      },
      {
        heading: "Week four: decide",
        paragraphs: [
          "Compare your number against the baseline and read the team log. Then make one of three decisions. Scale it, with the review steps that made it safe. Change it, because the idea is right but the workflow or tool is wrong. Or stop it, and write down what you learned so the next pilot starts smarter.",
          "Stopping is a valid result. A pilot that ends in a clear no has saved you from a far more expensive rollout.",
        ],
      },
    ],
    actions: [
      "Choose one workflow and one owner this week.",
      "Measure your baseline for five working days before introducing any tool.",
      "Book the week-four decision meeting now, so the pilot has an end date.",
    ],
    limits: [
      "Four weeks suits frequent, repeatable work. Processes that run monthly or quarterly need a longer window.",
      "This plan covers the operational test. Contracts, data protection and security reviews may need more time in regulated sectors.",
    ],
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "A 30-day AI pilot plan for African businesses",
      description:
        "A practical four-week AI pilot plan for small and growing businesses: one workflow, one owner, one number and a clear decision at the end.",
    },
  },
  {
    slug: "ai-in-african-languages-customer-service",
    title: "Your customers do not all speak English. Your AI should not assume they do.",
    summary:
      "African-language AI is moving from research labs into usable tools. For businesses serving customers in Luganda, Swahili or isiZulu, that changes what good customer service can look like.",
    category: "Perspectives",
    date: "2026-11-12",
    readingTime: "6 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "The gap most AI tools leave",
        paragraphs: [
          "Most mainstream AI tools work best in English and a handful of other widely used languages. For a business in Kampala, Nairobi or Johannesburg, that leaves a large share of customers served less well, or not at all, by the tools on the market.",
          "That gap is starting to close. Research groups and companies on the continent are building models for African languages, and some now offer them as products that businesses can use.",
        ],
      },
      {
        heading: "What is changing",
        paragraphs: [
          "In Uganda, Sunbird AI has published Sunflower, a family of language models covering 31 Ugandan languages. In South Africa, Lelapa AI offers Vulavula, a service for transcription, translation and language analysis in South African languages. You can read more about both in our collection of AI at work across Africa on this page.",
          "These are early tools, and quality varies by language and task. But they mean a question asked in Luganda or isiZulu no longer has to be a dead end for an automated system.",
        ],
      },
      {
        heading: "Where it can help first",
        paragraphs: [
          "Start where language is already a bottleneck and a person can still review the result. Good candidates include transcribing and summarising voice notes from customers, translating frequently asked questions, and helping staff understand messages written in a language they read less fluently.",
        ],
        list: [
          "List the languages your customers actually use, by channel.",
          "Find the conversations where language slows you down or loses customers.",
          "Test any tool with native speakers on your own real examples before going live.",
        ],
      },
    ],
    actions: [
      "Audit one month of customer messages and note which languages appear.",
      "Pick one high-volume question and test how a local language tool handles it.",
      "Keep a fluent person reviewing outputs until accuracy is proven on your own data.",
    ],
    limits: [
      "We describe these tools from their public documentation and publications. We have not independently benchmarked them.",
      "Accuracy differs between languages, dialects and topics. Never assume a result in one language holds for another.",
    ],
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "AI in African languages for customer service",
      description:
        "African-language AI from teams like Sunbird AI and Lelapa AI is becoming usable. Here is where it can help customer service first, and how to test it safely.",
    },
  },
  {
    slug: "questions-before-you-buy-an-ai-tool",
    title: "Ten questions to ask before you buy an AI tool",
    summary:
      "A short checklist for leaders weighing an AI product, so the decision rests on your work, your data and your risks, not the demo.",
    category: "Playbooks",
    date: "2026-11-05",
    readingTime: "5 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why a checklist helps",
        paragraphs: [
          "AI demos are designed to impress. They use clean data, simple questions and a presenter who knows exactly what to type. Your reality will be messier. A few direct questions, asked before you sign, protect your budget and your customers.",
        ],
      },
      {
        heading: "Questions about the work",
        paragraphs: ["Start with the problem, not the product."],
        list: [
          "Which specific workflow will this change, and who owns it?",
          "How will we measure whether it helped, and what is our baseline today?",
          "What happens when the tool is wrong, and who catches it?",
        ],
      },
      {
        heading: "Questions about data and risk",
        paragraphs: ["Then ask what the tool needs from you, and what it does with it."],
        list: [
          "What data does it need, and where is that data stored and processed?",
          "Is our data used to train the vendor's models, and can we opt out?",
          "How does it fit our obligations under the data protection laws that apply to us?",
          "Can we export our data and leave if it does not work out?",
        ],
      },
      {
        heading: "Questions about cost and support",
        paragraphs: ["Finally, check what it really costs to run."],
        list: [
          "What is the full cost at our expected volume, including usage-based charges?",
          "Does it work reliably on the connectivity and devices our team actually has?",
          "Who supports us locally, and in which time zone?",
        ],
      },
    ],
    actions: [
      "Send these questions to the vendor in writing before the next demo.",
      "Ask for a trial on your own data, not the vendor's sample data.",
      "Involve the person who will use the tool every day in the decision.",
    ],
    limits: [
      "This checklist is a starting point. Large or regulated purchases also need legal, security and procurement review.",
      "Data protection obligations differ by country and sector. Take local legal advice where it matters.",
    ],
    relatedServiceSlug: "consulting-thought-leadership",
    seo: {
      title: "Ten questions to ask before you buy an AI tool",
      description:
        "A practical checklist for African business leaders choosing an AI product: workflow fit, data protection, real costs, connectivity and local support.",
    },
  },
];

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "Perspectives",
  "Playbooks",
  "Research",
  "Field notes",
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const sortedArticles = () =>
  [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
