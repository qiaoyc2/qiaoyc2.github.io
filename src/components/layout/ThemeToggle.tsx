"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const BUTTON_CLASS =
  "inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground";

const subscribe = () => () => {};

/**
 * Light/dark toggle.
 *
 * First visit follows the operating system preference — that comes from
 * `defaultTheme="system"` on the provider in `app/layout.tsx`, not from here.
 * The first click resolves that preference into an explicit choice, which
 * next-themes persists to localStorage; from then on the button just flips
 * between the two. There is deliberately no visible "system" state.
 */
export function ThemeToggle() {
  // `resolvedTheme` is the theme actually in effect, so it reads "light" or
  // "dark" even while the setting is still "system".
  const { resolvedTheme, setTheme } = useTheme();

  // The server cannot know the visitor's theme, so the icon is client-only.
  // Reading `false` from the server snapshot and `true` from the client one
  // avoids both a hydration mismatch and a layout shift, without an effect.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <div className={BUTTON_CLASS} aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // Describes what activating the button does, not what mode you are in —
      // the icon already shows the current mode.
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={BUTTON_CLASS}
    >
      {isDark ? (
        <Moon className="size-4" aria-hidden />
      ) : (
        <Sun className="size-4" aria-hidden />
      )}
    </button>
  );
}
