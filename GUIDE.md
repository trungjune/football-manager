# Hướng dẫn chạy dự án Football Manager

## 1. Cài đặt yêu cầu

- Node.js (>= 18.0.0): [Tải về từ đây](https://nodejs.org/)
- Docker Desktop: [Tải về từ đây](https://www.docker.com/products/docker-desktop/)
- Git: [Tải về từ đây](https://git-scm.com/downloads)

## 2. Clone dự án

```bash
git clone <repository_url>
cd football-manager
```

## 3. Khởi động Backend

```bash
cd football-manager-backend

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env

# Khởi động database
docker-compose up -d

# Chạy migrations và seed dữ liệu
npx prisma migrate dev --name init
npm run prisma:seed

# Khởi động server
npm run start:dev
```

Backend API sẽ chạy tại: http://localhost:3001
Swagger API docs: http://localhost:3001/api/docs

## 4. Khởi động Frontend

Mở một terminal mới:

```bash
cd football-manager-frontend

# Cài đặt dependencies
npm install

# Tạo file .env.local
cp .env.example .env.local

# Khởi động server
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

## 5. Đăng nhập

Sau khi khởi động cả backend và frontend, bạn có thể đăng nhập với tài khoản:

- Email: admin@example.com
- Password: admin123

## 6. Kiểm tra API

Để kiểm tra các API của backend, bạn có thể sử dụng script đã chuẩn bị sẵn:

```bash
cd football-manager-backend
./test-api.sh
```

## 7. Một số lưu ý

- Nếu gặp lỗi khi khởi động Docker, hãy đảm bảo Docker Desktop đang chạy
- Nếu gặp lỗi khi chạy migrations, hãy kiểm tra lại kết nối đến database trong file .env
- Nếu gặp lỗi EADDRINUSE, có thể port 3000 hoặc 3001 đã được sử dụng, hãy thay đổi port trong file .env

## 8. Các lệnh hữu ích

```bash
# Xem logs của database
docker-compose logs -f postgres

# Mở Prisma Studio để xem và chỉnh sửa dữ liệu
cd football-manager-backend
npx prisma studio

# Build backend cho production
cd football-manager-backend
npm run build
npm run start:prod

# Build frontend cho production
cd football-manager-frontend
npm run build
npm run start
``` 