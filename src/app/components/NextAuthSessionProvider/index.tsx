'use client';

import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

type NextAuthSessionProviderProps = {
  children: ReactNode;
};

export const NextAuthSessionProvider: FC<NextAuthSessionProviderProps> = ({
  children,
}) => {
  return <SessionProvider> {children}</SessionProvider>;
};
