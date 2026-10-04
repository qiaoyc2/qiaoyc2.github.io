import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import type { ProjectCardData } from "@/types/project";

import { ProjectCard } from "./ProjectCard";

/**
 * Up to three related case studies, scored by shared categories. Never includes
 * the current project — that filter lives in `getRelatedProjects()`.
 */
export function RelatedProjects({ projects }: { projects: ProjectCardData[] }) {
  return (
    <Container
      width="wide"
      as="section"
      aria-labelledby={projects.length > 0 ? "related-projects" : undefined}
      aria-label={projects.length > 0 ? undefined : "Case study navigation"}
      className="border-border border-t py-10 sm:py-12"
    >
      {projects.length > 0 ? (
        <>
          <SectionHeading
            id="related-projects"
            title="Related projects"
            description="Other work that shares a category with this one."
          />

          <ul
            className={cn(
              "mt-8 grid gap-5",
              projects.length === 1 ? "max-w-md" : "sm:grid-cols-2",
            )}
          >
            {projects.map((project) => (
              <li key={project.slug} className="min-w-0">
                <ProjectCard project={project} variant="related" />
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className={projects.length > 0 ? "mt-10" : undefined}>
        <ButtonLink href="/projects/" variant="secondary">
          <ArrowLeft className="size-4" aria-hidden />
          Back to all projects
        </ButtonLink>
      </div>
    </Container>
  );
}
