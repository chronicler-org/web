'use client';

import { FC, ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const PrivateLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className='container mx-auto'>
      <div className='navbar'>
        <a href='/' className='btn btn-ghost text-xl'>
          Chronicler
        </a>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default PrivateLayout;
