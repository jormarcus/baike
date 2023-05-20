import { Nunito } from 'next/font/google';

import './globals.css';
import ClientOnly from './components/ui/ClientOnly';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import Providers from './components/Providers';

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
      <Providers>
        <body className={font.className}>
          {/* <ClientOnly> */}
          <LoginModal />
          <RegisterModal />
          {/* </ClientOnly> */}
          <div className="md:pb-0">{children}</div>
        </body>
      </Providers>
    </html>
  );
}
