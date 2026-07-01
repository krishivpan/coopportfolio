import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo";
import CanvasScene from "./components/CanvasScene";
import Navbar from "./components/Navbar";
import PageTransition from "./effects/PageTransition";
import HomePage from "./components/HomePage";
import ProjectsPage from "./components/ProjectsPage";
import ClickSpark from "./effects/ClickSpark";
import FadingPen from "./effects/FadingPen";
import useWindowWidth from "./hooks/useWindowWidth";

const MOBILE_BREAKPOINT = 640;

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < MOBILE_BREAKPOINT;

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
        {!isMobile && <div style={fadeStyle(!isPlaying)}><CanvasScene /></div>}
        {!isMobile && <div style={fadeStyle(isPlaying)}><BackgroundVideo /></div>}
        <FadingPen />
        <Navbar onPlayingChange={setIsPlaying} />

        <PageTransition>
          <Routes>
            <Route path="/"         element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </PageTransition>

      </ClickSpark>
    </BrowserRouter>
  );
}