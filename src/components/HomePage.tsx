import Navbar from "./Navbar";

export default function HomePage() {
    return (
        <>
        <Navbar />
        <main className="main-content">
            <section className="introduction">
                <h1>Krishiv Panchal</h1>
                <p>
                    Computer Engineering @ YorkU
                    <br/>Toronto, Ontario, Canada
                </p>
                </section>
                <section className="about-me">
                    <p>
                        <br/>working as a Software Research Assistant in Summer 2026
                        <br/>recipient of the $120,000 Schulich Leader Scholarship
                        <br/>raised ~$1000 for cancer research
                        <br/>use JS/TS, Python, C/C++, Java, Swift
                        <br/>building a cinematic drone from scratch to film my own documentary
                        <br/>trying new things until there isn't anything left
                    </p>
                </section>
        </main>
        </>
    );
}