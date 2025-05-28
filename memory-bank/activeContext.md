# Active Context: Football Manager

## Trạng thái hiện tại
Dự án Football Manager đã hoàn thành giai đoạn khởi tạo và thiết lập cấu trúc cơ bản. Chúng ta đã tạo cấu trúc thư mục cho cả frontend (Next.js) và backend (NestJS), đồng thời đã thiết kế database schema với Prisma. Đã tích hợp dữ liệu thực tế từ Google Sheet của đội bóng FC Vui Vẻ vào database thông qua script seeding. Hiện tại, chúng ta đang chuẩn bị cho việc phát triển các tính năng cốt lõi.

## Mục tiêu ngắn hạn
1. Cấu hình PostgreSQL database và thiết lập kết nối
2. Thiết lập CI/CD pipeline
3. Phát triển các tính năng xác thực:
   - Đăng ký/đăng nhập
   - OAuth với Google
4. Phát triển tính năng tạo và quản lý đội bóng

## Ưu tiên hiện tại
1. **Cấu hình database**: Thiết lập PostgreSQL và kết nối với backend
2. **Phát triển API xác thực**: Đăng ký, đăng nhập, quản lý phiên làm việc
3. **Phát triển UI xác thực**: Trang đăng ký, đăng nhập, và quên mật khẩu
4. **Phát triển tính năng quản lý đội bóng**: CRUD operations cho đội bóng

## Quyết định kỹ thuật
1. **Frontend**:
   - Sử dụng Next.js với App Router
   - Ant Design làm UI framework chính kết hợp với Tailwind CSS
   - Zustand cho global state management
   - SWR cho data fetching

2. **Backend**:
   - NestJS framework
   - Prisma ORM cho database interactions
   - JWT cho authentication
   - Swagger cho API documentation

3. **Database**:
   - PostgreSQL
   - Prisma migrations cho schema changes
   - Seeding cho dữ liệu từ Google Sheet

## Dữ liệu đội bóng FC Vui Vẻ
Đã tích hợp dữ liệu thực tế từ Google Sheet của đội bóng FC Vui Vẻ vào database thông qua script seeding. Dữ liệu bao gồm:

1. **Thông tin thành viên**:
   - Tên, vị trí, số điện thoại, năm sinh
   - Xếp hạng kỹ năng (1-5)
   - Vai trò trong đội (Đội trưởng, Cầu thủ)

2. **Dữ liệu tài chính**:
   - Các khoản đóng góp hàng tháng của các thành viên
   - Các khoản chi tiêu (thuê sân, mua bóng, nước uống)

3. **Cấu trúc database**:
   - Đã cập nhật schema Prisma để phản ánh cấu trúc dữ liệu của đội bóng
   - Thêm các trường như birthYear, rank, month cho các model tương ứng

## Thách thức hiện tại
1. **Thiết kế hệ thống sắp xếp đội hình**: Cần một giải pháp linh hoạt cho việc tạo và lưu trữ các sơ đồ chiến thuật
2. **Quản lý thống kê trận đấu**: Thiết kế schema để lưu trữ và truy xuất hiệu quả các thống kê của trận đấu và cầu thủ
3. **Tích hợp thông báo**: Xây dựng hệ thống thông báo cho các sự kiện như lịch thi đấu, đóng quỹ

## Các quyết định đang chờ xử lý
1. **Hosting solution**: Cần quyết định nền tảng triển khai cho cả frontend và backend
2. **Chiến lược testing**: Xác định phương pháp và công cụ testing
3. **CI/CD pipeline**: Thiết lập quy trình tự động hóa cho việc triển khai

## Phương pháp làm việc
1. **Agile development**: Sử dụng Scrum với sprint 2 tuần
2. **Feature-based development**: Phát triển theo từng tính năng hoàn chỉnh
3. **Test-driven development**: Viết test trước khi implement code
4. **Code reviews**: Mọi PR đều cần được review trước khi merge

## Tài nguyên và tham khảo
1. **Design**: Figma mockups (sẽ được phát triển)
2. **Documentation**: README, API docs, và inline comments
3. **Dữ liệu**: Google Sheet của đội bóng FC Vui Vẻ (https://docs.google.com/spreadsheets/d/11ciG0J7gvy7xLj2rPCCY85qOI6TncNeslW9W1FO1znk/)

## Các tính năng đang phát triển
1. **Hệ thống xác thực**:
   - Đăng ký/đăng nhập với email và password
   - Đăng nhập với Google OAuth
   - Quên mật khẩu và đặt lại mật khẩu

2. **Quản lý đội bóng**:
   - Tạo đội bóng mới
   - Cập nhật thông tin đội bóng
   - Tải lên logo đội bóng
   - Mời thành viên tham gia đội

3. **Quản lý thành viên**:
   - Thêm thành viên mới
   - Cập nhật thông tin thành viên
   - Phân quyền thành viên (admin, manager, player)
   - Import thành viên từ danh bạ

4. **Quản lý tài chính**:
   - Ghi nhận thu/chi
   - Theo dõi quỹ đội bóng
   - Quản lý đóng góp của thành viên
   - Báo cáo tài chính

5. **Quản lý trận đấu**:
   - Lên lịch thi đấu
   - Ghi nhận kết quả
   - Thống kê thành tích
   - Phân tích hiệu suất

6. **Sắp xếp đội hình**:
   - Tạo sơ đồ chiến thuật
   - Sắp xếp vị trí cầu thủ
   - Lưu và chia sẻ đội hình
   - Quản lý cầu thủ dự bị
