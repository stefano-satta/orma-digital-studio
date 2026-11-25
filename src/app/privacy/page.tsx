import type { Metadata } from "next";
import { site } from "@/content/site";
import { ExternalLink } from "@/components/common/ExternalLink";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Informativa sul trattamento dei dati personali raccolti tramite il sito ORMA.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

/** Data dell'ultima revisione del testo: aggiornarla a ogni modifica. */
const LAST_UPDATED = "25 novembre 2026";

/**
 * Informativa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679 (GDPR).
 * Titolare, email e P.IVA arrivano da src/content/site.ts: cambiandoli lì si aggiornano anche qui.
 * Se il sito aggiunge analytics, cookie di terze parti, newsletter o nuovi fornitori, il testo va rivisto.
 */
export default function PrivacyPage() {
  const { owner, contact } = site;
  const ownerDetails = [owner.name, site.name, owner.location, owner.vatNumber && `P.IVA ${owner.vatNumber}`]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="shell pt-40 pb-32">
      <div className="max-w-2xl">
        <p className="eyebrow text-ink-soft">Informativa</p>
        <h1 className="mt-6 font-serif text-h1">Privacy policy</h1>
        <div className="mt-12 space-y-6 leading-relaxed text-ink-soft [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          <p>
            Questa informativa spiega quali dati personali raccolgo tramite questo sito, perché li uso e quali diritti hai,
            ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR).
          </p>

          <h2>Titolare del trattamento</h2>
          <p>
            {ownerDetails}. Per qualsiasi domanda sui tuoi dati puoi scrivermi a{" "}
            <a className="underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a>.
          </p>

          <h2>Quali dati raccolgo</h2>
          <ul>
            <li>
              <strong className="text-ink">Dati del modulo contatti</strong>: nome, email, nome e località della struttura,
              tipologia, servizi di interesse, budget indicativo (facoltativo) e il testo del messaggio.
            </li>
            <li>
              <strong className="text-ink">Email che mi scrivi direttamente</strong>: indirizzo email e quello che decidi di
              raccontarmi.
            </li>
            <li>
              <strong className="text-ink">Dati tecnici di navigazione</strong>: come ogni sito, il server registra in modo
              automatico alcuni dati tecnici (indirizzo IP, data e ora, pagina richiesta, browser) nei log di accesso.
            </li>
          </ul>
          <p>Nel modulo ti chiedo di non inserire dati particolari (salute, opinioni, ecc.): non servono per un preventivo.</p>

          <h2>Perché li uso e su quale base</h2>
          <ul>
            <li>
              Rispondere alla tua richiesta e, se lo desideri, prepararti un preventivo: è un trattamento necessario per
              misure precontrattuali richieste da te (art. 6.1.b GDPR).
            </li>
            <li>
              Se la richiesta diventa un incarico, gestire il rapporto e gli obblighi fiscali e contabili (art. 6.1.b e
              6.1.c GDPR).
            </li>
            <li>
              Garantire il funzionamento e la sicurezza del sito tramite i log tecnici: legittimo interesse del titolare
              (art. 6.1.f GDPR).
            </li>
          </ul>
          <p>
            I campi obbligatori del modulo servono per capire la richiesta: senza, non posso risponderti. Non uso i tuoi
            dati per newsletter o marketing, non li vendo e non li cedo a terzi, e non prendo decisioni automatizzate né
            faccio profilazione.
          </p>

          <h2>Chi tratta i dati per mio conto</h2>
          <p>
            Uso alcuni fornitori che agiscono come responsabili del trattamento (art. 28 GDPR), solo per i servizi indicati:
          </p>
          <ul>
            <li>
              <strong className="text-ink">Netlify, Inc.</strong> (Stati Uniti): hosting del sito e log tecnici di accesso.
            </li>
            <li>
              <strong className="text-ink">Google</strong> (Google Ireland Ltd. e Google LLC): archiviazione delle richieste
              del modulo in un foglio Google Sheets ed email di avviso.
            </li>
          </ul>
          <p>
            Alcuni di questi fornitori possono trattare i dati negli Stati Uniti. Il trasferimento avviene sulla base delle
            clausole contrattuali standard approvate dalla Commissione europea e, dove il fornitore vi aderisce, del Data
            Privacy Framework UE-USA (artt. 45 e 46 GDPR).
          </p>

          <h2>Per quanto tempo li conservo</h2>
          <ul>
            <li>
              Richieste dal modulo e email che non diventano un incarico: 12 mesi dall&apos;ultimo contatto, poi le cancello.
            </li>
            <li>
              Se nasce un incarico: per la durata del rapporto e, per i documenti fiscali e contabili, per i 10 anni
              previsti dalla legge.
            </li>
            <li>Log tecnici: per il tempo stabilito dal fornitore di hosting, di norma pochi giorni o settimane.</li>
          </ul>

          <h2>Cookie</h2>
          <p>
            Questo sito non usa cookie di profilazione, strumenti di analisi del traffico né pixel pubblicitari, e non
            installa cookie di terze parti. Anche i caratteri tipografici sono serviti direttamente dal sito, senza
            collegamenti a servizi esterni. Per questo non trovi un banner dei cookie.
          </p>

          <h2>I tuoi diritti</h2>
          <p>
            In qualsiasi momento puoi chiedere l&apos;accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione
            del trattamento, la portabilità e opporti al trattamento basato sul legittimo interesse (artt. 15–22 GDPR).
            Basta scrivere a{" "}
            <a className="underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a>: rispondo
            entro un mese.
          </p>
          <p>
            Se ritieni che il trattamento non sia corretto, puoi proporre reclamo al{" "}
            <ExternalLink className="underline underline-offset-4" href="https://www.garanteprivacy.it">
              Garante per la protezione dei dati personali
            </ExternalLink>
            .
          </p>

          <h2>Modifiche</h2>
          <p>
            Se cambia qualcosa nel modo in cui tratto i dati, aggiorno questa pagina. Ultimo aggiornamento: {LAST_UPDATED}.
          </p>
        </div>
      </div>
    </div>
  );
}
