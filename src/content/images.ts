/**
 * Libreria immagini, organizzata per sezione del sito.
 * Le foto del sito sono file locali in /public/images.
 * Restano su Unsplash (licenza Unsplash) solo quelle dei progetti di esempio
 * del portfolio: sostituiscile con fotografie proprie cambiando `src` con un
 * percorso locale in /public.
 * La hero importa direttamente /public/images/villa-pietra-costa-sardegna-tramonto.jpg
 */

export type Photo = {
  src: string;
  alt: string;
  /** Punto d'inquadratura per object-fit: cover (CSS object-position). Default: centro. */
  objectPosition?: string;
  /**
   * Solo per la prima immagine inline delle pagine servizio, che di default è una
   * fascia a tutta larghezza. Per foto verticali o a bassa risoluzione, che lì
   * risulterebbero sgranate: "portrait" = riquadro verticale 4:5 su 5 colonne,
   * "compact" = riquadro orizzontale 16:9 su 7 colonne.
   */
  frame?: "portrait" | "compact";
  /** Con `frame`: sposta il riquadro a destra, allineato all'inizio della colonna del testo. */
  frameAlign?: "right";
};

type ServicePhotos = { image: Photo; detail: Photo };
type ProjectPhotos = { cover: Photo; gallery: Photo[] };

