"use client";

import Image from "next/image";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  X,
} from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import type { MediaAsset } from "@/lib/media";

export type DisplayAsset = MediaAsset & { src: string };

export function ProjectImage({
  asset,
  priority = false,
  className = "",
  sizes = "(min-width: 1200px) 1100px, 94vw",
}: {
  asset: DisplayAsset;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  if (unavailable)
    return (
      <div className="media-unavailable" role="status">
        Lamentablemente, esta imagen no está disponible.
      </div>
    );
  return (
    <Image
      src={failed ? asset.local : asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      preload={priority}
      fetchPriority={priority ? "high" : "auto"}
      className={className}
      onError={() =>
        failed || asset.src === asset.local
          ? setUnavailable(true)
          : setFailed(true)
      }
    />
  );
}

export function ProjectGallery({ images }: { images: DisplayAsset[] }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = images[index];
  if (!images.length) return null;
  const step = (direction: number) =>
    setIndex((value) => (value + direction + images.length) % images.length);
  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };
  return (
    <>
      <div className="case-gallery">
        {images.map((asset, i) => (
          <figure
            key={asset.id}
            className={`gallery-figure ${asset.height > asset.width ? "is-portrait" : ""}`}
          >
            <button
              type="button"
              className="gallery-trigger focus-ring"
              aria-label={`Ampliar: ${asset.title}`}
              onClick={() => {
                setIndex(i);
                dialog.current?.showModal();
              }}
            >
              <ProjectImage
                asset={asset}
                sizes="(min-width: 900px) 600px, 92vw"
              />
              <span className="expand-affordance" aria-hidden="true">
                <Maximize2 size={17} />
              </span>
            </button>
            <figcaption>
              {asset.title}
              <span>
                {asset.project === "glow-makeup"
                  ? "Interfaz conceptual"
                  : asset.project === "averyn"
                    ? "Landing del producto"
                    : asset.project === "norelo"
                      ? "Prototipo · Datos simulados"
                      : "Captura del proyecto"}
              </span>
            </figcaption>
            <p className="gallery-context">{asset.alt}</p>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="project-lightbox"
        aria-label="Galería ampliada"
        onKeyDown={onKeyDown}
        data-lenis-prevent
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="lightbox-inner">
          <div className="lightbox-toolbar">
            <p aria-live="polite">
              {current?.title}{" "}
              <span>
                {index + 1} / {images.length}
              </span>
            </p>
            <button
              type="button"
              className="icon-button focus-ring"
              aria-label="Cerrar galería"
              onClick={() => dialog.current?.close()}
            >
              <X size={22} />
            </button>
          </div>
          {current && (
            <ProjectImage
              key={current.id}
              asset={current}
              className="lightbox-image"
              sizes="96vw"
            />
          )}
          <div className="lightbox-controls">
            <button
              type="button"
              className="text-button focus-ring"
              disabled={images.length < 2}
              aria-label="Imagen anterior"
              onClick={() => step(-1)}
            >
              <ArrowLeft size={18} /> Anterior
            </button>
            {current && (
              <a
                className="icon-button focus-ring"
                href={current.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir imagen original en otra pestaña"
              >
                <ArrowDownToLine size={19} />
              </a>
            )}
            <button
              type="button"
              className="text-button focus-ring"
              disabled={images.length < 2}
              aria-label="Imagen siguiente"
              onClick={() => step(1)}
            >
              Siguiente <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
