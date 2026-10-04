/**
 * Long-form case-study copy. One string per paragraph, matching how the data
 * file stores overview / problem / solution / results.
 */
export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-muted-foreground leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
