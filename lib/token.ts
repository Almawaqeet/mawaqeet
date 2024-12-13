import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { API_URL } from "@/environment-config";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${API_URL}auth/login/`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData?.error || `Request failed with status ${res.status}`);
          }

          const contentType = res.headers.get("content-type");
          if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Invalid response format from server");
          }

          const data = await res.json();

          if (!data) {
            throw new Error("No data received from server");
          }

          if (data?.access && data?.refresh) {
            return {
              id: data?.user_id?.toString() ?? "",
              email: data?.email ?? "",
              name: data?.full_name ?? "",
              accessToken: data?.access ?? "",
              refreshToken: data?.refresh ?? "",
              accountType: data?.account_type ?? "",
              fullName: data?.full_name ?? "",
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
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/login"
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 // 24 hours
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user?.accessToken ?? "";
        token.refreshToken = user?.refreshToken ?? "";
        token.accountType = user?.accountType ?? "";
        token.fullName = user?.fullName ?? "";
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          accessToken: token?.accessToken as string ?? "",
          refreshToken: token?.refreshToken as string ?? "",
          accountType: token?.accountType as string ?? "",
          fullName: token?.fullName as string ?? "",
        };
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },

  debug: process.env.NODE_ENV === "development"
};
