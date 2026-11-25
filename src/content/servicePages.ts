import { photos, type Photo } from "./images";
import type { FaqEntry } from "./faq";
import { servicePrices, type PriceItem } from "./pricing";

/**
 * Pagine servizio (/servizi/<slug>): una pagina per ogni intento di ricerca.
 * `serviceId` collega la pagina all'ambito in content/services.ts (preselezione nel modulo
 * con ?servizio=..., nodo Service nel JSON-LD della home).
 */

export type ServiceTopic = { heading: string; paragraphs: string[] };
export type ServiceInclude = { title: string; description: string };
export type ServiceHeroVideo = { mobileSrc: string; desktopSrc: string; poster: Photo };

export type ServicePageContent = {
  slug: string;
  serviceId: string;
  /** Numero e nome dell'ambito, mostrati come eyebrow (es. "01 · Digital Presence"). */
  eyebrow: string;
  /** Nome breve, usato in breadcrumb, footer e link correlati. */
  shortName: string;
  /** Testo dei link interni verso la pagina: descrittivo, con la keyword. */
  linkLabel: string;
  /** Title SEO (il template aggiunge " · ORMA"): keyword in testa, ~50 caratteri. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  /** Frase editoriale che apre la pagina. */
  statement: string;
  note?: string;
  heroImage: Photo;
  heroVideo?: ServiceHeroVideo;
  /** Due immagini inserite tra i paragrafi. */
  inlineImages: [Photo, Photo];
  topics: ServiceTopic[];
  includes: ServiceInclude[];
  /** Voci di prezzo (content/pricing.ts) per la sezione "Quanto costa" e lo schema; senza prezzo = su preventivo. */
  pricing: PriceItem[];
  faqs: FaqEntry[];
  ctaLabel: string;
};

