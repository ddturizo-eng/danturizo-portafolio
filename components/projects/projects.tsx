import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Database,
  Fingerprint,
  Globe,
  HeartPulse,
  Package,
  ScanFace,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";
import { projects as PROJECTS, type Project } from "@/lib/content";

const ICONS: Record<Project["icon"], ComponentType<{ className?: string }>> = {
  "scan-face": ScanFace,
  fingerprint: Fingerprint,
  "heart-pulse": HeartPulse,
  package: Package,
  globe: Globe,
  bot: Bot,
  database: Database,
};

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              Proyectos
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Plataformas, servicios y productos que he diseñado y
              construido.
            </p>
          </FadeIn>
        ) : null}

        <div className="columns-1 gap-6 md:columns-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              Ver todos los proyectos
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = ICONS[project.icon];
  return (
    <FadeIn
      delay={Math.min(index * 0.06, 0.3)}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article className="project-card flex flex-col gap-4 rounded-3xl border border-foreground/8 bg-background p-3 sm:p-3.5">
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-foreground/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-background">
            <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.label}
          </span>
        </header>

        {project.image ? (
          <div
            className="project-card__image ring-foreground/5 relative w-full overflow-hidden rounded-2xl bg-foreground/5 ring-1"
            style={{ aspectRatio: project.imageRatio ?? 16 / 10 }}
          >
            <div className="project-card__image-inner">
              <Image
                src={project.image}
                alt={`Captura de ${project.label}`}
                fill
                sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
                priority={index < 2}
              />
            </div>
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="ring-foreground/5 relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-2xl bg-foreground/[0.03] ring-1"
          >
            <Icon className="h-12 w-12 text-foreground/15" />
          </div>
        )}

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.title}
          </h3>
          <p className="text-[14px] leading-normal tracking-tight text-foreground/65 sm:text-[15px]">
            {project.description}
          </p>
          <ul className="mt-1 flex flex-wrap gap-1.5" aria-label="Tecnologías">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-foreground/8 px-2.5 py-0.5 text-[12px] tracking-tight text-foreground/70"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 px-1 pb-2">
          <p className="text-[12px] tracking-tight text-foreground/50">
            {project.meta}
          </p>
          {project.links?.length ? (
            <div className="flex gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring group inline-flex items-center gap-1 rounded text-[13px] font-medium tracking-tight text-foreground/80 hover:text-foreground"
                >
                  {link.label}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          ) : null}
        </footer>
      </article>
    </FadeIn>
  );
}
