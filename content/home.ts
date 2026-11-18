/** Homepage and shared page copy — from the website brief, sections 8 & 11. */

export const APPROACH_STAGES = [
  {
    key: "Assess",
    copy: "Understand goals, people, systems, data, constraints and readiness.",
  },
  {
    key: "Learn",
    copy: "Build the knowledge and confidence needed to make informed choices.",
  },
  {
    key: "Improve",
    copy: "Redesign the workflow, communication or experience before automating it.",
  },
  {
    key: "Implement",
    copy: "Deploy practical solutions, track adoption and scale with evidence.",
  },
] as const;

export const AFRICA_FIRST_POINTS = [
  "Mobile-first interfaces",
  "Low-bandwidth performance",
  "Practical language, not technical jargon",
  "Human support and capability building",
  "Context-aware workflows",
  "Evidence before scale",
] as const;

export const COMMUNITY_SURFACES = [
  {
    name: "Tools Lab",
    purpose: "Try useful tools and give feedback while they improve.",
    cta: "Explore the Tools Lab",
    href: "/products",
  },
  {
    name: "Playbooks",
    purpose: "Practical guides for applying AI and digital methods to everyday work.",
    cta: "Browse playbooks",
    href: "/resources?category=Playbooks",
  },
  {
    name: "Practice Lab",
    purpose: "Hands-on sessions that turn ideas into repeatable capability.",
    cta: "See practice formats",
    href: "/community#practice",
  },
  {
    name: "Flame Academy",
    purpose: "Structured learning for professionals, teams and organizations.",
    cta: "Explore Flame Academy",
    href: "/products/flame-academy",
  },
] as const;

export const COMMUNITY_PRINCIPLES = [
  "Participation should create learning, not only audience growth.",
  "Feedback from users should visibly influence tools and playbooks.",
  "Use plain language and show prerequisites for learning activities.",
  "Design community journeys to work on mobile and WhatsApp-friendly communication.",
  "Do not claim a continent-wide community before participation data supports it.",
] as const;

export const OPERATING_PRINCIPLES = [
  {
    name: "Practical",
    meaning: "Start with a real need and a useful outcome, not technology for its own sake.",
  },
  {
    name: "Clear & evidence-led",
    meaning: "Explain what a solution does, measure what changes and communicate limitations plainly.",
  },
  {
    name: "Human control",
    meaning: "Use AI to support people, not remove accountability from important decisions.",
  },
  {
    name: "Access-first",
    meaning: "Design for mobile use, bandwidth constraints, affordability and different levels of digital maturity.",
  },
  {
    name: "Community-built",
    meaning: "Learn with users, practitioners, businesses and communities rather than designing in isolation.",
  },
  {
    name: "Honest measurement",
    meaning: "Do not overstate impact, readiness, automation or intelligence. Make status and evidence visible.",
  },
] as const;

export const RESPONSIBLE_AI_COMMITMENTS = [
  "Human accountability remains with people and organizations for important decisions.",
  "Users should understand when AI is being used and what it is intended to do.",
  "High-impact recommendations should be reviewable rather than treated as unquestionable outputs.",
  "Data collection should be proportionate to the service and explained in plain language.",
  "Products should expose limitations, status and confidence where relevant.",
  "Testing should include African contexts and real user constraints, not only ideal connectivity and devices.",
  "Security, privacy, access control and auditability are treated as product requirements.",
] as const;

/* ------------------------------------------------------------------
   Marketing revamp (Nov 2026) — homepage + About narrative.
   Every line below restates positions already published elsewhere in
   this registry (services, articles, About, brand docs). No new
   metrics, clients, team members or statuses are introduced.
   Narrative: problem → practical change → method → evidence → CTA.
   ------------------------------------------------------------------ */

export const HOME_HERO = {
  eyebrow: "AI Centre of Change · Kampala, Uganda",
  title: "Practical AI for African progress.",
  lede:
    "Flame Connect helps organizations in Uganda and across Africa turn AI and digital ambition into work that actually changes — clearer communication, better decisions and workflows that hold up in real conditions.",
  points: ["Human-controlled AI", "Designed for mobile and low bandwidth", "Uganda-rooted, Africa-focused"],
} as const;

/** "Why change stalls" — condensed from the problem lists in content/services.ts. */
export const HOME_CHALLENGES = [
  {
    title: "Interest without direction",
    copy: "AI enthusiasm arrives before anyone has agreed which problem to solve — or what must stay with a person.",
  },
  {
    title: "Tools before process",
    copy: "Software is bought before the workflow is understood, so it automates confusion and is quietly shelved.",
  },
  {
    title: "Activity without outcomes",
    copy: "Campaigns and content generate noise, but not enquiries, decisions or change anyone can point to.",
  },
  {
    title: "Built for ideal conditions",
    copy: "Solutions assume constant connectivity, new devices and digital maturity that many teams do not have.",
  },
] as const;

/** Evidence we can show today — each item links to something that exists. */
export const HOME_PROOF_POINTS = [
  {
    label: "Field notes",
    title: "What early testers in Uganda changed",
    copy: "Qualitative notes from testing sessions: what broke, what we changed and why — published in the open.",
    href: "/resources/field-notes-what-early-testers-showed-us",
    cta: "Read the field notes",
  },
  {
    label: "Status board",
    title: "Every product, honestly labelled",
    copy: "Live, pilot or in development — one public board, one source of truth, no implied availability.",
    href: "/trust",
    cta: "See product status",
  },
  {
    label: "Case studies",
    title: "Published only with approval",
    copy: "Client names, logos and metrics appear only with written approval and verifiable evidence. Not before.",
    href: "/resources",
    cta: "How we write evidence",
  },
] as const;

/** About — the four-part model already described in the About story. */
export const ABOUT_MODEL = [
  {
    name: "Services",
    copy: "Advisory, communication and AI implementation work that starts from a real business problem.",
    href: "/services",
    cta: "Explore services",
  },
  {
    name: "Practical tools",
    copy: "The Flame product family, built on a shared platform layer — each tool shows its status openly.",
    href: "/products",
    cta: "See the tools",
  },
  {
    name: "Community",
    copy: "Practitioners, businesses and learners testing tools, sharing playbooks and building skills together.",
    href: "/community",
    cta: "Meet the community",
  },
  {
    name: "Thought leadership",
    copy: "Field notes, playbooks and research on AI and digital change in African contexts, with limits stated.",
    href: "/resources",
    cta: "Read resources",
  },
] as const;
