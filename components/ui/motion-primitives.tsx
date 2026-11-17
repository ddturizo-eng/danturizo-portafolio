import type { CSSProperties, ReactNode } from "react";

// CSS-driven entrances (see .enter-up / .enter-unblur in globals.css). They
// start on first paint instead of waiting for hydration, which keeps LCP low,
// and respect prefers-reduced-motion without JavaScript.

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}): ReactNode {
  return (
    <div
      className={`enter-up ${className ?? ""}`}
      style={{ "--enter-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function ScaleUnblur({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}): ReactNode {
  return (
    <div
      className={`enter-unblur ${className ?? ""}`}
      style={{ "--enter-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
