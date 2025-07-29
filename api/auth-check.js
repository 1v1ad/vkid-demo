
export default function handler(req, res) {
  const cookie = req.headers.cookie || '';
  const hasSession = cookie.includes('session=');
  if (hasSession) {
    res.status(200).json({ ok: true });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
