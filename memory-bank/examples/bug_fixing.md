# Ví Dụ Về Fix Bug

## 1. Bug Đơn Giản (Level 1)

### Ví dụ: Button submit form bị lệch trên mobile

**Đặc điểm**:

- UI bug đơn giản
- Không ảnh hưởng logic
- Fix nhanh < 30 phút

### Quy trình xử lý

```
VAN: Button submit form bị lệch trên mobile
- Xác nhận là bug UI đơn giản
- Kiểm tra không ảnh hưởng logic
- Quyết định quick fix
```

↓

```
IMPLEMENT: Sửa CSS cho button submit responsive
- Kiểm tra CSS hiện tại:
  + Phát hiện thiếu media query
  + Margin/padding không phù hợp
- Fix CSS:
  + Thêm responsive styles
  + Điều chỉnh margin/padding
  + Đảm bảo alignment
```

↓

```
REFLECT: Verify fix trên các breakpoint
- Test trên các device:
  + Mobile portrait
  + Mobile landscape
  + Tablet
  + Desktop
- Verify không ảnh hưởng layout khác
```

↓

```
ARCHIVE: Cập nhật note về responsive fixes
- Ghi chú cách đã fix
- Cập nhật CSS guidelines
- Note các breakpoint cần chú ý
```

## 2. Bug Phức Tạp (Level 2-4)

### Ví dụ: Tính toán số ngày nghỉ phép không chính xác

**Đặc điểm**:

- Ảnh hưởng business logic
- Liên quan nhiều module
- Cần phân tích kỹ

### Quy trình xử lý

```
VAN: Fix lỗi tính toán số ngày nghỉ phép không chính xác
- Xác định mức độ ảnh hưởng:
  + Ảnh hưởng tới payroll
  + Ảnh hưởng báo cáo
  + Có thể sai lịch sử
- Thu thập thông tin:
  + Log lỗi
  + Case bị ảnh hưởng
  + Feedback từ user
```

↓

```
PLAN: Phân tích nguyên nhân lỗi tính toán ngày nghỉ
- Review business logic:
  + Quy tắc tính ngày nghỉ
  + Các case đặc biệt
  + Xử lý ngày lễ
- Xác định các case tính toán sai:
  + Ngày lễ trùng cuối tuần
  + Nghỉ đột xuất
  + Nghỉ theo ca
- Lập kế hoạch sửa lỗi:
  + Sửa core logic
  + Cập nhật test cases
  + Plan cho data migration
```

↓

```
CREATIVE: Thiết kế giải pháp xử lý tính toán ngày nghỉ
- Thuật toán tính toán mới:
  + Xử lý ngày lễ
  + Xử lý nghỉ theo ca
  + Xử lý các case đặc biệt
- Xử lý các edge case:
  + Ngày lễ trùng cuối tuần
  + Đơn nghỉ chéo ngày
  + Hủy đơn nghỉ
```

↓

```
IMPLEMENT: Cập nhật logic tính toán ngày nghỉ
- Implement thuật toán mới:
  + Core calculation service
  + Holiday handling
  + Shift-based calculation
- Thêm unit test:
  + Test các case cơ bản
  + Test edge cases
  + Test integration
- Cập nhật database:
  + Migration script
  + Data validation
  + Rollback plan
```

↓

```
REFLECT: Review và test kỹ lưỡng
- Test các case đã biết:
  + Verify fix các case lỗi
  + Check historical data
  + Validate calculations
- Test thêm edge cases:
  + Holiday scenarios
  + Shift patterns
  + Cancel/Update cases
- Performance test:
  + Load testing
  + Batch processing
  + Database impact
```

↓

```
ARCHIVE: Cập nhật tài liệu về logic tính ngày nghỉ
- Cập nhật documentation:
  + Business rules
  + Technical design
  + Test scenarios
- Lưu lessons learned:
  + Root cause analysis
  + Prevention measures
  + Monitoring points
```

## 3. Bug Bảo Mật (Level 4)

[Chi tiết tương tự...]

## 4. Performance Issue (Level 3)

[Chi tiết tương tự...]
