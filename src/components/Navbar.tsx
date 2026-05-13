import { Link } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";

interface NavbarProps {
  onPlayingChange: (playing: boolean) => void;
}

export default function Navbar({ onPlayingChange }: NavbarProps) {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">me</Link></li>
        <li><Link to="/projects">projects</Link></li>
        {/* <li><a href="#badminton">badminton</a></li>
        <li><a href="#strings">strings</a></li>
        <li><a href="#books">books</a></li> */}
      </ul>

      <MusicPlayer onPlayingChange={onPlayingChange} />
    </nav>
  );
}