/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Image optimization Next.js: serve AVIF/WebP responsive automaticamente
  // (su Vercel è incluso; su Netlify serve @netlify/plugin-nextjs già presente).
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    // Domini esterni autorizzati per next/image (utilizzati nei siti esempio portfolio)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js', '@supabase/realtime-js'],
  },
  webpack: (config) => {
    config.module.exprContextCritical = false;
    return config;
  },
};

module.exports = nextConfig;
