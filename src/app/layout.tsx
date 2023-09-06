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
        <div className="flex h-full w-full">
          <Providers>
            <LoginModal />
            <RegisterModal />
            <ToastProvider />
            <Sidebar currentUser={currentUser} />
            <main className="w-full">
              <div className="py-2 pr-2 w-full h-full min-h-[100vh]">
                <div className="p-16 lg:rounded-lg shadow-sm md:dark:border h-full overflow-clip bg-clip-border border-border bg-background">
                  {children}
                </div>
              </div>
            </main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
