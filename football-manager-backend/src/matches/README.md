# Module Matches

Module Matches cung cấp các chức năng quản lý trận đấu trong hệ thống Football Manager.

## Cấu trúc thư mục

```
matches/
├── dto/                  # Data Transfer Objects
│   ├── create-match.dto.ts    # DTO cho tạo trận đấu
│   └── update-match.dto.ts    # DTO cho cập nhật trận đấu
├── matches.controller.ts # Controller xử lý các request
├── matches.service.ts    # Service xử lý logic nghiệp vụ
└── matches.module.ts     # Module configuration
```

## API Endpoints

### Lấy danh sách trận đấu

```
GET /matches
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

- `teamId`: ID của đội bóng (tùy chọn)
- `fromDate`: Ngày bắt đầu (tùy chọn, định dạng ISO)
- `toDate`: Ngày kết thúc (tùy chọn, định dạng ISO)

**Response:**

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "opponent": "FC Đối Thủ",
    "date": "2023-01-15T18:00:00.000Z",
    "location": "Sân bóng XYZ",
    "result": "3-2",
    "description": "Trận đấu giao hữu",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "teamId": "223e4567-e89b-12d3-a456-426614174001"
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174002",
    "opponent": "FC Khách Mời",
    "date": "2023-01-22T18:00:00.000Z",
    "location": "Sân bóng ABC",
    "result": null,
    "description": "Trận đấu giải đấu XYZ",
    "createdAt": "2023-01-02T00:00:00.000Z",
    "updatedAt": "2023-01-02T00:00:00.000Z",
    "teamId": "223e4567-e89b-12d3-a456-426614174001"
  }
]
```

### Lấy thông tin trận đấu theo ID

```
GET /matches/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "opponent": "FC Đối Thủ",
  "date": "2023-01-15T18:00:00.000Z",
  "location": "Sân bóng XYZ",
  "result": "3-2",
  "description": "Trận đấu giao hữu",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001",
  "team": {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "name": "FC Vui Vẻ"
  }
}
```

### Tạo trận đấu mới

```
POST /matches
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "opponent": "FC Khách Mời",
  "date": "2023-01-22T18:00:00.000Z",
  "location": "Sân bóng ABC",
  "description": "Trận đấu giải đấu XYZ",
  "teamId": "223e4567-e89b-12d3-a456-426614174001"
}
```

**Response:**

```json
{
  "id": "223e4567-e89b-12d3-a456-426614174002",
  "opponent": "FC Khách Mời",
  "date": "2023-01-22T18:00:00.000Z",
  "location": "Sân bóng ABC",
  "result": null,
  "description": "Trận đấu giải đấu XYZ",
  "createdAt": "2023-01-02T00:00:00.000Z",
  "updatedAt": "2023-01-02T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001"
}
```

### Cập nhật thông tin trận đấu

```
PUT /matches/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "result": "3-2",
  "description": "Trận đấu giao hữu - Thắng 3-2"
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "opponent": "FC Đối Thủ",
  "date": "2023-01-15T18:00:00.000Z",
  "location": "Sân bóng XYZ",
  "result": "3-2",
  "description": "Trận đấu giao hữu - Thắng 3-2",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-03T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001"
}
```

### Xóa trận đấu

```
DELETE /matches/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "opponent": "FC Đối Thủ",
  "date": "2023-01-15T18:00:00.000Z",
  "location": "Sân bóng XYZ",
  "result": "3-2",
  "description": "Trận đấu giao hữu - Thắng 3-2",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-03T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001"
}
```

## DTOs

### CreateMatchDto

```typescript
export class CreateMatchDto {
  @ApiProperty({ example: "FC Đối Thủ", description: "Tên đội đối thủ" })
  @IsString()
  @IsNotEmpty()
  opponent: string;

  @ApiProperty({ 
    example: "2023-01-15T18:00:00.000Z", 
    description: "Ngày và giờ trận đấu" 
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: "Sân bóng XYZ", description: "Địa điểm trận đấu" })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ 
    example: "Trận đấu giao hữu", 
    description: "Mô tả trận đấu" 
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    example: "223e4567-e89b-12d3-a456-426614174001", 
    description: "ID đội bóng" 
  })
  @IsString()
  @IsNotEmpty()
  teamId: string;
}
```

### UpdateMatchDto

```typescript
export class UpdateMatchDto {
  @ApiProperty({ example: "FC Đối Thủ", description: "Tên đội đối thủ" })
  @IsString()
  @IsOptional()
  opponent?: string;

  @ApiProperty({ 
    example: "2023-01-15T18:00:00.000Z", 
    description: "Ngày và giờ trận đấu" 
  })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty({ example: "Sân bóng XYZ", description: "Địa điểm trận đấu" })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ example: "3-2", description: "Kết quả trận đấu" })
  @IsString()
  @IsOptional()
  result?: string;

  @ApiProperty({ 
    example: "Trận đấu giao hữu", 
    description: "Mô tả trận đấu" 
  })
  @IsString()
  @IsOptional()
  description?: string;
}
```

## MatchesService

Service xử lý logic nghiệp vụ liên quan đến trận đấu.

