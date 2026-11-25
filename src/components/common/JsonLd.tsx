import { site } from "@/content/site";
import { services } from "@/content/services";
import { faqs } from "@/content/faq";

type JsonObject = Record<string, unknown>;

/** Serializza JSON-LD neutralizzando "<" (vedi guida Next.js JSON-LD). */
export function JsonLd({ data }: { data: JsonObject | JsonObject[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Identificatore stabile di un nodo del grafo (es. https://…/#studio). */
export const schemaNodeId = (fragment: string) => `${site.url}/#${fragment}`;

const socialProfiles = [site.social.instagram, site.social.linkedin].filter(Boolean);

/** Competenze dichiarate (aiutano Google e gli assistenti AI a collegare lo studio ai temi giusti). */
const expertise = [
  "Web design per strutture ricettive",
  "Sviluppo siti web",
  "Fotografia di interni e architettura",
  "Fotografia per hotel e B&B",
  "Video e riprese con drone",
  "SEO e Local SEO",
  "Generative Engine Optimization (GEO)",
  "Hospitality marketing",
];

/** Telefono solo quando il numero WhatsApp è reale (stringa non vuota in content/site.ts). */
const telephone = site.contact.whatsapp ? `+${site.contact.whatsapp}` : undefined;

/** Grafo per la homepage: WebSite, ProfessionalService, Service, FAQPage e (se configurato) Person. */
export function homeGraph(): JsonObject {
  const hasRealOwner = !site.owner.isPlaceholder;
  const founderNodes = hasRealOwner
    ? [
        {
          "@type": "Person",
          "@id": schemaNodeId("founder"),
          name: site.owner.name,
          jobTitle: site.owner.role,
          url: `${site.url}/#chi-sono`,
          ...(site.owner.portrait ? { image: `${site.url}${site.owner.portrait}` } : {}),
          worksFor: { "@id": schemaNodeId("studio") },
          knowsAbout: expertise,
          knowsLanguage: ["it", "en"],
          ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
        },
      ]
    : [];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": schemaNodeId("website"),
        url: site.url,
        name: site.name,
        inLanguage: "it-IT",
        publisher: { "@id": schemaNodeId("studio") },
      },
      {
        "@type": "ProfessionalService",
        "@id": schemaNodeId("studio"),
        name: `${site.name} — ${site.descriptor}`,
        url: site.url,
        description: site.description,
        slogan: site.payoff,
        logo: `${site.url}/icon.svg`,
        image: `${site.url}/opengraph-image`,
        email: site.contact.email,
        ...(telephone ? { telephone } : {}),
        // Attività senza sede aperta al pubblico: solo regione e paese, niente indirizzo inventato.
        address: { "@type": "PostalAddress", addressRegion: "Sardegna", addressCountry: "IT" },
        areaServed: site.areaServed.map((placeName) => ({ "@type": "Place", name: placeName })),
        knowsAbout: expertise,
        knowsLanguage: ["it", "en"],
        ...(hasRealOwner ? { founder: { "@id": schemaNodeId("founder") } } : {}),
        ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servizi per strutture ricettive",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              "@id": schemaNodeId(service.id),
              name: `${service.title} — ${service.subtitle}`,
              description: service.body,
              provider: { "@id": schemaNodeId("studio") },
              areaServed: { "@type": "AdministrativeArea", name: "Sardegna" },
              audience: {
                "@type": "BusinessAudience",
                audienceType: "B&B, boutique hotel, agriturismi, ville, case vacanza e strutture ricettive indipendenti",
              },
            },
          })),
        },
      },
      ...founderNodes,
      {
        "@type": "FAQPage",
        "@id": schemaNodeId("faq"),
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
