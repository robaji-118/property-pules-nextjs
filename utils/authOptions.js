import GithubProvider from "next-auth/providers/github";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      await connectDB();

      // cek user
      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name || profile.login,
          image: profile.avatar_url,
        });
      }

      return true; // ✅ ini betul
    },

    async session({ session }) {
      await connectDB();

      const user = await User.findOne({ email: session.user.email });

      // inject ke session
      session.user.id = user._id.toString();
      session.user.username = user.username;
      session.user.image = user.image; 

      return session; 
    },
  },
};
