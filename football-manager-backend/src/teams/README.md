# Module Teams

Module Teams cung cấp các chức năng quản lý đội bóng trong hệ thống Football Manager.

## Cấu trúc thư mục

```
teams/
├── dto/                # Data Transfer Objects
│   ├── create-team.dto.ts    # DTO cho tạo đội bóng
│   └── update-team.dto.ts    # DTO cho cập nhật đội bóng
├── teams.controller.ts  # Controller xử lý các request
├── teams.service.ts     # Service xử lý logic nghiệp vụ
└── teams.module.ts      # Module configuration
```

## API Endpoints

### Lấy danh sách đội bóng

```
GET /teams
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "FC Vui Vẻ",
    "description": "Đội bóng sân 7 FC Vui Vẻ",
    "logo": "/images/logo.png",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "name": "FC Hạnh Phúc",
    "description": "Đội bóng sân 7 FC Hạnh Phúc",
    "logo": "/images/logo2.png",
    "createdAt": "2023-01-02T00:00:00.000Z",
    "updatedAt": "2023-01-02T00:00:00.000Z"
  }
]
```

### Lấy thông tin đội bóng theo ID

```
GET /teams/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "FC Vui Vẻ",
  "description": "Đội bóng sân 7 FC Vui Vẻ",
  "logo": "/images/logo.png",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "users": [
    {
      "id": "323e4567-e89b-12d3-a456-426614174002",
      "email": "admin@example.com",
      "name": "Admin",
      "role": "ADMIN"
    }
  ],
  "members": [
    {
      "id": "423e4567-e89b-12d3-a456-426614174003",
      "name": "Nguyễn Văn A",
      "position": "GOALKEEPER",
      "phone": "0901234567",
      "birthYear": 1990,
      "rank": 4
    }
  ]
}
```

### Tạo đội bóng mới

```
POST /teams
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "name": "FC Hạnh Phúc",
  "description": "Đội bóng sân 7 FC Hạnh Phúc",
  "logo": "/images/logo2.png"
}
```

**Response:**

