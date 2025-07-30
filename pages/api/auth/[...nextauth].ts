import NextAuth from "next-auth";
import VkProvider from "next-auth/providers/vk";

export default NextAuth({
  providers: [
    VkProvider({
      clientId: process.env.AUTH_VK_ID!,
      clientSecret: process.env.AUTH_VK_SECRET!,
    }),
  ],
});
