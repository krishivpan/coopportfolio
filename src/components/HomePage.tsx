import Highlighter from "../effects/Highlighter";

export default function HomePage() {
  return (
    <main className="main-content">
      <section className="introduction">
        <img className="name" src="/images/name.png" alt="krishiv handwritten" />
        <p>
          Computer Engineering @ YorkU
          <br />Toronto, Ontario, Canada
        </p>
      </section>
      <section className="about-me">
        <ul>
          <li><span className="li-text">working as a <Highlighter color="rgba(31, 81, 255, 0.5)">Software Research Assistant</Highlighter> in Summer 2026</span></li>
          <li><span className="li-text">recipient of the <Highlighter color="rgba(57, 255, 20, 0.5)">$120,000 Schulich Leader Scholarship</Highlighter></span></li>
          <li><span className="li-text">raised ~$1000 for cancer research</span></li>
          <li><span className="li-text">use JS/TS, Python, C/C++, Java, Swift</span></li>
          <li><span className="li-text">building a <Highlighter color="rgba(4, 217, 255, 0.5)">cinematic drone</Highlighter> from scratch to film my own documentary</span></li>
          <li><span className="li-text">Seeking Fall 2026 Opportunities</span></li>
        </ul>
      </section>
    </main>
  );
}