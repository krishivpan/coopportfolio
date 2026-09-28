import { useState } from "react";
import { Link } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";
import useIsMobile from "../hooks/useIsMobile";

interface NavbarProps {
  onPlayingChange: (playing: boolean) => void;
}

export default function Navbar({ onPlayingChange }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
        <span className="nav-drawer-label">menu</span>
        <ul className="nav-links">
          <li><Link to="/"          onClick={closeMenu}>about</Link></li>
          <li><Link to="/projects"  onClick={closeMenu}>projects</Link></li>
          <li><Link to="/career"    onClick={closeMenu}>career</Link></li>
          <li><Link to="/goals"     onClick={closeMenu}>goals</Link></li>
          <li><Link to="/portfolio" onClick={closeMenu}>portfolio</Link></li>
        </ul>
        {!isMobile && <MusicPlayer onPlayingChange={onPlayingChange} />}
      </nav>

      {/* ── Backdrop (mobile only) ── */}
      {menuOpen && (
        <div className="nav-backdrop" onClick={closeMenu} />
      )}
    </>
  );
}