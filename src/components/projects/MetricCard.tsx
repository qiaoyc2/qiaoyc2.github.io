import type { ProjectMetric } from "@/types/project";

/**
 * One stored figure. Size and monospace carry the emphasis, so the value is
 * still readable if the accent colour is ignored.
 */
export function MetricCard({ metric }: { metric: ProjectMetric }) {
  return (
    <div className="border-border bg-surface rounded-card border p-5">
      <p className="font-mono text-2xl font-semibold tracking-tight">{metric.value}</p>
      <p className="mt-1 text-sm font-medium">{metric.label}</p>
      {metric.detail ? (
        <p className="text-muted-foreground mt-1 text-xs">{metric.detail}</p>
      ) : null}
    </div>
  );
}
