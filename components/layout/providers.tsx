'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import ReactQueryProvider from './react-query-provider';
// import { SessionProvider, SessionProviderProps } from 'next-auth/react';
export default function Providers({
  // session,
  children
}: {
  // session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
      <ReactQueryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </ReactQueryProvider>
    </>
  );
}
