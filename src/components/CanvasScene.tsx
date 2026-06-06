import { useEffect, useRef } from "react";

export default function CanvasScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const character = new Image();
    const canvasSize = { width: window.innerWidth, height: window.innerHeight };

    const resizeCanvas = () => {
      canvasSize.width  = window.innerWidth;
      canvasSize.height = window.innerHeight;
      canvas.width  = canvasSize.width;
      canvas.height = canvasSize.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    character.src = "/images/character.png";

    let animationFrameId: number | null = null;

    // Lens offsets measured at 1919×947 with character at natural size (scale=1)
    const BASE_VIEWPORT = 1919; // viewport width the measurements were taken on

    const lenses = [
      { ox: 233.5, oy: 299, rx: 11, ry: 7 },
      { ox: 297,   oy: 300, rx: 11, ry: 7 },
    ];
    const irisR  = 0;
    const pupilR = 5.8;

    function clampToEllipse(
      lensX: number, lensY: number,
      gazeX: number, gazeY: number,
      rx: number,    ry: number
    ) {
      const dx = mouseRef.current.x - gazeX;
      const dy = mouseRef.current.y - gazeY;
      const arx   = rx - irisR;
      const ary   = ry - irisR;
      const angle = Math.atan2(dy, dx);
      const dist  = Math.sqrt(dx * dx + dy * dy);
      const maxD  = Math.sqrt(arx * arx + ary * ary);
      const t     = Math.min(dist / maxD, 1);
      return { x: lensX + arx * Math.cos(angle) * t,
               y: lensY + ary * Math.sin(angle) * t };
    }

    function drawEye(x: number, y: number, s: number) {
      ctx.beginPath();
      ctx.arc(x, y, pupilR * s, 0, Math.PI * 2);
      ctx.fillStyle = "#0a0a0a";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x - 0.8 * s, y - s, 0.8 * s, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fill();
    }

    character.onload = () => {
      const natW = character.naturalWidth;
      const natH = character.naturalHeight;

      function animate() {
        const { width, height } = canvasSize;
        ctx.clearRect(0, 0, width, height);

        // Scale the character so it always occupies the same visual proportion
        const scale  = Math.min(1, width / BASE_VIEWPORT);
        const drawW  = natW * scale;
        const drawH  = natH * scale;
        const charX  = width  - drawW;
        const charY  = height - drawH + 9;

        ctx.drawImage(character, charX, charY, drawW, drawH);

        // Scale lens positions + radii with the character
        const scaledLenses = lenses.map(l => ({
          x:  charX + l.ox * scale,
          y:  charY + l.oy * scale,
          rx: l.rx * scale,
          ry: l.ry * scale,
        }));

        const gazeX = charX + ((lenses[0].ox + lenses[1].ox) / 2) * scale;
        const gazeY = charY + ((lenses[0].oy + lenses[1].oy) / 2) * scale;

        for (const l of scaledLenses) {
          const { x, y } = clampToEllipse(l.x, l.y, gazeX, gazeY, l.rx, l.ry);
          drawEye(x, y, scale);
        }

        animationFrameId = requestAnimationFrame(animate);
      }

      animate();
    };

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}