import { useRef } from "react";
import CompetencyTags, { type CompetencyTag } from "./CompetencyTags";
import SiteFooter from "./SiteFooter";

interface Project {
  title: string;
  image: string;
  video?: string;  // optional ~5mb demo clip
  link?: string;
  tags?: CompetencyTag[];
}

const projects: Project[] = [
  {
    title: "Violina",
    image: "/images/violina-img.png",
    video: "/videos/violina-demo.mp4",
    link: "https://github.com/hans-hc/Violina",
    tags: [
      {
        competency: "Problem Analysis",
        caption: "Broke posture down into joint angles computed from live webcam data, detecting incorrect posture with 86% accuracy.",
      },
      {
        competency: "Use of Engineering Tools",
        caption: "Used MediaPipe, Python and React to keep frame processing real-time, with no dropped frames during long sessions.",
      },
    ],
  },
  {
    title: "Air Mouse",
    image: "/images/AirMouseLogo.png",
    video: "/videos/Air-Mouse-Demo.mp4",
    link: "https://github.com/krishivpan/Air-Mouse",
    tags: [
      {
        competency: "Design",
        caption: "Designed gesture-to-action dispatch, vector normalization and debounce algorithms that improved gesture stability by 40%.",
      },
      {
        competency: "Use of Engineering Tools",
        caption: "Built with Swift, watchOS and WatchConnectivity, processing accelerometer data at 50 Hz with under 35 ms latency.",
      },
    ],
  },
  {
    title: "Order Flow",
    image: "/images/orderflow-img.png",
    video: "/videos/OrderFlow-Demo.mp4",
    link: "https://github.com/billnhatnguyen/orderFlow",
    tags: [
      {
        competency: "Problem Analysis",
        caption: "Turned real-time phone speech into structured order data, cutting manual input time by over 60% in testing.",
      },
      {
        competency: "Design",
        caption: "Designed a modular full-stack architecture with a REST API pipeline to handle concurrent order requests.",
      },
    ],
  },
  {
    title: "Aim Corner",
    image: "/images/aim-corner-img.png",
    video: "/videos/Aim-Corner-Demo.mp4",
    link: "https://github.com/krishivpan/AimCorner",
    tags: [
      {
        competency: "Design",
        caption: "Designed an aim trainer for FPS games that trains reaction time and speed.",
      },
      {
        competency: "Use of Engineering Tools",
        caption: "Developed in Unity and C#, with fluid movement, high-quality textures and robust functionality.",
      },
    ],
  },
  {
    title: "SanjAI",
    image: "/images/sanjai-img.png",
    video: "/videos/SanjAI-Demo.mp4",
    link: "https://github.com/krishivpan/SanjAI",
    tags: [
      {
        competency: "Use of Engineering Tools",
        caption: "Built with Flask and OpenAI’s GPT-3.5-turbo model to provide tutoring through a chatbot.",
      },
      {
        competency: "Design",
        caption: "Designed features beyond the chatbot: registration and login, a to-do list, and a quiz generator based on user queries.",
      },
    ],
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
          <div key={project.title} className="project-item">
            <StickyCard project={project} />
            {project.tags && <CompetencyTags tags={project.tags} />}
          </div>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}