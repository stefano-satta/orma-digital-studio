import { joinClassNames } from "@/lib/joinClassNames";

/** Tracciato SVG del segno ORMA (viewBox 0 0 40 44), condiviso con l'immagine Open Graph. */
export const ORMA_MARK_PATH =
  "M20 2.2C9.8 2.2 2.6 11 2.6 22S9.8 41.8 20 41.8 37.4 33 37.4 22 30.2 2.2 20 2.2Zm1.7 4.2c-6 0-11 6.9-11 15.4s5 15.6 11 15.6 10.9-6.9 10.9-15.6S27.7 6.4 21.7 6.4Z";
export const ORMA_MARK_ROTATION = "rotate(-9 20 22)";

/**
 * Il segno ORMA: una "O" come impronta.
 * Un anello ellittico a spessore variabile, più pieno in basso a sinistra,
 * come la traccia lasciata da una pressione. Funziona da solo (favicon,
 * avatar social, watermark) o come prima lettera del wordmark.
 * È decorativo: il nome accessibile va fornito dal contesto.
 */
export function OrmaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 44" className={className} aria-hidden="true" fill="currentColor">
      <path fillRule="evenodd" transform={ORMA_MARK_ROTATION} d={ORMA_MARK_PATH} />
    </svg>
  );
}

/** Wordmark: la O-impronta seguita da RMA in Instrument Serif spaziato. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={joinClassNames("inline-flex flex-col leading-none", className)}>
      <span className="inline-flex items-baseline font-serif tracking-[0.14em]" aria-hidden="true">
        <OrmaMark className="relative top-[0.04em] mr-[0.1em] h-[0.74em] w-auto self-center" />
        <span>RMA</span>
      </span>
      <span className="sr-only">ORMA</span>
    </span>
  );
}
