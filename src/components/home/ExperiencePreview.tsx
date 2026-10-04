import { Container, SECTION_Y } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechTag } from "@/components/ui/TechTag";
import { getExperiencePreview } from "@/lib/experience";

/**
 * Three entries flagged `featured: true` in `src/data/experience.ts`. The full
 * list, with every bullet, lives on the Experience page — this is a taste.
 */
export function ExperiencePreview() {
  const entries = getExperiencePreview(3);
  if (entries.length === 0) return null;

  return (
    <Container width="wide" className={SECTION_Y}>
      <SectionHeading
        eyebrow="Experience"
        title="Where I have worked"
        description="Research, teaching, and professional roles across the last two years."
        action={{ label: "View full experience", href: "/experience/" }}
      />

      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {entries.map((entry) => {
          // Falls back to the first accomplishment when an entry has no summary,
          // so the card is never left with an empty body.
          const line = entry.summary ?? entry.highlights?.[0];

          return (
            <li
              key={entry.id}
              className="border-border bg-surface rounded-card flex flex-col border p-5"
            >
              <p className="text-muted-foreground font-mono text-xs">
                {entry.startDate} – {entry.endDate}
              </p>

              <h3 className="mt-2 font-semibold tracking-tight">{entry.role}</h3>
              <p className="text-accent mt-1 text-sm">{entry.organization}</p>

              {line ? <p className="text-muted-foreground mt-3 text-sm">{line}</p> : null}

              {entry.technologies && entry.technologies.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {entry.technologies.slice(0, 3).map((item) => (
                    <TechTag key={item}>{item}</TechTag>
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
