'use client';

import { ThemeProvider } from 'next-themes';
import { FC, ReactNode } from 'react';

import { LoginModalProvider } from '@/context/login-modal-context';
import { RegisterModalProvider } from '@/context/register-modal-context';
import AuthContext from '@/context/auth-context';
import { ChatProvider } from '@/context/chat-context';
import { UserPreferencesProvider } from '@/context/user-preferences-context';
import { WelcomeWizardProvider } from '@/context/welcome-wizard-context';
import { RecipeCompareProvider } from '@/context/recipe-compare-context';

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
