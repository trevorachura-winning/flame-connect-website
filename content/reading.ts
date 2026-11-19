/**
 * "In the conversation": curated external reading on AI and digital change in
 * Africa. Outbound links credit the original publisher. Summaries are our own
 * words and must match the linked source.
 */
export interface ReadingItem {
  title: string;
  publisher: string;
  year: string;
  href: string;
  why: string;
}

export const READING: ReadingItem[] = [
  {
    title: "AI for Africa: use cases delivering impact",
    publisher: "GSMA",
    year: "2024",
    href: "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/wp-content/uploads/2024/07/AIforAfrica.pdf",
    why: "Reviews more than 90 AI use cases across the continent and finds agriculture, climate and energy leading the way. A useful map of where AI is already working.",
  },
  {
    title: "Uganda national AI landscape assessment",
    publisher: "ITU with Uganda's Ministry of ICT",
    year: "2025",
    href: "https://www.itu.int/dms_pub/itu-d/opb/uga/D-UGA-NAAILA-2025-PDF-E.pdf",
    why: "An assessment of where Uganda stands on AI. Essential context for any organisation planning AI work in the country.",
  },
  {
    title: "Uganda to unveil an AI and emerging technology roadmap",
    publisher: "PC Tech Magazine",
    year: "2026",
    href: "https://pctechmag.com/2026/04/uganda-to-unveil-comprehensive-ai-and-emerging-tech-roadmap-by-june/",
    why: "Coverage of the government's plans for a national AI roadmap, and what it could mean for businesses and public services.",
  },
  {
    title: "Government pushes for indigenous AI solutions in health",
    publisher: "Uganda Ministry of ICT and National Guidance",
    year: "2025",
    href: "https://ict.go.ug/media/news/government-pushes-for-indigenous-ai-solutions-in-health-at-2nd-ai-in-health-africa-conference",
    why: "From the AI in Health Africa conference: the case for building AI locally, for local needs.",
  },
  {
    title: "AI adoption is rising among South African SMEs, but so is confusion",
    publisher: "Bizcommunity",
    year: "2026",
    href: "https://www.bizcommunity.com/article/ai-adoption-is-rising-among-south-african-smes-but-so-is-confusion-419869a",
    why: "Reports Xero research showing about half of small businesses surveyed use AI regularly, while many still want help applying it well. The gap we work in.",
  },
];
