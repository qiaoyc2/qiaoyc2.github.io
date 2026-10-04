import { BarChart3, Database, Server, Sparkles, type LucideIcon } from "lucide-react";

import { Container, SECTION_Y } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechTag } from "@/components/ui/TechTag";
import { capabilities } from "@/data/capabilities";

/**
 * Icons are presentation, so they are matched here by group title rather than
 * stored alongside the content. Renaming a group in the data file falls back to
 * the default icon instead of breaking.
 */
const ICONS: Record<string, LucideIcon> = {
  "Data Engineering": Database,
  "Backend Engineering": Server,
  "Applied AI": Sparkles,
  "Visualization and Product": BarChart3,
};

export function Capabilities() {
  return (
    <Container width="wide" className={SECTION_Y}>
      <SectionHeading
        eyebrow="Capabilities"
        title="What I build with"
        description="Grouped by the kind of problem rather than listed as a flat inventory."
      />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((group) => {
          const Icon = ICONS[group.title] ?? Sparkles;

          return (
            <section
              key={group.title}
              className="border-border bg-surface rounded-card flex flex-col border p-5"
            >
              <Icon className="text-accent size-5" aria-hidden />

              <h3 className="mt-3 font-semibold tracking-tight">{group.title}</h3>

              {group.summary ? (
                <p className="text-muted-foreground mt-1.5 text-sm">{group.summary}</p>
              ) : null}

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <TechTag>{skill}</TechTag>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
