# Module Users

Module Users cung cấp các chức năng quản lý người dùng trong hệ thống Football Manager.

## Cấu trúc thư mục

```
users/
├── users.controller.ts  # Controller xử lý các request
├── users.service.ts     # Service xử lý logic nghiệp vụ
└── users.module.ts      # Module configuration
```

## API Endpoints

### Lấy thông tin người dùng theo ID

```
GET /users/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Cập nhật thông tin người dùng

```
PUT /users/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "name": "John Smith",
  "password": "newpassword123"
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "name": "John Smith",
  "role": "USER",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Xóa người dùng

```
DELETE /users/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

## Các thành phần chính

### UsersService

Service xử lý logic nghiệp vụ liên quan đến người dùng.

```typescript
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Tìm người dùng theo email
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Tìm người dùng theo ID
  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Tạo người dùng mới
  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
  }

  // Cập nhật thông tin người dùng
  async update(id: string, data: any) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // Xóa người dùng
  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
```

### UsersController

Controller xử lý các request liên quan đến người dùng.

```typescript
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "User found" })
  @ApiResponse({ status: 404, description: "User not found" })
  async findOne(@Param("id") id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  @ApiOperation({ summary: "Update user" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "User updated" })
  @ApiResponse({ status: 404, description: "User not found" })
  async update(@Param("id") id: string, @Body() updateUserDto: any) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Delete user" })
  @ApiParam({ name: "id", description: "User ID" })
  @ApiResponse({ status: 200, description: "User deleted" })
  @ApiResponse({ status: 404, description: "User not found" })
  async remove(@Param("id") id: string) {
    return this.usersService.delete(id);
  }
}
```

### UsersModule

Module configuration cho người dùng.

```typescript
@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
```

## Cách sử dụng

### Lấy thông tin người dùng

```typescript
// Trong một service khác
@Injectable()
export class SomeService {
  constructor(private readonly usersService: UsersService) {}

  async getUserInfo(userId: string) {
    const user = await this.usersService.findById(userId);
    // Xử lý thông tin người dùng
    return user;
  }
}
```

### Cập nhật thông tin người dùng

```typescript
// Trong một controller khác
@Controller('some-controller')
export class SomeController {
  constructor(private readonly usersService: UsersService) {}

  @Put('update-user/:id')
  async updateUser(@Param('id') id: string, @Body() updateData: any) {
    const updatedUser = await this.usersService.update(id, updateData);
    return updatedUser;
  }
}
```

## Lưu ý bảo mật

1. Mật khẩu được mã hóa bằng bcrypt trước khi lưu vào database
2. Các API endpoints đều được bảo vệ bởi JwtAuthGuard, yêu cầu người dùng phải đăng nhập
3. Nên thêm kiểm tra quyền để đảm bảo người dùng chỉ có thể cập nhật hoặc xóa thông tin của chính họ, trừ khi là admin 