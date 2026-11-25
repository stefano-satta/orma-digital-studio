import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/portfolio";
import { servicePagePath, servicePages } from "@/content/servicePages";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...servicePages.map((servicePage) => ({
      url: `${site.url}${servicePagePath(servicePage)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Solo i casi studio reali: i concept restano online ma in noindex (vedi portfolio/[slug]/page.tsx).
    ...projects.filter((project) => !project.isConcept).map((project) => ({
      url: `${site.url}/portfolio/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
