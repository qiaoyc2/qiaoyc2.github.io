import { Container, SECTION_Y } from "@/components/layout/Container";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProjects } from "@/lib/projects";

/**
 * Whatever is flagged `featured: true` in `src/data/projects.ts` — no slugs are
 * named here, so changing the flag is all it takes to change this section.
 */
export function FeaturedProjects() {
  const featured = getFeaturedProjects();
  if (featured.length === 0) return null;

  return (
    <Container width="wide" className={SECTION_Y}>
      <SectionHeading
        eyebrow="Selected work"
        title="Featured projects"
        description="Two projects that best show how I work across data, backend, and applied AI."
        action={{ label: "View all projects", href: "/projects/" }}
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} variant="featured" />
        ))}
      </div>
    </Container>
  );
}
