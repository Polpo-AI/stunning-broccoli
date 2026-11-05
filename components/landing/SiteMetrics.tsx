'use client';
import {usePathname} from 'next/navigation';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
export default function SiteMetrics(){const path=usePathname();return path.startsWith('/contatti/prova')?null:<><Analytics/><SpeedInsights/></>;}
