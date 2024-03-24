import { Figtree } from 'next/font/google';

import './globals.css';
import LoginModal from '../components/auth/login-modal';
import RegisterModal from '../components/auth/register-modal';
import Providers from '../providers/providers';
import Sidebar from '../components/sidebar/sidebar';
import { getCurrentUser } from './_actions/user-actions';
import ToastProvider from '@/providers/toast-provider';
import Themechanger from '@/components/theme-changer';
import Header from '@/components/header';
import Box from '@/components/ui/box';

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
        <Providers>
          <LoginModal />
          <RegisterModal />
          <ToastProvider />
          <div className="flex">
            <Sidebar currentUser={currentUser} />
            <Box className="w-full my-2 mr-2">
              <Header currentUser={currentUser} />
              <div className="overflow-hidden overflow-y-auto min-h-screen">
                <main className="flex-1 overflow-y-auto py-2">{children}</main>
              </div>
            </Box>
          </div>
          <Themechanger />
        </Providers>
      </body>
    </html>
  );
}
