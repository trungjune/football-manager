#!/bin/bash

# Màu sắc để hiển thị
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== BẮT ĐẦU QUÁ TRÌNH DEPLOY TỰ ĐỘNG ===${NC}"

# Kiểm tra thay đổi
echo -e "${YELLOW}Kiểm tra thay đổi...${NC}"
git status

# Thêm tất cả các file đã thay đổi
echo -e "${YELLOW}Thêm tất cả các file đã thay đổi...${NC}"
git add .

# Yêu cầu người dùng nhập message commit
echo -e "${YELLOW}Nhập message commit (để trống để sử dụng message mặc định):${NC}"
read commit_message

# Sử dụng message mặc định nếu người dùng không nhập
if [ -z "$commit_message" ]
then
  commit_message="Cập nhật tự động $(date +"%d/%m/%Y %H:%M:%S")"
fi

# Commit các thay đổi
echo -e "${YELLOW}Commit với message: ${commit_message}${NC}"
git commit -m "$commit_message"

# Push lên GitHub
echo -e "${YELLOW}Đang push lên GitHub...${NC}"
git push origin main

# Kiểm tra kết quả push
if [ $? -eq 0 ]
then
  echo -e "${GREEN}✓ Push thành công! Vercel sẽ tự động deploy.${NC}"
  echo -e "${GREEN}✓ Kiểm tra trạng thái deploy tại: https://vercel.com/trungs-projects-4a25ad7a/football-manager${NC}"
else
  echo -e "${RED}✗ Push thất bại. Vui lòng kiểm tra lỗi và thử lại.${NC}"
  exit 1
fi

echo -e "${BLUE}=== KẾT THÚC QUÁ TRÌNH DEPLOY ===${NC}" 