import { Nunito } from 'next/font/google';

import './globals.css';
import LoginModal from '../components/modals/LoginModal';
import RegisterModal from '../components/modals/RegisterModal';
import Providers from '../providers/Providers';
import Sidebar from '../components/sidebar/Sidebar';
import { getCurrentUser } from './_actions/user-actions';
import ToastProvider from '@/providers/ToastProvider';

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
              <div className="lg:py-2 lg:pr-2 grow">
                <div className="lg:rounded-lg shadow-sm md:dark:border h-full bg-clip-border border-border bg-background overflow-clip">
                  {children}
                </div>
              </div>
            </div>
          </Providers>
        </main>
      </body>
    </html>
  );
}
