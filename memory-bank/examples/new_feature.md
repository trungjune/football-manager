# Ví Dụ Phát Triển Tính Năng Mới

## 1. Phát triển màn hình Quản lý người dùng

**Độ phức tạp**: Level 2-4 (Cần thiết kế UI/UX và xử lý logic phức tạp)

### Quy trình thực hiện

```
VAN: Phát triển màn hình Quản lý người dùng với các chức năng thêm/sửa/xóa/tìm kiếm
```

↓

```
PLAN: Thiết kế cấu trúc và luồng xử lý cho màn hình Quản lý người dùng
- Xác định các component cần có:
  + UserList: Hiển thị danh sách user dạng table
  + UserForm: Form thêm/sửa user
  + UserFilter: Component lọc và tìm kiếm
  + UserActions: Các action như delete, export
- Thiết kế luồng dữ liệu:
  + State management strategy
  + Loading/Error states
  + Pagination handling
- Xác định các API cần tích hợp:
  + GET /users: Lấy danh sách user
  + POST /users: Tạo user mới
  + PUT /users/:id: Cập nhật user
  + DELETE /users/:id: Xóa user
```

↓

```
CREATIVE: Thiết kế UI/UX cho màn hình Quản lý người dùng
- Layout tổng thể:
  + Header với actions và filter
  + Table hiển thị danh sách
  + Modal form thêm/sửa
  + Confirm dialog xóa
- Component design:
  + Responsive table với sort/filter
  + Form validation và error display
  + Loading skeletons
  + Empty/Error states
- Responsive design:
  + Desktop: Full table view
  + Tablet: Compact table
  + Mobile: Card view
- Loading states:
  + Table loading skeleton
  + Form submit loading
  + Action loading states
```

↓

```
IMPLEMENT: Xây dựng màn hình Quản lý người dùng
- Tạo các component theo thiết kế:
  + Implement UserList component
  + Implement UserForm component
  + Implement UserFilter component
  + Implement UserActions component
- Implement các chức năng CRUD:
  + Setup API integration
  + State management
  + Error handling
- Xử lý validation và error:
  + Form validation rules
  + API error handling
  + User feedback
```

↓

```
REFLECT: Review màn hình Quản lý người dùng
- Kiểm tra UX flow:
  + Verify all CRUD operations
  + Test error scenarios
  + Check loading states
- Verify các case xử lý:
  + Validation cases
  + Edge cases
  + Error handling
- Test responsive:
  + Desktop layout
  + Tablet layout
  + Mobile layout
```

↓

```
ARCHIVE: Lưu documentation màn hình Quản lý người dùng
- Cập nhật tài liệu kỹ thuật:
  + Component structure
  + API integration
  + State management
- Ghi chú các quyết định thiết kế:
  + UX decisions
  + Technical choices
  + Future improvements
```

## 2. Phát triển tính năng Export dữ liệu

[Chi tiết tương tự...]

## 3. Phát triển tính năng Dashboard

[Chi tiết tương tự...]
