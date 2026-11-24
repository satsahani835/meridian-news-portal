// Shared Live English News RSS Aggregator + Ad Telemetry API
// Uses Node 24 native fetch — zero external dependencies required.

const RSS_FEEDS = [
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', category: 'world', source: 'BBC World' },
  { url: 'https://feeds.bbci.co.uk/news/technology/rss.xml', category: 'technology', source: 'BBC Tech' },
  { url: 'https://feeds.bbci.co.uk/news/business/rss.xml', category: 'business', source: 'BBC Business' },
  { url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml', category: 'science', source: 'BBC Science' },
  { url: 'https://feeds.npr.org/1001/rss.xml', category: 'world', source: 'NPR News' },
  { url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss', category: 'science', source: 'NASA Wire' },
  { url: 'https://www.theguardian.com/environment/rss', category: 'climate', source: 'Guardian Climate' },
  { url: 'https://www.theguardian.com/culture/rss', category: 'culture', source: 'Guardian Culture' },
  { url: 'https://feeds.bbci.co.uk/sport/rss.xml', category: 'sports', source: 'BBC Sport' },
];

const FALLBACK_IMAGES = {
  world: '/images/world-summit.svg',
  technology: '/images/hero-ai-datacenter.jpg',
  business: '/images/markets-skyline.jpg',
  science: '/images/science-europa.svg',
  climate: '/images/climate-offshore.svg',
  culture: '/images/culture-architecture.svg',
  sports: '/images/sports-stadium.jpg',
};

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
let newsCache = { timestamp: 0, items: [] };

const serverAdStats = {
  impressions: 0,
  clicks: 0,
  estimatedRevenue: 0,
  bySlot: {},
  lastUpdated: new Date().toISOString(),
};

function decodeXmlEntities(str = '') {
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)))
    .replace(/<[^>]+>/g, ' ')
    .replace(/Continue reading\.{0,3}/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTag(block, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = block.match(regex);
  return match ? decodeXmlEntities(match[1]) : '';
}

function extractImage(block, category) {
  const mediaMatch =
    block.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i) ||
    block.match(/<media:content[^>]+url=["']([^"']+)["']/i) ||
    block.match(/<enclosure[^>]+url=["']([^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i);
  if (mediaMatch && mediaMatch[1] && mediaMatch[1].startsWith('http')) {
    return mediaMatch[1].replace(/&amp;/g, '&');
  }
  return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.world;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 72);
}

async function fetchSingleFeed(feed) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);
  try {
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'TheMeridianNewsPortal/1.0 (+https://themeridian.news)',
        Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const itemMatches = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];
    return itemMatches.slice(0, 5).map((itemXml, idx) => {
      const title = extractTag(itemXml, 'title');
      const description = extractTag(itemXml, 'description');
      const link = extractTag(itemXml, 'link');
      const pubDateRaw = extractTag(itemXml, 'pubDate');
      const parsedDate = pubDateRaw ? new Date(pubDateRaw) : new Date();
      const validIso = Number.isNaN(parsedDate.getTime())
        ? new Date().toISOString()
        : parsedDate.toISOString();

      if (!title || title.length < 12) return null;

      return {
        id: `wire-${feed.category}-${slugify(title).slice(0, 24)}-${idx}`,
        slug: `wire-${slugify(title)}`,
        title,
        subtitle: description || `Live English wire report sourced from ${feed.source}.`,
        excerpt: description || `Live English wire report sourced from ${feed.source}.`,
        category: feed.category,
        author: {
          name: feed.source,
          role: 'Global Wire Desk',
          avatarInitials: feed.source
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase(),
        },
        publishedAt: validIso,
        readTimeMinutes: 3,
        image: extractImage(itemXml, feed.category),
        fallbackImage: FALLBACK_IMAGES[feed.category] || FALLBACK_IMAGES.world,
        imageCaption: `Live wire report via ${feed.source}`,
        isBreaking: idx === 0 && (feed.category === 'world' || feed.category === 'technology'),
        isLiveWire: true,
        externalUrl: link,
        sourceName: feed.source,
        tags: [feed.category, 'Live Wire', feed.source],
        content: [
          description || title,
          `This developing English-language dispatch was syndicated in real time from ${feed.source} through THE MERIDIAN's open Global Wire aggregator.`,
          `Our editorial desk continuously monitors international wire services alongside original investigative reporting to keep global English journalism 100% free and accessible without paywalls.`,
        ],
        views: 1200 + Math.floor(Math.random() * 4800),
      };
    }).filter(Boolean);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export async function getLiveNews(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && newsCache.items.length > 0 && now - newsCache.timestamp < CACHE_TTL_MS) {
    return {
      cached: true,
      fetchedAt: new Date(newsCache.timestamp).toISOString(),
      count: newsCache.items.length,
      articles: newsCache.items,
    };
  }

  const results = await Promise.allSettled(RSS_FEEDS.map(fetchSingleFeed));
  const combined = [];
  const seenTitles = new Set();

  for (const res of results) {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      for (const item of res.value) {
        const key = item.title.toLowerCase().slice(0, 50);
        if (!seenTitles.has(key)) {
          seenTitles.add(key);
          combined.push(item);
        }
      }
    }
  }

  combined.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  newsCache = { timestamp: now, items: combined };
  return {
    cached: false,
    fetchedAt: new Date(now).toISOString(),
    count: combined.length,
    articles: combined,
  };
}

