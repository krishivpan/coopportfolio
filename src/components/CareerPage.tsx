import CompetencyTags, { type CompetencyTag } from "./CompetencyTags";
import SiteFooter from "./SiteFooter";

const RESUME_URL = "/Krishiv_Resume_COOP.pdf";

interface Role {
  title: string;
  org: string;
  location?: string;
  dates: string;
  responsibilities: string[];
  skills: string[];
  result: string;
  tags: CompetencyTag[];
}

const experience: Role[] = [
  {
    title: "Optical Software Engineering Intern (Co-op)",
    org: "Nokia",
    location: "Ottawa, ON",
    dates: "Sept. 2026 – Present",
    responsibilities: [
      "Developing a real-time monitoring system using Python to visualize optical transceiver parameters and detect anomalies mid-test.",
      "Developing and running automated test scripts in Python & MATLAB to validate line card functionality across optical design verification (ODVT) and integration (OIT) testing.",
    ],
    skills: ["Python", "MATLAB", "Test automation", "Data visualization"],
    result: "Enables early termination of 3+ hour test runs instead of waiting for completion.",
    tags: [
      {
        competency: "Use of Engineering Tools",
        caption: "Writing automated Python and MATLAB test scripts to validate line cards across ODVT and OIT testing.",
      },
      {
        competency: "Problem Analysis",
        caption: "Detecting transceiver anomalies mid-test so a failing 3+ hour run can be stopped early instead of run to completion.",
      },
    ],
  },
  {
    title: "Software Engineering Researcher",
    org: "York University",
    location: "Toronto, ON",
    dates: "May 2026 – Present",
    responsibilities: [
      "Sole developer of a Code Execution Tracer using React, TypeScript, and Java that visualizes Abstract Data Types at runtime.",
      "Preparing research for publication and conference presentation alongside Dr. Sukhwant Sagar.",
    ],
    skills: ["React", "TypeScript", "Java", "Research"],
    result: "Adopted into York’s Data Structures and Algorithms curriculum and used for graded assignments in EECS 2101.",
    tags: [
      {
        competency: "Design",
        caption: "As sole developer, I designed and built the tracer end to end, from runtime instrumentation to the visualizations students use.",
      },
      {
        competency: "Communication Skills",
        caption: "The research is being prepared for publication and conference presentation alongside Dr. Sukhwant Sagar.",
      },
    ],
  },
  {
    title: "STEM Program Assistant",
    org: "University of Lethbridge (SHAD)",
    location: "Lethbridge, AB",
    dates: "June 2025 – Aug 2025",
    responsibilities: [
      "Delivered Arduino programming workshops to 53 students covering microcontrollers, software testing and hardware design to create Kinetic Art for improving green spaces within the University of Lethbridge campus.",
      "Collaborated with a 10-member instructional team to create and organize workshops.",
    ],
    skills: ["Arduino", "Microcontrollers", "Teaching", "Teamwork"],
    result: "Achieved a 99% satisfaction rate among students based on experience, workshops and lectures.",
    tags: [
      {
        competency: "Communication Skills",
        caption: "Taught microcontroller programming and hardware design to 53 students through hands-on workshops.",
      },
      {
        competency: "Individual and Teamwork",
        caption: "Planned and ran workshops with a 10-member instructional team, reaching a 99% student satisfaction rate.",
      },
    ],
  },
  {
    title: "Student Chair & Fundraiser Coordinator (Volunteer)",
    org: "Canadian Cancer Society",
    dates: "Feb 2022 – Oct 2023",
    responsibilities: [
      "Coordinated a fundraiser event for cancer research.",
      "Served as a standing student chair for our initiative.",
      "Continue to contribute towards funding cancer research and treatment.",
    ],
    skills: ["Event coordination", "Leadership", "Fundraising"],
    result: "Raised $500 in the first year.",
    tags: [
      {
        competency: "Impact on Society and the Environment",
        caption: "Coordinated fundraising that went directly towards cancer research and treatment.",
      },
      {
        competency: "Individual and Teamwork",
        caption: "As standing student chair, I led our initiative and organized the fundraiser event with fellow students.",
      },
    ],
  },
];

export default function CareerPage() {
  return (
    <main className="main-content">
      <h1 className="page-heading">Career</h1>

      <section className="page-section">
        <h2 className="section-heading">Education</h2>
        <ul className="timeline">
          <li className="timeline-item">
            <p className="timeline-dates">Expected graduation: April 2029</p>
            <h3 className="timeline-title">Bachelor of Computer Engineering</h3>
            <p className="timeline-org">York University · Toronto, ON</p>
            <ul className="timeline-points">
              <li>GPA: 3.8/4.0</li>
              <li>Recipient of the Schulich Leader Scholarship ($120,000), awarded nationally to top STEM students</li>
            </ul>
          </li>
          <li className="timeline-item">
            <p className="timeline-dates">Graduated 2024</p>
            <h3 className="timeline-title">High School Diploma</h3>
            <p className="timeline-org">Canterbury High School</p>
          </li>
        </ul>
      </section>

      <section className="page-section">
        <h2 className="section-heading">Experience</h2>
        <ul className="timeline">
          {experience.map(role => (
            <li key={role.title} className="timeline-item">
              <p className="timeline-dates">{role.dates}</p>
              <h3 className="timeline-title">{role.title}</h3>
              <p className="timeline-org">{role.org}{role.location && ` · ${role.location}`}</p>
              <ul className="timeline-points">
                {role.responsibilities.map(r => <li key={r}>{r}</li>)}
              </ul>
              <ul className="skill-chips" aria-label="Skills used">
                {role.skills.map(s => <li key={s}>{s}</li>)}
              </ul>
              <p className="timeline-result">
                <span className="timeline-result-label">result</span>
                {role.result}
              </p>
              <CompetencyTags tags={role.tags} />
            </li>
          ))}
        </ul>
      </section>

      <section className="page-section">
        <h2 className="section-heading">Resume</h2>
        <div className="resume-links">
          <a className="text-link" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            View my resume (PDF) ↗
          </a>
          <a className="text-link" href={RESUME_URL} download>
            Download ↓
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
