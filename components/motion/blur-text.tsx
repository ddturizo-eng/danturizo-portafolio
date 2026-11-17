"use client";

import { motion, useInView } from "motion/react";
import { Fragment, useRef, type ElementType, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type BlurTextProps = {
  /** Text to reveal. Use "\n" to force a line break. */
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Seconds between words. */
  stagger?: number;
  delay?: number;
  /** Reveal on mount instead of when scrolled into view. */
  immediate?: boolean;
  /** Words (exact match) rendered in the muted accent tone. */
  muted?: string[];
};

/**
 * Word-by-word reveal: each word rises 0.35em while its blur clears.
 * Screen readers get the full sentence once; the animated words are hidden.
 */
export function BlurText({
  text,
  as: Tag = "p",
  className,
  id,
  stagger = 0.045,
  delay = 0,
  immediate = false,
  muted = [],
}: BlurTextProps): ReactNode {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = useReducedMotion();
  const show = immediate || inView;
  const lines = text.split("\n");
  let index = 0;

  return (
    <Tag ref={ref} id={id} className={className}>
      <span className="sr-only">{text.replace(/\n/g, " ")}</span>
      <span aria-hidden="true">
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="blur-line">
            {line.split(" ").map((word, wordIndex, words) => {
              const i = index++;
              const isMuted = muted.some(
                (m) => word.replace(/[.,]/g, "") === m
              );
              return (
                <Fragment key={`${lineIndex}-${wordIndex}`}>
                  <motion.span
                    className={`blur-word${isMuted ? " is-muted" : ""}`}
                    initial={
                      reduced
                        ? false
                        : { opacity: 0, filter: "blur(10px)", y: "0.35em" }
                    }
                    animate={
                      show || reduced
                        ? { opacity: 1, filter: "blur(0px)", y: "0em" }
                        : { opacity: 0, filter: "blur(10px)", y: "0.35em" }
                    }
                    transition={{
                      duration: 0.9,
                      ease: EASE,
                      delay: delay + i * stagger,
                    }}
                  >
                    {word}
                  </motion.span>
                  {wordIndex < words.length - 1 ? " " : null}
                </Fragment>
              );
            })}
          </span>
        ))}
      </span>
    </Tag>
  );
}
