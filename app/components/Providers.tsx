'use client';

import { MessagesProvider } from '@/app/context/MessagesContext';
import { LoginModalProvider } from '@/app/context/LoginModalContext';
import { RegisterModalProvider } from '@/app/context/RegisterModalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RegisterModalProvider>
        <LoginModalProvider>
          <MessagesProvider>{children}</MessagesProvider>
        </LoginModalProvider>
      </RegisterModalProvider>
    </QueryClientProvider>
  );
};

export default Providers;
