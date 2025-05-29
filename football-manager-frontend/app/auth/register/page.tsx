'use client';

import { useState } from 'react';
import { Button, Form, Input, Typography, Card, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth';

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { name: string; email: string; password: string; confirmPassword: string }) => {
    setLoading(true);
    try {
      // Remove confirmPassword as it's not needed for the API call
      const { confirmPassword, ...registerData } = values;
      await authService.register(registerData);
      message.success('Đăng ký thành công!');
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      message.error(
        error.response?.data?.message || 
        'Đăng ký thất bại. Vui lòng thử lại sau.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await authService.loginWithGoogle();
      // Không cần message success vì sẽ chuyển hướng đến Google
    } catch (error) {
      console.error('Google login error:', error);
      message.error('Đăng ký với Google thất bại. Vui lòng thử lại sau.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <Title level={2}>Đăng ký</Title>
          <Text type="secondary">Tạo tài khoản Football Manager mới</Text>
        </div>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Họ tên" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Xác nhận mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Hoặc</Divider>

        <Button
          icon={<GoogleOutlined />}
          size="large"
          block
          className="mb-4"
          onClick={handleGoogleLogin}
          loading={googleLoading}
        >
          Đăng ký với Google
        </Button>

        <div className="text-center mt-4">
          <Text type="secondary">
            Đã có tài khoản?{' '}
            <Link href="/auth/login" className="text-primary">
              Đăng nhập ngay
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}