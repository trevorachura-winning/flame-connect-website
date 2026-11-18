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
  /** Flagship feature pillars (one platform, several capabilities). */
  features?: { name: string; icon: "workflow" | "megaphone" | "chart" | "spark" | "users" | "target" | "graduation" | "book" | "handshake" | "layers"; copy: string }[];
  /** Short descriptor shown with the name, e.g. "The growth operating system". */
  tagline?: string;
  /** Hero / card photograph (existing approved imagery). */
  image?: { src: string; alt: string; width: number; height: number };
  /** Eyebrow category line for the product page. */
  category?: string;
  seo: { title: string; description: string };
}

export const STATUS_LABEL: Record<ProductStatus, string> = {
  live: "Live",
  pilot: "Pilot",
  development: "Launching soon",
};

/**
 * Launch line-up (Product Owner decisions, 18 Nov 2026): TWO products.
 *  · Flame OS — the growth operating system for African businesses: CRM +
 *    marketing automation (ActiveCampaign-style). Formerly "Flame Sales";
 *    the earlier separate tools are its capabilities.
 *  · Flame Academy — digital-skills platform for the education sector:
 *    learning paths, Flame Clubs, facilitator tools, projects.
 * Neither has shipped: status "development", shown as "Launching soon".
 * Copy uses "built to"/"designed" language — nothing claims availability.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "flame-os",
    name: "Flame OS",
    purpose: "CRM, campaigns, automations and insight in one platform, so African businesses can win and keep more customers.",
    tagline: "The growth operating system for African businesses",
    category: "CRM & marketing automation",
    image: {
      src: "/images/field-operations.jpg",
      alt: "Two professionals reviewing customer follow-ups on a tablet outside a small business in an East African city.",
      width: 1536,
      height: 1024,
    },
    headline: "Win and keep more customers, from one simple platform.",
    body: "Flame OS brings your contacts, sales pipeline, campaigns and follow-up together. It is designed for teams who work from their phones, on everyday connections, and for the way business really runs across Africa.",
    status: "development",
    statusNote:
      "Flame OS is launching soon. Join early access to hear first, see it before public launch and help shape what it does.",
    audiences: ["SMEs and growing businesses", "Sales and marketing teams", "Founders and commercial leaders"],
    features: [
      {
        name: "Contacts & pipeline",
        icon: "users",
        copy: "Every customer, lead and deal in one place, with a clear pipeline and a daily list of who to follow up with next.",
      },
      {
        name: "Campaigns & reach",
        icon: "megaphone",
        copy: "Plan campaigns, reach the right audience segments and keep your message consistent across channels.",
      },
      {
        name: "Automations",
        icon: "workflow",
        copy: "Turn repeat work like follow-ups, reminders and hand-offs into simple automated workflows that your team stays in control of.",
      },
      {
        name: "Insights & reporting",
        icon: "chart",
        copy: "See what is working across sales and marketing, with scores that explain themselves in plain language.",
      },
    ],
    outcomes: [
      "See your whole pipeline without rebuilding spreadsheets every week.",
      "Focus on the leads most likely to convert, with reasons you can check.",
      "Stop follow-ups slipping through the cracks with reminders and automated next steps.",
      "Know which campaigns bring in real customers, not just clicks.",
    ],
    howItWorks: [
      {
        title: "Bring your contacts",
        body: "Start from the spreadsheet or list you already have. Import, clean and organise it in minutes, with no expensive migration.",
      },
      {
        title: "Automate the follow-up",
        body: "Set up campaigns, reminders and simple workflows so the right customer hears from you at the right time.",
      },
      {
        title: "Grow with insight",
        body: "Track your pipeline and campaign results in one view, then put more into what is working.",
      },
    ],
    trustNotes: [
      "Your customer data stays yours and is not used to train AI models by default.",
      "Every organisation's data is kept separate and access-controlled.",
      "AI suggestions come with their reasons, and important actions stay with your team.",
      "Designed for mobile phones and unreliable connections from the start.",
    ],
    requirements: ["A contact list in CSV or Excel is enough to start."],
    faqs: [
      {
        question: "When does Flame OS launch?",
        answer:
          "We are preparing for launch now. Early-access members hear first and get to see the platform before it opens publicly.",
      },
      {
        question: "Do we need to replace our current tools?",
        answer:
          "No. Flame OS is designed to start from the spreadsheets and lists you already use, so you can begin without a costly migration.",
      },
      {
        question: "Who is Flame OS for?",
        answer:
          "Small and growing businesses, sales and marketing teams, and founders who want one simple place to manage customers, campaigns and follow-up.",
      },
      {
        question: "How much will it cost?",
        answer:
          "Pricing will be shared with early-access members ahead of public launch. If you are planning a budget now, book a conversation and we will talk it through.",
      },
    ],
    cta: { kind: "waitlist", label: "Join early access", intent: "waitlist" },
    relatedServiceSlug: "ai-in-business",
    seo: {
      title: "Flame OS: CRM and marketing automation for African businesses",
      description:
        "Flame OS brings contacts, pipeline, campaigns and automated follow-up into one simple platform built for African businesses. Launching soon. Join early access.",
    },
  },
  {
    slug: "flame-academy",
    name: "Flame Academy",
    tagline: "Digital skills for Africa's next generation",
    category: "Digital skills & learning platform",
    purpose: "A digital skills platform for Africa's education sector. Learning paths, Flame Clubs and practical projects prepare young people for the digital economy.",
    headline: "Equip young Africans with the digital skills that open doors.",
    body: "Flame Academy helps schools, universities, training institutions and youth programmes teach practical digital and AI skills. It uses structured learning paths, Flame Clubs and real-world projects, and it is designed for mobile phones and everyday connections.",
    image: {
      src: "/images/community-learning.jpg",
      alt: "Young African learners and a facilitator working together on digital skills in a collaborative session.",
      width: 1536,
      height: 1024,
    },
    status: "development",
    statusNote:
      "Flame Academy is launching soon. Schools, institutions and youth programmes can register interest now to join the first partner cohort.",
    audiences: ["Schools and universities", "Training institutions and TVETs", "Youth programmes and NGOs", "Governments and development partners"],
    features: [
      {
        name: "Learning paths",
        icon: "book",
        copy: "Practical, structured courses in digital literacy, AI basics, content creation, digital marketing and entrepreneurship, built for learning on a phone.",
      },
      {
        name: "Flame Clubs",
        icon: "users",
        copy: "Digital skills clubs for schools, campuses and communities, with ready-to-run club guides, weekly challenges and team projects.",
      },
      {
        name: "Facilitator & institution tools",
        icon: "layers",
        copy: "Simple tools for teachers, club leads and programme managers to run cohorts, follow progress and support every learner.",
      },
      {
        name: "Projects & recognition",
        icon: "graduation",
        copy: "Learners build real projects and showcase their work, with certificates of completion that recognise what they can do.",
      },
    ],
    outcomes: [
      "Young people gain practical digital and AI skills they can use for work and enterprise.",
      "Schools and institutions can run digital skills programmes without building them from scratch.",
      "Clubs turn learning into a habit, with peer support, challenges and shared projects.",
      "Partners can follow participation and progress across their programmes.",
    ],
    howItWorks: [
      {
        title: "Partner with us",
        body: "Your school, institution or programme sets up Flame Academy with the learning paths and club format that fit your learners.",
      },
      {
        title: "Learn, practise, build",
        body: "Learners follow practical paths, meet in Flame Clubs and use their new skills on real projects, all on the phones they already have.",
      },
      {
        title: "Showcase and grow",
        body: "Learners showcase their work and earn certificates of completion, while facilitators follow progress and plan what comes next.",
      },
    ],
    trustNotes: [
      "Designed for mobile phones, shared devices and unreliable connections.",
      "Safeguarding and age-appropriate design are requirements for every learner experience.",
      "We collect only the learner information a programme needs.",
      "Built with African educators, for African learners and contexts.",
    ],
    requirements: ["A group of learners and a facilitator or club lead are enough to start."],
    faqs: [
      {
        question: "When does Flame Academy launch?",
        answer:
          "We are preparing the first partner cohort now. Institutions and programmes that register interest hear first and help shape the launch.",
      },
      {
        question: "Who can partner with Flame Academy?",
        answer:
          "Schools, universities, training institutions, youth programmes, NGOs, governments and development partners who want to build digital skills for young people.",
      },
      {
        question: "What is a Flame Club?",
        answer:
          "A digital skills club run in a school, on a campus or in a community. A facilitator or club lead runs each club using a simple guide with weekly challenges and team projects.",
      },
      {
        question: "How much will it cost?",
        answer:
          "Partnership options will be shared with the first partner cohort. Talk to our team about your programme and we will find the right fit.",
      },
    ],
    cta: { kind: "waitlist", label: "Register interest", intent: "waitlist" },
    relatedServiceSlug: "consulting-thought-leadership",
    seo: {
      title: "Flame Academy: a digital skills platform for Africa's education sector",
      description:
        "Flame Academy helps schools, institutions and youth programmes teach practical digital and AI skills through learning paths, Flame Clubs and real-world projects. Launching soon.",
    },
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
