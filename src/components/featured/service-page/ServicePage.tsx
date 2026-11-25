import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { servicePagePath, servicePages, type ServicePageContent } from "@/content/servicePages";
import { hospitalityTypes } from "@/content/home";
import { site } from "@/content/site";
import { JsonLd } from "@/components/common/JsonLd";
import { ArrowLink } from "@/components/common/ArrowLink";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ImageReveal, Reveal } from "@/components/common/motion/primitives";
import { FaqList } from "@/components/featured/sections/Faq";
import { serviceGraph } from "./serviceSeo";
import { ON_QUOTE_LABEL, PRICE_DISCLAIMER } from "@/content/pricing";

/** Dopo quali argomenti (indice) compaiono le due immagini inline. */
const FIRST_IMAGE_AFTER_TOPIC = 1;
const SECOND_IMAGE_AFTER_TOPIC = 3;

/** Riquadri alternativi alla fascia larga per la prima immagine inline (vedi `Photo.frame`). */
const framedImageClass = {
  portrait: "aspect-[4/5] md:col-span-5",
  compact: "aspect-[16/9] md:col-span-7",
} as const;

/** Allineamento a destra: il riquadro parte dalla colonna del testo (col 6), come la seconda immagine. */
const framedImageRightClass = {
  portrait: "md:col-start-6",
  compact: "md:col-start-6",
} as const;

const contactHrefFor = (servicePage: ServicePageContent) => `/?servizio=${servicePage.serviceId}#contatti`;

