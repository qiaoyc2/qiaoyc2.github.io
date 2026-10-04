import { cn } from "@/lib/cn";
import type { FilterCategory } from "@/lib/project-utils";
import type { ProjectCategory } from "@/types/project";

type ProjectFilterProps = {
  categories: ProjectCategory[];
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
  /** id of the grid this filter controls, for aria-controls. */
  gridId: string;
};

/**
 * Exclusive category toggles. `aria-pressed` plus a filled/outline treatment
 * carry the selected state, so it never depends on colour alone.
 *
 * Buttons stay in DOM order so Tab walks All → each used category, matching
 * the canonical PROJECT_CATEGORIES list.
 */
export function ProjectFilter({
  categories,
  active,
  onChange,
  gridId,
}: ProjectFilterProps) {
  const options: FilterCategory[] = ["All", ...categories];

  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap gap-2"
    >
      {options.map((category) => {
        const pressed = category === active;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={pressed}
            aria-controls={gridId}
            onClick={() => onChange(category)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm transition-colors",
              pressed
                ? "border-accent bg-accent-subtle text-accent font-medium"
                : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
