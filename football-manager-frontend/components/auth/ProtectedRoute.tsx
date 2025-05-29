'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from './AuthProvider';
import { Spin } from 'antd';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Nếu không còn loading và người dùng chưa đăng nhập
    if (!loading && !isAuthenticated()) {
      // Lưu lại đường dẫn hiện tại để sau khi đăng nhập có thể quay lại
      if (pathname !== '/auth/login' && pathname !== '/auth/register') {
        localStorage.setItem('redirectAfterLogin', pathname);
      }
      router.push('/auth/login');
    }
  }, [loading, isAuthenticated, router, pathname]);

  // Hiển thị loading khi đang kiểm tra trạng thái xác thực
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spin size="large" tip="Đang tải..." />
      </div>
    );
  }

  // Nếu đã xác thực, hiển thị nội dung
  return isAuthenticated() ? <>{children}</> : null;
};

export default ProtectedRoute; 