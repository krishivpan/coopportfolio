import Navbar from "./Navbar";
import Highlighter from "../effects/Highlighter";

export default function HomePage() {
    return (
        <>
        <Navbar />
        <main className="main-content">
            <section className="introduction">
                <img className="name" src="/src/images/name.png" alt="krishiv handwritten"/>
                <p>
                    Computer Engineering @ YorkU
                    <br/>Toronto, Ontario, Canada
                </p>
            </section>
            <section className="about-me">
                <ul>
                    <li>working as a <Highlighter color="rgba(31, 81, 255, 0.5)">Software Research Assistant</Highlighter> in Summer 2026</li>
                    <li>recipient of the <Highlighter color="rgba(57, 255, 20, 0.5)">$120,000 Schulich Leader Scholarship</Highlighter></li>
                    <li>raised <Highlighter color="rgba(137, 22, 172, 0.5)">~$1000 for cancer research</Highlighter></li>
                    <li>use JS/TS, Python, C/C++, Java, Swift</li>
                    <li>building a <Highlighter color="rgba(4, 217, 255, 0.5)">cinematic drone</Highlighter> from scratch to film my own documentary</li>
                    <li>trying new things until there isn't anything left</li>
                    <li>Looking for Fall 2026 Roles</li>
                </ul>
            </section>
        </main>
        </>
    );
}