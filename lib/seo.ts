import type { Metadata } from "next";
import { SITE } from "./site";

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const url = `${SITE.siteUrl}${input.path}`;
  const image = input.image ?? "/opengraph-image.png";
  const openGraphBase = {
    title: input.title,
    description: input.description,
    url,
    siteName: SITE.name,
    images: [{ url: image, alt: "Flame Connect. Digitizing Africa." }],
    locale: "en" as const,
  };
  return {
    // The root title template already adds the brand to ordinary page titles.
    // Avoid appending it twice to titles that explicitly contain Flame Connect.
    title: input.title.startsWith(`${SITE.name} |`) || input.title.endsWith(SITE.name)
      ? { absolute: input.title }
      : input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: input.type === "article"
      ? {
          ...openGraphBase,
          type: "article" as const,
          ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
        }
      : { ...openGraphBase, type: "website" as const },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}

export function organizationJsonLd() {
  const socials = Object.values(SITE.social).filter(Boolean) as string[];
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.siteUrl}/#organization`,
    name: SITE.name,
    ...(SITE.legalName ? { legalName: SITE.legalName } : {}),
    description: SITE.shortDescription,
    url: SITE.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.siteUrl}/brand/flame-connect-mark.png`,
      width: 512,
      height: 512,
    },
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
    "@id": `${SITE.siteUrl}/#website`,
    name: SITE.name,
    url: SITE.siteUrl,
    description: SITE.shortDescription,
    publisher: { "@id": `${SITE.siteUrl}/#organization` },
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
      logo: {
        "@type": "ImageObject",
        url: `${SITE.siteUrl}/brand/flame-connect-mark.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: `${SITE.siteUrl}/insights/${a.slug}`,
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
