import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/projects/CaseStudy";
import { profile } from "@/data/profile";
import { getExistingProjectImage } from "@/lib/media";
import { getProjectBySlug, getProjectSlugs, getRelatedProjects } from "@/lib/projects";
import { toProjectCardData } from "@/lib/project-utils";

type PageProps = { params: Promise<{ slug: string }> };

/** Prerenders one page per project at build time, which static export requires. */
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

/** Any slug not returned above 404s instead of being rendered on demand. */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.name} | ${profile.name}`;
  const description = project.shortDescription;
  const image = getExistingProjectImage(project);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description,
      siteName: profile.name,
      url: `${profile.siteUrl}/projects/${slug}/`,
      type: "article",
      ...(image ? { images: [{ url: image.src, alt: image.alt }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <CaseStudy
      project={project}
      related={getRelatedProjects(slug).map(toProjectCardData)}
    />
  );
}
