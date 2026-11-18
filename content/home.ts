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
  /** Official master-logo signature (confirmed by the Product Owner, 18 Nov 2026). */
  signature: "Digitizing Africa.",
} as const;

/**
 * What a client leaves each method stage with — restated from the
 * ENGAGEMENT_STAGES outputs in content/services.ts (Diagnose → Assess,
 * Build capability → Learn, Design/Test → Improve, Scale → Implement).
 */
export const METHOD_OUTPUTS: Record<(typeof APPROACH_STAGES)[number]["key"], string> = {
  Assess: "A readiness view and a clear challenge statement.",
  Learn: "Training, playbooks and shared language for your team.",
  Improve: "A redesigned workflow, tested in a focused pilot.",
  Implement: "A working solution, a dashboard and an impact review.",
};

/** Homepage conversion pathways — every href is an existing on-site route. */
export const HOME_PATHWAYS = [
  {
    title: "Talk through a challenge",
    copy: "A discovery consultation to find the most useful next step — a service, a tool, a learning path or a focused pilot.",
    href: "/contact?intent=consultation",
    cta: "Book a discovery consultation",
    primary: true,
  },
  {
    title: "Get early access to Flame Sales",
    copy: "Our CRM and marketing-automation platform for African businesses is launching soon. Be among the first to use it.",
    href: "/products",
    cta: "Meet Flame Sales",
  },
  {
    title: "Read before you decide",
    copy: "Field notes, playbooks and perspectives — each piece ends with actions and stated limits.",
    href: "/resources",
    cta: "Browse resources",
  },
] as const;

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


/** About — how the work fits together (launch line-up, Nov 2026). */
export const ABOUT_MODEL = [
  {
    name: "Services",
    copy: "Advisory, communication and AI implementation work that starts from a real business problem.",
    href: "/services",
    cta: "Explore services",
  },
  {
    name: "Flame Sales",
    copy: "Our CRM and marketing-automation platform for African businesses — launching soon.",
    href: "/products",
    cta: "Meet Flame Sales",
  },
  {
    name: "Insights",
    copy: "Field notes, playbooks and perspectives on AI and digital change in African contexts.",
    href: "/resources",
    cta: "Read resources",
  },
] as const;
