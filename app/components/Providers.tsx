'use client';

import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MessagesProvider } from '@/app/context/MessagesContext';
import { LoginModalProvider } from '@/app/context/LoginModalContext';
import { RegisterModalProvider } from '@/app/context/RegisterModalContext';
import AuthContext from '@/app/context/AuthContext';
import { AddRecipeModalProvider } from '@/app/context/AddRecipeModal';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default Providers;
