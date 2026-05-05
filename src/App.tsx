import { useState } from "react";
import BackgroundVideo from "./components/BackgroundVideo";
import CanvasScene from "./components/CanvasScene";
import HomePage from "./components/HomePage";
import ClickSpark from "./effects/ClickSpark";
import FadingPen from "./effects/FadingPen";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const fadeStyle = (visible: boolean): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transition: "opacity 2.5s ease-in-out",
    position: "fixed",
    inset: 0,
    zIndex: 0,
    // Pointer events only on whichever layer is active
    pointerEvents: "none",
  });

  return (
    <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20} duration={400}>
      {/* Both layers always mounted — opacity drives the crossfade */}
      <FadingPen />
      <div style={fadeStyle(!isPlaying)}>
        <CanvasScene />
      </div>
      <div style={fadeStyle(isPlaying)}>
        <BackgroundVideo />
      </div>

      <HomePage onPlayingChange={setIsPlaying} />
    </ClickSpark>
  );
}