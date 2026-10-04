/**
 * Core personal details used across the site.
 *
 * HOW TO EDIT
 * - Update contact links:  change `email`, `linkedinUrl`, or `githubUrl` below.
 * - Replace the résumé:    drop your PDF at `public/resume.pdf` (keep that exact
 *                          filename) — no code change needed.
 * - Change the site URL:   update `siteUrl`. It feeds canonical links, the
 *                          sitemap, and Open Graph tags, so it must be the real
 *                          deployed origin with no trailing slash.
 */
export const profile = {
  /**
   * Katharina is the preferred professional name; Qiao-Yun is the legal one.
   *
   * `name` is the default and belongs everywhere space is tight or the name
   * repeats — header wordmark, footer, page titles, Open Graph. `fullName`
   * introduces both and is used once, in the homepage hero. Reach for
   * `fullName` only where there is room to say the whole thing.
   */
  name: "Katharina Cheng",
  fullName: "Katharina (Qiao-Yun) Cheng",

  tagline: "Data Engineer · Backend Developer · Applied AI Builder",
  location: "Seattle, Washington",

  intro:
    "I build data pipelines, backend systems, and AI-powered products that turn complex information into practical user experiences. I am a University of Washington Informatics graduate interested in early-career Data Engineering, Backend Software Engineering, and Applied AI opportunities.",

  /** Shown in the homepage contact section. */
  contactIntro:
    "I am interested in early-career opportunities in Data Engineering, Backend Software Engineering, and Applied AI. I am also open to connecting about technical projects, research, and collaborative opportunities.",

  email: "qiaoyc2@uw.edu",
  linkedinUrl: "https://www.linkedin.com/in/qiaoyc",
  githubUrl: "https://github.com/qiaoyc2",

  resumePath: "/resume.pdf",
  /**
   * The homepage contact section. Must match the `id` on that section — change
   * both together, or every "Contact" link on the site stops landing.
   */
  contactHref: "/#contact",

  siteUrl: "https://qiaoyc2.github.io",

  education: {
    school: "University of Washington",
    degree: "Bachelor of Science in Informatics",
    concentration: "Data Science",
    location: "Seattle, WA",
    graduation: "June 2026",
    /** Final GPA — she has graduated, so this is not a running figure. */
    gpa: "3.79 / 4.00",
    honors: "Annual Dean's List, 2022–2025",
  },
} as const;

export type NavItem = {
  label: string;
  /**
   * Written with a trailing slash to match `trailingSlash: true` in
   * next.config.ts, which is what GitHub Pages serves.
   */
  href: string;
  /**
   * Route prefix that marks this item as the active page. Omit it and the item
   * is never highlighted — which is what we want for Resume (a file download)
   * and Contact (a section of the homepage, not a page of its own).
   */
  match?: string;
  /** Opens in a new tab with a screen-reader hint. */
  external?: boolean;
  /** Appended to the new-tab hint, e.g. "PDF, opens in a new tab". */
  hint?: string;
};

/**
 * Primary navigation.
 *
 * HOW TO EDIT: add or reorder items here and both the desktop and mobile menus
 * update — neither keeps its own copy of the list.
 */
export const navLinks: NavItem[] = [
  { label: "Home", href: "/", match: "/" },
  { label: "Experience", href: "/experience/", match: "/experience" },
  // Matches the catalog and every case study beneath it.
  { label: "Projects", href: "/projects/", match: "/projects" },
  {
    label: "Resume",
    href: profile.resumePath,
    external: true,
    hint: "PDF, opens in a new tab",
  },
  { label: "Contact", href: profile.contactHref },
];
