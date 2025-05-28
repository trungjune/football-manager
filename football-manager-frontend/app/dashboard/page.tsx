'use client';

import { useState } from 'react';
import { Card, Row, Col, Statistic, Table, Button, Typography, Tag } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  CalendarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/common/MainLayout';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

interface MatchData {
  key: string;
  date: string;
  opponent: string;
  location: string;
  result: 'win' | 'loss' | 'draw' | 'upcoming';
  score?: string;
}

export default function DashboardPage() {
  // Mock data
  const [recentMatches] = useState<MatchData[]>([
    {
      key: '1',
      date: '15/11/2023',
      opponent: 'FC Barcelona',
      location: 'Sân vận động ABC',
      result: 'win',
      score: '3-1',
    },
    {
      key: '2',
      date: '08/11/2023',
      opponent: 'Real Madrid',
      location: 'Sân vận động XYZ',
      result: 'loss',
      score: '1-2',
    },
    {
      key: '3',
      date: '01/11/2023',
      opponent: 'Manchester United',
      location: 'Sân vận động ABC',
      result: 'draw',
      score: '2-2',
    },
    {
      key: '4',
      date: '25/12/2023',
      opponent: 'Liverpool FC',
      location: 'Sân vận động XYZ',
      result: 'upcoming',
    },
  ]);

  const columns: ColumnsType<MatchData> = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Đối thủ',
      dataIndex: 'opponent',
      key: 'opponent',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
      render: (result: string, record) => {
        if (result === 'win') {
          return <Tag color="green">Thắng {record.score}</Tag>;
        }
        if (result === 'loss') {
          return <Tag color="red">Thua {record.score}</Tag>;
        }
        if (result === 'draw') {
          return <Tag color="orange">Hòa {record.score}</Tag>;
        }
        return <Tag color="blue">Sắp diễn ra</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button type="link" size="small">
          {record.result === 'upcoming' ? 'Cập nhật' : 'Chi tiết'}
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="page-header">
        <Title level={2}>Tổng quan</Title>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Thành viên"
              value={24}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Trận thắng"
              value={15}
              valueStyle={{ color: '#3f8600' }}
              prefix={<TrophyOutlined />}
              suffix="/ 20"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Quỹ đội"
              value={5000000}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="VNĐ"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Trận sắp tới"
              value={3}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-8">
        <Card 
          title="Các trận đấu gần đây" 
          extra={<Button type="link">Xem tất cả</Button>}
        >
          <Table 
            columns={columns} 
            dataSource={recentMatches} 
            pagination={false} 
          />
        </Card>
      </div>

      <Row gutter={[16, 16]} className="mt-8">
        <Col xs={24} md={12}>
          <Card title="Top cầu thủ ghi bàn">
            {/* Top scorers content */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">1</div>
                <span>Nguyễn Văn A</span>
              </div>
              <div>10 bàn</div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">2</div>
                <span>Trần Văn B</span>
              </div>
              <div>8 bàn</div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">3</div>
                <span>Lê Văn C</span>
              </div>
              <div>6 bàn</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Đóng góp quỹ gần đây">
            {/* Recent contributions */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span>Nguyễn Văn A</span>
              </div>
              <div className="text-green-600">+500,000 VNĐ</div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span>Trần Văn B</span>
              </div>
              <div className="text-green-600">+300,000 VNĐ</div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span>Chi phí sân bóng</span>
              </div>
              <div className="text-red-600">-1,000,000 VNĐ</div>
            </div>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
} 