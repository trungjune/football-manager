# Tech Context: Football Manager

## Stack công nghệ

### Frontend
- **Framework**: Next.js phiên bản mới nhất
  - App Router
  - Server Components
  - Client Components
  - API Routes
- **State Management**: 
  - React Context API
  - Zustand
- **UI Framework**: 
  - Ant Design
  - Tailwind CSS
- **Form Handling**: 
  - React Hook Form
  - Zod (validation)
- **HTTP Client**: 
  - Axios
  - SWR (data fetching)
- **Authentication**: 
  - NextAuth.js
  - JWT

### Backend
- **Framework**: NestJS phiên bản mới nhất
- **Database**: 
  - PostgreSQL
  - TypeORM
- **Authentication & Authorization**: 
  - Passport.js
  - JWT
  - OAuth 2.0 (Google)
- **API Documentation**: 
  - Swagger/OpenAPI
- **Validation**: 
  - Class-validator
  - Class-transformer
- **Testing**: 
  - Jest
  - Supertest

### DevOps
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Deployment**: 
  - Vercel (Frontend)
  - Render/Railway (Backend)
- **Monitoring**: Sentry

## Cấu trúc dự án

### Frontend Structure
```
football-manager-frontend/
├── app/
│   ├── api/
│   ├── auth/
│   ├── dashboard/
│   ├── members/
│   ├── finance/
│   ├── matches/
│   ├── lineup/
│   ├── settings/
│   └── layout.tsx
├── components/
│   ├── common/
│   ├── auth/
│   ├── dashboard/
│   ├── members/
│   ├── finance/
│   ├── matches/
│   ├── lineup/
│   └── settings/
├── hooks/
├── lib/
├── services/
├── types/
├── utils/
└── public/
```

### Backend Structure
```
football-manager-backend/
├── src/
│   ├── auth/
│   ├── users/
│   ├── teams/
│   ├── members/
│   ├── finance/
│   ├── matches/
│   ├── lineup/
│   ├── common/
│   ├── config/
│   ├── app.module.ts
│   └── main.ts
├── test/
└── prisma/
```

## Quy ước và tiêu chuẩn

### Coding Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: AirBnB preset + custom rules
- **Prettier**: Consistent code formatting
- **Commit Convention**: Conventional Commits

### Naming Conventions
- **Files**: kebab-case
- **Components**: PascalCase
- **Functions**: camelCase
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Interfaces/Types**: PascalCase with 'I' prefix for interfaces

### Component Structure
- Functional components with TypeScript
- Props interface defined above component
- Custom hooks for reusable logic
- Separation of concerns (presentation vs. logic)

### API Conventions
- RESTful API design
- JSON response format
- Consistent error handling
- Versioning with /api/v1/

### Authentication Flow
- JWT-based authentication
- Refresh token mechanism
- Role-based access control
- OAuth integration with Google

## Công cụ phát triển
- **IDE**: VS Code with recommended extensions
- **API Testing**: Postman/Insomnia
- **Database Management**: DBeaver/pgAdmin
- **Design Collaboration**: Figma

## Quy trình phát triển
- **Agile Methodology**: Scrum with 2-week sprints
- **Version Control**: GitHub Flow
- **Code Reviews**: Required for all PRs
- **Testing**: Unit tests for critical functionality
- **Documentation**: README, API docs, and inline comments
