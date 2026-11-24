export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    note: 'Serverless ad telemetry active; view live aggregated analytics in THE MERIDIAN Ad Studio.',
    timestamp: new Date().toISOString(),
  });
}
