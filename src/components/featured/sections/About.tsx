import Image from "next/image";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/common/SectionLabel";
import { OrmaMark } from "@/components/common/Logo";
import { ArrowLink } from "@/components/common/ArrowLink";
import { ImageReveal, Reveal } from "@/components/common/motion/primitives";

const studioFacts = [
  { label: "Base", value: site.region },
  { label: "Dal", value: site.owner.since },
  { label: "Lavoro con", value: "B&B, agriturismi, ville e case vacanza" },
  { label: "Faccio", value: "Design, sviluppo, fotografia" },
];

const studioValues = [
  { title: "Interlocutore diretto", body: "Parli con chi progetta, scrive il codice e, quando serve, scatta le foto." },
  { title: "Indipendente", body: "Nessuna catena di passaggi: decisioni rapide e responsabilità chiare." },
  { title: "Tecnica e creatività", body: "Design e sviluppo front-end nelle stesse mani, senza compromessi tra bello e funzionante." },
  { title: "Flessibile", body: "Progetti su misura, servizi modulari, tempi definiti insieme." },
];

export function About() {
  const { owner } = site;

  return (
    <section id="chi-sono" aria-labelledby="chi-sono-title" className="section-y bg-sand/45">
      <div className="shell grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          {owner.portrait ? (
            <>
              <ImageReveal className="relative aspect-[4/5] overflow-hidden bg-forest">
                <Image src={owner.portrait} alt={`Ritratto di ${owner.name}`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </ImageReveal>
              <p className="mt-4 text-sm text-ink-soft">
                {owner.name} — {owner.role}
              </p>
            </>
          ) : (
            // Scheda studio: resta finché site.owner.portrait è null, poi viene sostituita dal ritratto.
            <Reveal className="relative isolate flex aspect-[4/5] flex-col justify-between gap-8 overflow-hidden bg-forest p-8 text-paper sm:p-10">
              {/* Decoro: impronta ORMA fuori scala e cornice interna sottile */}
              <OrmaMark className="pointer-events-none absolute -right-[18%] -bottom-[12%] -z-10 h-[78%] w-auto text-paper/[0.05]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-3 -z-10 border border-paper/10 sm:inset-4" />

              <div className="flex items-center justify-between">
                <OrmaMark className="h-9 w-auto text-sand" />
                <p className="eyebrow text-paper/60">{site.name} — Studio</p>
              </div>

              <div>
                <p className="font-serif text-4xl leading-none sm:text-5xl">{owner.name}</p>
                <p className="serif-italic mt-3 text-xl text-sand">{owner.role}</p>
                <div className="mt-6 flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 bg-terracotta" />
                  <p className="serif-italic text-base text-paper/70">{site.payoff}</p>
                </div>
              </div>

              <dl className="text-sm">
                {studioFacts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-paper/15 py-3">
                    <dt className="eyebrow self-center text-paper/55">{fact.label}</dt>
                    <dd className="text-paper/90">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <SectionLabel sectionNumber="09">Chi c&apos;è dietro ORMA</SectionLabel>
          <Reveal>
            <h2 id="chi-sono-title" className="mt-10 font-serif text-h2">
              Uno studio indipendente. <em className="serif-italic text-clay">Una persona</em> che segue il tuo progetto
              dall&apos;inizio alla fine.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 space-y-5 text-lead text-ink-soft">
              {/* TODO: completare la bio con il proprio percorso reale */}
              <p>
                Sono {owner.firstName}, {owner.role.toLowerCase()}.
              </p>
              <p>
                Ho fondato ORMA per unire le cose che so fare meglio, design, tecnologia e immagine, al servizio di chi fa
                ospitalità con passione. Mi piace entrare nelle strutture, ascoltare chi le gestisce e capire cosa le
                rende diverse. Poi trasformare tutto questo in un sito che funziona davvero.
              </p>
            </div>
          </Reveal>

          <dl className="mt-14 grid gap-x-8 sm:grid-cols-2">
            {studioValues.map((studioValue, valueIndex) => (
              <Reveal key={studioValue.title} delay={0.05 * valueIndex} offsetY={14} className="border-t border-ink/15 py-5">
                <dt className="font-serif text-xl">{studioValue.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">{studioValue.body}</dd>
              </Reveal>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <ArrowLink href="#contatti">Scrivimi</ArrowLink>
            {site.social.linkedin && (
              <ArrowLink href={site.social.linkedin} variant="outline" external>
                LinkedIn
              </ArrowLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
