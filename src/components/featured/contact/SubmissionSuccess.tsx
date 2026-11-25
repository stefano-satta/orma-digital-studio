import { Check } from "lucide-react";

/** Conferma mostrata al posto del modulo dopo un invio riuscito. Riceve il focus per gli screen reader. */
export function SubmissionSuccess({ id }: { id: string }) {
  return (
    <div id={id} tabIndex={-1} role="status" className="border-t border-paper/20 pt-10 focus:outline-none">
      <Check className="size-10 text-sand" strokeWidth={1.3} aria-hidden="true" />
      <p className="mt-6 font-serif text-h3">Grazie, la tua richiesta è arrivata.</p>
      <p className="mt-4 max-w-md text-paper/75">
        Ti risponderò personalmente via email. Nel frattempo, se preferisci, puoi scrivermi anche su WhatsApp.
      </p>
    </div>
  );
}
