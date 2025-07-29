
export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    // Если нет кода — возвращаем на главную
    res.writeHead(302, { Location: '/' });
    res.end();
    return;
  }

  const params = new URLSearchParams({
    client_id: '53969710',
    client_secret: 'eRgb6bTJPom62dvQTXtE',
    redirect_uri: 'https://vkid-demo.vercel.app/api/vk/callback',
    code
  });

  const response = await fetch('https://api.vk.com/oauth/token?' + params.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  if (!response.ok) {
    res.writeHead(302, { Location: '/' });
    res.end();
    return;
  }

  // Если авторизация успешна — редиректим на лобби
  res.writeHead(302, { Location: '/lobby.html' });
  res.end();
}
