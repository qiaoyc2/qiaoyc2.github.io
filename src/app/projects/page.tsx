import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { ProjectsCatalog } from "@/components/projects/ProjectsCatalog";
import { profile } from "@/data/profile";
import { getCatalogProjects, getUsedCategories } from "@/lib/projects";

const title = `Projects | ${profile.name}`;
const description = `Data engineering, backend, and applied AI projects by ${profile.name}.`;

export const metadata: Metadata = {
  // `absolute` skips the root layout's "%s · Katharina Cheng" template, which
  // would otherwise override the pipe this title is specified with.
  title: { absolute: title },
  description,
  alternates: { canonical: "/projects" },
  // Repeated rather than inherited: Next replaces a parent openGraph object
  // wholesale instead of merging into it, so siteName would be dropped.
  openGraph: {
    title,
    description,
    siteName: profile.name,
    url: `${profile.siteUrl}/projects/`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

/** Page copy — project names, roles, and descriptions come from the data file. */
const INTRO =
  "A catalog of data engineering, backend, and applied AI work — from research pipelines to shipped products. Filter by category, or open a case study for the full write-up.";

export default function ProjectsPage() {
  const projects = getCatalogProjects();
  const categories = getUsedCategories();

  return (
    <Container width="wide" className="pt-12 pb-16 sm:pt-16 sm:pb-20">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h1>

      <p className="text-muted-foreground mt-4 max-w-3xl leading-relaxed">{INTRO}</p>

      <ProjectsCatalog projects={projects} categories={categories} />
    </Container>
  );
}
