"use client";

import type { CSSProperties, ReactNode } from "react";
import { useShown } from "./use-in-view-class";

/** Media enters by opening a rounded clip window, then settles its scale. */
export function RevealMedia({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}): ReactNode {
  const [ref, shown] = useShown<HTMLDivElement>(false, "0px 0px -15% 0px");
  return (
    <div
      ref={ref}
      className={`reveal-media${shown ? " is-shown" : ""} ${className ?? ""}`}
      style={{ "--enter-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** Small block rise for supporting copy. */
export function Rise({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}): ReactNode {
  const [ref, shown] = useShown<HTMLDivElement>(false, "0px 0px -10% 0px");
  return (
    <div
      ref={ref}
      className={`reveal-rise${shown ? " is-shown" : ""} ${className ?? ""}`}
      style={{ "--enter-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
