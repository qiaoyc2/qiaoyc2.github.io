/**
 * Shape of the project catalog. Content lives in `src/data/projects.ts`;
 * nothing here should ever import a React component.
 *
 * Every case-study section below the header is optional. A project with only a
 * name, role, and short description renders as a short, deliberate-looking page
 * rather than a scaffold full of empty headings — the page skips any section
 * whose field is missing. Fill sections in over time; no component changes needed.
 */

/** The filter buttons on /projects are generated from this list, in this order. */
export const PROJECT_CATEGORIES = [
  "Data Engineering",
  "Applied AI",
  "Backend",
  "Full Stack",
  "Data Visualization",
  "Research",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

/** An image with the alt text required to render it. */
export type ProjectImage = {
  /** Path under `public/`, e.g. "/projects/token-tots/architecture.png". */
  src: string;
  /** Describe what the image shows, not that it is an image. Never leave blank. */
  alt: string;
  caption?: string;
  /** Intrinsic pixel size. Supplying it prevents layout shift while loading. */
  width?: number;
  height?: number;
  /**
   * CSS object-position for the card crop, e.g. "center top".
   * Defaults to center. Set this when the useful part of a screenshot is not
   * in the middle of the frame.
   */
  objectPosition?: string;
};

/**
 * One group of things you personally did. Grouping keeps your work visually
 * separate from the team's on shared projects.
 */
export type ProjectContribution = {
  /** e.g. "Technical contributions", "Product and planning", "Research and testing". */
  title: string;
  items: string[];
};

/** A named block in the technical implementation section. */
export type ProjectSection = {
  heading: string;
  /** One string per paragraph. */
  body: string[];
  image?: ProjectImage;
};

/** A screenshot, diagram, or recording in the output showcase. */
export type ProjectOutput = ProjectImage & {
  /** Controls how the item is framed. Defaults to "image". */
  kind?: "image" | "diagram" | "dashboard" | "gif" | "video";
};

/** A single number worth calling out, rendered as a metric card. */
export type ProjectMetric = {
  /** Keep short so it stays on one line, e.g. "4M+". */
  value: string;
  label: string;
  detail?: string;
};

/** A problem you hit and what you learned from resolving it. */
export type ProjectChallenge = {
  challenge: string;
  decision: string;
  reasoning: string;
  outcome: string;
};

export type Project = {
  // --- Required: enough to render a catalog card ---------------------------
  /** URL segment. Must be unique — the page lives at /projects/<slug>. */
  slug: string;
  name: string;
  /** One sentence. Shown on the card and used as the page meta description. */
  shortDescription: string;
  role: string;
  categories: ProjectCategory[];
  /** Shown as tags on the card. Put the most recognizable ones first. */
  technologies: string[];
  /**
   * Controls ONE thing: whether the project appears in the homepage featured
   * section. Every project appears in the /projects catalog regardless, so
   * `false` does not mean unimportant or hidden.
   */
  featured: boolean;

  // --- Optional header details --------------------------------------------
  /** Omitted rather than faked when unknown; the card just leaves it out. */
  duration?: string;
  teamSize?: string;
  /** A longer summary for the top of the case study, if the one-liner is thin. */
  fullDescription?: string;

  // --- Optional media ------------------------------------------------------
  /**
   * Card image. Leave unset and the card shows a generated placeholder panel.
   * Convention: "/projects/<slug>/thumbnail.png" at 1200×750 (16:10). The card
   * frames a shorter wide crop (~192px on desktop) with object-cover, so keep
   * the useful part of the screenshot near the center, or set `objectPosition`.
   */
  thumbnail?: ProjectImage;
  /** Case-study banner. Convention: "/projects/<slug>/hero.png" at 2000×1000 (2:1). */
  heroImage?: ProjectImage;

  // --- Optional links. A button renders only when its URL exists. ----------
  liveUrl?: string;
  githubUrl?: string;
  /** Report, paper, or final documentation PDF. */
  reportUrl?: string;
  /** Demo video or recorded walkthrough. */
  demoUrl?: string;
  /** Slide deck or final presentation. */
  presentationUrl?: string;

  // --- Optional case-study sections, in page order -------------------------
  /** What it is, who it was for, and why it mattered. One string per paragraph. */
  overview?: string[];
  problem?: string[];
  solution?: string[];
  /** Architecture or workflow diagram shown alongside the solution. */
  solutionImage?: ProjectImage;
  /**
   * Stated near your contributions on team projects, to make the boundary
   * between your work and a teammate's unambiguous.
   */
  ownershipNote?: string;
  /**
   * One-line version of `ownershipNote` for project cards, where the full
   * paragraph would not fit. Set this on any team project so a card can never
   * imply you built every feature single-handedly.
   */
  ownershipSummary?: string;
  contributions?: ProjectContribution[];
  implementation?: ProjectSection[];
  outputs?: ProjectOutput[];
  /** Metric cards. Keep to four or fewer so they stay scannable. */
  metrics?: ProjectMetric[];
  /** Outcomes that read better as sentences than as numbers. */
  results?: string[];
  challenges?: ProjectChallenge[];
};

/** Fields a catalog or featured card actually reads. */
export type ProjectCardData = Pick<
  Project,
  | "slug"
  | "name"
  | "shortDescription"
  | "role"
  | "duration"
  | "categories"
  | "technologies"
  | "thumbnail"
  | "ownershipSummary"
  | "liveUrl"
  | "githubUrl"
  | "demoUrl"
  | "reportUrl"
  | "presentationUrl"
>;
