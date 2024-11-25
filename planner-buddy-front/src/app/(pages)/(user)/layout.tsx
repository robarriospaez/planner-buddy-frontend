import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <main className="w-full h-full min-h-screen flex items-center justify-center p-8 shadow-md bg-gradient-to-b from-violet-500 to-violet-200">
      {children}
    </main>
  );
}
