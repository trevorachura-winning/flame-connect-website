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
    "Flame Connect is an AI Centre of Change in Kampala. We help organisations across Africa put AI and digital tools to use in the conditions they actually face.",
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

/* ------------------------------------------------------------------
   Fireside story (UI/UX audit, 19 Nov 2026): the home page is told in
   seven chapters, the way stories are told around a fire.
   Scenes are drawn from our own published field notes and playbooks
   (content/articles.ts). They are composites with no names, so nothing
   is invented about a real client. Replace them with named, consented
   stories when we have them.
   ------------------------------------------------------------------ */

export const HOME_CHAPTERS = {
  call: "01 · The call",
  people: "02 · The people",
  trouble: "03 · The trouble",
  journey: "04 · The journey",
  tools: "05 · The tools",
  lessons: "06 · What we have learned",
  invitation: "07 · The invitation",
} as const;

export const HOME_PROVERB_OPEN = {
  text: "Until the lion learns to write, every story will glorify the hunter.",
  source: "African proverb",
  meaning:
    "Africans should help write the story of AI, as well as use it. That is why we exist.",
} as const;

export const HOME_SCENES = [
  {
    title: "The exercise book",
    copy: "A shop owner keeps years of customers in exercise books. She has the data. What she lacks is a simple way to follow up before a customer drifts away.",
    image: { src: "/images/sme-mobile.jpg", alt: "A Ugandan shop owner checking her phone beside a notebook in her shop.", width: 1024, height: 1536 },
  },
  {
    title: "The phones in the classroom",
    copy: "A school wants to teach digital skills. Its students already carry phones, but most courses it finds assume laptops and fast internet.",
    image: { src: "/images/community-learning.jpg", alt: "Young African learners working together with a facilitator in a learning session.", width: 1536, height: 1024 },
  },
  {
    title: "The tool nobody opens",
    copy: "A team bought software to save time. A few months later nobody opens it, because nobody mapped the work before it arrived.",
    image: { src: "/images/ai-in-business.jpg", alt: "A facilitator mapping a workflow with sticky notes alongside a business team.", width: 1536, height: 1024 },
  },
] as const;

export const HOME_SCENES_NOTE =
  "These scenes come up again and again in our work. They are drawn from our field notes and leave out names.";

export const HOME_PROVERB_CLOSE = {
  text: "If you want to go fast, go alone. If you want to go far, go together.",
  source: "African proverb",
} as const;
