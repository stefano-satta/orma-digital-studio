import { benefits, listedVsRemembered } from "@/content/home";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal, WordsReveal } from "@/components/common/motion/primitives";

export function WhyWebsite() {
  return (
    <section id="perche" aria-labelledby="perche-title" className="section-y border-t border-ink/10 bg-ivory">
      <div className="shell">
        <SectionLabel sectionNumber="05">Perché un sito proprio</SectionLabel>
        <h2 id="perche-title" className="mt-10 max-w-[16ch] font-serif text-h1">
          <WordsReveal text="Essere presenti non basta." />{" "}
          <WordsReveal text="Conta essere ricordati." className="serif-italic text-clay" delay={0.2} />
        </h2>

        {/* Being listed / Being remembered */}
        <div className="mt-20 grid overflow-hidden md:mt-28 md:grid-cols-2">
          <Reveal className="border border-ink/15 p-8 md:border-r-0 md:p-12 lg:p-16">
            <p className="eyebrow text-ink-soft">Being listed</p>
            <h3 className="mt-4 font-serif text-h3 text-ink-soft">Essere in elenco</h3>
            <ul className="mt-10 space-y-5">
              {listedVsRemembered.listed.map((listedPoint) => (
                <li key={listedPoint} className="flex gap-4 text-ink-soft">
                  <span className="mt-[0.7em] h-px w-5 shrink-0 bg-ink/30" aria-hidden="true" />
                  {listedPoint}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12} className="grain relative bg-forest p-8 text-paper md:p-12 lg:p-16">
            <p className="eyebrow text-sand">Being remembered</p>
            <h3 className="mt-4 font-serif text-h3">Essere ricordati</h3>
            <ul className="mt-10 space-y-5">
              {listedVsRemembered.remembered.map((rememberedPoint) => (
                <li key={rememberedPoint} className="flex gap-4 text-paper/90">
                  <span className="mt-[0.7em] h-px w-5 shrink-0 bg-terracotta" aria-hidden="true" />
                  {rememberedPoint}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="font-serif text-[1.6rem] leading-snug">
              I portali restano utili: portano visibilità e prenotazioni. Un sito proprio non li sostituisce, li affianca.
            </p>
            <p className="mt-5 text-ink-soft leading-relaxed">
              È il luogo in cui l&apos;ospite che ti ha scoperto altrove viene a capire chi sei davvero, e dove può
              scriverti direttamente.
            </p>
          </Reveal>

          <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 md:col-span-6 md:col-start-7 lg:grid-cols-3">
            {benefits.map((benefit, benefitIndex) => (
              <Reveal key={benefit.title} delay={(benefitIndex % 3) * 0.06} offsetY={16} className="border-t border-ink/15 py-5">
                <dt className="font-serif text-xl">{benefit.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">{benefit.body}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
