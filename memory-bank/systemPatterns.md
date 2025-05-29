# System Patterns

## Kiến trúc hệ thống

Football Manager được xây dựng theo kiến trúc client-server với các thành phần chính:

1. **Frontend (Next.js)**: Giao diện người dùng, xử lý tương tác và hiển thị dữ liệu.
2. **Backend (NestJS)**: API server, xử lý logic nghiệp vụ và tương tác với database.
3. **Database (PostgreSQL)**: Lưu trữ dữ liệu của ứng dụng.

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │      │   Backend   │      │  Database   │
│  (Next.js)  │<────>│  (NestJS)   │<────>│(PostgreSQL) │
└─────────────┘      └─────────────┘      └─────────────┘
```

## Design Patterns

### Frontend Patterns

1. **Component-Based Architecture**: Ứng dụng được chia thành các components nhỏ, tái sử dụng được.
2. **Container/Presentation Pattern**: Tách biệt logic và UI để dễ dàng quản lý và test.
3. **Hooks Pattern**: Sử dụng React Hooks để quản lý state và side effects.
4. **Context API**: Quản lý global state cho các tính năng như authentication.
5. **Zustand Store**: Quản lý state phức tạp với Zustand.

### Backend Patterns

1. **Module-Based Architecture**: NestJS modules cho từng domain (users, teams, members, matches, finance, lineup).
2. **Repository Pattern**: Tách biệt logic truy cập database khỏi business logic.
3. **Dependency Injection**: Sử dụng DI của NestJS để quản lý dependencies.
4. **DTO Pattern**: Data Transfer Objects để validate và transform data.
5. **Guard Pattern**: Bảo vệ routes với JWT authentication.

## Cấu trúc thư mục

### Frontend

```
football-manager-frontend/
├── app/                  # Next.js App Router
│   ├── api/              # API Routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages
│   ├── finance/          # Finance management pages
│   ├── lineup/           # Lineup management pages
│   ├── matches/          # Matches management pages
│   ├── members/          # Members management pages
│   ├── settings/         # Settings pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # Reusable components
│   ├── auth/             # Authentication components
│   ├── common/           # Common components
│   ├── dashboard/        # Dashboard components
│   ├── finance/          # Finance components
│   ├── lineup/           # Lineup components
│   ├── matches/          # Matches components
│   ├── members/          # Members components
│   └── settings/         # Settings components
├── hooks/                # Custom hooks
├── lib/                  # Utility libraries
├── public/               # Static assets
├── services/             # API services
├── types/                # TypeScript types
└── utils/                # Utility functions
```

### Backend

```
football-manager-backend/
├── prisma/               # Prisma schema and migrations
├── src/
│   ├── auth/             # Authentication module
│   ├── common/           # Common utilities and decorators
│   ├── config/           # Configuration
│   ├── finance/          # Finance module
│   ├── lineup/           # Lineup module
│   ├── matches/          # Matches module
│   ├── members/          # Members module
│   ├── teams/            # Teams module
│   ├── users/            # Users module
│   ├── app.module.ts     # Root module
│   └── main.ts           # Entry point
└── test/                 # Tests
```

## Database Schema

Football Manager sử dụng Prisma ORM với PostgreSQL. Schema chính bao gồm:

1. **User**: Người dùng hệ thống
2. **Team**: Đội bóng
3. **Member**: Thành viên đội bóng
4. **Match**: Trận đấu
5. **Finance**: Tài chính (thu/chi)
6. **Attendance**: Điểm danh

Các mối quan hệ chính:
- User thuộc về một Team
- Team có nhiều Member
- Team có nhiều Match
- Team có nhiều Finance
- Member có nhiều Attendance

## Luồng xử lý chính

### Authentication Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Login   │────>│  Verify  │────>│ Generate │────>│  Return  │
│  Request │     │ Credentials│    │   JWT   │     │  Token   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
```

### Data Fetching Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────>│  API     │────>│ Database │────>│  Return  │
│  Request │     │ Endpoint │     │  Query   │     │   Data   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
```

### Data Mutation Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────>│ Validate │────>│  Update  │────>│  Return  │────>│  Update  │
│  Request │     │   Data   │     │ Database │     │ Response │     │   UI     │
└──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
```

## API Endpoints

API được tổ chức theo RESTful principles với các endpoints chính:

- `/api/auth`: Authentication endpoints
- `/api/users`: User management
- `/api/teams`: Team management
- `/api/members`: Member management
- `/api/matches`: Match management
- `/api/finance`: Finance management
- `/api/lineup`: Lineup management

## Quy tắc bảo mật

1. **JWT Authentication**: Bảo vệ API endpoints với JWT
2. **Role-Based Access Control**: Phân quyền theo vai trò (admin, user)
3. **Input Validation**: Validate tất cả input từ client
4. **HTTPS**: Sử dụng HTTPS cho tất cả communications
5. **Password Hashing**: Mã hóa password với bcrypt
