import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      refreshToken?: string;
      accountType?: string;
      fullName?: string;
    };
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accountType?: string;
    fullName?: string;
  }

  interface User {
    id?: string;
    email?: string;
    name?: string;
    accessToken?: string;
    refreshToken?: string;
    accountType?: string;
    fullName?: string;
  }
}
