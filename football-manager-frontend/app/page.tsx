'use client';

import { Button, Typography } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="max-w-5xl w-full text-center">
        <Title level={1}>Football Manager</Title>
        <Title level={2} className="text-primary mt-2">Quản lý đội bóng sân 7</Title>
        
        <div className="my-8">
          <Paragraph className="text-lg">
            Ứng dụng web quản lý đội bóng sân 7 toàn diện, giúp người dùng quản lý đội bóng một cách chuyên nghiệp, 
            từ thành viên, tài chính, lịch thi đấu đến sắp xếp đội hình ra sân.
          </Paragraph>
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/auth/login">
            <Button type="primary" size="large">
              Đăng nhập
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="large">
              Đăng ký
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
} 