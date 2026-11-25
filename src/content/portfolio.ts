import { photos, type Photo } from "./images";

export type Project = {
  slug: string;
  /** true = progetto concept, non un cliente reale */
  isConcept: boolean;
  name: string;
  location: string;
  category: string;
  services: string[];
  excerpt: string;
  cover: Photo;
  gallery: Photo[];
  caseStudy: {
    context: string;
    goal: string;
    approach: string[];
    deliverables: string[];
    measure: string;
  };
};

/**
 * Progetti concept: strutture immaginarie sviluppate con il metodo ORMA.
 * Quando arriveranno i primi clienti reali, aggiungili qui con isConcept: false.
 */
export const projects: Project[] = [
  {
    slug: "coastal-boutique-stay",
    isConcept: true,
    name: "Coastal Boutique Stay",
    location: "Costa nord-orientale, Sardegna",
    category: "Boutique hotel",
    services: ["Sito multipagina", "Fotografia", "Video per la hero", "SEO locale"],
    excerpt:
      "Una piccola struttura affacciata sul mare, dove la luce del mattino e i materiali naturali sono il vero lusso. Un racconto lento: poche immagini, grandi, e un percorso che accompagna l'ospite dalla terrazza alla richiesta di disponibilità.",
    cover: photos.portfolio.coastalBoutiqueStay.cover,
    gallery: photos.portfolio.coastalBoutiqueStay.gallery,
    caseStudy: {
      context:
        "Dodici camere su un promontorio, ospiti internazionali, prenotazioni quasi interamente dai portali. Le fotografie esistenti non restituiscono la luce e la quiete del luogo.",
      goal: "Costruire un'identità digitale che renda riconoscibile la struttura e aumenti la quota di richieste dirette, affiancando i portali.",
      approach: [
        "Shooting in due momenti della giornata, alba e golden hour, per raccontare il ritmo del luogo.",
        "Homepage costruita come un percorso: arrivo, camere, terrazza, territorio, richiesta.",
        "Versione italiana e inglese, con contenuti locali pensati per la ricerca.",
        "Richiesta di disponibilità semplice, con WhatsApp sempre a portata di pollice.",
      ],
      deliverables: [
        "Art direction",
        "Sito multipagina IT/EN",
        "Fotografia interni ed esterni",
        "Video loop per la hero",
        "SEO locale e dati strutturati",
      ],
      measure:
        "Richieste dirette dal sito, tempo di caricamento su mobile, ricerche locali in Search Console.",
    },
  },
  {
    slug: "rural-sardinian-retreat",
    isConcept: true,
    name: "Rural Sardinian Retreat",
    location: "Entroterra, Barbagia",
    category: "Agriturismo",
    services: ["Sito web", "Fotografia food e lifestyle", "Pagine territorio", "Multilingua"],
    excerpt:
      "Un agriturismo tra colline e campi, cucina di stagione e ritmi lenti. Al centro le persone, i prodotti e il paesaggio, con una sezione dedicata alle esperienze nei dintorni.",
    cover: photos.portfolio.ruralSardinianRetreat.cover,
    gallery: photos.portfolio.ruralSardinianRetreat.gallery,
    caseStudy: {
      context:
        "Una famiglia che coltiva, cucina e ospita da anni. Clientela affezionata, ma poca visibilità al di fuori del passaparola e un sito fermo da tempo.",
      goal: "Raccontare l'autenticità dell'esperienza e intercettare chi cerca turismo rurale e gastronomico nell'interno dell'isola.",
      approach: [
        "Fotografia dei gesti: la cucina, l'orto, la tavola, le persone.",
        "Pagine dedicate al territorio, ai sentieri e ai paesi vicini.",
        "Contenuti pensati per rispondere alle domande reali degli ospiti.",
        "Menu e stagionalità aggiornabili in autonomia.",
      ],
      deliverables: [
        "Sito web",
        "Fotografia food e lifestyle",
        "Guida al territorio",
        "Multilingua IT/EN/DE",
        "Google Business Profile",
      ],
      measure:
        "Visite alle pagine territorio, richieste per pranzi ed esperienze, visibilità nelle ricerche locali.",
    },
  },
  {
    slug: "mediterranean-private-villa",
    isConcept: true,
    name: "Mediterranean Private Villa",
    location: "Costa sud, Sardegna",
    category: "Villa privata",
    services: ["Landing page", "Fotografia architettonica", "Video verticali", "Integrazione booking"],
    excerpt:
      "Una villa contemporanea con piscina, pensata per famiglie e piccoli gruppi. Una landing page essenziale, costruita per trasformare l'interesse in una richiesta diretta.",
    cover: photos.portfolio.mediterraneanPrivateVilla.cover,
    gallery: photos.portfolio.mediterraneanPrivateVilla.gallery,
    caseStudy: {
      context:
        "Una sola unità di alto livello, affittata in esclusiva. Chi prenota confronta molte alternative e vuole capire in pochi secondi spazi, servizi e posizione.",
      goal: "Presentare la villa con la chiarezza di una scheda e l'atmosfera di un editoriale, riducendo i passaggi verso la richiesta.",
      approach: [
        "Fotografia architettonica: volumi, materiali, luce sulla piscina.",
        "Una sola pagina, con planimetria, servizi e distanze essenziali.",
        "Calendario disponibilità integrato con il channel manager.",
        "Video verticali per social e annunci.",
      ],
      deliverables: [
        "Landing page",
        "Fotografia architettonica",
        "Video verticali",
        "Integrazione booking",
        "SEO tecnica",
      ],
      measure:
        "Tasso di richiesta dalla landing, provenienza del traffico, prestazioni su mobile.",
    },
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
