/** Drops the trailing slash that `trailingSlash: true` adds, except on the root. */
function normalize(path: string): string {
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

/**
 * Whether a nav item should be shown as the current page.
 *
 * Items without a `match` are never active — Resume is a file download and
 * Contact is a section of the homepage, so neither is a page you can be "on".
 * Home matches exactly, or `/` would light up everywhere. Every other match is
 * a prefix, so `/projects/token-tots` still highlights Projects.
 */
export function isActivePath(pathname: string, match?: string): boolean {
  if (!match) return false;

  const current = normalize(pathname);
  if (match === "/") return current === "/";

  return current === match || current.startsWith(`${match}/`);
}
