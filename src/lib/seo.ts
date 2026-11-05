import { SITE_URL } from "@/lib/content";
import type { Faq } from "@/lib/services";

export const HOME_TITLE = "Jenny Bu — Landscape Design in Toronto & York Region";
export const HOME_DESCRIPTION =
  "Landscape architecture for homes in Toronto and York Region: pools, terraces, outdoor kitchens and lit entries, designed as one. Completed projects across the GTA.";

type PageHeadInput = {
  title: string;
  description: string;
  path: string;
};

/** Title, description and a single canonical. Open Graph is injected by the platform. */
export function pageHead({ title, description, path }: PageHeadInput) {
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q.en,
      acceptedAnswer: { "@type": "Answer", text: faq.a.en },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${item.path}`,
    })),
  };
}

export function businessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Jenny Bu",
    description: HOME_DESCRIPTION,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/images/landscape/sunset-pool-spillover-spa-lounge.webp`,
    telephone: "+1-647-879-1206",
    email: "askjennybu@gmail.com",
    priceRange: "$$$",
    knowsLanguage: ["en", "zh"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: [
      "Toronto",
      "North York",
      "York Region",
      "Markham",
      "Richmond Hill",
      "Vaughan",
      "Aurora",
      "Thornhill",
    ].map((name) => ({ "@type": "Place", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landscape services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landscape design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pool and water feature design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Outdoor kitchens and terraces" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Property landscape advisory" } },
      ],
    },
  };
}

export function serviceLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    areaServed: "Toronto and York Region",
    provider: { "@type": "ProfessionalService", name: "Jenny Bu", url: `${SITE_URL}/` },
  };
}
