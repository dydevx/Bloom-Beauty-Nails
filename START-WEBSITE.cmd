@echo off
setlocal
cd /d "%~dp0"

if not exist "node_modules\vite\bin\vite.js" (
  echo Dang cai dat thu vien lan dau, vui long doi...
  call npm.cmd install
)

start "Bloom Beauty and Nails Server" /min node "node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 4173
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4173"
endlocal
exit /b 0
