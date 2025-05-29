'use client';

import React, { useEffect, useState } from 'react';
import { Card, Table, Typography, Button, Tag, message, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/common/MainLayout';
import { useAuthContext } from '@/components/auth/AuthProvider';
import { HistoryOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface TeamHistory {
  id: string;
  name: string;
  teams: {
    teamName: string;
    members: {
      id: string;
      name: string;
      skill: number;
      position?: string;
    }[];
    totalSkill: number;
  }[];
  createdAt: string;
}

const TeamHistoryPage: React.FC = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [teamHistories, setTeamHistories] = useState<TeamHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeamHistories = async () => {
      try {
        if (!user) {
          message.info('Vui lòng đăng nhập để xem lịch sử chia đội');
          setLoading(false);
          return;
        }

        const response = await fetch('/api/lineup/history');
        if (!response.ok) {
          throw new Error('Có lỗi xảy ra khi lấy lịch sử chia đội');
        }

        const data = await response.json();
        setTeamHistories(data);
      } catch (error) {
        console.error('Error fetching team histories:', error);
        message.error('Có lỗi xảy ra khi lấy lịch sử chia đội');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamHistories();
  }, [user]);

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số đội',
      dataIndex: 'teams',
      key: 'teamCount',
      render: (teams: any[]) => teams.length,
    },
    {
      title: 'Số người chơi',
      dataIndex: 'teams',
      key: 'playerCount',
      render: (teams: any[]) => teams.reduce((acc, team) => acc + team.members.length, 0),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: unknown, record: TeamHistory) => (
        <Button
          type="primary"
          onClick={() => router.push(`/lineup/history/${record.id}`)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Lịch sử chia đội</Title>
        <Button
          type="primary"
          icon={<HistoryOutlined />}
          onClick={() => router.push('/lineup')}
        >
          Chia đội mới
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Spin size="large" />
        </div>
      ) : !user ? (
        <Card>
          <div className="text-center py-8">
            <Text>Vui lòng đăng nhập để xem lịch sử chia đội.</Text>
          </div>
        </Card>
      ) : teamHistories.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <Text>Bạn chưa có lịch sử chia đội nào.</Text>
            <div className="mt-4">
              <Button type="primary" onClick={() => router.push('/lineup')}>
                Chia đội ngay
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <Table
            dataSource={teamHistories}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      )}
    </MainLayout>
  );
};

export default TeamHistoryPage; 