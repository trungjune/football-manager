'use client';

import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Tag, message, Spin, Divider } from 'antd';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/common/MainLayout';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Member {
  id: string;
  name: string;
  skill: number;
  position?: string;
}

interface Team {
  teamName: string;
  members: Member[];
  totalSkill: number;
}

interface TeamHistory {
  id: string;
  name: string;
  teams: Team[];
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

const TeamHistoryDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [teamHistory, setTeamHistory] = useState<TeamHistory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeamHistory = async () => {
      try {
        const response = await fetch(`/api/lineup/history/${params.id}`);
        if (!response.ok) {
          throw new Error('Có lỗi xảy ra khi lấy chi tiết lịch sử chia đội');
        }

        const data = await response.json();
        setTeamHistory(data);
      } catch (error) {
        console.error('Error fetching team history:', error);
        message.error('Có lỗi xảy ra khi lấy chi tiết lịch sử chia đội');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamHistory();
  }, [params.id]);

  const handleBack = () => {
    router.back();
  };

  const getPositionColor = (position?: string) => {
    switch (position) {
      case 'GK':
        return 'yellow';
      case 'DF':
        return 'blue';
      case 'MF':
        return 'green';
      case 'FW':
        return 'red';
      default:
        return 'default';
    }
  };

  const getPositionName = (position?: string) => {
    switch (position) {
      case 'GK':
        return 'Thủ môn';
      case 'DF':
        return 'Hậu vệ';
      case 'MF':
        return 'Tiền vệ';
      case 'FW':
        return 'Tiền đạo';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-8">
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (!teamHistory) {
    return (
      <MainLayout>
        <div className="text-center py-8">
          <Text>Không tìm thấy thông tin chia đội.</Text>
          <div className="mt-4">
            <Button type="primary" onClick={handleBack}>
              Quay lại
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
          Quay lại
        </Button>
      </div>

      <div className="mb-6">
        <Title level={2}>{teamHistory.name}</Title>
        <Text type="secondary">
          Ngày tạo: {new Date(teamHistory.createdAt).toLocaleDateString('vi-VN')}
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamHistory.teams.map((team, index) => (
          <Card
            key={index}
            title={
              <div className="flex justify-between items-center">
                <span>{team.teamName}</span>
                <Text type="secondary">Tổng kỹ năng: {team.totalSkill}</Text>
              </div>
            }
            className="mb-4"
          >
            {team.members.map((member, memberIndex) => (
              <div key={memberIndex} className="flex justify-between items-center py-2 border-b">
                <div>
                  <Text strong>{member.name}</Text>
                  {member.position && (
                    <Tag color={getPositionColor(member.position)} className="ml-2">
                      {getPositionName(member.position)}
                    </Tag>
                  )}
                </div>
                <div>
                  <Text type="secondary">Kỹ năng: {member.skill}</Text>
                </div>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default TeamHistoryDetailPage; 