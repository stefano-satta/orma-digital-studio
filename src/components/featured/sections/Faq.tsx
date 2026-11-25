"use client";

import { motion } from "motion/react";
import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { faqs, type FaqEntry } from "@/content/faq";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ormaEase } from "@/components/common/motion/primitives";
import { joinClassNames } from "@/lib/joinClassNames";

function FaqItem({ faq, position }: { faq: FaqEntry; position: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const itemId = useId();
  const questionId = `${itemId}-question`;
  const answerId = `${itemId}-answer`;

  return (
    <li className="border-t border-ink/15 last:border-b">
      <h3>
        <button
          type="button"
          id={questionId}
          aria-expanded={isExpanded}
          aria-controls={answerId}
          onClick={() => setIsExpanded((wasExpanded) => !wasExpanded)}
          className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-2 py-6 text-left md:grid-cols-[4rem_1fr_auto] md:py-7"
        >
          <span className="text-xs tabular-nums text-ink-soft">{String(position).padStart(2, "0")}</span>
          <span className="font-serif text-[clamp(1.3rem,2vw,1.75rem)] leading-tight transition-colors group-hover:text-clay">{faq.question}</span>
          <Plus
            aria-hidden="true"
            strokeWidth={1.4}
            className={joinClassNames("size-6 self-center transition-transform duration-500 ease-(--ease-orma)", isExpanded && "rotate-45")}
          />
        </button>
      </h3>
      {/* Risposta sempre nel DOM (indicizzabile), nascosta e inerte quando chiusa */}
      <motion.div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        aria-hidden={!isExpanded}
        inert={!isExpanded}
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.55, ease: ormaEase }}
        className="overflow-hidden"
      >
        <p className="max-w-2xl pb-8 pl-[2.5rem] leading-relaxed text-ink-soft md:pl-[4rem]">{faq.answer}</p>
      </motion.div>
    </li>
  );
}

/** Elenco a fisarmonica riusabile (home e pagine servizio). */
export function FaqList({ faqs: faqEntries, className }: { faqs: FaqEntry[]; className?: string }) {
  return (
    <ol className={className}>
      {faqEntries.map((faq, faqIndex) => (
        <FaqItem key={faq.question} faq={faq} position={faqIndex + 1} />
      ))}
    </ol>
  );
}

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y">
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <SectionLabel sectionNumber="10">Domande frequenti</SectionLabel>
            <h2 id="faq-title" className="mt-10 font-serif text-h2">
              Le domande che <em className="serif-italic text-clay">mi fanno più spesso.</em>
            </h2>
            <p className="mt-6 max-w-sm text-ink-soft leading-relaxed">
              Non trovi la tua? Scrivimi: rispondo personalmente a ogni messaggio.
            </p>
          </div>
        </div>
        <FaqList faqs={faqs} className="md:col-span-7 md:col-start-6" />
      </div>
    </section>
  );
}
