"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Hero backdrop. The flowing light used to be a WebGL shader rendering every
 * frame (the main cause of a 8 s Total Blocking Time on mobile). It is now a
 * still of that shader (scripts/capture-shaders.mjs) with a slow compositor-only
 * drift, so the look stays and the main thread stays free.
 */
export function PageBackdrop(): ReactNode {
  const pathname = usePathname();
  if (pathname.startsWith("/projects")) return null;
  return (
    <div aria-hidden="true" className="page-backdrop">
      <div className="page-backdrop-layer" />
    </div>
  );
}
