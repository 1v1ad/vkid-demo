import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code) return res.status(400).json({ error: "Missing code" });

  try {
    const params = new URLSearchParams({
      client_id: process.env.VK_CLIENT_ID!,
      client_secret: process.env.VK_CLIENT_SECRET!,
      redirect_uri: process.env.VK_REDIRECT_URI!,
      code: code as string,
    });

    const tokenRes = await axios.get(`https://oauth.vk.com/access_token?${params.toString()}`);
    const data = tokenRes.data;
    return res.status(200).json({ token: data });
  } catch (err: any) {
    return res.status(500).json({ error: "OAuth failed", details: err.message });
  }
}