const unsplashUrl = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=2400&q=80`;

/* — Sezione Manifesto — */
const manifesto = {
  main: {
    src: "/images/promontorio-torre-costiera-sardegna.avif",
    alt: "Promontorio con torre costiera tra due mari, Sardegna",
  },
} satisfies Record<string, Photo>;

/* — Sezione Servizi: immagine principale e dettaglio per ogni servizio — */
const services = {
  digitalPresence: {
    image: {
      src: "/images/soggiorno-soffitto-legno-volta.avif",
      alt: "Soggiorno con soffitto in legno a volta, pareti bianche e arco in muratura",
    },
    detail: {
      src: "/images/corridoio-travi-legno-mobili-antichi.avif",
      alt: "Corridoio bianco con travi in legno a vista e mobili antichi",
    },
  },
  visualStorytelling: {
    image: {
      src: "/images/cena-aperto-casale-pietra-tramonto.avif",
      alt: "Cena all'aperto davanti a un casale in pietra al tramonto, con brindisi tra amici e colline sullo sfondo",
    },
    detail: {
      src: "/images/pasta-vongole-gamberi.avif",
      alt: "Piatto di pasta con vongole e gamberi",
    },
  },
  digitalGrowth: {
    image: {
      src: "/images/camera-vetrata-piscina-mare.avif",
      alt: "Camera da letto luminosa con vetrata aperta sulla piscina e sul mare, al tramonto",
    },
    detail: {
      src: "/images/ospiti-terrazza-villa-baia-sardegna.avif",
      alt: "Coppia di ospiti che si scatta un selfie sulla terrazza di una villa in pietra affacciata su una baia, Sardegna",
    },
  },
} satisfies Record<string, ServicePhotos>;

/* — Sezione "Per chi lavoro": tipologie di strutture — */
const hospitalityTypes = {
  bnb: {
    src: "/images/bb-colazione-ingresso-pietra.avif",
    alt: "Colazione su un tavolino in ferro davanti all'ingresso in pietra di un B&B, tra buganvillee e scorcio di mare",
  },
  guestHouse: {
    src: "/images/guest-house-cortile-pergolato-piscina.avif",
    alt: "Cortile in pietra di una guest house con pergolato, salotto all'aperto e piccola piscina",
  },
  agriturismo: {
    src: "/images/agriturismo-tavola-casale-colline.avif",
    alt: "Tavola apparecchiata sotto una tettoia di legno davanti a un casale bianco tra le colline",
  },
  villa: {
    src: "/images/villa-terrazza-piscina-sfioro-baia.avif",
    alt: "Terrazza di una villa con divani bianchi e piscina a sfioro affacciata su una baia di granito",
  },
  casaVacanza: {
    src: "/images/casa-vacanza-terrazzino-borgo-mare.avif",
    alt: "Terrazzino fiorito con tavolino per due e vista su un borgo colorato sul mare",
  },
  miniResort: {
    src: "/images/piccolo-resort-case-pietra-spiaggia.avif",
    alt: "Piccolo resort di case in pietra tra la macchia, con piscina e spiaggia privata sul mare turchese",
  },
  dimora: {
    src: "/images/dimora-storica-corte-arco-pietra.avif",
    alt: "Corte interna di una dimora storica con arco in pietra, scala esterna e poltrone in velluto blu",
  },
} satisfies Record<string, Photo>;

/* — Sezione Sardegna: sfondo ed esperienze — */
const sardinia = {
  background: {
    src: "/images/barche-baia-falesie-sardegna.avif",
    alt: "Barche ancorate in una baia turchese sotto le falesie calcaree della Sardegna",
  },
  wine: {
    src: "/images/vendemmia-vigne-nuraghe-tramonto.avif",
    alt: "Vendemmia tra muretti a secco e vigne al tramonto, con un nuraghe sullo sfondo",
  },
  hiking: {
    src: "/images/escursione-sentiero-granito-costa.avif",
    alt: "Gruppo di escursionisti su un sentiero tra granito e macchia mediterranea, con la costa sullo sfondo",
  },
  sailing: {
    src: "/images/barca-vela-caletta-granito.avif",
    alt: "Barca a vela ancorata in una caletta turchese tra rocce granitiche e macchia mediterranea",
  },
} satisfies Record<string, Photo>;

/* — Sezione Portfolio: copertina e galleria per ogni progetto di esempio.
 *   Alcune gallerie riusano le foto dei servizi (stesso file, nessun duplicato). — */
const portfolio = {
  coastalBoutiqueStay: {
    cover: {
      src: unsplashUrl("1759848915476-11bb5f92f8cd"),
      alt: "Ville immerse nella macchia mediterranea affacciate sul mare blu",
    },
    gallery: [
      {
        src: unsplashUrl("1565242913449-72ac29184f55"),
        alt: "Acqua trasparente e fondale chiaro davanti a un isolotto granitico in Sardegna",
      },
      {
        src: unsplashUrl("1779903726446-6f796d533d47"),
        alt: "Camera essenziale con letto in lino chiaro e luce naturale",
      },
      {
        src: unsplashUrl("1592248207497-1edb720a1552"),
        alt: "Vasca in pietra contro un muro di pietra a secco tra le piante",
      },
      services.visualStorytelling.image,
    ],
  },
  ruralSardinianRetreat: {
    cover: {
      src: unsplashUrl("1714930424652-7e0624abd250"),
      alt: "Antica capanna di pastori in pietra su un altopiano dell'entroterra sardo",
    },
    gallery: [
      {
        src: unsplashUrl("1786966485314-47d35985e5d3"),
        alt: "Tavoli in pietra e sedie in legno in un cortile rustico all'aperto",
      },
      services.visualStorytelling.detail,
      {
        src: unsplashUrl("1673807933995-38e2b764099c"),
        alt: "Nuraghe in pietra in mezzo a un prato verde nell'entroterra della Sardegna",
      },
      {
        src: unsplashUrl("1611776517133-f6163224d28c"),
        alt: "Camera con testiera in legno intagliato e lenzuola bianche, luce calda",
      },
    ],
  },
  mediterraneanPrivateVilla: {
    cover: {
      src: unsplashUrl("1416331108676-a22ccb276e35"),
      alt: "Casa bianca immersa tra gli alberi con piscina",
    },
    gallery: [
      {
        src: unsplashUrl("1696087636176-b689cb60b9b1"),
        alt: "Casa bianca con un sentiero in pietra tra la vegetazione mediterranea",
      },
      services.digitalPresence.image,
      services.digitalPresence.detail,
      {
        src: unsplashUrl("1654006555377-136011e66769"),
        alt: "Spiaggia di sabbia chiara e torre di avvistamento sul promontorio, Sardegna",
      },
    ],
  },
} satisfies Record<string, ProjectPhotos>;

export const photos = {
  manifesto,
  services,
  hospitalityTypes,
  sardinia,
  portfolio,
};
