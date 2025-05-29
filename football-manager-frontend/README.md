# Football Manager Frontend

Frontend cho ứng dụng quản lý đội bóng sân 7 sử dụng Next.js, TypeScript, Ant Design và Tailwind CSS.

## Cấu trúc dự án

```
app/
├── api/               # API routes (Next.js API)
├── auth/              # Trang đăng nhập và đăng ký
├── dashboard/         # Trang dashboard
├── finance/           # Trang quản lý tài chính
├── lineup/            # Trang quản lý đội hình
├── matches/           # Trang quản lý trận đấu
├── members/           # Trang quản lý thành viên
├── settings/          # Trang cài đặt
├── layout.tsx         # Root layout
└── page.tsx           # Trang chủ

components/
├── auth/              # Components liên quan đến xác thực
├── common/            # Components dùng chung
├── dashboard/         # Components cho trang dashboard
├── finance/           # Components cho trang tài chính
├── lineup/            # Components cho trang đội hình
├── matches/           # Components cho trang trận đấu
├── members/           # Components cho trang thành viên
└── settings/          # Components cho trang cài đặt

hooks/                 # Custom hooks
lib/                   # Thư viện và utilities
public/                # Static assets
services/              # API services
types/                 # TypeScript types
utils/                 # Utility functions
```

## Các trang chính

- **Trang chủ**: Giới thiệu ứng dụng
- **Đăng nhập/Đăng ký**: Xác thực người dùng
- **Dashboard**: Tổng quan về đội bóng
- **Thành viên**: Quản lý thành viên đội bóng
- **Trận đấu**: Quản lý lịch thi đấu và kết quả
- **Tài chính**: Quản lý thu chi và đóng góp
- **Đội hình**: Sắp xếp đội hình thi đấu
- **Cài đặt**: Cài đặt ứng dụng và tài khoản

## Công nghệ sử dụng

- **Next.js 14**: Framework React với App Router
- **TypeScript**: Typed JavaScript
- **Ant Design**: UI Component Library
- **Tailwind CSS**: Utility-first CSS framework
- **NextAuth.js**: Authentication
- **React Query**: Data fetching và caching
- **Zustand**: State management
- **React Hook Form**: Form handling
- **Zod**: Schema validation

## Cài đặt và chạy dự án

### Yêu cầu
- Node.js 18+
- npm hoặc yarn

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Cấu hình môi trường
Tạo file `.env.local` từ `.env.example`:
```bash
cp .env.example .env.local
```

Chỉnh sửa file `.env.local` với các cấu hình cần thiết.

### Bước 3: Chạy ứng dụng
```bash
# Development
npm run dev

# Production build
npm run build
npm run start
```

Frontend sẽ chạy tại: http://localhost:3000

## Tích hợp với Backend

Ứng dụng frontend kết nối với backend API tại địa chỉ được cấu hình trong file `.env.local`. Đảm bảo rằng backend API đang chạy trước khi sử dụng các tính năng yêu cầu dữ liệu từ server.

## Linting và Formatting

```bash
# Kiểm tra lỗi
npm run lint

# Định dạng code
npm run format
```

## Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests với Cypress
npm run test:e2e
```

## Triển khai

Ứng dụng có thể được triển khai trên Vercel hoặc các dịch vụ hosting khác hỗ trợ Next.js.

### Triển khai lên Vercel

```bash
npm run deploy
```

hoặc kết nối repository với Vercel để tự động triển khai khi có thay đổi. 