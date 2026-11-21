import type { ServiceArtKey } from "../components/services/ServiceArt";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceOfferingGroup {
  eyebrow: string;
  title: string;
  intro: string;
  items: { name: string; detail: string; art: ServiceArtKey }[];
}

export interface ServicePackage {
  name: "Essentials" | "Growth system";
  bestFor: string;
  includes: string[];
}

/**
 * Quote-only pricing (Product Owner, 20 Nov 2026). We say why there is no
 * price list and what changes the cost, following NN/g guidance.
 */
export const QUOTE_NOTE =
  "Every project is quoted after a free 30-minute call, because scope, the number of locations and the systems we connect to all change the cost. You get a fixed written quote before any work starts.";

export interface Service {
  slug: string;
  name: string;
  eyebrow: string;
  /** Card copy from brief section 8. */
  cardCopy: string;
  proposition: string;
  description: string;
  whoFor: string[];
  problems: string[];
  capabilities: string[];
  outputs: string[];
  outcomeStatement: string;
  /** Named sub-services, each with a one-line promise (research, 20 Nov 2026). */
  offerings?: ServiceOfferingGroup;
  /** Two quote-only ways to work with us. No prices are published. */
  packages?: [ServicePackage, ServicePackage];
  image: { src: string; alt: string };
  relatedProductSlugs: string[];
  faqs: ServiceFaq[];
  seo: { title: string; description: string };
}

/**
 * One method across the site (UI/UX audit, 19 Nov 2026): the same four steps
 * as the home page (APPROACH_STAGES). The earlier five activities (diagnose,
 * design, test, build capability, scale) now sit inside these four.
 */
export const ENGAGEMENT_STAGES = [
  {
    stage: "1. Assess",
    what: "Clarify the problem, where things stand now and the outcome you want.",
    outputs: "Discovery notes, audit, readiness view, challenge statement.",
  },
  {
    stage: "2. Learn",
    what: "Build the knowledge and confidence your team needs, and hand over ownership as we go.",
    outputs: "Training, playbooks, coaching, governance.",
  },
  {
    stage: "3. Improve",
    what: "Agree the approach and priorities, then pilot the redesigned workflow with real users.",
    outputs: "Roadmap, service or automation design, prototype, pilot, feedback.",
  },
  {
    stage: "4. Implement",
    what: "Put what works in place, connect it to how you operate and scale it with evidence.",
    outputs: "Implementation, dashboards, operating rhythm, impact review.",
  },
] as const;

/**
 * "Start from your challenge" — maps problems already listed on each
 * service (see `problems` below) to the service line that addresses them.
 * Used by the Services overview chooser (marketing revamp, Nov 2026).
 */
export const SERVICE_CHOOSER = [
  {
    challenge: "Our message is not landing, and our online presence does not move anyone to act.",
    serviceSlug: "digital-communications",
  },
  {
    challenge: "Our campaigns create activity, but not enquiries.",
    serviceSlug: "digital-communications",
  },
  {
    challenge: "We are interested in AI but have no agreed use cases or priorities.",
    serviceSlug: "ai-in-business",
  },
  {
    challenge: "Manual, repetitive work is taking up our skilled people's time.",
    serviceSlug: "ai-in-business",
  },
  {
    challenge: "We are under pressure to “do something with AI” but have no clear direction we can defend.",
    serviceSlug: "consulting-thought-leadership",
  },
  {
    challenge: "Our leadership team does not yet share the same picture of the problem.",
    serviceSlug: "consulting-thought-leadership",
  },
] as const;

