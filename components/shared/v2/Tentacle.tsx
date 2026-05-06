'use client';

import { CSSProperties } from 'react';

type Variant = 'cyan' | 'warm';

interface Props {
  variant?: Variant;
  /** absolute-positioning style (top/right/bottom/left/width/height/transform) */
  style?: CSSProperties;
  /** SVG path d= */
  d: string;
  /** sucker positions along the tentacle */
  suckers?: Array<{ cx: number; cy: number; r?: number }>;
  /** viewBox of the SVG */
  viewBox: string;
}

/**
 * Decorative tentacle SVG that slithers along a Bezier path.
 * Use absolute positioning via `style` to anchor it to a section corner.
 */
export default function Tentacle({ variant = 'cyan', style, d, suckers = [], viewBox }: Props) {
  return (
    <svg
      className={`tentacle ${variant === 'warm' ? 'warm' : ''}`}
      style={style}
      viewBox={viewBox}
      aria-hidden
    >
      <path d={d} />
      {suckers.map((s, i) => (
        <circle key={i} className={`sucker ${variant === 'warm' ? 'warm' : ''}`} cx={s.cx} cy={s.cy} r={s.r ?? 2.5} />
      ))}
    </svg>
  );
}
