/** Homepage and shared page copy — from the website brief, sections 8 & 11. */

export const APPROACH_STAGES = [
  {
    key: "Assess",
    copy: "Understand your goals, people, systems, data, constraints and readiness.",
  },
  {
    key: "Learn",
    copy: "Build the knowledge and confidence your team needs to make good choices.",
  },
  {
    key: "Improve",
    copy: "Redesign the workflow, message or experience before automating anything.",
  },
  {
    key: "Implement",
    copy: "Put practical solutions in place, track how they are used and scale what the evidence supports.",
  },
] as const;

export const AFRICA_FIRST_POINTS = [
  "Mobile-first interfaces",
  "Low-bandwidth performance",
  "Plain language instead of jargon",
  "Human support and capability building",
  "Context-aware workflows",
  "Evidence before scale",
] as const;



export const OPERATING_PRINCIPLES = [
  {
    name: "Practical",
    meaning: "Start with a real need and a useful result. The technology comes second.",
  },
  {
    name: "Clear & evidence-led",
    meaning: "Explain what a solution does, measure what changes and be plain about its limits.",
  },
  {
    name: "Human control",
    meaning: "AI supports people. Accountability for important decisions stays with them.",
  },
  {
    name: "Access-first",
    meaning: "Design for mobile use, bandwidth constraints, affordability and different levels of digital maturity.",
  },
  {
    name: "Community-built",
    meaning: "Learn alongside users, practitioners, businesses and communities instead of designing alone.",
  },
  {
    name: "Honest measurement",
    meaning: "Never overstate impact, readiness, automation or intelligence. Keep status and evidence visible.",
  },
] as const;

export const RESPONSIBLE_AI_COMMITMENTS = [
  "People and organisations stay accountable for important decisions.",
  "Users should know when AI is being used and what it is meant to do.",
  "High-impact recommendations should be open to review, never accepted without question.",
  "Data collection should match what the service needs and be explained in plain language.",
  "Products should show their limitations, status and confidence where it matters.",
  "Testing should include African settings and real constraints, such as patchy connectivity and older devices.",
  "Security, privacy, access control and auditability are product requirements.",
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
    "Flame Connect helps organisations in Uganda and across Africa put AI and digital tools to work. The result is clearer communication, better decisions and workflows that hold up in real conditions.",
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
    copy: "In a discovery consultation we work out the most useful next step. That might be a service, a tool, a learning path or a small pilot.",
    href: "/contact?intent=consultation",
    cta: "Book a discovery consultation",
    primary: true,
  },
  {
    title: "Get early access to our platforms",
    copy: "Flame OS for business growth and Flame Academy for digital skills are launching soon. Join early access to hear first.",
    href: "/products",
    cta: "Explore our products",
  },
  {
    title: "Read before you decide",
    copy: "Field notes, playbooks and perspectives. Each piece ends with practical actions and is clear about its limits.",
    href: "/resources",
    cta: "Browse resources",
  },
] as const;

/** "Why change stalls" — condensed from the problem lists in content/services.ts. */
export const HOME_CHALLENGES = [
  {
    title: "Interest without direction",
    copy: "Teams get excited about AI before anyone agrees which problem to solve, or what should stay with a person.",
  },
  {
    title: "Tools before process",
    copy: "Software gets bought before anyone understands the workflow. It automates the confusion and ends up quietly shelved.",
  },
  {
    title: "Activity without outcomes",
    copy: "Campaigns and content create noise, but no enquiries, decisions or change anyone can point to.",
  },
  {
    title: "Built for ideal conditions",
    copy: "Solutions assume constant connectivity, new devices and a level of digital maturity many teams do not have yet.",
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
    name: "Our platforms",
    copy: "Flame OS, the growth operating system for businesses, and Flame Academy for digital skills. Both are launching soon.",
    href: "/products",
    cta: "Explore our products",
  },
  {
    name: "Insights",
    copy: "Field notes, playbooks and perspectives on AI and digital change in African contexts.",
    href: "/resources",
    cta: "Read resources",
  },
] as const;
