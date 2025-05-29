# Module Finance

Module Finance cung cấp các chức năng quản lý tài chính của đội bóng trong hệ thống Football Manager.

## Cấu trúc thư mục

```
finance/
├── dto/                  # Data Transfer Objects
│   ├── create-finance.dto.ts    # DTO cho tạo giao dịch tài chính
│   └── update-finance.dto.ts    # DTO cho cập nhật giao dịch tài chính
├── finance.controller.ts # Controller xử lý các request
├── finance.service.ts    # Service xử lý logic nghiệp vụ
└── finance.module.ts     # Module configuration
```

## API Endpoints

### Lấy danh sách giao dịch tài chính

```
GET /finance
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

- `teamId`: ID của đội bóng (tùy chọn)
- `type`: Loại giao dịch (INCOME, EXPENSE, CONTRIBUTION) (tùy chọn)
- `month`: Tháng (1-12) (tùy chọn)
- `year`: Năm (tùy chọn)

**Response:**

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "type": "INCOME",
    "amount": 1000000,
    "description": "Tài trợ từ công ty ABC",
    "month": 1,
    "year": 2023,
    "date": "2023-01-15T00:00:00.000Z",
    "memberId": null,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "teamId": "223e4567-e89b-12d3-a456-426614174001"
  },
  {
    "id": "223e4567-e89b-12d3-a456-426614174002",
    "type": "EXPENSE",
    "amount": 500000,
    "description": "Thuê sân tập",
    "month": 1,
    "year": 2023,
    "date": "2023-01-20T00:00:00.000Z",
    "memberId": null,
    "createdAt": "2023-01-02T00:00:00.000Z",
    "updatedAt": "2023-01-02T00:00:00.000Z",
    "teamId": "223e4567-e89b-12d3-a456-426614174001"
  },
  {
    "id": "323e4567-e89b-12d3-a456-426614174003",
    "type": "CONTRIBUTION",
    "amount": 100000,
    "description": "Đóng quỹ tháng 1",
    "month": 1,
    "year": 2023,
    "date": "2023-01-10T00:00:00.000Z",
    "memberId": "423e4567-e89b-12d3-a456-426614174004",
    "createdAt": "2023-01-03T00:00:00.000Z",
    "updatedAt": "2023-01-03T00:00:00.000Z",
    "teamId": "223e4567-e89b-12d3-a456-426614174001"
  }
]
```

### Lấy tổng kết tài chính

```
GET /finance/summary
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

- `teamId`: ID của đội bóng (tùy chọn)
- `month`: Tháng (1-12) (tùy chọn)
- `year`: Năm (tùy chọn)

**Response:**

```json
{
  "totalIncome": 1000000,
  "totalExpense": 500000,
  "totalContribution": 500000,
  "balance": 1000000,
  "month": 1,
  "year": 2023
}
```

### Lấy thông tin giao dịch tài chính theo ID

```
GET /finance/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "type": "INCOME",
  "amount": 1000000,
  "description": "Tài trợ từ công ty ABC",
  "month": 1,
  "year": 2023,
  "date": "2023-01-15T00:00:00.000Z",
  "memberId": null,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001",
  "team": {
    "id": "223e4567-e89b-12d3-a456-426614174001",
    "name": "FC Vui Vẻ"
  },
  "member": null
}
```

### Tạo giao dịch tài chính mới

```
POST /finance
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "type": "INCOME",
  "amount": 1000000,
  "description": "Tài trợ từ công ty ABC",
  "date": "2023-01-15T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001"
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "type": "INCOME",
  "amount": 1000000,
  "description": "Tài trợ từ công ty ABC",
  "month": 1,
  "year": 2023,
  "date": "2023-01-15T00:00:00.000Z",
  "memberId": null,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001"
}
```

### Cập nhật thông tin giao dịch tài chính

```
PUT /finance/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**

```json
{
  "amount": 1200000,
  "description": "Tài trợ từ công ty ABC (đã cập nhật)"
}
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "type": "INCOME",
  "amount": 1200000,
  "description": "Tài trợ từ công ty ABC (đã cập nhật)",
  "month": 1,
  "year": 2023,
  "date": "2023-01-15T00:00:00.000Z",
  "memberId": null,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-03T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001"
}
```

### Xóa giao dịch tài chính

```
DELETE /finance/:id
```

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "type": "INCOME",
  "amount": 1200000,
  "description": "Tài trợ từ công ty ABC (đã cập nhật)",
  "month": 1,
  "year": 2023,
  "date": "2023-01-15T00:00:00.000Z",
  "memberId": null,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-03T00:00:00.000Z",
  "teamId": "223e4567-e89b-12d3-a456-426614174001"
}
```

## DTOs

### CreateFinanceDto

```typescript
export class CreateFinanceDto {
  @ApiProperty({ 
    example: "INCOME", 
    description: "Loại giao dịch",
    enum: FinanceType,
    enumName: "FinanceType"
  })
  @IsEnum(FinanceType)
  @IsNotEmpty()
  type: FinanceType;

