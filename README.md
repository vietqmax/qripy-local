# QRipy

### Author: Hieu Huynh

# Biến môi trường

| Tên      | Mô tả                | Giá trị mặc định |
| -------- | -------------------- | ---------------- |
| CORS     | Cors accepted values | "\*"             |
| NODE_ENV | Environment          | development      |
| PORT     | Server port          | 3001             |

# Hướng dẫn

- Đổi tên file **.env.example** thành **.env** (Không push file **.env** lên github)

- Cài đặt các gói

```
npm install
```

- Các lệnh build dựa vào môi trường

```
npm start
```

Đường dẫn `http://localhost:3001`

## Cấu trúc thư mục

| Tên                      | Mô tả                                       |
| ------------------------ | ------------------------------------------- |
| **src/config/config.js** | Các cấu hình dành riêng cho từng môi trường |
| **src/controllers**      | Chứa các file controller                    |
| **src/ultils/common.js** | Chứa các function được sử dụng thường xuyên |
| **src/middlewares**      | Chứa các file middleware                    |
| **src/routes**           | Chứa các file route                         |
| **src/models**           | Chứa các file models                        |
| **src/server.js**        | File setup express                          |
| **src/locales**          | Language folder                             |
| **src/views**            | View folder                                 |
| **node_modules**         | Chứa tất cả các thư viện npm                |
| **package.json**         | Thông tin project và các npm đã cài         |
| **.env**                 | Chứa các biến mặc định                      |