```json
{
  "id": "223e4567-e89b-12d3-a456-426614174001",
  "name": "FC Hạnh Phúc",
  "description": "Đội bóng sân 7 FC Hạnh Phúc",
  "logo": "/images/logo2.png",
  "createdAt": "2023-01-02T00:00:00.000Z",
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

### Cập nhật thông tin đội bóng

```
PUT /teams/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "name": "FC Hạnh Phúc 2023",
  "description": "Đội bóng sân 7 FC Hạnh Phúc - Mùa giải 2023"
}
```

**Response:**

```json
{
  "id": "223e4567-e89b-12d3-a456-426614174001",
  "name": "FC Hạnh Phúc 2023",
  "description": "Đội bóng sân 7 FC Hạnh Phúc - Mùa giải 2023",
  "logo": "/images/logo2.png",
  "createdAt": "2023-01-02T00:00:00.000Z",
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

### Xóa đội bóng

```
DELETE /teams/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "id": "223e4567-e89b-12d3-a456-426614174001",
  "name": "FC Hạnh Phúc 2023",
  "description": "Đội bóng sân 7 FC Hạnh Phúc - Mùa giải 2023",
  "logo": "/images/logo2.png",
  "createdAt": "2023-01-02T00:00:00.000Z",
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

## DTOs

### CreateTeamDto

```typescript
export class CreateTeamDto {
  @ApiProperty({ example: "FC Vui Vẻ", description: "Tên đội bóng" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Đội bóng sân 7 FC Vui Vẻ", description: "Mô tả đội bóng" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: "/images/logo.png", description: "Logo đội bóng" })
  @IsString()
  @IsOptional()
  logo?: string;
}
```

### UpdateTeamDto

```typescript
export class UpdateTeamDto {
  @ApiProperty({ example: "FC Vui Vẻ", description: "Tên đội bóng" })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: "Đội bóng sân 7 FC Vui Vẻ", description: "Mô tả đội bóng" })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: "/images/logo.png", description: "Logo đội bóng" })
  @IsString()
  @IsOptional()
  logo?: string;
}
```

## TeamsService

Service xử lý logic nghiệp vụ liên quan đến đội bóng.

```typescript
@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  // Lấy danh sách đội bóng
  async findAll() {
    return this.prisma.team.findMany();
  }

  // Lấy thông tin đội bóng theo ID
  async findById(id: string) {
    return this.prisma.team.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
        members: true,
      },
    });
  }

  // Tạo đội bóng mới
  async create(data: CreateTeamDto, userId: string) {
    const team = await this.prisma.team.create({
      data,
    });

    // Gán người dùng vào đội bóng
    await this.prisma.user.update({
      where: { id: userId },
      data: { teamId: team.id },
    });

    return team;
  }

  // Cập nhật thông tin đội bóng
  async update(id: string, data: UpdateTeamDto) {
    return this.prisma.team.update({
      where: { id },
      data,
    });
  }

  // Xóa đội bóng
  async delete(id: string) {
    // Cập nhật các user thuộc đội bóng
    await this.prisma.user.updateMany({
      where: { teamId: id },
      data: { teamId: null },
    });

    return this.prisma.team.delete({
      where: { id },
    });
  }
}
```

## TeamsController

Controller xử lý các request liên quan đến đội bóng.

```typescript
@ApiTags("teams")
@Controller("teams")
@UseGuards(JwtAuthGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @ApiOperation({ summary: "Lấy danh sách đội bóng" })
  @ApiResponse({ status: 200, description: "Danh sách đội bóng" })
  async findAll() {
    return this.teamsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Lấy thông tin đội bóng theo ID" })
  @ApiParam({ name: "id", description: "Team ID" })
  @ApiResponse({ status: 200, description: "Thông tin đội bóng" })
  @ApiResponse({ status: 404, description: "Không tìm thấy đội bóng" })
  async findOne(@Param("id") id: string) {
    const team = await this.teamsService.findById(id);
    if (!team) {
      throw new NotFoundException(`Không tìm thấy đội bóng với ID ${id}`);
    }
    return team;
  }

  @Post()
  @ApiOperation({ summary: "Tạo đội bóng mới" })
  @ApiBody({ type: CreateTeamDto })
  @ApiResponse({ status: 201, description: "Đội bóng đã được tạo" })
  async create(@Body() createTeamDto: CreateTeamDto, @Req() req) {
    return this.teamsService.create(createTeamDto, req.user.id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Cập nhật thông tin đội bóng" })
  @ApiParam({ name: "id", description: "Team ID" })
  @ApiBody({ type: UpdateTeamDto })
  @ApiResponse({ status: 200, description: "Đội bóng đã được cập nhật" })
  @ApiResponse({ status: 404, description: "Không tìm thấy đội bóng" })
  async update(@Param("id") id: string, @Body() updateTeamDto: UpdateTeamDto) {
    try {
      return await this.teamsService.update(id, updateTeamDto);
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Không tìm thấy đội bóng với ID ${id}`);
      }
      throw error;
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xóa đội bóng" })
  @ApiParam({ name: "id", description: "Team ID" })
  @ApiResponse({ status: 200, description: "Đội bóng đã được xóa" })
  @ApiResponse({ status: 404, description: "Không tìm thấy đội bóng" })
  async remove(@Param("id") id: string) {
    try {
      return await this.teamsService.delete(id);
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Không tìm thấy đội bóng với ID ${id}`);
      }
      throw error;
    }
  }
}
```

## TeamsModule

Module configuration cho đội bóng.

```typescript
@Module({
  imports: [],
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService],
  exports: [TeamsService],
})
export class TeamsModule {}
```

## Cách sử dụng

### Lấy thông tin đội bóng

```typescript
// Trong một service khác
@Injectable()
export class SomeService {
  constructor(private readonly teamsService: TeamsService) {}

  async getTeamInfo(teamId: string) {
    const team = await this.teamsService.findById(teamId);
    // Xử lý thông tin đội bóng
    return team;
  }
}
```

### Tạo đội bóng mới

```typescript
// Trong một controller khác
@Controller('some-controller')
export class SomeController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post('create-team')
  async createTeam(@Body() createTeamDto: CreateTeamDto, @Req() req) {
    const team = await this.teamsService.create(createTeamDto, req.user.id);
    return team;
  }
}
```

## Lưu ý bảo mật

1. Tất cả các API endpoints đều được bảo vệ bởi JwtAuthGuard, yêu cầu người dùng phải đăng nhập
2. Nên thêm kiểm tra quyền để đảm bảo chỉ người dùng có quyền mới có thể thực hiện các thao tác với đội bóng
3. Khi xóa đội bóng, cần cập nhật các bảng liên quan (User, Member, Match, Finance) để tránh lỗi khóa ngoại 