import type {
  Project,
  ProjectChallenge,
  ProjectContribution,
  ProjectMetric,
  ProjectOutput,
  ProjectSection,
} from "@/types/project";

/** Drop blank strings so a leftover empty field cannot render an empty block. */
export function nonemptyParagraphs(value?: string[]): string[] {
  return value?.map((item) => item.trim()).filter(Boolean) ?? [];
}

export function nonemptyContributions(
  value?: ProjectContribution[],
): ProjectContribution[] {
  return (
    value
      ?.map((group) => ({
        title: group.title.trim(),
        items: group.items.map((item) => item.trim()).filter(Boolean),
      }))
      .filter((group) => group.title.length > 0 && group.items.length > 0) ?? []
  );
}

export function nonemptyImplementation(value?: ProjectSection[]): ProjectSection[] {
  return (
    value
      ?.map((section) => ({
        ...section,
        heading: section.heading.trim(),
        body: section.body.map((item) => item.trim()).filter(Boolean),
      }))
      .filter((section) => section.heading.length > 0 && section.body.length > 0) ?? []
  );
}

export function nonemptyMetrics(value?: ProjectMetric[]): ProjectMetric[] {
  return (
    value?.filter(
      (metric) => metric.value.trim().length > 0 && metric.label.trim().length > 0,
    ) ?? []
  );
}

export function nonemptyOutputs(value?: ProjectOutput[]): ProjectOutput[] {
  return (
    value?.filter(
      (output) => output.src.trim().length > 0 && output.alt.trim().length > 0,
    ) ?? []
  );
}

export function nonemptyChallenges(value?: ProjectChallenge[]): ProjectChallenge[] {
  return value?.filter((item) => item.challenge.trim().length > 0) ?? [];
}

export function hasOwnershipNote(project: Project): boolean {
  return Boolean(project.ownershipNote?.trim());
}
