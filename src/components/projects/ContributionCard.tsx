import type { ProjectContribution } from "@/types/project";

/**
 * One contribution group. The title comes from the data (e.g. "Technical
 * contributions") rather than a hardcoded taxonomy, so a project can add a
 * group without a component change.
 */
export function ContributionCard({ group }: { group: ProjectContribution }) {
  const headingId = group.title.toLowerCase().replace(/\s+/g, "-");

  return (
    <article
      aria-labelledby={headingId}
      className="border-border bg-surface rounded-card border p-5 sm:p-6"
    >
      <h3 id={headingId} className="font-semibold tracking-tight">
        {group.title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {group.items.map((item) => (
          <li
            key={item}
            className="text-muted-foreground relative pl-5 text-sm leading-relaxed"
          >
            <span
              className="bg-accent absolute top-2 left-0 size-1.5 rounded-full"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
