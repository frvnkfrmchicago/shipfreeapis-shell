'use client';

import { useRef, useEffect, useState } from 'react';

interface Node {
  x: number;
  y: number;
  size: number;
  color: string;
}

// Generate fixed node positions
const generateNodes = (count: number): Node[] => {
  const nodes: Node[] = [];
  const colors = [
    'rgba(155, 45, 93, 0.35)',   // wine
    'rgba(34, 211, 238, 0.3)',   // cyan
    'rgba(251, 191, 36, 0.2)',   // amber
  ];
  
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 4,
      color: colors[i % colors.length],
    });
  }
  return nodes;
};

const NODES = generateNodes(12);

export function NodeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMouse({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax offset for each node
  const getParallaxOffset = (node: Node, intensity: number = 20) => {
    const dx = (mouse.x - 0.5) * intensity;
    const dy = (mouse.y - 0.5) * intensity;
    return { dx, dy };
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Nodes */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {/* Connection lines between nearby nodes */}
        {NODES.map((node, i) => {
          const { dx, dy } = getParallaxOffset(node, 15);
          return NODES.slice(i + 1).map((otherNode, j) => {
            const distance = Math.sqrt(
              Math.pow(node.x - otherNode.x, 2) + 
              Math.pow(node.y - otherNode.y, 2)
            );
            
            // Only connect nearby nodes
            if (distance > 30) return null;
            
            const otherOffset = getParallaxOffset(otherNode, 15);
            const opacity = 0.1 * (1 - distance / 30);
            
            return (
              <line
                key={`line-${i}-${j}`}
                x1={`${node.x + dx}%`}
                y1={`${node.y + dy}%`}
                x2={`${otherNode.x + otherOffset.dx}%`}
                y2={`${otherNode.y + otherOffset.dy}%`}
                stroke="rgba(155, 45, 93, 0.3)"
                strokeWidth="1"
                style={{ opacity, transition: 'all 0.3s ease-out' }}
              />
            );
          });
        })}

        {/* Node circles */}
        {NODES.map((node, i) => {
          const { dx, dy } = getParallaxOffset(node, 20 - (i % 3) * 5);
          return (
            <circle
              key={`node-${i}`}
              cx={`${node.x + dx}%`}
              cy={`${node.y + dy}%`}
              r={node.size}
              fill={node.color}
              style={{ transition: 'all 0.3s ease-out' }}
            />
          );
        })}
      </svg>
    </div>
  );
}
