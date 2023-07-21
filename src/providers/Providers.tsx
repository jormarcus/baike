'use client';

import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';

import { LoginModalProvider } from '@/context/LoginModalContext';
import { RegisterModalProvider } from '@/context/RegisterModalContext';
import AuthContext from '@/context/AuthContext';
import { ChatProvider } from '@/context/ChatContext';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext>
        <RegisterModalProvider>
          <LoginModalProvider>
            <ChatProvider>{children}</ChatProvider>
          </LoginModalProvider>
        </RegisterModalProvider>
      </AuthContext>
    </ThemeProvider>
  );
};

export default Providers;
