import type { ExperienceGroup } from "@/lib/experience";

import { ExperienceCard } from "./ExperienceCard";

/** Turns a category name into a stable heading id, e.g. "research-experience". */
function toId(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

/**
 * One category and its entries.
 *
 * The page never renders this for an empty category — `getGroupedExperience`
 * drops those — so there is no empty state to handle here.
 *
 * Categories are told apart by their heading text and the rule beneath it
 * rather than by a colour, so the grouping survives greyscale and screen
 * readers alike.
 */
export function ExperienceSection({ group }: { group: ExperienceGroup }) {
  const headingId = toId(group.category);
  const count = group.entries.length;

  return (
    <section aria-labelledby={headingId}>
      <div className="border-border flex items-baseline justify-between gap-4 border-b pb-3">
        <h2 id={headingId} className="text-xl font-semibold tracking-tight sm:text-2xl">
          {group.category}
        </h2>
        <p className="text-muted-foreground shrink-0 font-mono text-xs">
          {count} {count === 1 ? "role" : "roles"}
        </p>
      </div>

      <ul className="mt-6 space-y-5">
        {group.entries.map((entry) => (
          <li key={entry.id}>
            <ExperienceCard entry={entry} />
          </li>
        ))}
      </ul>
    </section>
  );
}
