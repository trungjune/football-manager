'use client';

import React, { useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Select, Slider, Space, Typography, message, Spin } from 'antd';
import MainLayout from '@/components/common/MainLayout';
import { useAuthContext } from '@/components/auth/AuthProvider';
import { PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

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

const LineupPage: React.FC = () => {
  const { user } = useAuthContext();
  const [form] = Form.useForm();
  const [members, setMembers] = useState<Member[]>([]);
  const [numberOfTeams, setNumberOfTeams] = useState<number>(2);
  const [teamNames, setTeamNames] = useState<string[]>(['Đội 1', 'Đội 2']);
  const [generatedTeams, setGeneratedTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddMember = () => {
    const newMember: Member = {
      id: Date.now().toString(),
      name: '',
      skill: 3,
    };
    setMembers([...members, newMember]);
  };

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const handleMemberChange = (id: string, field: keyof Member, value: any) => {
    setMembers(
      members.map(member => 
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const handleNumberOfTeamsChange = (value: number) => {
    setNumberOfTeams(value);
    
    // Cập nhật danh sách tên đội
    const newTeamNames = [...teamNames];
    if (value > teamNames.length) {
      // Thêm tên đội mới
      for (let i = teamNames.length + 1; i <= value; i++) {
        newTeamNames.push(`Đội ${i}`);
      }
    } else {
      // Cắt bớt tên đội
      newTeamNames.length = value;
    }
    setTeamNames(newTeamNames);
  };

  const handleTeamNameChange = (index: number, name: string) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = name;
    setTeamNames(newTeamNames);
  };

  const handleGenerateTeams = async () => {
    try {
      // Kiểm tra xem có đủ thành viên không
      if (members.length < numberOfTeams) {
        message.error('Số lượng thành viên phải nhiều hơn số đội');
        return;
      }

      // Kiểm tra xem tất cả thành viên đã có tên chưa
      const emptyNameMember = members.find(member => !member.name.trim());
      if (emptyNameMember) {
        message.error('Tất cả thành viên phải có tên');
        return;
      }

      setLoading(true);

      // Gọi API để tạo đội
      const response = await fetch('/api/lineup/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.getFieldValue('name') || 'Chia đội ngẫu nhiên',
          members,
          numberOfTeams,
          teamNames,
        }),
      });

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi tạo đội');
      }

      const data = await response.json();
      setGeneratedTeams(data.teams);
      message.success('Chia đội thành công!');
    } catch (error) {
      console.error('Error generating teams:', error);
      message.error('Có lỗi xảy ra khi tạo đội');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Title level={2}>Chia đội ngẫu nhiên</Title>
      <Text className="mb-6 block">
        Công cụ chia đội ngẫu nhiên dựa trên kỹ năng của từng thành viên để tạo ra các đội cân bằng nhất có thể.
      </Text>

      <Card title="Thông tin chia đội" className="mb-6">
        <Form form={form} layout="vertical" initialValues={{ name: 'Chia đội ngẫu nhiên' }}>
          <Form.Item
            name="name"
            label="Tên đợt chia đội"
            rules={[{ required: true, message: 'Vui lòng nhập tên đợt chia đội' }]}
          >
            <Input placeholder="Nhập tên đợt chia đội" />
          </Form.Item>

          <Form.Item label="Số đội">
            <InputNumber
              min={2}
              max={10}
              value={numberOfTeams}
              onChange={(value) => handleNumberOfTeamsChange(value as number)}
            />
          </Form.Item>

          <Form.Item label="Tên các đội">
            <Space direction="vertical" style={{ width: '100%' }}>
              {teamNames.map((name, index) => (
                <Input
                  key={index}
                  value={name}
                  onChange={(e) => handleTeamNameChange(index, e.target.value)}
                  addonBefore={`Đội ${index + 1}`}
                />
              ))}
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Danh sách thành viên" className="mb-6">
        <div className="mb-4">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddMember}>
            Thêm thành viên
          </Button>
        </div>

        {members.length === 0 ? (
          <Text type="secondary">Chưa có thành viên nào. Vui lòng thêm thành viên.</Text>
        ) : (
          <div className="space-y-4">
            {members.map((member) => (
              <Card key={member.id} size="small" className="bg-gray-50">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Form.Item label="Tên" className="mb-0">
                      <Input
                        value={member.name}
                        onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                        placeholder="Tên thành viên"
                      />
                    </Form.Item>
                  </div>
                  <div className="w-full md:w-64">
                    <Form.Item label="Kỹ năng" className="mb-0">
                      <Slider
                        min={1}
                        max={5}
                        value={member.skill}
                        onChange={(value) => handleMemberChange(member.id, 'skill', value)}
                        marks={{
                          1: 'Yếu',
                          2: 'Trung bình',
                          3: 'Khá',
                          4: 'Giỏi',
                          5: 'Xuất sắc',
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="w-full md:w-48">
                    <Form.Item label="Vị trí" className="mb-0">
                      <Select
                        value={member.position}
                        onChange={(value) => handleMemberChange(member.id, 'position', value)}
                        placeholder="Chọn vị trí"
                        allowClear
                      >
                        <Option value="GK">Thủ môn</Option>
                        <Option value="DF">Hậu vệ</Option>
                        <Option value="MF">Tiền vệ</Option>
                        <Option value="FW">Tiền đạo</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="flex items-end">
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveMember(member.id)}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      <div className="mb-6">
        <Button
          type="primary"
          size="large"
          onClick={handleGenerateTeams}
          disabled={members.length < numberOfTeams}
          loading={loading}
        >
          Chia đội
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Spin size="large" />
          <div className="mt-4">Đang chia đội...</div>
        </div>
      ) : generatedTeams.length > 0 ? (
        <div>
          <Title level={3}>Kết quả chia đội</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generatedTeams.map((team, index) => (
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
                        <Tag color="blue" className="ml-2">
                          {member.position}
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
        </div>
      ) : null}
    </MainLayout>
  );
};

export default LineupPage; 