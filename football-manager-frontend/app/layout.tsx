'use client';

import { Inter } from 'next/font/google';
import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <SessionProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#1890ff',
                colorSuccess: '#52c41a',
                colorWarning: '#faad14',
                colorError: '#f5222d',
                colorInfo: '#1890ff',
                borderRadius: 4,
                fontFamily: inter.style.fontFamily,
              },
            }}
          >
            {children}
          </ConfigProvider>
        </SessionProvider>
      </body>
    </html>
  );
} 