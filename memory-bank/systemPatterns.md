# System Patterns: Football Manager

## Kiến trúc tổng thể

### Kiến trúc hệ thống
Football Manager được xây dựng theo kiến trúc microservices với frontend và backend tách biệt:

```
┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │
│    Frontend     │◄────►│     Backend     │
│    (Next.js)    │      │    (NestJS)     │
│                 │      │                 │
└─────────────────┘      └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │                 │
                         │   PostgreSQL    │
                         │   Database      │
                         │                 │
                         └─────────────────┘
```

### Luồng dữ liệu
```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│          │     │          │     │          │     │          │
│   User   │────►│ Frontend │────►│ Backend  │────►│ Database │
│          │     │          │     │          │     │          │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
     ▲                                                  │
     └──────────────────────────────────────────────────┘
```

## Mô hình dữ liệu

### Entity Relationship Diagram
```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    User     │       │    Team     │       │   Member    │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │       │ id          │       │ id          │
│ email       │◄──┐   │ name        │   ┌──►│ name        │
│ password    │   │   │ logo        │   │   │ position    │
│ name        │   │   │ city        │   │   │ number      │
│ avatar      │   └───┤ userId      │   │   │ teamId      │
│ createdAt   │       │ createdAt   │   │   │ role        │
│ updatedAt   │       │ updatedAt   │   │   │ phone       │
└─────────────┘       └─────────────┘   │   │ email       │
                            │           │   │ createdAt   │
                            │           │   │ updatedAt   │
                            ▼           │   └─────────────┘
                      ┌─────────────┐   │
                      │   Match     │   │
                      ├─────────────┤   │
                      │ id          │   │
                      │ teamId      │   │
                      │ opponent    │   │
                      │ date        │   │
                      │ location    │   │
                      │ score       │   │
                      │ result      │   │
                      │ createdAt   │   │
                      │ updatedAt   │   │
                      └─────────────┘   │
                            │           │
              ┌─────────────┴───────────┘
              │
              ▼
      ┌─────────────┐       ┌─────────────┐
      │  MatchStat  │       │  Finance    │
      ├─────────────┤       ├─────────────┤
      │ id          │       │ id          │
      │ matchId     │       │ teamId      │
      │ memberId    │       │ type        │
      │ goals       │       │ amount      │
      │ assists     │       │ description │
      │ yellowCards │       │ date        │
      │ redCards    │       │ memberId    │
      │ minutesPlayed│      │ createdAt   │
      │ createdAt   │       │ updatedAt   │
      │ updatedAt   │       └─────────────┘
      └─────────────┘
              │
              ▼
      ┌─────────────┐
      │   Lineup    │
      ├─────────────┤
      │ id          │
      │ teamId      │
      │ name        │
      │ formation   │
      │ positions   │
      │ matchId     │
      │ createdAt   │
      │ updatedAt   │
      └─────────────┘
```

## Các mẫu thiết kế

### Frontend Patterns

#### 1. Component-based Architecture
- Chia nhỏ UI thành các components tái sử dụng
- Sử dụng composition để kết hợp các components
- Phân tách rõ ràng giữa presentational và container components

#### 2. Custom Hooks
- Trích xuất logic phức tạp vào custom hooks
- Tái sử dụng logic giữa các components
- Ví dụ: `useAuth`, `useTeam`, `useMembers`, `useFinance`, `useMatches`, `useLineup`

#### 3. Context API + Zustand
- Sử dụng Context API cho state cục bộ giữa các components liên quan
- Sử dụng Zustand cho global state management
- Tách biệt state theo từng domain (auth, team, members, etc.)

#### 4. Server Components + Client Components
- Sử dụng Server Components cho các components không cần interactivity
- Sử dụng Client Components cho các components cần xử lý sự kiện người dùng
- Tối ưu hóa hiệu suất bằng cách giảm JavaScript gửi đến client

#### 5. Data Fetching Patterns
- Sử dụng SWR cho client-side data fetching với caching và revalidation
- Sử dụng Server Components cho server-side data fetching
- Implement optimistic updates cho UX tốt hơn

### Backend Patterns

#### 1. Module-based Architecture (NestJS)
- Chia code thành các modules theo domain
- Mỗi module có controllers, services, và DTOs riêng
- Sử dụng dependency injection để quản lý dependencies

#### 2. Repository Pattern
- Trừu tượng hóa data access layer
- Tách biệt business logic và database operations
- Dễ dàng thay đổi ORM hoặc database provider

