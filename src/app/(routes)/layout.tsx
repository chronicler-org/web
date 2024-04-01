import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { FC, ReactNode } from 'react';

import { ReactQueryProvider } from '@/components/ReactQueryProvider';

import '@/styles/globals.css';

type RootLayoutProps = {
  children: ReactNode;
};

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chronicler',
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='pt'>
      <body className={font.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
