"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";

export type IndexItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: string;
  year?: string | undefined;
  summary: string;
  theme: string;
  cover: { src: string; alt: string; width: number; height: number };
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Editorial index: one large typographic row per project. On fine pointers a
 * preview of the hovered project trails the cursor with spring inertia.
 */
export function ProjectIndex({ items }: { items: IndexItem[] }): ReactNode {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  // Warm the preview images the first time a mouse enters the list, so the
  // trailing card never flashes an empty frame.
  const [warm, setWarm] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 160, damping: 22, mass: 0.6 });
  const current = active === null ? null : items[active];

  return (
    <div
      className={`project-index ${active !== null ? "has-active" : ""}`}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        x.set(event.clientX);
        y.set(event.clientY);
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setWarm(true);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ol>
        {items.map((item, i) => (
          <li
            key={item.id}
            className={`index-row ${active === i ? "is-active" : ""}`}
          >
            <Link
              href={`/projects/${item.slug}`}
              prefetch={false}
              className="index-link focus-ring"
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActive(i);
              }}
              onFocus={() => setActive(null)}
            >
              <span className="index-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="index-title">
                <span>{item.title}</span>
                <ArrowUpRight
                  className="index-arrow"
                  size={36}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <span className="index-meta">
                <span>{item.category}</span>
                <span>
                  {item.status}
                  {item.year ? ` · ${item.year}` : ""}
                </span>
              </span>
              <span className={`index-thumb work--${item.theme}`}>
                <Image
                  src={item.cover.src}
                  alt=""
                  width={item.cover.width}
                  height={item.cover.height}
                  sizes="120px"
                />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {warm && !reduced && (
        <div className="index-preload" aria-hidden="true">
          {items.map((item) => (
            <Image
              key={item.id}
              src={item.cover.src}
              alt=""
              width={item.cover.width}
              height={item.cover.height}
              sizes="420px"
              loading="eager"
            />
          ))}
        </div>
      )}

      {!reduced && (
        <motion.div
          className="index-preview"
          aria-hidden="true"
          style={{ left: springX, top: springY }}
        >
          <AnimatePresence mode="popLayout">
            {current && (
              <motion.div
                key={current.id}
                className={`index-preview-card work--${current.theme}`}
                initial={{ opacity: 0, scale: 0.86, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotate: 3 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Image
                  src={current.cover.src}
                  alt=""
                  width={current.cover.width}
                  height={current.cover.height}
                  sizes="420px"
                  loading="eager"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
