import { Link } from "react-router-dom";
import Highlighter from "../effects/Highlighter";
import CompetencyTags from "./CompetencyTags";
import SiteFooter from "./SiteFooter";
import VideoFrame from "./VideoFrame";

export default function AboutPage() {
  return (
    <main className="main-content">
      <section className="introduction">
        <div className="intro-text">
          <img className="name" src="/images/name.png" alt="krishiv handwritten" />
          <p>
            Computer Engineering @ YorkU
            <br />Expected graduation: April 2029
            <br />Toronto, Ontario, Canada
          </p>
          <p className="eportfolio-note">
            This ePortfolio documents my preparation for, and progress through,
            my co-op term, including my goals, my background, and the
            reflections I write along the way.
          </p>
          <div className="resume-links">
            <a className="text-link" href="/Krishiv_Resume_COOP.pdf" target="_blank" rel="noopener noreferrer">
              View my resume ↗
            </a>
            <Link className="text-link" to="/career">
              See my experience →
            </Link>
          </div>
        </div>
        <figure className="polaroid photo-frame">
          <img src="/images/krishiv.jpg" alt="Krishiv Panchal" />
        </figure>
      </section>

      <section className="about-me">
        <h2 className="page-heading">About Me</h2>
        <div className="bio">
          <p>
            My name is Krishiv Panchal; it is a combination of the names of two Hindu gods,
            and while it’s a lot of pressure to live up to the name, I always remind myself
            what they stand for: righteousness and transformation. I study Computer
            Engineering at York University, and I have a background in software development.
            In my free time, I like to get away from the screen and go hiking because I
            believe physical activity strengthens the mind and body, helping me focus better
            on my work.
          </p>
          <p>
            When I create personal projects, I like to solve the problems of others to make
            their lives easier. For example, during a lecture, my professor mentioned he
            didn’t like holding a clicker in his hand while presenting. That weekend, I built
            an Apple Watch app that detects hand gestures, letting you control your computer
            and present without holding anything.
          </p>
          <p>
            I was born in Ahmedabad, India and grew up in Winnipeg, Manitoba. As
            first-generation immigrants, we found community with people who shared the same
            path. After witnessing the scale of the sacrifices my parents made in their early
            adulthood to provide a better life for me, I grew more and more ambitious with my
            goals and got closer to my purpose; I discovered I wanted to make a positive
            impact through technology.
          </p>
          <p>
            I chose to study Computer Engineering at York University due to its focus on
            hands-on learning. As a child, I loved playing video games, but one day my
            controller broke, and instead of buying a new one, I decided to fix it myself by
            taking it apart. I was introduced to complex electrical components, which inspired
            me to explore computer engineering as a career.
          </p>
          <p>
            My favourite teacher was Mr. Burke; he taught Grade 12 calculus, and he was very
            strict. Even though he was strict, I admired his dedication to helping students
            succeed. The constant tests challenged me, but they taught me that consistency is the
            key to success in every aspect of life.
          </p>
          <p>
            As someone who frequently had to create opportunities for myself in the tech
            field, when I had the chance to attend the largest hackathon in the Americas, I
            was beyond grateful. From humanoid robots to self-driving cars, San Francisco
            showed me what was possible and how to turn ideas into reality.
          </p>
        </div>

        <a
          className="text-link"
          href="https://www.linkedin.com/in/krishiv-panchal/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect with me on LinkedIn ↗
        </a>

        <ul>
          <li><span className="li-text">Currently an <Highlighter color="rgba(31, 81, 255, 0.5)">Optical Software Engineering Intern at Nokia</Highlighter> in Ottawa (co-op, since September 2026)</span></li>
          <li><span className="li-text">Raised approximately $1,000 in donations for cancer research</span></li>
          <li><span className="li-text">Proficient in <Highlighter color="rgba(4, 217, 255, 0.5)">JavaScript/TypeScript, Python, C/C++, Java, and Swift</Highlighter></span></li>
          <li><span className="li-text">Designing and building a cinematic drone from scratch to film an original documentary</span></li>
          <li><span className="li-text">Actively seeking Fall 2027 co-op and internship opportunities</span></li>
        </ul>
      </section>

      <section className="career-goals">
        <h2 className="page-heading">Career Goals</h2>
        <p className="lede">
          I’ve always wanted to create impact through my work, whether it makes a difference
          or makes people think differently. I specifically chose Computer Engineering for
          this reason. I’ve grown up around technology and have used it to automate my
          day-to-day workflow, which has helped me in my daily life; however, I am looking to
          create projects that benefit communities.
        </p>
      </section>

      <section className="why-me">
        <h2 className="page-heading">Why Me</h2>
        <VideoFrame youtubeId="cjyeLaT7rhQ" title="Krishiv Panchal: Why Me video" caption="why me?" />
        <CompetencyTags
          tags={[
            {
              competency: "Communication Skills",
              caption: "A video pitch where I explain, on camera and in my own words, what I would bring to a co-op team.",
            },
          ]}
        />
      </section>

      <SiteFooter />
    </main>
  );
}
