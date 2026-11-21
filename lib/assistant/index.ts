/**
 * What the help robot knows: passages built from the website's own content
 * files, so answers stay in step with the site and nothing is invented.
 * Loaded only when a visitor opens the robot (dynamic import).
 */
import type { AssistantDoc } from "./search";
import { SERVICES, QUOTE_NOTE, ENGAGEMENT_STAGES } from "../../content/services";
import { PRODUCTS } from "../../content/products";
import { ARTICLES } from "../../content/articles";
import { TEAM } from "../../content/team";
import { CHAPTERS, VISION as GROWTH } from "../../content/story";
import { MISSION, VISION, CORE_VALUES } from "../../content/company";
import { RESPONSIBLE_AI_COMMITMENTS } from "../../content/home";
import { SITE } from "../site";
import { KNOWLEDGE_BASE } from "../../content/knowledge-base";

const PAGES: AssistantDoc[] = [
  { id: "p-home", kind: "Page", title: "Home", url: "/", text: "Flame Connect is an AI Centre of Change in Kampala, Uganda. Practical AI consulting, automation and digital communications for African organisations. Digitizing Africa.", keywords: ["flame connect", "who", "what do you do", "company"] },
  { id: "p-about", kind: "Page", title: "About Flame Connect", url: "/about", text: "Flame Connect is an AI Centre of Change built in Uganda for the way Africa works. We bring expert services, our own platforms and practical insight together in one model.", keywords: ["about", "who are you", "company", "centre of change"] },
  { id: "p-services", kind: "Page", title: "Our services", url: "/services", text: "Three service lines for African organisations: Digital & Communications, AI in Business, and Consulting & Thought Leadership. Each starts from a real business challenge.", keywords: ["services", "what do you offer", "help"] },
  { id: "p-products", kind: "Page", title: "Our products", url: "/products", text: "Flame OS, the growth operating system for African businesses, and Flame Academy, the digital skills platform for Africa's education sector. Both launching soon.", keywords: ["products", "platforms", "launching soon"] },
  { id: "p-insights", kind: "Page", title: "Insights", url: "/insights", text: "Practical playbooks, perspectives and real examples of AI transforming businesses in Africa, plus the reports and conversations worth reading.", keywords: ["insights", "articles", "blog", "read", "resources"] },
  { id: "p-assessment", kind: "Page", title: "Free AI readiness assessment", url: "/assessment", text: "Twelve questions on strategy, data, technology, people, process and governance. Get your AI readiness score and three practical next steps in about five minutes. It is free.", keywords: ["assessment", "free", "quiz", "readiness", "score", "start"] },
  { id: "p-team", kind: "Page", title: "Our team", url: "/team", text: "The people behind Flame Connect, an AI Centre of Change in Kampala helping African organisations put AI and digital tools to work.", keywords: ["team", "people", "staff", "who works"] },
  { id: "p-story", kind: "Page", title: "Our story", url: "/our-story", text: "How Flame Connect grew from a graphics business in 2019, through video, web design and marketing, into a Ugandan technology company focused on Digitizing Africa.", keywords: ["story", "history", "started", "journey"] },
  { id: "p-trust", kind: "Page", title: "Responsible AI", url: "/trust", text: "How Flame Connect designs AI with human oversight, clear safeguards, privacy and accessibility. These are the commitments behind our services and platforms.", keywords: ["responsible", "ethics", "safe", "trust", "oversight"] },
  { id: "p-privacy", kind: "Page", title: "Privacy notice", url: "/privacy", text: "How Flame Connect collects, uses and protects personal information when you visit our website or contact us, and the choices and rights you have.", keywords: ["privacy", "data", "cookies", "personal information"] },
];

function contactDocs(): AssistantDoc[] {
  const wa = SITE.contactWhatsApp ? `+${SITE.contactWhatsApp.replace(/^(\d{3})(\d{3})(\d{6})$/, "$1 $2 $3")}` : "";
  return [
    {
      id: "c-contact",
      kind: "Contact",
      title: "Contact Flame Connect",
      url: "/contact",
      text: `Email us at ${SITE.contactEmail}${wa ? ` or message us on WhatsApp at ${wa}` : ""}. You can also send an enquiry from the contact page and a real person will reply. We are based in ${SITE.officeLocation}.`,
      keywords: ["contact", "email", "whatsapp", "phone", "talk", "reach", "call", "book", "consultation", "enquiry"],
    },
    {
      id: "c-location",
      kind: "Contact",
      title: "Where we are",
      url: "/contact",
      text: `Flame Connect is based in ${SITE.officeLocation}. We are growing from Uganda across East Africa and beyond.`,
      keywords: ["location", "located", "where", "office", "address", "kampala", "uganda"],
    },
    {
      id: "c-pricing",
      kind: "Contact",
      title: "Prices and quotes",
      url: "/contact?intent=consultation",
      text: `We do not publish a price list. ${QUOTE_NOTE}`,
      keywords: ["price", "pricing", "cost", "quote", "how much", "fees", "budget", "charge"],
    },
  ];
}

