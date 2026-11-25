/**
 * Prezzi di ORMA: unica fonte per pagine servizio, pacchetti in home, select "Budget"
 * del modulo contatti e dati strutturati (Offer.priceSpecification).
 * Tutti gli importi sono IVA esclusa.
 */

export type PriceBand = {
  label: string;
  /** Importi in euro per lo schema; assenti = estremo aperto (o nessun importo, es. "Inclusa nel sito"). */
  minPrice?: number;
  maxPrice?: number;
};

/** Fasce di budget proposte nella select del modulo contatti (le sceglie il cliente). */
export const priceBands = {
  upTo1000: { label: "Fino a 1.000 €" },
  from1000To2500: { label: "1.000 – 2.500 €" },
  from2500To5000: { label: "2.500 – 5.000 €" },
  over5000: { label: "Oltre 5.000 €" },
} as const satisfies Record<string, PriceBand>;

/** Prezzi pubblicati dei servizi, decisi dal titolare. */
export const servicePrices = {
  landingPage: { label: "Fino a 700 €", maxPrice: 700 },
  multipageSite: { label: "Da 900 €", minPrice: 1000 },
  /** SEO di base: compresa in landing page e sito multipagina. */
  baseSeoIncluded: { label: "Inclusa nel sito" },
} as const satisfies Record<string, PriceBand>;

/** Etichetta per i servizi senza prezzo fisso (fotografia, video, percorsi SEO e GEO). */
export const ON_QUOTE_LABEL = "Su preventivo";

/** Una voce di prezzo; senza `price` è "Su preventivo". */
export type PriceItem = { title: string; description: string; price?: PriceBand };

export const VAT_NOTE = "Prezzi IVA esclusa.";

export const PRICE_DISCLAIMER = `${VAT_NOTE} Il preventivo definitivo arriva dopo una prima conversazione, gratuita e senza impegno, ed è costruito sulla tua struttura.`;
