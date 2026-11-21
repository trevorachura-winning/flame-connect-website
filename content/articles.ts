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
  /** Optional 1200x630 JPEG share image under /public (keep it < 300 KB). */
  ogImage?: string;
  /** Optional hand-picked "Keep reading" articles; falls back to the latest two. */
  relatedArticleSlugs?: string[];
  /** Optional evidence list rendered under the article. External, checked sources only. */
  sources?: { label: string; href: string }[];
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
    slug: "ai-adoption-african-business-2026",
    title: "Africa's AI problem is no longer access. It is turning pilots into results.",
    summary:
      "AI use has spread quickly among African firms and workers, but few organisations can show what it earns them. What the 2026 evidence says, and a six-step way for Ugandan teams to start with discipline.",
    category: "Research",
    date: "2026-11-21",
    readingTime: "7 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "The tension",
        paragraphs: [
          "Two things are true at once in 2026. AI tools are now part of everyday work for many African businesses: drafting proposals, answering customers, writing social posts and summarising reports. Yet most of those businesses cannot point to a clear number showing what AI has earned or saved them.",
          "That gap between using AI and benefiting from it is the real adoption story on the continent this year. It matters most for operators who cannot afford expensive experiments.",
        ],
      },
      {
        heading: "Adoption among formal firms has risen fast",
        paragraphs: [
          "The World Bank's World Development Report 2026, released in August, draws on new enterprise surveys in seven countries, including Kenya and Nigeria. Reported figures show AI use among Nigerian formal firms rising from under 5% in 2022 to about 40% in 2025, while ODI's reading of the same survey puts Kenya at 42% of formal firms in early 2026, close to the 43% recorded in the United States.",
          "Two caveats matter. These figures cover registered firms with at least five workers, not the informal businesses that make up much of African economies. And firms with stronger management, a record of innovation and better market access were much more likely to adopt AI. Adoption is following capability, not replacing it.",
        ],
      },
      {
        heading: "Most organisations are still in pilot mode",
        paragraphs: [
          "PwC's Decoding ROI from AI in Africa, published in May 2026, found that 82% of African organisations in its sample were running AI pilots, but few had scaled AI across the business. Average AI investment was 2% of revenue, against 5% among global AI leaders, and only 32% felt their investment was sufficient. PwC frames the challenge as execution at scale rather than adoption.",
          "The same pattern shows up in South Africa, the continent's most closely measured market, where large organisations report near-universal AI use but low scores for integrating it into how the business actually runs.",
        ],
      },
      {
        heading: "Workers are ahead of their organisations",
        paragraphs: [
          "PwC also found that 64% of African workers in its sample already use AI in their roles. That is an asset and a risk. When staff adopt tools faster than leadership sets rules, businesses end up with unmanaged use: customer or financial data pasted into public tools with no policy, no record and no measurement.",
        ],
      },
      {
        heading: "East Africa starts from a lower base",
        paragraphs: [
          "Microsoft's Global AI Diffusion report estimates the share of working-age people using generative AI tools. In the first quarter of 2026, South Africa led the continent at 23.1%, Nigeria and Ghana were around 10% and Kenya 8.7%, while Uganda sat below 8%. Microsoft's September update shows the gap between richer and poorer economies still widening, and links it largely to electricity, connectivity and digital skills.",
          "Uganda's own 2025 National AI Landscape Assessment, produced with ITU, identifies a lack of skills as the leading barrier to AI adoption in the country.",
        ],
      },
      {
        heading: "What this means for teams in Uganda",
        paragraphs: [
          "There is no published, representative survey of AI adoption by Ugandan businesses yet, so the honest reading is directional. Population-level use is lower than in Kenya or Nigeria, the firm-level evidence comes from neighbours, and the policy framework is still being written.",
          "The Ministry of ICT and National Guidance began developing a National AI and Emerging Technologies Strategy in March 2026 with NITA-U and AI Uganda, and in October said it expects to launch it before the end of the year. Until then, the Data Protection and Privacy Act is the main rule that applies when businesses put personal data into AI systems.",
          "There is an advantage hidden in this picture. Ugandan businesses can learn from pilot fatigue elsewhere and start with discipline, instead of catching up through scattered experiments.",
        ],
      },
      {
        heading: "One workflow, measured and governed",
        paragraphs: [
          "The World Bank's advice to developing economies is to adopt, adapt and then advance: use existing tools, tailor them to local conditions, and leave frontier model-building for later. For a business, that becomes six practical steps. Our 30-day pilot playbook and our guide to mapping one workflow before you automate go deeper on the first three.",
        ],
        list: [
          "Pick one workflow with a visible cost, such as WhatsApp enquiries, quotation turnaround or monthly reporting.",
          "Measure it for a week before any AI touches the work, so you have an honest baseline.",
          "Decide on day one which customer, staff and financial data may never go into public tools.",
          "Design for local reality: mobile, WhatsApp, voice, patchy connectivity and the languages your customers use.",
          "Train the people already using AI, and turn informal habits into shared, safe practice.",
          "At 90 days, compare against the baseline and decide: scale it, change it or stop it.",
        ],
      },
    ],
    actions: [
      "Name one workflow and one owner this week.",
      "Write a one-page rule on what data may and may not go into AI tools.",
      "Book a 90-day decision meeting now, so the experiment has an end date.",
    ],
    limits: [
      "Uganda-specific firm-level data on AI adoption is not yet published. Findings from Kenya, Nigeria and South Africa may not transfer directly.",
      "The surveys measure different things: formal-firm adoption (World Bank), large-company executives (PwC, 85 African respondents in a global sample of 1,217) and individual tool use estimated from product telemetry (Microsoft). Their numbers are not directly comparable.",
      "Uganda's national AI strategy had not been published at the time of writing. Its content and timing may change the picture.",
    ],
    relatedServiceSlug: "ai-in-business",
    relatedArticleSlugs: ["thirty-day-ai-pilot-plan", "map-one-workflow-before-automation"],
    ogImage: "/og/ai-adoption-african-business-2026.jpg",
    sources: [
      { label: "World Bank, World Development Report 2026: The Promise of Artificial Intelligence (Aug 2026)", href: "https://www.worldbank.org/wdr2026" },
      { label: "ODI, Beyond adoption: turning AI productivity into better jobs in African economies (2026)", href: "https://odi.org/en/insights/beyond-adoption-turning-ai-productivity-into-better-jobs-in-african-economies/" },
      { label: "PwC, Decoding ROI from AI in Africa, press release (18 May 2026)", href: "https://www.pwc.com/ke/en/press-room/pwc-ai-performance-findings.html" },
      { label: "Microsoft, Global AI Diffusion Q1 2026 Trends and Insights (May 2026)", href: "https://www.microsoft.com/en-us/research/wp-content/uploads/2026/05/Microsoft-AI-Diffusion-Report-2026-Q1.pdf" },
      { label: "Microsoft On the Issues, The continued state of global AI diffusion in 2026 (21 Sep 2026)", href: "https://blogs.microsoft.com/on-the-issues/2026/09/21/the-continued-state-of-global-ai-diffusion-in-2026/" },
      { label: "ITU, Uganda National AI Landscape Assessment (2025)", href: "https://www.itu.int/dms_pub/itu-d/opb/uga/D-UGA-NAAILA-2025-EPB-E.epub" },
      { label: "Ministry of ICT and National Guidance, stakeholder engagement on the National AI and Emerging Technologies Strategy (2026)", href: "https://ict.go.ug/media/news/ministry-engages-stakeholders-on-ugandas-national-emerging-technologies-strategy" },
      { label: "New Vision, Govt to launch National AI Strategy this year (Oct 2026)", href: "https://www.newvision.co.ug/category/news/govt-to-launch-national-ai-strategy-this-year-NV_241670_102026" },
    ],
    seo: {
      title: "AI adoption in African business 2026: from pilots to results",
      description:
        "African firms are adopting AI fast, but few see returns. What the 2026 evidence shows, and a six-step plan for Ugandan teams to turn pilots into results.",
    },
  },
  {
    slug: "uganda-data-protection-ai-business-guide-2026",
    title: "Using data and AI in Uganda: what the law asks of your business",
    summary:
      "Uganda has no AI law yet, but its data protection law already covers most of what AI tools touch. Here is what applies today, what is still coming and a short checklist to act on.",
    category: "Playbooks",
    date: "2026-11-21",
    readingTime: "7 min read",
    author: EDITORIAL,
    sections: [
      {
        heading: "Why this matters",
        paragraphs: [
          "Most AI tools a business adopts do something with personal data. A chatbot reads customer messages, a CRM stores names and phone numbers, a scoring tool ranks applicants. Each of those is processing personal data, and in Uganda that is regulated.",
          "Many teams assume that because there is no AI law yet, AI is unregulated. That is not quite right. The Data Protection and Privacy Act, 2019 and its Regulations of 2021 already set clear duties, and the regulator has started to enforce them.",
        ],
      },
      {
        heading: "The law that already applies",
        paragraphs: [
          "The Data Protection and Privacy Act came into force on 3 May 2019, and the Data Protection and Privacy Regulations took effect on 12 March 2021. The Personal Data Protection Office, which sits under the National Information Technology Authority, Uganda (NITA-U), oversees them. It became operational in August 2021.",
          "The Act applies to anyone collecting or processing personal data in Uganda, and to organisations outside Uganda handling data about Ugandan citizens. If your business keeps customer, staff or supplier records, it almost certainly applies to you.",
        ],
      },
      {
        heading: "What it asks of you, in plain terms",
        paragraphs: [
          "These are the duties that come up most often when a business adopts digital or AI tools. Section numbers refer to the Act as passed in 2019.",
        ],
        list: [
          "Register with the Personal Data Protection Office and renew every year (section 29 and Regulation 15). Registered organisations also file an annual compliance report.",
          "Name a data protection officer. The head of the organisation must designate one (section 6).",
          "Tell people what you collect and why before you collect it, and get their consent unless another lawful reason applies (sections 7 and 13).",
          "Collect only what you need and keep it only as long as you need it (sections 14 and 18).",
          "Get a parent or guardian's consent before processing a child's data (section 8). This matters for schools, training programmes and youth initiatives.",
          "Protect the data and report breaches. If personal data is accessed without authority, notify the Personal Data Protection Office immediately (sections 20 and 23).",
          "Take care when data leaves Uganda. Most cloud and AI tools store data abroad, and the Act sets conditions for processing outside Uganda (section 19).",
          "Let people say no to direct marketing (section 26), and give them a way to opt out of commercial messages.",
          "Respect rights on automated decisions. People have rights where a decision about them is taken by automated means alone (section 27). Keep a person in the loop for decisions that affect people.",
        ],
      },
      {
        heading: "Enforcement is now real",
        paragraphs: [
          "In July 2025 the Personal Data Protection Office found that Google had breached the Act by not registering, and ordered it to register within 30 days. It was the regulator's first major ruling against a global technology company, and it confirmed that registration applies to every qualifying organisation until specific exemptions are published.",
          "The same month, Uganda recorded its first criminal conviction under the Act, involving a director of a digital lending company. Offences such as unlawfully obtaining, disclosing or selling personal data can carry fines and imprisonment.",
        ],
      },
      {
        heading: "What about AI itself?",
        paragraphs: [
          "Uganda does not yet have an AI law or a published national AI strategy. The Ministry of ICT and National Guidance began drafting a National Strategy for Artificial Intelligence and Emerging Technologies in March 2026, held stakeholder workshops on the draft in May 2026, and is working on it with NITA-U. Until it is published, data protection law is the main rule book for AI in business.",
          "Other rules still apply to digital work. The Electronic Transactions Act, 2011 covers online transactions and unsolicited commercial communications. In March 2026 the Constitutional Court declared the Computer Misuse (Amendment) Act, 2022 null and void; the original Computer Misuse Act, 2011 remains.",
        ],
      },
      {
        heading: "How we apply this at Flame Connect",
        paragraphs: [
          "We hold ourselves to the same standard we recommend. Our website sets no advertising or tracking cookies, consent boxes are never ticked for you, and our privacy notice explains what each form collects and where it goes. When we design systems for clients, we map the personal data first, keep people in charge of decisions that affect people, and agree with the client what may and may not go into AI tools.",
        ],
      },
    ],
    actions: [
      "Check whether your organisation is registered with the Personal Data Protection Office, and when it is due for renewal.",
      "Name your data protection officer and write down who they report to.",
      "List every tool that holds customer or staff data, including AI tools, and where each one stores it.",
      "Write a one-page rule on what data may and may not go into AI tools.",
      "Check that every form you use explains what you collect and why, and that no consent box is ticked in advance.",
    ],
    limits: [
      "This article is general guidance, not legal advice. Speak to a qualified advocate about your organisation's specific obligations.",
      "Section numbers refer to the Act as passed in 2019. The Revised Laws of Uganda list it as Cap. 97, where numbering may differ.",
      "Uganda's AI and emerging technologies strategy was still in draft at the time of writing, and its content may change these recommendations.",
    ],
    relatedServiceSlug: "ai-in-business",
    relatedArticleSlugs: ["ai-adoption-african-business-2026", "five-questions-before-any-ai-tool"],
    sources: [
      { label: "Data Protection and Privacy Act, 2019 (Act 9 of 2019), ULII", href: "https://www.ulii.org/akn/ug/act/2019/9" },
      { label: "DLA Piper, Data protection laws of the world: Uganda", href: "https://www.dlapiperdataprotection.com/?c=UG&t=law" },
      { label: "PDPO press release: requirement to register (2 Nov 2021)", href: "https://demo.nita.go.ug/sites/default/files/2024-09/Press%20Release%20-%20Requirement%20to%20register%20with%20PDPO%20-%2002%20Nov%2021%281%29.pdf" },
      { label: "DLA Piper, Uganda regulator clarifies compliance requirements for offshore entities (Aug 2025)", href: "https://privacymatters.dlapiper.com/2025/08/uganda-data-protection-regulator-clarifies-compliance-requirements-for-offshore-entities" },
      { label: "Data Protection Gibraltar, Uganda jurisdiction notes: first criminal conviction under the Act (10 Jul 2025)", href: "https://dataprotection.gi/jurisdictions/uganda/" },
      { label: "Electronic Transactions Regulations, 2013 (Ministry of ICT)", href: "https://ict.go.ug/site/documents/Electronic-Transction-Regulations-SI-42-of-2013.pdf" },
      { label: "Ministry of ICT and National Guidance, stakeholder engagement on the National AI and Emerging Technologies Strategy (2026)", href: "https://ict.go.ug/media/news/ministry-engages-stakeholders-on-ugandas-national-emerging-technologies-strategy" },
      { label: "Tech Review Africa, Uganda begins stakeholder consultations on AI and emerging technologies strategy (2 May 2026)", href: "https://techreviewafrica.com/news/5257/uganda-begins-stakeholder-consultations-on-ai-and-emerging-technologies-strategy" },
      { label: "Nile Post, Constitutional Court declares key provisions of Computer Misuse law unconstitutional (17 Mar 2026)", href: "https://nilepost.co.ug/freedom%20of%20expression/328084/constitutional-court-declares-key-provisions-of-computer-misuse-law-unconstitutional" },
    ],
    seo: {
      title: "Uganda data protection and AI: a 2026 guide for businesses",
      description:
        "What Uganda's Data Protection and Privacy Act asks of businesses using data and AI tools, what the coming AI strategy means, and a five-step checklist.",
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
