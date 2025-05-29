'use client';

import { useState } from 'react';
import { Button, Form, Input, Typography, Card, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      // Implement login logic here
      console.log('Login values:', values);
      message.success('Đăng nhập thành công!');
    } catch (error) {
      console.error('Login error:', error);
      message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <Title level={2}>Đăng nhập</Title>
          <Text type="secondary">Chào mừng trở lại với Football Manager</Text>
        </div>

        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between">
              <Link href="/auth/forgot-password" className="text-primary">
                Quên mật khẩu?
              </Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Hoặc</Divider>

        <Button
          icon={<GoogleOutlined />}
          size="large"
          block
          className="mb-4"
          onClick={() => {
            // Implement Google login
            console.log('Google login clicked');
          }}
        >
          Đăng nhập với Google
        </Button>

        <div className="text-center mt-4">
          <Text type="secondary">
            Chưa có tài khoản?{' '}
            <Link href="/auth/register" className="text-primary">
              Đăng ký ngay
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
} 