import type { Metadata } from "next";
import { site } from "@/content/site";
import { hospitalityTypes } from "@/content/home";
import { servicePagePath, type ServicePageContent } from "@/content/servicePages";
import { schemaNodeId } from "@/components/common/JsonLd";

/** Metadata di una pagina servizio: title, description, canonical e Open Graph. */
export function serviceMetadata(servicePage: ServicePageContent): Metadata {
  const path = servicePagePath(servicePage);
  return {
    title: servicePage.metaTitle,
    description: servicePage.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: `${servicePage.metaTitle} · ${site.name}`,
      description: servicePage.metaDescription,
      // Definire openGraph nella pagina sostituisce quello della root: l'immagine OG va ripetuta qui.
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: `${site.name}: ${servicePage.h1}` }],
    },
  };
}

/** JSON-LD: Service (collegato allo studio della home tramite @id), BreadcrumbList e FAQPage. */
export function serviceGraph(servicePage: ServicePageContent) {
  const pageUrl = `${site.url}${servicePagePath(servicePage)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        url: pageUrl,
        name: servicePage.h1,
        serviceType: servicePage.shortName,
        description: servicePage.metaDescription,
        provider: { "@id": schemaNodeId("studio") },
        isRelatedTo: { "@id": schemaNodeId(servicePage.serviceId) },
        areaServed: site.areaServed.map((placeName) => ({ "@type": "Place", name: placeName })),
        audience: {
          "@type": "BusinessAudience",
          audienceType: hospitalityTypes.map((hospitalityType) => hospitalityType.name).join(", "),
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Cosa comprende: ${servicePage.shortName}`,
          itemListElement: servicePage.includes.map((included) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: included.title, description: included.description },
          })),
        },
        // Prezzi indicativi (IVA esclusa): aiutano Google e gli assistenti AI a rispondere a "quanto costa".
        // Le voci su preventivo restano Offer senza importo.
        offers: servicePage.pricing.map((priceItem) => {
          const hasAmount = priceItem.price?.minPrice !== undefined || priceItem.price?.maxPrice !== undefined;
          return {
            "@type": "Offer",
            name: priceItem.title,
            description: priceItem.description,
            ...(hasAmount
              ? {
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    priceCurrency: "EUR",
                    minPrice: priceItem.price?.minPrice,
                    maxPrice: priceItem.price?.maxPrice,
                    valueAddedTaxIncluded: false,
                  },
                }
              : {}),
          };
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: servicePage.shortName, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: servicePage.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
