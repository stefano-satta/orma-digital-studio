import { photos, type Photo } from "./images";
import { ON_QUOTE_LABEL, servicePrices } from "./pricing";

export type Service = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  claim: string;
  body: string;
  note?: string;
  includes: string[];
  ctaLabel: string;
  image: Photo;
  detail: Photo;
};

export const services: Service[] = [
  {
    id: "digital-presence",
    number: "01",
    title: "Digital Presence",
    subtitle: "Siti web per strutture ricettive",
    claim:
      "Un sito progettato per valorizzare la tua struttura e trasformare l'interesse in richieste.",
    body: "Dalla strategia al design, fino allo sviluppo. Siti veloci e responsive, costruiti attorno al modo in cui gli ospiti cercano, scelgono e contattano: una landing page essenziale o un sito multipagina, in una o più lingue, collegato al tuo sistema di prenotazione, a WhatsApp e a Google Maps.",
    includes: [
      "Strategia e UX",
      "UI design su misura",
      "Sviluppo web",
      "SEO tecnica",
      "Multilingua",
      "Booking engine",
      "WhatsApp e form",
      "Landing page",
    ],
    ctaLabel: "Parliamo del tuo sito",
    image: photos.services.digitalPresence.image,
    detail: photos.services.digitalPresence.detail,
  },
  {
    id: "visual-storytelling",
    number: "02",
    title: "Visual Storytelling",
    subtitle: "Fotografia e video",
    claim:
      "Le immagini non mostrano soltanto una struttura. Trasmettono il desiderio di viverla.",
    body: "Fotografia di ambienti e architettura, dettagli, cucina e momenti di vita. Video emozionali per la homepage, reel e contenuti verticali per i social. Ogni shooting parte da un'idea precisa di ciò che vuoi raccontare, e dalla luce giusta per raccontarlo.",
    includes: [
      "Interni e architettura",
      "Lifestyle",
      "Food",
      "Video per la hero",
      "Riprese con drone",
      "Reel e verticali",
      "Contenuti social",
    ],
    ctaLabel: "Pianifica uno shooting",
    image: photos.services.visualStorytelling.image,
    detail: photos.services.visualStorytelling.detail,
  },
  {
    id: "digital-growth",
    number: "03",
    title: "Digital Growth",
    subtitle: "SEO, GEO e supporto continuativo",
    claim:
      "Una presenza digitale curata non finisce con la pubblicazione del sito.",
    body: "Ottimizzazione per Google e per la ricerca locale, contenuti che rispondono alle domande reali degli ospiti, attenzione a come gli assistenti basati sull'intelligenza artificiale leggono e citano il tuo sito. E poi manutenzione, aggiornamenti, analisi e un interlocutore a cui scrivere quando serve.",
    note: "Nessuno può garantire una posizione su Google. Posso garantire un lavoro fatto bene, misurabile e trasparente.",
    includes: [
      "SEO e Local SEO",
      "GEO",
      "Performance",
      "Manutenzione",
      "Analisi",
      "Consulenza",
    ],
    ctaLabel: "Parliamo di crescita",
    image: photos.services.digitalGrowth.image,
    detail: photos.services.digitalGrowth.detail,
  },
];

export type Package = {
  number: string;
  name: string;
  tagline: string;
  audience: string;
  /** Prezzo indicativo IVA esclusa, da content/pricing.ts. */
  priceLabel: string;
  deliverables: string[];
};

export const packages: Package[] = [
  {
    number: "01",
    name: "Digital Essentials",
    tagline: "L'essenziale, fatto bene",
    audience:
      "Per chi ha bisogno di una presenza web professionale, chiara e curata, senza complicazioni.",
    priceLabel: servicePrices.landingPage.label,
    deliverables: [
      "Landing page su misura",
      "Design responsive",
      "Galleria fotografica",
      "SEO di base",
      "Form di contatto",
      "WhatsApp e Google Maps",
    ],
  },
  {
    number: "02",
    name: "Digital Experience",
    tagline: "Il sito completo",
    audience:
      "Per le strutture che vogliono raccontare camere, servizi e territorio con un sito articolato.",
    priceLabel: servicePrices.multipageSite.label,
    deliverables: [
      "Strategia e architettura dei contenuti",
      "Sito multipagina",
      "UX/UI personalizzata",
      "Gallery avanzata",
      "Pagine servizi e territorio",
      "SEO di base e multilingua",
      "Integrazione booking",
      "Ottimizzazione delle conversioni",
    ],
  },
  {
    number: "03",
    name: "Complete Story",
    tagline: "Sito e immagini, insieme",
    audience:
      "Un progetto integrato in cui sito, fotografie e video nascono dalla stessa idea.",
    priceLabel: ON_QUOTE_LABEL,
    deliverables: [
      "Sito web",
      "Fotografia",
      "Video",
      "Content direction",
      "SEO e strategia",
      "Contenuti social, se richiesti",
    ],
  },
];
