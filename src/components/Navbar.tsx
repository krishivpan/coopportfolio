import MusicPlayer from "./MusicPlayer";

interface NavbarProps {
  onPlayingChange: (playing: boolean) => void;
}

export default function Navbar({ onPlayingChange }: NavbarProps) {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#me">me</a></li>
        <li><a href="#projects">projects</a></li>
        <li><a href="#badminton">badminton</a></li>
        <li><a href="#strings">strings</a></li>
        <li><a href="#books">books</a></li>
      </ul>
      <MusicPlayer onPlayingChange={onPlayingChange} />
    </nav>
  );
}