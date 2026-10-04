import { cn } from "@/lib/cn";

/**
 * Stands in for a project screenshot until a real one exists.
 *
 * Deliberately a neutral panel rather than a "missing image" warning: it looks
 * intentional to a visitor while still being obviously empty to you. Drop a
 * file into `public/projects/<slug>/` and set `thumbnail` on the project to
 * replace it.
 *
 * The label is real text, not an image, so there is no alt text to write.
 */
export function PlaceholderMedia({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // `text-border` sets the currentColor the dot grid below is drawn in.
        "bg-surface-muted text-border flex items-center justify-center overflow-hidden px-6",
        className,
      )}
      // A faint dot grid reads as a deliberate empty state rather than a
      // broken image. Decorative only.
      style={{
        backgroundImage:
          "radial-gradient(currentColor 0.5px, transparent 0.5px), radial-gradient(currentColor 0.5px, transparent 0.5px)",
        backgroundSize: "16px 16px",
        backgroundPosition: "0 0, 8px 8px",
      }}
    >
      <span className="text-muted-foreground/70 text-center font-mono text-xs tracking-wide">
        {label}
      </span>
    </div>
  );
}
