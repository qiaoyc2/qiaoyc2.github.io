import {
  nonemptyChallenges,
  nonemptyContributions,
  nonemptyImplementation,
  nonemptyMetrics,
  nonemptyOutputs,
  nonemptyParagraphs,
} from "@/lib/case-study";
import type { Project, ProjectCardData } from "@/types/project";

import {
  OverviewSection,
  ProblemSection,
  ResultsSection,
  SolutionSection,
} from "./CaseStudySections";
import { ChallengesSection } from "./ChallengesSection";
import { ContributionSection } from "./ContributionSection";
import { MediaGallery } from "./MediaGallery";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectSection } from "./ProjectSection";
import { RelatedProjects } from "./RelatedProjects";
import { TechnicalSection } from "./TechnicalSection";

/**
 * Assembles a case study from whatever fields the project actually has.
 * Optional sections are omitted entirely — they are not rendered as empty
 * shells. Filling a field in `src/data/projects.ts` is what makes a section
 * appear; no component changes are required.
 */
export function CaseStudy({
  project,
  related,
}: {
  project: Project;
  related: ProjectCardData[];
}) {
  const contributions = nonemptyContributions(project.contributions);
  const implementation = nonemptyImplementation(project.implementation);
  const outputs = nonemptyOutputs(project.outputs);
  const metrics = nonemptyMetrics(project.metrics);
  const results = nonemptyParagraphs(project.results);
  const challenges = nonemptyChallenges(project.challenges);

  return (
    <article>
      <ProjectHeader project={project} />
      <OverviewSection project={project} />
      <ProblemSection project={project} />
      <SolutionSection project={project} />
      <ContributionSection project={project} groups={contributions} />
      <TechnicalSection blocks={implementation} />
      {outputs.length > 0 ? (
        <ProjectSection id="outputs" title="Output showcase" prose={false}>
          <MediaGallery items={outputs} />
        </ProjectSection>
      ) : null}
      <ResultsSection metrics={metrics} results={results} />
      <ChallengesSection items={challenges} />
      <RelatedProjects projects={related} />
    </article>
  );
}
