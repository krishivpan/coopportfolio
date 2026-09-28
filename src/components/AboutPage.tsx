import Highlighter from "../effects/Highlighter";

export default function AboutPage() {
  return (
    <main className="main-content">
      <section className="introduction">
        <img className="name" src="/images/name.png" alt="krishiv handwritten" />
        <p>
          Computer Engineering @ YorkU
          <br />Toronto, Ontario, Canada
        </p>
        <p className="eportfolio-note">
          This ePortfolio documents my preparation for, and progress through,
          my co-op term, including my goals, my background, and the
          reflections I write along the way.
        </p>
      </section>

      <section className="about-me">
        <h2 className="page-heading">About Me</h2>
        <ul>
          <li><span className="li-text">Currently working as a <Highlighter color="rgba(31, 81, 255, 0.5)">Software Research Assistant</Highlighter>, starting Summer 2026</span></li>
          <li><span className="li-text">Raised approximately $1,000 in donations for cancer research</span></li>
          <li><span className="li-text">Proficient in <Highlighter color="rgba(4, 217, 255, 0.5)">JavaScript/TypeScript, Python, C/C++, Java, and Swift</Highlighter></span></li>
          <li><span className="li-text">Designing and building a cinematic drone from scratch to film an original documentary</span></li>
          <li><span className="li-text">Actively seeking Fall 2027 co-op and internship opportunities</span></li>
        </ul>
      </section>
    </main>
  );
}
