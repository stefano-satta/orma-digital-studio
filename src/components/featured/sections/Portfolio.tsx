import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/content/portfolio";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ImageReveal, Reveal, WordsReveal } from "@/components/common/motion/primitives";
import { joinClassNames } from "@/lib/joinClassNames";

/** Tre composizioni a rotazione: wrapper = posizione nella griglia, ratio = proporzioni, sizes = attributo sizes. */
const cardCompositions = [
  { wrapper: "md:col-span-12", ratio: "aspect-[4/5] md:aspect-[21/10]", sizes: "100vw" },
  { wrapper: "md:col-span-5 md:col-start-1 md:mt-24", ratio: "aspect-[4/5]", sizes: "(min-width: 768px) 42vw, 100vw" },
  { wrapper: "md:col-span-6 md:col-start-7", ratio: "aspect-[4/5] md:aspect-[5/6]", sizes: "(min-width: 768px) 50vw, 100vw" },
];

function ProjectCard({ project, position }: { project: Project; position: number }) {
  const composition = cardCompositions[(position - 1) % cardCompositions.length];
  return (
    <li className={composition.wrapper}>
      <Link href={`/portfolio/${project.slug}`} className="group block" aria-describedby={`${project.slug}-meta`}>
        <ImageReveal className={joinClassNames("relative overflow-hidden bg-forest", composition.ratio)}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={composition.sizes}
            className="object-cover transition-transform duration-[1.8s] ease-(--ease-orma) group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-forest-deep/0 to-forest-deep/10" aria-hidden="true" />

          <span className="eyebrow absolute top-5 left-5 rounded-full bg-paper/90 px-3 py-2 text-ink backdrop-blur">
            {project.isConcept ? "Concept" : "Progetto"}
          </span>

          {/* Servizi che emergono all'hover (sempre visibili su touch) */}
          <ul className="absolute top-5 right-5 hidden max-w-[50%] flex-wrap justify-end gap-1.5 md:flex">
            {project.services.map((serviceName, serviceIndex) => (
              <li
                key={serviceName}
                style={{ transitionDelay: `${serviceIndex * 50}ms` }}
                className="translate-y-2 rounded-full border border-paper/40 px-2.5 py-1 text-[0.72rem] text-paper opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              >
                {serviceName}
              </li>
            ))}
          </ul>

          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-paper md:inset-x-8 md:bottom-8">
            <div>
              <p className="text-xs tabular-nums text-paper/70">N° {String(position).padStart(2, "0")}</p>
              <h3 className="mt-1 font-serif text-[clamp(2rem,4vw,3.75rem)] leading-[0.95]">{project.name}</h3>
            </div>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-paper/50 transition-colors duration-500 group-hover:bg-paper group-hover:text-ink">
              <ArrowUpRight className="size-5" strokeWidth={1.5} aria-hidden="true" />
            </span>
          </div>
        </ImageReveal>

        <div id={`${project.slug}-meta`} className="mt-5 grid gap-3 md:grid-cols-[1fr_1.4fr] md:gap-8">
          <p className="eyebrow text-ink-soft">
            {project.category} · {project.location}
          </p>
          <p className="text-[0.95rem] leading-relaxed text-ink-soft">{project.excerpt}</p>
        </div>
      </Link>
    </li>
  );
}

export function Portfolio() {
  return (
    <section id="progetti" aria-labelledby="progetti-title" className="section-y">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel sectionNumber="04">Progetti</SectionLabel>
            <h2 id="progetti-title" className="mt-10 font-serif text-h1">
              <WordsReveal text="Luoghi immaginati," />{" "}
              <WordsReveal text="progettati come veri." className="serif-italic text-clay" delay={0.15} />
            </h2>
          </div>
          <Reveal className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="text-ink-soft leading-relaxed">
              ORMA è uno studio giovane. Invece di mostrare lavori che non esistono, presento tre{" "}
              <strong className="font-medium text-ink">concept progettuali</strong>: strutture immaginarie sviluppate con
              lo stesso metodo di un progetto reale. I primi casi studio con i clienti troveranno posto qui.
            </p>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-20 md:mt-28 md:grid-cols-12 md:gap-x-8 md:gap-y-28">
          {projects.map((project, projectIndex) => (
            <ProjectCard key={project.slug} project={project} position={projectIndex + 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}
