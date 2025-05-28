#!/bin/bash
# Script để chạy bộ slide một cách dễ dàng

echo "===== Chạy Bộ Slide ONEDX Memory Bank + Cursor ====="
echo ""

# Kiểm tra xem npm có được cài đặt không
if command -v npm &> /dev/null; then
    echo "Sử dụng npx serve để chạy slide..."
    echo "Bộ slide sẽ được chạy tại địa chỉ: http://localhost:3000"
    echo "Nhấn Ctrl+C để dừng server"
    echo ""
    npx serve .
    exit 0
fi

# Nếu npm không có, kiểm tra python
if command -v python3 &> /dev/null; then
    echo "Sử dụng Python 3 để chạy slide..."
    echo "Bộ slide sẽ được chạy tại địa chỉ: http://localhost:8000"
    echo "Nhấn Ctrl+C để dừng server"
    echo ""
    python3 -m http.server
    exit 0
elif command -v python &> /dev/null; then
    # Kiểm tra phiên bản Python
    version=$(python -c 'import sys; print(sys.version_info[0])')
    if [ "$version" = "3" ]; then
        echo "Sử dụng Python 3 để chạy slide..."
        echo "Bộ slide sẽ được chạy tại địa chỉ: http://localhost:8000"
        echo "Nhấn Ctrl+C để dừng server"
        echo ""
        python -m http.server
    else
        echo "Sử dụng Python 2 để chạy slide..."
        echo "Bộ slide sẽ được chạy tại địa chỉ: http://localhost:8000"
        echo "Nhấn Ctrl+C để dừng server"
        echo ""
        python -m SimpleHTTPServer
    fi
    exit 0
fi

# Nếu không có công cụ nào được cài đặt
echo "Không tìm thấy npm hoặc python để chạy HTTP server."
echo "Vui lòng cài đặt Node.js hoặc Python, hoặc mở trực tiếp file index.html trong trình duyệt."
echo ""

exit 1
