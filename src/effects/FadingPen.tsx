import React, { useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

const FadingPen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const lastPointTime = useRef<number>(0);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Use window listeners so the canvas never needs to intercept pointer events
    const handleMouseDown = () => { isDrawingRef.current = true; };
    const handleMouseUp   = () => { isDrawingRef.current = false; };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawingRef.current) return;
      const now = Date.now();
      if (now - lastPointTime.current < 10) return;
      const rect = canvas.getBoundingClientRect();
      pointsRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        timestamp: now,
      });
      lastPointTime.current = now;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup',   handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      const now = Date.now();
      const lifeSpan = 3000;

      pointsRef.current = pointsRef.current.filter(p => now - p.timestamp < lifeSpan);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (pointsRef.current.length >= 2) {
        const strokes: Point[][] = [];
        let currentStroke: Point[] = [pointsRef.current[0]];

        for (let i = 1; i < pointsRef.current.length; i++) {
          const p    = pointsRef.current[i];
          const prev = pointsRef.current[i - 1];
          if (p.timestamp - prev.timestamp < 100) {
            currentStroke.push(p);
          } else {
            strokes.push(currentStroke);
            currentStroke = [p];
          }
        }
        strokes.push(currentStroke);

        strokes.forEach(stroke => {
          if (stroke.length < 2) return;
          const newestPoint = stroke[stroke.length - 1];
          const opacity = Math.max(0, 1 - (now - newestPoint.timestamp) / lifeSpan);
          ctx.beginPath();
          ctx.lineCap    = 'round';
          ctx.lineJoin   = 'round';
          ctx.lineWidth  = 4;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.moveTo(stroke[0].x, stroke[0].y);
          for (let i = 1; i < stroke.length; i++) ctx.lineTo(stroke[i].x, stroke[i].y);
          ctx.stroke();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup',   handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none', // never blocks clicks on anything beneath
        background: 'transparent',
      }}
    />
  );
};

export default FadingPen;