import { MetadataRoute } from 'next';

const host = process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com';

// AI crawlers we explicitly welcome — they power ChatGPT, Perplexity, Claude,
// Google AI Overviews, and other generative search engines that can cite us.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'CCBot',
  'Meta-ExternalAgent',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default rule: allow everything except internal/admin paths
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
        ],
      },
      // Explicit allow for AI crawlers — ensures no accidental block by
      // overly broad rules and signals that GEO indexing is welcome.
      ...AI_CRAWLERS.map((bot) => ({
        userAgent: bot,
        allow: '/',
      })),
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
