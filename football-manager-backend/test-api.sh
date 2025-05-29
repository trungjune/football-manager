#!/bin/bash

# Hiển thị banner
echo "====================================================="
echo "  Football Manager Backend - Kiểm tra API"
echo "====================================================="

# Biến lưu trữ token
TOKEN=""

# Hàm gửi request
function send_request() {
    local method=$1
    local endpoint=$2
    local data=$3
    local auth=$4
    
    echo -e "\n\033[1;36m[$method] $endpoint\033[0m"
    
    local auth_header=""
    if [ "$auth" = "true" ] && [ ! -z "$TOKEN" ]; then
        auth_header="-H \"Authorization: Bearer $TOKEN\""
    fi
    
    local cmd=""
    if [ "$method" = "GET" ]; then
        cmd="curl -s -X $method \"http://localhost:3001$endpoint\" $auth_header"
    else
        cmd="curl -s -X $method \"http://localhost:3001$endpoint\" -H \"Content-Type: application/json\" $auth_header -d '$data'"
    fi
    
    echo "Request: $cmd"
    
    # Thực thi lệnh curl và lưu kết quả
    local result=$(eval $cmd)
    
    # In kết quả đã format
    echo -e "\nResponse:"
    echo $result | jq '.' || echo $result
    
    echo -e "\n---------------------------------------------------"
    
    # Trả về kết quả
    echo $result
}

# Kiểm tra API health
echo "Kiểm tra kết nối đến server..."
curl -s http://localhost:3001/api/docs > /dev/null
if [ $? -ne 0 ]; then
    echo "Không thể kết nối đến server. Vui lòng đảm bảo server đang chạy."
    exit 1
fi

echo "Server đang hoạt động."
echo "---------------------------------------------------"

# Đăng nhập với tài khoản admin
echo "Đăng nhập với tài khoản admin..."
login_response=$(send_request "POST" "/auth/login" '{"email": "admin@example.com", "password": "admin123"}')

# Trích xuất token
TOKEN=$(echo $login_response | jq -r '.access_token')

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
    echo "Đăng nhập thất bại. Không thể lấy token."
    exit 1
fi

echo "Đăng nhập thành công. Token: ${TOKEN:0:20}..."

# Lấy thông tin người dùng hiện tại
send_request "GET" "/auth/profile" "" "true"

# Lấy danh sách đội bóng
send_request "GET" "/teams" "" "true"

# Lấy danh sách thành viên
send_request "GET" "/members" "" "true"

# Lấy danh sách trận đấu
send_request "GET" "/matches" "" "true"

# Lấy tổng kết tài chính
send_request "GET" "/finance/summary" "" "true"

echo "====================================================="
echo "  Kiểm tra API hoàn tất"
echo "=====================================================" 