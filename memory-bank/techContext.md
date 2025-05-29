# Tech Context

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Library**: Ant Design
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Authentication**: NextAuth.js

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT, Passport
- **API Documentation**: Swagger
- **Validation**: class-validator, class-transformer

### DevOps
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend), Render (Backend)
- **Database Hosting**: Supabase

## Development Environment

### Prerequisites
- Node.js (v18+)
- npm/yarn/pnpm
- PostgreSQL
- Git

### Setup Instructions

#### Frontend
```bash
# Clone repository
git clone https://github.com/username/football-manager.git
cd football-manager/football-manager-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

#### Backend
```bash
# Navigate to backend directory
cd ../football-manager-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database
npm run prisma:seed

# Run development server
npm run start:dev
```

## API Documentation

API documentation is available via Swagger at `http://localhost:3001/api/docs` when running the backend locally.

## Authentication Flow

1. User logs in with email/password or OAuth provider
2. Backend validates credentials and generates JWT token
3. Token is stored in HTTP-only cookie or local storage
4. Token is sent with each API request in Authorization header
5. Backend validates token and authorizes requests

## Database Schema

The database schema is defined using Prisma and includes the following models:
- User
- Team
- Member
- Match
- Finance
- Attendance

See `football-manager-backend/prisma/schema.prisma` for the complete schema definition.

## Deployment

### Frontend (Vercel)
```bash
# Build
npm run build

# Deploy
vercel --prod
```

### Backend (Render)
```bash
# Build
npm run build

# Start
npm run start:prod
```

## Testing

### Frontend
```bash
# Run tests
npm test
```

### Backend
```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run test coverage
npm run test:cov
```

## Coding Standards

- Use ESLint and Prettier for code formatting
- Follow TypeScript best practices
- Write unit tests for critical functionality
- Use descriptive variable and function names
- Document complex functions and components
