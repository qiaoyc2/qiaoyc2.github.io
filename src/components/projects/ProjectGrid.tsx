import type { ProjectCardData } from "@/types/project";

import { ProjectCard } from "./ProjectCard";

type ProjectGridProps = {
  id?: string;
  projects: ProjectCardData[];
};

/**
 * Catalog layout: one column on small screens, two from `sm` upward.
 * A list rather than a naked grid, so the count is available to assistive tech
 * without relying on the live region above it.
 */
export function ProjectGrid({ id, projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p id={id} className="text-muted-foreground mt-8 text-sm">
        No projects in this category.
      </p>
    );
  }

  return (
    <ul id={id} className="mt-8 grid gap-6 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.slug} className="min-w-0">
          <ProjectCard project={project} variant="catalog" />
        </li>
      ))}
    </ul>
  );
}
