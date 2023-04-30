import { Nunito } from 'next/font/google';

import './globals.css';
import ClientOnly from './components/ui/ClientOnly';
import LoginModal from './components/modals/LoginModal';
import Navbar from './components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';

export const metadata = {
  title: 'Baike',
  description: 'Recipe sharing app using ChatGPT',
};

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <LoginModal />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
