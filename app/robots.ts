import { MetadataRoute } from 'next';

/* ─── robots.txt config ─────────────────────────────────────────────────────
   GEO: gestiamo esplicitamente i crawler delle AI search engines.
   - ALLOW: bot indicizzazione + bot AI con sourcing (citano + linkano)
   - DISALLOW: training-only bot (es. Google-Extended può andare in
     un'allow esplicita se vogliamo essere usati per training Gemini).
   Riferimenti:
   • OpenAI: GPTBot (training), ChatGPT-User (browse), OAI-SearchBot (search)
   • Anthropic: ClaudeBot (training), claude-web (browse), anthropic-ai (search)
   • Perplexity: PerplexityBot
   • Google: Googlebot (search), Google-Extended (Gemini training)
   • Apple: Applebot, Applebot-Extended
   • Common Crawl: CCBot
   • Cohere: cohere-ai
   • Meta: Meta-ExternalAgent
   • DuckDuckGo AI: DuckAssistBot
   • You.com: YouBot
   • Bytespider (TikTok/ByteDance): generalmente block
   ============================================================================ */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Bot tradizionali ──────────────────────────────────────────────────
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },

      // ── AI search engines (citano + linkano: vogliamo essere visibili) ───
      { userAgent: 'GPTBot',          allow: '/' }, // OpenAI training
      { userAgent: 'ChatGPT-User',    allow: '/' }, // ChatGPT browse
      { userAgent: 'OAI-SearchBot',   allow: '/' }, // ChatGPT search
      { userAgent: 'ClaudeBot',       allow: '/' }, // Anthropic training
      { userAgent: 'claude-web',      allow: '/' }, // Claude browse
      { userAgent: 'anthropic-ai',    allow: '/' }, // Anthropic legacy
      { userAgent: 'PerplexityBot',   allow: '/' }, // Perplexity index
      { userAgent: 'Perplexity-User', allow: '/' }, // Perplexity user-agent search
      { userAgent: 'Google-Extended', allow: '/' }, // Gemini training
      { userAgent: 'Applebot',        allow: '/' }, // Apple Spotlight/Siri
      { userAgent: 'Applebot-Extended', allow: '/' }, // Apple Intelligence training
      { userAgent: 'CCBot',           allow: '/' }, // Common Crawl (alimenta molti LLM)
      { userAgent: 'cohere-ai',       allow: '/' }, // Cohere
      { userAgent: 'Meta-ExternalAgent', allow: '/' }, // Meta AI
      { userAgent: 'DuckAssistBot',   allow: '/' }, // DuckDuckGo AI
      { userAgent: 'YouBot',          allow: '/' }, // You.com

      // ── Bot da bloccare (scraper aggressivi, no citation) ────────────────
      { userAgent: 'Bytespider', disallow: '/' }, // ByteDance, scraping aggressivo
      { userAgent: 'PetalBot',   disallow: '/' }, // Huawei aggressive
      { userAgent: 'AhrefsBot',  disallow: '/' }, // SEO tool, non utile per noi
      { userAgent: 'SemrushBot', disallow: '/' }, // SEO tool
      { userAgent: 'DotBot',     disallow: '/' }, // Moz, marginale
      { userAgent: 'MJ12bot',    disallow: '/' }, // Majestic, scraping
    ],
    sitemap: 'https://polpo-ai.com/sitemap.xml',
    host: 'https://polpo-ai.com',
  };
}
