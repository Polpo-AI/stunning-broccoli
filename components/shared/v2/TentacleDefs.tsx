/**
 * TentacleDefs — mount once, near top of app/v2/layout.tsx.
 * Contains the gradient defs used by every <Tentacle /> in the page.
 */
export default function TentacleDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
      <defs>
        <linearGradient id="polpo-tentacle-cyan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="polpo-tentacle-magenta" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff3d8a" stopOpacity="0" />
          <stop offset="40%" stopColor="#ff3d8a" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ff7ab0" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
