type ProjectMetadataProps = {
  role: string;
  duration?: string;
  teamSize?: string;
};

/**
 * Role is always present. Duration and team size are omitted rather than
 * faked, matching the catalog cards.
 */
export function ProjectMetadata({ role, duration, teamSize }: ProjectMetadataProps) {
  return (
    <dl className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <dt className="sr-only">Role</dt>
      <dd className="text-foreground font-medium">{role}</dd>

      {duration ? (
        <>
          <span aria-hidden>·</span>
          <dt className="sr-only">Duration</dt>
          <dd>{duration}</dd>
        </>
      ) : null}

      {teamSize ? (
        <>
          <span aria-hidden>·</span>
          <dt className="sr-only">Team size</dt>
          <dd>{teamSize}</dd>
        </>
      ) : null}
    </dl>
  );
}
