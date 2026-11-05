import { ImageResponse } from 'next/og';
export const runtime = 'edge';
export const alt = 'Polpo AI — Automazioni intelligenti per le PMI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px', background: '#080e23', color: '#eeeef1', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28 }}><span>polpo ai ✳</span><span style={{ color: '#59ecf3', fontSize: 18 }}>AUTOMAZIONI AI SU MISURA</span></div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 64, lineHeight: 1.1, letterSpacing: '-3px' }}><span>Otto braccia.</span><span style={{ color: '#59ecf3' }}>Una sola missione:</span><span style={{ color: '#f67bd0' }}>liberare le tue.</span></div>
      <div style={{ display: 'flex', fontSize: 22, color: '#bbc3db' }}>Assistenti AI / Automazioni operative / Integrazioni intelligenti</div>
    </div>, size);
}
