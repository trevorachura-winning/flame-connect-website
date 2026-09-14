import type { Metadata } from "next";
import { SITE } from "./site";

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE.siteUrl}${input.path}`;
  const image = input.image ?? "/opengraph-image.png";
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE.name,
      type: input.type ?? "website",
      images: [{ url: image }],
      locale: "en",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}

export function organizationJsonLd() {
  const socials = Object.values(SITE.social).filter(Boolean) as string[];
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    ...(SITE.legalName ? { legalName: SITE.legalName } : {}),
    description: SITE.shortDescription,
    url: SITE.siteUrl,
    logo: `${SITE.siteUrl}/icon.svg`,
    email: SITE.contactEmail ?? undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
    areaServed: ["Uganda", "East Africa", "Africa"],
    sameAs: socials,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.siteUrl,
    description: SITE.shortDescription,
    publisher: { "@type": "Organization", name: SITE.name },
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.siteUrl}${item.href}`,
    })),
  };
}

export function articleJsonLd(a: {
  title: string;
  description: string;
  slug: string;
  date: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    articleSection: a.category,
    author: { "@type": "Organization", name: SITE.name, url: SITE.siteUrl },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.siteUrl}/icon.svg` },
    },
    mainEntityOfPage: `${SITE.siteUrl}/resources/${a.slug}`,
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
