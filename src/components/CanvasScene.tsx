import { useEffect, useRef } from "react";

export default function CanvasScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Track mouse globally
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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
    window.addEventListener("resize", resizeCanvas);

    character.src = "/src/images/character.png";

    let animationFrameId: number | null = null;

    character.onload = start;

    // Lens centers as offsets from the character's draw origin (width - 460, height - 350).
    // Measured on a 1919×947 screen where the character sits at (1459, 597).
    // Left lens:  center ≈ (1690.5, 896)  → offset (231.5, 299)
    // Right lens: center ≈ (1756,   897)  → offset (297,   300)
    const lenses = [
      { ox: 233.5, oy: 299, rx: 11, ry: 7 }, // left glass
      { ox: 297,   oy: 300, rx: 11, ry: 7 }, // right glass
    ];

    // Radius of the iris we draw (must be < lens rx/ry)
    const irisR = 0;
    const pupilR = 5.8;

    // Midpoint between both lenses — shared gaze origin so both eyes always
    // look in the same direction and never go cross-eyed.
    const gazeOx = (lenses[0].ox + lenses[1].ox) / 2; // 264.25
    const gazeOy = (lenses[0].oy + lenses[1].oy) / 2; // 299.5

    /**
     * Clamp the eye center to stay fully inside the ellipse lens.
     * The angle is derived from the shared gaze origin (midpoint between lenses)
     * so both pupils always rotate together in the same direction.
     */
    function clampToEllipse(
      lensX: number,
      lensY: number,
      gazeOriginX: number,
      gazeOriginY: number,
      rx: number,
      ry: number
    ): { x: number; y: number } {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dx = mx - gazeOriginX;
      const dy = my - gazeOriginY;

      const arx = rx - irisR;
      const ary = ry - irisR;

      const angle = Math.atan2(dy, dx);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.sqrt(arx * arx + ary * ary);
      const t = Math.min(dist / maxDist, 1);

      return {
        x: lensX + arx * Math.cos(angle) * t,
        y: lensY + ary * Math.sin(angle) * t,
      };
    }

    function drawEye(eyeX: number, eyeY: number) {
      // White sclera
      ctx.beginPath();
      ctx.ellipse(eyeX, eyeY, irisR, irisR, 0, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();

      // Coloured iris
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, irisR * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = "#3a2a1a";
      ctx.fill();

      // Pupil
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, pupilR, 0, Math.PI * 2);
      ctx.fillStyle = "#0a0a0a";
      ctx.fill();

      // Small specular highlight
      ctx.beginPath();
      ctx.arc(eyeX - 0.8, eyeY - 1, 0.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fill();
    }

    function start() {
      function animate() {
        const { width, height } = canvasSize;
        ctx.clearRect(0, 0, width, height);

        const charX = width - 460;
        const charY = height - 350;

        ctx.drawImage(character, charX, charY);

        const gazeOriginX = charX + gazeOx;
        const gazeOriginY = charY + gazeOy;

        for (const lens of lenses) {
          const lensX = charX + lens.ox;
          const lensY = charY + lens.oy;
          const { x: eyeX, y: eyeY } = clampToEllipse(
            lensX,
            lensY,
            gazeOriginX,
            gazeOriginY,
            lens.rx,
            lens.ry
          );
          drawEye(eyeX, eyeY);
        }

        animationFrameId = requestAnimationFrame(animate);
      }

      animate();
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}