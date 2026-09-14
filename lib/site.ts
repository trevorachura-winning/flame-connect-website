/**
 * Flame Connect — global site settings.
 *
 * Anything marked `pending` maps to "Appendix C — items requiring final
 * confirmation" in the website brief. These are intentionally NOT invented:
 * the UI renders honest fallback copy whenever a value is unset.
 */

export const SITE = {
  name: "Flame Connect",
  legalName: null as string | null, // pending — Appendix C: legal/company name
  tagline: "Practical AI for African progress.",
  shortDescription:
    "Flame Connect is an Africa-focused AI, digital and transformation company helping organizations and communities move from interest in technology to useful, measurable application.",
  homeLocationLine: "Uganda outward to Africa.",
  // pending — Appendix C: official domains
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // pending — Appendix C: confirmed public product/app domain
  flameOsUrl: (process.env.NEXT_PUBLIC_FLAME_OS_URL || "").replace(/\/$/, "") || null,
  // pending — Appendix C: confirmed public contact points.
  // The contact form remains the canonical route until these are confirmed.
  contactEmail: null as string | null,
  contactPhone: null as string | null,
  contactWhatsApp: null as string | null,
  officeLocation: "Kampala, Uganda", // publicly stated headquarters language
  // Approved accounts only. Empty until marketing confirms handles (Appendix C).
  social: {
    linkedin: null as string | null,
    x: null as string | null,
    youtube: null as string | null,
    // The product platform is genuinely source-visible; this link is real.
    github: "https://github.com/trevorachura-winning/flame-connect-salesos-ai",
  },
  analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID || null,
} as const;

export type Intent =
  | "consultation"
  | "access"
  | "waitlist"
  | "community"
  | "learning"
  | "partnership"
  | "newsletter"
  | "media"
  | "other";

export const INTENT_LABELS: Record<Intent, string> = {
  consultation: "Book a consultation",
  access: "Request product access",
  waitlist: "Join a product waitlist",
  community: "Join the community",
  learning: "Learning & Flame Academy",
  partnership: "Partner with Flame",
  newsletter: "Newsletter signup",
  media: "Media / speaking enquiry",
  other: "Something else",
};
