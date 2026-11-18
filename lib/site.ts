/**
 * Flame Connect — global site settings.
 *
 * Anything marked `pending` maps to "Appendix C — items requiring final
 * confirmation" in the website brief. These are intentionally NOT invented:
 * the UI renders honest fallback copy whenever a value is unset.
 */

/**
 * Website-only release (Nov 2026, Product Owner decision): the corporate site
 * is the point of sale. It has NO sign-in, NO backend and NO links into the
 * Flame platforms — the tools are presented under Products only. Enquiries
 * leave the site through the visitor's own email app or WhatsApp, prefilled
 * by components/EnquiryComposer.tsx; nothing is posted to a server.
 *
 * Public enquiry destinations are defined below. The visitor must still
 * press Send in their own email or WhatsApp app: the website does not submit.
 */
export const SITE = {
  name: "Flame Connect",
  legalName: "Flame Connect", // confirmed by founder (Sept 2026); update if URSB certificate shows a formal suffix
  tagline: "Digitize Africa.", // official tagline/vision — confirmed by founder (Sept 2026),
  shortDescription:
    "Flame Connect is an Africa-focused AI, digital and transformation company helping organizations and communities move from interest in technology to useful, measurable application.",
  homeLocationLine: "Uganda outward to Africa.",
  // Canonical public origin: https://www.flameconnect.tech (apex redirects to www).
  // Note: `||`-style fallback (not `??`) so an EMPTY-STRING env var — e.g. a
  // placeholder pasted into Vercel's env panel — falls back instead of
  // crashing `new URL("")` during static page-data collection.
  siteUrl: (() => {
    const configured = (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\\/+$/, "");
    // Normalize the former apex setting too: an existing Vercel env variable
    // must not keep emitting redirecting canonical/OG/sitemap URLs.
    if (!configured || configured === "https://flameconnect.tech") {
      return "https://www.flameconnect.tech";
    }
    return configured;
  })(),
  // Public contact details confirmed by Product Owner (18 Nov 2026).
  // WhatsApp uses digits-only international format for wa.me links.
  // Do not infer a separate phone/voice line from the WhatsApp number.
  contactEmail: "flameconnect1@gmail.com" as string | null,
  contactPhone: null as string | null,
  contactWhatsApp: "256764018701" as string | null,
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
