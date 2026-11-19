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

export const TOOLKIT = ["Graphics", "Canva", "Video", "CapCut", "Web design", "Marketing", "AI", "Our platforms"];

export const CHAPTERS: StoryChapter[] = [
  {
    when: "2019",
    title: "It started with design",
    body: [
      "Flame began as a small graphics business. Trevor worked as a freelance graphic designer, helping people and small businesses look the part, one project at a time.",
      "Along the way he earned a diploma in graphics and web design, and the work kept coming.",
    ],
    learnt: "Good design builds trust before a word is read.",
    art: "design",
  },
  {
    when: "Up to 2022",
    title: "Canva, our first taste of AI",
    body: [
      "For years Canva was our everyday tool. Its smart features were our first real experience of what AI could do for creative work: faster drafts, cleaner layouts and more time for ideas.",
      "We did not call it an AI journey then. Looking back, that is exactly where it started.",
    ],
    learnt: "The right tool frees people to do their best thinking.",
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
      "At the end of 2022 we picked up a camera. Video gigs turned into real jobs, and editing in CapCut showed us another side of AI: tools that save hours so people can focus on the story.",
      "Then came web design. By 2023 we were working as a marketing agency, and the vision had grown. We knew we could do more.",
    ],
    learnt: "Every new medium is a new way to help a client be understood.",
    art: "video",
  },
  {
    when: "2024 to 2025",
    title: "The team grows",
    body: [
      "Moses and Trevor crossed paths again, this time for work. Okot Ronny Raphile joined us, now our COO and Managing Partner.",
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

export const VALUES = [
  {
    title: "Curiosity",
    copy: "Every skill we have started as a question. We still learn in public, and we still try new tools before we recommend them.",
  },
  {
    title: "Collaboration",
    copy: "We grew because people shared what they knew. We work the same way with clients, partners and the businesses in our ecosystem.",
  },
  {
    title: "Impact",
    copy: "Technology only matters when it changes something real for a business or a community. That is how we judge our work.",
  },
];

export const MENTORS_NOTE =
  "We owe a great deal to the mentors who gave us their time and honest advice along the way. We hope to do the same for the next generation of African builders.";

export const VISION = {
  title: "Uganda first. Then East Africa. Then Africa, and beyond.",
  copy: "We are setting our base in Uganda, growing across East Africa and building towards a continent where every business can use technology with confidence.",
  rings: ["Uganda", "East Africa", "Africa", "Beyond"],
};
