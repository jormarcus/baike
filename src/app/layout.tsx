import { Figtree } from 'next/font/google';
import './globals.css';
import Themechanger from '@/components/theme-changer';
import ToastProvider from '@/providers/toast-provider';
import LoginModal from '../components/auth/login-modal';
import RegisterModal from '../components/auth/register-modal';
import Providers from '../providers/providers';
import ResizableLayout from './(home)/_components/resizable-layout';

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
  return (
    <html lang="en" className="dark bg-background" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <Providers>
          <LoginModal />
          <RegisterModal />
          <ToastProvider />
          <ResizableLayout>{children}</ResizableLayout>
          <Themechanger />
        </Providers>
      </body>
    </html>
  );
}
