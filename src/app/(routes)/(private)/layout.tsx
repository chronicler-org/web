import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { FC, ReactNode } from 'react';

import { nextAuthOptions } from '@/utils/nextAuthOptionsUtil';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = async ({ children }) => {
  const session = (await getServerSession(nextAuthOptions)) as Session;

  if (!session) redirect('/');

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default Layout;
