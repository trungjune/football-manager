# Hướng Dẫn Triển Khai Memory Bank + Cursor

Tài liệu này cung cấp hướng dẫn chi tiết để triển khai Memory Bank + Cursor trong một dự án mới. Hãy làm theo các bước dưới đây để tối ưu hóa quy trình làm việc với AI.

## Bước 1: Cài đặt Cursor Editor

1. Tải và cài đặt [Cursor Editor](https://cursor.sh/) - phiên bản mới nhất
2. Đăng ký và thiết lập tài khoản
3. Kết nối với API của các mô hình AI mà bạn muốn sử dụng (GPT-4 được khuyến nghị)

## Bước 2: Tạo cấu trúc Memory Bank trong dự án

Tạo thư mục `memory-bank` trong thư mục gốc của dự án với các tệp sau:

```
memory-bank/
├── projectbrief.md         # Tổng quan về dự án, mục tiêu và phạm vi
├── productContext.md       # Bối cảnh sản phẩm và trải nghiệm người dùng
├── systemPatterns.md       # Kiến trúc hệ thống và quyết định kỹ thuật
├── techContext.md          # Tech stack và môi trường phát triển
├── activeContext.md        # Trọng tâm hiện tại và nhiệm vụ đang làm
├── progress.md             # Theo dõi tiến độ dự án
├── tasks.md                # Danh sách và trạng thái các task
├── SETUP_GUIDE.md          # Hướng dẫn cài đặt
├── USAGE_GUIDE.md          # Hướng dẫn sử dụng
├── userRules.md            # Rules cho Cursor
└── custom_modes/           # Thư mục chứa các tệp hướng dẫn cho từng mode
    ├── van_instructions.md
    ├── plan_instructions.md
    ├── creative_instructions.md
    ├── implement_instructions.md
    └── reflect_archive_instructions.md
```

## Bước 3: Thiết lập Custom Modes trong Cursor

1. Mở Cursor
2. Nhấp vào biểu tượng cài đặt (⚙️) > "Settings"
3. Chọn "Features" từ menu bên trái
4. Bật tùy chọn "Allow the creation of custom modes" (BETA)
5. Khởi động lại Cursor khi được nhắc

## Bước 4: Tạo và cấu hình từng Custom Mode

### 🔍 VAN MODE (Xác thực và Điều hướng)

1. Trong Cursor, click vào dropdown mode ở thanh công cụ
2. Chọn "Create custom mode"
3. Thiết lập:
   - Tên: 🔍 VAN
   - Bật công cụ: Codebase Search, Read File, Terminal, List Directory
   - Advanced options: Dán nội dung từ `custom_modes/van_instructions.md`

### 📋 PLAN MODE (Lập kế hoạch)

- Tên: 📋 PLAN
- Bật công cụ: Codebase Search, Read File, Terminal, List Directory
- Advanced options: Dán nội dung từ `custom_modes/plan_instructions.md`

### 🎨 CREATIVE MODE (Thiết kế)

- Tên: 🎨 CREATIVE
- Bật công cụ: Codebase Search, Read File, Terminal, List Directory, Edit File
- Advanced options: Dán nội dung từ `custom_modes/creative_instructions.md`

### ⚒️ IMPLEMENT MODE (Thực thi)

- Tên: ⚒️ IMPLEMENT
- Bật tất cả công cụ
- Advanced options: Dán nội dung từ `custom_modes/implement_instructions.md`

### 🔍 REFLECT MODE (Đánh giá)

- Tên: 🔍 REFLECT
- Bật công cụ: Codebase Search, Read File, Terminal, List Directory
- Advanced options: Dán phần REFLECT từ `custom_modes/reflect_archive_instructions.md`

### 📚 ARCHIVE MODE (Lưu trữ)

- Tên: 📚 ARCHIVE
- Bật công cụ: Codebase Search, Read File, Terminal, List Directory, Edit File
- Advanced options: Dán phần ARCHIVE từ `custom_modes/reflect_archive_instructions.md`

## Bước 5: Thiết lập Rules trong Cursor

1. Vẫn trong cửa sổ Settings của Cursor
2. Chọn "Rules" từ menu bên trái
3. Sao chép nội dung từ tệp `memory-bank/userRules.md`
4. Dán vào phần "Custom instructions" trong cài đặt Cursor AI
5. Nhấp "Save" hoặc "Apply" để lưu cài đặt

## Bước 6: Kiểm tra và sử dụng Memory Bank

1. Khởi động lại Cursor
2. Mở dự án của bạn
3. Chọn VAN mode từ dropdown menu
4. Gõ "VAN" để bắt đầu quá trình khởi tạo
5. Làm theo hướng dẫn để VAN tạo và cập nhật các tệp Memory Bank

## Quy trình làm việc cơ bản

Tùy thuộc vào độ phức tạp của task, hãy sử dụng một trong các quy trình sau:

### Task Level 1 (Đơn giản)

```
VAN → IMPLEMENT → REFLECT
```

### Task Level 2 (Trung bình)

```
VAN → PLAN → IMPLEMENT → REFLECT
```

### Task Level 3-4 (Phức tạp)

```
VAN → PLAN → CREATIVE → IMPLEMENT → REFLECT → ARCHIVE
```

## Xử lý sự cố thường gặp

- **Mode không phản hồi đúng**: Kiểm tra xem hướng dẫn trong Advanced options đã được sao chép đầy đủ chưa
- **AI không nhớ context dự án**: Đảm bảo các tệp Memory Bank đã được tạo và cập nhật đúng
- **Lỗi khi chuyển mode**: Khởi động lại Cursor và thử lại

## Tài liệu tham khảo thêm

- [GitHub Repository chính thức](https://github.com/vanzan01/cursor-memory-bank)
- [Cursor Documentation](https://cursor.sh/docs)
