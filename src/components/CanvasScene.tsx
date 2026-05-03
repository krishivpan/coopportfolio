import { useEffect, useRef } from "react";


export default function CanvasScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const ctx = context;
    const character = new Image();

    const canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const resizeCanvas = () => {
      canvasSize.width = window.innerWidth;
      canvasSize.height = window.innerHeight;
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
    };

    resizeCanvas();

    character.src = "/src/images/character.png";

    let animationFrameId: number | null = null;

    character.onload = start;

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    function start() {
      function animate() {
        const { width, height } = canvasSize;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(character, width - 460, height - 350);

        animationFrameId = requestAnimationFrame(animate);
      }

      animate();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} />;
}