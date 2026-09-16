import type { Intent } from "../lib/site";

export type ProductStatus = "live" | "pilot" | "development";

export type ProductCtaKind = "try" | "access" | "waitlist" | "talk";

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  name: string;
  /** One-line value statement used on cards. From brief section 10. */
  purpose: string;
  /** Job-to-be-done headline for the product detail hero. */
  headline: string;
  body: string;
  status: ProductStatus;
  statusNote: string;
  audiences: string[];
  outcomes: string[];
  howItWorks: { title: string; body: string }[];
  trustNotes: string[];
  requirements: string[];
  faqs: ProductFaq[];
  cta: { kind: ProductCtaKind; label: string; intent: Intent };
  relatedServiceSlug: string;
  seo: { title: string; description: string };
}

export const STATUS_LABEL: Record<ProductStatus, string> = {
  live: "Live",
  pilot: "Pilot",
  development: "In development",
};

/**
 * Statuses trace to docs/PLATFORM_STATUS.md in the platform repository:
 * statuses reflect the real deployment state, confirmed with the founder
 * (Sept 2026): Flame Sales is deployed with sign-in live for pilot teams and
 * is labelled "Pilot"; tools still being built in the platform (Lens, Ready,
 * Academy, Forge, Reach, Impact) are plainly "In development". Nothing here
 * claims availability a visitor cannot actually reach.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "flame-sales",
    name: "Flame Sales",
    purpose: "Sales workflow, pipeline discipline, follow-up and commercial insight.",
    headline: "Turn sales activity into a clearer operating rhythm.",
    body: "Flame Sales supports pipeline visibility, lead prioritisation, follow-up discipline and practical sales insight so teams can spend less time chasing information and more time moving the right opportunities forward.",
    status: "pilot",
    statusNote:
      "Pilot — deployed and sign-in is live; access is currently limited to a group of teams while we validate usefulness, reliability and fit.",
    audiences: ["Sales teams", "Founders", "Commercial leaders"],
    outcomes: [
      "See the pipeline clearly without rebuilding spreadsheets every week.",
      "Prioritise leads with explainable scoring, not black-box rankings.",
      "Keep follow-up discipline visible with daily focus and reminders.",
      "Turn reviews into action with prep briefs, debriefs and coaching prompts.",
    ],
    howItWorks: [
      {
        title: "Bring your leads",
        body: "Start with CSV or Excel — the workflow your team already has — with schema mapping and data-quality checks before anything is scored.",
      },
      {
        title: "Score and focus",
        body: "Deterministic, versioned scoring ranks opportunities and proposes a daily focus list. Every recommendation carries its rationale.",
      },
      {
        title: "Review and improve",
        body: "Prep briefs, debriefs and pipeline health reviews turn activity into a repeatable operating rhythm your team owns.",
      },
    ],
    trustNotes: [
      "Scoring is deterministic and versioned; AI narrative falls back to the deterministic baseline when a model is unavailable.",
      "Customer content is not used to train models by default.",
      "Workspace data is organization-scoped with row-level security by design.",
      "Consequential actions stay human-approved.",
    ],
    requirements: ["A lead list in CSV or Excel format is enough to start."],
    faqs: [
      {
        question: "Do we need to change our CRM to use Flame Sales?",
        answer:
          "No. The pilot is intentionally CSV/Excel-first. Expensive connector work only follows once the workflow and data permissions are validated with real teams.",
      },
      {
        question: "Who is in the pilot group?",
        answer:
          "A small group of sales teams and founders working with us directly. Request access and we will tell you honestly whether the current pilot stage fits your situation.",
      },
      {
        question: "Is our customer data safe?",
        answer:
          "The workspace is organization-scoped with row-level security, tenant-isolation test harnesses and deterministic scoring. Production validation is still in progress, which is why access is currently limited rather than open to everyone.",
      },
    ],
    cta: { kind: "try", label: "Sign in to Flame Sales", intent: "access" },
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "Flame Sales — Sales AI built for African teams",
      description:
        "Flame Sales brings pipeline visibility, lead prioritisation and follow-up discipline to sales teams. Currently in pilot with a limited group.",
    },
  },
  {
    slug: "flame-lens",
    name: "Flame Lens",
    purpose: "Digital and social performance insight with practical recommendations.",
    headline: "See what your digital presence is telling you.",
    body: "Flame Lens is designed to bring social and digital performance signals into one clearer view, then translate them into practical recommendations for what to improve next.",
    status: "development",
    statusNote:
      "In development — being built as part of the Flame platform alongside Flame Sales. Join the waitlist and we will share progress honestly.",
    audiences: ["Marketing teams", "Communications teams", "Business owners"],
    outcomes: [
      "Score your digital presence against a practical public framework.",
      "Get a prioritised list of what to improve next, in plain language.",
      "Focus effort where it changes results rather than chasing vanity metrics.",
    ],
    howItWorks: [
      {
        title: "Answer grounded questions",
        body: "Describe your channels, activity and evidence. The design avoids requiring account connections.",
      },
      {
        title: "Receive a scored view",
        body: "A deterministic scoring model turns your answers into a growth score with visible rationale.",
      },
      {
        title: "Act on the next step",
        body: "Recommendations are ordered by likely impact and effort so a small team can start this week.",
      },
    ],
    trustNotes: [
      "The design avoids collecting sensitive data while the workflow is still being validated.",
      "Recommendations come with rationale; nothing is presented as an unquestionable output.",
    ],
    requirements: ["Planned to work in the browser without accounts to connect."],
    faqs: [
      {
        question: "Is this connected to my social accounts?",
        answer:
          "No. Manual and evidence-first scoring comes before connectors, so the approach can be evaluated without handing over credentials.",
      },
      {
        question: "When will Flame Lens be available?",
        answer:
          "It is in development as part of the Flame platform. Join the waitlist and we will share honest progress updates as it is built.",
      },
    ],
    cta: { kind: "waitlist", label: "Join the waitlist", intent: "waitlist" },
    relatedServiceSlug: "digital-communications",
    seo: {
      title: "Flame Lens — Digital performance insight",
      description:
        "Flame Lens turns digital and social performance signals into practical, prioritised recommendations. In development as part of the Flame platform.",
    },
  },
  {
    slug: "flame-ready",
    name: "Flame Ready",
    purpose: "AI readiness assessment and priority-setting for organizations.",
    headline: "Know where AI can actually help.",
    body: "Flame Ready helps organizations assess AI readiness, identify priority use cases and surface the capability, data, governance and process gaps that should be addressed before scale.",
    status: "development",
    statusNote:
      "In development — being built as part of the Flame platform. Join the waitlist for honest progress updates.",
    audiences: ["Leadership teams", "Transformation leads", "Technology leaders"],
    outcomes: [
      "A shared, honest view of readiness across capability, data, governance and process.",
      "Priority use cases selected around real work, not hype.",
      "A gap list that tells you what to fix before you scale anything.",
    ],
    howItWorks: [
      {
        title: "Rate your current reality",
        body: "Work through structured questions about people, data, process and governance — alone or as a team exercise.",
      },
      {
        title: "See your readiness profile",
        body: "Deterministic scoring produces a readiness view with stated assumptions, not a magic number.",
      },
      {
        title: "Choose priorities",
        body: "Map automation opportunities and choose one or two use cases worth a focused pilot.",
      },
    ],
    trustNotes: [
      "Results are a starting point for a conversation, not a certification.",
      "Assessment answers stay minimal; sensitive details are not required.",
    ],
    requirements: ["Fifteen to twenty focused minutes; better with a colleague from operations."],
    faqs: [
      {
        question: "Who should complete the assessment?",
        answer:
          "Ideally a leader plus someone close to the day-to-day workflow. Different answers between roles are often the most useful signal.",
      },
      {
        question: "What happens after the score?",
        answer:
          "You get a prioritised gap list and candidate use cases. If you want, we can turn that into a scoped pilot through an AI in Business engagement.",
      },
    ],
    cta: { kind: "waitlist", label: "Join the waitlist", intent: "waitlist" },
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "Flame Ready — AI readiness assessment",
      description:
        "Assess your organization's AI readiness, identify priority use cases and surface the gaps to fix before scale. In development as part of the Flame platform.",
    },
  },
  {
    slug: "flame-academy",
    name: "Flame Academy",
    purpose: "Practical learning for AI, digital work and transformation capability.",
    headline: "Build capability people can use at work.",
    body: "Flame Academy brings practical AI and digital learning into structured pathways for professionals, teams and organizations, with a focus on application rather than theory alone.",
    status: "development",
    statusNote:
      "In development — planned as part of the Flame platform. Join the waitlist and we will share progress honestly.",
    audiences: ["Professionals", "Teams", "Organizations"],
    outcomes: [
      "Personalised learning paths from a practical role diagnostic.",
      "Evidence-based tasks that turn learning into visible capability.",
      "A shared language for AI adoption across a whole team.",
    ],
    howItWorks: [
      {
        title: "Diagnose your starting point",
        body: "A short role diagnostic identifies where you are and what would genuinely stretch you next.",
      },
      {
        title: "Follow a structured path",
        body: "Learn in sequences designed around application — each unit ends in something you make or change at work.",
      },
      {
        title: "Show the evidence",
        body: "Collect artefacts of real work: a mapped workflow, a measured campaign, a reviewed automation.",
      },
    ],
    trustNotes: [
      "Academy diagnostics inform learning; they are not employee-performance scoring.",
      "Curricula are versioned and reviewed; claims about outcomes are kept honest.",
    ],
    requirements: ["A phone or laptop and a real work challenge to apply learning to."],
    faqs: [
      {
        question: "Is this a certification?",
        answer:
          "No — and we say that plainly. The Academy focuses on applied capability and evidence of work, not certificates detached from practice.",
      },
      {
        question: "Can a whole team join?",
        answer:
          "Yes — team and organizational formats are planned. Tell us the size and goal of your group when you join the waitlist.",
      },
    ],
    cta: { kind: "waitlist", label: "Join the waitlist", intent: "waitlist" },
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "Flame Academy — Practical AI & digital learning",
      description:
        "Structured, application-first AI and digital learning for African professionals, teams and organizations. In development as part of the Flame platform.",
    },
  },
  {
    slug: "flame-forge",
    name: "Flame Forge",
    purpose: "Custom automation and AI tool-building around business workflows.",
    headline: "Build around the workflow you really have.",
    body: "Flame Forge is the pathway for custom automation, internal assistants and practical AI tools designed around a specific business process or operational need.",
    status: "development",
    statusNote:
      "In development — delivered today as a scoped AI in Business engagement while the self-serve pathway is being designed.",
    audiences: ["Organizations with a defined workflow or automation challenge"],
    outcomes: [
      "A working automation shaped to your actual process, not a template.",
      "Clear controls: what is automated, what stays human, what is logged.",
      "Playbooks and training so the tool survives without us in the room.",
    ],
    howItWorks: [
      {
        title: "Map the workflow",
        body: "We document the real process — including the messy exceptions — before anything is built.",
      },
      {
        title: "Pilot a narrow build",
        body: "One bounded automation or assistant, tested with the people who will use it, measured against a baseline.",
      },
      {
        title: "Harden and hand over",
        body: "Telemetry, access control and a monitoring cadence are added before the tool is treated as operational.",
      },
    ],
    trustNotes: [
      "Every Forge build states its automation boundaries and human-approval points in writing.",
      "No Forge build is presented as 'fully autonomous'; accountability remains with people.",
    ],
    requirements: ["A defined process or bottleneck, and an owner on your side."],
    faqs: [
      {
        question: "Is Flame Forge a product or a service?",
        answer:
          "Today it is service-led: a scoped engagement through AI in Business. The self-serve product pathway is in development exactly because we want the service lessons to shape it.",
      },
      {
        question: "What kinds of builds qualify?",
        answer:
          "Narrow and valuable: document triage with human approval, lead follow-up assistants, report generation with review steps. We turn down work where automation would hide accountability.",
      },
    ],
    cta: { kind: "talk", label: "Start a Forge conversation", intent: "consultation" },
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "Flame Forge — Custom AI tools & automation",
      description:
        "Custom automation, internal assistants and practical AI tools built around your real workflow — currently delivered as scoped engagements.",
    },
  },
  {
    slug: "flame-reach",
    name: "Flame Reach",
    purpose: "Digital communications, campaign reach and audience growth capability.",
    headline: "Connect communication to measurable reach.",
    body: "Flame Reach is the working product direction for helping teams plan, improve and understand digital communication, campaigns and audience growth.",
    status: "development",
    statusNote:
      "In development — we are testing the problem, workflow and experience before wider release.",
    audiences: ["Marketing teams", "Communications teams"],
    outcomes: [
      "Campaign planning grounded in audience reality, not channel fashion.",
      "Draft support with human approval before anything is published.",
      "A clearer view of what reached people and what changed as a result.",
    ],
    howItWorks: [
      {
        title: "Plan with context",
        body: "Structure campaign ideas around audience, message and channel with guided workflows.",
      },
      {
        title: "Draft with approval gates",
        body: "AI-assisted drafts are always reviewed by a person before anything leaves the building.",
      },
      {
        title: "Learn per campaign",
        body: "Post-campaign reviews capture what worked so each campaign makes the next one smarter.",
      },
    ],
    trustNotes: [
      "Human-approved drafts only; no automatic posting to social accounts.",
      "The dedicated product is in development; no live posting capability is claimed until it exists.",
    ],
    requirements: [],
    faqs: [
      {
        question: "When will Flame Reach be available?",
        answer:
          "We publish before we polish: join the waitlist and you will hear when access expands, with an honest description of what the first version does and does not do.",
      },
    ],
    cta: { kind: "waitlist", label: "Join the waitlist", intent: "waitlist" },
    relatedServiceSlug: "digital-communications",
    seo: {
      title: "Flame Reach — Campaign reach & audience growth",
      description:
        "Plan, improve and understand digital communication and audience growth. In development — join the waitlist for honest updates.",
    },
  },
  {
    slug: "flame-impact",
    name: "Flame Impact",
    purpose: "Measurement, outcomes and performance learning for interventions.",
    headline: "Measure what changed, not only what happened.",
    body: "Flame Impact is the working product direction for outcome tracking, learning and performance measurement across programmes, interventions and digital change initiatives.",
    status: "development",
    statusNote:
      "In development — we are testing the problem, workflow and experience before wider release.",
    audiences: ["Programme teams", "Transformation leads", "Leadership teams"],
    outcomes: [
      "Define the change you expect before you measure anything.",
      "Track outcomes alongside activity so busywork is not mistaken for progress.",
      "Build an honest evidence base for boards, funders and the public.",
    ],
    howItWorks: [
      {
        title: "Define outcomes",
        body: "Translate a programme into a small set of outcome indicators with defined collection methods.",
      },
      {
        title: "Collect aggregate-first data",
        body: "Measure at cohort level by default; participant-level sensitive data is avoided unless clearly justified.",
      },
      {
        title: "Review and adapt",
        body: "Structured reviews ask what changed, for whom, and what should be done differently.",
      },
    ],
    trustNotes: [
      "Aggregate-first measurement by design, to be delivered through the Flame platform.",
      "We do not publish impact claims without a stated method and an owner.",
    ],
    requirements: [],
    faqs: [
      {
        question: "Who is Flame Impact for?",
        answer:
          "Programme and transformation teams who need credible outcome evidence without building a monitoring department from scratch.",
      },
    ],
    cta: { kind: "waitlist", label: "Join the waitlist", intent: "waitlist" },
    relatedServiceSlug: "consulting-thought-leadership",
    seo: {
      title: "Flame Impact — Outcome measurement & learning",
      description:
        "Outcome tracking and performance learning for programmes and change initiatives. In development — join the waitlist.",
    },
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
