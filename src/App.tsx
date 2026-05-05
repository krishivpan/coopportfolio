import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo";
import CanvasScene from "./components/CanvasScene";
import Navbar from "./components/Navbar";
import HomeContent from "./components/HomePage";
import ProjectsContent from "./components/ProjectsPage";
import ClickSpark from "./effects/ClickSpark";
import FadingPen from "./effects/FadingPen";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const fadeStyle = (visible: boolean): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transition: "opacity 1.5s ease-in-out",
    position: "fixed",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
  });

  return (
    <BrowserRouter>
      <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20} duration={400}>
        <FadingPen />
        {/* ── Always-mounted backgrounds ── */}
        <div style={fadeStyle(!isPlaying)}>
          <CanvasScene />
        </div>
        <div style={fadeStyle(isPlaying)}>
          <BackgroundVideo />
        </div>

        <Navbar onPlayingChange={setIsPlaying} />

        {/* ── Only the page content swaps ── */}
        <Routes>
          <Route path="/"         element={<HomeContent />} />
          <Route path="/projects" element={<ProjectsContent />} />
        </Routes>

      </ClickSpark>
    </BrowserRouter>
  );
}