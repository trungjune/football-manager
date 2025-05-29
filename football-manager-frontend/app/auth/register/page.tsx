'use client';

import { useState } from 'react';
import { Button, Form, Input, Typography, Card, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { name: string; email: string; password: string; confirmPassword: string }) => {
    setLoading(true);
    try {
      // Implement registration logic here
      console.log('Register values:', values);
      message.success('Đăng ký thành công!');
    } catch (error) {
      console.error('Registration error:', error);
      message.error('Đăng ký thất bại. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
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
          onClick={() => {
            // Implement Google registration
            console.log('Google registration clicked');
          }}
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