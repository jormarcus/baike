'use client';

import { MessagesProvider } from '@/app/context/MessagesContext';
import { LoginModalProvider } from '@/app/context/LoginModalContext';
import { RegisterModalProvider } from '@/app/context/RegisterModalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';
import AuthContext from '../context/AuthContext';
import { AddRecipeModalProvider } from '../context/AddRecipeModal';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <RegisterModalProvider>
          <LoginModalProvider>
            <AddRecipeModalProvider>
              <MessagesProvider>{children}</MessagesProvider>
            </AddRecipeModalProvider>
          </LoginModalProvider>
        </RegisterModalProvider>
      </AuthContext>
    </QueryClientProvider>
  );
};

export default Providers;
