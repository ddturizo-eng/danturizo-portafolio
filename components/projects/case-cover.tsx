"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";

// The WebGL effect is decorative: load it after hydration so the cover image
// stays the LCP element and paints without waiting for shader code.
const Displacement = dynamic(
  () =>
    import("@/components/canvas-ui/Displacement/Displacement").then(
      (m) => m.Displacement
    ),
  { ssr: false }
);

/**
 * Case cover with the Canvas UI displacement grid: cells scramble into place
 * on load and shift under fast cursor movement. Needs the HTML-in-canvas API
 * (Chromium 157+); everywhere else the plain cover is shown.
 */
// .case-cover-inner sets the aspect ratio in CSS: the canvas needs a sized box.
export function CaseCover({ children }: { children: ReactNode }): ReactNode {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!fine) return;
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true));
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setReady(true), 300);
    return () => window.clearTimeout(id);
  }, []);

  if (reduced || !ready)
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
