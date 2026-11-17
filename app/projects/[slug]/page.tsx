import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { findProject, projects } from "@/lib/projects";
import { assetUrl, projectAssets, projectCover } from "@/lib/media";
import { createMetadata } from "@/lib/metadata";
import { contact } from "@/lib/content";
import {
  ProjectGallery,
  ProjectImage,
} from "@/components/projects/project-media";
import { ProjectVideo } from "@/components/projects/project-video";
import { CaseCover } from "@/components/projects/case-cover";
import { BlurText } from "@/components/motion/blur-text";
import { RevealMedia, Rise } from "@/components/motion/reveal";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = findProject((await params).slug);
  if (!project) return {};
  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: assetUrl(projectCover(project.slug)),
  });
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = findProject((await params).slug);
  if (!project) notFound();
  const position = projects.indexOf(project);
  const cover = projectCover(project.slug);
  const media = projectAssets(project.slug).map((asset) => ({
    ...asset,
    src: assetUrl(asset),
  }));
  const images = media.filter(
    (asset) => asset.type === "image" && asset.role === "gallery"
  );
  const gallery = images.length
    ? images
    : media.filter((asset) => asset.type === "image");
  const videos = media.filter((asset) => asset.type === "video");
  const next = projects[(position + 1) % projects.length]!;
  const nextCover = projectCover(next.slug);

  const facts = [
    project.role && { label: "Rol", value: project.role },
    { label: "Estado", value: project.status },
    project.year && { label: "Año", value: project.year },
    { label: "Stack", value: project.technologies.join(", ") },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <main id="main-content" className={`case-page work--${project.theme}`}>
      <header className="case-hero">
        <div className="case-hero-top">
          <Link className="back-link focus-ring" href="/projects">
            <ArrowLeft size={16} aria-hidden="true" /> Proyectos
          </Link>
          <p className="eyebrow">
            {pad(position + 1)} / {pad(projects.length)} · {project.category}
          </p>
        </div>
        <BlurText
          as="h1"
          className="display-xxl"
          text={project.title}
          immediate
          stagger={0.06}
        />
        <div className="case-hero-bottom">
          <BlurText
            as="p"
            className="case-lede"
            text={project.headline}
            immediate
            delay={0.25}
            stagger={0.03}
          />
          <Rise delay={0.45}>
            <dl className="case-facts">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Rise>
        </div>
      </header>

      <RevealMedia className="case-cover">
        <CaseCover>
          <div className="case-cover-stage">
            <ProjectImage
              asset={{ ...cover, src: assetUrl(cover) }}
              priority
              sizes="(min-width: 1400px) 1200px, 92vw"
            />
          </div>
        </CaseCover>
      </RevealMedia>

      <section className="case-intro" aria-labelledby="intro-heading">
        <h2 id="intro-heading" className="eyebrow">
          El proyecto
        </h2>
        <BlurText
          as="p"
          className="case-intro-text"
          text={project.introduction}
          stagger={0.012}
        />
      </section>

      <section className="case-chapters" aria-label="Reto y enfoque">
        <Rise className="case-chapter">
          <span className="chapter-number">01</span>
          <h2>El reto</h2>
          <p>{project.problem}</p>
        </Rise>
        <Rise className="case-chapter" delay={0.1}>
          <span className="chapter-number">02</span>
          <h2>El enfoque</h2>
          <p>{project.solution}</p>
        </Rise>
      </section>

      {videos.map((video) => (
        <section
          className="case-screen"
          aria-label={video.title}
          key={video.id}
        >
          <RevealMedia>
            <ProjectVideo
              video={video}
              poster={media.find((asset) => asset.id === video.posterId)}
              label={`${project.title.toLowerCase().replace(/\s+/g, "")}.app`}
            />
          </RevealMedia>
        </section>
      ))}

      <section
        className="case-capabilities"
        aria-labelledby="capabilities-heading"
      >
        <div className="case-section-head">
          <p className="eyebrow">Capacidades</p>
          <BlurText
            as="h2"
            id="capabilities-heading"
            className="display-md"
            text="Lo que toma forma."
          />
        </div>
        <ol className="capability-list">
          {project.capabilities.map((item, i) => (
            <li key={item.title}>
              <Rise className="capability-item" delay={i * 0.06}>
                <span className="chapter-number">{pad(i + 1)}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Rise>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="case-gallery-section"
        aria-labelledby="gallery-heading"
      >
        <div className="case-section-head">
          <p className="eyebrow">Galería · {gallery.length}</p>
          <BlurText
            as="h2"
            id="gallery-heading"
            className="display-md"
            text="El producto, de cerca."
          />
        </div>
        <ProjectGallery images={gallery} />
      </section>

      <section className="case-decisions" aria-labelledby="decisions-heading">
        <div className="case-section-head">
          <p className="eyebrow">Ingeniería</p>
          <BlurText
            as="h2"
            id="decisions-heading"
            className="display-md"
            text="Decisiones detrás de la interfaz."
          />
        </div>
        <div className="decision-grid">
          {project.decisions.map((item, i) => (
            <Rise className="decision-card" key={item.title} delay={i * 0.08}>
              <span className="chapter-number">D{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Rise>
          ))}
        </div>
      </section>

      <section className="case-outcome" aria-labelledby="outcome-heading">
        <span className="chapter-number">03</span>
        <h2 id="outcome-heading">Dónde está hoy</h2>
        <BlurText
          as="p"
          className="case-takeaway"
          text={project.takeaway}
          stagger={0.02}
        />
        <p className="case-scope">{project.scope}</p>
        {project.links.length > 0 && (
          <div className="case-links">
            {project.links.map((link) => (
              <a
                className="pill-link focus-ring"
                key={link.href}
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </section>

      <section className="case-contact">
        <BlurText
          as="h2"
          className="display-lg"
          text={"¿Tu proyecto empieza\ncon un reto parecido?"}
          muted={["con", "un", "reto", "parecido?"]}
        />
        <a
          href={`mailto:${contact.email}`}
          className="pill-link pill-link--solid focus-ring"
        >
          Hablemos de la idea <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </section>

      <Link
        className={`case-next work--${next.theme} focus-ring`}
        href={`/projects/${next.slug}`}
      >
        <span className="eyebrow">Siguiente proyecto</span>
        <span className="case-next-title">
          {next.title}
          <ArrowUpRight size={48} strokeWidth={1.25} aria-hidden="true" />
        </span>
        <span className="case-next-summary">{next.summary}</span>
        <span className="case-next-media">
          <ProjectImage
            asset={{ ...nextCover, src: assetUrl(nextCover) }}
            sizes="(min-width: 900px) 560px, 80vw"
          />
        </span>
      </Link>
    </main>
  );
}
