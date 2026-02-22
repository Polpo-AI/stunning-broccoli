'use client';

import { useEffect, useRef } from 'react';

const TENTACLES = [
  { angle: -90, label: 'Siti Web' },
  { angle: 0, label: 'Chatbot AI' },
  { angle: 90, label: 'Automazioni' },
  { angle: 180, label: 'CRM & Funnel' },
];

function getTentaclePath(angleDeg: number, cx: number, cy: number, length: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const midRad = ((angleDeg + (angleDeg > 0 ? -20 : 20)) * Math.PI) / 180;
  const ex = cx + length * Math.cos(rad);
  const ey = cy + length * Math.sin(rad);
  const c1x = cx + (length * 0.45) * Math.cos(rad) + 25 * Math.sin(midRad);
  const c1y = cy + (length * 0.45) * Math.sin(rad) - 25 * Math.cos(midRad);
  const c2x = cx + (length * 0.75) * Math.cos(rad) - 20 * Math.sin(midRad);
  const c2y = cy + (length * 0.75) * Math.sin(rad) + 20 * Math.cos(midRad);
  return { path: `M ${cx} ${cy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`, ex, ey };
}

export default function AICore() {
  const svgRef = useRef<SVGSVGElement>(null);

  const cx = 250;
  const cy = 250;
  const length = 160;

  return (
    <div className="relative w-full max-w-[500px] aspect-square animate-float">
      <svg
        ref={svgRef}
        viewBox="0 0 500 500"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bc13fe" stopOpacity="1" />
            <stop offset="60%" stopColor="#6a0aad" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1a0040" stopOpacity="0.8" />
          </radialGradient>

          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bc13fe" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#bc13fe" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="tentacleGrad1" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#bc13fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0.7" />
          </linearGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {TENTACLES.map((t, i) => {
            const { path } = getTentaclePath(t.angle, cx, cy, length);
            return (
              <path key={`def-path-${i}`} id={`tentacle-path-${i}`} d={path} />
            );
          })}
        </defs>

        <circle cx={cx} cy={cy} r="190" fill="url(#glowGrad)" opacity="0.5" />

        <circle cx={cx} cy={cy} r="120" fill="none" stroke="rgba(188,19,254,0.06)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="160" fill="none" stroke="rgba(0,212,170,0.04)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="80" fill="none" stroke="rgba(188,19,254,0.08)" strokeWidth="1" />

        {TENTACLES.map((t, i) => {
          const { path, ex, ey } = getTentaclePath(t.angle, cx, cy, length);
          return (
            <g key={`tentacle-${i}`}>
              <path
                d={path}
                stroke="rgba(188,19,254,0.1)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d={path}
                stroke="url(#tentacleGrad1)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="4 6"
                opacity="0.6"
                style={{
                  animation: `flow-line ${2 + i * 0.3}s linear infinite`,
                  strokeDashoffset: 200 - i * 30,
                }}
              />
              <path
                d={path}
                stroke="url(#tentacleGrad1)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.4"
              />

              <circle
                cx={ex}
                cy={ey}
                r="5"
                fill="#00d4aa"
                opacity="0.9"
                filter="url(#glow)"
              />
              <circle
                cx={ex}
                cy={ey}
                r="9"
                fill="none"
                stroke="#00d4aa"
                strokeWidth="1"
                opacity="0.4"
                style={{
                  animation: `ripple ${2.5 + i * 0.2}s ease-out ${i * 0.3}s infinite`,
                }}
              />
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r="50" fill="rgba(188,19,254,0.08)" />
        <circle
          cx={cx} cy={cy} r="40"
          fill="none"
          stroke="rgba(188,19,254,0.3)"
          strokeWidth="1"
          style={{ animation: 'spin-slow 20s linear infinite', transformOrigin: '250px 250px' }}
          strokeDasharray="6 10"
        />

        <polygon
          points={`${cx},${cy - 34} ${cx + 29.4},${cy - 17} ${cx + 29.4},${cy + 17} ${cx},${cy + 34} ${cx - 29.4},${cy + 17} ${cx - 29.4},${cy - 17}`}
          fill="url(#coreGrad)"
          className="animate-core-breathe"
          filter="url(#softGlow)"
        />

        <polygon
          points={`${cx},${cy - 24} ${cx + 20.8},${cy - 12} ${cx + 20.8},${cy + 12} ${cx},${cy + 24} ${cx - 20.8},${cy + 12} ${cx - 20.8},${cy - 12}`}
          fill="rgba(188,19,254,0.2)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />

        <circle cx={cx - 10} cy={cy} r="4" fill="white" opacity="0.9" />
        <circle cx={cx + 10} cy={cy} r="4" fill="white" opacity="0.9" />
        <circle cx={cx - 10} cy={cy} r="2" fill="#000b1e" />
        <circle cx={cx + 10} cy={cy} r="2" fill="#000b1e" />

        <circle
          cx={cx} cy={cy} r="55"
          fill="none"
          stroke="rgba(188,19,254,0.15)"
          strokeWidth="1"
          style={{ animation: 'ripple 3s ease-out 0s infinite', transformOrigin: '250px 250px' }}
        />
        <circle
          cx={cx} cy={cy} r="55"
          fill="none"
          stroke="rgba(188,19,254,0.1)"
          strokeWidth="1"
          style={{ animation: 'ripple 3s ease-out 1s infinite', transformOrigin: '250px 250px' }}
        />
      </svg>
    </div>
  );
}
