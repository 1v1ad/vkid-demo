
export default function handler(req, res) {
  const cookie = req.headers.cookie || '';
  const hasSession = cookie.includes('session=');

  if (hasSession) {
    res.status(200).json({ ok: true });
  } else {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
}
