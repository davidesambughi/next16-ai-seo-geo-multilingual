import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const securityHeaders = [
  // Prevent clickjacking
  { key: 'X-Frame-Options', value: 'DENY' },
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Control referrer information
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restrict browser features
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Enable HSTS (1 year, include subdomains, preload-ready)
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
];

const nextConfig: NextConfig = {
  // Remove X-Powered-By header (reduces fingerprinting surface)
  poweredByHeader: false,

  images: {
    // Serve AVIF first (smaller), WebP fallback — better Core Web Vitals
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Development placeholder service
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      // TODO (P6): Add your production CDN or image host before going live.
      // Examples:
      //   { protocol: 'https', hostname: 'images.raisingkidsinportugal.com' },       // custom CDN
      //   { protocol: 'https', hostname: 'res.cloudinary.com' },           // Cloudinary
      //   { protocol: 'https', hostname: '*.vercel-storage.com' },         // Vercel Blob
      //   { protocol: 'https', hostname: 'your-bucket.s3.amazonaws.com' }, // S3
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
