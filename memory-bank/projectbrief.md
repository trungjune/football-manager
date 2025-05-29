# Football Manager - Quản lý đội bóng sân 7

## Tổng quan dự án

Football Manager là ứng dụng web quản lý đội bóng sân 7, giúp người dùng quản lý đội bóng một cách chuyên nghiệp, từ thành viên, tài chính, lịch thi đấu đến sắp xếp đội hình ra sân.

## Mục tiêu dự án

- Xây dựng ứng dụng web quản lý đội bóng sân 7 toàn diện
- Tích hợp dữ liệu từ Google Sheet của đội bóng FC Vui Vẻ
- Cung cấp các tính năng quản lý thành viên, tài chính, lịch thi đấu và sắp xếp đội hình

## Yêu cầu kỹ thuật

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Ant Design + Tailwind CSS
- SWR cho data fetching
- Zustand cho state management

### Backend
- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Swagger API Documentation

## Các tính năng chính

1. **Quản lý thành viên**
   - Thêm, sửa, xóa thành viên
   - Phân loại theo vị trí thi đấu
   - Xếp hạng kỹ năng

2. **Quản lý tài chính**
   - Theo dõi đóng góp của từng thành viên
   - Quản lý thu chi
   - Báo cáo tài chính theo tháng/năm

3. **Lịch thi đấu**
   - Lên lịch các trận đấu
   - Ghi nhận kết quả
   - Thống kê thành tích

4. **Sắp xếp đội hình**
   - Tạo và lưu các sơ đồ chiến thuật
   - Sắp xếp vị trí cầu thủ trực quan trên sân

## Timeline

- **Phase 1**: Thiết lập dự án, tích hợp dữ liệu từ Google Sheet
- **Phase 2**: Phát triển các tính năng quản lý thành viên và tài chính
- **Phase 3**: Phát triển tính năng lịch thi đấu và sắp xếp đội hình
- **Phase 4**: Testing, deployment và hoàn thiện
