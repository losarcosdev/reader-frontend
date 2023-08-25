import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { UserResponse, UserServerSession } from "@/interfaces";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  callbacks: {
    async session({ token, session }: { token: any; session: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (token) {
        const body = {
          fullName: token.name,
          email: token.email,
          username: token.name,
          profileImage: token.picture,
        };

        try {
          const { data } = await axios.post<UserResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in/provider`,
            { ...body }
          );

          token.picture = data.profileImage;
          token.email = data.email;
          token.id = data.id;
          token.username = data.username;
          token.name = data.fullName;
          token.accessToken = data.token;
        } catch (error) {
          console.log(error);
        }
      }
      return token;
    },

    redirect() {
      return "/";
    },
  },
};

export const getAuthSession = () =>
  getServerSession(authOptions) as Promise<UserServerSession>;
