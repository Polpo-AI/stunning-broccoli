'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  href?: string;
  children: React.ReactNode;
  variant?: 'solid' | 'outline';
  className?: string;
  trailingArrow?: boolean;
}

export default function MagentaButton({ href = '#', children, variant = 'solid', className = '', trailingArrow = true }: Props) {
  const base = 'inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5';
  const styles = variant === 'solid'
    ? { background: 'linear-gradient(135deg, #ff3d8a, #ff5b9e)', color: '#fff', boxShadow: '0 8px 28px rgba(255,61,138,0.30)' }
    : { background: 'transparent', color: '#ff7eb0', border: '1px solid rgba(255,61,138,0.30)' };
  return (
    <Link href={href} className={`${base} ${className}`} style={styles}>
      {children}
      {trailingArrow && <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.8} />}
    </Link>
  );
}
