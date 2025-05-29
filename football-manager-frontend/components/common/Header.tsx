'use client';

import { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Space } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  UserOutlined, 
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useAuthContext } from '@/components/auth/AuthProvider';
import Link from 'next/link';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const items = [
    {
      key: 'profile',
      label: <Link href="/settings/profile">Thông tin cá nhân</Link>,
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: <Link href="/settings">Cài đặt</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: 'logout',
      label: <a onClick={handleLogout}>Đăng xuất</a>,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <AntHeader className="bg-white flex justify-between items-center px-4 shadow-sm">
      <div className="flex items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggle}
          className="mr-4"
        />
        <h1 className="text-lg font-semibold m-0">Football Manager</h1>
      </div>
      <div>
        <Dropdown menu={{ items }} placement="bottomRight">
          <Space className="cursor-pointer">
            <Avatar icon={<UserOutlined />} />
            <span>{user?.name || 'Người dùng'}</span>
          </Space>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header; 