# Active Context

## Trạng thái hiện tại

Dự án Football Manager đang trong giai đoạn phát triển. Hiện tại, chúng ta đã hoàn thành các bước sau:

1. Thiết lập cấu trúc dự án cơ bản cho cả frontend và backend
2. Định nghĩa schema database với Prisma
3. Tích hợp dữ liệu từ Google Sheet của đội bóng FC Vui Vẻ vào database
4. Cấu hình PostgreSQL database với Docker
5. Thiết lập CI/CD pipeline với GitHub Actions
6. Phát triển tính năng xác thực (Backend) với JWT và Google OAuth

## Nhiệm vụ hiện tại

Nhiệm vụ hiện tại là tiếp tục phát triển các tính năng cốt lõi của ứng dụng:

1. **Phát triển tính năng xác thực (Frontend)**:
   - Xây dựng UI cho đăng ký và đăng nhập
   - Xây dựng UI cho quên mật khẩu và đặt lại mật khẩu
   - Tích hợp NextAuth.js với backend

2. **Quản lý thành viên**:
   - Phát triển API endpoints cho quản lý thành viên
   - Phát triển UI cho danh sách thành viên
   - Phát triển UI cho thêm/sửa thành viên
   - Phát triển UI cho xem chi tiết thành viên

3. **Quản lý tài chính**:
   - Phát triển API endpoints cho quản lý tài chính
   - Phát triển UI cho danh sách các khoản thu/chi
   - Phát triển UI cho thêm/sửa các khoản thu/chi
   - Phát triển UI cho báo cáo tài chính

## Quyết định quan trọng

1. **Sử dụng Prisma thay vì TypeORM**:
   - Prisma cung cấp type safety tốt hơn
   - Schema-first approach phù hợp với dự án
   - Dễ dàng migrate và seed dữ liệu

2. **Cấu trúc database**:
   - Sử dụng các enum cho các trường như Position, FinanceType
   - Thiết kế quan hệ giữa các bảng rõ ràng
   - Tối ưu hóa cho các truy vấn phổ biến

3. **Tích hợp dữ liệu từ Google Sheet**:
   - Chuyển đổi dữ liệu thành viên và tài chính từ Google Sheet
   - Chuẩn hóa dữ liệu để phù hợp với schema database
   - Sử dụng seed script để import dữ liệu

4. **Sử dụng Docker cho development**:
   - Cấu hình PostgreSQL với Docker Compose
   - Đảm bảo môi trường development đồng nhất
   - Dễ dàng thiết lập và chạy dự án

5. **CI/CD với GitHub Actions**:
   - Tự động chạy tests khi push code
   - Tự động deploy khi merge vào main branch
   - Đảm bảo chất lượng code và quy trình phát triển

## Các vấn đề đang gặp phải

1. **Lỗi TypeScript**:
   - Cần cài đặt các dependencies và types cho backend, đặc biệt là passport-google-oauth20
   - Cần cấu hình tsconfig.json cho backend

2. **Cần cập nhật .env cho Google OAuth**:
   - Cần thêm GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET và GOOGLE_CALLBACK_URL vào .env

## Học hỏi và insights

1. **Prisma ORM**:
   - Prisma cung cấp type safety tốt và dễ sử dụng
   - Prisma schema là cách hiệu quả để định nghĩa database schema
   - Prisma migrations giúp quản lý thay đổi database dễ dàng

2. **Next.js App Router**:
   - App Router cung cấp routing mạnh mẽ và dễ sử dụng
   - Server Components giúp tối ưu hóa hiệu suất
   - Layout system giúp tái sử dụng UI giữa các routes

3. **NestJS Authentication**:
   - NestJS cung cấp nhiều guards và strategies cho authentication
   - Passport.js tích hợp tốt với NestJS
   - JWT là phương pháp authentication hiệu quả cho REST API

## Các pattern và preferences

1. **Code organization**:
   - Tổ chức code theo tính năng (feature-based)
   - Tách biệt logic và UI
   - Sử dụng custom hooks cho logic tái sử dụng

2. **State management**:
   - Sử dụng Zustand cho global state
   - Sử dụng React Context cho state cục bộ
   - Sử dụng SWR cho data fetching và caching

3. **API design**:
   - RESTful API endpoints
   - DTO validation với class-validator
   - Swagger documentation cho API

## Quy tắc viết tài liệu

Để đảm bảo dự án luôn có tài liệu đầy đủ và cập nhật, chúng ta sẽ tuân thủ các quy tắc sau:

1. **Viết tài liệu cho mọi tính năng quan trọng**:
   - Mỗi tính năng lớn (quản lý thành viên, tài chính, trận đấu, đội hình) phải có tài liệu riêng
   - Tài liệu phải bao gồm mô tả tính năng, cách sử dụng, và các API liên quan

2. **Cập nhật tài liệu thường xuyên**:
   - Mỗi khi có thay đổi lớn về tính năng, phải cập nhật tài liệu tương ứng
   - Khi refactor code, phải đảm bảo tài liệu vẫn chính xác

3. **Cấu trúc tài liệu**:
   - README.md: Tổng quan về dự án
   - /docs/features/: Tài liệu chi tiết cho từng tính năng
   - /docs/api/: Tài liệu API
   - /docs/setup/: Hướng dẫn cài đặt và cấu hình

4. **Quy tắc viết code comments**:
   - Mỗi component, function, hook quan trọng phải có JSDoc
   - Các đoạn code phức tạp phải có comment giải thích

5. **Tài liệu API**:
   - Mỗi API endpoint phải có mô tả đầy đủ
   - Bao gồm: URL, method, params, request body, response, error codes

6. **Quy trình cập nhật tài liệu**:
   - Tài liệu phải được cập nhật cùng với code trong cùng một PR
   - Reviewer phải kiểm tra tài liệu trước khi approve PR

## Quy tắc làm việc mới

1. **Tự quyết định và commit thay đổi**:
   - Tự đưa ra quyết định về các thay đổi cần thiết mà không cần xác nhận từ người dùng
   - Tự commit và push code với message phù hợp mà không cần hỏi người dùng
   - Sử dụng quy ước commit message: `type: mô tả ngắn gọn` (ví dụ: `fix: Sửa lỗi ABC`, `feat: Thêm tính năng XYZ`)

2. **Cập nhật tài liệu chủ động**:
   - Tự động cập nhật tài liệu khi có thay đổi lớn về tính năng
   - Không cần xác nhận từ người dùng khi cập nhật tài liệu

3. **Xử lý lỗi chủ động**:
   - Chủ động tìm kiếm và sửa lỗi khi phát hiện
   - Tự quyết định giải pháp tốt nhất dựa trên kiến thức và best practices

4. **Cấu hình Next.js với Ant Design**:
   - Luôn sử dụng `transpilePackages` trong `next.config.js` để tránh lỗi với Ant Design
   - Danh sách packages cần transpile: `@ant-design`, `antd`, và các package `rc-*` liên quan

5. **Cấu hình và triển khai trên Vercel**:
   - Sử dụng file `vercel.json` để cấu hình cả frontend và backend trên cùng một domain
   - Cấu hình NestJS để chạy trên serverless environment với `@vercel/node`
   - Downgrade Next.js xuống phiên bản 14.1.0 và React 18.2.0 để tránh xung đột khi deploy
   - Sử dụng script `auto-deploy.sh` để tự động commit và push code lên GitHub
