import { site, whatsappUrl } from "@/content/site";
import { ExternalLink } from "@/components/common/ExternalLink";
import { joinClassNames } from "@/lib/joinClassNames";

type SubmissionFallbackProps = {
  /** id usato per spostare qui il focus dopo il tentativo di invio. */
  id: string;
  reason: "error" | "unconfigured";
  /** Link mailto con la richiesta già compilata. */
  mailtoHref: string;
  className?: string;
};

const TITLES: Record<SubmissionFallbackProps["reason"], string> = {
  error: "Non è stato possibile inviare il messaggio.",
  unconfigured: "L'invio online non è ancora attivo.",
};

/** Avviso con canali alternativi (email precompilata, WhatsApp se configurato) quando l'invio online non va a buon fine. */
export function SubmissionFallback({ id, reason, mailtoHref, className }: SubmissionFallbackProps) {
  return (
    <div id={id} tabIndex={-1} role="alert" className={joinClassNames("border-l-2 border-sand bg-paper/5 p-6 focus:outline-none", className)}>
      <p className="font-medium">{TITLES[reason]}</p>
      <p className="mt-2 text-paper/75">
        Nessun dato è stato inviato. Puoi spedire la stessa richiesta con il tuo programma di posta
        {site.contact.whatsapp ? " oppure scrivermi su WhatsApp." : "."}
      </p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        <a href={mailtoHref} className="link-draw py-1 font-medium">Apri l&apos;email già compilata →</a>
        {site.contact.whatsapp && (
          <ExternalLink href={whatsappUrl()} className="link-draw py-1 font-medium">Scrivi su WhatsApp →</ExternalLink>
        )}
      </div>
    </div>
  );
}
