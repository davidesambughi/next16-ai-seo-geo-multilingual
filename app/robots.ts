import { MetadataRoute } from 'next';

const host = process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
    // Note: LLM Policy is available at ${host}/llms.txt
  };
}
