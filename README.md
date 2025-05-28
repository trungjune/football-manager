# Football Manager - Quản lý đội bóng sân 7

Ứng dụng web quản lý đội bóng sân 7 toàn diện, giúp người dùng quản lý đội bóng một cách chuyên nghiệp, từ thành viên, tài chính, lịch thi đấu đến sắp xếp đội hình ra sân.

## Tính năng chính

- **Quản lý thành viên**: Thêm, sửa, xóa thông tin thành viên, phân loại vai trò và quản lý hồ sơ cá nhân.
- **Quản lý tài chính**: Theo dõi thu chi, quản lý quỹ đội bóng và đóng góp của từng thành viên một cách minh bạch.
- **Lịch thi đấu**: Lên lịch thi đấu, ghi nhận kết quả và thống kê thành tích của đội bóng theo thời gian.
- **Sắp xếp đội hình**: Tạo và lưu các sơ đồ chiến thuật, sắp xếp vị trí cầu thủ trực quan trên sân.
- **Thống kê & phân tích**: Theo dõi và phân tích hiệu suất của đội bóng và từng cầu thủ qua các trận đấu.

## Dữ liệu đội bóng FC Vui Vẻ

Ứng dụng sử dụng dữ liệu thực tế từ đội bóng FC Vui Vẻ, bao gồm:

- **Thông tin thành viên**: Tên, vị trí, số điện thoại, năm sinh, xếp hạng kỹ năng
- **Dữ liệu tài chính**: Các khoản đóng góp hàng tháng của các thành viên
- **Lịch sử trận đấu**: Kết quả các trận đấu, đối thủ, địa điểm

Dữ liệu được lấy từ [Google Sheet của đội bóng FC Vui Vẻ](https://docs.google.com/spreadsheets/d/11ciG0J7gvy7xLj2rPCCY85qOI6TncNeslW9W1FO1znk/edit?gid=1493585539#gid=1493585539) và được import vào database thông qua script seeding.

## Công nghệ sử dụng

### Frontend
- **Framework**: Next.js phiên bản mới nhất
- **State Management**: React Context API, Zustand
- **UI Framework**: Ant Design, Tailwind CSS
- **Form Handling**: React Hook Form, Zod
- **HTTP Client**: Axios, SWR
- **Authentication**: NextAuth.js, JWT

### Backend
- **Framework**: NestJS phiên bản mới nhất
- **Database**: PostgreSQL, Prisma ORM
- **Authentication & Authorization**: Passport.js, JWT, OAuth 2.0 (Google)
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Class-validator, Class-transformer
- **Testing**: Jest, Supertest

## Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (>= 18.0.0)
- npm hoặc yarn
- PostgreSQL (>= 14.0)

### Cài đặt frontend
```bash
cd football-manager-frontend
npm install
# hoặc
yarn install
```

### Cài đặt backend
```bash
cd football-manager-backend
npm install
# hoặc
yarn install
```

### Cấu hình môi trường
1. Tạo file `.env` trong thư mục `football-manager-backend` dựa trên file `.env.example`
2. Cấu hình kết nối database và các biến môi trường khác

### Khởi tạo database và nhập dữ liệu
```bash
cd football-manager-backend
# Tạo các bảng trong database
npx prisma migrate dev
# Nhập dữ liệu từ Google Sheet vào database
npm run prisma:seed
```

### Chạy dự án trong môi trường development
```bash
# Terminal 1 - Frontend
cd football-manager-frontend
npm run dev
# hoặc
yarn dev

# Terminal 2 - Backend
cd football-manager-backend
npm run start:dev
# hoặc
yarn start:dev
```

### Build và triển khai
```bash
# Frontend
cd football-manager-frontend
npm run build
npm run start
# hoặc
yarn build
yarn start

# Backend
cd football-manager-backend
npm run build
npm run start:prod
# hoặc
yarn build
yarn start:prod
```

## Cấu trúc dự án

### Frontend
```
football-manager-frontend/
├── app/                   # Next.js App Router
│   ├── api/               # API Routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── members/           # Member management pages
│   ├── finance/           # Finance management pages
│   ├── matches/           # Match management pages
│   ├── lineup/            # Lineup management pages
│   ├── settings/          # Settings pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── common/            # Common components
│   ├── auth/              # Auth components
│   ├── dashboard/         # Dashboard components
│   └── ...
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── services/              # API service functions
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

### Backend
```
football-manager-backend/
├── src/
│   ├── auth/              # Authentication module
│   ├── users/             # Users module
│   ├── teams/             # Teams module
│   ├── members/           # Members module
│   ├── finance/           # Finance module
│   ├── matches/           # Matches module
│   ├── lineup/            # Lineup module
│   ├── common/            # Common utilities
│   ├── config/            # Configuration
│   ├── app.module.ts      # Root module
│   └── main.ts            # Entry point
├── prisma/                # Prisma schema and migrations
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seeding script (dữ liệu từ Google Sheet)
└── test/                  # Test files
```

## Database Schema

### User
- id: UUID (PK)
- email: String (unique)
- password: String (hashed)
- name: String
- avatar: String (optional)
- createdAt: DateTime
- updatedAt: DateTime

### Team
- id: UUID (PK)
- name: String
- logo: String (optional)
- city: String (optional)
- userId: UUID (FK -> User)
- createdAt: DateTime
- updatedAt: DateTime

### Member
- id: UUID (PK)
- name: String
- position: String (optional)
- number: Int (optional)
- phone: String (optional)
- email: String (optional)
- birthYear: Int (optional)
- role: Enum (ADMIN, MANAGER, COACH, PLAYER, CAPTAIN)
- rank: Int (1-5, đánh giá kỹ năng)
- teamId: UUID (FK -> Team)
- createdAt: DateTime
- updatedAt: DateTime

### Finance
- id: UUID (PK)
- amount: Float
- type: Enum (INCOME, EXPENSE)
- description: String (optional)
- month: String (format: MM/YYYY)
- date: DateTime
- teamId: UUID (FK -> Team)
- memberId: UUID (FK -> Member, optional)
- createdAt: DateTime
- updatedAt: DateTime

### Match
- id: UUID (PK)
- opponent: String
- date: DateTime
- location: String (optional)
- score: String (optional)
- result: Enum (WIN, LOSS, DRAW)
- teamId: UUID (FK -> Team)
- createdAt: DateTime
- updatedAt: DateTime

### MatchStat
- id: UUID (PK)
- goals: Int
- assists: Int
- yellowCards: Int
- redCards: Int
- minutesPlayed: Int
- matchId: UUID (FK -> Match)
- memberId: UUID (FK -> Member)
- createdAt: DateTime
- updatedAt: DateTime

### Lineup
- id: UUID (PK)
- name: String
- formation: String
- positions: JSON
- teamId: UUID (FK -> Team)
- matchId: UUID (FK -> Match, optional)
- createdAt: DateTime
- updatedAt: DateTime

### Attendance
- id: UUID (PK)
- status: Enum (PRESENT, ABSENT, LATE)
- matchId: UUID (FK -> Match)
- memberId: UUID (FK -> Member)
- createdAt: DateTime
- updatedAt: DateTime

## Tác giả

- Nhóm phát triển Football Manager

## License

MIT 