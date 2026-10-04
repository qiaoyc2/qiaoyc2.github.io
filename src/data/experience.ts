import type { Experience } from "@/types/experience";

/* ============================================================================
   EXPERIENCE

   HOW TO ADD AN ENTRY
   Copy any entry below, give it a unique `id`, and set `category` to one of:
   "Professional Experience", "Research Experience", "Teaching Experience",
   or "Leadership". The Experience page groups by category automatically, and a
   category with no entries is skipped rather than rendering an empty heading.

   HOW TO ORDER ENTRIES
   Within each category, entries render in the order they appear here. Keep the
   most recent first.

   OPTIONAL FIELDS
   `location`, `summary`, `highlights`, `technologies`, `externalUrl`, and
   `projectSlug` can all be omitted. Set `projectSlug` to link to a case study
   instead of repeating project detail here.

   PLACEHOLDERS
   Search for "TODO(content)" to find everything still outstanding.
============================================================================ */

export const experiences: Experience[] = [
  /* ---------------------------- Research ---------------------------------- */
  {
    id: "community-notes-research",
    organization: "University of Washington",
    role: "Research Assistant, Social Media Algorithms",
    category: "Research Experience",
    featured: true,
    startDate: "September 2025",
    endDate: "Present",
    location: "Seattle, WA",
    summary:
      "Studying X's Community Notes program at scale — how contributors rate one another's annotations, and how those human judgments compare with AI-generated ones.",
    // Same figures the bullets below cite, pulled out so the scale of the
    // dataset is visible without reading the whole section.
    metrics: [
      { value: "50,000+", label: "Community Notes" },
      { value: "4 million+", label: "Ratings" },
      { value: "4,715", label: "Note-version pairs" },
    ],
    highlights: [
      "Processed more than 50,000 Community Notes and more than 4 million ratings, cleaning and joining the tables to compare latent factor and intercept behavior.",
      "Analyzed 4,715 note-version pairs using K-means clustering, LLM-assisted annotation, and a taxonomy developed for categorizing human feedback.",
      "Built interactive three-dimensional Plotly visualizations to study where human ratings and AI-generated annotations diverge.",
      "Integrated the Grok API into the research workflow and validated the resulting labels by hand, reaching 87% partial and 73% clear agreement across a sampled set.",
    ],
    technologies: [
      "Python",
      "K-means clustering",
      "LLM evaluation",
      "Plotly",
      "Grok API",
      "Data processing",
    ],
    projectSlug: "community-notes-research",
  },

  /* ---------------------------- Teaching ---------------------------------- */
  {
    id: "info-103-ta",
    organization: "University of Washington",
    role: "Teaching Assistant, INFO 103",
    category: "Teaching Experience",
    featured: true,
    startDate: "September 2024",
    endDate: "June 2025",
    location: "Seattle, WA",
    summary:
      "Supported an introductory Informatics course covering programming fundamentals, data ethics, and social media systems.",
    highlights: [
      "Supported students through office hours, live code demonstrations, grading, and technical troubleshooting.",
      "Developed two 50-minute lab sessions along with the supporting quiz materials.",
      "Led discussions on social media history, privacy, consent, and free speech, and helped students apply those concepts to automation projects using Bluesky, Reddit, and Discord bots.",
    ],
    technologies: ["Python", "Curriculum development", "Data ethics"],
  },

  /* -------------------------- Professional -------------------------------- */
  {
    id: "token-tots-capstone",
    organization: "Token Tots — UW Informatics Capstone",
    role: "Technical Product Manager and AI Engineer",
    category: "Professional Experience",
    startDate: "January 2026",
    endDate: "June 2026",
    location: "Seattle, WA",
    summary:
      "Owned the medication reminder workflow for an AI healthcare assistant, and managed technical milestones across the capstone team.",
    // Deliberately short — the full detail lives in the case study rather than
    // being duplicated here.
    technologies: ["Python", "Claude API", "Supabase", "Puppeteer"],
    projectSlug: "token-tots",
  },
  {
    id: "svim-uiux",
    organization: "Svim",
    role: "UI/UX Designer",
    category: "Professional Experience",
    // Chosen over the Token Tots capstone entry for the homepage preview,
    // since Token Tots already appears just above as a featured project.
    featured: true,
    startDate: "June 2024",
    endDate: "December 2024",
    location: "Seattle, WA",
    highlights: [
      "Designed and launched Svim's first website, giving global participants a single place to understand and use the platform.",
      "Built working knowledge of the trading patterns and underlying mechanics of Web3 trading platforms in order to design for them.",
      "Delivered independently against deadlines across the engagement.",
    ],
    technologies: ["UI/UX design", "Web design", "Figma"],
    // TODO(content): confirm the design tools used — "Figma" is an assumption.
    // TODO(content): add `externalUrl` for the Svim site if it is still live.
  },

  /* ---------------------------- Leadership -------------------------------- */
  {
    id: "tba-vice-finance-director",
    organization: "Technology and Business Association",
    role: "Vice Finance Director",
    category: "Leadership",
    startDate: "March 2023",
    endDate: "March 2024",
    location: "University of Washington, Seattle, WA",
    summary:
      "Supported the organization's financial planning, sponsorship coordination, and event operations for programs connecting students with technology and business professionals.",
    highlights: [
      "Managed and coordinated more than $3,000 in financial sponsorships to support student programs and organizational events.",
      "Supported budgeting, expense tracking, and resource planning to ensure funding aligned with event and organizational needs.",
      "Collaborated with student leaders and event teams to coordinate programs serving more than 100 participants.",
      "Communicated with sponsors and internal organizers to support event logistics, funding requirements, and smooth execution.",
    ],
    technologies: [
      "Financial Planning",
      "Budget Coordination",
      "Sponsorship Management",
      "Event Operations",
      "Stakeholder Communication",
      "Team Collaboration",
    ],
  },
  {
    id: "cen-event-planning-director",
    organization: "Chinese Entrepreneur Networking",
    role: "Event Planning Director",
    category: "Leadership",
    startDate: "May 2023",
    endDate: "May 2024",
    location: "University of Washington, Seattle, WA",
    summary:
      "Planned career-focused networking programs and competitions that helped students connect with entrepreneurs, industry professionals, and other students interested in professional development.",
    highlights: [
      "Developed and coordinated networking activities and career-focused competitions reaching more than 100 participants annually.",
      "Collaborated with student leaders and industry guests to manage event scheduling, logistics, communication, and attendee experience.",
      "Designed targeted activities that helped students explore career paths and gain deeper knowledge of entrepreneurship and professional growth.",
      "Published monthly articles covering career planning, professional development, and opportunities for students to engage with industry.",
    ],
    technologies: [
      "Event Planning",
      "Program Coordination",
      "Professional Networking",
      "Industry Outreach",
      "Content Development",
      "Leadership",
      "Cross-Functional Collaboration",
    ],
  },
];
