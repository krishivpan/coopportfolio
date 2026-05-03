import HomePage from "./components/HomePage";
import CanvasScene from "./components/CanvasScene";
import ClickSpark from "./components/ClickSpark";

export default function App() {
  return (
    <ClickSpark sparkColor="#fff" sparkCount={8} sparkRadius={20} duration={400}>
      <CanvasScene />
      <HomePage />
    </ClickSpark>
  );
}