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
  /** Specific responsibilities shown in the optional detail drawer. */
  focusAreas?: { title: string; description: string }[];
  qualification?: string;
  /** Set true only after the person approves publication of their profile. */
  publicationApproved: boolean;
}

// Draft profile prepared from Moses's CV and the Product Owner's role assignment.
// Keep publicationApproved false until Moses confirms the portrait and biography.
export const TEAM: TeamMember[] = [
  {
    slug: "moses-owena",
    name: "Moses Owena",
    role: "Art Director",
    bio: "Moses leads art direction and visual storytelling at Flame Connect, drawing on his experience in film direction, cinematography and creative content production. He develops visual concepts from the first idea through filming and post production, helping brands communicate with clarity and character.",
    photo: "/team/moses-owena.webp",
    focusAreas: [
      { title: "Art direction", description: "Visual concepts and creative direction for brands and campaigns." },
      { title: "Film and cinematography", description: "Commercial films, documentaries, lighting and multi camera production." },
      { title: "Digital content", description: "Short form campaigns, reels and podcast production." },
      { title: "Post production", description: "Editing, colour grading and sound finishing." },
    ],
    qualification: "Bachelor of Performing Arts in Drama and Film, Makerere University",
    publicationApproved: false,
  },
];

export const TEAM_IS_PREVIEW =
  TEAM.length < 2 || TEAM.some((member) => !member.publicationApproved);
