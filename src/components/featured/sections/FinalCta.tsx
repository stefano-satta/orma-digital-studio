import { ArrowLink } from "@/components/common/ArrowLink";
import { Parallax, Reveal, WordsReveal } from "@/components/common/motion/primitives";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-forest-deep text-paper">
      <Parallax className="absolute inset-0 -z-10" distance={50}>
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/drone-spiaggia-macchia-sardegna-poster.jpg"
          aria-hidden="true"
        >
          {/* Versione leggera per schermi piccoli, poi quella desktop. */}
          <source src="/videos/drone_pano-960.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/videos/drone_pano-1600.mp4" type="video/mp4" />
        </video>
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/90 via-forest-deep/55 to-forest-deep/20" aria-hidden="true" />

      <div className="shell grid min-h-[80svh] content-center gap-10 py-28 md:grid-cols-12">
        <div className="md:col-span-9">
          <p className="eyebrow text-sand">Iniziamo</p>
          <h2 id="cta-title" className="mt-8 font-serif text-display">
            <WordsReveal text="Il tuo luogo ha" stagger={0.06} />{" "}
            <WordsReveal text="qualcosa da raccontare." className="serif-italic text-sand" delay={0.2} stagger={0.06} />
          </h2>
        </div>
        <Reveal delay={0.2} className="md:col-span-5">
          <p className="text-lead text-paper/85">
            Ogni progetto inizia da una conversazione. Raccontami la tua struttura, le tue idee e ciò che vorresti
            migliorare.
          </p>
          <ArrowLink href="#contatti" variant="light" className="mt-10">
            Raccontami il tuo progetto
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