  @ApiProperty({ 
    example: 1000000, 
    description: "Số tiền" 
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  amount: number;

  @ApiProperty({ 
    example: "Tài trợ từ công ty ABC", 
    description: "Mô tả giao dịch" 
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    example: "2023-01-15T00:00:00.000Z", 
    description: "Ngày giao dịch" 
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ 
    example: "423e4567-e89b-12d3-a456-426614174004", 
    description: "ID thành viên (tùy chọn)" 
  })
  @IsString()
  @IsOptional()
  memberId?: string;

  @ApiProperty({ 
    example: "223e4567-e89b-12d3-a456-426614174001", 
    description: "ID đội bóng" 
  })
  @IsString()
  @IsNotEmpty()
  teamId: string;
}
```

### UpdateFinanceDto

```typescript
export class UpdateFinanceDto {
  @ApiProperty({ 
    example: "INCOME", 
    description: "Loại giao dịch",
    enum: FinanceType,
    enumName: "FinanceType"
  })
  @IsEnum(FinanceType)
  @IsOptional()
  type?: FinanceType;

  @ApiProperty({ 
    example: 1000000, 
    description: "Số tiền" 
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  amount?: number;

  @ApiProperty({ 
    example: "Tài trợ từ công ty ABC", 
    description: "Mô tả giao dịch" 
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    example: "2023-01-15T00:00:00.000Z", 
    description: "Ngày giao dịch" 
  })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty({ 
    example: "423e4567-e89b-12d3-a456-426614174004", 
    description: "ID thành viên (tùy chọn)" 
  })
  @IsString()
  @IsOptional()
  memberId?: string;
}
```

## FinanceService

Service xử lý logic nghiệp vụ liên quan đến tài chính.

```typescript
@Injectable()
export class FinanceService {
  constructor(private readonly prisma: PrismaService) {}

  // Lấy danh sách giao dịch tài chính
  async findAll(
    teamId?: string,
    type?: FinanceType,
    month?: number,
    year?: number,
  ) {
    const where: any = {};
    
    if (teamId) {
      where.teamId = teamId;
    }
    
    if (type) {
      where.type = type;
    }
    
    if (month) {
      where.month = month;
    }
    
    if (year) {
      where.year = year;
    }
    
    return this.prisma.finance.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  // Lấy tổng kết tài chính
  async getSummary(teamId?: string, month?: number, year?: number) {
    const where: any = {};
    
    if (teamId) {
      where.teamId = teamId;
    }
    
    if (month) {
      where.month = month;
    }
    
    if (year) {
      where.year = year;
    }
    
    const finances = await this.prisma.finance.findMany({
      where,
    });
    
    const totalIncome = finances
      .filter(f => f.type === 'INCOME')
      .reduce((sum, f) => sum + f.amount, 0);
    
    const totalExpense = finances
      .filter(f => f.type === 'EXPENSE')
      .reduce((sum, f) => sum + f.amount, 0);
    
    const totalContribution = finances
      .filter(f => f.type === 'CONTRIBUTION')
      .reduce((sum, f) => sum + f.amount, 0);
    
    const balance = totalIncome + totalContribution - totalExpense;
    
    return {
      totalIncome,
      totalExpense,
      totalContribution,
      balance,
      month,
      year,
    };
  }

  // Lấy thông tin giao dịch tài chính theo ID
  async findById(id: string) {
    return this.prisma.finance.findUnique({
      where: { id },
      include: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },
        member: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // Tạo giao dịch tài chính mới
  async create(data: CreateFinanceDto) {
    const date = new Date(data.date);
    
    return this.prisma.finance.create({
      data: {
        ...data,
        date,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      },
    });
  }

  // Cập nhật thông tin giao dịch tài chính
  async update(id: string, data: UpdateFinanceDto) {
    const updateData: any = { ...data };
    
    if (data.date) {
      const date = new Date(data.date);
      updateData.date = date;
      updateData.month = date.getMonth() + 1;
      updateData.year = date.getFullYear();
    }
    
    return this.prisma.finance.update({
      where: { id },
      data: updateData,
    });
  }

  // Xóa giao dịch tài chính
  async delete(id: string) {
    return this.prisma.finance.delete({
      where: { id },
    });
  }
}
```

## FinanceController

Controller xử lý các request liên quan đến tài chính.

```typescript
@ApiTags("finance")
@Controller("finance")
@UseGuards(JwtAuthGuard)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  @ApiOperation({ summary: "Lấy danh sách giao dịch tài chính" })
  @ApiQuery({ name: "teamId", required: false, description: "ID đội bóng" })
  @ApiQuery({ 
    name: "type", 
    required: false, 
    description: "Loại giao dịch",
    enum: FinanceType
  })
  @ApiQuery({ name: "month", required: false, description: "Tháng (1-12)" })
  @ApiQuery({ name: "year", required: false, description: "Năm" })
  @ApiResponse({ status: 200, description: "Danh sách giao dịch tài chính" })
  async findAll(
    @Query("teamId") teamId?: string,
    @Query("type") type?: FinanceType,
    @Query("month") month?: number,
    @Query("year") year?: number,
  ) {
    return this.financeService.findAll(teamId, type, month, year);
  }

  @Get("summary")
  @ApiOperation({ summary: "Lấy tổng kết tài chính" })
  @ApiQuery({ name: "teamId", required: false, description: "ID đội bóng" })
  @ApiQuery({ name: "month", required: false, description: "Tháng (1-12)" })
  @ApiQuery({ name: "year", required: false, description: "Năm" })
  @ApiResponse({ status: 200, description: "Tổng kết tài chính" })
  async getSummary(
    @Query("teamId") teamId?: string,
    @Query("month") month?: number,
    @Query("year") year?: number,
  ) {
    return this.financeService.getSummary(teamId, month, year);
  }

  @Get(":id")
  @ApiOperation({ summary: "Lấy thông tin giao dịch tài chính theo ID" })
  @ApiParam({ name: "id", description: "Finance ID" })
  @ApiResponse({ status: 200, description: "Thông tin giao dịch tài chính" })
  @ApiResponse({ status: 404, description: "Không tìm thấy giao dịch tài chính" })
  async findOne(@Param("id") id: string) {
    const finance = await this.financeService.findById(id);
    if (!finance) {
      throw new NotFoundException(`Không tìm thấy giao dịch tài chính với ID ${id}`);
    }
    return finance;
  }

  @Post()
  @ApiOperation({ summary: "Tạo giao dịch tài chính mới" })
  @ApiBody({ type: CreateFinanceDto })
  @ApiResponse({ status: 201, description: "Giao dịch tài chính đã được tạo" })
  async create(@Body() createFinanceDto: CreateFinanceDto) {
    return this.financeService.create(createFinanceDto);
  }

  @Put(":id")
  @ApiOperation({ summary: "Cập nhật thông tin giao dịch tài chính" })
  @ApiParam({ name: "id", description: "Finance ID" })
  @ApiBody({ type: UpdateFinanceDto })
  @ApiResponse({ status: 200, description: "Giao dịch tài chính đã được cập nhật" })
  @ApiResponse({ status: 404, description: "Không tìm thấy giao dịch tài chính" })
  async update(@Param("id") id: string, @Body() updateFinanceDto: UpdateFinanceDto) {
    try {
      return await this.financeService.update(id, updateFinanceDto);
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Không tìm thấy giao dịch tài chính với ID ${id}`);
      }
      throw error;
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xóa giao dịch tài chính" })
  @ApiParam({ name: "id", description: "Finance ID" })
  @ApiResponse({ status: 200, description: "Giao dịch tài chính đã được xóa" })
  @ApiResponse({ status: 404, description: "Không tìm thấy giao dịch tài chính" })
  async remove(@Param("id") id: string) {
    try {
      return await this.financeService.delete(id);
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Không tìm thấy giao dịch tài chính với ID ${id}`);
      }
      throw error;
    }
  }
}
```

## FinanceModule

Module configuration cho tài chính.

```typescript
@Module({
  imports: [],
  controllers: [FinanceController],
  providers: [FinanceService, PrismaService],
  exports: [FinanceService],
})
export class FinanceModule {}
```

## Cách sử dụng

### Lấy tổng kết tài chính của một đội

```typescript
// Trong một service khác
@Injectable()
export class SomeService {
  constructor(private readonly financeService: FinanceService) {}

  async getTeamFinanceSummary(teamId: string) {
    const summary = await this.financeService.getSummary(teamId);
    // Xử lý tổng kết tài chính
    return summary;
  }
}
```

### Tạo giao dịch đóng quỹ cho thành viên

```typescript
// Trong một controller khác
@Controller('some-controller')
export class SomeController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('member-contribution')
  async createMemberContribution(
    @Body() data: { memberId: string, amount: number, teamId: string }
  ) {
    const contribution = await this.financeService.create({
      type: FinanceType.CONTRIBUTION,
      amount: data.amount,
      description: `Đóng quỹ tháng ${new Date().getMonth() + 1}`,
      date: new Date().toISOString(),
      memberId: data.memberId,
      teamId: data.teamId,
    });
    
    return contribution;
  }
}
```

## Lưu ý bảo mật

1. Tất cả các API endpoints đều được bảo vệ bởi JwtAuthGuard, yêu cầu người dùng phải đăng nhập
2. Nên thêm kiểm tra quyền để đảm bảo chỉ người dùng thuộc đội bóng mới có thể thực hiện các thao tác với tài chính của đội đó
3. Đặc biệt cẩn thận với các thao tác liên quan đến tiền bạc, nên có cơ chế kiểm tra và xác nhận kỹ lưỡng 