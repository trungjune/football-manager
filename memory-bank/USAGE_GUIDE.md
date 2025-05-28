# HƯỚNG DẪN SỬ DỤNG MEMORY BANK SYSTEM

## Giới Thiệu

Memory Bank System là hệ thống quản lý và thực thi công việc theo mode, giúp:

- Chuẩn hóa quy trình làm việc
- Đảm bảo chất lượng code
- Duy trì tài liệu đầy đủ
- Hỗ trợ AI nhớ bối cảnh dự án qua các phiên làm việc

## Cách Sử Dụng Cơ Bản

### Điều Kiện Tiên Quyết

Trước khi bắt đầu, hãy đảm bảo:

1. Đã cài đặt Cursor với Memory Bank theo [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. Đã bật tính năng Custom modes trong Cursor
3. Đã cấu hình đủ 6 custom modes: VAN, PLAN, CREATIVE, IMPLEMENT, REFLECT, ARCHIVE

### Kích Hoạt Mode

Để bắt đầu công việc:

1. Chọn mode thích hợp từ dropdown menu trong cửa sổ chat (VAN mode cho lần đầu tiên)
2. Gõ tên mode để kích hoạt:

```
VAN
```

3. Mô tả tác vụ của bạn khi được yêu cầu

### Các Mode Chính

1. **VAN** (Xác thực và Điều hướng)

   - Điểm khởi đầu cho mọi task
   - Phân tích độ phức tạp
   - Định hướng mode tiếp theo
   - Tạo các tệp Memory Bank nếu cần

2. **PLAN** (Lập kế hoạch)

   - Phân tích yêu cầu chi tiết
   - Lập kế hoạch thực hiện từng bước
   - Dùng cho task phức tạp (Level 2-4)
   - Cập nhật activeContext.md và tasks.md

3. **CREATIVE** (Thiết kế)

   - Thiết kế giải pháp
   - Đề xuất pattern/architecture
   - Thăm dò các giải pháp khác nhau
   - Cập nhật systemPatterns.md

4. **IMPLEMENT** (Thực thi)

   - Code implementation
   - Quick fix cho Level 1
   - Thực hiện giải pháp đã thiết kế
   - Cập nhật progress.md

5. **REFLECT** (Đánh giá)

   - Review code
   - Test và verify
   - Đánh giá chất lượng
   - Ghi lại bài học kinh nghiệm

6. **ARCHIVE** (Lưu trữ)
   - Cập nhật toàn bộ tài liệu Memory Bank
   - Lưu trữ quyết định thiết kế
   - Cập nhật trạng thái trong tasks.md
   - Đóng task

### Quy Trình Theo Độ Phức Tạp

1. **Task Đơn Giản (Level 1)**

   ```
   VAN → IMPLEMENT → REFLECT
   ```

2. **Task Trung Bình (Level 2)**

   ```
   VAN → PLAN → IMPLEMENT → REFLECT
   ```

3. **Task Phức Tạp (Level 3-4)**
   ```
   VAN → PLAN → CREATIVE → IMPLEMENT → REFLECT → ARCHIVE
   ```

## Các Tệp Memory Bank

Khi làm việc với Memory Bank, hãy đọc và cập nhật các tệp sau:

1. **projectbrief.md** - Thông tin tổng quan về dự án
2. **productContext.md** - Bối cảnh sản phẩm và mục đích sử dụng
3. **techContext.md** - Tech stack và môi trường phát triển
4. **systemPatterns.md** - Kiến trúc và pattern của hệ thống
5. **activeContext.md** - Trọng tâm hiện tại và nhiệm vụ đang làm
6. **progress.md** - Tiến độ dự án và các thành phần đã hoàn thành
7. **tasks.md** - Danh sách và trạng thái các task

### Cập Nhật Memory Bank

Để cập nhật Memory Bank:

```
update memory bank
```

AI sẽ tự động kiểm tra và cập nhật tất cả tệp trong Memory Bank dựa trên tình trạng hiện tại của dự án.

## Ví Dụ Chi Tiết

### 1. Hướng Dẫn Chi Tiết Theo Loại Task

- [Phát triển tính năng mới](examples/new_feature.md)

  - Quy trình phát triển màn hình
  - Thêm tính năng mới
  - Cải tiến hệ thống

- [Fix bug](examples/bug_fixing.md)

  - Quick fix cho bug đơn giản
  - Xử lý bug phức tạp
  - Performance và security fixes

- [Tích hợp API](examples/api_integration.md)
  - Payment integration
  - Authentication
  - Third-party services

## Lưu Ý Quan Trọng

1. **Luôn bắt đầu với VAN mode**

   - VAN chỉ cần gọi một lần cho mỗi task
   - VAN sẽ tự động đánh giá độ phức tạp và hướng dẫn mode tiếp theo

2. **Không bỏ qua các bước**

   - REFLECT: Đảm bảo chất lượng và rút kinh nghiệm
   - ARCHIVE: Duy trì tài liệu đầy đủ cho tương lai

3. **Cập nhật Memory Bank thường xuyên**

   - Sau mỗi thay đổi quan trọng
   - Khi phát hiện pattern mới
   - Khi đã hoàn thành task

4. **Khi xảy ra lỗi với mode**
   - Kiểm tra xem đã chuyển sang đúng mode custom hay chưa
   - Đảm bảo đã copy đầy đủ nội dung instructions vào Advanced options
   - Khởi động lại Cursor nếu cần thiết

Memory Bank giúp AI luôn ghi nhớ bối cảnh dự án qua các phiên làm việc, đảm bảo sự nhất quán và hiệu quả trong quá trình phát triển.
