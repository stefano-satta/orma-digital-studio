"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { hospitalityTypes } from "@/content/home";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal, ormaEase } from "@/components/common/motion/primitives";
import { joinClassNames } from "@/lib/joinClassNames";

const formatTwoDigits = (value: number) => String(value).padStart(2, "0");

export function HospitalityTypes() {
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);
  const activeType = hospitalityTypes[activeTypeIndex];

  return (
    <section id="strutture" aria-labelledby="strutture-title" className="section-y bg-paper">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel sectionNumber="07">Per chi lavoro</SectionLabel>
            <h2 id="strutture-title" className="mt-10 font-serif text-h1">
              Strutture diverse, <em className="serif-italic text-clay">la stessa cura.</em>
            </h2>
          </div>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-ink-soft leading-relaxed">
              Realtà indipendenti, piccole o medie, che hanno investito nella propria struttura e vogliono comunicarla
              meglio. Anche nuove aperture e property manager selezionati.
            </p>
          </Reveal>
        </div>

        {/* Desktop: elenco tipografico + immagine che cambia */}
        <div className="mt-20 hidden gap-8 md:grid md:grid-cols-12">
          <ul className="md:col-span-6" aria-label="Tipologie di strutture">
            {hospitalityTypes.map((hospitalityType, typeIndex) => {
              const isActive = activeTypeIndex === typeIndex;
              const activate = () => setActiveTypeIndex(typeIndex);
              return (
                <li key={hospitalityType.name} className="border-t border-ink/12 last:border-b">
                  <button
                    type="button"
                    onMouseEnter={activate}
                    onFocus={activate}
                    onClick={activate}
                    aria-pressed={isActive}
                    className="group flex w-full items-baseline justify-between gap-6 py-4 text-left"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="w-6 text-xs tabular-nums text-ink-soft">{formatTwoDigits(typeIndex + 1)}</span>
                      <span
                        className={joinClassNames(
                          "font-serif text-[clamp(2rem,3.6vw,3.4rem)] leading-none whitespace-nowrap transition-all duration-500",
                          isActive ? "translate-x-3 text-ink italic" : "text-ink/35 group-hover:text-ink/70",
                        )}
                      >
                        {hospitalityType.name}
                      </span>
                    </span>
                    <span className={joinClassNames("hidden text-right text-sm text-ink-soft transition-opacity duration-500 xl:block", isActive ? "opacity-100" : "opacity-0")}>
                      {hospitalityType.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="sticky top-28 md:col-span-5 md:col-start-8 md:self-start">
            <div className="relative aspect-[4/5] overflow-hidden bg-sand">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeType.name}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(0 0 0 100%)" }}
                  animate={{ clipPath: "inset(0 0 0 0%)" }}
                  exit={{ opacity: 0.6 }}
                  transition={{ duration: 0.9, ease: ormaEase }}
                >
                  <Image src={activeType.image.src} alt={activeType.image.alt} fill sizes="40vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-4 flex justify-between text-sm text-ink-soft" aria-live="polite">
              <span><span className="font-serif text-lg text-ink italic">{activeType.name}</span> — {activeType.description}</span>
              <span>{formatTwoDigits(activeTypeIndex + 1)} / {formatTwoDigits(hospitalityTypes.length)}</span>
            </p>
          </div>
        </div>

        {/* Mobile: scorrimento orizzontale */}
        <ul className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:hidden" aria-label="Tipologie di strutture">
          {hospitalityTypes.map((hospitalityType) => (
            <li key={hospitalityType.name} className="w-[72vw] shrink-0 snap-start">
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                <Image src={hospitalityType.image.src} alt={hospitalityType.image.alt} fill sizes="72vw" className="object-cover" />
              </div>
              <h3 className="mt-4 font-serif text-3xl leading-none">{hospitalityType.name}</h3>
              <p className="mt-2 text-sm text-ink-soft">{hospitalityType.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
