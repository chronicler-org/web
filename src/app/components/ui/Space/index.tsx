import { Space as SpaceAntd, SpaceProps as SpaceAntdProps } from 'antd';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

export type SpaceProps = SpaceAntdProps & {};

export const Space: FC<SpaceProps> = ({ className, ...props }) => {
  return <SpaceAntd {...props} className={twMerge(className, '!w-full')} />;
};
