import { Figtree } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Themechanger from '@/components/theme-changer';
import Box from '@/components/ui/box';
import ToastProvider from '@/providers/toast-provider';
import LoginModal from '../components/auth/login-modal';
import RegisterModal from '../components/auth/register-modal';
import Sidebar from '../components/sidebar/sidebar';
import Providers from '../providers/providers';
import { getCurrentUser } from './_actions/user-actions';

export const metadata = {
  title: 'Baike',
  description: 'Recipe sharing app using ChatGPT',
  icons: {
    icon: '/images/baike_logo.png',
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
          <div className="flex gap-2 py-2 px-1 h-screen max-h-screen overflow-hidden">
            <Sidebar currentUser={currentUser} />
            <Box className="mb-2 flex flex-col w-full h-full overflow-y-scroll">
              <Header currentUser={currentUser} />
              <main className="flex-1 pb-4 px-6">{children}</main>
            </Box>
          </div>
          <Themechanger />
        </Providers>
      </body>
    </html>
  );
}
