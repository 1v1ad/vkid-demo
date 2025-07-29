export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  const params = new URLSearchParams({
    client_id: '53969710',
    client_secret: 'eRgb6bTJPom62dvQTXtE',
    redirect_uri: 'https://vkid-demo.vercel.app/api/vk/callback',
    code
  });

  const response = await fetch('https://api.vk.com/oauth/token?' + params.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const data = await response.json();

  if (data.error) {
    return res.status(400).json({ error: 'VK error: ' + data.error_description });
  }

  // Здесь можно установить куки или перенаправить
  res.setHeader('Set-Cookie', `vk_user_id=${data.user_id}; Path=/; HttpOnly`);
  res.redirect('/');
}