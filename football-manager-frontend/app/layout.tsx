import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { theme } from '../lib/theme';
import AuthProvider from '@/components/auth/AuthProvider';

// Cấu hình font Inter
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

// Metadata cho SEO
export const metadata: Metadata = {
  title: 'Football Manager - Quản lý đội bóng sân 7',
  description: 'Ứng dụng quản lý đội bóng sân 7 hiệu quả với các tính năng quản lý thành viên, tài chính, trận đấu và đội hình.',
  keywords: 'football, quản lý đội bóng, sân 7, quản lý thành viên, quản lý tài chính',
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
} 