export interface NavItem {
  label: string;
  href: string;
}

/** Launch navigation (Nov 2026): what a business buyer looks for first. */
export const TOP_NAV: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Flame Sales", href: "/products" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Responsible AI", href: "/trust" },
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
    heading: "Product",
    items: [
      { label: "Flame Sales", href: "/products" },
      { label: "Join early access", href: "/contact?intent=waitlist&product=flame-sales" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Resources", href: "/resources" },
      { label: "Responsible AI", href: "/trust" },
      { label: "Privacy notice", href: "/privacy" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
