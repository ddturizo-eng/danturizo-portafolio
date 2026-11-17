import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects, type Project } from "@/lib/projects";
import { assetUrl, projectCover } from "@/lib/media";
import { ProjectImage } from "@/components/projects/project-media";

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps) {
  const items = viewMoreVisible ? projects.slice(0, 4) : projects;
  return (
    <section
      className="projects-collection"
      aria-label="Selección de proyectos"
    >
      {withHeadline && (
        <div className="collection-intro">
          <h2>
            Ideas que toman
            <br />
            <em>forma de producto.</em>
          </h2>
          <div>
            <p>
              Identidad digital, herramientas de desarrollo y experiencias web.
              Una selección de lo que construyo.
            </p>
            <Link className="text-link focus-ring" href="/projects">
              Explorar los proyectos <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      )}
      <div className="projects-editorial">
        {items.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            priority={index === 0 && !viewMoreVisible}
          />
        ))}
      </div>
      {viewMoreVisible && (
        <div className="collection-footer">
          <p>Cada proyecto, un problema diferente.</p>
          <Link href="/projects" className="text-link focus-ring">
            Ver los siete proyectos <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </section>
  );
}

function ProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const cover = projectCover(project.slug);
  return (
    <article className={`work work--${project.layout} work--${project.theme}`}>
      <Link
        href={`/projects/${project.slug}`}
        prefetch={false}
        className="work-link focus-ring"
        aria-labelledby={`project-title-${project.id}`}
      >
        <div className="work-art">
          {project.layout === "terminal" && (
            <div className="terminal-intro">
              <span className="terminal-prompt" aria-hidden="true">
                &gt;_
              </span>
              <h3>
                El trabajo detrás
                <br />
                del trabajo.
              </h3>
              <p>
                Especificaciones, agentes
                <br />y decisiones de ingeniería.
              </p>
            </div>
          )}
          <div className="work-screen">
            <ProjectImage
              asset={{ ...cover, src: assetUrl(cover) }}
              priority={priority}
              sizes={
                project.layout === "lead" || project.layout === "terminal"
                  ? "(min-width: 1200px) 1000px, 90vw"
                  : "(min-width: 900px) 650px, 90vw"
              }
            />
          </div>
          <span className="work-open" aria-hidden="true">
            <ArrowUpRight size={22} />
          </span>
        </div>
        <div className="work-caption">
          <div>
            <div className="work-name">
              <h3 id={`project-title-${project.id}`}>{project.title}</h3>
              <span>{project.status}</span>
            </div>
            <p>{project.summary}</p>
          </div>
          <span className="work-category">
            {project.category}
            <span className="work-technologies">
              {project.technologies.slice(0, 3).join(" / ")}
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
