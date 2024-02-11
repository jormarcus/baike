import { Figtree } from 'next/font/google';

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

const font = Figtree({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en" className="dark bg-background" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <main className="h-full min-h-full w-full p-2">
          <Providers>
            <LoginModal />
            <RegisterModal />
            <ToastProvider />
            <div className="flex h-full min-h-[100vh]">
              <Sidebar>{children}</Sidebar>
            </div>
            <Themechanger />
          </Providers>
        </main>
      </body>
    </html>
  );
}
