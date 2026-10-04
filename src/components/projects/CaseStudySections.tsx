import { nonemptyParagraphs } from "@/lib/case-study";
import type { Project } from "@/types/project";

import { MetricCard } from "./MetricCard";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectSection } from "./ProjectSection";
import { Prose } from "./Prose";

export function OverviewSection({ project }: { project: Project }) {
  const paragraphs = nonemptyParagraphs(project.overview);
  if (paragraphs.length === 0) return null;

  return (
    <ProjectSection id="overview" title="Overview">
      <Prose paragraphs={paragraphs} />
    </ProjectSection>
  );
}

export function ProblemSection({ project }: { project: Project }) {
  const paragraphs = nonemptyParagraphs(project.problem);
  if (paragraphs.length === 0) return null;

  return (
    <ProjectSection id="problem" title="Problem">
      <Prose paragraphs={paragraphs} />
    </ProjectSection>
  );
}

export function SolutionSection({ project }: { project: Project }) {
  const paragraphs = nonemptyParagraphs(project.solution);
  if (paragraphs.length === 0) return null;

  const image = project.solutionImage?.src.trim() ? project.solutionImage : undefined;

  return (
    <ProjectSection id="solution" title="Solution" prose={!image}>
      <div
        className={image ? "grid items-start gap-8 lg:grid-cols-2 lg:gap-10" : undefined}
      >
        <Prose paragraphs={paragraphs} />
        {image ? (
          <ProjectMedia image={image} label={image.alt} kind="diagram" frame="diagram" />
        ) : null}
      </div>
    </ProjectSection>
  );
}

export function ResultsSection({
  metrics,
  results,
}: {
  metrics: NonNullable<Project["metrics"]>;
  results: string[];
}) {
  if (metrics.length === 0 && results.length === 0) return null;

  return (
    <ProjectSection id="results" title="Results & impact" prose={false}>
      {metrics.length > 0 ? (
        <ul
          className={
            metrics.length === 1
              ? "grid gap-4 sm:max-w-xs"
              : metrics.length === 2
                ? "grid gap-4 sm:grid-cols-2"
                : metrics.length === 3
                  ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          {metrics.map((metric) => (
            <li key={metric.label} className="min-w-0">
              <MetricCard metric={metric} />
            </li>
          ))}
        </ul>
      ) : null}

      {results.length > 0 ? (
        <div className={metrics.length > 0 ? "mt-8 max-w-2xl" : "max-w-2xl"}>
          <Prose paragraphs={results} />
        </div>
      ) : null}
    </ProjectSection>
  );
}
