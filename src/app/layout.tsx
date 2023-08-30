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
    <html lang="en" className="dark">
      <body>
        <Providers>
          <div className={`${font.className}`}>
            <div className="overflow-hidden w-[100vw] min-h-[100vh] flex">
              <LoginModal />
              <RegisterModal />
              <ToastProvider />
              <Sidebar currentUser={currentUser} />
              <div className="flex w-full h-full overflow-hidden flex-col">
                {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
