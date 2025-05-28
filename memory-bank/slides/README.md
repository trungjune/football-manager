# Bộ Slide Giới Thiệu Memory Bank + Cursor trong ONEDX

Đây là bộ slide giới thiệu về việc triển khai Memory Bank và Cursor trong dự án ONEDX. Bộ slide được xây dựng bằng reveal.js, một thư viện JavaScript để tạo các bài thuyết trình tương tác.

## Cách Mở Bộ Slide

Có 2 cách để mở bộ slide:

### Cách 1: Mở Trực Tiếp File HTML

1. Chỉ cần mở file `index.html` trong thư mục này bằng trình duyệt web
2. Bộ slide sẽ được hiển thị và bạn có thể điều hướng bằng các phím mũi tên

### Cách 2: Sử Dụng HTTP Server (Khuyến nghị)

Để các tính năng hoạt động tốt nhất, nên chạy slide thông qua một HTTP server.

**Sử dụng Node.js:**

```bash
# Nếu bạn đã cài đặt Node.js
npx serve slides

# Hoặc cài đặt http-server
npm install -g http-server
http-server slides
```

**Sử dụng Python:**

```bash
# Python 3
cd slides
python -m http.server

# Python 2
cd slides
python -m SimpleHTTPServer
```

Sau đó mở trình duyệt và truy cập `http://localhost:8000` hoặc URL được hiển thị trong terminal.

## Điều Hướng Trong Bộ Slide

- Phím **mũi tên trái/phải**: Di chuyển giữa các slide
- Phím **mũi tên lên/xuống**: Di chuyển giữa các sub-slide (nếu có)
- Phím **Esc**: Xem tổng quan tất cả các slide
- Phím **F**: Chế độ toàn màn hình
- Phím **S**: Mở chế độ presenter notes
- Phím **B** hoặc **.**: Tạm dừng (màn hình đen)

## Thông Tin Thêm

- Bộ slide này sử dụng [reveal.js](https://revealjs.com/)
- Các biểu đồ được tạo bằng [Mermaid](https://mermaid.js.org/) và được nhúng dưới dạng ảnh
- Theme màu được tùy chỉnh để phù hợp với ONEDX

## Nội Dung Chính

1. Giới thiệu về Memory Bank và Cursor
2. Cấu trúc Memory Bank
3. Các mode và quy trình làm việc
4. Hiệu quả đo lường được
5. Cách triển khai thực tế
