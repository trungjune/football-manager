# Football Manager Backend

Backend API cho ứng dụng quản lý đội bóng sân 7 sử dụng NestJS, Prisma và PostgreSQL.

## Cấu trúc dự án

```
src/
├── auth/              # Xác thực người dùng
├── common/            # Các utility và decorator dùng chung
├── config/            # Cấu hình ứng dụng
├── finance/           # Module quản lý tài chính
├── lineup/            # Module quản lý đội hình
├── matches/           # Module quản lý trận đấu
├── members/           # Module quản lý thành viên
├── teams/             # Module quản lý đội
├── users/             # Module quản lý người dùng
├── app.module.ts      # Root module
└── main.ts            # Entry point
```

## API Endpoints

### Authentication
- `POST /auth/login` - Đăng nhập
- `POST /auth/register` - Đăng ký
- `GET /auth/profile` - Lấy thông tin người dùng hiện tại
- `GET /auth/google` - Đăng nhập bằng Google
- `GET /auth/google/callback` - Callback URL cho Google OAuth

### Users
- `GET /users` - Lấy danh sách người dùng
- `GET /users/:id` - Lấy thông tin người dùng
- `POST /users` - Tạo người dùng mới
- `PATCH /users/:id` - Cập nhật thông tin người dùng
- `DELETE /users/:id` - Xóa người dùng

### Teams
- `GET /teams` - Lấy danh sách đội
- `GET /teams/:id` - Lấy thông tin đội
- `POST /teams` - Tạo đội mới
- `PATCH /teams/:id` - Cập nhật thông tin đội
- `DELETE /teams/:id` - Xóa đội

### Members
- `GET /members` - Lấy danh sách thành viên
- `GET /members/:id` - Lấy thông tin thành viên
- `POST /members` - Tạo thành viên mới
- `PATCH /members/:id` - Cập nhật thông tin thành viên
- `DELETE /members/:id` - Xóa thành viên
- `POST /members/:id/attendance` - Điểm danh cho thành viên
- `GET /members/:id/attendance` - Lấy lịch sử điểm danh của thành viên

### Matches
- `GET /matches` - Lấy danh sách trận đấu
- `GET /matches/:id` - Lấy thông tin trận đấu
- `POST /matches` - Tạo trận đấu mới
- `PATCH /matches/:id` - Cập nhật thông tin trận đấu
- `DELETE /matches/:id` - Xóa trận đấu

### Finance
- `GET /finance` - Lấy danh sách giao dịch tài chính
- `GET /finance/:id` - Lấy thông tin giao dịch tài chính
- `POST /finance` - Tạo giao dịch tài chính mới
- `PATCH /finance/:id` - Cập nhật thông tin giao dịch tài chính
- `DELETE /finance/:id` - Xóa giao dịch tài chính
- `GET /finance/summary` - Lấy báo cáo tổng hợp tài chính

### Lineup
- `GET /lineup` - Lấy danh sách đội hình
- `POST /lineup/generate` - Tạo đội hình tối ưu dựa trên thành viên có mặt
- `POST /lineup/save` - Lưu đội hình

## Cài đặt và chạy dự án

### Yêu cầu
- Node.js 18+
- Docker và Docker Compose
- PostgreSQL

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Cấu hình môi trường
Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

Chỉnh sửa file `.env` với thông tin kết nối database và các cấu hình khác.

### Bước 3: Khởi động PostgreSQL
```bash
docker-compose up -d postgres
```

### Bước 4: Chạy migrations và seed data
```bash
npx prisma migrate dev
npx prisma db seed
```

### Bước 5: Chạy ứng dụng
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Swagger API Documentation
Truy cập Swagger API docs tại: http://localhost:3001/api/docs

## Prisma Studio
Để xem và quản lý dữ liệu trong database:
```bash
npx prisma studio
```
Truy cập Prisma Studio tại: http://localhost:5555

## Testing
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
``` 