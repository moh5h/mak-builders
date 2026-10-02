'use client';

import { useEffect, useRef } from 'react';

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const pointer = { x: 0.5, y: 0.5 };

    type Node = { x: number; y: number; vx: number; vy: number; r: number; pulse: number };
    let nodes: Node[] = [];

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(38, Math.min(88, Math.floor(width / 18)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.7 + Math.random() * 1.2,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX / Math.max(width, 1);
      pointer.y = e.clientY / Math.max(height, 1);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const t = time * 0.00035;
      const centerX = width * (0.74 + (pointer.x - 0.5) * 0.035);
      const centerY = height * (0.35 + (pointer.y - 0.5) * 0.035);

      const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.55);
      glow.addColorStop(0, 'rgba(39, 217, 255, 0.095)');
      glow.addColorStop(0.38, 'rgba(128, 84, 255, 0.048)');
      glow.addColorStop(1, 'rgba(2, 7, 14, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -30) n.x = width + 30;
        if (n.x > width + 30) n.x = -30;
        if (n.y < -30) n.y = height + 30;
        if (n.y > height + 30) n.y = -30;
      }

      const maxDistance = Math.min(180, Math.max(110, width * 0.11));
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.strokeStyle = `rgba(111, 225, 255, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n, index) => {
        const pulse = 0.75 + Math.sin(t * 3.2 + n.pulse + index) * 0.25;
        ctx.beginPath();
        ctx.fillStyle = index % 7 === 0 ? `rgba(159, 121, 255, ${0.45 * pulse})` : `rgba(102, 233, 255, ${0.48 * pulse})`;
        ctx.arc(n.x, n.y, n.r * (1 + pulse * 0.35), 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    build();
    window.addEventListener('resize', build);
    window.addEventListener('pointermove', onPointer, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', build);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-canvas" aria-hidden="true" />;
}
