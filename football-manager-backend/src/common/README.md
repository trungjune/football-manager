# Module Common

Module Common chứa các utilities và services được sử dụng chung trong toàn bộ ứng dụng Football Manager.

## Cấu trúc thư mục

```
common/
├── prisma.service.ts  # Service kết nối với database qua Prisma ORM
└── ... (các utilities và decorators khác)
```

## PrismaService

PrismaService là một service cung cấp kết nối đến database thông qua Prisma ORM. Service này được sử dụng trong toàn bộ ứng dụng để thực hiện các thao tác với database.

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

### Các tính năng chính

1. **Kết nối tự động**: Service tự động kết nối đến database khi module được khởi tạo (`onModuleInit`).
2. **Ngắt kết nối tự động**: Service tự động ngắt kết nối khi module bị hủy (`onModuleDestroy`).
3. **Kế thừa từ PrismaClient**: Service kế thừa từ `PrismaClient`, do đó có thể sử dụng tất cả các phương thức của Prisma ORM.

### Cách sử dụng

#### Đăng ký service trong module

```typescript
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonModule {}
```

Hoặc đăng ký trực tiếp trong module cần sử dụng:

```typescript
import { Module } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
```

#### Sử dụng trong service

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
```

### Các lưu ý

1. **Sử dụng transactions**: Khi cần thực hiện nhiều thao tác liên quan đến nhau, nên sử dụng transactions để đảm bảo tính toàn vẹn của dữ liệu:

```typescript
async transferMoney(fromId: string, toId: string, amount: number) {
  return this.prisma.$transaction(async (prisma) => {
    // Trừ tiền từ tài khoản nguồn
    await prisma.account.update({
      where: { id: fromId },
      data: { balance: { decrement: amount } },
    });

    // Cộng tiền vào tài khoản đích
    await prisma.account.update({
      where: { id: toId },
      data: { balance: { increment: amount } },
    });

    // Ghi log giao dịch
    return prisma.transaction.create({
      data: {
        fromId,
        toId,
        amount,
        date: new Date(),
      },
    });
  });
}
```

2. **Xử lý lỗi**: Nên bắt và xử lý các lỗi từ Prisma một cách phù hợp:

```typescript
async findById(id: string) {
  try {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      // Xử lý lỗi Prisma
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    }
    throw error;
  }
}
```

3. **Sử dụng middleware**: Có thể sử dụng middleware của Prisma để thêm logic xử lý trước hoặc sau khi thực hiện các thao tác với database:

```typescript
// Trong constructor của PrismaService
constructor() {
  super();
  this.$use(async (params, next) => {
    // Ghi log trước khi thực hiện query
    console.log(`Executing ${params.model}.${params.action}`);
    const result = await next(params);
    // Ghi log sau khi thực hiện query
    console.log(`Executed ${params.model}.${params.action}`);
    return result;
  });
}
``` 