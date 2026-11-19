import type { MetadataRoute } from "next";
import { SITE } from "../lib/site";
import { ALL_ROUTES } from "../lib/content";
import { TEAM_IS_PREVIEW } from "../content/team";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified must be a verified content update, never the build timestamp.
  // Until editorial updatedAt values are tracked, omit potentially false dates.
  // The team page is accessible for preview but stays out of the public sitemap
  // until two approved people and their portraits are published.
  return ALL_ROUTES.filter((route) => route !== "/team" || !TEAM_IS_PREVIEW).map((route) => ({
    url: `${SITE.siteUrl}${route}`,
  }));
}
