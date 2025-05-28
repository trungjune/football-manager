# HƯỚNG DẪN CÀI ĐẶT MEMORY BANK

## Giới Thiệu

Dự án đã tích hợp Memory Bank System của [vanzan01/cursor-memory-bank](https://github.com/vanzan01/cursor-memory-bank) để hỗ trợ quản lý tài liệu và quy trình làm việc với AI theo mode. Hướng dẫn này giúp các thành viên cài đặt và sử dụng Memory Bank đã có sẵn trong dự án.

## Yêu Cầu

1. [Cursor Editor](https://cursor.sh/) - Phiên bản mới nhất
2. Đã clone dự án OneDX

## Cài Đặt Memory Bank và Custom Modes

### Bước 1: Thiết Lập Rules trong Cursor

1. Mở Cursor
2. Nhấp vào biểu tượng cài đặt (⚙️) ở góc trên bên phải
3. Chọn "Settings"
4. Chọn "Rules" từ menu bên trái
5. Bạn sẽ thấy phần "Rules provide more context to AI models to help them follow your personal preferences and operate more efficiently in your codebase."
6. Mở tệp `memory-bank/userRules.md` bằng trình soạn thảo văn bản
7. Sao chép nội dung từ [userRules.md](./userRules.md) vào phần "Custom instructions" trong cài đặt Cursor AI.
8. Nhấp vào vùng văn bản dưới "User Rules" (nơi có dòng "These preferences get sent to the AI on all chats, composers and Ctrl-K sessions")
9. Dán nội dung đã sao chép vào đây
10. Nhấp "Save" hoặc "Apply" để lưu cài đặt

### Bước 2: Bật Tính Năng Custom Modes trong Cursor

1. Vẫn trong cửa sổ Settings của Cursor
2. Chọn "Features" từ menu bên trái
3. Cuộn xuống và tìm phần "Custom modes" (có nhãn BETA)
4. Bật tùy chọn "Allow the creation of custom modes" bằng cách nhấp vào nút toggle
5. Cursor sẽ yêu cầu khởi động lại, hãy nhấp "Restart" để hoàn tất

### Bước 3: Tạo Custom Modes trong Cursor

Để biết hướng dẫn chi tiết và ảnh minh họa về cách thiết lập Custom Modes, vui lòng tham khảo [tài liệu chính thức trên GitHub](https://github.com/vanzan01/cursor-memory-bank?tab=readme-ov-file#step-2-setting-up-custom-modes-in-cursor).

Sau đây là tóm tắt các thông tin cần thiết cho từng mode:

1. **VAN MODE** (Initialization)

   - **Tên**: 🔍 VAN
   - **Công cụ**: Bật "Codebase Search", "Read File", "Terminal", "List Directory"
   - **Advanced options**: Dán nội dung từ `custom_modes/van_instructions.md`

2. **PLAN MODE** (Task Planning)

   - **Tên**: 📋 PLAN
   - **Công cụ**: Bật "Codebase Search", "Read File", "Terminal", "List Directory"
   - **Advanced options**: Dán nội dung từ `custom_modes/plan_instructions.md`

3. **CREATIVE MODE** (Design Decisions)

   - **Tên**: 🎨 CREATIVE
   - **Công cụ**: Bật "Codebase Search", "Read File", "Terminal", "List Directory", "Edit File"
   - **Advanced options**: Dán nội dung từ `custom_modes/creative_instructions.md`

4. **IMPLEMENT MODE** (Code Implementation)

   - **Tên**: ⚒️ IMPLEMENT
   - **Công cụ**: Bật tất cả công cụ
   - **Advanced options**: Dán nội dung từ `custom_modes/implement_instructions.md`

5. **REFLECT MODE** (Review)

   - **Tên**: 🔍 REFLECT
   - **Công cụ**: Bật "Codebase Search", "Read File", "Terminal", "List Directory"
   - **Advanced options**: Dán phần REFLECT từ `custom_modes/reflect_archive_instructions.md`

6. **ARCHIVE MODE** (Documentation)
   - **Tên**: 📚 ARCHIVE
   - **Công cụ**: Bật "Codebase Search", "Read File", "Terminal", "List Directory", "Edit File"
   - **Advanced options**: Dán phần ARCHIVE từ `custom_modes/reflect_archive_instructions.md`

> **Lưu ý**: REFLECT và ARCHIVE có hướng dẫn chung trong một tệp để tối ưu hóa giới hạn ký tự. Khi mở tệp reflect_archive_instructions.md, bạn sẽ thấy hai phần riêng biệt cho từng mode.

## Sử Dụng Memory Bank

1. **Bắt đầu với VAN Mode**:

   - Chuyển sang VAN mode trong Cursor
   - Gõ "VAN" để bắt đầu quá trình khởi tạo
   - VAN sẽ phân tích cấu trúc dự án và xác định độ phức tạp

2. **Theo quy trình dựa trên độ phức tạp**:

   - **Task Level 1**: Có thể chuyển trực tiếp từ VAN sang IMPLEMENT
   - **Task Level 2**: Quy trình đơn giản (VAN → PLAN → IMPLEMENT → REFLECT)
   - **Task Level 3-4**: Quy trình đầy đủ (VAN → PLAN → CREATIVE → IMPLEMENT → REFLECT → ARCHIVE)

3. **Các lệnh mode**:

```
VAN - Khởi tạo dự án và xác định độ phức tạp
PLAN - Tạo kế hoạch triển khai chi tiết
CREATIVE - Khám phá các tùy chọn thiết kế cho thành phần phức tạp
IMPLEMENT - Xây dựng các thành phần theo kế hoạch
REFLECT - Review và ghi lại bài học kinh nghiệm
ARCHIVE - Tạo tài liệu toàn diện
QA - Xác thực triển khai kỹ thuật (có thể gọi từ bất kỳ mode nào)
```

## Cấu Trúc Memory Bank

Memory Bank trong dự án đã có sẵn các tệp cốt lõi:

1. **projectbrief.md** - Tổng quan về dự án, mục tiêu và phạm vi
2. **productContext.md** - Bối cảnh sản phẩm và trải nghiệm người dùng
3. **systemPatterns.md** - Kiến trúc hệ thống và quyết định kỹ thuật
4. **techContext.md** - Tech stack và môi trường phát triển
5. **activeContext.md** - Trọng tâm hiện tại và nhiệm vụ đang làm
6. **progress.md** - Theo dõi tiến độ dự án
7. **tasks.md** - Danh sách và trạng thái các task

## Xử Lý Sự Cố Thường Gặp

1. **Mode không phản hồi đúng**:

   - Kiểm tra xem hướng dẫn trong Advanced options đã được sao chép đầy đủ chưa
   - Đảm bảo các công cụ đúng đã được bật cho mỗi mode
   - Kiểm tra xem bạn đã chuyển sang đúng mode chưa

2. **Rules không tải**:

   - Đảm bảo thư mục `.cursor/rules/isolation_rules/` ở đúng vị trí
   - Kiểm tra quyền đọc các tệp rule
   - Thử khởi động lại Cursor

3. **Vấn đề thực thi lệnh**:
   - Đảm bảo bạn đang chạy các lệnh từ đúng thư mục
   - Xác minh các lệnh đặc thù nền tảng được sử dụng chính xác

## Tài Liệu Bổ Sung

Để tìm hiểu thêm về cách sử dụng Memory Bank, hãy tham khảo:

- [USAGE_GUIDE.md](./USAGE_GUIDE.md) - Hướng dẫn sử dụng chi tiết
- [GitHub Repository](https://github.com/vanzan01/cursor-memory-bank) - Repository chính của Memory Bank
