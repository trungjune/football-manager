@echo off
echo ===== Chay Bo Slide ONEDX Memory Bank + Cursor =====
echo.

REM Kiem tra npm
where npm >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo Su dung npx serve de chay slide...
    echo Bo slide se duoc chay tai dia chi: http://localhost:3000
    echo Nhan Ctrl+C de dung server
    echo.
    npx serve .
    exit /b 0
)

REM Kiem tra python
where python >nul 2>nul
if %ERRORLEVEL% == 0 (
    python -c "import sys; sys.exit(0 if sys.version_info[0] == 3 else 1)" >nul 2>nul
    if %ERRORLEVEL% == 0 (
        echo Su dung Python 3 de chay slide...
        echo Bo slide se duoc chay tai dia chi: http://localhost:8000
        echo Nhan Ctrl+C de dung server
        echo.
        python -m http.server
    ) else (
        echo Su dung Python 2 de chay slide...
        echo Bo slide se duoc chay tai dia chi: http://localhost:8000
        echo Nhan Ctrl+C de dung server
        echo.
        python -m SimpleHTTPServer
    )
    exit /b 0
)

REM Neu khong co cong cu nao duoc cai dat
echo Khong tim thay npm hoac python de chay HTTP server.
echo Vui long cai dat Node.js hoac Python, hoac mo truc tiep file index.html trong trinh duyet.
echo.

pause