```typescript
@Injectable()
export class MatchesService {
  constructor(private readonly prisma: PrismaService) {}

  // Lấy danh sách trận đấu
  async findAll(teamId?: string, fromDate?: string, toDate?: string) {
    const where: any = {};
    
    if (teamId) {
      where.teamId = teamId;
    }
    
    if (fromDate || toDate) {
      where.date = {};
      
      if (fromDate) {
        where.date.gte = new Date(fromDate);
      }
      
      if (toDate) {
        where.date.lte = new Date(toDate);
      }
    }
    
    return this.prisma.match.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  // Lấy thông tin trận đấu theo ID
  async findById(id: string) {
    return this.prisma.match.findUnique({
      where: { id },
      include: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // Tạo trận đấu mới
  async create(data: CreateMatchDto) {
    return this.prisma.match.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
    });
  }

  // Cập nhật thông tin trận đấu
  async update(id: string, data: UpdateMatchDto) {
    const updateData: any = { ...data };
    
    if (data.date) {
      updateData.date = new Date(data.date);
    }
    
    return this.prisma.match.update({
      where: { id },
      data: updateData,
    });
  }

  // Xóa trận đấu
  async delete(id: string) {
    return this.prisma.match.delete({
      where: { id },
    });
  }
}
```

## MatchesController

Controller xử lý các request liên quan đến trận đấu.

```typescript
@ApiTags("matches")
@Controller("matches")
@UseGuards(JwtAuthGuard)
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  @ApiOperation({ summary: "Lấy danh sách trận đấu" })
  @ApiQuery({ name: "teamId", required: false, description: "ID đội bóng" })
  @ApiQuery({ name: "fromDate", required: false, description: "Ngày bắt đầu (ISO format)" })
  @ApiQuery({ name: "toDate", required: false, description: "Ngày kết thúc (ISO format)" })
  @ApiResponse({ status: 200, description: "Danh sách trận đấu" })
  async findAll(
    @Query("teamId") teamId?: string,
    @Query("fromDate") fromDate?: string,
    @Query("toDate") toDate?: string,
  ) {
    return this.matchesService.findAll(teamId, fromDate, toDate);
  }

  @Get(":id")
  @ApiOperation({ summary: "Lấy thông tin trận đấu theo ID" })
  @ApiParam({ name: "id", description: "Match ID" })
  @ApiResponse({ status: 200, description: "Thông tin trận đấu" })
  @ApiResponse({ status: 404, description: "Không tìm thấy trận đấu" })
  async findOne(@Param("id") id: string) {
    const match = await this.matchesService.findById(id);
    if (!match) {
      throw new NotFoundException(`Không tìm thấy trận đấu với ID ${id}`);
    }
    return match;
  }

  @Post()
  @ApiOperation({ summary: "Tạo trận đấu mới" })
  @ApiBody({ type: CreateMatchDto })
  @ApiResponse({ status: 201, description: "Trận đấu đã được tạo" })
  async create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Cập nhật thông tin trận đấu" })
  @ApiParam({ name: "id", description: "Match ID" })
  @ApiBody({ type: UpdateMatchDto })
  @ApiResponse({ status: 200, description: "Trận đấu đã được cập nhật" })
  @ApiResponse({ status: 404, description: "Không tìm thấy trận đấu" })
  async update(@Param("id") id: string, @Body() updateMatchDto: UpdateMatchDto) {
    try {
      return await this.matchesService.update(id, updateMatchDto);
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Không tìm thấy trận đấu với ID ${id}`);
      }
      throw error;
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xóa trận đấu" })
  @ApiParam({ name: "id", description: "Match ID" })
  @ApiResponse({ status: 200, description: "Trận đấu đã được xóa" })
  @ApiResponse({ status: 404, description: "Không tìm thấy trận đấu" })
  async remove(@Param("id") id: string) {
    try {
      return await this.matchesService.delete(id);
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Không tìm thấy trận đấu với ID ${id}`);
      }
      throw error;
    }
  }
}
```

## MatchesModule

Module configuration cho trận đấu.

```typescript
@Module({
  imports: [],
  controllers: [MatchesController],
  providers: [MatchesService, PrismaService],
  exports: [MatchesService],
})
export class MatchesModule {}
```

## Cách sử dụng

### Lấy danh sách trận đấu của một đội

```typescript
// Trong một service khác
@Injectable()
export class SomeService {
  constructor(private readonly matchesService: MatchesService) {}

  async getTeamMatches(teamId: string) {
    const matches = await this.matchesService.findAll(teamId);
    // Xử lý danh sách trận đấu
    return matches;
  }
}
```

### Lấy danh sách trận đấu trong khoảng thời gian

```typescript
// Trong một controller khác
@Controller('some-controller')
export class SomeController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get('upcoming-matches')
  async getUpcomingMatches() {
    const today = new Date().toISOString();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    const matches = await this.matchesService.findAll(
      undefined, 
      today, 
      nextMonth.toISOString()
    );
    
    return matches;
  }
}
```

## Lưu ý bảo mật

1. Tất cả các API endpoints đều được bảo vệ bởi JwtAuthGuard, yêu cầu người dùng phải đăng nhập
2. Nên thêm kiểm tra quyền để đảm bảo chỉ người dùng thuộc đội bóng mới có thể thực hiện các thao tác với trận đấu của đội đó 