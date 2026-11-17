"use client";

import { Fragment, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useShown } from "./use-in-view-class";

type BlurTextProps = {
  /** Text to reveal. Use "\n" to force a line break. */
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Seconds between words. */
  stagger?: number;
  delay?: number;
  /** Reveal on first paint instead of when scrolled into view. */
  immediate?: boolean;
  /** Words (exact match) rendered in the muted accent tone. */
  muted?: string[];
};

/**
 * Word-by-word reveal: each word rises 0.35em while its blur clears. The
 * animation is CSS (.blur-text in projects.css), so immediate headlines paint
 * before hydration. Screen readers get the full sentence once.
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
  const [ref, shown] = useShown<HTMLElement>(immediate);
  const lines = text.split("\n");
  let index = 0;

  return (
    <Tag
      ref={ref}
      id={id}
      className={`blur-text${shown ? " is-shown" : ""} ${className ?? ""}`}
    >
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
                  <span
                    className={`blur-word${isMuted ? " is-muted" : ""}`}
                    style={
                      { "--d": `${delay + i * stagger}s` } as CSSProperties
                    }
                  >
                    {word}
                  </span>
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
