import { Nunito } from 'next/font/google';

import './globals.css';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import Providers from './components/Providers';
import Sidebar from './components/sidebar/Sidebar';
import { getCurrentUser } from './actions/user-actions';

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
      <Providers>
        <body className={`${font.className} dark:bg-gray-800`}>
          <div className="overflow-hidden w-full h-full relative flex">
            <LoginModal />
            <RegisterModal />
            <Sidebar currentUser={currentUser} />
            <div className="md:pb-0">{children}</div>
          </div>
        </body>
      </Providers>
    </html>
  );
}
