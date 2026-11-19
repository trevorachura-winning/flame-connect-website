import { TEAM_IS_PREVIEW } from "./team";

export interface NavItem {
  label: string;
  href: string;
}

/** Launch navigation (Nov 2026): what a business buyer looks for first. */
export const TOP_NAV: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Responsible AI", href: "/trust" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Services",
    items: [
      { label: "Digital & Communications", href: "/services/digital-communications" },
      { label: "AI in Business", href: "/services/ai-in-business" },
      { label: "Consulting & Thought Leadership", href: "/services/consulting-thought-leadership" },
      { label: "Book a consultation", href: "/contact?intent=consultation" },
    ],
  },
  {
    heading: "Products",
    items: [
      { label: "Flame OS", href: "/products/flame-os" },
      { label: "Flame Academy", href: "/products/flame-academy" },
      { label: "Join early access", href: "/contact?intent=waitlist&product=flame-os" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Insights", href: "/insights" },
      { label: "Responsible AI", href: "/trust" },
      { label: "Privacy notice", href: "/privacy" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
