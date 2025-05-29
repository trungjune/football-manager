# Prisma Schema

Prisma Schema định nghĩa cấu trúc database cho ứng dụng Football Manager.

## Tổng quan

Schema được định nghĩa trong file `schema.prisma` và bao gồm các model sau:

- `User`: Người dùng hệ thống
- `Team`: Đội bóng
- `Member`: Thành viên đội bóng
- `Match`: Trận đấu
- `Finance`: Tài chính (thu/chi)
- `Attendance`: Điểm danh

## Cấu trúc Schema

### Cấu hình chung

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Model User

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  team      Team?    @relation(fields: [teamId], references: [id])
  teamId    String?
}
```

### Model Team

```prisma
model Team {
  id          String    @id @default(uuid())
  name        String
  description String?
  logo        String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  users       User[]
  members     Member[]
  matches     Match[]
  finances    Finance[]
}
```

### Model Member

```prisma
model Member {
  id         String     @id @default(uuid())
  name       String
  position   Position
  phone      String?
  birthYear  Int?
  rank       Int?       @default(3)
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
  team       Team       @relation(fields: [teamId], references: [id])
  teamId     String
  attendance Attendance[]
}
```

### Model Match

```prisma
model Match {
  id          String   @id @default(uuid())
  opponent    String
  date        DateTime
  location    String
  result      String?
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  team        Team     @relation(fields: [teamId], references: [id])
  teamId      String
}
```

### Model Finance

```prisma
model Finance {
  id          String       @id @default(uuid())
  type        FinanceType
  amount      Float
  description String?
  month       Int?
  year        Int?
  date        DateTime
  memberId    String?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  team        Team         @relation(fields: [teamId], references: [id])
  teamId      String
}
```

### Model Attendance

```prisma
model Attendance {
  id        String   @id @default(uuid())
  date      DateTime
  status    Boolean  @default(true)
  member    Member   @relation(fields: [memberId], references: [id])
  memberId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([memberId, date])
}
```

### Enums

```prisma
enum Role {
  USER
  ADMIN
}

enum Position {
  GOALKEEPER
  DEFENDER
  MIDFIELDER
  FORWARD
}

enum FinanceType {
  INCOME
  EXPENSE
  CONTRIBUTION
}
```

## Quan hệ giữa các model

### User - Team

- Mối quan hệ nhiều-một: Nhiều `User` có thể thuộc về một `Team`
- Field `teamId` trong `User` tham chiếu đến `id` của `Team`

### Team - Member

- Mối quan hệ một-nhiều: Một `Team` có nhiều `Member`
- Field `teamId` trong `Member` tham chiếu đến `id` của `Team`

### Team - Match

- Mối quan hệ một-nhiều: Một `Team` có nhiều `Match`
- Field `teamId` trong `Match` tham chiếu đến `id` của `Team`

### Team - Finance

- Mối quan hệ một-nhiều: Một `Team` có nhiều `Finance`
- Field `teamId` trong `Finance` tham chiếu đến `id` của `Team`

### Member - Attendance

- Mối quan hệ một-nhiều: Một `Member` có nhiều `Attendance`
- Field `memberId` trong `Attendance` tham chiếu đến `id` của `Member`

## Seeding Data

File `seed.ts` chứa script để tạo dữ liệu mẫu cho database. Script này tạo:

1. Admin user với thông tin đăng nhập mặc định
2. Đội bóng FC Vui Vẻ
3. Danh sách thành viên đội bóng
4. Dữ liệu tài chính (đóng quỹ) cho 5 tháng đầu năm 2025

### Chạy Seeding

```bash
npx prisma db seed
# hoặc
npm run prisma:seed
# hoặc
yarn prisma:seed
```

## Migrations

Để tạo migration khi thay đổi schema:

```bash
npx prisma migrate dev --name <tên_migration>
```

Để áp dụng migrations lên database:

```bash
npx prisma migrate deploy
```

## Prisma Studio

Để mở Prisma Studio, một GUI để xem và chỉnh sửa dữ liệu:

```bash
npx prisma studio
```

Prisma Studio sẽ chạy tại địa chỉ `http://localhost:5555`. 