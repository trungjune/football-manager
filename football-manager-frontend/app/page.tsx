'use client';

import { Button, Typography, Space, Card, Row, Col } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const { Title, Paragraph } = Typography;

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <Row gutter={[32, 32]} align="middle">
            <Col xs={24} md={12}>
              <Title className="text-white mb-6">
                Football Manager - Quản lý đội bóng sân 7 chuyên nghiệp
              </Title>
              <Paragraph className="text-white text-lg mb-8">
                Giải pháp toàn diện giúp bạn quản lý đội bóng một cách chuyên nghiệp, từ thành viên, tài chính, lịch thi đấu đến sắp xếp đội hình ra sân.
              </Paragraph>
              <Space>
                <Button type="primary" size="large" onClick={() => router.push('/auth/register')}>
                  Đăng ký ngay
                </Button>
                <Button size="large" onClick={() => router.push('/auth/login')}>
                  Đăng nhập
                </Button>
              </Space>
            </Col>
            <Col xs={24} md={12} className="text-center">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/images/hero-image.png"
                  alt="Football Manager"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-12">
            Tính năng nổi bật
          </Title>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="text-center mb-4">
                    {feature.icon}
                  </div>
                  <Title level={4} className="text-center mb-4">
                    {feature.title}
                  </Title>
                  <Paragraph className="text-center">
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <Title level={2} className="mb-6">
            Sẵn sàng nâng tầm đội bóng của bạn?
          </Title>
          <Paragraph className="text-lg mb-8 max-w-2xl mx-auto">
            Đăng ký ngay hôm nay và trải nghiệm cách quản lý đội bóng chuyên nghiệp!
          </Paragraph>
          <Button type="primary" size="large" onClick={() => router.push('/auth/register')}>
            Bắt đầu ngay - Miễn phí!
          </Button>
        </div>
      </section>
    </main>
  );
}

// Dữ liệu tính năng
const features = [
  {
    title: 'Quản lý thành viên',
    description: 'Theo dõi thông tin chi tiết của từng thành viên, phân loại vai trò và quản lý hồ sơ cá nhân.',
    icon: <div className="text-4xl">👥</div>,
  },
  {
    title: 'Quản lý tài chính',
    description: 'Theo dõi thu chi, quản lý quỹ đội bóng và đóng góp của từng thành viên một cách minh bạch.',
    icon: <div className="text-4xl">💰</div>,
  },
  {
    title: 'Lịch thi đấu',
    description: 'Lên lịch thi đấu, ghi nhận kết quả và thống kê thành tích của đội bóng theo thời gian.',
    icon: <div className="text-4xl">🗓️</div>,
  },
  {
    title: 'Sắp xếp đội hình',
    description: 'Tạo và lưu các sơ đồ chiến thuật, sắp xếp vị trí cầu thủ trực quan trên sân.',
    icon: <div className="text-4xl">⚽</div>,
  },
  {
    title: 'Thống kê & phân tích',
    description: 'Theo dõi và phân tích hiệu suất của đội bóng và từng cầu thủ qua các trận đấu.',
    icon: <div className="text-4xl">📊</div>,
  },
  {
    title: 'Truyền thông nội bộ',
    description: 'Kênh liên lạc nội bộ giúp thông báo lịch tập, trận đấu và các hoạt động của đội.',
    icon: <div className="text-4xl">📱</div>,
  },
]; 