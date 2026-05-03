import HomePage from "./components/HomePage";
import CanvasScene from "./components/CanvasScene";
import ClickSpark from "./effects/ClickSpark";
import FadingPen from "./effects/FadingPen";

export default function App() {
  return (
    
    <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20} duration={400}>
      <FadingPen />
      <CanvasScene />
      <HomePage />
    </ClickSpark>
  );
}