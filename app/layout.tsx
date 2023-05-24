import { Nunito } from 'next/font/google';

import './globals.css';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import Providers from './components/Providers';
import Sidebar from './components/Sidebar';
import getCurrentUser from './actions/getCurrentUser';

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
    <html lang="en">
      <Providers>
        <body className={font.className}>
          <LoginModal />
          <RegisterModal />
          <Sidebar currentUser={currentUser} />
          <div className="md:pb-0">{children}</div>
        </body>
      </Providers>
    </html>
  );
}
