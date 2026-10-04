/**
 * Shape of the Experience page. Content lives in `src/data/experience.ts`.
 *
 * Entries are grouped into the categories below. A category with no entries is
 * skipped entirely rather than rendering an empty heading.
 */

/** Section order on the Experience page. */
export const EXPERIENCE_CATEGORIES = [
  "Professional Experience",
  "Research Experience",
  "Teaching Experience",
  "Leadership",
] as const;

export type ExperienceCategory = (typeof EXPERIENCE_CATEGORIES)[number];

export type Experience = {
  /** Unique key. Used for React lists and nothing else. */
  id: string;
  organization: string;
  role: string;
  category: ExperienceCategory;

  /** Written out for display, e.g. "September 2025". */
  startDate: string;
  /** Use "Present" for a current role. */
  endDate: string;

  /**
   * Controls ONE thing: whether this entry appears in the homepage preview,
   * which shows at most three. Every entry appears on the Experience page
   * regardless, so `false` does not hide anything.
   */
  featured?: boolean;

  location?: string;
  /** One sentence of context, shown above the bullets. */
  summary?: string;
  /** Two to four accomplishments. Lead with the outcome, not the task. */
  highlights?: string[];
  /**
   * Headline figures, shown as a small row above the bullets. Use this only
   * where the scale of the work is the point — most roles do not need it, and
   * a row of numbers on every card would stop any of them standing out.
   *
   * Keep the figures consistent with whatever the bullets already say.
   */
  metrics?: { value: string; label: string }[];
  /**
   * Technologies, research methods, or skills — whichever fits the role.
   * Rendered as tags using the same tag component the projects use, so the
   * label stays neutral rather than saying "Technologies".
   */
  technologies?: string[];

  /** External link, e.g. the organization or a published paper. */
  externalUrl?: string;
  /** Link to a case study instead of repeating project detail here. */
  projectSlug?: string;
};
