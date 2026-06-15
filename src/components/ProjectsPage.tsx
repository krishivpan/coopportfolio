import { useRef } from "react";

interface Project {
  title: string;
  image: string;
  video?: string;  // optional ~5mb demo clip
  link?: string;
}

const projects: Project[] = [
  {
    title: "Violina",
    image: "/images/violina-img.png",
    video: "/videos/violina-demo.mp4",
    link: "https://github.com/hans-hc/Violina",
  },
  {
    title: "Air Mouse",
    image: "/images/AirMouseLogo.png",
    video: "/videos/Air-Mouse-Demo.mp4",
    link: "https://github.com/krishivpan/Air-Mouse",
  },
  {
    title: "Order Flow",
    image: "/images/orderflow-img.png",
    video: "/videos/OrderFlow-Demo.mp4",
    link: "https://github.com/billnhatnguyen/orderFlow",
  },
  {
    title: "Aim Corner",
    image: "/images/aim-corner-img.png",
    video: "/videos/Aim-Corner-Demo.mp4",
    link: "https://github.com/krishivpan/AimCorner",
  },
  {
    title: "SanjAI",
    image: "/images/sanjai-img.png",
    video: "/videos/SanjAI-Demo.mp4",
    link: "https://github.com/krishivpan/SanjAI",
  },
];

function StickyCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="sticky-note"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="sticky-note-inner">
        <div className="sticky-media">
          {/* Image — always rendered, hidden when video is playing */}
          <img
            src={project.image}
            alt={project.title}
            className={`sticky-project-img ${project.video ? "has-video" : ""}`}
          />

          {/* Video — only rendered if provided, fades in on hover */}
          {project.video && (
            <video
              ref={videoRef}
              src={project.video}
              className="sticky-project-video"
              muted
              playsInline
              loop
              preload="none"
            />
          )}
        </div>

        <p className="sticky-title">{project.title}</p>
      </div>
    </a>
  );
}

export default function ProjectsPage() {
  return (
    <main className="main-content">
      <section className="projects-grid">
        {projects.map((project) => (
          <StickyCard key={project.title} project={project} />
        ))}
      </section>
    </main>
  );
}