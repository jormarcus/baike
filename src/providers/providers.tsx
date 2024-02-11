'use client';

import { FC, ReactNode } from 'react';

import { LoginModalProvider } from '@/context/login-modal-context';
import { RegisterModalProvider } from '@/context/register-modal-context';
import AuthContext from '@/context/auth-context';
import { ChatProvider } from '@/context/chat-context';
import { UserPreferencesProvider } from '@/context/user-preferences-context';
import { WelcomeWizardProvider } from '@/context/welcome-wizard-context';
import { RecipeCompareProvider } from '@/context/recipe-compare-context';
import { CollectionsProvider } from '@/context/collections-context';
import { ThemeProvider } from './theme-provider';

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
                  <RecipeCompareProvider>
                    <CollectionsProvider>{children}</CollectionsProvider>
                  </RecipeCompareProvider>
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
