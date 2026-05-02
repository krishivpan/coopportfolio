import { useEffect, useRef } from "react";


export default function CanvasScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const ctx = context;
    const bg = new Image();
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

    bg.src = "/src/images/background.png";
    character.src = "/src/images/character.png";

    let imagesLoaded = 0;
    let animationFrameId: number | null = null;

    const onLoad = () => {
      imagesLoaded++;
      if (imagesLoaded === 2) start();
    };

    bg.onload = onLoad;
    character.onload = onLoad;

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    function start() {
      function animate() {
        const { width, height } = canvasSize;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(bg, 0, 0, width, height);
        ctx.drawImage(character, 0, 0, width, height);

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