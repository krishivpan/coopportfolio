import HomePage from "./components/HomePage";
import CanvasScene from "./components/CanvasScene";
import ClickSpark from "./components/ClickSpark";
import FadingPen from "./components/FadingPen";

export default function App() {
  return (
    
    <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20} duration={400}>
      <FadingPen />
      <CanvasScene />
      <HomePage />
    </ClickSpark>
  );
}