export function handleApiRequest(req, res, next) {
  const urlObj = new URL(req.url || '/', 'http://localhost');

  if (urlObj.pathname === '/api/live-news' && req.method === 'GET') {
    const force = urlObj.searchParams.get('refresh') === '1';
    getLiveNews(force)
      .then((payload) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=120');
        res.end(JSON.stringify(payload));
      })
      .catch(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ cached: false, fetchedAt: new Date().toISOString(), count: 0, articles: [] }));
      });
    return true;
  }

  if (urlObj.pathname === '/api/ads/stats' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(serverAdStats));
    return true;
  }

  if (urlObj.pathname === '/api/ads/event' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
      if (body.length > 16_384) body = body.slice(0, 16_384);
    });
    req.on('end', () => {
      try {
        const evt = JSON.parse(body || '{}');
        const slotId = String(evt.slotId || 'unknown').slice(0, 64);
        if (!serverAdStats.bySlot[slotId]) {
          serverAdStats.bySlot[slotId] = { impressions: 0, clicks: 0, revenue: 0 };
        }
        const cpm = Number(evt.cpm) || 8.5;
        const cpc = Number(evt.cpc) || 0.65;
        if (evt.type === 'impression') {
          serverAdStats.impressions += 1;
          serverAdStats.bySlot[slotId].impressions += 1;
          const earned = cpm / 1000;
          serverAdStats.estimatedRevenue += earned;
          serverAdStats.bySlot[slotId].revenue += earned;
        } else if (evt.type === 'click') {
          serverAdStats.clicks += 1;
          serverAdStats.bySlot[slotId].clicks += 1;
          serverAdStats.estimatedRevenue += cpc;
          serverAdStats.bySlot[slotId].revenue += cpc;
        }
        serverAdStats.lastUpdated = new Date().toISOString();
      } catch {
        // Ignore malformed telemetry payload
      }
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ ok: true, stats: serverAdStats }));
    });
    return true;
  }

  if (urlObj.pathname === '/ads.txt' && req.method === 'GET') {
    const pubId = process.env.ADSENSE_PUB_ID || 'pub-0000000000000000';
    const normalized = pubId.startsWith('ca-') ? pubId.slice(3) : pubId;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(
      `# THE MERIDIAN — Authorized Digital Sellers (ads.txt)\n` +
        `google.com, ${normalized}, DIRECT, f08c47fec0942fa0\n`
    );
    return true;
  }

  if (typeof next === 'function') {
    next();
  }
  return false;
}
