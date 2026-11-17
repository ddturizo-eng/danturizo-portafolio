"use client";

import { Maximize2, Pause, Play } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/lib/motion";
import type { DisplayAsset } from "./project-media";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * Product recording presented like a live screen: it loads only when near the
 * viewport, plays muted in a loop while visible and pauses when it leaves.
 * With reduced motion it never autoplays; the visitor starts it.
 */
export function ProjectVideo({
  video,
  poster,
  label,
}: {
  video: DisplayAsset;
  poster: DisplayAsset | undefined;
  label: string;
}): ReactNode {
  const reduced = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const element = useRef<HTMLVideoElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const userPaused = useRef(false);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(video.duration ?? 0);
  const [source, setSource] = useState<"remote" | "local" | "none">("remote");
  const portrait = video.height > video.width;

  // Attach the source shortly before the frame scrolls in.
  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Play while at least half visible, unless the visitor paused it.
  useEffect(() => {
    const node = frame.current;
    const media = element.current;
    if (!node || !media || !near || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !userPaused.current) {
          media.play().catch(() => {});
        } else if (!entry?.isIntersecting) {
          media.pause();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [near, reduced, source]);

  const toggle = useCallback(() => {
    const media = element.current;
    if (!media) return;
    if (media.paused) {
      userPaused.current = false;
      media.play().catch(() => {});
    } else {
      userPaused.current = true;
      media.pause();
    }
  }, []);

  const seekTo = (ratio: number) => {
    const media = element.current;
    if (!media || !duration) return;
    media.currentTime = Math.min(Math.max(ratio, 0), 1) * duration;
    setTime(media.currentTime);
  };

  const onTrackPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (event.type === "pointermove" && event.buttons !== 1) return;
    const rect = track.current?.getBoundingClientRect();
    if (!rect) return;
    seekTo((event.clientX - rect.left) / rect.width);
  };

  const onTrackKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const step =
      event.key === "ArrowRight" ? 2 : event.key === "ArrowLeft" ? -2 : 0;
    if (!step || !duration) return;
    event.preventDefault();
    seekTo((time + step) / duration);
  };

  const fullscreen = () => {
    const media = element.current;
    if (!media) return;
    if (media.requestFullscreen) media.requestFullscreen().catch(() => {});
  };

  const src = source === "local" ? video.local : video.src;
  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <figure className={`screen ${portrait ? "screen--portrait" : ""}`}>
      <div className="screen-frame" ref={frame}>
        {!portrait && (
          <div className="screen-chrome" aria-hidden="true">
            <span />
            <span />
            <span />
            <p>{label}</p>
          </div>
        )}
        <div
          className="screen-surface"
          style={{ aspectRatio: `${video.width} / ${video.height}` }}
        >
          {source === "none" ? (
            <p className="media-unavailable" role="status">
              No se pudo cargar el video.{" "}
              <a className="focus-ring" href={video.local}>
                Abrir copia local
              </a>
            </p>
          ) : (
            <video
              ref={element}
              key={source}
              src={near ? src : undefined}
              poster={poster?.src}
              muted
              loop
              playsInline
              preload="none"
              aria-label={video.title}
              onClick={toggle}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
              onError={() =>
                setSource(
                  source === "remote" && video.src !== video.local
                    ? "local"
                    : "none"
                )
              }
            />
          )}
          {source !== "none" && (
            <div className={`screen-controls ${playing ? "is-playing" : ""}`}>
              <button
                type="button"
                className="screen-button focus-ring"
                onClick={toggle}
                aria-label={playing ? "Pausar video" : "Reproducir video"}
              >
                {playing ? (
                  <Pause size={16} fill="currentColor" aria-hidden="true" />
                ) : (
                  <Play size={16} fill="currentColor" aria-hidden="true" />
                )}
              </button>
              <div
                ref={track}
                className="screen-track focus-ring"
                role="slider"
                tabIndex={0}
                aria-label="Posición del video"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(time)}
                aria-valuetext={`${formatTime(time)} de ${formatTime(duration)}`}
                onPointerDown={onTrackPointer}
                onPointerMove={onTrackPointer}
                onKeyDown={onTrackKey}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
              <span className="screen-time">
                {formatTime(time)} / {formatTime(duration)}
              </span>
              <button
                type="button"
                className="screen-button focus-ring"
                onClick={fullscreen}
                aria-label="Ver en pantalla completa"
              >
                <Maximize2 size={15} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
      <figcaption>
        <span>{video.title}</span>
        <span>Grabación real · Sin audio</span>
      </figcaption>
      <p className="screen-description">{video.alt}</p>
    </figure>
  );
}
