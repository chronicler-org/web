'use client';

import { theme } from 'antd';
import { FC, ReactNode, useState } from 'react';

import { Button, Layout, Menu } from '@/components/ui';

type LayoutProps = {
  children: ReactNode;
};

const { Header, Content, Sider } = Layout;

const PrivateLayout: FC<LayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              label: 'nav 1',
            },
            {
              key: '2',
              label: 'nav 2',
            },
            {
              key: '3',
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type='text'
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
