'use client';

import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';

import { LoginModalProvider } from '@/context/LoginModalContext';
import { RegisterModalProvider } from '@/context/RegisterModalContext';
import AuthContext from '@/context/AuthContext';
import { ChatProvider } from '@/context/ChatContext';
import { UserPreferencesProvider } from '@/context/UserPreferencesContext';
import { WelcomeWizardProvider } from '@/context/WelcomeWizardContext';
import { RecipeCompareProvider } from '@/context/RecipeCompareContext';

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext>
        <RegisterModalProvider>
          <LoginModalProvider>
            <UserPreferencesProvider>
              <WelcomeWizardProvider>
                <ChatProvider>
                  <RecipeCompareProvider>{children}</RecipeCompareProvider>
                </ChatProvider>
              </WelcomeWizardProvider>
            </UserPreferencesProvider>
          </LoginModalProvider>
        </RegisterModalProvider>
      </AuthContext>
    </ThemeProvider>
  );
};

export default Providers;