function companyDocs(): AssistantDoc[] {
  return [
    { id: "co-mission", kind: "Company", title: "Our mission", url: "/about", text: MISSION, keywords: ["mission", "purpose"] },
    { id: "co-vision", kind: "Company", title: "Our vision", url: "/about", text: VISION, keywords: ["vision", "future"] },
    { id: "co-values", kind: "Company", title: "Our core values", url: "/about", text: CORE_VALUES.map((v) => `${v.title}: ${v.copy}`).join(" "), keywords: ["values", "people", "collaboration", "innovation"] },
    { id: "co-growth", kind: "Company", title: "Where we are going", url: "/our-story", text: `${GROWTH.title} ${GROWTH.copy}`, keywords: ["growth", "expansion", "africa", "east africa"] },
    { id: "co-method", kind: "Company", title: "How we work: Assess, Learn, Improve, Implement", url: "/services", text: ENGAGEMENT_STAGES.map((s) => `${s.stage}: ${s.what}`).join(" "), keywords: ["method", "process", "approach", "how you work", "assess", "learn", "improve", "implement"] },
    { id: "co-responsible", kind: "Company", title: "Our responsible AI commitments", url: "/trust", text: RESPONSIBLE_AI_COMMITMENTS.join(" "), keywords: ["responsible", "ethics", "oversight", "safe", "governance"] },
  ];
}

export function buildAssistantIndex(): AssistantDoc[] {
  const docs: AssistantDoc[] = [...PAGES, ...contactDocs(), ...companyDocs()];

  // Owner-maintained answers (content/knowledge-base.ts) come first so they win ties.
  for (const k of KNOWLEDGE_BASE) {
    docs.unshift({ id: `kb-${k.id}`, kind: "FAQ", title: k.question, url: k.link, text: k.answer, keywords: [k.question, ...(k.alsoAsked ?? [])] });
  }

  for (const s of SERVICES) {
    const url = `/services/${s.slug}`;
    docs.push({ id: `s-${s.slug}`, kind: "Service", title: s.name, url, text: `${s.proposition} ${s.description}`, keywords: [s.name, ...s.capabilities] });
    docs.push({ id: `s-${s.slug}-cap`, kind: "Service", title: `${s.name}: what we do`, url, text: s.capabilities.join(". ") + ".", keywords: [s.name] });
    for (const o of s.offerings?.items ?? []) {
      docs.push({ id: `s-${s.slug}-${o.art}`, kind: "Service", title: o.name, url, text: o.detail, keywords: [s.name, s.offerings!.eyebrow] });
    }
    for (const p of s.packages ?? []) {
      docs.push({ id: `s-${s.slug}-${p.name}`, kind: "Service", title: `${p.name} option, ${s.name}`, url, text: `${p.bestFor} ${p.includes.join(". ")}. ${QUOTE_NOTE}`, keywords: ["package", "option", "quote", p.name] });
    }
    s.faqs.forEach((f, i) => docs.push({ id: `s-${s.slug}-faq${i}`, kind: "FAQ", title: f.question, url, text: f.answer, keywords: [s.name] }));
  }

  for (const p of PRODUCTS) {
    const url = `/products/${p.slug}`;
    docs.push({ id: `pr-${p.slug}`, kind: "Product", title: p.name, url, text: `${p.purpose} ${p.body} ${p.statusNote}`, keywords: [p.name, ...(p.category ? [p.category] : []), ...(p.tagline ? [p.tagline] : [])] });
    for (const f of p.features ?? []) docs.push({ id: `pr-${p.slug}-${f.name}`, kind: "Product", title: `${p.name}: ${f.name}`, url, text: f.copy, keywords: [p.name] });
    p.faqs.forEach((f, i) => docs.push({ id: `pr-${p.slug}-faq${i}`, kind: "FAQ", title: f.question, url, text: f.answer, keywords: [p.name] }));
  }

  for (const a of ARTICLES) {
    docs.push({ id: `a-${a.slug}`, kind: "Insight", title: a.title, url: `/insights/${a.slug}`, text: a.summary, keywords: [a.category, "article", "insight"] });
  }

  for (const m of TEAM.filter((t) => t.publicationApproved)) {
    docs.push({ id: `t-${m.slug}`, kind: "Team", title: `${m.name}, ${m.role}`, url: "/team", text: m.bio, keywords: [m.name, m.role, ...(m.focusAreas ?? []).map((f) => f.title)] });
  }

  for (const c of CHAPTERS) {
    docs.push({ id: `st-${c.when}`, kind: "Company", title: `${c.when}: ${c.title}`, url: "/our-story", text: c.body.join(" "), keywords: ["story", c.when, ...(c.when === "2019" ? ["start", "started", "founded", "began", "beginning"] : [])] });
  }

  return docs;
}

/** Quick questions shown when the robot opens. */
export const STARTER_QUESTIONS = [
  "What services do you offer?",
  "How much does it cost?",
  "Do you build ERP systems?",
  "How do I contact you?",
];
