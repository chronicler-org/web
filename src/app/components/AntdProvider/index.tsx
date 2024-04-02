'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme } from 'antd';
import { FC, ReactNode } from 'react';

import { themeConfig } from '@/utils/themeConfig';

import '@/styles/globals.css';

type AntdProviderProps = {
  children: ReactNode;
};

export const AntdProvider: FC<AntdProviderProps> = ({ children }) => {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{ ...themeConfig, algorithm: theme.darkAlgorithm }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
};
