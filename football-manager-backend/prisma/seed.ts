import { PrismaClient, MemberRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Tạo người dùng admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@fcvuive.com' },
    update: {},
    create: {
      email: 'admin@fcvuive.com',
      name: 'Admin FC Vui Vẻ',
      password: await bcrypt.hash('admin123', 10),
    },
  });

  console.log('Admin user created:', adminUser.id);

  // Tạo đội bóng FC Vui Vẻ
  const team = await prisma.team.upsert({
    where: { id: 'fc-vui-ve' },
    update: {},
    create: {
      id: 'fc-vui-ve',
      name: 'FC Vui Vẻ',
      city: 'Hà Nội',
      userId: adminUser.id,
    },
  });

  console.log('Team created:', team.id);

  // Dữ liệu thành viên từ Google Sheet
  const members = [
    {
      name: 'Nguyễn Hữu Phúc',
      role: MemberRole.CAPTAIN,
      position: 'Cánh/Thòng',
      birthYear: 1987,
      rank: 4,
      phone: '0969240487',
    },
    {
      name: 'Vũ Minh Hoàng',
      role: MemberRole.PLAYER,
      position: 'Gôn',
      birthYear: 1992,
      rank: 3,
      phone: '0948395333',
    },
    {
      name: 'Trịnh Hoàng Trung',
      role: MemberRole.PLAYER,
      position: 'Trên',
      birthYear: 1996,
      rank: 3,
      phone: '0376861794',
    },
    {
      name: 'Chu Thanh Quang',
      role: MemberRole.PLAYER,
      position: 'Giữa',
      birthYear: 2002,
      rank: 5,
    },
    {
      name: 'Giáp Văn Chiến',
      role: MemberRole.PLAYER,
      position: 'Thòng',
      birthYear: 2001,
      rank: 4,
      phone: '0397862092',
    },
    {
      name: 'Lê Công Hậu',
      role: MemberRole.PLAYER,
      position: 'Cánh',
      birthYear: 1995,
      rank: 4,
      phone: '0963359626',
    },
    {
      name: 'Nguyễn Anh Thắng',
      role: MemberRole.PLAYER,
      position: 'Gôn',
      birthYear: 2002,
      rank: 4,
    },
    {
      name: 'Nguyễn Minh Tuân',
      role: MemberRole.PLAYER,
      position: 'Thòng',
      birthYear: 1991,
      rank: 3,
      phone: '0889133991',
    },
    {
      name: 'Nguyễn Sỹ Hùng',
      role: MemberRole.PLAYER,
      position: 'Cánh/Trên',
      birthYear: 2002,
      rank: 4,
      phone: '0398570078',
    },
    {
      name: 'Đỗ Linh',
      role: MemberRole.PLAYER,
      position: 'Trên',
      birthYear: 2005,
      rank: 3,
      phone: '0819168381',
    },
    {
      name: 'Ngô Quốc Thắng',
      role: MemberRole.PLAYER,
      position: 'Cánh',
      birthYear: 2002,
      rank: 3,
      phone: '0986584592',
    },
    {
      name: 'Lê Đức Anh Dũng',
      role: MemberRole.PLAYER,
      position: 'Cánh/Thòng',
      birthYear: 2002,
      rank: 4,
      phone: '0372598603',
    },
    {
      name: 'Quân',
      role: MemberRole.PLAYER,
      position: 'Thòng',
      birthYear: 2001,
      rank: 4,
    },
    {
      name: 'Ngô Văn Tân',
      role: MemberRole.PLAYER,
      position: 'Trên',
      birthYear: 1986,
      rank: 3,
    },
    {
      name: 'Anh Cường',
      role: MemberRole.PLAYER,
      position: 'Gôn/Cánh',
      birthYear: 1990,
      rank: 2,
      phone: '0939483688',
    },
    {
      name: 'Đỗ Việt Hùng',
      role: MemberRole.PLAYER,
      position: 'Cánh/Giữa',
      birthYear: 1992,
      rank: 4,
    },
    {
      name: 'Bùi Bảo Ngọc',
      role: MemberRole.PLAYER,
      position: 'Cánh/Thòng',
      birthYear: 1993,
      rank: 3,
    },
  ];

  // Thêm các thành viên vào database
  for (const memberData of members) {
    const member = await prisma.member.create({
      data: {
        ...memberData,
        teamId: team.id,
      },
    });
    console.log(`Member created: ${member.name}`);
  }

  // Dữ liệu tài chính (đóng quỹ) từ Google Sheet
  const financialData = [
    // Tháng 1/2025
    { memberName: 'Nguyễn Hữu Phúc', amount: 200000, month: '01/2025' },
    { memberName: 'Vũ Minh Hoàng', amount: 200000, month: '01/2025' },
    { memberName: 'Trịnh Hoàng Trung', amount: 200000, month: '01/2025' },
    { memberName: 'Lê Công Hậu', amount: 200000, month: '01/2025' },
    { memberName: 'Nguyễn Anh Thắng', amount: 100000, month: '01/2025' },
    { memberName: 'Nguyễn Minh Tuân', amount: 200000, month: '01/2025' },
    { memberName: 'Nguyễn Sỹ Hùng', amount: 100000, month: '01/2025' },
    { memberName: 'Ngô Quốc Thắng', amount: 200000, month: '01/2025' },
    { memberName: 'Lê Đức Anh Dũng', amount: 100000, month: '01/2025' },
    { memberName: 'Anh Cường', amount: 200000, month: '01/2025' },
    { memberName: 'Đỗ Việt Hùng', amount: 200000, month: '01/2025' },

    // Tháng 2/2025
    { memberName: 'Nguyễn Hữu Phúc', amount: 200000, month: '02/2025' },
    { memberName: 'Vũ Minh Hoàng', amount: 200000, month: '02/2025' },
    { memberName: 'Trịnh Hoàng Trung', amount: 200000, month: '02/2025' },
    { memberName: 'Giáp Văn Chiến', amount: 200000, month: '02/2025' },
    { memberName: 'Lê Công Hậu', amount: 200000, month: '02/2025' },
    { memberName: 'Nguyễn Anh Thắng', amount: 100000, month: '02/2025' },
    { memberName: 'Nguyễn Minh Tuân', amount: 200000, month: '02/2025' },
    { memberName: 'Nguyễn Sỹ Hùng', amount: 200000, month: '02/2025' },
    { memberName: 'Đỗ Linh', amount: 100000, month: '02/2025' },
    { memberName: 'Ngô Quốc Thắng', amount: 200000, month: '02/2025' },
    { memberName: 'Lê Đức Anh Dũng', amount: 100000, month: '02/2025' },
    { memberName: 'Anh Cường', amount: 200000, month: '02/2025' },
    { memberName: 'Đỗ Việt Hùng', amount: 200000, month: '02/2025' },

    // Tháng 3/2025
    { memberName: 'Nguyễn Hữu Phúc', amount: 200000, month: '03/2025' },
    { memberName: 'Vũ Minh Hoàng', amount: 200000, month: '03/2025' },
    { memberName: 'Trịnh Hoàng Trung', amount: 200000, month: '03/2025' },
    { memberName: 'Giáp Văn Chiến', amount: 200000, month: '03/2025' },
    { memberName: 'Lê Công Hậu', amount: 200000, month: '03/2025' },
    { memberName: 'Nguyễn Anh Thắng', amount: 100000, month: '03/2025' },
    { memberName: 'Nguyễn Minh Tuân', amount: 200000, month: '03/2025' },
    { memberName: 'Nguyễn Sỹ Hùng', amount: 100000, month: '03/2025' },
    { memberName: 'Đỗ Linh', amount: 100000, month: '03/2025' },
    { memberName: 'Ngô Quốc Thắng', amount: 200000, month: '03/2025' },
    { memberName: 'Anh Cường', amount: 200000, month: '03/2025' },
    { memberName: 'Đỗ Việt Hùng', amount: 200000, month: '03/2025' },

    // Tháng 4/2025
    { memberName: 'Nguyễn Hữu Phúc', amount: 100000, month: '04/2025' },
    { memberName: 'Vũ Minh Hoàng', amount: 200000, month: '04/2025' },
    { memberName: 'Trịnh Hoàng Trung', amount: 200000, month: '04/2025' },
    { memberName: 'Giáp Văn Chiến', amount: 200000, month: '04/2025' },
    { memberName: 'Lê Công Hậu', amount: 200000, month: '04/2025' },
    { memberName: 'Nguyễn Anh Thắng', amount: 100000, month: '04/2025' },
    { memberName: 'Nguyễn Minh Tuân', amount: 200000, month: '04/2025' },
    { memberName: 'Nguyễn Sỹ Hùng', amount: 100000, month: '04/2025' },
    { memberName: 'Ngô Quốc Thắng', amount: 200000, month: '04/2025' },
    { memberName: 'Lê Đức Anh Dũng', amount: 200000, month: '04/2025' },
    { memberName: 'Quân', amount: 200000, month: '04/2025' },
    { memberName: 'Anh Cường', amount: 200000, month: '04/2025' },
    { memberName: 'Đỗ Việt Hùng', amount: 200000, month: '04/2025' },

    // Tháng 5/2025
    { memberName: 'Nguyễn Hữu Phúc', amount: 200000, month: '05/2025' },
    { memberName: 'Vũ Minh Hoàng', amount: 200000, month: '05/2025' },
    { memberName: 'Trịnh Hoàng Trung', amount: 200000, month: '05/2025' },
    { memberName: 'Giáp Văn Chiến', amount: 200000, month: '05/2025' },
    { memberName: 'Lê Công Hậu', amount: 200000, month: '05/2025' },
    { memberName: 'Ngô Quốc Thắng', amount: 200000, month: '05/2025' },
    { memberName: 'Lê Đức Anh Dũng', amount: 200000, month: '05/2025' },
    { memberName: 'Anh Cường', amount: 200000, month: '05/2025' },
    { memberName: 'Đỗ Việt Hùng', amount: 200000, month: '05/2025' },
    { memberName: 'Bùi Bảo Ngọc', amount: 200000, month: '05/2025' },
  ];

  // Thêm dữ liệu tài chính vào database
  for (const financeData of financialData) {
    const member = await prisma.member.findFirst({
      where: { name: financeData.memberName, teamId: team.id },
    });

    if (member) {
      await prisma.finance.create({
        data: {
          amount: financeData.amount,
          type: 'INCOME',
          description: `Đóng quỹ tháng ${financeData.month}`,
          month: financeData.month,
          date: new Date(`20${financeData.month.split('/')[1]}-${financeData.month.split('/')[0]}-01`),
          teamId: team.id,
          memberId: member.id,
        },
      });
    }
  }

  // Thêm một số khoản chi tiêu
  const expenses = [
    {
      amount: 1000000,
      description: 'Thuê sân tháng 1/2025',
      month: '01/2025',
      date: new Date('2025-01-15'),
    },
    {
      amount: 1000000,
      description: 'Thuê sân tháng 2/2025',
      month: '02/2025',
      date: new Date('2025-02-15'),
    },
    {
      amount: 1000000,
      description: 'Thuê sân tháng 3/2025',
      month: '03/2025',
      date: new Date('2025-03-15'),
    },
    {
      amount: 1000000,
      description: 'Thuê sân tháng 4/2025',
      month: '04/2025',
      date: new Date('2025-04-15'),
    },
    {
      amount: 500000,
      description: 'Mua bóng mới',
      month: '03/2025',
      date: new Date('2025-03-10'),
    },
    {
      amount: 300000,
      description: 'Nước uống',
      month: '04/2025',
      date: new Date('2025-04-05'),
    },
  ];

  // Thêm các khoản chi tiêu vào database
  for (const expense of expenses) {
    await prisma.finance.create({
      data: {
        amount: expense.amount,
        type: 'EXPENSE',
        description: expense.description,
        month: expense.month,
        date: expense.date,
        teamId: team.id,
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 