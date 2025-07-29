export default async function handler(req, res) {
  const { code, device_id } = req.query;

  if (!code || !device_id) {
    return res.status(400).json({ error: 'Missing code or device_id' });
  }

  try {
    const response = await fetch('https://api.vk.com/method/auth.exchangeCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        v: '5.131',
        client_id: '53969710',
        client_secret: 'eRgb6bTJPom62dvQTXtE',
        code,
        device_id,
        redirect_uri: 'https://vkid-demo.vercel.app/api/vk/callback'
      })
    });

    const json = await response.json();
    if (json.error) {
      return res.status(400).json({ error: 'VK error: ' + json.error.error_msg });
    }

    const userId = json.response.user_id || 'unknown';
    res.setHeader('Set-Cookie', `vk_user_id=${userId}; Path=/; HttpOnly; Secure; SameSite=Lax`);
    res.writeHead(302, { Location: '/lobby.html' });
    res.end();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error: ' + err.message });
  }
}