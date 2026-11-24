// Vercel Serverless Function for Ad Monetization Telemetry Events
// Note: Ephemeral in-memory counters per serverless instance; client persists full session/lifetime metrics in localStorage.
const stats = {
  impressions: 0,
  clicks: 0,
  estimatedRevenue: 0,
  bySlot: {},
  lastUpdated: new Date().toISOString(),
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const evt = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const slotId = String(evt.slotId || 'unknown').slice(0, 64);
    if (!stats.bySlot[slotId]) {
      stats.bySlot[slotId] = { impressions: 0, clicks: 0, revenue: 0 };
    }
    const cpm = Number(evt.cpm) || 8.5;
    const cpc = Number(evt.cpc) || 0.65;

    if (evt.type === 'impression') {
      stats.impressions += 1;
      stats.bySlot[slotId].impressions += 1;
      const earned = cpm / 1000;
      stats.estimatedRevenue += earned;
      stats.bySlot[slotId].revenue += earned;
    } else if (evt.type === 'click') {
      stats.clicks += 1;
      stats.bySlot[slotId].clicks += 1;
      stats.estimatedRevenue += cpc;
      stats.bySlot[slotId].revenue += cpc;
    }
    stats.lastUpdated = new Date().toISOString();
  } catch {
    // Ignore malformed telemetry payload
  }

  res.status(200).json({ ok: true, stats });
}
