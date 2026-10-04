import type { Project, ProjectCardData, ProjectCategory } from "@/types/project";

/**
 * Pure helpers used by both server pages and the catalog's client filter.
 *
 * Kept out of `lib/projects.ts` on purpose: that file imports the full catalog
 * data. A client component that imported it would ship every case-study body
 * in the browser bundle. This module only depends on types.
 */

export type FilterCategory = ProjectCategory | "All";

export type ProjectLink = { label: string; href: string };

export function filterByCategory<T extends { categories: readonly ProjectCategory[] }>(
  list: T[],
  category: FilterCategory,
): T[] {
  if (category === "All") return list;
  return list.filter((project) => project.categories.includes(category));
}

/**
 * The optional links a project actually has. Returning only present URLs is
 * what keeps dead or empty buttons off the page — callers map over the result
 * rather than testing each field themselves.
 */
export function getProjectLinks(
  project: Pick<
    Project,
    "liveUrl" | "githubUrl" | "demoUrl" | "reportUrl" | "presentationUrl"
  >,
): ProjectLink[] {
  return (
    [
      { label: "Live site", href: project.liveUrl },
      { label: "GitHub", href: project.githubUrl },
      { label: "Demo", href: project.demoUrl },
      { label: "Report", href: project.reportUrl },
      { label: "Slides", href: project.presentationUrl },
    ] satisfies { label: string; href?: string }[]
  ).flatMap((link) => (link.href ? [{ label: link.label, href: link.href }] : []));
}

/** Strip case-study bodies so the catalog client only hydrates card fields. */
export function toProjectCardData(project: Project): ProjectCardData {
  return {
    slug: project.slug,
    name: project.name,
    shortDescription: project.shortDescription,
    role: project.role,
    duration: project.duration,
    categories: project.categories,
    technologies: project.technologies,
    thumbnail: project.thumbnail,
    ownershipSummary: project.ownershipSummary,
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl,
    reportUrl: project.reportUrl,
    presentationUrl: project.presentationUrl,
  };
}
