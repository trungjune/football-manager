# Members API Documentation

## Overview

API quản lý thành viên cung cấp các endpoint để thực hiện các thao tác CRUD (Create, Read, Update, Delete) với thành viên trong đội bóng.

## Base URL

```
/api/members
```

## Authentication

Tất cả các API endpoints đều yêu cầu xác thực JWT. Token phải được gửi trong header `Authorization` với định dạng `Bearer {token}`.

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Endpoints

### 1. Get All Members

Lấy danh sách tất cả thành viên với phân trang và bộ lọc.

**Request:**

```
GET /api/members
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Số trang (mặc định: 1) |
| limit | number | Số lượng item mỗi trang (mặc định: 10) |
| search | string | Tìm kiếm theo tên hoặc số điện thoại |
| position | string | Lọc theo vị trí (GOALKEEPER, DEFENDER, MIDFIELDER, FORWARD) |
| isActive | boolean | Lọc theo trạng thái hoạt động |
| sortBy | string | Sắp xếp theo trường (name, birthYear, position, etc.) |
| sortOrder | string | Thứ tự sắp xếp (asc, desc) |

**Response:**

```json
{
  "data": [
    {
      "id": "uuid-1",
      "name": "Nguyễn Văn A",
      "phone": "0123456789",
      "email": "nguyenvana@example.com",
      "birthYear": 1995,
      "position": "MIDFIELDER",
      "preferredFoot": "right",
      "technicalRating": 8,
      "physicalRating": 7,
      "avatarUrl": "https://example.com/avatar1.jpg",
      "isActive": true,
      "joinedAt": "2023-01-15T00:00:00.000Z",
      "createdAt": "2023-01-15T00:00:00.000Z",
      "updatedAt": "2023-01-15T00:00:00.000Z"
    },
    // ...more members
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

### 2. Get Member by ID

Lấy thông tin chi tiết của một thành viên.

**Request:**

```
GET /api/members/:id
```

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | ID của thành viên |

**Response:**

```json
{
  "id": "uuid-1",
  "name": "Nguyễn Văn A",
  "phone": "0123456789",
  "email": "nguyenvana@example.com",
  "birthYear": 1995,
  "position": "MIDFIELDER",
  "preferredFoot": "right",
  "height": 175,
  "weight": 70,
  "technicalRating": 8,
  "physicalRating": 7,
  "avatarUrl": "https://example.com/avatar1.jpg",
  "isActive": true,
  "joinedAt": "2023-01-15T00:00:00.000Z",
  "createdAt": "2023-01-15T00:00:00.000Z",
  "updatedAt": "2023-01-15T00:00:00.000Z",
  "stats": {
    "matchesPlayed": 15,
    "goals": 5,
    "assists": 8,
    "averageRating": 7.5
  }
}
```

### 3. Create Member

Tạo thành viên mới.

**Request:**

```
POST /api/members
```

**Request Body:**

```json
{
  "name": "Nguyễn Văn B",
  "phone": "0987654321",
  "email": "nguyenvanb@example.com",
  "birthYear": 1998,
  "position": "FORWARD",
  "preferredFoot": "left",
  "height": 180,
  "weight": 75,
  "technicalRating": 7,
  "physicalRating": 8,
  "avatarUrl": "https://example.com/avatar2.jpg"
}
```

**Response:**

```json
{
  "id": "uuid-2",
  "name": "Nguyễn Văn B",
  "phone": "0987654321",
  "email": "nguyenvanb@example.com",
  "birthYear": 1998,
  "position": "FORWARD",
  "preferredFoot": "left",
  "height": 180,
  "weight": 75,
  "technicalRating": 7,
  "physicalRating": 8,
  "avatarUrl": "https://example.com/avatar2.jpg",
  "isActive": true,
  "joinedAt": "2023-06-20T00:00:00.000Z",
  "createdAt": "2023-06-20T00:00:00.000Z",
  "updatedAt": "2023-06-20T00:00:00.000Z"
}
```

### 4. Update Member

Cập nhật thông tin thành viên.

**Request:**

```
PUT /api/members/:id
```

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | ID của thành viên |

**Request Body:**

```json
{
  "name": "Nguyễn Văn B",
  "phone": "0987654321",
  "email": "nguyenvanb_new@example.com",
  "technicalRating": 8,
  "physicalRating": 9,
  "isActive": true
}
```

**Response:**

```json
{
  "id": "uuid-2",
  "name": "Nguyễn Văn B",
  "phone": "0987654321",
  "email": "nguyenvanb_new@example.com",
  "birthYear": 1998,
  "position": "FORWARD",
  "preferredFoot": "left",
  "height": 180,
  "weight": 75,
  "technicalRating": 8,
  "physicalRating": 9,
  "avatarUrl": "https://example.com/avatar2.jpg",
  "isActive": true,
  "joinedAt": "2023-06-20T00:00:00.000Z",
  "createdAt": "2023-06-20T00:00:00.000Z",
  "updatedAt": "2023-06-21T00:00:00.000Z"
}
```

### 5. Delete Member

Xóa thành viên.

**Request:**

```
DELETE /api/members/:id
```

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | ID của thành viên |

**Response:**

```json
{
  "message": "Member deleted successfully"
}
```

### 6. Get Member Ratings

Lấy danh sách đánh giá của thành viên.

**Request:**

```
GET /api/members/:id/ratings
```

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | ID của thành viên |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Số trang (mặc định: 1) |
| limit | number | Số lượng item mỗi trang (mặc định: 10) |

**Response:**

```json
{
  "data": [
    {
      "id": "rating-uuid-1",
      "memberId": "uuid-2",
      "matchId": "match-uuid-1",
      "technical": 8,
      "physical": 7,
      "mental": 9,
      "overall": 8,
      "notes": "Played very well in midfield",
      "createdAt": "2023-07-10T00:00:00.000Z",
      "updatedAt": "2023-07-10T00:00:00.000Z"
    },
    // ...more ratings
  ],
  "meta": {
    "total": 8,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 7. Add Rating to Member

Thêm đánh giá mới cho thành viên.

**Request:**

```
POST /api/members/:id/ratings
```

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | ID của thành viên |

**Request Body:**

```json
{
  "matchId": "match-uuid-2",
  "technical": 9,
  "physical": 8,
  "mental": 7,
  "overall": 8,
  "notes": "Great performance, scored a goal"
}
```

**Response:**

```json
{
  "id": "rating-uuid-2",
  "memberId": "uuid-2",
  "matchId": "match-uuid-2",
  "technical": 9,
  "physical": 8,
  "mental": 7,
  "overall": 8,
  "notes": "Great performance, scored a goal",
  "createdAt": "2023-07-15T00:00:00.000Z",
  "updatedAt": "2023-07-15T00:00:00.000Z"
}
```

### 8. Get Member Attendance

Lấy lịch sử điểm danh của thành viên.

**Request:**

```
GET /api/members/:id/attendance
```

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | ID của thành viên |

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Số trang (mặc định: 1) |
| limit | number | Số lượng item mỗi trang (mặc định: 10) |
| eventType | string | Loại sự kiện (MATCH, TRAINING) |

**Response:**

```json
{
  "data": [
    {
      "id": "attendance-uuid-1",
      "memberId": "uuid-2",
      "eventId": "match-uuid-1",
      "eventType": "MATCH",
      "status": "PRESENT",
      "createdAt": "2023-07-10T00:00:00.000Z",
      "updatedAt": "2023-07-10T00:00:00.000Z"
    },
    // ...more attendance records
  ],
  "meta": {
    "total": 12,
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
}
```

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": ["name must not be empty", "phone must be a valid phone number"],
  "error": "Bad Request"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 403 Forbidden

```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Member not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

## Rate Limiting

API có giới hạn 100 request/phút cho mỗi IP. Nếu vượt quá giới hạn, bạn sẽ nhận được lỗi 429 Too Many Requests.

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2023-06-01 | Initial release |
| 1.1.0 | 2023-07-15 | Added ratings and attendance endpoints | 