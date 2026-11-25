/**
 * Configurazione centrale di ORMA.
 * ------------------------------------------------------------------
 * Tutti i dati personali e di contatto sono PLACEHOLDER da sostituire
 * prima della pubblicazione (cerca "TODO" in questo file).
 */

// Per ora il sito vive su Netlify: quando arriva il dominio, cambiare qui (o impostare NEXT_PUBLIC_SITE_URL).
const DEFAULT_SITE_URL = "https://orma-digital-studio.netlify.app";

/**
 * Origine del sito da NEXT_PUBLIC_SITE_URL, senza slash finale.
 * Variabile assente o vuota → dominio predefinito; senza protocollo → https://.
 * Un valore non valido ferma la build con un messaggio chiaro.
 */
function resolveSiteUrl(rawValue: string | undefined): string {
  const value = rawValue?.trim();
  if (!value) return DEFAULT_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL non è un indirizzo valido: "${value}". Esempio corretto: ${DEFAULT_SITE_URL}`);
  }
}

export const site = {
  name: "ORMA",
  descriptor: "Digital & Visual Studio",
  tagline: "Studio creativo indipendente per l'hospitality",
  payoff: "Il segno che resta.",
  // TODO: dominio definitivo (usato per canonical, sitemap, Open Graph, JSON-LD)
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  locale: "it_IT",
  region: "Sardegna, Italia",

  description:
    "ORMA è uno studio creativo indipendente che realizza siti web, fotografia e video per B&B, boutique hotel, agriturismi, ville e strutture ricettive in Sardegna.",

  owner: {
    name: "Stefano Satta",
    firstName: "Stefano",
    // Con isPlaceholder false lo schema Person viene pubblicato nel JSON-LD.
    isPlaceholder: false,
    role: "Sviluppatore Web e Media Content",
    // Sede indicata nella privacy policy come dati del titolare.
    location: "Sassari, Sardegna",
    // Partita IVA: vuota = non mostrata. Aggiungerla qui quando disponibile.
    vatNumber: "",
    // Anno di avvio dell'attività (mostrato nella scheda studio finché manca il ritratto)
    since: "2012",
    // TODO: percorso di un ritratto in /public (es. "/images/ritratto.jpg"), oppure null
    portrait: null as string | null,
  },

  contact: {
    email: "info.ormadigitalstudio@gmail.com",
    // WhatsApp per ora non attivo: vuoto = nascosto ovunque (header, footer, contatti, JSON-LD).
    // Per attivarlo: numero in formato internazionale senza "+" e senza spazi, e whatsappLabel leggibile.
    whatsapp: "",
    whatsappLabel: "+39 000 000 0000",
    whatsappMessage:
      "Ciao, vorrei parlare di un progetto per la mia struttura ricettiva.",
  },

  social: {
    // Nessun profilo social: stringa vuota = nascosto (footer, contatti, About, JSON-LD sameAs).
    instagram: "",
    linkedin: "",
  },

  /**
   * Endpoint del modulo contatti: la Route Handler src/app/api/contact/route.ts,
   * che salva le richieste sul Google Sheet. Si configura lato server con
   * GOOGLE_SHEETS_WEBHOOK_URL e GOOGLE_SHEETS_SECRET (vedi .env.example).
   */
  contactEndpoint: "/api/contact",

  areaServed: [
    "Sardegna",
    "Cagliari",
    "Sassari",
    "Olbia",
    "Nuoro",
    "Oristano",
    "Alghero",
    "Costa Smeralda",
    "Gallura",
    "Ogliastra",
  ],
} as const;

/** Menu principale (header, menu mobile, footer). "Progetti" (/#progetti) tornerà quando la sezione Portfolio sarà visibile in home. */
export const nav = [
  { label: "Studio", href: "/#manifesto" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Metodo", href: "/#metodo" },
  { label: "Sardegna", href: "/#sardegna" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const whatsappUrl = () =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;
