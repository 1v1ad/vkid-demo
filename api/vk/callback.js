export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send({ error: 'No code provided' });
  }

  const params = new URLSearchParams({
    client_id: '53969710',
    client_secret: 'eRgb6bTJPom62dvQTXtE',
    redirect_uri: 'https://vkid-demo.vercel.app/api/vk/callback',
    code,
  });

  try {
    const tokenRes = await fetch(`https://oauth.vk.com/access_token?${params}`);
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return res.status(400).send({ error: `VK error: ${tokenData.error_description || tokenData.error}` });
    }

    res.setHeader('Set-Cookie', `vk_user_id=${tokenData.user_id}; Path=/; HttpOnly; Secure; SameSite=Lax`);
    res.writeHead(302, { Location: '/lobby.html' });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error during VK callback' });
  }
}
