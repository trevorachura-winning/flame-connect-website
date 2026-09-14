import type { MetadataRoute } from "next";
import { SITE } from "../lib/site";
import { ALL_ROUTES } from "../lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ALL_ROUTES.map((route) => ({
    url: `${SITE.siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}
