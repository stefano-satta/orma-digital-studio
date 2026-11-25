import { photos, type Photo } from "./images";

export const challenges = [
  {
    title: "Ambienti curati, fotografie che non li raccontano.",
    body: "Foto scattate in fretta, con la luce sbagliata, che non restituiscono materiali, spazi e atmosfera.",
  },
  {
    title: "Un sito che non somiglia più alla struttura.",
    body: "Datato, lento su smartphone, difficile da aggiornare. A volte, semplicemente, assente.",
  },
  {
    title: "Tutto passa dai portali.",
    body: "Booking e Airbnb portano visibilità, ma in una griglia di annunci ogni struttura somiglia alle altre e il dialogo diretto con l'ospite si perde.",
  },
  {
    title: "Il territorio resta fuori dal racconto.",
    body: "Il paese, la spiaggia vicina, la cantina dietro la collina: spesso sono il motivo per cui un ospite sceglie, ma raramente trovano spazio.",
  },
  {
    title: "Canali che parlano lingue diverse.",
    body: "Sito, social, Google e portali mostrano immagini e informazioni scollegate tra loro.",
  },
  {
    title: "Difficile distinguersi.",
    body: "Quando la comunicazione somiglia a quella di tutti, l'ospite finisce per confrontare soltanto il prezzo.",
  },
];

export const listedVsRemembered = {
  listed: [
    "Un annuncio tra centinaia, nello stesso formato",
    "Il confronto si sposta sul prezzo",
    "Regole, commissioni e dati dell'ospite gestiti da altri",
    "Poco spazio per raccontare chi sei",
  ],
  remembered: [
    "Un'identità riconoscibile, con le tue immagini e il tuo tono",
    "Il racconto completo: camere, servizi, territorio",
    "Un canale diretto per domande e richieste",
    "Contenuti e informazioni che controlli tu",
  ],
};

export const benefits = [
  { title: "Identità", body: "Un luogo che si riconosce al primo sguardo." },
  { title: "Fiducia", body: "Informazioni chiare, immagini vere, un volto." },
  { title: "Controllo", body: "Contenuti, prezzi e regole decisi da te." },
  { title: "Differenziazione", body: "Ciò che ti rende unico, finalmente visibile." },
  { title: "Contenuti", body: "Storie, guide e territorio, non solo camere." },
  { title: "Richieste dirette", body: "Un dialogo con l'ospite, senza intermediari." },
  { title: "Esperienza", body: "Il soggiorno inizia già dallo schermo." },
  { title: "Informazioni", body: "Le risposte giuste, prima delle domande." },
  { title: "Brand", body: "Un nome che resta, oltre il singolo annuncio." },
];

export const processSteps = [
  {
    number: "01",
    englishName: "Discovery",
    italianName: "Ascolto",
    body: "Una conversazione, meglio se sul posto. Conosco la struttura, la tua storia e gli ospiti che vorresti accogliere.",
  },
  {
    number: "02",
    englishName: "Strategy",
    italianName: "Direzione",
    body: "Definiamo obiettivi, contenuti, priorità e ciò che rende la tua struttura diversa dalle altre.",
  },
  {
    number: "03",
    englishName: "Design",
    italianName: "Forma",
    body: "Struttura delle pagine, tipografia, immagini e tono di voce prendono forma in un design su misura.",
  },
  {
    number: "04",
    englishName: "Development",
    italianName: "Costruzione",
    body: "Sviluppo il sito con tecnologie moderne: veloce, accessibile e facile da aggiornare.",
  },
  {
    number: "05",
    englishName: "Visual content",
    italianName: "Immagini",
    optional: true,
    body: "Fotografie e video nella luce giusta, pensati per il sito e per i social. Solo se servono.",
  },
  {
    number: "06",
    englishName: "Launch",
    italianName: "Pubblicazione",
    body: "Messa online, controlli tecnici e SEO, una breve formazione per gestire i contenuti e supporto dopo il lancio.",
  },
];

export type HospitalityType = { name: string; description: string; image: Photo };

export const hospitalityTypes: HospitalityType[] = [
  { name: "B&B", description: "Accoglienza personale, colazioni che si ricordano.", image: photos.hospitalityTypes.bnb },
  { name: "Guest house", description: "Case aperte agli ospiti, con carattere.", image: photos.hospitalityTypes.guestHouse },
  { name: "Agriturismi", description: "Terra, cucina e paesaggio.", image: photos.hospitalityTypes.agriturismo },
  { name: "Ville", description: "Spazi privati, tempo per sé.", image: photos.hospitalityTypes.villa },
  { name: "Case vacanza", description: "La libertà di sentirsi a casa.", image: photos.hospitalityTypes.casaVacanza },
  { name: "Piccoli resort", description: "Servizi completi, a misura d'uomo.", image: photos.hospitalityTypes.miniResort },
  { name: "Dimore", description: "Pietra, memoria, architettura.", image: photos.hospitalityTypes.dimora },
];

export const sardiniaAreas = [
  { name: "Gallura", coordinates: "41.0°N · 9.4°E", description: "Graniti, calette, Costa Smeralda" },
  { name: "Logudoro e Sassarese", coordinates: "40.7°N · 8.6°E", description: "Nuraghi, vigne, altopiani" },
  { name: "Barbagia", coordinates: "40.2°N · 9.2°E", description: "Montagne, borghi, tradizioni" },
  { name: "Ogliastra", coordinates: "39.9°N · 9.6°E", description: "Falesie e codule" },
  { name: "Sinis e Oristanese", coordinates: "39.9°N · 8.5°E", description: "Stagni, dune, luce di ponente" },
  { name: "Cagliari e Sud", coordinates: "39.2°N · 9.1°E", description: "Città, saline, colline" },
  { name: "Sulcis", coordinates: "39.1°N · 8.5°E", description: "Miniere, isole, scogliere" },
];

export const sardiniaThemes = [
  "Costa",
  "Entroterra",
  "Borghi",
  "Architettura",
  "Natura",
  "Tradizioni",
  "Esperienze",
];
