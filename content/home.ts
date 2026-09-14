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
