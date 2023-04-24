import { Nunito } from 'next/font/google';

import './globals.css';

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
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
