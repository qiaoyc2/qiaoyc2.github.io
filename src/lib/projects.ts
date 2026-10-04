import { projects } from "@/data/projects";
import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from "@/types/project";

import { toProjectCardData } from "./project-utils";

export {
  filterByCategory,
  getProjectLinks,
  toProjectCardData,
  type FilterCategory,
  type ProjectLink,
} from "./project-utils";

/**
 * Read helpers over the project catalog. Components import from here rather
 * than reaching into the data file, so the shape of `projects.ts` can change
 * without touching the UI.
 */

export function getAllProjects(): Project[] {
  return projects;
}

/** Card-shaped catalog entries, in catalog order. */
export function getCatalogProjects() {
  return projects.map(toProjectCardData);
}

/** Homepage featured section. Order follows the catalog. */
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Feeds generateStaticParams, so every case study is prerendered at build time. */
export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

/**
 * Only the categories at least one project uses, in the canonical order. Keeps
 * the filter bar from offering a category that would return nothing.
 */
export function getUsedCategories(): ProjectCategory[] {
  const used = new Set(projects.flatMap((project) => project.categories));
  return PROJECT_CATEGORIES.filter((category) => used.has(category));
}

/**
 * Projects sharing the most categories with the given one. Falls back to
 * catalog order for ties, and returns fewer than `limit` rather than padding
 * with unrelated work.
 */
export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProjectBySlug(slug);
  if (!current) return [];

  return projects
    .filter((project) => project.slug !== slug)
    .map((project) => ({
      project,
      shared: project.categories.filter((category) =>
        current.categories.includes(category),
      ).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((entry) => entry.project);
}
