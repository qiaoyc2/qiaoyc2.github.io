/* ============================================================================
   CORE CAPABILITIES

   Grouped skills for the homepage. Deliberately not percentage bars — a list
   of what you actually work with is more credible than a self-assigned score.

   HOW TO EDIT
   Add or remove strings in any `skills` array, or add a whole new group. Groups
   render in the order below. Keep each group to roughly eight items so the
   section stays scannable; if a group grows past that, it probably wants
   splitting rather than extending.

   The `summary` line is what stops the section reading as a keyword dump — it
   says what you build with the group, not just what the group contains.
============================================================================ */

export type CapabilityGroup = {
  title: string;
  /** One short sentence on what you build with these. */
  summary?: string;
  /** One short label per skill. Avoid version numbers and qualifiers. */
  skills: string[];
};

export const capabilities: CapabilityGroup[] = [
  {
    title: "Data Engineering",
    summary: "Moving messy source data into models that answer questions quickly.",
    skills: [
      "Python",
      "SQL",
      "ETL",
      "Data pipelines",
      "Data modeling",
      "Azure SQL",
      "MongoDB",
      "Supabase",
    ],
  },
  {
    title: "Backend Engineering",
    summary: "APIs and services that stay predictable as features accumulate.",
    skills: [
      "REST APIs",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "WebSockets",
      "Firebase",
      "API integration",
    ],
  },
  {
    title: "Applied AI",
    summary: "LLM workflows built to produce structured output, then measured.",
    skills: [
      "LLM API integration",
      "Prompt engineering",
      "Structured output extraction",
      "Agent workflows",
      "Text classification",
      "Embeddings",
      "Model evaluation",
    ],
  },
  {
    title: "Visualization and Product",
    summary: "Turning analysis into interfaces people can actually act on.",
    skills: ["Tableau", "Plotly", "D3.js", "React", "HTML and CSS", "User research"],
  },
];
