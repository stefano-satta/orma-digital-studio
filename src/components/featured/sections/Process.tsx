"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { processSteps } from "@/content/home";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/motion/primitives";

/** Lunghezza degli steli (px), una per tappa: le tappe scendono dal sentiero a quote diverse. */
const stemLengthsPx = [0, 96, 32, 136, 64, 16];

export function Process() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 80%", "end 60%"] });
  const smoothedScrollProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const pathProgress = useTransform(smoothedScrollProgress, (progress) => (prefersReducedMotion ? 1 : progress));

  return (
    <section id="metodo" aria-labelledby="metodo-title" className="grain section-y overflow-hidden bg-forest-deep text-paper">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel sectionNumber="06" tone="light">Metodo</SectionLabel>
            <h2 id="metodo-title" className="mt-10 font-serif text-h1">
              Un percorso, <em className="serif-italic text-sand">non una catena di montaggio.</em>
            </h2>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-paper/75 leading-relaxed">
              Ogni progetto attraversa sei tappe. Non tutte servono sempre: fotografia e video, per esempio, entrano solo
              se sono utili. È il metodo ad adattarsi alla struttura, non il contrario.
            </p>
          </Reveal>
        </div>

        <div ref={timelineRef} className="relative mt-20 lg:mt-28">
          {/* Il sentiero: una traccia orizzontale da cui "scendono" le tappe, come un profilo altimetrico */}
          <div className="absolute top-[7px] right-0 left-0 hidden h-px bg-paper/15 lg:block" aria-hidden="true">
            <motion.div className="h-px origin-left bg-terracotta" style={{ scaleX: pathProgress }} />
          </div>

          {/* Mobile: traccia verticale */}
          <div className="absolute top-0 bottom-0 left-[0.45rem] w-px bg-paper/15 lg:hidden" aria-hidden="true">
            <motion.div className="h-full w-px origin-top bg-terracotta" style={{ scaleY: pathProgress }} />
          </div>

          <ol className="relative grid gap-12 pl-10 lg:grid-cols-6 lg:gap-6 lg:pl-0">
            {processSteps.map((step, stepIndex) => (
              <li key={step.number} className="relative" style={{ "--drop": `${stemLengthsPx[stepIndex]}px` } as CSSProperties}>
                {/* Nodo sul sentiero + stelo verticale (desktop) */}
                <span
                  className="absolute top-0 -left-10 size-[0.9rem] rounded-full border border-terracotta bg-forest-deep lg:left-0"
                  aria-hidden="true"
                />
                <span
                  className="absolute top-[0.9rem] left-[0.42rem] hidden h-[calc(var(--drop)+1.25rem)] w-px bg-gradient-to-b from-terracotta/70 to-paper/10 lg:block"
                  aria-hidden="true"
                />
                <Reveal delay={stepIndex * 0.06} offsetY={20} className="lg:pt-[calc(var(--drop)+3rem)] lg:pl-5">
                  <p className="font-sans text-xs tabular-nums text-sand">
                    {step.number} · {step.englishName}
                    {step.optional && <span className="ml-2 rounded-full border border-paper/25 px-2 py-0.5 text-[0.65rem] text-paper/70">opzionale</span>}
                  </p>
                  <h3 className="mt-3 font-serif text-[clamp(1.7rem,2.4vw,2.1rem)] leading-none">{step.italianName}</h3>
                  <p className="mt-4 text-[0.92rem] leading-relaxed text-paper/70">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
