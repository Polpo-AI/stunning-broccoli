/**
 * Sottile fascia di transizione fluida tra una sezione e la successiva.
 * Senza bordi netti, senza shift di colore visibili — solo un velo morbido.
 */
export default function SectionBridge({
  color = 'cyan',
  className = '',
}: {
  color?: 'cyan' | 'violet' | 'emerald' | 'sky' | 'multi';
  className?: string;
}) {
  const palettes: Record<string, string> = {
    cyan: 'rgba(34,211,238,0.10)',
    violet: 'rgba(167,139,250,0.10)',
    emerald: 'rgba(52,211,153,0.09)',
    sky: 'rgba(96,165,250,0.10)',
    multi:
      'radial-gradient(ellipse 40% 100% at 20% 50%, rgba(34,211,238,0.08) 0%, transparent 70%),' +
      'radial-gradient(ellipse 40% 100% at 80% 50%, rgba(167,139,250,0.08) 0%, transparent 70%)',
  };

  const bg =
    color === 'multi'
      ? palettes.multi
      : `radial-gradient(ellipse 70% 100% at 50% 50%, ${palettes[color]} 0%, transparent 70%)`;

  return (
    <div
      aria-hidden
      className={`relative h-32 md:h-48 w-full pointer-events-none ${className}`}
      style={{ background: bg }}
    />
  );
}
