import { ContactCard } from "@/components/contact/contact-card";
import { BlurText } from "@/components/motion/blur-text";
import { Rise } from "@/components/motion/reveal";
import {
  ProjectIndex,
  type IndexItem,
} from "@/components/projects/project-index";
import { assetUrl, projectCover } from "@/lib/media";
import { createMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";

export const metadata = createMetadata({
  title: "Proyectos",
  description:
    "Siete proyectos de Daniel Turizo: identidad digital, biometría, herramientas para desarrolladores y experiencias web. Explora el producto y la ingeniería detrás.",
  path: "/projects",
});

export default function ProjectsPage() {
  const items: IndexItem[] = projects.map((project) => {
    const cover = projectCover(project.slug);
    return {
      id: project.id,
      slug: project.slug,
      title: project.title,
      category: project.category,
      status: project.status,
      year: project.year,
      summary: project.summary,
      theme: project.theme,
      cover: {
        src: assetUrl(cover),
        alt: cover.alt,
        width: cover.width,
        height: cover.height,
      },
    };
  });

  return (
    <main id="main-content" className="projects-page">
      <header className="projects-hero">
        <p className="eyebrow">Proyectos · {projects.length}</p>
        <BlurText
          as="h1"
          className="display-xl"
          text={"El código es sólo\nuna parte de la historia."}
          muted={["una", "parte", "de", "la", "historia"]}
          immediate
        />
        <Rise className="projects-hero-aside" delay={0.5}>
          <p>
            Entender un problema, diseñar la solución y construir lo que sigue.
            Cada proyecto muestra el producto y las decisiones detrás de él.
          </p>
        </Rise>
      </header>
      <section aria-label="Índice de proyectos" className="projects-index-wrap">
        <ProjectIndex items={items} />
      </section>
      <ContactCard animated={false} />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
