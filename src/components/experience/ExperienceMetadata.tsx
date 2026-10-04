import type { Experience } from "@/types/experience";

/**
 * Dates and location for one entry.
 *
 * A definition list with screen-reader-only terms: sighted readers get the
 * meaning from position and formatting, and everyone else hears "Dates" and
 * "Location" rather than two bare strings. Sits on its own line under the
 * organization so a long role or organization name can never collide with it.
 */
export function ExperienceMetadata({
  startDate,
  endDate,
  location,
}: Pick<Experience, "startDate" | "endDate" | "location">) {
  return (
    <dl className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
      <dt className="sr-only">Dates</dt>
      <dd className="font-mono">
        {startDate} – {endDate}
      </dd>

      {location ? (
        <>
          <span aria-hidden>·</span>
          <dt className="sr-only">Location</dt>
          <dd>{location}</dd>
        </>
      ) : null}
    </dl>
  );
}
