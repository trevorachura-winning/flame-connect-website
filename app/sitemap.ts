import type { MetadataRoute } from "next";
import { SITE } from "../lib/site";
import { ALL_ROUTES } from "../lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified must be a verified content update, never the build timestamp.
  // Until editorial updatedAt values are tracked, omit potentially false dates.
  return ALL_ROUTES.map((route) => ({
    url: `${SITE.siteUrl}${route}`,
  }));
}