export const servicePages: ServicePageContent[] = [
  {
    slug: "siti-web-strutture-ricettive",
    serviceId: "digital-presence",
    eyebrow: "01 · Digital Presence",
    shortName: "Siti web",
    linkLabel: "Siti web per strutture ricettive",
    metaTitle: "Siti web per B&B e hotel in Sardegna",
    metaDescription:
      "Siti web su misura per B&B, boutique hotel, agriturismi e ville in Sardegna: veloci da smartphone, multilingua, collegati a booking engine e WhatsApp.",
    h1: "Siti web per B&B, hotel e strutture ricettive in Sardegna",
    lead: "Progetto e sviluppo siti per l'ospitalità indipendente: pensati per lo smartphone, costruiti attorno a come gli ospiti cercano e scelgono, collegati ai canali da cui vuoi ricevere le richieste.",
    statement:
      "Il sito è l'unico posto online in cui la tua struttura si presenta con la propria voce, le proprie immagini e le proprie regole.",
    heroImage: photos.services.digitalPresence.image,
    inlineImages: [
      photos.services.digitalPresence.detail,
      // Foto verticale in un riquadro orizzontale: inquadra il tavolo della colazione.
      { ...photos.hospitalityTypes.bnb, objectPosition: "50% 80%" },
    ],
    topics: [
      {
        heading: "Perché un sito, se sei già sui portali",
        paragraphs: [
          "Booking e Airbnb portano visibilità, ma dentro un portale ogni struttura ha lo stesso formato: stessa griglia di foto, stesse icone, stesso spazio per descriversi. L'ospite confronta, e spesso confronta solo il prezzo.",
          "Il sito lavora in un altro momento. È dove arriva chi ti ha già notato, magari proprio su un portale, e vuole capire meglio: com'è la camera, quanto dista il mare, se la colazione è fatta in casa. Se trova risposte chiare e un modo semplice per scriverti, la richiesta arriva a te, senza intermediari.",
        ],
      },
      {
        heading: "Come è fatto un sito che riceve richieste",
        paragraphs: [
          "Parto dallo smartphone, perché è da lì che la maggior parte degli ospiti cerca e chiede disponibilità. Testi leggibili, immagini grandi ma leggere, pagine che si caricano in fretta anche con il segnale debole della spiaggia.",
          "Poi le informazioni pratiche, che sono quelle che fanno decidere: come arrivare, orari di check-in, parcheggio, animali, distanza dai luoghi vicini. E un contatto sempre a portata di pollice: un modulo di richiesta con pochi campi, WhatsApp, l'email, il telefono.",
        ],
      },
      {
        heading: "Landing page o sito multipagina",
        paragraphs: [
          "Per una villa, una struttura piccola o una nuova apertura una landing page ben fatta è spesso il punto di partenza giusto: una sola pagina, chiara, che accompagna l'ospite fino alla richiesta.",
          "Quando ci sono più camere da raccontare, servizi, esperienze e un territorio da mostrare, serve un sito multipagina. Ogni pagina ha un compito preciso e risponde a una ricerca precisa, così il sito diventa anche più facile da trovare.",
        ],
      },
      {
        heading: "Multilingua e SEO fin dalla prima riga di codice",
        paragraphs: [
          "Per molte strutture in Sardegna una versione inglese è quasi indispensabile, e spesso servono anche tedesco o francese. Ogni lingua ha le sue pagine e i suoi indirizzi, collegati in modo che Google mostri a ciascun ospite la versione giusta.",
          "La SEO tecnica fa parte del progetto: struttura delle pagine, velocità, dati strutturati che descrivono la struttura ai motori di ricerca, coerenza con la scheda Google Business Profile. Sono basi che è molto più semplice costruire subito che correggere dopo.",
        ],
      },
      {
        heading: "Collegato agli strumenti che usi già",
        paragraphs: [
          "Il sito può collegarsi al booking engine o al channel manager che usi, oppure a una soluzione più semplice come un modulo di richiesta disponibilità. Scegliamo insieme l'opzione più adatta al tuo modo di lavorare, senza aggiungere strumenti che non userai.",
        ],
      },
    ],
    includes: [
      { title: "Strategia e contenuti", description: "Obiettivi, pubblico, architettura delle pagine e testi che rispondono alle domande reali degli ospiti." },
      { title: "Design su misura", description: "Tipografia, colori e composizione costruiti attorno all'identità della struttura, non a un tema già visto." },
      { title: "Sviluppo veloce e accessibile", description: "Tecnologie moderne, caricamento rapido su smartphone, pagine leggibili da tutti." },
      { title: "Multilingua", description: "Versioni in altre lingue con indirizzi dedicati e collegamenti corretti per Google." },
      { title: "Booking, WhatsApp e Maps", description: "Integrazione con il sistema di prenotazione, contatto diretto e indicazioni per arrivare." },
      { title: "SEO tecnica e dati strutturati", description: "Struttura, metadati, sitemap e schema per farsi capire da Google e dagli assistenti AI." },
      { title: "Formazione e supporto", description: "Una breve formazione per gestire i contenuti e supporto dopo la pubblicazione." },
    ],
    pricing: [
      { title: "Landing page su misura", description: "Una sola pagina con design su misura, galleria, SEO di base, modulo di richiesta, WhatsApp e Maps.", price: servicePrices.landingPage },
      { title: "Sito multipagina", description: "Camere, servizi e territorio su più pagine, con SEO di base inclusa. Lingue aggiuntive e integrazione booking fanno variare il preventivo.", price: servicePrices.multipageSite },
    ],
    faqs: [
      {
        question: "Quanto costa un sito per una struttura ricettiva?",
        answer: "Indicativamente una landing page su misura costa fino a 700 €, mentre un sito multipagina parte da 1.000 €. In entrambi i casi la SEO di base è inclusa. Lingue aggiuntive, integrazione booking e quantità di contenuti fanno variare il preventivo. Prezzi IVA esclusa.",
      },
      {
        question: "Serve un sito se sono già su Booking e Airbnb?",
        answer: "I portali sono utili per farsi trovare, ma lì ogni struttura somiglia alle altre e il rapporto con l'ospite passa da un intermediario. Il sito è il posto dove chi ti ha notato può approfondire, fidarsi e scriverti direttamente. Le due cose lavorano insieme.",
      },
      {
        question: "Meglio una landing page o un sito completo?",
        answer: "Dipende da quanto c'è da raccontare. Una landing page funziona bene per ville, strutture piccole e nuove aperture. Se hai più camere, servizi, esperienze o più lingue, un sito multipagina ti dà spazio e più possibilità di essere trovato su ricerche diverse.",
      },
      {
        question: "Posso aggiornare i contenuti da solo?",
        answer: "Sì, se ti serve. All'inizio definiamo quali contenuti vuoi gestire in autonomia, come offerte, foto o testi stagionali, e alla consegna c'è una breve formazione. Per il resto puoi contare su un supporto continuativo o su richiesta.",
      },
      {
        question: "Quante lingue servono per una struttura in Sardegna?",
        answer: "L'inglese è quasi sempre necessario. Tedesco e francese dipendono dagli ospiti che ricevi già e da quelli che vorresti attirare: guardiamo insieme le provenienze delle prenotazioni e decidiamo da lì.",
      },
      {
        question: "Il sito può collegarsi al mio sistema di prenotazione?",
        answer: "Sì. Può integrare il booking engine o il channel manager che usi già, oppure un modulo di richiesta disponibilità se preferisci gestire le prenotazioni personalmente.",
      },
    ],
    ctaLabel: "Parliamo del tuo sito",
  },
  {
    slug: "fotografia-strutture-ricettive",
    serviceId: "visual-storytelling",
    eyebrow: "02 · Visual Storytelling",
    shortName: "Fotografia",
    linkLabel: "Fotografia per strutture ricettive",
    metaTitle: "Fotografo per hotel e B&B in Sardegna",
    metaDescription:
      "Fotografia per hotel, B&B, agriturismi e ville in Sardegna: interni, architettura, food e lifestyle in luce naturale, per sito, portali e social.",
    h1: "Fotografia per hotel, B&B e strutture ricettive in Sardegna",
    lead: "Fotografie di ambienti, architettura, dettagli e cucina, pensate per il sito, per i portali e per i social. Luce naturale, materiali veri, nessun effetto artificiale.",
    statement:
      "Un ospite sceglie prima con gli occhi. Le fotografie devono restituire la luce, i materiali e la quiete che troverà arrivando.",
    heroImage: photos.services.visualStorytelling.image,
    inlineImages: [
      // Foto verticale nella fascia larga: inquadra il piatto.
      { ...photos.services.visualStorytelling.detail, objectPosition: "50% 72%" },
      photos.hospitalityTypes.dimora,
    ],
    topics: [
      {
        heading: "Le foto decidono il primo clic",
        paragraphs: [
          "Su un portale, su Google Maps o su Instagram la prima cosa che l'ospite vede è un'immagine. Se è scura, storta o scattata di fretta, la struttura sembra meno curata di quanto sia davvero, e l'ospite passa oltre prima di leggere una riga.",
          "Fotografie fatte bene non abbelliscono: mostrano con onestà ciò che c'è, nella luce giusta. È anche il modo migliore per attirare gli ospiti che apprezzeranno davvero il luogo.",
        ],
      },
      {
        heading: "Come preparo uno shooting",
        paragraphs: [
          "Prima dello shooting ci sentiamo, meglio se sul posto, per capire cosa rende unica la struttura. Da lì nasce una shot list: gli ambienti, i dettagli e i momenti da fotografare, in ordine di priorità.",
          "Gli orari li decide la luce. Gli esterni rendono al meglio all'alba o nell'ora dorata, gli interni con la luce morbida del giorno. Per questo lo shooting si organizza attorno al sole e alla stagione, non solo al calendario.",
        ],
      },
      {
        heading: "Cosa fotografo",
        paragraphs: [
          "Camere e bagni, spazi comuni, esterni, piscina e panorama. La colazione e la cucina, i dettagli dei materiali: pietra, legno, lino, ceramica. Le persone, quando ci sono, come gesti più che come pose: una mano che versa il caffè, qualcuno che legge sulla terrazza.",
          "E se serve, il territorio intorno: la spiaggia vicina, il paese, la vigna. Spesso è proprio il luogo a convincere un ospite a scegliere.",
        ],
      },
      {
        heading: "Immagini pensate per ogni canale",
        paragraphs: [
          "Una stessa foto non funziona ovunque. Il sito vuole immagini orizzontali e ampie, i social formati verticali, i portali una copertina che si legga anche in piccolo. Durante lo shooting penso già a dove andrà ogni immagine, così ricevi una selezione pronta per sito, portali, Google Business Profile e social.",
        ],
      },
    ],
    includes: [
      { title: "Sopralluogo e shot list", description: "Cosa fotografare, in che ordine e con quale luce, deciso prima di arrivare con la macchina fotografica." },
      { title: "Interni e architettura", description: "Camere, bagni e spazi comuni con linee dritte, colori fedeli e luce naturale." },
      { title: "Esterni e panorama", description: "Facciate, giardini, piscina e vista, nelle ore in cui la luce valorizza il luogo." },
      { title: "Food e colazione", description: "La cucina e la tavola, raccontate con naturalezza." },
      { title: "Lifestyle", description: "Momenti di vita e gesti, per far immaginare il soggiorno." },
      { title: "Post-produzione naturale", description: "Correzioni di luce e colore, senza HDR esasperati né cieli finti." },
      { title: "File per ogni utilizzo", description: "Versioni ottimizzate per il web e file in alta risoluzione, divise per canale." },
    ],
    pricing: [
      { title: "Shooting fotografico", description: "Il costo dipende da dimensioni della struttura, numero di ambienti, momenti della giornata e trasferta: lo definiamo dopo una prima conversazione o un sopralluogo." },
    ],
    faqs: [
      {
        question: "Quanto costa uno shooting fotografico per una struttura ricettiva?",
        answer: "Lo definisco caso per caso, in base al lavoro da fare: dimensioni della struttura, numero di ambienti, momenti della giornata da fotografare, eventuale trasferta. Prima di iniziare ricevi un preventivo dettagliato, con voci chiare.",
      },
      {
        question: "Qual è il periodo migliore per lo shooting?",
        answer: "Quando la struttura è pronta e il paesaggio è al suo meglio, idealmente prima dell'inizio della stagione, così le foto sono online quando gli ospiti iniziano a cercare. In Sardegna primavera e inizio autunno offrono una luce morbida e colori pieni.",
      },
      {
        question: "Quanto dura uno shooting?",
        answer: "Dipende dalle dimensioni della struttura e da cosa c'è da fotografare. Lo definiamo prima, partendo dalla shot list, e organizziamo le ore attorno alla luce del mattino e del tardo pomeriggio.",
      },
      {
        question: "Devo preparare la struttura?",
        answer: "Sì: camere in ordine, oggetti personali riposti, fiori o dettagli che fanno parte dell'accoglienza. Prima dello shooting ti indico cosa preparare, ambiente per ambiente.",
      },
      {
        question: "Posso usare le foto su Booking, Airbnb e sui social?",
        answer: "Sì, le fotografie sono pensate anche per i portali e i social. Gli utilizzi previsti li mettiamo per iscritto nel preventivo, così è tutto chiaro fin dall'inizio.",
      },
      {
        question: "Servono modelli o persone nelle foto?",
        answer: "Non sempre. Molte immagini funzionano senza persone; quando servono, bastano gesti naturali, anche dello staff o di ospiti che lo desiderano, sempre con il loro consenso.",
      },
    ],
    ctaLabel: "Pianifica uno shooting",
  },
  {
    slug: "video-strutture-ricettive",
    serviceId: "visual-storytelling",
    eyebrow: "02 · Visual Storytelling",
    shortName: "Video",
    linkLabel: "Video per strutture ricettive",
    metaTitle: "Video per hotel e strutture ricettive in Sardegna",
    metaDescription:
      "Video per hotel, ville, B&B e agriturismi in Sardegna: loop per la homepage, riprese aeree con drone, reel e contenuti verticali per i social.",
    h1: "Video per hotel, ville e strutture ricettive in Sardegna",
    lead: "Video per la homepage, riprese aeree con il drone, reel e contenuti verticali: il ritmo di un luogo in pochi secondi, pensato per caricarsi in fretta sul sito e funzionare sui social.",
    statement:
      "Una foto mostra com'è un luogo. Un video fa sentire com'è starci: l'acqua che si muove, la luce che cambia, il tempo che rallenta.",
    heroImage: photos.hospitalityTypes.villa,
    heroVideo: {
      mobileSrc: "/videos/drone_pano-960.mp4",
      desktopSrc: "/videos/drone_pano-1600.mp4",
      poster: {
        src: "/videos/drone-spiaggia-macchia-sardegna-poster.jpg",
        alt: "Vista aerea di una baia di sabbia bianca e mare turchese tra macchia mediterranea e colline, Sardegna",
      },
    },
    inlineImages: [
      // Foto verticale a 768 px: a tutta larghezza sarebbe sgranata.
      { ...photos.hospitalityTypes.villa, frame: "portrait", frameAlign: "right", objectPosition: "50% 85%" },
      photos.hospitalityTypes.miniResort,
    ],
    topics: [
      {
        heading: "Cosa racconta un video meglio di una foto",
        paragraphs: [
          "Il movimento dell'acqua in piscina, le tende che si muovono con il maestrale, il passaggio dalla camera alla terrazza. Sono dettagli che una fotografia suggerisce e un video fa vivere.",
          "Per questo il video non sostituisce le foto: le completa. Le immagini fisse informano, il video crea l'atmosfera e trattiene lo sguardo qualche secondo in più.",
        ],
      },
      {
        heading: "Il video per la homepage",
        paragraphs: [
          "È il primo contatto con il sito: un loop breve, senza audio, che parte da solo. Deve essere bello e allo stesso tempo leggero, altrimenti rallenta la pagina e fa più danni che altro.",
          "Per questo preparo versioni diverse per smartphone e desktop, compresse per il web, con un'immagine di anteprima che compare subito mentre il video si carica. Il sito resta veloce e l'ospite vede qualcosa fin dal primo istante.",
        ],
      },
      {
        heading: "Riprese aeree con il drone",
        paragraphs: [
          "Dall'alto si capisce in un attimo ciò che a parole richiede un paragrafo: quanto dista il mare, com'è la baia, cosa c'è intorno. Una ripresa aerea mette la struttura nel suo paesaggio e dà all'ospite il senso del luogo prima ancora di arrivare.",
          "Uso il drone con misura: pochi secondi nel video della homepage, qualche passaggio nei reel, inquadrature dall'alto da cui ricavare anche fotografie. Ogni volo si pianifica in anticipo, verificando le regole e le eventuali restrizioni della zona, con attenzione alla privacy di ospiti e vicini.",
        ],
      },
      {
        heading: "Reel e contenuti verticali",
        paragraphs: [
          "Instagram, TikTok e le storie chiedono un altro linguaggio: formato verticale, ritmo più rapido, i primi secondi decisivi. Da una stessa giornata di riprese posso ricavare una serie di clip da pubblicare nel corso della stagione, così i tuoi canali restano vivi senza nuovi shooting.",
        ],
      },
      {
        heading: "Foto e video nello stesso progetto",
        paragraphs: [
          "Fotografia e video si possono realizzare insieme, nelle stesse giornate e con la stessa luce. I tempi si riducono e il racconto resta coerente: il video della homepage, le foto delle camere e i reel parlano la stessa lingua visiva.",
        ],
      },
    ],
    includes: [
      { title: "Concept e scaletta", description: "Cosa raccontare, in quali luoghi e in quale ordine, deciso prima delle riprese." },
      { title: "Loop per la homepage", description: "Un video breve, senza audio, in versioni ottimizzate per smartphone e desktop." },
      { title: "Riprese aeree con drone", description: "Panoramiche e passaggi dall'alto che mostrano la struttura nel suo paesaggio, nel rispetto delle regole di volo." },
      { title: "Reel e verticali", description: "Clip per Instagram, TikTok e storie, da pubblicare nel corso della stagione." },
      { title: "Montaggio e colore", description: "Ritmo, transizioni e correzione colore coerenti con le fotografie." },
      { title: "File pronti all'uso", description: "Formati e pesi adatti al sito e a ciascun social, con immagine di anteprima." },
    ],
    pricing: [
      { title: "Video e riprese con drone", description: "Il costo dipende da giornate di ripresa, uso del drone, numero di formati e reel, trasferta." },
      { title: "Foto e video insieme", description: "Un preventivo unico per entrambi, con giornate di ripresa condivise." },
    ],
    faqs: [
      {
        question: "Quanto costa un video per una struttura ricettiva?",
        answer: "Lo definisco caso per caso, in base al lavoro da fare: giornate di ripresa, uso del drone, numero di formati e reel, eventuale trasferta. Prima di iniziare ricevi un preventivo dettagliato. Se servono anche le fotografie, facciamo un preventivo unico.",
      },
      {
        question: "Fai riprese con il drone?",
        answer: "Sì. Le riprese aeree mostrano la posizione della struttura e il paesaggio intorno, e si usano nel video della homepage, nei reel e come fotografie dall'alto. Ogni volo si pianifica in anticipo: vicino ad aeroporti o in alcune aree protette il volo può essere limitato, e lo verifico prima delle riprese.",
      },
      {
        question: "Quanto deve durare il video della homepage?",
        answer: "Poco: un loop di pochi secondi che si ripete senza stacchi evidenti. Serve a creare atmosfera, non a raccontare tutto, e più è breve più resta leggero.",
      },
      {
        question: "Un video in homepage rallenta il sito?",
        answer: "Non se è preparato bene. Lo comprimo per il web, creo una versione più leggera per smartphone e aggiungo un'immagine di anteprima che compare subito. Così la pagina resta veloce.",
      },
      {
        question: "Posso usare i video anche sui social?",
        answer: "Sì. Durante le riprese penso già ai formati verticali, così dallo stesso materiale nascono anche reel e storie.",
      },
      {
        question: "Conviene fare foto e video insieme?",
        answer: "Spesso sì: stesse giornate, stessa luce, un racconto coerente e meno tempo in cui la struttura deve essere preparata per le riprese.",
      },
    ],
    ctaLabel: "Parliamo del tuo video",
  },
  {
    slug: "seo-strutture-ricettive",
    serviceId: "digital-growth",
    eyebrow: "03 · Digital Growth",
    shortName: "SEO e GEO",
    linkLabel: "SEO e GEO per strutture ricettive",
    metaTitle: "SEO e GEO per strutture ricettive in Sardegna",
    metaDescription:
      "SEO per hotel, B&B e agriturismi in Sardegna: ottimizzazione tecnica, Google Business Profile, contenuti locali e visibilità negli assistenti AI come ChatGPT.",
    h1: "SEO per strutture ricettive in Sardegna, su Google e negli assistenti AI",
    lead: "Ottimizzazione tecnica, ricerca locale e contenuti utili, perché la tua struttura compaia quando un ospite cerca su Google, su Maps o chiede consiglio a ChatGPT, Gemini o Perplexity.",
    statement:
      "Gli ospiti non cercano un nome: cercano un luogo, un'esperienza, una risposta. La SEO serve a far coincidere quella risposta con la tua struttura.",
    note: "Nessuno può garantire una posizione su Google o una citazione da parte di un'AI. Posso garantire un lavoro fatto bene, misurabile e trasparente.",
    heroImage: photos.sardinia.background,
    inlineImages: [
      // Foto orizzontale a 836 px: a tutta larghezza sarebbe sgranata.
      { ...photos.services.digitalGrowth.image, frame: "compact" },
      photos.sardinia.wine,
    ],
    topics: [
      {
        heading: "Come cercano gli ospiti oggi",
        paragraphs: [
          "Una parte cerca su Google e su Maps: «agriturismo vicino a Orosei», «B&B centro storico Alghero». Un'altra parte, sempre più ampia, fa la stessa domanda a un assistente AI e riceve una risposta già pronta, con pochi nomi consigliati.",
          "In entrambi i casi vince chi ha informazioni chiare, coerenti e facili da verificare. È su questo che lavoro.",
        ],
      },
      {
        heading: "SEO tecnica",
        paragraphs: [
          "Velocità su smartphone, struttura delle pagine, titoli e descrizioni, sitemap, versioni linguistiche collegate correttamente. E i dati strutturati, che descrivono ai motori di ricerca cosa offre la struttura, dove si trova e come contattarla.",
          "Sono interventi poco visibili ma decisivi: senza queste basi anche i contenuti migliori faticano a emergere.",
        ],
      },
      {
        heading: "Local SEO e Google Business Profile",
        paragraphs: [
          "Per una struttura ricettiva la scheda su Google è spesso il primo contatto, prima ancora del sito. Categorie corrette, foto curate, orari, servizi, risposte alle recensioni: tutto contribuisce a comparire su Maps quando qualcuno cerca nella tua zona.",
          "Conta anche la coerenza: nome, indirizzo e telefono identici sul sito, sulla scheda Google e sui portali.",
        ],
      },
      {
        heading: "GEO: farsi citare dagli assistenti AI",
        paragraphs: [
          "La GEO, Generative Engine Optimization, è il lavoro che rende un sito comprensibile e citabile dagli assistenti basati sull'intelligenza artificiale. Questi strumenti scelgono le fonti che rispondono in modo diretto e verificabile alle domande degli utenti.",
          "In pratica significa pagine con risposte chiare alle domande reali degli ospiti, informazioni concrete come distanze, servizi e periodi di apertura, dati strutturati e una presenza coerente anche fuori dal sito.",
        ],
      },
      {
        heading: "Contenuti sul territorio",
        paragraphs: [
          "Le spiagge raggiungibili a piedi, i sentieri, le cantine, le feste di paese. Guide e pagine sul territorio rispondono a ricerche che gli ospiti fanno davvero mentre organizzano il viaggio, e portano sul sito persone interessate proprio alla tua zona.",
        ],
      },
      {
        heading: "Misurare, con trasparenza",
        paragraphs: [
          "Search Console, analisi del traffico e, soprattutto, le richieste dirette che arrivano dal sito. Ricevi report chiari, senza gergo, con quello che è cambiato e quello che faremo dopo.",
        ],
      },
    ],
    includes: [
      { title: "Audit iniziale", description: "Analisi tecnica e dei contenuti per capire da dove partire e cosa conta di più." },
      { title: "Ottimizzazione on-page", description: "Titoli, descrizioni, struttura delle pagine e collegamenti interni." },
      { title: "Dati strutturati", description: "Schema che descrive struttura, servizi, posizione e domande frequenti." },
      { title: "Google Business Profile", description: "Scheda completa, coerente con il sito e curata nel tempo." },
      { title: "Contenuti e guide locali", description: "Pagine utili su territorio ed esperienze, scritte per gli ospiti." },
      { title: "Ottimizzazione per gli assistenti AI", description: "Risposte chiare e informazioni verificabili, facili da citare." },
      { title: "Monitoraggio e manutenzione", description: "Report periodici, aggiornamenti, sicurezza e piccole modifiche." },
    ],
    pricing: [
      { title: "SEO di base", description: "Inclusa in ogni landing page e sito multipagina: struttura delle pagine, metadati, velocità, sitemap e dati strutturati.", price: servicePrices.baseSeoIncluded },
      { title: "Percorso SEO e GEO", description: "Pacchetto a sé, costruito sul punto di partenza del sito e sugli obiettivi: audit, contenuti e guide locali, Google Business Profile, ottimizzazione per gli assistenti AI e report." },
    ],
    faqs: [
      {
        question: "Quanto costa la SEO per una struttura ricettiva?",
        answer: "La SEO di base è inclusa in ogni landing page e sito multipagina. Un percorso SEO e GEO dedicato è un pacchetto a sé: lo definisco in base al punto di partenza del sito e agli obiettivi, con un preventivo su misura.",
      },
      {
        question: "Cos'è la GEO?",
        answer: "GEO sta per Generative Engine Optimization: è l'insieme di interventi che aiutano gli assistenti basati sull'intelligenza artificiale, come ChatGPT, Gemini o Perplexity, a capire un sito e a citarlo nelle loro risposte. Si basa su contenuti chiari, informazioni verificabili, dati strutturati e una presenza coerente online.",
      },
      {
        question: "Dopo quanto tempo si vedono i risultati della SEO?",
        answer: "Di solito servono mesi, non settimane. Dipende dal punto di partenza del sito, dalla concorrenza nella tua zona e da quanto contenuto utile si riesce a pubblicare. Gli interventi tecnici agiscono prima, i contenuti costruiscono risultati nel tempo.",
      },
      {
        question: "Serve la scheda Google Business Profile se ho già un sito?",
        answer: "Sì. La scheda è ciò che compare su Maps e nei risultati locali, spesso prima del sito. Sito e scheda lavorano insieme e devono raccontare le stesse informazioni.",
      },
      {
        question: "Puoi garantirmi la prima posizione su Google?",
        answer: "No, e diffiderei di chi lo promette. Posso garantire un lavoro tecnico curato, contenuti utili e report trasparenti, che sono ciò che dà a un sito le basi per farsi trovare.",
      },
    ],
    ctaLabel: "Parliamo di crescita",
  },
];

export function getServicePage(slug: string): ServicePageContent {
  const servicePage = servicePages.find((candidate) => candidate.slug === slug);
  if (!servicePage) throw new Error(`Pagina servizio sconosciuta: ${slug}`);
  return servicePage;
}

export const servicePagePath = (servicePage: Pick<ServicePageContent, "slug">) => `/servizi/${servicePage.slug}`;
