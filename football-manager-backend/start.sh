#!/bin/bash

# Hiển thị banner
echo "====================================================="
echo "  Football Manager Backend - Khởi động hệ thống"
echo "====================================================="

# Kiểm tra Docker
echo "Kiểm tra Docker..."
if ! command -v docker &> /dev/null; then
    echo "Docker không được cài đặt. Vui lòng cài đặt Docker trước."
    exit 1
fi

# Khởi động database
echo "Khởi động PostgreSQL database..."
docker-compose up -d

# Cài đặt dependencies
echo "Cài đặt dependencies..."
npm install

# Tạo file .env nếu chưa tồn tại
if [ ! -f .env ]; then
    echo "Tạo file .env từ .env.example..."
    cp .env.example .env
fi

# Chạy migrations
echo "Chạy migrations..."
npx prisma migrate dev --name init

# Chạy seed để tạo dữ liệu mẫu
echo "Tạo dữ liệu mẫu..."
npm run prisma:seed

# Khởi động ứng dụng
echo "Khởi động ứng dụng..."
npm run start:dev 