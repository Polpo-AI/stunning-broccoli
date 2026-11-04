import type { SVGProps } from 'react';

type IconName = 'outward' | 'down' | 'previous' | 'next' | 'menu' | 'close' | 'polpo' | 'sport' | 'beauty' | 'restaurant' | 'studio' | 'hospitality';
const paths: Record<IconName, React.ReactNode> = {
  outward: <><path d="M5 19 19 5M7 5h12v12" /></>,
  down: <><path d="M12 3v17m-6-6 6 6 6-6" /></>,
  previous: <path d="M20 12H4m6-6-6 6 6 6" />,
  next: <path d="M4 12h16m-6-6 6 6-6 6" />,
  menu: <><path d="M4 8h16M8 16h12" /></>,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  polpo: <><path d="M6 13V9a6 6 0 0 1 12 0v4m-12-1c0 5-5 2-4 6 1 3 5 2 6-1m10-5c0 5 5 2 4 6-1 3-5 2-6-1M8 13v5c0 4 4 4 4 0m4-5v5c0 4-4 4-4 0v-3" /><path d="M9 9v1m6-1v1" /></>,
  sport: <><path d="m8 15-5 6m5-6 2 2m-1-2c-3-3-2-7 1-10s7-3 10 0 2 7-1 10-7 3-10 0Z" /><path d="m10 6 8 8m-5-10 7 7m-13 0 8-8m-6 12 11-11" /></>,
  beauty: <><ellipse cx="12" cy="9" rx="6" ry="7" /><path d="M12 16v5m-4 0h8M9 7l3-3" /></>,
  restaurant: <><path d="M3 17h18M5 15a7 7 0 0 1 14 0M12 6V4m-2 0h4M2 20h20" /></>,
  studio: <><path d="M4 4h9l4 4v5M13 4v5h4M4 4v16h7M7 12h4m-4 4h3" /><rect x="12" y="13" width="10" height="8" rx="1" /><path d="m12 14 5 4 5-4" /></>,
  hospitality: <><path d="M3 17h18M5 15a7 7 0 0 1 14 0M12 8V5m-2 0h4M3 21h18" /><path d="M4 9H2m20 0h-2" /></>,
};

export default function PolpoIcon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>{paths[name]}</svg>;
}
