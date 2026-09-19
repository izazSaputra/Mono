import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";

const SelectedWorks = () => {
  return (
    <section
      id="selected-works"
      className="selected-works"
      aria-labelledby="selected-works-title"
    >
      <header className="selected-works-header">
        <p className="selected-works-label">SELECTED PROJECTS</p>

        <h2 id="selected-works-title" className="selected-works-title">
          SELECTED <span>WORKS.</span>
        </h2>

        <p className="selected-works-intro">
          A selection of websites and interfaces I helped bring to life.
        </p>
      </header>

      <div className="selected-works-list">
        {projects.map((project) => (
          <article className="project-card" key={project.id}>
            <div className="project-card-meta">
              <span className="project-card-number">
                {project.number}
              </span>

              <p className="project-card-category">
                {project.category}
              </p>
            </div>

            <h3 className="project-card-title">{project.title}</h3>

            <p className="project-card-role">{project.role}</p>

            <p className="project-card-description">
              {project.description}
            </p>

            <div className="project-card-links">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title} website (opens in a new tab)`}
              >
                <span>Visit website</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>

              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code (opens in a new tab)`}
                >
                  <span>Source code</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SelectedWorks;