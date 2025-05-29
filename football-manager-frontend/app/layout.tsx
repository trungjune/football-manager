import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Ant Design
import { ConfigProvider } from 'antd';
import theme from '@/lib/theme';

// Font
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Football Manager - Quản lý đội bóng sân 7',
  description: 'Ứng dụng quản lý đội bóng sân 7 toàn diện',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.variable}>
        <ConfigProvider theme={theme}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
} 