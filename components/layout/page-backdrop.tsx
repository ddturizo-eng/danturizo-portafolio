"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { DeferredFlow as ShaderFlow } from "../shaders/deferred-flow";

export function PageBackdrop(): ReactNode {
  const pathname = usePathname();
  if (pathname.startsWith("/projects")) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-225 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-50 md:opacity-100">
        <ShaderFlow brightness={3} iterations={10} flowSpeed={[0, 0.1]} />
      </div>
    </div>
  );
}
