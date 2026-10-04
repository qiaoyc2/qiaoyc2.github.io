import type { Project, ProjectContribution } from "@/types/project";

import { ContributionCard } from "./ContributionCard";
import { ProjectSection } from "./ProjectSection";

/**
 * Ownership callout plus contribution groups. The note is the full
 * `ownershipNote` from the data file — not a second, contradictory summary.
 */
export function ContributionSection({
  project,
  groups,
}: {
  project: Project;
  groups: ProjectContribution[];
}) {
  const note = project.ownershipNote?.trim();
  if (!note && groups.length === 0) return null;

  return (
    <ProjectSection id="contributions" title="My contributions" prose={false}>
      {note ? (
        <p className="border-border text-muted-foreground mb-6 max-w-2xl border-l-2 pl-4 leading-relaxed">
          {note}
        </p>
      ) : null}

      {groups.length > 0 ? (
        <ul className={groups.length === 1 ? "grid gap-5" : "grid gap-5 md:grid-cols-2"}>
          {groups.map((group) => (
            <li key={group.title} className="min-w-0">
              <ContributionCard group={group} />
            </li>
          ))}
        </ul>
      ) : null}
    </ProjectSection>
  );
}
