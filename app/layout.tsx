import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./globals.css";
import "../styles/touch-targets.css";
import "../styles/tech-lines.css";
import "../styles/tech-pointer.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CursorHalo } from "../components/CursorHalo";
import { JsonLd } from "../components/JsonLd";
import { SITE } from "../lib/site";
import { organizationJsonLd, websiteJsonLd } from "../lib/seo";
import { consultationHref } from "../lib/links";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: "Flame Connect | Practical AI for African progress",
    template: "%s | Flame Connect",
  },
  description:
    "Flame Connect helps African businesses and communities use AI, digital communications and practical tools to improve decisions, workflows and growth.",
  applicationName: "Flame Connect",
  keywords: [
    "AI consulting Uganda",
    "AI for business Africa",
    "digital transformation Uganda",
    "responsible AI Africa",
    "AI readiness assessment",
  ],
  openGraph: {
    type: "website",
    siteName: "Flame Connect",
    locale: "en",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071B52",
};

const RIBBON =
  process.env.NEXT_PUBLIC_RIBBON_DISABLED === "1"
    ? null
    : {
        text: "Flame OS and Flame Academy are launching soon.",
        href: "/products",
        linkText: "Get early access",
      };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <Header ctaHref={consultationHref()} ribbon={RIBBON} />
        <main id="main">{children}</main>
        <Footer />
        <CursorHalo />
      </body>
    </html>
  );
}
