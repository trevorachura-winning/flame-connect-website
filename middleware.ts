import { NextResponse, type NextRequest } from "next/server";

/**
 * staging.flameconnect.tech is the public review copy (git branch "staging").
 * It sends noindex so it never competes with www in search results.
 *
 * The pre-launch countdown gate that lived here was removed after the site
 * launched on Fri 20 Nov 2026 at 12:00 EAT.
 */
const STAGING_HOSTS = new Set(["staging.flameconnect.tech"]);

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase().split(":")[0];
  const res = NextResponse.next();
  if (STAGING_HOSTS.has(host)) res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return res;
}

export const config = {
  // Pages only: static assets and Next internals need no header.
  matcher: ["/((?!_next/|tech-lines/|tech-pointer/|brand/|team/|images/|icon\\.png|favicon\\.ico).*)"],
};
