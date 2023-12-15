import { Nunito } from 'next/font/google';

import './globals.css';
import LoginModal from '../components/auth/login-modal';
import RegisterModal from '../components/auth/register-modal';
import Providers from '../providers/providers';
import Sidebar from '../components/sidebar/sidebar';
import { getCurrentUser } from './_actions/user-actions';
import ToastProvider from '@/providers/toast-provider';
import Themechanger from '@/components/theme-changer';

export const metadata = {
  title: 'Baike',
  description: 'Recipe sharing app using ChatGPT',
  icons: {
    icon: '/images/bake.png',
  },
};

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <main className="h-full">
          <Providers>
            <LoginModal />
            <RegisterModal />
            <ToastProvider />
            <div className="flex h-full min-h-[100vh]">
              <Sidebar currentUser={currentUser} />
              <div className="py-2 pr-2 grow">
                <div className="rounded-lg shadow-sm border dark:border h-full bg-clip-border border-neutral-600 bg-background overflow-hidden">
                  {children}
                </div>
              </div>
            </div>
            <Themechanger />
          </Providers>
        </main>
      </body>
    </html>
  );
}
