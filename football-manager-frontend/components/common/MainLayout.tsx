'use client';

import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  BarChartOutlined,
  WalletOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <BarChartOutlined />,
      label: 'Tổng quan',
    },
    {
      key: '/members',
      icon: <TeamOutlined />,
      label: 'Thành viên',
    },
    {
      key: '/matches',
      icon: <CalendarOutlined />,
      label: 'Trận đấu',
    },
    {
      key: '/lineup',
      icon: <UserOutlined />,
      label: 'Đội hình',
    },
    {
      key: '/finance',
      icon: <WalletOutlined />,
      label: 'Tài chính',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ',
      onClick: () => router.push('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt tài khoản',
      onClick: () => router.push('/settings/account'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: () => signOut({ redirect: true, callbackUrl: '/' }),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="light"
        className="border-r border-gray-200"
      >
        <div className="p-4 flex justify-center items-center">
          {collapsed ? (
            <div className="w-8 h-8 relative">
              <Image
                src="/images/logo-small.png"
                alt="Football Manager"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          ) : (
            <div className="w-full h-12 relative">
              <Image
                src="/images/logo.png"
                alt="Football Manager"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname || '']}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: <Link href={item.key}>{item.label}</Link>,
          }))}
        />
      </Sider>
      <Layout>
        <Header className="bg-white px-4 flex justify-between items-center border-b border-gray-200">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className="flex items-center">
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="flex items-center cursor-pointer">
                <span className="mr-2 hidden md:inline-block">Nguyễn Văn A</span>
                <Avatar icon={<UserOutlined />} />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="p-6">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 