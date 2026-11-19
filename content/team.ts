/**
 * Flame Connect team, shown on /team in the cover-flow carousel.
 *
 * Real people only. Names, roles, bios and photos must come from the Product
 * Owner and each person must agree to be shown. While `placeholder` entries
 * remain, /team is noindex, unlinked from the menus and shows a preview note.
 *
 * Photos: portrait cut-outs on a transparent background (PNG or WebP),
 * about 900 x 1260px, head and shoulders to waist, facing the camera.
 * Put them in /public/team/ and set `photo` to "/team/<file>".
 */
export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
  placeholder?: boolean;
}

const P = "/team/placeholder.svg";

export const TEAM: TeamMember[] = [
  { slug: "member-1", name: "Team member", role: "Founder", bio: "Bio to come. Two or three warm, specific sentences about what this person does and what they care about.", photo: P, placeholder: true },
  { slug: "member-2", name: "Team member", role: "Role to confirm", bio: "Bio to come.", photo: P, placeholder: true },
  { slug: "member-3", name: "Team member", role: "Role to confirm", bio: "Bio to come.", photo: P, placeholder: true },
  { slug: "member-4", name: "Team member", role: "Role to confirm", bio: "Bio to come.", photo: P, placeholder: true },
  { slug: "member-5", name: "Team member", role: "Role to confirm", bio: "Bio to come.", photo: P, placeholder: true },
];

export const TEAM_IS_PREVIEW = TEAM.some((m) => m.placeholder);