export const SERVICES: Service[] = [
  {
    slug: "digital-communications",
    name: "Digital & Communications",
    eyebrow: "Service line A",
    cardCopy:
      "Build stronger brands, campaigns and digital presence with strategy, design, content and performance insight.",
    proposition:
      "Build a clearer brand, stronger digital presence and communication that people can understand, trust and act on.",
    description:
      "We help organisations turn strategy into communication across brand, content, campaigns and digital channels. The work can start with a digital presence audit or a single campaign and grow into a complete communications system.",
    whoFor: [
      "SME owners who need an online presence that brings in business",
      "Marketing and communications teams stretched across too many channels",
      "Institutions whose message is not landing the way it should",
    ],
    problems: [
      "A brand that looks different every time it appears in public",
      "Content going out with no clear audience, message or measure",
      "Campaigns that generate activity but not enquiries",
      "A website that describes the organisation but does not move anyone to act",
    ],
    capabilities: [
      "Brand strategy and positioning",
      "Brand identity and visual communication",
      "Digital marketing strategy and campaign planning",
      "Content strategy, copy and multimedia production",
      "Social media planning and performance improvement",
      "Digital presence audits and recommendations",
      "Website, landing-page and UI/UX direction",
      "Marketing analytics and reporting",
    ],
    outputs: [
      "Digital presence audit with prioritised fixes",
      "Brand strategy and messaging framework",
      "Campaign plan with measures that matter",
      "A content system with themes, formats and a realistic calendar",
      "Analytics setup and a reporting rhythm your team can run",
    ],
    outcomeStatement:
      "More content is not the goal. Clearer positioning, better communication and a measurable change in how people find, understand and engage with you are.",
    offerings: {
      eyebrow: "Content creation",
      title: "Content we create with you",
      intro: "Strategy decides what to say. Our studio makes it: designed, filmed, photographed and produced to one brand standard.",
      items: [
        { name: "Graphic design", detail: "Brand assets, social graphics, campaign artwork, presentations and reports that look like one organisation.", art: "design" },
        { name: "Video production", detail: "Corporate films, reels, interviews and event coverage, from script and storyboard to edit, captions and sound.", art: "video" },
        { name: "Photography", detail: "Team portraits, products, spaces and events, shot for your website, social channels and print.", art: "photo" },
        { name: "Print and physical brand assets", detail: "Signage, merchandise, event materials and printed collateral produced to your brand guidelines.", art: "print" },
        { name: "Copy and storytelling", detail: "Website copy, campaign messages, captions and scripts written for the people you want to reach.", art: "copy" },
        { name: "AI-assisted production", detail: "Faster drafts, variations and edits using AI tools, always reviewed by our team and labelled honestly.", art: "ai-content" },
      ],
    },
    packages: [
      {
        name: "Essentials",
        bestFor: "One clear piece of work with a defined end.",
        includes: [
          "A brand pack, a campaign or a single video project",
          "Brief, concepts and two rounds of revisions",
          "Final files in every format you need",
        ],
      },
      {
        name: "Growth system",
        bestFor: "A steady stream of content that builds over months.",
        includes: [
          "Monthly content plan across design, video and photography",
          "Production, scheduling support and a shared asset library",
          "Monthly reporting on what reached people and what they did",
        ],
      },
    ],
    image: {
      src: "/images/digital-communications.jpg",
      alt: "African creative and marketing team reviewing campaign assets and social analytics together in a Kampala studio.",
    },
    relatedProductSlugs: ["flame-os"],
    faqs: [
      {
        question: "Can you start with just an audit?",
        answer:
          "Yes. A digital presence audit is the best place to start. It gives us both an honest baseline and a prioritised list before any bigger commitment.",
      },
      {
        question: "Do you run campaigns as well as plan them?",
        answer:
          "We design, plan and support campaigns, and we train your team to run them. Longer engagements always include a handover plan, because we do not want you to depend on us.",
      },
      {
        question: "How do you measure communication success?",
        answer:
          "By what your audience actually does: enquiries, sign-ups, attendance and understanding. Raw impressions do not count. We agree the measures with you at the design stage.",
      },
    ],
    seo: {
      title: "Digital Communications & Branding in Uganda",
      description:
        "Brand strategy, digital campaigns and clear communication for businesses in Uganda and across Africa. Turn audience attention into action.",
    },
  },
  {
    slug: "ai-in-business",
    name: "AI in Business",
    eyebrow: "Service line B",
    cardCopy:
      "Find the right AI opportunities, automate useful workflows and build tools around how your organisation really works.",
    proposition:
      "Use AI where it removes friction, improves decisions or creates a better way of working.",
    description:
      "We help organisations go from interest in AI to using it day to day. Our work can include readiness assessments, workflow discovery, automation, custom tools, analytics, training and guidance on responsible use.",
    whoFor: [
      "Leadership teams who want an honest plan for adopting AI, without the sales demos",
      "Operations teams carrying manual, repetitive workflows",
      "Organisations that tried a tool and quietly shelved it",
    ],
    problems: [
      "Excitement about AI, but no agreed use cases or priorities",
      "Manual work taking up skilled people's time",
      "Tools bought before the process was understood",
      "No one inside who feels confident judging vendors' AI claims",
    ],
    capabilities: [
      "AI readiness and opportunity assessment",
      "Workflow mapping and automation",
      "Custom AI tools and internal assistants",
      "Sales, marketing and operations use cases",
      "Data analysis, dashboards and decision support",
      "AI adoption training and team enablement",
      "Responsible AI, governance and human oversight",
      "Pilot design, testing and implementation support",
    ],
    outputs: [
      "Readiness view and prioritised use-case register",
      "Mapped workflows with automation boundaries",
      "A scoped, tested pilot with measured results",
      "Governance guardrails and human-approval points",
      "Team enablement plan and operating playbooks",
    ],
    outcomeStatement:
      "The result should be a simpler process, a better decision or a measurable improvement in how you operate. AI is never the goal in itself.",
    offerings: {
      eyebrow: "Business systems",
      title: "Systems built around how you work",
      intro: "When spreadsheets, paper and scattered apps slow you down, we design and build one system for your operations, starting small and growing in stages.",
      items: [
        { name: "Business systems and ERP", detail: "Staff, finance, inventory, clients and orders in one place, built around your workflows rather than a vendor template.", art: "erp" },
        { name: "Workflow automation", detail: "Approvals, reminders, reports and hand-offs that run on their own, with people approving what matters.", art: "automation" },
        { name: "Payments and integrations", detail: "Mobile money, WhatsApp, booking and accounting tools connected so information is entered once.", art: "payments" },
        { name: "Dashboards and reporting", detail: "Live views of sales, operations and performance that leaders can act on.", art: "dashboards" },
        { name: "AI assistants and tools", detail: "Internal assistants and custom AI tools for the tasks where they genuinely save time.", art: "assistant" },
        { name: "Support after launch", detail: "Training, maintenance and improvements so the system keeps up as you grow.", art: "support" },
      ],
    },
    packages: [
      {
        name: "Essentials",
        bestFor: "Proving value on one process before committing further.",
        includes: [
          "One workflow mapped and automated, or a pilot module",
          "Testing with your team and a measured result",
          "A clear recommendation on what to build next",
        ],
      },
      {
        name: "Growth system",
        bestFor: "Running more of the organisation on one system.",
        includes: [
          "A business system rolled out module by module",
          "Integrations, dashboards, training and data migration",
          "Ongoing support and a quarterly improvement review",
        ],
      },
    ],
    image: {
      src: "/images/ai-in-business.jpg",
      alt: "Facilitator mapping a workflow with sticky notes alongside an East African business team in a working session.",
    },
    relatedProductSlugs: ["flame-os"],
    faqs: [
      {
        question: "We are not 'technical'. Is this for us?",
        answer:
          "Yes, especially. We start from business problems and build your team's skills as we go, so they grow more confident at every stage instead of more dependent on us.",
      },
      {
        question: "Do you sell or resell specific AI products?",
        answer:
          "No. We recommend approaches, sometimes including our own tools, and we always tell you when that is the case. If something else fits better, we say so.",
      },
      {
        question: "How do you handle risky use cases?",
        answer:
          "Every engagement includes guidance on responsible use: what should stay with people, what gets logged and what is tested before release. People can always review high-impact recommendations.",
      },
    ],
    seo: {
      title: "AI Consulting & Automation in Uganda",
      description:
        "Practical AI readiness, workflow automation and custom business tools in Uganda and across Africa, with responsible adoption and human oversight.",
    },
  },
  {
    slug: "consulting-thought-leadership",
    name: "Consulting & Thought Leadership",
    eyebrow: "Service line C",
    cardCopy:
      "Turn uncertainty into direction through strategy, research, workshops and practical transformation roadmaps.",
    proposition: "Make better choices about technology, transformation and growth.",
    description:
      "We support leadership teams, institutions and funders with strategy, research and structured problem-solving, and with a grounded view of how to approach digital and AI change in African settings.",
    whoFor: [
      "Executive teams making multi-year technology decisions",
      "Institutions and funders designing programmes or ecosystems",
      "Leaders who want an independent view they can trust on AI claims",
    ],
    problems: [
      "Strategy documents that fell apart once they met day-to-day operations",
      "Pressure to “do something with AI” without a direction you can defend",
      "Programmes designed far from the people they are meant to serve",
      "A leadership team that does not yet share the same picture of the problem",
    ],
    capabilities: [
      "Digital and AI transformation strategy",
      "Leadership workshops and executive briefings",
      "Research, insight and landscape analysis",
      "Innovation and product/service design",
      "Change and adoption planning",
      "Programme and ecosystem design",
      "Thought-leadership development",
      "Partnership and innovation-community facilitation",
    ],
    outputs: [
      "A transformation roadmap based on how your organisation really works",
      "Executive briefings your board can question and test",
      "Research and landscape analysis that is clear about the limits of its evidence",
      "Adoption and change plans with named ownership",
      "A prioritised action list: what to do first, and what to leave alone on purpose",
    ],
    outcomeStatement:
      "You leave with a clear direction, prioritised actions, named owners and a realistic plan for putting it into practice.",
    image: {
      src: "/images/thought-leadership.jpg",
      alt: "African technology and business leaders in candid strategy discussion around a roundtable in Kampala.",
    },
    relatedProductSlugs: ["flame-academy"],
    faqs: [
      {
        question: "How is your advice shaped for African organisations?",
        answer:
          "We design for the conditions organisations here really work in: mobile-first access, unreliable connectivity, tight budgets and how institutions actually run. We test our recommendations against those conditions instead of copying playbooks from elsewhere.",
      },
      {
        question: "Do you deliver one-off workshops?",
        answer:
          "Yes. Every workshop ends with something concrete, such as a prioritised list, a mapped workflow or an agreed governance position, so the energy in the room turns into action.",
      },
      {
        question: "Can you support research partnerships?",
        answer:
          "Yes. Research, landscape analysis and programme design are central to this service, and we publish selected findings openly when our partners agree.",
      },
    ],
    seo: {
      title: "Strategy & Leadership Consulting in Uganda",
      description:
        "Strategy, research, leadership workshops and transformation roadmaps for organisations in Uganda and across Africa working through digital and AI change.",
    },
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
