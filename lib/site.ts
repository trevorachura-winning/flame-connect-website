/**
 * Flame Connect — global site settings.
 *
 * Anything marked `pending` maps to "Appendix C — items requiring final
 * confirmation" in the website brief. These are intentionally NOT invented:
 * the UI renders honest fallback copy whenever a value is unset.
 */

/**
 * Normalize an application origin from the environment.
 *
 * Returns null when unset/empty (so the honest on-site fallbacks render), and
 * THROWS on a malformed value. Throwing is deliberate and matches the
 * content-gate culture in lib/content.ts: a typo'd app URL would otherwise
 * ship silently as a broken button, and NEXT_PUBLIC_* values are inlined at
 * build time — so the failure surfaces in CI, not in front of a visitor.
 */
function appOrigin(raw: string | undefined, name: string): string | null {
  const value = (raw || "").trim();
  if (!value) return null;
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(
      `${name} is not a valid absolute URL: "${value}". ` +
        `Include the protocol, e.g. https://your-app.vercel.app`
    );
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error(`${name} must be an http(s) URL — got "${value}"`);
  }
  return value.replace(/\/+$/, "");
}

/**
 * Normalize the sign-in path appended to an app origin. Defaults to "/login",
 * which is the convention this site already assumed. Overridable per
 * deployment because auth routes differ by stack (/signin, /auth, /…) and the
 * website cannot verify the platform's routes at build time.
 */
function signInPath(raw: string | undefined, name: string): string {
  const value = (raw || "").trim();
  if (!value) return "/login";
  if (!value.startsWith("/")) {
    throw new Error(`${name} must be a path starting with "/" — got "${value}"`);
  }
  return value.replace(/\/+$/, "") || "/";
}

export const SITE = {
  name: "Flame Connect",
  legalName: "Flame Connect", // confirmed by founder (Sept 2026); update if URSB certificate shows a formal suffix
  tagline: "Digitize Africa.", // official tagline/vision — confirmed by founder (Sept 2026),
  shortDescription:
    "Flame Connect is an Africa-focused AI, digital and transformation company helping organizations and communities move from interest in technology to useful, measurable application.",
  homeLocationLine: "Uganda outward to Africa.",
  // pending — Appendix C: official domains.
  // Note: `||`-style fallback (not `??`) so an EMPTY-STRING env var — e.g. a
  // placeholder pasted into Vercel's env panel — falls back instead of
  // crashing `new URL("")` during static page-data collection.
  siteUrl:
    (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/+$/, "") ||
    "https://flameconnect.org",
  // pending — Appendix C: confirmed public product/app domain for the SHARED
  // Flame OS platform layer. Deliberately still unset: this one variable drives
  // the site-wide "Explore Flame OS" CTA and, via productCtaHref(), every
  // product launch button. Pointing it at a single product's deployment would
  // silently repoint Flame Lens / Flame Ready / Flame Academy at an app they do
  // not belong to — so per-product apps get their own setting below.
  flameOsUrl: appOrigin(process.env.NEXT_PUBLIC_FLAME_OS_URL, "NEXT_PUBLIC_FLAME_OS_URL"),
  // Flame Sales — the deployed Sales OS platform (confirmed by founder, Sept 2026).
  // Kept SEPARATE from flameOsUrl for the reason above. Drives header/drawer
  // "Sign in"; see lib/links.ts signInHref().
  flameSalesUrl: appOrigin(process.env.NEXT_PUBLIC_FLAME_SALES_URL, "NEXT_PUBLIC_FLAME_SALES_URL"),
  // Auth route appended to flameSalesUrl. Defaults to "/login" (this site's
  // original assumption) and is overridable without a code change, because the
  // website build cannot verify the platform's own routes.
  flameSalesSignInPath: signInPath(
    process.env.NEXT_PUBLIC_FLAME_SALES_SIGNIN_PATH,
    "NEXT_PUBLIC_FLAME_SALES_SIGNIN_PATH"
  ),
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
