/**
 * Ask Flame knowledge base: short answers to simple questions.
 *
 * HOW TO UPDATE (no coding needed beyond copying a block):
 *   1. Copy any entry below, paste it at the end of the list and change the text.
 *   2. question  = how a visitor would ask it.
 *   3. answer    = one to three short sentences. British English, no dashes.
 *   4. link      = the page the "Take me there" button opens (must be a real page).
 *   5. alsoAsked = other ways people ask the same thing (helps the robot match).
 *   6. updated   = today's date, so we know when to review it.
 *
 * RULES: only facts already approved and published on the website. No prices
 * (every project is quoted), no invented clients, figures or partners, and
 * products stay "launching soon" until they actually launch.
 * `npm run test:marketing` checks every entry before it can go live.
 */
export interface KnowledgeEntry {
  id: string;
  question: string;
  answer: string;
  link: string;
  alsoAsked?: string[];
  updated: string;
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: "about-brief",
    question: "Give me a brief about Flame Connect",
    answer:
      "Flame Connect is an AI Centre of Change in Kampala, Uganda. We help organisations across Africa put AI and digital tools to use through three service lines: Digital & Communications, AI in Business, and Consulting & Thought Leadership.",
    link: "/about",
    alsoAsked: ["brief", "overview", "summary", "who are you", "what is flame connect", "what do you do", "tell me about flame connect", "introduction"],
    updated: "2026-11-21",
  },
  {
    id: "mission",
    question: "What is your mission?",
    answer: "To enable African businesses to work smarter through practical AI and technology.",
    link: "/about",
    alsoAsked: ["purpose", "why do you exist", "goal"],
    updated: "2026-11-21",
  },
  {
    id: "vision",
    question: "What is your vision?",
    answer: "A digitally empowered Africa where every business grows through technology.",
    link: "/about",
    alsoAsked: ["dream", "future", "ambition"],
    updated: "2026-11-21",
  },
  {
    id: "location",
    question: "Where are you based?",
    answer: "We are based in Kampala, Uganda, and work with organisations across Africa.",
    link: "/contact",
    alsoAsked: ["location", "office", "address", "where are you", "which country", "do you work outside uganda"],
    updated: "2026-11-21",
  },
  {
    id: "services-list",
    question: "What services do you offer?",
    answer:
      "We have three service lines: Digital & Communications (design, video, photography and storytelling), AI in Business (automation and business systems) and Consulting & Thought Leadership.",
    link: "/services",
    alsoAsked: ["services", "what can you do for me", "offerings", "what do you sell"],
    updated: "2026-11-21",
  },
  {
    id: "pricing",
    question: "How much do your services cost?",
    answer:
      "Every project is quoted after a free 30 minute call, because scope, the number of locations and the systems we connect to all change the cost. You get a fixed written quote before any work starts.",
    link: "/contact?intent=consultation",
    alsoAsked: ["price", "prices", "cost", "how much", "rates", "charges", "fees", "budget", "quotation"],
    updated: "2026-11-21",
  },
  {
    id: "first-step",
    question: "How do I start working with you?",
    answer:
      "Book a free 30 minute call from our contact page. We listen to the challenge first, then send a fixed written quote before any work starts.",
    link: "/contact?intent=consultation",
    alsoAsked: ["get started", "hire you", "work with you", "book a call", "consultation", "next step", "onboarding"],
    updated: "2026-11-21",
  },
  {
    id: "assessment",
    question: "What is the free AI readiness assessment?",
    answer:
      "Twelve questions on strategy, data, technology, people, process and governance. You get an AI readiness score and three practical next steps in about five minutes, free.",
    link: "/assessment",
    alsoAsked: ["assessment", "ai readiness", "is my business ready for ai", "ai score", "test"],
    updated: "2026-11-21",
  },
  {
    id: "flame-os",
    question: "What is Flame OS?",
    answer:
      "Flame OS is our CRM and marketing automation platform for African businesses. It is launching soon, and you can join early access to see it before public launch.",
    link: "/products/flame-os",
    alsoAsked: ["crm", "flame os", "sales software", "is flame os available", "marketing automation"],
    updated: "2026-11-21",
  },
  {
    id: "flame-academy",
    question: "What is Flame Academy?",
    answer:
      "Flame Academy is a digital skills platform that helps schools, universities, training institutions and youth programmes teach practical digital and AI skills. It is launching soon.",
    link: "/products/flame-academy",
    alsoAsked: ["academy", "training", "courses", "learn ai", "schools", "digital skills"],
    updated: "2026-11-21",
  },
  {
    id: "erp",
    question: "Do you build ERP and business systems?",
    answer:
      "Yes. Business systems and ERP are part of our AI in Business service: staff, finance, inventory, clients and orders in one place, built around your workflows rather than a vendor template.",
    link: "/services/ai-in-business",
    alsoAsked: ["erp", "business system", "management system", "custom software", "automation", "inventory system"],
    updated: "2026-11-21",
  },
  {
    id: "websites",
    question: "Do you help with websites?",
    answer: "Yes. Website, landing page and UI/UX direction is part of our Digital & Communications service, along with website copy and photography.",
    link: "/services/digital-communications",
    alsoAsked: ["website", "web design", "web development", "landing page"],
    updated: "2026-11-21",
  },
  {
    id: "contact",
    question: "How do I contact you?",
    answer:
      "Send an enquiry from our contact page, message us on WhatsApp or email flameconnect1@gmail.com. A real person replies.",
    link: "/contact",
    alsoAsked: ["contact", "phone", "email", "whatsapp", "talk to someone", "reach you", "call you"],
    updated: "2026-11-21",
  },
  {
    id: "insights",
    question: "Where can I read your articles?",
    answer: "Our Insights page has practical articles on AI and digital work for African organisations.",
    link: "/insights",
    alsoAsked: ["blog", "articles", "insights", "resources", "news", "reading"],
    updated: "2026-11-21",
  },
];
