export interface NavItem {
  label: string;
  href: string;
}

export const TOP_NAV: NavItem[] = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Flame OS", href: "/flame-os" },
  { label: "Community", href: "/community" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Trust", href: "/trust" },
];

export const FOOTER_NAV: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Products",
    items: [
      { label: "Flame Sales", href: "/products/flame-sales" },
      { label: "Flame Lens", href: "/products/flame-lens" },
      { label: "Flame Ready", href: "/products/flame-ready" },
      { label: "Flame Academy", href: "/products/flame-academy" },
      { label: "Flame Forge", href: "/products/flame-forge" },
      { label: "Flame Reach", href: "/products/flame-reach" },
      { label: "Flame Impact", href: "/products/flame-impact" },
      { label: "Flame OS", href: "/flame-os" },
    ],
  },
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
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Community", href: "/community" },
      { label: "Resources", href: "/resources" },
      { label: "Trust & Responsible AI", href: "/trust" },
      { label: "Privacy notice", href: "/privacy" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Open work",
    items: [
      { label: "Platform status board", href: "/trust#product-status" },
      { label: "Learn in public (GitHub)", href: "https://github.com/trevorachura-winning/flame-connect-salesos-ai" },
      { label: "Join the community", href: "/community#join" },
      { label: "Insights", href: "/resources" },
    ],
  },
];
