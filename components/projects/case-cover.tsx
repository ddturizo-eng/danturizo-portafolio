"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Displacement as DisplacementComponent } from "@/components/canvas-ui/Displacement/Displacement";
import { useReducedMotion } from "@/lib/motion";

// The WebGL effect is decorative: its module loads after idle so the cover
// image stays the LCP element. The swap happens only once the module is in
// memory, so the cover never renders empty (that caused a 0.3 layout shift).

/**
 * Case cover with the Canvas UI displacement grid: cells scramble into place
 * on load and shift under fast cursor movement. Needs the HTML-in-canvas API
 * (Chromium 157+); everywhere else the plain cover is shown.
 */
// .case-cover-inner sets the aspect ratio in CSS: the canvas needs a sized box.
export function CaseCover({ children }: { children: ReactNode }): ReactNode {
  const reduced = useReducedMotion();
  const [Displacement, setDisplacement] = useState<
    typeof DisplacementComponent | null
  >(null);

  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!fine) return;
    let cancelled = false;
    const load = (): void => {
      void import("@/components/canvas-ui/Displacement/Displacement").then(
        (m) => {
          if (!cancelled) setDisplacement(() => m.Displacement);
        }
      );
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(load);
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }
    const id = window.setTimeout(load, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  if (reduced || !Displacement)
    return <div className="case-cover-inner">{children}</div>;

  return (
    <Displacement
      className="case-cover-inner"
      grid={36}
      radius={0.14}
      strength={0.14}
      threshold={600}
      relaxation={0.9}
      shift={1}
      aberration={1.2}
      grain={0.08}
      scramble={0.8}
    >
      {children}
    </Displacement>
  );
}