/** Template condiviso delle pagine /servizi/<slug>: tutto il contenuto arriva da content/servicePages.ts. */
export function ServicePage({ servicePage }: { servicePage: ServicePageContent }) {
  const lastTopicIndex = servicePage.topics.length - 1;
  const secondImageIndex = Math.min(SECOND_IMAGE_AFTER_TOPIC, lastTopicIndex);

  return (
    <article>
      <JsonLd data={serviceGraph(servicePage)} />
      <ServiceHero servicePage={servicePage} />

      {/* Apertura editoriale + per chi */}
      <section className="section-y" aria-label="Introduzione">
        <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <p className="font-serif text-h3">{servicePage.statement}</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="eyebrow text-ink-soft">Per chi lavoro</p>
            <p className="mt-4 leading-relaxed text-ink-soft">
              {hospitalityTypes.map((hospitalityType) => hospitalityType.name).join(", ")}: strutture indipendenti in
              Sardegna e in tutta Italia.
            </p>
            {servicePage.note && (
              <p className="mt-6 border-l border-clay pl-4 text-sm leading-relaxed text-ink-soft italic">
                {servicePage.note}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* Argomenti, con due immagini inserite nel racconto */}
      <div className="shell pb-[clamp(5.5rem,12vw,11rem)]">
        {servicePage.topics.map((topic, topicIndex) => (
          <Fragment key={topic.heading}>
            <section
              aria-labelledby={`argomento-${topicIndex}`}
              className="grid gap-6 border-t border-ink/15 py-14 md:grid-cols-12 md:gap-8 md:py-20"
            >
              <Reveal className="md:col-span-4">
                <p className="text-xs tabular-nums text-ink-soft">{String(topicIndex + 1).padStart(2, "0")}</p>
                <h2 id={`argomento-${topicIndex}`} className="mt-4 font-serif text-h3">
                  {topic.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="space-y-5 md:col-span-7 md:col-start-6">
                {topic.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-[1.05rem] leading-relaxed text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </section>

            {topicIndex === FIRST_IMAGE_AFTER_TOPIC &&
              (servicePage.inlineImages[0].frame ? (
                <div className="mb-14 grid grid-cols-12 md:mb-20 md:gap-x-8">
                  <ImageReveal
                    className={`relative col-span-12 overflow-hidden bg-sand ${framedImageClass[servicePage.inlineImages[0].frame]} ${
                      servicePage.inlineImages[0].frameAlign === "right"
                        ? framedImageRightClass[servicePage.inlineImages[0].frame]
                        : ""
                    }`}
                  >
                    <Image
                      src={servicePage.inlineImages[0].src}
                      alt={servicePage.inlineImages[0].alt}
                      style={{ objectPosition: servicePage.inlineImages[0].objectPosition }}
                      fill
                      sizes="(min-width: 768px) 55vw, 92vw"
                      className="object-cover"
                    />
                  </ImageReveal>
                </div>
              ) : (
                <ImageReveal className="relative mb-14 aspect-[16/10] overflow-hidden bg-sand md:mb-20 md:aspect-[21/9]">
                  <Image
                    src={servicePage.inlineImages[0].src}
                    alt={servicePage.inlineImages[0].alt}
                    style={{ objectPosition: servicePage.inlineImages[0].objectPosition }}
                    fill
                    sizes="(min-width: 1560px) 1430px, 92vw"
                    className="object-cover"
                  />
                </ImageReveal>
              ))}
            {topicIndex === secondImageIndex && (
              <div className="mb-14 grid grid-cols-12 md:mb-20 md:gap-x-8">
                <ImageReveal className="relative col-span-12 aspect-[4/3] overflow-hidden bg-sand md:col-span-6 md:col-start-6 md:aspect-[16/11]">
                  <Image
                    src={servicePage.inlineImages[1].src}
                    alt={servicePage.inlineImages[1].alt}
                    style={{ objectPosition: servicePage.inlineImages[1].objectPosition }}
                    fill
                    sizes="(min-width: 768px) 50vw, 92vw"
                    className="object-cover"
                  />
                </ImageReveal>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* Cosa comprende */}
      <section aria-labelledby="comprende-title" className="grain section-y bg-forest text-paper">
        <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <SectionLabel sectionNumber={servicePage.eyebrow.slice(0, 2)} tone="light">
              {servicePage.shortName}
            </SectionLabel>
            <h2 id="comprende-title" className="mt-10 font-serif text-h2">
              Cosa <em className="serif-italic text-sand">comprende.</em>
            </h2>
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {servicePage.includes.map((included, includedIndex) => (
              <li key={included.title} className="grid grid-cols-[3rem_1fr] border-t border-paper/15 py-6 last:border-b">
                <span className="text-xs tabular-nums text-sand">{String(includedIndex + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-[1.6rem] leading-tight">{included.title}</h3>
                  <p className="mt-2 leading-relaxed text-paper/75">{included.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quanto costa: fasce indicative da content/pricing.ts */}
      <section aria-labelledby="prezzi-title" className="section-y bg-sand/45">
        <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <h2 id="prezzi-title" className="font-serif text-h2">
              Quanto <em className="serif-italic text-clay">costa.</em>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">{PRICE_DISCLAIMER}</p>
          </div>
          <ul className="md:col-span-7 md:col-start-6">
            {servicePage.pricing.map((priceItem) => (
              <li
                key={priceItem.title}
                className="grid gap-2 border-t border-ink/15 py-7 last:border-b md:grid-cols-[1fr_auto] md:gap-8"
              >
                <div>
                  <h3 className="font-serif text-[1.6rem] leading-tight">{priceItem.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{priceItem.description}</p>
                </div>
                <p className="font-serif text-[1.45rem] whitespace-nowrap text-clay md:text-right">{priceItem.price?.label ?? ON_QUOTE_LABEL}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Domande frequenti del servizio */}
      <section aria-labelledby="faq-servizio-title" className="section-y">
        <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <h2 id="faq-servizio-title" className="font-serif text-h2">
                Domande <em className="serif-italic text-clay">frequenti.</em>
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">
                Tempi e altri dubbi generali sono nelle{" "}
                <Link href="/#faq" className="link-draw text-ink">
                  domande frequenti dello studio
                </Link>
                .
              </p>
            </div>
          </div>
          <FaqList faqs={servicePage.faqs} className="md:col-span-7 md:col-start-6" />
        </div>
      </section>

      <RelatedServices currentSlug={servicePage.slug} />

      {/* Invito al contatto */}
      <section aria-labelledby="cta-servizio-title" className="grain section-y bg-forest-deep text-paper">
        <div className="shell grid gap-10 md:grid-cols-12">
          <h2 id="cta-servizio-title" className="font-serif text-h1 md:col-span-7">
            Raccontami la tua <em className="serif-italic text-sand">struttura.</em>
          </h2>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-lead text-paper/85">
              Ogni progetto inizia da una conversazione, gratuita e senza impegno. Il preventivo arriva dopo, costruito
              su ciò che serve davvero.
            </p>
            <ArrowLink href={contactHrefFor(servicePage)} variant="light" className="mt-10">
              {servicePage.ctaLabel}
            </ArrowLink>
            <p className="mt-6 text-sm text-paper/65">
              Oppure scrivi a{" "}
              <a href={`mailto:${site.contact.email}`} className="link-draw text-paper">
                {site.contact.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}

function ServiceHero({ servicePage }: { servicePage: ServicePageContent }) {
  const { heroVideo } = servicePage;
  return (
    <header className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-forest-deep text-paper">
      {heroVideo ? (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroVideo.poster.src}
          aria-hidden="true"
        >
          <source src={heroVideo.mobileSrc} type="video/mp4" media="(max-width: 767px)" />
          <source src={heroVideo.desktopSrc} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={servicePage.heroImage.src}
          alt={servicePage.heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
      )}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/90 via-forest-deep/55 to-forest-deep/60"
        aria-hidden="true"
      />

      <div className="shell pt-32 pb-14 md:pb-20">
        <nav aria-label="Breadcrumb" className="eyebrow text-paper/70">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="link-draw">Home</Link> /
            </li>
            <li>
              <Link href="/#servizi" className="link-draw">Servizi</Link> /
            </li>
            <li aria-current="page">{servicePage.shortName}</li>
          </ol>
        </nav>
        <p className="mt-10 eyebrow text-sand">{servicePage.eyebrow}</p>
        <h1 className="mt-5 max-w-[22ch] font-serif text-h1">{servicePage.h1}</h1>
        <p className="mt-8 max-w-2xl text-lead text-paper/85">{servicePage.lead}</p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ArrowLink href={contactHrefFor(servicePage)} variant="light">
            {servicePage.ctaLabel}
          </ArrowLink>
          <ArrowLink href="#comprende-title" variant="text" className="ml-4 text-paper">
            Cosa comprende
          </ArrowLink>
        </div>
      </div>
    </header>
  );
}

function RelatedServices({ currentSlug }: { currentSlug: string }) {
  const relatedPages = servicePages.filter((servicePage) => servicePage.slug !== currentSlug);
  return (
    <section aria-labelledby="altri-servizi-title" className="section-y bg-paper">
      <div className="shell grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <h2 id="altri-servizi-title" className="font-serif text-h2">
            Altri <em className="serif-italic text-clay">servizi.</em>
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-ink-soft">
            Possono vivere da soli o insieme, nello stesso progetto.
          </p>
        </div>
        <ul className="md:col-span-7 md:col-start-6">
          {relatedPages.map((relatedPage) => (
            <li key={relatedPage.slug} className="border-t border-ink/15 last:border-b">
              <Link href={servicePagePath(relatedPage)} className="group grid gap-2 py-7 md:grid-cols-[15rem_1fr_auto] md:items-baseline md:gap-6">
                <span className="eyebrow text-ink-soft">{relatedPage.eyebrow}</span>
                <span className="font-serif text-[1.45rem] leading-snug transition-colors group-hover:text-clay">
                  {relatedPage.linkLabel}
                </span>
                <span aria-hidden="true" className="hidden transition-transform duration-500 ease-(--ease-orma) group-hover:translate-x-1 md:block">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