#### 3. DTO (Data Transfer Objects)
- Xác định rõ ràng cấu trúc dữ liệu cho requests và responses
- Validation sử dụng class-validator
- Transformation sử dụng class-transformer

#### 4. Service Layer
- Chứa business logic
- Tách biệt controllers và repositories
- Dễ dàng unit testing

#### 5. Guards và Interceptors
- Sử dụng Guards cho authentication và authorization
- Sử dụng Interceptors cho logging, error handling, và response transformation

## Authentication Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│          │     │          │     │          │     │          │
│   User   │────►│ Frontend │────►│ Backend  │────►│ Database │
│          │     │          │     │          │     │          │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
     ▲               │  ▲             │                 │
     │               ▼  │             ▼                 │
     │         ┌──────────┐     ┌──────────┐           │
     │         │          │     │          │           │
     └─────────┤ NextAuth │◄────┤  JWT /   │◄──────────┘
               │          │     │  OAuth   │
               └──────────┘     └──────────┘
```

### Luồng đăng nhập
1. Người dùng nhập email và password
2. Frontend gửi credentials đến Backend API
3. Backend xác thực credentials và tạo JWT token
4. Token được trả về Frontend và lưu trữ
5. Frontend sử dụng token cho các API requests tiếp theo

### Luồng đăng nhập OAuth (Google)
1. Người dùng chọn "Đăng nhập với Google"
2. NextAuth chuyển hướng người dùng đến trang đăng nhập Google
3. Sau khi xác thực, Google chuyển hướng về callback URL với authorization code
4. Backend trao đổi code để lấy access token và thông tin người dùng
5. Backend tạo hoặc cập nhật user record và tạo JWT token
6. Token được trả về Frontend và lưu trữ

## Lineup System Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Lineup Editor  │────►│  Formation      │────►│  Player         │
│  Component      │     │  Manager        │     │  Positioning    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         ▼                      ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Canvas         │     │  Drag & Drop    │     │  Lineup         │
│  Renderer       │     │  System         │     │  Storage        │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Lineup Editor Components
1. **Formation Selection**: Cho phép người dùng chọn sơ đồ chiến thuật (4-3-3, 4-4-2, etc.)
2. **Player Assignment**: Gán cầu thủ vào các vị trí
3. **Field Customization**: Tùy chỉnh màu sắc, logo, tên đội
4. **Position Adjustment**: Điều chỉnh vị trí cầu thủ trên sân
5. **Substitutes Management**: Quản lý cầu thủ dự bị
6. **Share & Export**: Chia sẻ và xuất đội hình

## Finance Management System

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Transaction    │────►│  Finance        │────►│  Reporting      │
│  Entry          │     │  Service        │     │  Service        │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         ▼                      ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Validation     │     │  Categorization │     │  Visualization  │
│  System         │     │  System         │     │  Components     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Finance Management Components
1. **Transaction Entry**: Nhập thông tin thu/chi
2. **Fund Collection**: Quản lý việc thu quỹ từ thành viên
3. **Expense Tracking**: Theo dõi các khoản chi
4. **Financial Reports**: Báo cáo tài chính theo thời gian
5. **Member Contribution**: Theo dõi đóng góp của từng thành viên

## Match Management System

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Match          │────►│  Statistics     │────►│  Performance    │
│  Scheduler      │     │  Recorder       │     │  Analyzer       │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         ▼                      ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Calendar       │     │  Player Stats   │     │  Visualization  │
│  Integration    │     │  Tracker        │     │  Components     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Match Management Components
1. **Match Creation**: Tạo trận đấu mới
2. **Result Recording**: Ghi nhận kết quả trận đấu
3. **Player Statistics**: Thống kê chỉ số cầu thủ (bàn thắng, kiến tạo, thẻ)
4. **Team Statistics**: Thống kê chỉ số đội (thắng, hòa, thua)
5. **Performance Analysis**: Phân tích hiệu suất theo thời gian

## Member Management System

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Member         │────►│  Role           │────►│  Profile        │
│  Registry       │     │  Manager        │     │  Manager        │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                      │                       │
         ▼                      ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Contact        │     │  Attendance     │     │  Performance    │
│  Manager        │     │  Tracker        │     │  Evaluator      │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Member Management Components
1. **Member Registration**: Đăng ký thành viên mới
2. **Role Assignment**: Phân công vai trò (cầu thủ, huấn luyện viên, quản lý)
3. **Profile Management**: Quản lý thông tin cá nhân
4. **Contact Information**: Lưu trữ thông tin liên hệ
5. **Performance Tracking**: Theo dõi hiệu suất qua các trận đấu
