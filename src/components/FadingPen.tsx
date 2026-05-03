import React, { useRef, useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

const FadingPen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const lastPointTime = useRef<number>(0);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to fill screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    let animationFrameId: number;

    const render = () => {
    const now = Date.now();
    const lifeSpan = 3000;

    pointsRef.current = pointsRef.current.filter(p => now - p.timestamp < lifeSpan);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (pointsRef.current.length < 2) {
        animationFrameId = requestAnimationFrame(render);
        return;
    }

    // Group points into strokes to prevent lines connecting across mouse-ups
    const strokes: Point[][] = [];
    let currentStroke: Point[] = [pointsRef.current[0]];

    for (let i = 1; i < pointsRef.current.length; i++) {
        const p = pointsRef.current[i];
        const prev = pointsRef.current[i - 1];

        // If points are >100ms apart, they are likely different strokes
        if (p.timestamp - prev.timestamp < 100) {
        currentStroke.push(p);
        } else {
        strokes.push(currentStroke);
        currentStroke = [p];
        }
    }
    strokes.push(currentStroke);

    // Draw each stroke
    strokes.forEach(stroke => {
        if (stroke.length < 2) return;

        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 4;
        
        // Calculate average age of the stroke for uniform fading
        // Or use the youngest point so the whole line vanishes together
        const newestPoint = stroke[stroke.length - 1];
        const opacity = Math.max(0, 1 - (now - newestPoint.timestamp) / lifeSpan);
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        ctx.stroke();
    });

    animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    const now = Date.now();
    // THROTTLING: Only add a point every 10ms
    if (now - lastPointTime.current < 10) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      pointsRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        timestamp: now,
      });
      lastPointTime.current = now;
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={() => setIsDrawing(true)}
      onMouseUp={() => setIsDrawing(false)}
      onMouseLeave={() => setIsDrawing(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'all',
        background: 'transparent',
      }}
    />
  );
};

export default FadingPen;
