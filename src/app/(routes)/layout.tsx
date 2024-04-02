import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { FC, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NextAuthSessionProvider } from '@/components/NextAuthSessionProvider';
import { ReactQueryProvider } from '@/components/ReactQueryProvider';

import '@/styles/globals.css';
import { AntdProvider } from '../components/AntdProvider';

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
        <ReactQueryProvider>
          <NextAuthSessionProvider>
            <AntdProvider>{children}</AntdProvider>
          </NextAuthSessionProvider>
        </ReactQueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
};

export default RootLayout;
