'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

// Dense circuit board grid - smaller, more realistic
const GRID_SIZE = 8; // 8x8 grid = 64 nodes
const TRACE_PROBABILITY = 0.4; // Not all nodes connect

interface Node {
  x: number;
  y: number;
  id: number;
}

// Generate grid of nodes
function generateNodes(): Node[] {
  const nodes: Node[] = [];
  let id = 0;
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      // Add some randomness to positions for organic feel
      const offsetX = (Math.random() - 0.5) * 3;
      const offsetY = (Math.random() - 0.5) * 3;
      nodes.push({
        x: 6 + (col * 88 / (GRID_SIZE - 1)) + offsetX,
        y: 8 + (row * 84 / (GRID_SIZE - 1)) + offsetY,
        id: id++,
      });
    }
  }
  return nodes;
}

// Generate traces (connections) between adjacent nodes
function generateTraces(nodes: Node[]): [number, number][] {
  const traces: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    const row = Math.floor(i / GRID_SIZE);
    const col = i % GRID_SIZE;
    
    // Connect to right neighbor
    if (col < GRID_SIZE - 1 && Math.random() < TRACE_PROBABILITY) {
      traces.push([i, i + 1]);
    }
    // Connect to bottom neighbor
    if (row < GRID_SIZE - 1 && Math.random() < TRACE_PROBABILITY) {
      traces.push([i, i + GRID_SIZE]);
    }
    // Diagonal connections (less common)
    if (col < GRID_SIZE - 1 && row < GRID_SIZE - 1 && Math.random() < 0.15) {
      traces.push([i, i + GRID_SIZE + 1]);
    }
  }
  return traces;
}

// Pre-generate for consistency
const NODES = generateNodes();
const TRACES = generateTraces(NODES);

export function CircuitBoardBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const [pulsePhase, setPulsePhase] = useState(0);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 100);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Calculate distance from mouse to a point
  const getMouseProximity = (x: number, y: number) => {
    const distance = Math.sqrt(Math.pow(mouse.x - x, 2) + Math.pow(mouse.y - y, 2));
    return Math.max(0, 1 - distance / 20); // Smaller radius for finer effect
  };

  // Get glow intensity based on pulse and proximity
  const getGlowIntensity = (x: number, y: number, index: number) => {
    const proximity = getMouseProximity(x, y);
    const pulse = Math.sin((pulsePhase + index * 8) * 0.08) * 0.5 + 0.5;
    return Math.min(1, proximity * 2.5 + pulse * 0.2);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Smaller, tighter glows */}
          <filter id="glow-small" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-active" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circuit traces */}
        {TRACES.map(([fromId, toId], idx) => {
          const from = NODES[fromId];
          const to = NODES[toId];
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;
          const intensity = Math.max(
            getGlowIntensity(from.x, from.y, fromId),
            getGlowIntensity(to.x, to.y, toId),
            getGlowIntensity(midX, midY, idx)
          );
          
          return (
            <line
              key={`trace-${idx}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={intensity > 0.5 ? 'rgba(34, 211, 238, 0.7)' : 'rgba(155, 45, 93, 0.25)'}
              strokeWidth={intensity > 0.5 ? 0.12 : 0.08}
              opacity={0.3 + intensity * 0.5}
              filter={intensity > 0.5 ? 'url(#glow-active)' : undefined}
              style={{ transition: 'all 0.15s ease-out' }}
            />
          );
        })}

        {/* Circuit nodes - SMALLER */}
        {NODES.map((node) => {
          const intensity = getGlowIntensity(node.x, node.y, node.id);
          const baseSize = 0.25; // Much smaller base
          const size = baseSize + intensity * 0.2;
          const glowSize = 0.6 + intensity * 0.5;

          return (
            <g key={`node-${node.id}`}>
              {/* Outer glow */}
              {intensity > 0.3 && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={glowSize}
                  fill={intensity > 0.6 ? 'rgba(34, 211, 238, 0.4)' : 'rgba(155, 45, 93, 0.3)'}
                  filter="url(#glow-active)"
                  style={{ transition: 'all 0.15s ease-out' }}
                />
              )}
              {/* Main node */}
              <circle
                cx={node.x}
                cy={node.y}
                r={size}
                fill={intensity > 0.5 ? 'rgba(34, 211, 238, 0.9)' : 'rgba(155, 45, 93, 0.5)'}
                filter={intensity > 0.3 ? 'url(#glow-small)' : undefined}
                style={{ transition: 'all 0.15s ease-out' }}
              />
              {/* Center bright dot */}
              <circle
                cx={node.x}
                cy={node.y}
                r={size * 0.4}
                fill="rgba(255, 255, 255, 0.8)"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
