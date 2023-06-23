'use client';

import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';

import { MessagesProvider } from '@/app/context/MessagesContext';
import { LoginModalProvider } from '@/app/context/LoginModalContext';
import { RegisterModalProvider } from '@/app/context/RegisterModalContext';
import AuthContext from '@/app/context/AuthContext';
import { AddRecipeModalProvider } from '@/app/context/AddRecipeModal';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext>
        <RegisterModalProvider>
          <LoginModalProvider>
            <AddRecipeModalProvider>
              <MessagesProvider>{children}</MessagesProvider>
            </AddRecipeModalProvider>
          </LoginModalProvider>
        </RegisterModalProvider>
      </AuthContext>
    </ThemeProvider>
  );
};

export default Providers;
