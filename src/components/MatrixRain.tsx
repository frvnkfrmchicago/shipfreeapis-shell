'use client';

import { useEffect, useRef, useCallback } from 'react';

interface MatrixRainProps {
  className?: string;
}

export default function MatrixRain({ className = '' }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    // Matrix characters - simpler set
    const chars = '01アイウエオ';
    const charArray = chars.split('');

    // OPTIMIZED: Fewer columns, larger spacing
    const fontSize = 20; // Larger = fewer columns
    const columnSpacing = 40; // Wider spacing
    const columns = Math.floor(canvas.width / columnSpacing);
    const drops: number[] = Array(columns).fill(0).map(() => Math.random() * -100);
    const speeds: number[] = Array(columns).fill(0).map(() => Math.random() * 0.3 + 0.2); // SLOWER speeds

    // Frame rate limiting
    const targetFPS = 24; // Much slower, cinematic feel
    const frameInterval = 1000 / targetFPS;

    // Animation
    const draw = (currentTime: number) => {
      // Throttle frame rate
      const deltaTime = currentTime - lastTimeRef.current;
      if (deltaTime < frameInterval) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTimeRef.current = currentTime;

      // Slower fade = longer trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * columnSpacing + columnSpacing / 2;
        const y = drops[i] * fontSize;

        // Skip if above screen
        if (y < 0) {
          drops[i] += speeds[i];
          continue;
        }

        // Distance from mouse
        const dx = x - mouseRef.current.x;
        const dy = y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = 200;

        // Mouse interaction - subtle glow
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#00ffff';
          ctx.fillStyle = `rgba(0, 255, 255, ${0.4 + force * 0.4})`;
          
          const char = charArray[Math.floor(Math.random() * charArray.length)];
          ctx.fillText(char, x, y);
          
          ctx.shadowBlur = 0;
        } else {
          // Normal rain - MUCH MORE SUBTLE (lower opacity)
          const fadeStart = canvas.height * 0.7; // Start fading earlier
          let opacity = 0.25; // Base opacity much lower
          
          if (y > fadeStart) {
            opacity *= 1 - (y - fadeStart) / (canvas.height - fadeStart);
          }
          
          ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
          
          const char = charArray[Math.floor(Math.random() * charArray.length)];
          ctx.fillText(char, x, y);
        }

        // Reset drop when it reaches bottom
        if (y > canvas.height && Math.random() > 0.99) {
          drops[i] = Math.random() * -50;
        }

        drops[i] += speeds[i];
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0, opacity: 0.6 }} // Overall opacity reduction
    />
  );
}
