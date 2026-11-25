import Image from "next/image";
import { photos } from "@/content/images";
import { sardiniaAreas, sardiniaThemes } from "@/content/home";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ImageReveal, Parallax, Reveal, WordsReveal } from "@/components/common/motion/primitives";

export function Sardinia() {
  return (
    <section id="sardegna" aria-labelledby="sardegna-title" className="relative overflow-hidden bg-ivory">
      {/* Immagine a tutta larghezza con parallasse */}
      <div className="relative h-[70svh] min-h-[420px] overflow-hidden md:h-[88svh]">
        <Parallax className="absolute inset-0" distance={70}>
          <Image src={photos.sardinia.background.src} alt={photos.sardinia.background.alt} fill sizes="100vw" className="object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/35 via-transparent to-transparent" aria-hidden="true" />
        {/* Sfumatura verso il fondo pagina: tiene leggibile il titolo che sale sopra la foto */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-ivory via-ivory/80 to-transparent" aria-hidden="true" />
        <div className="shell relative pt-28 text-paper md:pt-36">
          <SectionLabel sectionNumber="08" tone="light">Sardegna</SectionLabel>
          <p className="eyebrow mt-4 text-paper/75">40°N · 9°E — dalla costa all&apos;entroterra</p>
        </div>
      </div>

      <div className="shell relative -mt-[20svh] pb-28 md:-mt-[26svh] md:pb-44">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 id="sardegna-title" className="font-serif text-h1">
              <WordsReveal text="Una terra straordinaria." />{" "}
              <WordsReveal text="Luoghi che meritano di essere raccontati." className="serif-italic text-clay" delay={0.2} stagger={0.035} />
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-14 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <p className="text-lead text-ink">
              La Sardegna non è soltanto il mare che tutti conoscono. È granito e macchia mediterranea in Gallura, boschi e
              paesi di pietra in Barbagia, fenicotteri negli stagni di Cagliari, basalto nel Montiferru, domus de janas e
              feste che cambiano da un paese all&apos;altro.
            </p>
            <p className="mt-6 text-ink-soft leading-relaxed">
              Ogni zona ha una luce e un carattere diversi, e chi ospita qui ne è parte. Lavoro con strutture in tutta
              l&apos;isola, dalla costa ai borghi dell&apos;interno, raccontando ciò che sta intorno alla camera: i
              paesaggi, i sapori, le persone, le cose da fare. E quando un progetto lo richiede, anche oltre il mare.
            </p>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Temi del territorio">
              {sardiniaThemes.map((theme) => (
                <li key={theme} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-sm text-ink-soft">
                  {theme}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="relative md:col-span-6 md:col-start-7">
            <ol className="relative">
              {sardiniaAreas.map((area, areaIndex) => (
                <li key={area.name}>
                  <Reveal delay={areaIndex * 0.04} offsetY={14} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-ink/12 py-4">
                    <div>
                      <h3 className="font-serif text-[1.65rem] leading-tight">{area.name}</h3>
                      <p className="text-sm text-ink-soft">{area.description}</p>
                    </div>
                    <p className="font-sans text-xs tabular-nums tracking-wide text-ink-soft">{area.coordinates}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-12 gap-4 md:mt-32 md:gap-8">
          <ImageReveal className="relative col-span-7 aspect-[4/5] overflow-hidden md:col-span-4 md:col-start-2">
            <Image src={photos.sardinia.wine.src} alt={photos.sardinia.wine.alt} fill sizes="(min-width: 768px) 33vw, 58vw" className="object-cover" />
          </ImageReveal>
          <ImageReveal delay={0.15} className="relative col-span-5 mt-24 aspect-[3/4] overflow-hidden md:col-span-3 md:mt-40">
            <Image src={photos.sardinia.hiking.src} alt={photos.sardinia.hiking.alt} fill sizes="(min-width: 768px) 25vw, 42vw" className="object-cover" />
          </ImageReveal>
          <ImageReveal delay={0.25} className="relative col-span-8 col-start-3 aspect-[16/10] overflow-hidden md:col-span-3 md:col-start-auto md:mt-8">
            <Image src={photos.sardinia.sailing.src} alt={photos.sardinia.sailing.alt} fill sizes="(min-width: 768px) 25vw, 66vw" className="object-cover" />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
