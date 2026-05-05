interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

const projects: Project[] = [
  {
    title: "ProjectName",
    description: "",
    tags: ["TypeScript", "React"],
    link: "https://github.com",
  },
];

export default function ProjectsPage() {
  return (
    <main className="main-content">
      <section className="projects-grid">
        {projects.map((project) => (
          <div key={project.title} className="project-card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                view →
              </a>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}