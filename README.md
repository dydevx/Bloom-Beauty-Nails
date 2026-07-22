# Bloom Beauty&Nails

Đây là website React + Vite, vì vậy không mở trực tiếp `index.html` bằng `file://`.

## Mở website trên Windows

Double-click vào **`START-WEBSITE.cmd`**. File này sẽ tự khởi động máy chủ cục bộ và mở website tại:

`http://127.0.0.1:4173`

Giữ cửa sổ server chạy trong lúc xem website. Khi không cần nữa, có thể đóng cửa sổ đó.

## Chạy bằng dòng lệnh

Do tên thư mục chứa ký tự `&`, nếu npm script gặp lỗi trên PowerShell, dùng lệnh trực tiếp:

```powershell
node .\node_modules\vite\bin\vite.js --host 127.0.0.1 --port 4173
```
