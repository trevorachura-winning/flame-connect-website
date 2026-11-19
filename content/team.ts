/**
 * Approved Flame Connect team profiles for /team.
 *
 * Every published person requires:
 *  - a verified name, role and two or three specific sentences from the person;
 *  - a real transparent portrait (WebP, roughly 900 x 1260 px) in public/team/;
 *  - explicit permission to publish that portrait and biography.
 *
 * Do not fill this registry with invented identities or placeholders.
 * /team remains an unlinked, noindex preview until at least two approved
 * profiles have been provided. Links and sitemap inclusion activate only
 * when TEAM_IS_PREVIEW becomes false.
 */
export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
  instagram?: string;
  /** Specific responsibilities shown in the optional detail drawer. */
  focusAreas?: { title: string; description: string }[];
  qualification?: string;
  /** Skill sets grouped by discipline, from the person's own résumé. */
  skills?: { group: string; items: string[] }[];
  /** Named credentials shown in the bio disclosure, with issuer and completion year. */
  credentials?: { name: string; issuer: string; year: string; category: "Certification" | "Training" | "Course" }[];
  /** Set true only after the person approves publication of their profile. */
  publicationApproved: boolean;
}

// All three approved their portrait, title and biography (Trevor, then Moses
// and Aaron on 19 Nov 2026).
export const TEAM: TeamMember[] = [
  {
    slug: "trevor-achura",
    name: "Trevor Achura",
    role: "Founder & Managing Director",
    bio: "Trevor leads Flame Connect's vision to make AI and digital technology practical for African businesses. His expertise spans enterprise AI, business automation, software development and digital transformation. Through his work on recruitment platforms, learning management systems and digital business solutions, he combines strategic thinking with technical execution to solve real organisational problems.",
    photo: "/team/trevor-achura.webp",
    linkedin: "https://www.linkedin.com/in/trevor-jeremiah-achura-457b6743b",
    focusAreas: [
      { title: "Business strategy and leadership", description: "Company vision, strategic direction, growth and execution." },
      { title: "AI and automation", description: "Practical AI adoption, intelligent workflows and business process improvement." },
      { title: "Software and product development", description: "Digital platforms, enterprise applications and business systems." },
      { title: "Digital transformation", description: "Helping organisations adopt useful technology that strengthens operations." },
    ],
    qualification: "Software Engineering, Victoria University",
    credentials: [
      { name: "AI+ Sales", issuer: "AI CERTS", year: "2026", category: "Certification" },
      { name: "Graphics & Web Design", issuer: "Crayon Concepts", year: "2021–2022", category: "Certification" },
      { name: "Google Digital Marketing", issuer: "Google", year: "2020", category: "Certification" },
    ],
    // From Trevor's résumé (portfolio content, Nov 2026).
    skills: [
      { group: "AI and automation", items: ["AI in business", "Machine learning", "Business process automation", "Intelligent workflows", "Process mapping", "AppSheet low-code"] },
      { group: "Software and platforms", items: ["Python", "Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel", "WordPress", "API integrations"] },
      { group: "Design and media", items: ["Adobe Creative Suite", "Graphic design", "Multimedia content", "Canva", "CapCut"] },
      { group: "Marketing and growth", items: ["SEO and SEM", "Google Analytics", "Google Ads", "Meta Business Suite", "Content strategy", "Email marketing", "CRM"] },
    ],
    publicationApproved: true,
  },
  {
    slug: "moses-owena",
    name: "Moses Owena",
    role: "Art Director",
    bio: "Moses leads art direction and visual storytelling at Flame Connect, drawing on his experience in film direction, cinematography and creative content production. He develops visual concepts from the first idea through filming and post production, helping brands communicate with clarity and character.",
    photo: "/team/moses-owena.webp",
    linkedin: "https://www.linkedin.com/in/moses-owena-791bbb202",
    instagram: "https://www.instagram.com/moses_owena/",
    focusAreas: [
      { title: "Art direction", description: "Visual concepts and creative direction for brands and campaigns." },
      { title: "Film and cinematography", description: "Commercial films, documentaries, lighting and multi camera production." },
      { title: "Digital content", description: "Short form campaigns, reels and podcast production." },
      { title: "Post production", description: "Editing, colour grading and sound finishing." },
    ],
    qualification: "Bachelor of Performing Arts in Drama and Film, Makerere University",
    publicationApproved: true,
  },
  {
    slug: "aaron-mwesigwa-mwebaze",
    name: "Aaron Mwesigwa Mwebaze",
    role: "Managing Partner & Chief Marketing Officer",
    bio: "Aaron leads marketing, communications and strategic research at Flame Connect. His background in international relations and development policy, including experience in Uganda’s foreign service, informs his approach to partnerships and how organisations communicate change. He is pursuing a master’s degree in International Development as a TICA scholar.",
    photo: "/team/aaron-mwesigwa.webp",
    linkedin: "https://www.linkedin.com/in/mwebaze-aaron-6089a1224",
    focusAreas: [
      { title: "Marketing and communications", description: "Brand positioning, strategic communication and marketing direction for Flame Connect." },
      { title: "Development policy and research", description: "Research and policy analysis informing projects and ideas on African development." },
      { title: "Strategic partnerships", description: "Identifying and shaping relationships across organisations, institutions and development partners." },
      { title: "Stakeholder engagement", description: "Bringing diplomatic communication, consultation and coordination into cross-sector work." },
    ],
    qualification: "Degree in Governance and International Relations, Uganda Christian University. Currently pursuing an MA in International Development at Mae Fah Luang University as a TICA scholar.",
    publicationApproved: true,
  },
];

export const TEAM_IS_PREVIEW =
  TEAM.length < 2 || TEAM.some((member) => !member.publicationApproved);
