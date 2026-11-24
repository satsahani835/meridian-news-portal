// Live English News RSS Aggregator for THE MERIDIAN
// Sources: Nepali English E-Newspapers, New York Times, Times of India,
// NDTV Profit / NDTV, Fox News / Fox Business, NY Post, Daily Wire,
// National Review, Washington Examiner, Breitbart, and Wall Street Journal.

const RSS_FEEDS = [
  // Nepali English E-Newspapers
  { url: 'https://kathmandupost.com/rss', category: 'nepal', source: 'The Kathmandu Post', group: 'Nepal Press' },
  { url: 'https://english.onlinekhabar.com/feed', category: 'nepal', source: 'OnlineKhabar', group: 'Nepal Press' },
  { url: 'https://nepalitimes.com/feed', category: 'nepal', source: 'Nepali Times', group: 'Nepal Press' },
  { url: 'https://english.khabarhub.com/feed/', category: 'nepal', source: 'Khabarhub', group: 'Nepal Press' },
  { url: 'https://risingnepaldaily.com/rss', category: 'nepal', source: 'The Rising Nepal', group: 'Nepal Press' },

  // The New York Times
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml', category: 'world', source: 'New York Times', group: 'New York Times' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', category: 'world', source: 'New York Times', group: 'New York Times' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml', category: 'technology', source: 'New York Times', group: 'New York Times' },

  // The Times of India
  { url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms', category: 'india', source: 'Times of India', group: 'Times of India' },
  { url: 'https://timesofindia.indiatimes.com/rssfeeds/1898055.cms', category: 'business', source: 'Times of India', group: 'Times of India' },
  { url: 'https://timesofindia.indiatimes.com/rssfeeds/66949542.cms', category: 'technology', source: 'Times of India', group: 'Times of India' },
  { url: 'https://timesofindia.indiatimes.com/rssfeeds/4719148.cms', category: 'sports', source: 'Times of India', group: 'Times of India' },

  // NDTV Profit & NDTV
  { url: 'https://feeds.feedburner.com/ndtvprofit-latest', category: 'business', source: 'NDTV Profit', group: 'NDTV Profit' },
  { url: 'https://feeds.feedburner.com/ndtvnews-top-stories', category: 'india', source: 'NDTV', group: 'NDTV Profit' },
  { url: 'https://feeds.feedburner.com/ndtvnews-world-news', category: 'world', source: 'NDTV World', group: 'NDTV Profit' },

  // Fox News, Fox Business & Right-Wing / Conservative Media Channels
  { url: 'https://moxie.foxnews.com/google-publisher/latest.xml', category: 'politics', source: 'Fox News', group: 'Fox News' },
  { url: 'https://moxie.foxnews.com/google-publisher/world.xml', category: 'world', source: 'Fox News', group: 'Fox News' },
  { url: 'https://moxie.foxbusiness.com/google-publisher/latest.xml', category: 'business', source: 'Fox Business', group: 'Fox News' },
  { url: 'https://nypost.com/feed/', category: 'politics', source: 'New York Post', group: 'Right-Wing Media' },
  { url: 'https://www.dailywire.com/feeds/rss.xml', category: 'politics', source: 'The Daily Wire', group: 'Right-Wing Media' },
  { url: 'https://www.nationalreview.com/feed/', category: 'politics', source: 'National Review', group: 'Right-Wing Media' },
  { url: 'https://www.washingtonexaminer.com/feed', category: 'politics', source: 'Washington Examiner', group: 'Right-Wing Media' },
  { url: 'https://feeds.feedburner.com/breitbart', category: 'politics', source: 'Breitbart', group: 'Right-Wing Media' },

  // Wall Street Journal
  { url: 'https://feeds.content.dowjones.io/public/rss/RSSWorldNews', category: 'world', source: 'Wall Street Journal', group: 'WSJ' },
  { url: 'https://feeds.content.dowjones.io/public/rss/RSSMarketsMain', category: 'business', source: 'Wall Street Journal', group: 'WSJ' },
];

const FALLBACK_IMAGES = {
  nepal: '/images/world-summit.svg',
  india: '/images/culture-architecture.svg',
  world: '/images/world-summit.svg',
  politics: '/images/world-summit.svg',
  business: '/images/markets-skyline.jpg',
  technology: '/images/hero-ai-datacenter.jpg',
  sports: '/images/sports-stadium.jpg',
};

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
let newsCache = { timestamp: 0, items: [] };

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
    .replace(/Read more\.{0,3}$/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTag(block, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = block.match(regex);
  return match ? decodeXmlEntities(match[1]) : '';
}

function extractRawTag(block, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = block.match(regex);
  return match ? match[1] : '';
}

function isUsableImageUrl(url) {
  if (!url || !/^https?:\/\//i.test(url)) return false;
  if (/feedburner|doubleclick|pixel|1x1|gravatar|ads\.|tracker|scorecardresearch/i.test(url)) return false;
  return true;
}

function extractImage(block, category) {
  const candidates = [];

  // 1. Collect media:content / media:thumbnail URLs (prefer larger width when specified)
  const mediaRegex = /<(?:media:content|media:thumbnail|enclosure)[^>]+>/gi;
  let m;
  while ((m = mediaRegex.exec(block)) !== null) {
    const tag = m[0];
    const urlMatch = tag.match(/url=["']([^"']+)["']/i);
    const widthMatch = tag.match(/width=["'](\d+)["']/i);
    if (urlMatch && urlMatch[1]) {
      const cleanUrl = urlMatch[1].replace(/&amp;/g, '&').trim();
      if (isUsableImageUrl(cleanUrl)) {
        candidates.push({ url: cleanUrl, width: widthMatch ? Number(widthMatch[1]) : 600 });
      }
    }
  }

  if (candidates.length > 0) {
    candidates.sort((a, b) => b.width - a.width);
    return { image: candidates[0].url, hasRealImage: true };
  }

  // 2. Look for <img src="..."> inside description or content:encoded
  const rawHtml = `${extractRawTag(block, 'content:encoded')} ${extractRawTag(block, 'description')}`
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');

  const imgMatch = rawHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch && imgMatch[1] && isUsableImageUrl(imgMatch[1])) {
    return { image: imgMatch[1].trim(), hasRealImage: true };
  }

  return { image: FALLBACK_IMAGES[category] || FALLBACK_IMAGES.world, hasRealImage: false };
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
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const itemMatches = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];

    return itemMatches
      .slice(0, 6)
      .map((itemXml, idx) => {
        const title = extractTag(itemXml, 'title');
        const description = extractTag(itemXml, 'description');
        const link = extractTag(itemXml, 'link');
        const pubDateRaw = extractTag(itemXml, 'pubDate') || extractTag(itemXml, 'dc:date');
        const creator = extractTag(itemXml, 'dc:creator') || extractTag(itemXml, 'author');
        const parsedDate = pubDateRaw ? new Date(pubDateRaw) : new Date();
        const validIso = Number.isNaN(parsedDate.getTime())
          ? new Date().toISOString()
          : parsedDate.toISOString();

        if (!title || title.length < 10) return null;

        const { image, hasRealImage } = extractImage(itemXml, feed.category);
        const cleanDesc =
          description && description.length > 20
            ? description.slice(0, 340)
            : `Latest breaking English report from ${feed.source}.`;

        const authorName =
          creator && creator.length > 2 && creator.length < 48 && !creator.includes('@')
            ? creator
            : feed.source;

        return {
          id: `wire-${slugify(feed.source)}-${slugify(title).slice(0, 26)}-${idx}`,
          slug: `wire-${slugify(title)}`,
          title,
          subtitle: cleanDesc,
          excerpt: cleanDesc,
          category: feed.category,
          author: {
            name: authorName,
            role: feed.source,
            avatarInitials: feed.source
              .split(/\s+/)
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase(),
          },
          publishedAt: validIso,
          readTimeMinutes: 3,
          image,
          hasRealImage,
          fallbackImage: FALLBACK_IMAGES[feed.category] || FALLBACK_IMAGES.world,
          imageCaption: `Source: ${feed.source}`,
          isBreaking: idx === 0,
          isLiveWire: true,
          externalUrl: link,
          sourceName: feed.source,
          sourceGroup: feed.group,
          tags: [feed.source, feed.group, feed.category],
          content: [
            cleanDesc,
            `This live report is syndicated directly from ${feed.source} (${feed.group}) as part of THE MERIDIAN's automated 24/7 English global newsroom.`,
            `Use the button below to read the complete original coverage directly on ${feed.source}.`,
          ],
          views: 1500 + ((title.length * 137 + idx * 419) % 8500),
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

// Interleave articles across publisher groups so the Front Page features a vibrant mix
// of Nepali E-Newspapers, NYT, Times of India, NDTV Profit, Fox News & Right-Wing media right away.
function interleaveByGroup(articles) {
  const buckets = new Map();
  for (const a of articles) {
    const key = a.sourceGroup || a.sourceName || 'Other';
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(a);
  }

  for (const list of buckets.values()) {
    list.sort((a, b) => {
      // Slightly prefer real editorial photos for top hero slots while keeping recency primary
      const timeDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      if (Math.abs(timeDiff) > 6 * 3600 * 1000) return timeDiff;
      if (a.hasRealImage !== b.hasRealImage) return a.hasRealImage ? -1 : 1;
      return timeDiff;
    });
  }

  const groupPriority = [
    'New York Times',
    'Nepal Press',
    'Fox News',
    'Times of India',
    'NDTV Profit',
    'Right-Wing Media',
    'WSJ',
  ];

  const orderedKeys = [
    ...groupPriority.filter((k) => buckets.has(k)),
    ...[...buckets.keys()].filter((k) => !groupPriority.includes(k)),
  ];

  const result = [];
  let added = true;
  let round = 0;
  while (added) {
    added = false;
    for (const k of orderedKeys) {
      const list = buckets.get(k);
      if (list && round < list.length) {
        result.push(list[round]);
        added = true;
      }
    }
    round += 1;
  }

  // Ensure the #1 Hero Spotlight has a crisp real photo if available
  const firstPhotoIdx = result.findIndex((a) => a.hasRealImage);
  if (firstPhotoIdx > 0) {
    const [lead] = result.splice(firstPhotoIdx, 1);
    result.unshift(lead);
  }

  return result;
}

export async function getLiveNews(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && newsCache.items.length > 0 && now - newsCache.timestamp < CACHE_TTL_MS) {
    return {
      cached: true,
      fetchedAt: new Date(newsCache.timestamp).toISOString(),
      count: newsCache.items.length,
      sourcesCount: new Set(newsCache.items.map((i) => i.sourceName)).size,
      articles: newsCache.items,
    };
  }

  const results = await Promise.allSettled(RSS_FEEDS.map(fetchSingleFeed));
  const combined = [];
  const seenTitles = new Set();

  for (const res of results) {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      for (const item of res.value) {
        const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 48);
        if (key && !seenTitles.has(key)) {
          seenTitles.add(key);
          combined.push(item);
        }
      }
    }
  }

  const ordered = interleaveByGroup(combined);
  newsCache = { timestamp: now, items: ordered };

  return {
    cached: false,
    fetchedAt: new Date(now).toISOString(),
    count: ordered.length,
    sourcesCount: new Set(ordered.map((i) => i.sourceName)).size,
    articles: ordered,
  };
}

export function getAdsTxtContent() {
  const pubId = process.env.ADSENSE_PUB_ID || process.env.VITE_ADSENSE_PUB_ID || 'pub-7994439676148929';
  const normalized = pubId.startsWith('ca-') ? pubId.slice(3) : pubId;
  return `google.com, ${normalized}, DIRECT, f08c47fec0942fa0\n`;
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

  if (urlObj.pathname === '/ads.txt' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(getAdsTxtContent());
    return true;
  }

  if (typeof next === 'function') {
    next();
  }
  return false;
}
