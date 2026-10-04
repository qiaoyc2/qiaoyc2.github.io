import type { ProjectChallenge } from "@/types/project";

import { ProjectSection } from "./ProjectSection";

const TERMS = [
  { key: "challenge", label: "Challenge" },
  { key: "decision", label: "Decision" },
  { key: "reasoning", label: "Reasoning" },
  { key: "outcome", label: "Outcome" },
] as const;

function ChallengeCard({ item }: { item: ProjectChallenge }) {
  const rows = TERMS.flatMap(({ key, label }) => {
    const text = item[key].trim();
    return text ? [{ label, text }] : [];
  });

  return (
    <article className="border-border bg-surface rounded-card border p-5 sm:p-6">
      <dl className="space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-accent font-mono text-xs tracking-wider uppercase">
              {row.label}
            </dt>
            <dd className="text-muted-foreground mt-1 text-sm leading-relaxed">
              {row.text}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function ChallengesSection({ items }: { items: ProjectChallenge[] }) {
  if (items.length === 0) return null;

  return (
    <ProjectSection id="challenges" title="Challenges & lessons" prose={false}>
      <div className="space-y-5">
        {items.map((item) => (
          <ChallengeCard key={item.challenge} item={item} />
        ))}
      </div>
    </ProjectSection>
  );
}
