"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { navLinks } from "@/data/profile";

import { Container } from "./Container";
import { NavLink } from "./NavLink";

/**
 * Disclosure menu for narrow screens.
 *
 * The panel expands in place beneath the header rather than sliding in from
 * off-screen. A plain expanding panel cannot produce horizontal overflow the
 * way an off-canvas drawer can, and it needs no animation library to feel
 * finished — which is why Framer Motion is not used here.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      // Hand focus back to the trigger, so keyboard users resume where they
      // were instead of at the top of the document.
      buttonRef.current?.focus();
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      const insideMenu =
        panelRef.current?.contains(target) || buttonRef.current?.contains(target);
      if (!insideMenu) setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  // Move focus into the panel on open so the next Tab continues through the
  // menu. Closing via a link needs no equivalent, since navigating resets focus.
  useEffect(() => {
    if (open) panelRef.current?.querySelector("a")?.focus();
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="border-border text-muted-foreground hover:border-border-strong hover:text-foreground inline-flex size-9 items-center justify-center rounded-lg border transition-colors md:hidden"
      >
        {open ? (
          <X className="size-4" aria-hidden />
        ) : (
          <Menu className="size-4" aria-hidden />
        )}
      </button>

      {/*
        Always rendered so `aria-controls` always resolves to a real element.
        Positioned against the <header>, not the container, so the panel spans
        the full width and its border meets the viewport edges.
      */}
      <div
        ref={panelRef}
        id="mobile-menu"
        hidden={!open}
        className="border-border bg-background absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b md:hidden"
      >
        <Container width="wide" className="py-4">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                variant="mobile"
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>
        </Container>
      </div>
    </>
  );
}
