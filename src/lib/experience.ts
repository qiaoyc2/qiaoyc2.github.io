import { experiences } from "@/data/experience";
import { EXPERIENCE_CATEGORIES, type Experience } from "@/types/experience";

export type ExperienceGroup = {
  category: (typeof EXPERIENCE_CATEGORIES)[number];
  entries: Experience[];
};

/**
 * Groups entries into the canonical category order, dropping any category that
 * has no entries — so an unused section never renders as an empty heading.
 */
export function getGroupedExperience(): ExperienceGroup[] {
  return EXPERIENCE_CATEGORIES.map((category) => ({
    category,
    entries: experiences.filter((entry) => entry.category === category),
  })).filter((group) => group.entries.length > 0);
}

/**
 * Short list for the homepage preview, in data-file order. Set `featured: true`
 * on the entries you want here; if none are flagged it falls back to the first
 * few, so the section can never render empty.
 */
export function getExperiencePreview(limit = 3): Experience[] {
  const flagged = experiences.filter((entry) => entry.featured);
  return (flagged.length > 0 ? flagged : experiences).slice(0, limit);
}
