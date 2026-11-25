import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { servicePagePath, servicePages } from "@/content/servicePages";
import { services, packages, type Service } from "@/content/services";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ArrowLink } from "@/components/common/ArrowLink";
import { ImageReveal, Reveal, WordsReveal } from "@/components/common/motion/primitives";
import { joinClassNames } from "@/lib/joinClassNames";

/** Tre composizioni diverse per i tre ambiti: nessuna card identica. */
const serviceLayouts = [
  {
    // media = foto principale, ratio = proporzioni, detail = foto di dettaglio sovrapposta, text = colonna testo
    media: "md:col-span-7 md:col-start-1",
    ratio: "aspect-[4/3]",
    detail: "right-[-6%] bottom-[-10%] w-[38%] aspect-[3/4]",
    text: "md:col-span-4 md:col-start-9 md:self-end",
  },
  {
    media: "md:col-span-7 md:col-start-6 md:order-2 md:-mr-[clamp(1.25rem,4vw,4rem)]",
    ratio: "aspect-[16/11]",
    detail: "left-[-8%] top-[12%] w-[30%] aspect-square",
    text: "md:col-span-4 md:col-start-1 md:order-1 md:self-center",
  },
  {
    media: "md:col-span-7 md:col-start-1",
    ratio: "aspect-[3/2]",
    detail: "right-[-8%] top-[-10%] w-[34%] aspect-[4/3]",
    text: "md:col-span-4 md:col-start-9 md:self-center",
  },
];

function ServiceRow({ service, layoutIndex }: { service: Service; layoutIndex: number }) {
  const layout = serviceLayouts[layoutIndex % serviceLayouts.length];
  return (
    <article
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className="group grid scroll-mt-28 gap-12 md:grid-cols-12 md:gap-8"
    >
      <div className={joinClassNames("relative", layout.media)}>
        <ImageReveal className={joinClassNames("relative overflow-hidden bg-sand", layout.ratio)}>
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover transition-transform duration-[1.6s] ease-(--ease-orma) group-hover:scale-[1.04]"
          />
        </ImageReveal>
        <Reveal
          delay={0.35}
          className={joinClassNames("absolute hidden overflow-hidden border-[6px] border-ivory shadow-[0_30px_60px_-30px_rgb(36_36_33/0.45)] md:block", layout.detail)}
        >
          <Image
            src={service.detail.src}
            alt={service.detail.alt}
            fill
            sizes="20vw"
            className="object-cover transition-transform duration-[1.6s] ease-(--ease-orma) group-hover:scale-[1.08]"
          />
        </Reveal>
      </div>

      <div className={layout.text}>
        <Reveal>
          <p className="flex items-baseline gap-3 text-ink-soft">
            <span className="font-serif text-5xl leading-none text-clay italic">{service.number}</span>
            <span className="eyebrow">{service.subtitle}</span>
          </p>
          <h3 id={`${service.id}-title`} className="mt-6 font-serif text-h2">
            {service.title}
          </h3>
          <p className="mt-6 font-serif text-[1.45rem] leading-snug text-ink">{service.claim}</p>
          <p className="mt-5 text-ink-soft leading-relaxed">{service.body}</p>
          {service.note && (
            <p className="mt-5 border-l border-clay pl-4 text-sm leading-relaxed text-ink-soft italic">{service.note}</p>
          )}
          <ul className="mt-7 flex flex-wrap gap-2" aria-label={`Cosa comprende ${service.title}`}>
            {service.includes.map((includedItem) => (
              <li key={includedItem} className="rounded-full border border-ink/15 px-3 py-1.5 text-[0.8rem] text-ink-soft">
                {includedItem}
              </li>
            ))}
          </ul>
          <ArrowLink href={`/?servizio=${service.id}#contatti`} variant="text" className="mt-8">
            {service.ctaLabel}
          </ArrowLink>
          <p className="mt-4 text-sm text-ink-soft">
            Approfondisci:{" "}
            {servicePages
              .filter((servicePage) => servicePage.serviceId === service.id)
              .map((servicePage, pageIndex) => (
                <Fragment key={servicePage.slug}>
                  {pageIndex > 0 && " · "}
                  <Link href={servicePagePath(servicePage)} className="link-draw text-ink">
                    {servicePage.linkLabel}
                  </Link>
                </Fragment>
              ))}
          </p>
        </Reveal>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section id="servizi" aria-labelledby="servizi-title" className="section-y overflow-hidden bg-paper">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel sectionNumber="03">Servizi</SectionLabel>
            <h2 id="servizi-title" className="mt-10 font-serif text-h1">
              <WordsReveal text="Tre ambiti," />{" "}
              <WordsReveal text="un solo racconto." className="serif-italic text-clay" delay={0.15} />
            </h2>
          </div>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-lead text-ink-soft">
              Ogni struttura è diversa. Il lavoro di ORMA si organizza in tre aree che possono vivere da sole o insieme,
              in base a ciò di cui hai davvero bisogno.
            </p>
          </Reveal>
        </div>

        <div className="mt-24 space-y-32 md:mt-36 md:space-y-48">
          {services.map((service, serviceIndex) => (
            <ServiceRow key={service.id} service={service} layoutIndex={serviceIndex} />
          ))}
        </div>

        <Packages />
      </div>
    </section>
  );
}

function Packages() {
  return (
    <div className="mt-36 border-t border-ink/15 pt-16 md:mt-52 md:pt-20" aria-labelledby="pacchetti-title">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-ink-soft">Come iniziare</p>
          <h3 id="pacchetti-title" className="mt-6 font-serif text-h2">
            Tre punti di partenza. <em className="serif-italic text-clay">Nessun pacchetto rigido.</em>
          </h3>
        </div>
        <p className="text-ink-soft leading-relaxed md:col-span-4 md:col-start-9 md:self-end">
          I servizi si combinano, si aggiungono o si tolgono. Prezzi indicativi, IVA esclusa: il preventivo arriva dopo
          una prima conversazione, senza impegno, ed è costruito sulla tua struttura.
        </p>
      </div>

      <ol className="mt-16 grid md:grid-cols-3">
        {packages.map((servicePackage, packageIndex) => (
          <li
            key={servicePackage.name}
            className={joinClassNames(
              "border-t border-ink/15 py-10 md:border-t-0 md:border-l md:px-8 md:py-0 lg:px-10",
              packageIndex === 0 && "md:border-l-0 md:pl-0",
            )}
          >
            <Reveal delay={packageIndex * 0.08}>
              <p className="font-sans text-xs tabular-nums text-ink-soft">{servicePackage.number}</p>
              <h4 className="mt-4 font-serif text-[2.2rem] leading-none">{servicePackage.name}</h4>
              <p className="mt-2 font-serif text-xl italic text-clay">{servicePackage.tagline}</p>
              <p className="mt-4 text-sm font-medium tabular-nums text-ink">{servicePackage.priceLabel}</p>
              <p className="mt-6 text-ink-soft leading-relaxed">{servicePackage.audience}</p>
              <ul className="mt-8 space-y-2.5 text-[0.95rem]">
                {servicePackage.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex gap-3">
                    <span className="mt-[0.6em] h-px w-3 shrink-0 bg-clay" aria-hidden="true" />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
