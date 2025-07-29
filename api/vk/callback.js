export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).send("VK error: No code");

  const params = new URLSearchParams({
    client_id: "53969710",
    client_secret: "eRgb6bTJPom62dvQTXtE",
    redirect_uri: "https://vkid-demo.vercel.app/api/vk/callback",
    code,
  });

  const response = await fetch("https://api.vk.com/oauth/access_token?" + params.toString(), {
    method: "GET",
  });

  const data = await response.json();

  if (data.error) {
    return res.status(400).send("VK error: " + data.error_description);
  }

  res.setHeader("Set-Cookie", `vk_user_id=${data.user_id}; Path=/; HttpOnly; Secure; SameSite=Lax`);
  res.redirect("/lobby");
}
