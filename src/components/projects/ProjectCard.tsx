import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { newTabProps } from "@/components/ui/ExternalLink";
import { TechTag } from "@/components/ui/TechTag";
import { cn } from "@/lib/cn";
import { getProjectLinks } from "@/lib/project-utils";
import type { ProjectCardData } from "@/types/project";

import { PlaceholderMedia } from "./PlaceholderMedia";

/**
 * Catalog card, shared by the homepage featured section, the projects page,
 * and related-project strips on case studies.
 *
 * `featured` shows a little more: the description runs full length, the
 * ownership note appears, and more technology tags are listed. `related` is
 * more compact so it does not compete with the case study above it.
 */
type ProjectCardProps = {
  project: ProjectCardData;
  variant?: "featured" | "catalog" | "related";
};

export function ProjectCard({ project, variant = "catalog" }: ProjectCardProps) {
  const isFeatured = variant === "featured";
  const isRelated = variant === "related";
  const tagLimit = isFeatured ? 6 : isRelated ? 3 : 4;
  const tags = project.technologies.slice(0, tagLimit);
  const remaining = project.technologies.length - tags.length;
  const links = isRelated ? [] : getProjectLinks(project);
  const caseStudyHref = `/projects/${project.slug}/`;

  return (
    <article className="border-border bg-surface rounded-card hover:border-border-strong flex flex-col overflow-hidden border transition-colors">
      <div
        className={
          isRelated
            ? "border-border relative h-32 shrink-0 overflow-hidden border-b"
            : "border-border relative h-44 shrink-0 overflow-hidden border-b sm:h-48"
        }
      >
        {project.thumbnail ? (
          <Image
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            fill
            className="object-cover object-center"
            style={
              project.thumbnail.objectPosition
                ? { objectPosition: project.thumbnail.objectPosition }
                : undefined
            }
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <PlaceholderMedia label={project.name} className="absolute inset-0" />
        )}
      </div>

      <div
        className={
          isRelated
            ? "flex flex-1 flex-col gap-3 p-4"
            : "flex flex-1 flex-col gap-4 p-5 sm:p-6"
        }
      >
        <div>
          <div className="flex flex-wrap gap-1.5">
            {project.categories.map((category) => (
              <TechTag key={category} tone="accent">
                {category}
              </TechTag>
            ))}
          </div>

          <h3
            className={cn(
              "mt-3 font-semibold tracking-tight",
              isFeatured ? "text-xl sm:text-2xl" : isRelated ? "text-base" : "text-lg",
            )}
          >
            {project.name}
          </h3>

          {/* Role and dates are metadata, so they are styled apart from the
              description rather than reading as part of it. */}
          <dl className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
            <dt className="sr-only">Role</dt>
            <dd className="text-foreground font-medium">{project.role}</dd>
            {project.duration ? (
              <>
                <span aria-hidden>·</span>
                <dt className="sr-only">Duration</dt>
                <dd>{project.duration}</dd>
              </>
            ) : null}
          </dl>

          <p className="text-muted-foreground mt-3 text-sm">{project.shortDescription}</p>

          {isFeatured && project.ownershipSummary ? (
            <p className="border-border text-muted-foreground mt-3 border-l-2 pl-3 text-xs">
              {project.ownershipSummary}
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
            {remaining > 0 ? (
              <TechTag className="border-dashed">+{remaining} more</TechTag>
            ) : null}
          </div>

          <div className="border-border flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4">
            <Link
              href={caseStudyHref}
              className="text-accent group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              View case study
              {/* Distinguishes this link from the identical one on every other
                  card when a screen reader lists links out of context. */}
              <span className="sr-only"> for {project.name}</span>
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>

            {/* Only links whose URLs exist — never an empty button. */}
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...newTabProps}
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline"
              >
                {link.label}
                <span className="sr-only"> for {project.name} (opens in a new tab)</span>
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
