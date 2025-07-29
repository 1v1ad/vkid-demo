
export default async function handler(req, res) {
  const code = req.query.code;
  if (!code) return res.status(400).json({ error: 'Missing code' });

  try {
    const tokenRes = await fetch('https://api.vk.com/method/auth.exchangeCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        v: '5.131',
        client_id: '53969710',
        client_secret: 'eRgb6bTJPom62dvQTXtE',
        code,
        redirect_uri: 'https://vkid-demo.vercel.app/api/vk/callback',
      })
    });

    const json = await tokenRes.json();
    if (json.error) {
      return res.status(400).json({ error: 'VK error: ' + json.error.error_msg });
    }

    const userId = json.response.user_id;
    res.setHeader('Set-Cookie', `vk_user_id=${userId}; Path=/; HttpOnly`);
    res.redirect(302, '/lobby.html');
  } catch (err) {
    res.status(500).json({ error: 'Internal error: ' + err.message });
  }
}
