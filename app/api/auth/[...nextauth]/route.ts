import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AUTH_LOCAL_STORAGE_KEYS } from "@/constants/local-storage-keys";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login/`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            const errorText = await res.text();
            console.error("Error Response Text:", errorText);
            throw new Error(`Request failed with status ${res.status}: ${errorText}`);
          }

          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Invalid response format from server");
          }

          const data = await res.json();

          if (data?.access && data?.refresh) {
            if (typeof window !== "undefined") {
              localStorage.setItem(AUTH_LOCAL_STORAGE_KEYS.ACCESS, data.access);
              localStorage.setItem(AUTH_LOCAL_STORAGE_KEYS.REFRESH, data.refresh);
            }
            
            return {
              id: data?.user_id?.toString() ?? "",
              email: data?.email ?? "",
              name: data?.full_name ?? "",
              accessToken: data?.access,
              refreshToken: data?.refresh,
              accountType: data?.account_type,
              fullName: data?.full_name,
            };
          }

          return null;
        } catch (error: any) {
          console.error("Error in authorize function:", error);
          if (error.message?.includes("401")) {
            throw new Error("Invalid email or password");
          }
          throw new Error(error.message || "Authentication failed");
        }
      }

    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
          accountType: token.accountType as string,
          fullName: token.fullName as string,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accountType = user.accountType;
        token.fullName = user.fullName;
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
});

export { handler as GET, handler as POST };
