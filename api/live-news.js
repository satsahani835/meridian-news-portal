import { getLiveNews } from '../server/newsApi.mjs';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const force = req.query?.refresh === '1';
    const payload = await getLiveNews(force);
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=900');
    res.status(200).json(payload);
  } catch {
    res.status(200).json({
      cached: false,
      fetchedAt: new Date().toISOString(),
      count: 0,
      articles: [],
    });
  }
}
