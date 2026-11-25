import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Logo, OrmaMark } from "@/components/common/Logo";

export const metadata: Metadata = {
  title: { absolute: "Pagina non trovata · ORMA" },
  description: "La pagina che cerchi non esiste o è stata spostata.",
  robots: { index: false, follow: true },
  // Non ereditare il canonical della home dal layout radice.
  alternates: { canonical: null },
};

/**
 * 404 del sito, fuori dal layout (site): niente header né footer, fondo sand a tutta pagina.
 * Copre sia gli URL inesistenti sia le chiamate a notFound() nelle pagine.
 */
export default function NotFound() {
  return (
    <div className="grain relative flex min-h-svh flex-col overflow-hidden bg-sand text-ink">
      <header className="shell flex items-center pt-8">
        <Link href="/" className="text-[1.6rem]" aria-label="ORMA, torna alla home">
          <Logo />
        </Link>
      </header>

      <main id="contenuto" className="shell flex flex-1 items-center py-16">
        <div className="grid w-full items-end gap-12 md:grid-cols-12">
          {/* "404" con la O-impronta al posto dello zero: decorativo, il significato è nel titolo. */}
          <p
            aria-hidden="true"
            className="flex items-center font-serif text-[clamp(7rem,26vw,20rem)] leading-[0.8] tracking-[-0.03em] text-ink/90 md:col-span-6"
          >
            4
            <OrmaMark className="mx-[0.04em] h-[0.72em] w-auto text-clay" />
            4
          </p>

          <div className="max-w-md md:col-span-5 md:col-start-8 md:pb-4">
            <p className="eyebrow text-ink/70">Errore 404 · Pagina non trovata</p>
            <h1 className="mt-6 font-serif text-h2">
              Qui non è passato <span className="serif-italic">nessuno.</span>
            </h1>
            <p className="mt-6 leading-relaxed text-ink/75">
              La pagina che cerchi non esiste o è stata spostata. Torna alla home e riprendi il sentiero da lì.
            </p>
            <ArrowLink href="/" className="mt-10">
              Torna alla home
            </ArrowLink>
          </div>
        </div>
      </main>

      <footer className="shell pb-8 text-sm text-ink/60">ORMA · Digital &amp; Visual Studio · Sardegna</footer>
    </div>
  );
}
