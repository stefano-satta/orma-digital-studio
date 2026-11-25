import Image from "next/image";
import { photos } from "@/content/images";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ImageReveal, Reveal, WordsReveal } from "@/components/common/motion/primitives";
import { OrmaMark } from "@/components/common/Logo";

export function Manifesto() {
  return (
    <section id="manifesto" aria-labelledby="manifesto-title" className="section-y relative overflow-hidden">
      <div className="shell">
        <SectionLabel sectionNumber="01">Manifesto</SectionLabel>

        <h2 id="manifesto-title" className="mt-10 max-w-[15ch] font-serif text-h1 md:mt-14">
          <WordsReveal text="Ci sono luoghi che meritano di essere" stagger={0.04} />{" "}
          <WordsReveal text="ricordati." className="serif-italic text-clay" delay={0.3} />
        </h2>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden md:col-span-4 md:col-start-1">
            <Image
              src={photos.manifesto.main.src}
              alt={photos.manifesto.main.alt}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </ImageReveal>

          <div className="md:col-span-6 md:col-start-6 md:pt-24">
            <Reveal>
              <p className="font-serif text-h3 text-ink">
                Una terrazza nell&apos;ora in cui la luce cambia colore. Il profumo della colazione in un cortile di
                pietra. Il silenzio di una camera che guarda il mare.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 text-lead text-ink-soft">
                Chi fa ospitalità lo sa: non si offre soltanto una camera, si offre il ricordo di un luogo. E quel ricordo
                inizia molto prima del check-in. Inizia su uno schermo, quando un futuro ospite guarda le tue foto, legge
                le tue parole e prova a immaginarsi lì.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-lead text-ink-soft">
                ORMA nasce per dare forma a quel momento: trasformare ciò che rende unica la tua struttura in
                un&apos;esperienza digitale capace di trasmetterlo.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-12 flex items-center gap-4 text-ink">
              <OrmaMark className="h-7 w-auto text-clay" />
              <p className="font-serif text-2xl italic">Il segno che resta.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
