import MusicPlayer from "./MusicPlayer";

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><a href="#me">me</a></li>
                <li><a href="#projects">projects</a></li>
                <li><a href="#badminton">badminton</a></li>
                <li><a href="#strings">strings</a></li>
                <li><a href="#books">books</a></li>
            </ul>
            
            <MusicPlayer/>
        </nav>
    )
}