# Football Manager - Ứng dụng quản lý đội bóng sân 7

Ứng dụng quản lý đội bóng sân 7 giúp các đội bóng quản lý thành viên, tài chính, lịch thi đấu và đội hình một cách hiệu quả.

## Tính năng chính

- **Quản lý thành viên**: Thêm, sửa, xóa thành viên, quản lý thông tin cá nhân và vị trí thi đấu
- **Quản lý tài chính**: Theo dõi thu chi, đóng góp của thành viên, báo cáo tài chính theo tháng/quý
- **Quản lý trận đấu**: Lên lịch thi đấu, ghi nhận kết quả, thống kê thành tích
- **Quản lý đội hình**: Sắp xếp đội hình tối ưu dựa trên thành viên có mặt
- **Điểm danh**: Theo dõi sự tham gia của các thành viên trong các buổi tập và trận đấu

## Công nghệ sử dụng

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Ant Design
- Tailwind CSS
- NextAuth.js

### Backend
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication

## Cài đặt và chạy dự án

### Yêu cầu
- Node.js 18+ 
- Docker và Docker Compose
- Git

### Bước 1: Clone dự án
```bash
git clone https://github.com/yourusername/football-manager.git
cd football-manager
```

### Bước 2: Khởi động database
```bash
docker-compose up -d postgres
```

### Bước 3: Cài đặt và chạy Backend
```bash
cd football-manager-backend
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

Backend sẽ chạy tại http://localhost:3001

### Bước 4: Cài đặt và chạy Frontend
```bash
cd football-manager-frontend
npm install
cp .env.example .env
npm run dev
```

Frontend sẽ chạy tại http://localhost:3000

### Bước 5: Truy cập pgAdmin (tùy chọn)
Truy cập http://localhost:5050 với thông tin đăng nhập:
- Email: admin@footballmanager.com
- Password: admin

## Tài khoản mặc định
- Email: admin@example.com
- Password: admin123

## Tài liệu
- [Frontend Documentation](./football-manager-frontend/README.md)
- [Backend Documentation](./football-manager-backend/README.md)

## Triển khai (Deployment)

Dự án này được cấu hình để triển khai tự động lên Vercel khi có thay đổi trên branch `main`.

### Triển khai tự động

1. Sử dụng script auto-deploy:
   ```bash
   ./auto-deploy.sh
   ```
   Script này sẽ tự động commit, push code lên GitHub và Vercel sẽ tự động build & deploy.

2. Theo dõi trạng thái deploy tại:
   [https://vercel.com/trungs-projects-4a25ad7a/football-manager](https://vercel.com/trungs-projects-4a25ad7a/football-manager)

### Cấu hình môi trường

1. **Vercel**:
   - Đã cấu hình trong file `vercel.json` để deploy cả frontend và backend trên cùng một domain.
   - Backend API có thể truy cập qua đường dẫn `/api/*`.
   - Frontend có thể truy cập trực tiếp tại domain chính.

2. **Biến môi trường**:
   - Các biến môi trường cần thiết đã được cấu hình trong Vercel Dashboard.
   - Tham khảo file `.env.example` trong thư mục frontend và backend để biết danh sách các biến môi trường cần thiết.

### Lưu ý quan trọng

- **KHÔNG** commit file `.env` chứa thông tin nhạy cảm lên GitHub.
- Cấu hình các biến môi trường nhạy cảm (như DATABASE_URL, JWT_SECRET) trực tiếp trong Vercel Dashboard.
- Đảm bảo database PostgreSQL đã được cấu hình và có thể truy cập từ Vercel.

## Giấy phép
[MIT License](LICENSE) 