import { Container } from "@/components/layout/Container";
import { TechTag } from "@/components/ui/TechTag";
import { getExistingProjectImage } from "@/lib/media";
import type { Project } from "@/types/project";

import { ProjectBreadcrumb } from "./ProjectBreadcrumb";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectMetadata } from "./ProjectMetadata";

/**
 * The one block every case study renders: identity, available metadata, any
 * live links, and hero media (or the intentional placeholder).
 */
export function ProjectHeader({ project }: { project: Project }) {
  const hero = getExistingProjectImage(project);

  return (
    <Container width="wide" as="header" className="pt-8 pb-10 sm:pt-12 sm:pb-12">
      <ProjectBreadcrumb name={project.name} />

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.categories.map((category) => (
          <TechTag key={category} tone="accent">
            {category}
          </TechTag>
        ))}
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
        {project.name}
      </h1>

      <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
        {project.shortDescription}
      </p>

      {project.fullDescription &&
      project.fullDescription.trim() !== project.shortDescription.trim() ? (
        <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
          {project.fullDescription}
        </p>
      ) : null}

      <ProjectMetadata
        role={project.role}
        duration={project.duration}
        teamSize={project.teamSize}
      />

      {project.technologies.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <TechTag>{tech}</TechTag>
            </li>
          ))}
        </ul>
      ) : null}

      <ProjectLinks project={project} name={project.name} />

      <ProjectMedia image={hero} label={project.name} frame="hero" className="mt-8" />
    </Container>
  );
}
