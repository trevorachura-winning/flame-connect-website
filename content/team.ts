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
  /** Set true only after the person approves publication of their profile. */
  publicationApproved: boolean;
}

// Awaiting the Product Owner's approved people, portraits and consent.
// Removing placeholders is intentional. Never substitute stock or generated faces.
export const TEAM: TeamMember[] = [];

export const TEAM_IS_PREVIEW =
  TEAM.length < 2 || TEAM.some((member) => !member.publicationApproved);
