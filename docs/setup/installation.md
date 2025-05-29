# Hướng dẫn cài đặt và cấu hình

## Yêu cầu hệ thống

- **Node.js**: v18.0.0 trở lên (khuyến nghị: v20.x)
- **PostgreSQL**: v14.0 trở lên
- **Git**: Bất kỳ phiên bản nào

## Cài đặt dự án

### 1. Clone repository

```bash
git clone https://github.com/yourusername/football-manager.git
cd football-manager
```

### 2. Cài đặt dependencies

#### Frontend

```bash
cd football-manager-frontend
npm install
```

#### Backend

```bash
cd ../football-manager-backend
npm install
```

### 3. Cấu hình môi trường

#### Frontend

Tạo file `.env.local` từ `.env.example`:

```bash
cd ../football-manager-frontend
cp .env.example .env.local
```

Chỉnh sửa file `.env.local` với các thông tin cần thiết:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
```

#### Backend

Tạo file `.env` từ `.env.example`:

```bash
cd ../football-manager-backend
cp .env.example .env
```

Chỉnh sửa file `.env` với các thông tin cần thiết:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/football_manager"
JWT_SECRET="your-jwt-secret-key"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="http://localhost:3000"
PORT=3001
NODE_ENV="development"
```

### 4. Cấu hình database

#### Tạo database

Đăng nhập vào PostgreSQL và tạo database:

```sql
CREATE DATABASE football_manager;
```

#### Chạy migrations

```bash
cd ../football-manager-backend
npx prisma migrate dev
```

### 5. Chạy ứng dụng

#### Chạy backend

```bash
cd ../football-manager-backend
npm run start:dev
```

Backend sẽ chạy tại: http://localhost:3001

#### Chạy frontend

```bash
cd ../football-manager-frontend
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

## Cấu hình nâng cao

### Cấu hình CORS

Nếu bạn cần thay đổi cấu hình CORS, hãy chỉnh sửa file `football-manager-backend/src/main.ts`:

```typescript
app.enableCors({
  origin: ['http://localhost:3000', 'https://your-production-domain.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});
```

### Cấu hình JWT

Nếu bạn cần thay đổi cấu hình JWT, hãy chỉnh sửa file `football-manager-backend/src/auth/auth.module.ts`:

```typescript
JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXPIRES_IN', '7d'),
    },
  }),
}),
```

### Cấu hình NextAuth

Nếu bạn cần thay đổi cấu hình NextAuth, hãy chỉnh sửa file `football-manager-frontend/app/api/auth/[...nextauth]/route.ts`.

## Triển khai (Deployment)

### Vercel

Dự án đã được cấu hình để triển khai trên Vercel. Xem chi tiết trong file `vercel.json`.

```bash
./auto-deploy.sh
```

### Docker

Dự án cũng có thể được triển khai bằng Docker. Xem chi tiết trong file `docker-compose.yml`.

```bash
docker-compose up -d
```

## Khắc phục sự cố

### Lỗi kết nối database

Nếu bạn gặp lỗi kết nối database, hãy kiểm tra:

1. Thông tin kết nối trong file `.env`
2. PostgreSQL đã được khởi động
3. Database đã được tạo

### Lỗi CORS

Nếu bạn gặp lỗi CORS, hãy kiểm tra:

1. Cấu hình CORS trong file `main.ts`
2. URL frontend đã được thêm vào danh sách origin
3. Credentials đã được bật

### Lỗi JWT

Nếu bạn gặp lỗi JWT, hãy kiểm tra:

1. JWT_SECRET đã được cấu hình đúng
2. Token chưa hết hạn
3. Token được gửi đúng định dạng trong header 