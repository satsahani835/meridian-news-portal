// Live Global English & International News RSS Aggregator for THE MERIDIAN
// Covers: Nepali English E-Newspapers, NYT, Times of India, NDTV Profit / NDTV,
// and 50 requested US Broadcast, US Print & Magazines, US Digital Conservative,
// UK & Ireland, and Europe / Canada / Australia news channels.

const DIRECT_RSS_FEEDS = [
  // === NEPAL PRESS ===
  { url: 'https://kathmandupost.com/rss', category: 'nepal', source: 'The Kathmandu Post', group: 'Nepal Press' },
  { url: 'https://english.onlinekhabar.com/feed', category: 'nepal', source: 'OnlineKhabar', group: 'Nepal Press' },
  { url: 'https://nepalitimes.com/feed', category: 'nepal', source: 'Nepali Times', group: 'Nepal Press' },
  { url: 'https://english.khabarhub.com/feed/', category: 'nepal', source: 'Khabarhub', group: 'Nepal Press' },
  { url: 'https://risingnepaldaily.com/rss', category: 'nepal', source: 'The Rising Nepal', group: 'Nepal Press' },

  // === NEW YORK TIMES ===
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml', category: 'world', source: 'New York Times', group: 'New York Times' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', category: 'world', source: 'New York Times', group: 'New York Times' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml', category: 'technology', source: 'New York Times', group: 'New York Times' },

  // === TIMES OF INDIA & NDTV PROFIT ===
  { url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms', category: 'india', source: 'Times of India', group: 'India & Profit' },
  { url: 'https://timesofindia.indiatimes.com/rssfeeds/1898055.cms', category: 'business', source: 'Times of India', group: 'India & Profit' },
  { url: 'https://timesofindia.indiatimes.com/rssfeeds/66949542.cms', category: 'technology', source: 'Times of India', group: 'India & Profit' },
  { url: 'https://timesofindia.indiatimes.com/rssfeeds/4719148.cms', category: 'sports', source: 'Times of India', group: 'India & Profit' },
  { url: 'https://feeds.feedburner.com/ndtvprofit-latest', category: 'business', source: 'NDTV Profit', group: 'India & Profit' },
  { url: 'https://feeds.feedburner.com/ndtvnews-top-stories', category: 'india', source: 'NDTV', group: 'India & Profit' },
  { url: 'https://feeds.feedburner.com/ndtvnews-world-news', category: 'world', source: 'NDTV World', group: 'India & Profit' },

  // === 1. UNITED STATES: TELEVISION & BROADCAST NETWORKS ===
  { url: 'https://moxie.foxnews.com/google-publisher/latest.xml', category: 'us-tv', source: 'Fox News', group: 'US Broadcast' },
  { url: 'https://moxie.foxnews.com/google-publisher/world.xml', category: 'world', source: 'Fox News', group: 'US Broadcast' },
  { url: 'https://moxie.foxbusiness.com/google-publisher/latest.xml', category: 'business', source: 'Fox Business', group: 'US Broadcast' },
  { url: 'https://www.newsmax.com/rss/Newsfront/16/', category: 'us-tv', source: 'Newsmax', group: 'US Broadcast' },
  { url: 'https://www.oann.com/feed/', category: 'us-tv', source: 'OANN', group: 'US Broadcast' },

  // === 2. UNITED STATES: NEWSPAPERS & MAGAZINES ===
  { url: 'https://nypost.com/feed/', category: 'us-print', source: 'New York Post', group: 'US Print & Mags' },
  { url: 'https://www.washingtontimes.com/rss/headlines/news/politics/', category: 'us-print', source: 'The Washington Times', group: 'US Print & Mags' },
  { url: 'https://feeds.content.dowjones.io/public/rss/RSSOpinion', category: 'us-print', source: 'WSJ Opinion', group: 'US Print & Mags' },
  { url: 'https://feeds.content.dowjones.io/public/rss/RSSMarketsMain', category: 'business', source: 'Wall Street Journal', group: 'US Print & Mags' },
  { url: 'https://www.nationalreview.com/feed/', category: 'us-print', source: 'National Review', group: 'US Print & Mags' },
  { url: 'https://spectator.org/feed/', category: 'us-print', source: 'The American Spectator', group: 'US Print & Mags' },
  { url: 'https://reason.com/feed/', category: 'us-print', source: 'Reason', group: 'US Print & Mags' },
  { url: 'https://www.commentary.org/feed/', category: 'us-print', source: 'Commentary', group: 'US Print & Mags' },
  { url: 'https://www.theamericanconservative.com/feed/', category: 'us-print', source: 'The American Conservative', group: 'US Print & Mags' },
  { url: 'https://www.firstthings.com/rss/', category: 'us-print', source: 'First Things', group: 'US Print & Mags' },

  // === 3. UNITED STATES: DIGITAL NEWS & COMMENTARY SITES ===
  { url: 'https://www.dailywire.com/feeds/rss.xml', category: 'us-digital', source: 'The Daily Wire', group: 'US Digital' },
  { url: 'https://feeds.feedburner.com/breitbart', category: 'us-digital', source: 'Breitbart News', group: 'US Digital' },
  { url: 'https://dailycaller.com/feed/', category: 'us-digital', source: 'The Daily Caller', group: 'US Digital' },
  { url: 'https://www.washingtonexaminer.com/feed', category: 'us-digital', source: 'Washington Examiner', group: 'US Digital' },
  { url: 'https://freebeacon.com/feed/', category: 'us-digital', source: 'Washington Free Beacon', group: 'US Digital' },
  { url: 'https://thefederalist.com/feed/', category: 'us-digital', source: 'The Federalist', group: 'US Digital' },
  { url: 'https://townhall.com/rss/tipsheet/', category: 'us-digital', source: 'Townhall', group: 'US Digital' },
  { url: 'https://www.theblaze.com/feeds/feed.rss', category: 'us-digital', source: 'Blaze Media', group: 'US Digital' },
  { url: 'https://feed.theepochtimes.com/us/feed', category: 'us-digital', source: 'The Epoch Times', group: 'US Digital' },
  { url: 'https://www.dailysignal.com/feed/', category: 'us-digital', source: 'The Daily Signal', group: 'US Digital' },
  { url: 'https://thedispatch.com/feed/', category: 'us-digital', source: 'The Dispatch', group: 'US Digital' },
  { url: 'https://hotair.com/feed', category: 'us-digital', source: 'Hot Air', group: 'US Digital' },
  { url: 'https://redstate.com/feed', category: 'us-digital', source: 'RedState', group: 'US Digital' },
  { url: 'https://pjmedia.com/feed', category: 'us-digital', source: 'PJ Media', group: 'US Digital' },
  { url: 'https://www.westernjournal.com/feed/', category: 'us-digital', source: 'The Western Journal', group: 'US Digital' },
  { url: 'https://justthenews.com/rss.xml', category: 'us-digital', source: 'Just the News', group: 'US Digital' },

  // === 4. UNITED KINGDOM & IRELAND ===
  { url: 'https://www.telegraph.co.uk/rss.xml', category: 'uk', source: 'The Telegraph', group: 'UK & Ireland' },
  { url: 'https://www.dailymail.co.uk/articles.rss', category: 'uk', source: 'Daily Mail', group: 'UK & Ireland' },
  { url: 'https://www.gbnews.com/feeds/feed.rss', category: 'uk', source: 'GB News', group: 'UK & Ireland' },
  { url: 'https://www.express.co.uk/posts/rss/77/news', category: 'uk', source: 'Daily Express', group: 'UK & Ireland' },
  { url: 'https://www.thesun.co.uk/feed/', category: 'uk', source: 'The Sun', group: 'UK & Ireland' },
  { url: 'https://conservativehome.com/feed/', category: 'uk', source: 'ConservativeHome', group: 'UK & Ireland' },
  { url: 'https://www.spiked-online.com/feed/', category: 'uk', source: 'Spiked', group: 'UK & Ireland' },

  // === 5. EUROPE, CANADA & AUSTRALIA ===
  { url: 'https://www.lefigaro.fr/rss/figaro_actualites.xml', category: 'intl', source: 'Le Figaro', group: 'Europe · CA · AU' },
  { url: 'https://www.valeursactuelles.com/feed', category: 'intl', source: 'Valeurs Actuelles', group: 'Europe · CA · AU' },
  { url: 'https://www.welt.de/feeds/latest.rss', category: 'intl', source: 'Die Welt', group: 'Europe · CA · AU' },
  { url: 'https://www.bild.de/feed/alles.xml', category: 'intl', source: 'Bild', group: 'Europe · CA · AU' },
  { url: 'https://www.abc.es/rss/2.0/portada/', category: 'intl', source: 'ABC (Spain)', group: 'Europe · CA · AU' },
  { url: 'https://torontosun.com/feed', category: 'intl', source: 'Toronto Sun', group: 'Europe · CA · AU' },
  { url: 'https://thepostmillennial.com/rss', category: 'intl', source: 'The Post Millennial', group: 'Europe · CA · AU' },
];

// Google News RSS feeds for the 7 outlets whose direct RSS is gated/unavailable;
// fetched with gentle concurrency so Google News never throttles.
const GNEWS_FEEDS = [
  { url: 'https://news.google.com/rss/search?q=site:americasvoice.news&hl=en-US&gl=US&ceid=US:en', category: 'us-tv', source: "Real America's Voice", group: 'US Broadcast', isGoogleNews: true },
  { url: 'https://news.google.com/rss/search?q=site:talk.tv&hl=en-GB&gl=GB&ceid=GB:en', category: 'uk', source: 'TalkTV', group: 'UK & Ireland', isGoogleNews: true },
  { url: 'https://news.google.com/rss/search?q=site:spectator.co.uk&hl=en-GB&gl=GB&ceid=GB:en', category: 'uk', source: 'The Spectator', group: 'UK & Ireland', isGoogleNews: true },
  { url: 'https://news.google.com/rss/search?q=site:ilgiornale.it&hl=en-US&gl=US&ceid=US:en', category: 'intl', source: 'Il Giornale', group: 'Europe · CA · AU', isGoogleNews: true },
  { url: 'https://news.google.com/rss/search?q=site:nationalpost.com&hl=en-CA&gl=CA&ceid=CA:en', category: 'intl', source: 'National Post', group: 'Europe · CA · AU', isGoogleNews: true },
  { url: 'https://news.google.com/rss/search?q=site:skynews.com.au&hl=en-AU&gl=AU&ceid=AU:en', category: 'intl', source: 'Sky News Australia', group: 'Europe · CA · AU', isGoogleNews: true },
  { url: 'https://news.google.com/rss/search?q=site:theaustralian.com.au&hl=en-AU&gl=AU&ceid=AU:en', category: 'intl', source: 'The Australian', group: 'Europe · CA · AU', isGoogleNews: true },
];

const FALLBACK_IMAGES = {
  nepal: '/images/world-summit.svg',
  india: '/images/culture-architecture.svg',
  world: '/images/world-summit.svg',
  'us-tv': '/images/world-summit.svg',
  'us-print': '/images/markets-skyline.jpg',
  'us-digital': '/images/tech-semiconductor.svg',
  uk: '/images/culture-architecture.svg',
  intl: '/images/climate-offshore.svg',
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

function extractAtomLink(block) {
  const match = block.match(/<link[^>]+href=["']([^"']+)["']/i);
  return match ? match[1].replace(/&amp;/g, '&').trim() : '';
}

function extractRawTag(block, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = block.match(regex);
  return match ? match[1] : '';
}

function isUsableImageUrl(url) {
  if (!url || !/^https?:\/\//i.test(url)) return false;
  if (/feedburner|doubleclick|pixel|1x1|gravatar|ads\.|tracker|scorecardresearch|lh3\.googleusercontent\.com/i.test(url)) {
    return false;
  }
  return true;
}

function extractImage(block, category) {
  const candidates = [];

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

  const rawHtml = `${extractRawTag(block, 'content:encoded')} ${extractRawTag(block, 'description')} ${extractRawTag(block, 'summary')}`
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

async function fetchSingleFeed(feed, timeoutMs = 3800) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const itemMatches = xml.match(/<(?:item|entry)[\s>][\s\S]*?<\/(?:item|entry)>/gi) || [];

    const maxItems = feed.group === 'Nepal Press' || feed.group === 'India & Profit' || feed.group === 'New York Times' ? 5 : 4;

    return itemMatches
      .slice(0, maxItems)
      .map((itemXml, idx) => {
        let title = extractTag(itemXml, 'title');
        if (feed.isGoogleNews) {
          title = title.replace(/\s+[-–—|]\s+[^-–—|]{2,42}$/, '').trim();
        }
        const rawDesc = extractTag(itemXml, 'description') || extractTag(itemXml, 'summary');
        const link = extractTag(itemXml, 'link') || extractAtomLink(itemXml);
        const pubDateRaw =
          extractTag(itemXml, 'pubDate') ||
          extractTag(itemXml, 'published') ||
          extractTag(itemXml, 'updated') ||
          extractTag(itemXml, 'dc:date');
        const creator = extractTag(itemXml, 'dc:creator') || extractTag(itemXml, 'author');
        const parsedDate = pubDateRaw ? new Date(pubDateRaw) : new Date();
        const validIso = Number.isNaN(parsedDate.getTime())
          ? new Date().toISOString()
          : parsedDate.toISOString();

        if (!title || title.length < 10) return null;

        const { image, hasRealImage } = extractImage(itemXml, feed.category);
        const cleanDesc =
          !feed.isGoogleNews && rawDesc && rawDesc.length > 22 && rawDesc.toLowerCase() !== title.toLowerCase()
            ? rawDesc.slice(0, 320)
            : `Latest coverage from ${feed.source} (${feed.group}).`;

        const authorName =
          creator && creator.length > 2 && creator.length < 44 && !creator.includes('@') && !creator.includes('http')
            ? creator
            : feed.source;

        return {
          id: `wire-${slugify(feed.source)}-${slugify(title).slice(0, 24)}-${idx}`,
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
            `This live report is syndicated directly from ${feed.source} (${feed.group}) as part of MRDN News Portal's 24/7 automated newsroom.`,
            `Use the button below to read the full original coverage directly on ${feed.source}.`,
          ],
          views: 1400 + ((title.length * 137 + idx * 419 + feed.source.length * 91) % 9200),
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchGoogleNewsStaggered() {
  const collected = [];
  // Fetch in small waves of 2 to avoid Google News 429 rate-limiting
  for (let i = 0; i < GNEWS_FEEDS.length; i += 2) {
    const batch = GNEWS_FEEDS.slice(i, i + 2);
    const res = await Promise.allSettled(batch.map((f) => fetchSingleFeed(f, 3500)));
    for (const r of res) {
      if (r.status === 'fulfilled' && Array.isArray(r.value)) {
        collected.push(...r.value);
      }
    }
    if (i + 2 < GNEWS_FEEDS.length) {
      await new Promise((resolve) => setTimeout(resolve, 160));
    }
  }
  return collected;
}

function interleaveByGroup(articles) {
  const buckets = new Map();
  for (const a of articles) {
    const key = a.sourceGroup || a.sourceName || 'Other';
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(a);
  }

  for (const list of buckets.values()) {
    list.sort((a, b) => {
      const timeDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      if (Math.abs(timeDiff) > 8 * 3600 * 1000) return timeDiff;
      if (a.hasRealImage !== b.hasRealImage) return a.hasRealImage ? -1 : 1;
      return timeDiff;
    });
  }

  const groupPriority = [
    'US Broadcast',
    'Nepal Press',
    'New York Times',
    'India & Profit',
    'US Print & Mags',
    'UK & Ireland',
    'US Digital',
    'Europe · CA · AU',
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

  const [directResults, gnewsItems] = await Promise.all([
    Promise.allSettled(DIRECT_RSS_FEEDS.map((f) => fetchSingleFeed(f, 3800))),
    fetchGoogleNewsStaggered(),
  ]);

  const combined = [];
  const seenTitles = new Set();

  const pushUnique = (item) => {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 48);
    if (key && !seenTitles.has(key)) {
      seenTitles.add(key);
      combined.push(item);
    }
  };

  for (const res of directResults) {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      for (const item of res.value) pushUnique(item);
    }
  }
  for (const item of gnewsItems) pushUnique(item);

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
