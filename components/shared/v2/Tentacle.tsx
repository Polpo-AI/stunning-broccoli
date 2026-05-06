'use client';

import { CSSProperties } from 'react';

type Variant = 'cyan' | 'warm';

interface Props {
  variant?: Variant;
  /** Override stroke color with any CSS color; bypasses the gradient variant system */
  color?: string;
  /** absolute-positioning style (top/right/bottom/left/width/height/transform) */
  style?: CSSProperties;
  /** SVG path d= */
  d: string;
  /** sucker positions along the tentacle */
  suckers?: Array<{ cx: number; cy: number; r?: number }>;
  /** viewBox of the SVG */
  viewBox: string;
}

export default function Tentacle({ variant = 'cyan', color, style, d, suckers = [], viewBox }: Props) {
  const pathStyle = color ? { stroke: color, fill: 'none' } as CSSProperties : undefined;
  const suckerFill = color ? { fill: color, opacity: 0.6 } as CSSProperties : undefined;
  return (
    <svg
      className={`tentacle ${!color && variant === 'warm' ? 'warm' : ''}`}
      style={style}
      viewBox={viewBox}
      aria-hidden
    >
      <path d={d} style={pathStyle} />
      {suckers.map((s, i) => (
        <circle key={i} className={`sucker ${!color && variant === 'warm' ? 'warm' : ''}`}
          cx={s.cx} cy={s.cy} r={s.r ?? 2.5} style={suckerFill} />
      ))}
    </svg>
  );
}
