'use client';

import { BookBookmark } from '@phosphor-icons/react';
import { FC } from 'react';

type LogoProps = {
  className?: string;
};

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <h1 className={className}>
      <div className='flex items-center text-center'>
        <BookBookmark className='shrink-0' /> Chronicler
      </div>
    </h1>
  );
};

export default Logo;
