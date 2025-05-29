# Module Members

Module Members cung cấp các chức năng quản lý thành viên đội bóng trong hệ thống Football Manager.

## Cấu trúc thư mục

```
members/
├── dto/                  # Data Transfer Objects
│   ├── create-member.dto.ts    # DTO cho tạo thành viên
│   └── update-member.dto.ts    # DTO cho cập nhật thành viên
├── members.controller.ts # Controller xử lý các request
├── members.service.ts    # Service xử lý logic nghiệp vụ
└── members.module.ts     # Module configuration
```

## API Endpoints

### Lấy danh sách thành viên

```
GET /members
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

- `teamId`: ID của đội bóng (tùy chọn)

**Response:**

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Nguyễn Văn A",
    "position": "GOALKEEPER",
    "phone": "0901234567",
    "birthYear": 1990,
    "rank": 4,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "teamId": "223e4567-e89b-12d3-a456-426614174001"
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174002",
    "name": "Trần Văn B",
    "position": "DEFENDER",
    "phone": "0912345678",
    "birthYear": 1992,
    "rank": 3,
    "createdAt": "2023-01-02T00:00:00.000Z",
    "updatedAt": "2023-01-02T00:00:00.000Z",
    "teamId": "223e4567-e89b-12d3-a456-426614174001"
  }
]
```

### Lấy thông tin thành viên theo ID

```
GET /members/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Nguyễn Văn A",
  "position": "GOALKEEPER",
  "phone": "0901234567",
  "birthYear": 1990,
  "rank": 4,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001",
  "team": {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "name": "FC Vui Vẻ"
  },
  "attendance": [
    {
      "id": "323e4567-e89b-12d3-a456-426614174003",
      "date": "2023-01-15T00:00:00.000Z",
      "status": true
    }
  ]
}
```

### Tạo thành viên mới

```
POST /members
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "name": "Lê Văn C",
  "position": "MIDFIELDER",
  "phone": "0923456789",
  "birthYear": 1995,
  "rank": 3,
  "teamId": "223e4567-e89b-12d3-a456-426614174001"
}
```

**Response:**

```json
{
  "id": "323e4567-e89b-12d3-a456-426614174003",
  "name": "Lê Văn C",
  "position": "MIDFIELDER",
  "phone": "0923456789",
  "birthYear": 1995,
  "rank": 3,
  "createdAt": "2023-01-03T00:00:00.000Z",
  "updatedAt": "2023-01-03T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001"
}
```

### Cập nhật thông tin thành viên

```
PUT /members/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "name": "Lê Văn C",
  "phone": "0923456789",
  "rank": 4
}
```

**Response:**

```json
{
  "id": "323e4567-e89b-12d3-a456-426614174003",
  "name": "Lê Văn C",
  "position": "MIDFIELDER",
  "phone": "0923456789",
  "birthYear": 1995,
  "rank": 4,
  "createdAt": "2023-01-03T00:00:00.000Z",
  "updatedAt": "2023-01-03T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001"
}
```

### Xóa thành viên

```
DELETE /members/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "id": "323e4567-e89b-12d3-a456-426614174003",
  "name": "Lê Văn C",
  "position": "MIDFIELDER",
  "phone": "0923456789",
  "birthYear": 1995,
  "rank": 4,
  "createdAt": "2023-01-03T00:00:00.000Z",
  "updatedAt": "2023-01-03T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001"
}
```

## DTOs

### CreateMemberDto

```typescript
export class CreateMemberDto {
  @ApiProperty({ example: "Nguyễn Văn A", description: "Tên thành viên" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    example: "GOALKEEPER", 
    description: "Vị trí thi đấu",
    enum: Position,
    enumName: "Position"
  })
  @IsEnum(Position)
  @IsNotEmpty()
  position: Position;

  @ApiProperty({ example: "0901234567", description: "Số điện thoại" })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 1990, description: "Năm sinh" })
  @IsNumber()
  @IsOptional()
  birthYear?: number;

  @ApiProperty({ 
    example: 3, 
    description: "Xếp hạng kỹ năng (1-5)", 
    minimum: 1,
    maximum: 5
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  rank?: number;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "ID đội bóng" })
  @IsString()
  @IsNotEmpty()
  teamId: string;
}
```

### UpdateMemberDto

```typescript
export class UpdateMemberDto {
  @ApiProperty({ example: "Nguyễn Văn A", description: "Tên thành viên" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ 
    example: "GOALKEEPER", 
    description: "Vị trí thi đấu",
    enum: Position,
    enumName: "Position"
  })
  @IsEnum(Position)
  @IsOptional()
  position?: Position;

  @ApiProperty({ example: "0901234567", description: "Số điện thoại" })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 1990, description: "Năm sinh" })
  @IsNumber()
  @IsOptional()
  birthYear?: number;

  @ApiProperty({ 
    example: 3, 
    description: "Xếp hạng kỹ năng (1-5)", 
    minimum: 1,
    maximum: 5
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  rank?: number;

  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "ID đội bóng" })
  @IsString()
  @IsOptional()
  teamId?: string;
}
```

