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
  features?: { name: string; icon: "workflow" | "megaphone" | "chart" | "spark" | "users" | "target"; copy: string }[];
  seo: { title: string; description: string };
}

export const STATUS_LABEL: Record<ProductStatus, string> = {
  live: "Live",
  pilot: "Pilot",
  development: "Launching soon",
};

/**
 * Launch line-up (Product Owner decision, 18 Nov 2026): ONE flagship product.
 * Flame Sales is the CRM + marketing-automation platform (benchmarked against
 * ActiveCampaign, built for African businesses). The former separate tools
 * (Lens, Reach, Forge, Impact) are presented as its capabilities, not as
 * separate products. It has NOT shipped yet: status "development", shown
 * publicly as "Launching soon", with an early-access list. Feature copy uses
 * "built to" language — nothing here claims availability.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "flame-sales",
    name: "Flame Sales",
    purpose: "CRM and marketing automation built for African businesses — contacts, pipeline, campaigns and follow-up in one place.",
    headline: "Win and keep more customers, from one simple platform.",
    body: "Flame Sales brings your contacts, sales pipeline, campaigns and follow-up together — designed for mobile-first teams, real connectivity and the way business actually runs across Africa.",
    status: "development",
    statusNote:
      "Flame Sales is launching soon. Join early access to hear first, see it before public launch and help shape what it does.",
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
        copy: "Turn repeat work — follow-ups, reminders, hand-offs — into simple automated workflows your team stays in control of.",
      },
      {
        name: "Insights & reporting",
        icon: "chart",
        copy: "See what is working across sales and marketing, with scores that explain their reasons in plain language.",
      },
    ],
    outcomes: [
      "See your whole pipeline without rebuilding spreadsheets every week.",
      "Focus on the leads most likely to convert, with reasons you can check.",
      "Never let a follow-up slip, with reminders and automated next steps.",
      "Know which campaigns bring in real customers, not just clicks.",
    ],
    howItWorks: [
      {
        title: "Bring your contacts",
        body: "Start from the spreadsheet or list you already have. Import, clean and organise it in minutes — no expensive migration.",
      },
      {
        title: "Automate the follow-up",
        body: "Set up campaigns, reminders and simple workflows so the right customer hears from you at the right time.",
      },
      {
        title: "Grow with insight",
        body: "Track your pipeline and campaign results in one view, then double down on what is working.",
      },
    ],
    trustNotes: [
      "Your customer data stays yours and is not used to train AI models by default.",
      "Every organisation's data is kept separate and access-controlled.",
      "AI suggestions come with their reasons, and important actions stay with your team.",
      "Designed for mobile phones and variable connectivity from day one.",
    ],
    requirements: ["A contact list in CSV or Excel is enough to start."],
    faqs: [
      {
        question: "When does Flame Sales launch?",
        answer:
          "We are preparing for launch now. Early-access members hear first and get to see the platform before it opens publicly.",
      },
      {
        question: "Do we need to replace our current tools?",
        answer:
          "No. Flame Sales is designed to start from the spreadsheets and lists you already use, so you can begin without a costly migration.",
      },
      {
        question: "Who is Flame Sales for?",
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
      title: "Flame Sales — CRM & marketing automation for African businesses",
      description:
        "Flame Sales brings contacts, pipeline, campaigns and automated follow-up into one simple platform built for African businesses. Launching soon — join early access.",
    },
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
