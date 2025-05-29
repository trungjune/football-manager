'use client';

import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  CalendarOutlined,
  FormOutlined,
  WalletOutlined,
  SettingOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Tổng quan</Link>,
    },
    {
      key: '/members',
      icon: <TeamOutlined />,
      label: <Link href="/members">Thành viên</Link>,
    },
    {
      key: '/matches',
      icon: <CalendarOutlined />,
      label: <Link href="/matches">Trận đấu</Link>,
    },
    {
      key: '/lineup',
      icon: <FormOutlined />,
      label: <Link href="/lineup">Đội hình</Link>,
    },
    {
      key: '/finance',
      icon: <WalletOutlined />,
      label: <Link href="/finance">Tài chính</Link>,
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link href="/settings">Cài đặt</Link>,
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="min-h-screen"
      theme="light"
    >
      <div className="h-16 flex items-center justify-center">
        <h1 className={`text-xl font-bold transition-opacity ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
          FM
        </h1>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar; 