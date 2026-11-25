"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import heroVillaImage from "../../../../public/images/villa-pietra-costa-sardegna-tramonto.jpg";
import { ormaEase } from "@/components/common/motion/primitives";

/** Le due righe del payoff animate separatamente: testo reale nel DOM, una sola volta (niente copia sr-only duplicata). */
const headlineLines: { key: string; content: ReactNode }[] = [
  { key: "first-line", content: "Ogni luogo" },
  {
    key: "second-line",
    content: (
      <>
        lascia un’<em className="serif-italic text-sand">orma.</em>
      </>
    ),
  },
];

/** Props di motion per una comparsa dal basso con ritardo. */
const fadeUpWithDelay = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: ormaEase, delay },
});

/**
 * Hero a tutto schermo (dal mockup): fotografia della villa al tramonto,
 * header trasparente sopra, titolo serif chiaro allineato a sinistra.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageTranslateY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "14%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 1.06]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-forest-deep text-paper"
    >
      {/* Fotografia */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: ormaEase }}
      >
        <motion.div className="absolute inset-[-7%_0]" style={{ y: imageTranslateY, scale: imageScale }}>
          <Image
            src={heroVillaImage}
            alt="Villa in pietra sulla costa della Sardegna al tramonto: piscina a sfioro, pergolato in legno, bouganville e mare"
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            quality={80}
            className="object-cover object-[62%_50%]"
          />
        </motion.div>
      </motion.div>

      {/* Velature per la leggibilità del testo a sinistra */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/65 via-forest-deep/25 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/45 via-transparent to-forest-deep/35"
        aria-hidden="true"
      />

      <div className="shell w-full pt-28 pb-28 md:pt-32">
        <div className="max-w-[46rem]">
          {/* H1 descrittivo per i motori di ricerca, in forma di eyebrow; il payoff sotto resta il titolo visivo. */}
          <motion.h1 id="hero-title" {...fadeUpWithDelay(0.2)} className="eyebrow max-w-[38ch] text-paper/85">
            Siti web, fotografia e video per strutture ricettive in Sardegna
          </motion.h1>

          <p className="mt-6 md:mt-8">
            <span className="block font-serif text-[clamp(3.4rem,8.2vw,8.6rem)] leading-[0.92] tracking-[-0.025em] text-paper">
              {headlineLines.map((line, lineIndex) => (
                // Maschera più alta della riga (pb) per non tagliare le discendenti di "Ogni luogo" con interlinea 0.92;
                // il margine negativo compensa, così l'interlinea visiva resta invariata. Stesso trucco a destra per il corsivo.
                <span key={line.key} className="-mr-[0.1em] -mb-[0.16em] block overflow-hidden pr-[0.1em] pb-[0.24em]">
                  <motion.span
                    className="block"
                    initial={{ y: "108%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.3, ease: ormaEase, delay: 0.35 + lineIndex * 0.12 }}
                  >
                    {line.content}
                  </motion.span>
                </span>
              ))}
            </span>
          </p>

          <motion.p {...fadeUpWithDelay(0.85)} className="mt-8 max-w-lg text-lead text-paper/90">
            ORMA è uno studio creativo indipendente. Progetto siti web, fotografie e video per B&amp;B, boutique hotel,
            agriturismi e dimore in Sardegna che hanno qualcosa di speciale da raccontare.
          </motion.p>

          <motion.div {...fadeUpWithDelay(1)} className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#contatti"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-paper px-6 text-sm font-medium text-ink transition-colors hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
            >
              Parliamo del tuo progetto
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="#servizi"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-paper/50 px-6 text-sm font-medium text-paper transition-colors hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
            >
              Scopri i servizi
              <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Indicatore di scroll + territorio */}
      <motion.div
        {...fadeUpWithDelay(1.3)}
        className="shell pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between pb-7 text-paper/75"
        aria-hidden="true"
      >
        <span className="eyebrow hidden sm:block">Sardegna, Italia</span>
        <span className="absolute left-1/2 flex h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-paper/50 pt-2">
          <motion.span
            className="block h-2 w-px bg-paper"
            animate={prefersReducedMotion ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="eyebrow hidden sm:block">Studio creativo per l’hospitality</span>
      </motion.div>
    </section>
  );
}