## MembersService

Service xử lý logic nghiệp vụ liên quan đến thành viên đội bóng.

```typescript
@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  // Lấy danh sách thành viên
  async findAll(teamId?: string) {
    const where = teamId ? { teamId } : {};
    return this.prisma.member.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }

  // Lấy thông tin thành viên theo ID
  async findById(id: string) {
    return this.prisma.member.findUnique({
      where: { id },
      include: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        attendance: {
          select: {
            id: true,
            date: true,
            status: true,
          },
          orderBy: { date: 'desc' },
          take: 10,
        },
      },
    });
  }

  // Tạo thành viên mới
  async create(data: CreateMemberDto) {
    return this.prisma.member.create({
      data,
    });
  }

  // Cập nhật thông tin thành viên
  async update(id: string, data: UpdateMemberDto) {
    return this.prisma.member.update({
      where: { id },
      data,
    });
  }

  // Xóa thành viên
  async delete(id: string) {
    // Xóa các bản ghi attendance liên quan
    await this.prisma.attendance.deleteMany({
      where: { memberId: id },
    });

    return this.prisma.member.delete({
      where: { id },
    });
  }
}
```

## MembersController

Controller xử lý các request liên quan đến thành viên đội bóng.

```typescript
@ApiTags("members")
@Controller("members")
@UseGuards(JwtAuthGuard)
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @ApiOperation({ summary: "Lấy danh sách thành viên" })
  @ApiQuery({ name: "teamId", required: false, description: "ID đội bóng" })
  @ApiResponse({ status: 200, description: "Danh sách thành viên" })
  async findAll(@Query("teamId") teamId?: string) {
    return this.membersService.findAll(teamId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Lấy thông tin thành viên theo ID" })
  @ApiParam({ name: "id", description: "Member ID" })
  @ApiResponse({ status: 200, description: "Thông tin thành viên" })
  @ApiResponse({ status: 404, description: "Không tìm thấy thành viên" })
  async findOne(@Param("id") id: string) {
    const member = await this.membersService.findById(id);
    if (!member) {
      throw new NotFoundException(`Không tìm thấy thành viên với ID ${id}`);
    }
    return member;
  }

  @Post()
  @ApiOperation({ summary: "Tạo thành viên mới" })
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({ status: 201, description: "Thành viên đã được tạo" })
  async create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Cập nhật thông tin thành viên" })
  @ApiParam({ name: "id", description: "Member ID" })
  @ApiBody({ type: UpdateMemberDto })
  @ApiResponse({ status: 200, description: "Thành viên đã được cập nhật" })
  @ApiResponse({ status: 404, description: "Không tìm thấy thành viên" })
  async update(@Param("id") id: string, @Body() updateMemberDto: UpdateMemberDto) {
    try {
      return await this.membersService.update(id, updateMemberDto);
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Không tìm thấy thành viên với ID ${id}`);
      }
      throw error;
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xóa thành viên" })
  @ApiParam({ name: "id", description: "Member ID" })
  @ApiResponse({ status: 200, description: "Thành viên đã được xóa" })
  @ApiResponse({ status: 404, description: "Không tìm thấy thành viên" })
  async remove(@Param("id") id: string) {
    try {
      return await this.membersService.delete(id);
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Không tìm thấy thành viên với ID ${id}`);
      }
      throw error;
    }
  }
}
```

## MembersModule

Module configuration cho thành viên đội bóng.

```typescript
@Module({
  imports: [],
  controllers: [MembersController],
  providers: [MembersService, PrismaService],
  exports: [MembersService],
})
export class MembersModule {}
```

## Cách sử dụng

### Lấy danh sách thành viên của một đội

```typescript
// Trong một service khác
@Injectable()
export class SomeService {
  constructor(private readonly membersService: MembersService) {}

  async getTeamMembers(teamId: string) {
    const members = await this.membersService.findAll(teamId);
    // Xử lý danh sách thành viên
    return members;
  }
}
```

### Tạo thành viên mới

```typescript
// Trong một controller khác
@Controller('some-controller')
export class SomeController {
  constructor(private readonly membersService: MembersService) {}

  @Post('create-member')
  async createMember(@Body() createMemberDto: CreateMemberDto) {
    const member = await this.membersService.create(createMemberDto);
    return member;
  }
}
```

## Lưu ý bảo mật

1. Tất cả các API endpoints đều được bảo vệ bởi JwtAuthGuard, yêu cầu người dùng phải đăng nhập
2. Nên thêm kiểm tra quyền để đảm bảo chỉ người dùng thuộc đội bóng mới có thể thực hiện các thao tác với thành viên của đội đó
3. Khi xóa thành viên, cần xóa các bản ghi liên quan (như attendance) để tránh lỗi khóa ngoại 