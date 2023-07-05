'use client';

import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';

import { MessagesProvider } from '@/context/MessagesContext';
import { LoginModalProvider } from '@/context/LoginModalContext';
import { RegisterModalProvider } from '@/context/RegisterModalContext';
import AuthContext from '@/context/AuthContext';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext>
        <RegisterModalProvider>
          <LoginModalProvider>
            <MessagesProvider>{children}</MessagesProvider>
          </LoginModalProvider>
        </RegisterModalProvider>
      </AuthContext>
    </ThemeProvider>
  );
};

export default Providers;
