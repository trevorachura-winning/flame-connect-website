/**
 * Flame Connect's story, as told by the founder (19 Nov 2026).
 * Facts only from the Product Owner. British English, no dashes in copy.
 */
export type StoryArt = "design" | "canva" | "people" | "video" | "team" | "chip";

export interface StoryChapter {
  when: string;
  title: string;
  body: string[];
  learnt: string;
  art: StoryArt;
}

export const STORY_INTRO = {
  title: "From a design desk to Digitizing Africa.",
  lede:
    "Flame Connect began in 2019 with one designer and a lot of curiosity. Every skill we have today started as a question we were brave enough to ask. This is how we grew.",
};

export const TOOLKIT = ["Graphic design", "Video production", "Web design", "Marketing", "AI in our work", "Our platforms"];

export const CHAPTERS: StoryChapter[] = [
  {
    when: "2019",
    title: "It started with design",
    body: [
      "Flame began as a small graphics business. Trevor worked as a freelance graphic designer, using professional tools like Adobe Creative Cloud to help people and small businesses look the part, one project at a time.",
      "During lockdown his pursuit of new skills took off, starting with formal training in graphics and web design. The work kept coming, and so did the questions.",
    ],
    learnt: "Good design builds trust before a word is read.",
    art: "design",
  },
  {
    when: "Up to 2022",
    title: "Curious about AI, early",
    body: [
      "Our craft was built on professional tools. What caught our attention was something new: the first AI features appearing in creative tools like Canva, promising faster drafts, cleaner layouts and more time for ideas.",
      "The idea was young and surrounded by misconceptions. Many saw AI as a shortcut or a threat. We saw something worth learning, so we decided to run with it.",
    ],
    learnt: "Be early, be honest about what a new tool can and cannot do.",
    art: "canva",
  },
  {
    when: "2022",
    title: "Finding our people",
    body: [
      "Trevor met Moses at an agency, a connection that would come back around. Then Aaron joined, and we started learning and growing together.",
      "None of us had every skill. Together, we kept stretching into the next one.",
    ],
    learnt: "You grow faster when you grow with others.",
    art: "people",
  },
  {
    when: "2023",
    title: "From stills to stories",
    body: [
      "At the end of 2022 we picked up a camera. Video gigs turned into real jobs. Alongside professional editing software, we explored the AI features in tools like CapCut, which save hours so people can focus on the story.",
      "Then came web design. By 2023 we were working as a marketing agency, and the vision had grown. We knew we could do more.",
    ],
    learnt: "Every new medium is a new way to help a client be understood.",
    art: "video",
  },
  {
    when: "2024 to 2025",
    title: "The team grows",
    body: [
      "Moses and Trevor crossed paths again, this time for work. Raphile joined us and is now our COO.",
      "Mentors guided us, and curiosity kept us asking a bigger question: what if we built technology, not just used it? That is when the technology idea began, and we said out loud that we needed a team.",
    ],
    learnt: "A vision becomes real when people commit to it together.",
    art: "team",
  },
  {
    when: "Today",
    title: "A technology company",
    body: [
      "Flame Connect is now a technology company with one aim: Digitizing Africa. We apply AI in our own work every day, we are building our own platforms, Flame OS and Flame Academy, and we work alongside people and businesses already in our ecosystem.",
    ],
    learnt: "Use technology to make real work better, then share what you learn.",
    art: "chip",
  },
];

export { CORE_VALUES as VALUES } from "./company";

export const MENTORS_NOTE =
  "We owe a great deal to the mentors who gave us their time and honest advice along the way. We hope to do the same for the next generation of African builders.";

export const VISION = {
  title: "Uganda first. Then East Africa. Then Africa, and beyond.",
  copy: "We are setting our base in Uganda, growing across East Africa and building towards a continent where every business can use technology with confidence.",
  rings: ["Uganda", "East Africa", "Africa", "Beyond"],
};
