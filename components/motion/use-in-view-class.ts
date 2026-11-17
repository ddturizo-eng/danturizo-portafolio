"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Flips to true the first time the element scrolls into view. The visual
 * part of every reveal lives in CSS, so this is the only JavaScript involved.
 */
export function useShown<T extends HTMLElement>(
  immediate = false,
  rootMargin = "0px 0px -12% 0px"
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(immediate);

  useEffect(() => {
    if (shown) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shown, rootMargin]);

  return [ref, shown];
}
