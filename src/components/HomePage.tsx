import Navbar from "./Navbar";

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
                    <li>working as a Software Research Assistant in Summer 2026</li>
                    <li>recipient of the $120,000 Schulich Leader Scholarship</li>
                    <li>raised ~$1000 for cancer research</li>
                    <li>use JS/TS, Python, C/C++, Java, Swift</li>
                    <li>building a cinematic drone from scratch to film my own documentary</li>
                    <li>trying new things until there isn't anything left</li>
                </ul>
            </section>
        </main>
        </>
    );
}