import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Enum replacements
const Position = {
  GOALKEEPER: "GOALKEEPER",
  DEFENDER: "DEFENDER",
  MIDFIELDER: "MIDFIELDER",
  FORWARD: "FORWARD",
};

const FinanceType = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
  CONTRIBUTION: "CONTRIBUTION",
};

async function main() {
  // Tạo admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user created:", admin);

  // Tạo team FC Vui Vẻ
  const team = await prisma.team.upsert({
    where: { id: "fc-vui-ve-id" },
    update: {},
    create: {
      id: "fc-vui-ve-id",
      name: "FC Vui Vẻ",
      description: "Đội bóng sân 7 FC Vui Vẻ",
      logo: "/images/logo.png",
    },
  });

  console.log("Team created:", team);

  // Gán admin vào team
  await prisma.user.update({
    where: { id: admin.id },
    data: { teamId: team.id },
  });

  // Tạo danh sách thành viên
  const members = [
    {
      name: "Nguyễn Văn A",
      position: Position.GOALKEEPER,
      phone: "0901234567",
      birthYear: 1990,
      rank: 4,
    },
    {
      name: "Trần Văn B",
      position: Position.DEFENDER,
      phone: "0901234568",
      birthYear: 1992,
      rank: 3,
    },
    {
      name: "Lê Văn C",
      position: Position.DEFENDER,
      phone: "0901234569",
      birthYear: 1991,
      rank: 4,
    },
    {
      name: "Phạm Văn D",
      position: Position.DEFENDER,
      phone: "0901234570",
      birthYear: 1993,
      rank: 3,
    },
    {
      name: "Hoàng Văn E",
      position: Position.MIDFIELDER,
      phone: "0901234571",
      birthYear: 1994,
      rank: 5,
    },
    {
      name: "Đỗ Văn F",
      position: Position.MIDFIELDER,
      phone: "0901234572",
      birthYear: 1995,
      rank: 4,
    },
    {
      name: "Ngô Văn G",
      position: Position.MIDFIELDER,
      phone: "0901234573",
      birthYear: 1992,
      rank: 3,
    },
    {
      name: "Vũ Văn H",
      position: Position.FORWARD,
      phone: "0901234574",
      birthYear: 1991,
      rank: 5,
    },
    {
      name: "Đặng Văn I",
      position: Position.FORWARD,
      phone: "0901234575",
      birthYear: 1990,
      rank: 4,
    },
    {
      name: "Bùi Văn J",
      position: Position.GOALKEEPER,
      phone: "0901234576",
      birthYear: 1989,
      rank: 3,
    },
    {
      name: "Lý Văn K",
      position: Position.DEFENDER,
      phone: "0901234577",
      birthYear: 1994,
      rank: 2,
    },
    {
      name: "Mai Văn L",
      position: Position.MIDFIELDER,
      phone: "0901234578",
      birthYear: 1993,
      rank: 3,
    },
    {
      name: "Chu Văn M",
      position: Position.FORWARD,
      phone: "0901234579",
      birthYear: 1992,
      rank: 4,
    },
    {
      name: "Dương Văn N",
      position: Position.DEFENDER,
      phone: "0901234580",
      birthYear: 1995,
      rank: 3,
    },
    {
      name: "Hồ Văn O",
      position: Position.MIDFIELDER,
      phone: "0901234581",
      birthYear: 1994,
      rank: 2,
    },
    {
      name: "Đinh Văn P",
      position: Position.FORWARD,
      phone: "0901234582",
      birthYear: 1993,
      rank: 3,
    },
    {
      name: "Lương Văn Q",
      position: Position.GOALKEEPER,
      phone: "0901234583",
      birthYear: 1991,
      rank: 4,
    },
  ];

  for (const memberData of members) {
    const member = await prisma.member.create({
      data: {
        ...memberData,
        teamId: team.id,
      },
    });
    console.log(`Created member: ${member.name}`);
  }

  // Tạo dữ liệu tài chính (đóng quỹ)
  const allMembers = await prisma.member.findMany({
    where: { teamId: team.id },
  });

  // Tạo dữ liệu đóng quỹ cho 5 tháng đầu năm 2025
  for (let month = 1; month <= 5; month++) {
    for (const member of allMembers) {
      // Giả sử mỗi thành viên đóng 200k mỗi tháng
      await prisma.finance.create({
        data: {
          type: FinanceType.CONTRIBUTION,
          amount: 200000,
          description: `Đóng quỹ tháng ${month}/2025`,
          month: month,
          year: 2025,
          date: new Date(2025, month - 1, 15), // Ngày 15 hàng tháng
          memberId: member.id,
          teamId: team.id,
        },
      });
    }
    console.log(`Created financial contributions for month ${month}/2025`);
  }

  console.log("Seeding completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
