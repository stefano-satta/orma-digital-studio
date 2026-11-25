import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProject, projects } from "@/content/portfolio";
import { site } from "@/content/site";
import { JsonLd } from "@/components/common/JsonLd";
import { ArrowLink } from "@/components/common/ArrowLink";
import { ImageReveal, Reveal, WordsReveal } from "@/components/common/motion/primitives";
import { joinClassNames } from "@/lib/joinClassNames";

type ProjectPageProps = PageProps<"/portfolio/[slug]">;

/** Composizione editoriale della galleria: una regola di layout per ciascuna delle prime quattro foto. */
const galleryLayouts = [
  { className: "col-span-12 aspect-[16/9] md:col-span-8", sizes: "(min-width:768px) 66vw, 100vw" },
  { className: "col-span-6 aspect-[3/4] md:col-span-4 md:mt-32", sizes: "(min-width:768px) 50vw, 100vw" },
  { className: "col-span-6 aspect-[3/4] md:col-span-4", sizes: "(min-width:768px) 50vw, 100vw" },
  { className: "col-span-12 aspect-[16/10] md:col-span-7 md:col-start-6 md:-mt-24", sizes: "(min-width:768px) 50vw, 100vw" },
];

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const projectKind = project.isConcept ? "concept" : "caso studio";
  const title = `${project.name} — ${projectKind} ${project.category.toLowerCase()}`;
  return {
    title,
    description: project.excerpt,
    alternates: { canonical: `/portfolio/${project.slug}` },
    // I concept (strutture immaginarie, foto provvisorie) non vanno in indice: tornano indicizzabili con isConcept: false.
    ...(project.isConcept ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title, description: project.excerpt, images: [{ url: project.cover.src, alt: project.cover.alt }] },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<div className="min-h-[92svh] bg-forest-deep" aria-hidden="true" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: ProjectPageProps["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentProjectIndex = projects.findIndex((candidate) => candidate.slug === slug);
  const nextProject = projects[(currentProjectIndex + 1) % projects.length];
  const { caseStudy } = project;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: project.name, item: `${site.url}/portfolio/${project.slug}` },
    ],
  };

  return (
    <article>
      <JsonLd data={breadcrumbSchema} />

      <header className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-forest-deep text-paper">
        <Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/90 via-forest-deep/50 to-forest-deep/60" aria-hidden="true" />
        <div className="shell pt-32 pb-14">
          <nav aria-label="Breadcrumb" className="eyebrow text-paper/70">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="link-draw">Home</Link> /</li>
              <li aria-current="page">{project.name}</li>
            </ol>
          </nav>
          {project.isConcept && (
            <p className="mt-8 inline-block rounded-full bg-paper/90 px-3 py-2 text-xs font-medium tracking-wide text-ink uppercase">
              Concept progettuale · struttura immaginaria
            </p>
          )}
          <h1 className="mt-6 font-serif text-display">
            <WordsReveal text={project.name} immediate stagger={0.08} />
          </h1>
          <dl className="mt-10 grid gap-6 border-t border-paper/25 pt-6 text-sm sm:grid-cols-3">
            <div><dt className="eyebrow text-paper/55">Tipologia</dt><dd className="mt-1.5">{project.category}</dd></div>
            <div><dt className="eyebrow text-paper/55">Luogo</dt><dd className="mt-1.5">{project.location}</dd></div>
            <div><dt className="eyebrow text-paper/55">Servizi</dt><dd className="mt-1.5">{project.services.join(" · ")}</dd></div>
          </dl>
        </div>
      </header>

      <section className="section-y">
        <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <p className="font-serif text-h3">{project.excerpt}</p>
          </Reveal>
          <div className="space-y-10 md:col-span-4 md:col-start-9">
            <Reveal><h2 className="eyebrow text-ink-soft">Contesto</h2><p className="mt-3 leading-relaxed text-ink-soft">{caseStudy.context}</p></Reveal>
            <Reveal delay={0.05}><h2 className="eyebrow text-ink-soft">Obiettivo</h2><p className="mt-3 leading-relaxed text-ink-soft">{caseStudy.goal}</p></Reveal>
          </div>
        </div>

        <div className="shell mt-24 grid grid-cols-12 gap-4 md:gap-8">
          {project.gallery.map((photo, photoIndex) => {
            const layout = galleryLayouts[photoIndex % galleryLayouts.length];
            const isInRightColumn = photoIndex % 2 === 1;
            return (
              <ImageReveal
                key={photo.src}
                delay={isInRightColumn ? 0.1 : 0}
                className={joinClassNames("relative overflow-hidden bg-sand", layout.className)}
              >
                <Image src={photo.src} alt={photo.alt} fill sizes={layout.sizes} className="object-cover" />
              </ImageReveal>
            );
          })}
        </div>
      </section>

      <section className="grain section-y bg-forest text-paper" aria-labelledby="approccio">
        <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <h2 id="approccio" className="font-serif text-h2">L&apos;approccio</h2>
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {caseStudy.approach.map((approachStep, stepIndex) => (
              <li key={approachStep} className="grid grid-cols-[3rem_1fr] border-t border-paper/15 py-6 last:border-b">
                <span className="text-xs tabular-nums text-sand">{String(stepIndex + 1).padStart(2, "0")}</span>
                <p className="text-lead text-paper/85">{approachStep}</p>
              </li>
            ))}
          </ol>
          <div className="md:col-span-4 md:col-start-6">
            <h3 className="eyebrow text-paper/55">Deliverable</h3>
            <ul className="mt-4 space-y-2">
              {caseStudy.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
            </ul>
          </div>
          <div className="md:col-span-3">
            <h3 className="eyebrow text-paper/55">Cosa misurare</h3>
            <p className="mt-4 text-paper/80 leading-relaxed">{caseStudy.measure}</p>
          </div>
        </div>
      </section>

      <nav aria-label="Progetto successivo" className="section-y">
        <div className="shell flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Link href={`/portfolio/${nextProject.slug}`} className="group block">
            <p className="eyebrow text-ink-soft">Progetto successivo</p>
            <p className="mt-4 font-serif text-h1 transition-colors group-hover:text-clay">{nextProject.name} →</p>
          </Link>
          <ArrowLink href="/#contatti">Parliamo del tuo progetto</ArrowLink>
        </div>
      </nav>
    </article>
  );
}
