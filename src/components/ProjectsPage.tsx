interface Project {
  title: string;
  image: string;   // path to project screenshot or gif
  link?: string;
}

const projects: Project[] = [
  {
    title: "Project One",
    image: "/src/images/projects/project1.png",
    link: "https://github.com",
  },
  {
    title: "Project Two",
    image: "/src/images/projects/project2.gif",
    link: "https://github.com",
  },
  {
    title: "Project Three",
    image: "/src/images/projects/project3.png",
    link: "https://github.com",
  },
  // Add more projects here
];

export default function ProjectsContent() {
  return (
    <main className="main-content">
      <section className="projects-grid">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="sticky-note"
          >
            <div className="sticky-note-inner">
              <img
                src={project.image}
                alt={project.title}
                className="sticky-project-img"
              />
              <p className="sticky-title">{project.title}</p>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}