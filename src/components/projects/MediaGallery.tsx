import type { ProjectOutput } from "@/types/project";

import { ProjectMedia } from "./ProjectMedia";

/**
 * Responsive gallery for the output showcase. No carousel — items wrap in a
 * grid so every screenshot is reachable without extra JavaScript.
 *
 * Callers only mount this when `outputs` has real entries; an empty array
 * would otherwise produce an empty heading, which the case study must not show.
 */
export function MediaGallery({ items }: { items: ProjectOutput[] }) {
  if (items.length === 0) return null;

  return (
    <ul className={items.length === 1 ? "grid gap-5" : "grid gap-5 sm:grid-cols-2"}>
      {items.map((item) => (
        <li key={`${item.src}-${item.alt}`} className="min-w-0">
          <ProjectMedia
            image={item}
            label={item.alt}
            kind={item.kind}
            frame={item.kind === "diagram" ? "diagram" : "gallery"}
          />
        </li>
      ))}
    </ul>
  );
}
