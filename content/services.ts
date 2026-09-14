export interface ServiceFaq {
  question: string;
  answer: string;
}

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
  image: { src: string; alt: string };
  relatedProductSlugs: string[];
  faqs: ServiceFaq[];
  seo: { title: string; description: string };
}

export const ENGAGEMENT_STAGES = [
  {
    stage: "1. Diagnose",
    what: "Clarify the problem, current state and desired outcome.",
    outputs: "Discovery notes, audit, readiness view, challenge statement.",
  },
  {
    stage: "2. Design",
    what: "Define the approach, priority interventions and success measures.",
    outputs: "Roadmap, concept, service design, content or automation plan.",
  },
  {
    stage: "3. Test",
    what: "Pilot with users, teams or a limited workflow.",
    outputs: "Prototype, pilot, test content, feedback.",
  },
  {
    stage: "4. Build capability",
    what: "Transfer understanding and practical ownership.",
    outputs: "Training, playbooks, coaching, governance.",
  },
  {
    stage: "5. Scale with evidence",
    what: "Improve, integrate and expand what is working.",
    outputs: "Implementation, dashboards, operating rhythm, impact review.",
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
      "We help organizations translate strategy into communication across brand, content, campaigns and digital channels. The work can start with a digital presence audit or a specific campaign and grow into a more complete communications system.",
    whoFor: [
      "SME owners who need a digital presence that actually converts",
      "Marketing and communications teams stretched across too many channels",
      "Institutions whose message is not landing the way it should",
    ],
    problems: [
      "A brand that looks different every time it appears in public",
      "Content going out with no clear audience, message or measure",
      "Campaigns that generate activity but not enquiries",
      "A website that describes the organization but does not move anyone to act",
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
      "Content system — themes, formats and a realistic calendar",
      "Analytics setup and a reporting rhythm your team can run",
    ],
    outcomeStatement:
      "The goal is not more content. It is clearer positioning, better communication and measurable improvement in how audiences find, understand and engage with the organization.",
    image: {
      src: "/images/digital-communications.jpg",
      alt: "African creative and marketing team reviewing campaign assets and social analytics together in a Kampala studio.",
    },
    relatedProductSlugs: ["flame-lens", "flame-reach"],
    faqs: [
      {
        question: "Can you start with just an audit?",
        answer:
          "Yes — a digital presence audit is the recommended starting point. It gives both sides an honest baseline and a prioritised list before any larger commitment.",
      },
      {
        question: "Do you run campaigns as well as plan them?",
        answer:
          "We design, plan and support campaigns, and we build your team's capability to run them. Long engagements always include a handover plan — dependency is not the business model.",
      },
      {
        question: "How do you measure communication success?",
        answer:
          "Against defined audience actions — enquiries, sign-ups, attendance, comprehension — not raw impressions. We agree the measures with you at the design stage.",
      },
    ],
    seo: {
      title: "Digital & Communications — Flame Connect",
      description:
        "Brand strategy, campaigns, content and digital presence built around clarity and measurable audience response in African markets.",
    },
  },
  {
    slug: "ai-in-business",
    name: "AI in Business",
    eyebrow: "Service line B",
    cardCopy:
      "Find the right AI opportunities, automate useful workflows and build tools around how your organization actually works.",
    proposition:
      "Use AI where it removes friction, improves decisions or creates a better way of working.",
    description:
      "We help organizations move from AI interest to practical adoption. Engagements can include readiness assessment, workflow discovery, automation, custom tools, analytics, training and responsible-use guidance.",
    whoFor: [
      "Leadership teams who need an honest AI adoption plan, not a demo tour",
      "Operations teams carrying manual, repetitive workflows",
      "Organizations that tried a tool and quietly shelved it",
    ],
    problems: [
      "AI enthusiasm with no agreed use cases or priorities",
      "Manual workflows consuming skilled people's time",
      "Tools bought before the process was understood",
      "No internal confidence to judge AI claims from vendors",
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
      "The result should be a simpler process, a stronger decision or a measurable operational improvement — not AI for its own sake.",
    image: {
      src: "/images/ai-in-business.jpg",
      alt: "Facilitator mapping a workflow with sticky notes alongside an East African business team in a working session.",
    },
    relatedProductSlugs: ["flame-ready", "flame-sales", "flame-forge"],
    faqs: [
      {
        question: "We are not 'technical'. Is this for us?",
        answer:
          "Especially yes. Our work starts from business problems and builds internal capability as it goes, so your team grows more confident with every stage rather than more dependent on us.",
      },
      {
        question: "Do you sell or resell specific AI products?",
        answer:
          "No. We recommend approaches — including our own tools where they fit — and we are explicit about that interest. Where something else fits better, we say so.",
      },
      {
        question: "How do you handle risky use cases?",
        answer:
          "Every engagement includes responsible-use guidance: what should stay human, what is logged, what is tested before release. High-impact recommendations are always reviewable by people.",
      },
    ],
    seo: {
      title: "AI in Business — Flame Connect",
      description:
        "AI readiness, workflow automation, custom tools and responsible adoption for African businesses — practical work with measurable outcomes.",
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
      "We support leadership teams and ecosystem actors with strategy, research, structured problem-solving and informed perspectives on how digital and AI change should be approached in African contexts.",
    whoFor: [
      "Executive teams making multi-year technology decisions",
      "Institutions and funders designing programmes or ecosystems",
      "Leaders who need a trusted, independent perspective on AI claims",
    ],
    problems: [
      "Strategy documents that never survived contact with operations",
      "Pressure to 'do something with AI' without a defensible direction",
      "Programmes designed far from the realities they aim to serve",
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
      "A transformation roadmap grounded in your operating reality",
      "Executive briefing materials your board can interrogate",
      "Research and landscape analysis with stated evidence limits",
      "Adoption and change plans with named ownership",
      "A prioritised action list — what to do first, and what to deliberately not do",
    ],
    outcomeStatement:
      "Clients leave with a clearer direction, prioritized actions, defined ownership and an implementation path grounded in their reality.",
    image: {
      src: "/images/thought-leadership.jpg",
      alt: "African technology and business leaders in candid strategy discussion around a roundtable in Kampala.",
    },
    relatedProductSlugs: ["flame-ready", "flame-impact"],
    faqs: [
      {
        question: "What makes your advice 'African-context' rather than generic?",
        answer:
          "We design for the constraints that actually operate here — mobile-first access, variable connectivity, affordability, institutional realities — and we test recommendations against them rather than copying playbooks from elsewhere.",
      },
      {
        question: "Do you deliver one-off workshops?",
        answer:
          "Yes, but every workshop ends in a decision artefact — a prioritised list, a mapped workflow, a governance position — so a room full of energy converts into action.",
      },
      {
        question: "Can you support research partnerships?",
        answer:
          "Yes. Research, landscape analysis and programme design are core to this service line, and we publish selected findings openly when partners agree.",
      },
    ],
    seo: {
      title: "Consulting & Thought Leadership — Flame Connect",
      description:
        "Strategy, research, leadership workshops and transformation roadmaps for digital and AI change in African contexts.",
    },
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
