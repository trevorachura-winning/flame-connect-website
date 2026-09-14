/**
 * First-party analytics surface.
 *
 * Event names match the brief's core events (section 22). The client helper
 * is intentionally inert unless an analytics ID is configured — no third-party
 * script is ever injected without configuration, and no free-text personal
 * data is ever attached to an event.
 */
export const EVENTS = {
  ctaExploreTools: "cta_explore_tools",
  ctaConsultation: "cta_consultation",
  leadSubmit: "lead_submit",
  productView: "product_view",
  productLaunch: "product_launch",
  communityJoin: "community_join",
  resourceView: "resource_view",
  resourceDownload: "resource_download",
  newsletterSignup: "newsletter_signup",
} as const;

export type AnalyticsEvent = (typeof EVENTS)[keyof typeof EVENTS];
