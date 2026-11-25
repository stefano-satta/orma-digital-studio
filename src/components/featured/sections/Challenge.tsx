import { challenges } from "@/content/home";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Reveal } from "@/components/common/motion/primitives";

export function Challenge() {
  return (
    <section aria-labelledby="sfida-title" className="grain section-y bg-forest text-paper">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel sectionNumber="02" tone="light">La sfida</SectionLabel>
            <Reveal>
              <h2 id="sfida-title" className="mt-10 font-serif text-h2">
                La qualità di una struttura dovrebbe essere percepita{" "}
                <em className="serif-italic text-sand">anche prima di arrivare.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-lead text-paper/75">
                Molte strutture indipendenti offrono molto più di quanto riescano a mostrare online. Quasi mai per
                mancanza di cura: mancano il tempo, gli strumenti e qualcuno che sappia tradurre l&apos;ospitalità in
                immagini e parole.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {challenges.map((challenge, challengeIndex) => (
            <li key={challenge.title} className="border-t border-paper/15 last:border-b">
              <Reveal className="grid grid-cols-[3rem_1fr] gap-4 py-8 md:grid-cols-[4.5rem_1fr] md:py-10" offsetY={20}>
                <span className="pt-2 font-sans text-xs tabular-nums text-sand" aria-hidden="true">
                  {String(challengeIndex + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[1.1]">{challenge.title}</h3>
                  <p className="mt-3 max-w-lg text-paper/70">{challenge.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
