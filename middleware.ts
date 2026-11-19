import { NextResponse, type NextRequest } from "next/server";

/**
 * Pre-launch gate (Product Owner decision, 19 Nov 2026).
 *
 * Until LAUNCH_AT, visitors to the production domains see one page only:
 * the self-contained countdown at public/coming-soon/index.html. Every other
 * path is rewritten to it (same URL in the address bar, no redirect chain).
 *
 * - Only the production hostnames are gated. Vercel preview URLs
 *   (*.vercel.app) and localhost show the full site for review.
 * - At LAUNCH_AT the gate opens by itself; the countdown page reloads its
 *   visitors into the full site. To hold or move the launch, change
 *   LAUNCH_AT here (and the matching constant in the countdown page).
 * - After launch this file can be deleted in a tidy-up PR.
 */
export const LAUNCH_AT = Date.UTC(2026, 10, 20, 9, 0, 0); // Fri 20 Nov 2026, 12:00 EAT

const GATED_HOSTS = new Set(["www.flameconnect.tech", "flameconnect.tech"]);
const STAGING_HOSTS = new Set(["staging.flameconnect.tech"]);
const COMING_SOON = "/coming-soon/index.html";

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase().split(":")[0];

  // staging.flameconnect.tech is the public review copy (git branch "staging").
  // Keep it out of search results so it never competes with www.
  if (STAGING_HOSTS.has(host)) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return res;
  }

  if (Date.now() >= LAUNCH_AT) return NextResponse.next();
  if (!GATED_HOSTS.has(host)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = COMING_SOON;
  url.search = "";
  const res = NextResponse.rewrite(url);
  // Never let a CDN or browser keep the gate past launch.
  res.headers.set("Cache-Control", "no-store, max-age=0");
  // Temporary only: after LAUNCH_AT the response bypasses this rewrite/noindex.
  res.headers.set("X-Robots-Tag", "noindex, noarchive");
  return res;
}

export const config = {
  // Let the countdown page's own assets through; gate everything else.
  matcher: [
    "/((?!_next/|coming-soon/|tech-lines/|tech-pointer/|brand/|videos/|icon\\.png|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
