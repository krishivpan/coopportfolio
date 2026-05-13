import { useState } from "react";
import { Link } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";

interface NavbarProps {
  onPlayingChange: (playing: boolean) => void;
}

export default function Navbar({ onPlayingChange }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Mobile top bar ── */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-icon ${menuOpen ? "open" : ""}`} />
      </button>

      {/* ── Nav panel (sidebar on desktop, dropdown on mobile) ── */}
      <nav className={`navbar ${menuOpen ? "navbar--open" : ""}`}>
        <ul className="nav-links">
          <li><Link to="/"         onClick={closeMenu}>me</Link></li>
          <li><Link to="/projects" onClick={closeMenu}>projects</Link></li>
          {/* <li><a href="#badminton" onClick={closeMenu}>badminton</a></li>
          <li><a href="#strings"   onClick={closeMenu}>strings</a></li>
          <li><a href="#books"     onClick={closeMenu}>books</a></li> */}
        </ul>
        <MusicPlayer onPlayingChange={onPlayingChange} />
      </nav>

      {/* ── Backdrop (mobile only) ── */}
      {menuOpen && (
        <div className="nav-backdrop" onClick={closeMenu} />
      )}
    </>
  );
}