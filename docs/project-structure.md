### **Cấu trúc thư mục tổng quan:**
```
medicine-sales-website/
├── backend/                      # Thư mục chính cho backend
│   ├── env/                      # Các tệp cấu hình môi trường
│   │   ├── development.env       # Biến môi trường cho phát triển
│   │   └── production.env        # Biến môi trường cho sản xuất
│   ├── spec/                     # Các tệp kiểm thử và báo cáo
│   │   ├── config/               # Cấu hình kiểm thử
│   │   ├── reports/              # Lưu trữ báo cáo kiểm thử
│   │   └── tests/                # Các tệp kiểm thử cho dự án
│   ├── src/                      # Thư mục mã nguồn chính
│   │   ├── config/               # Cấu hình ứng dụng
│   │   ├── constants/            # Các hằng số của ứng dụng
│   │   │   ├── envVars.js        # Hằng số biến môi trường
│   │   │   ├── httpStatusCodes.js# Hằng số mã trạng thái HTTP
│   │   │   ├── messages.js       # Hằng số thông báo
│   │   │   └── paths.js          # Hằng số liên quan đến đường dẫn
│   │   ├── controllers/          # Các bộ điều khiển xử lý yêu cầu từ client
│   │   ├── middlewares/          # Các middleware xử lý trước khi đến controller
│   │   ├── models/               # Các mô hình dữ liệu
│   │   ├── routes/               # Các tuyến đường của ứng dụng
│   │   ├── services/             # Các dịch vụ logic của ứng dụng
│   │   ├── utils/                # Các tiện ích chung
│   │   ├── index.js              # Điểm vào của ứng dụng
│   │   └── server.js             # Cấu hình và khởi động server
│   ├── .eslintignore             # Các tệp và thư mục bị ESLint bỏ qua
│   ├── .prettierignore           # Các tệp và thư mục bị Prettier bỏ qua
│   ├── .prettierrc.yml           # Cấu hình Prettier
│   ├── package-lock.json         # Tệp khóa phiên bản gói (tự động tạo)
│   └── package.json              # Thông tin dự án và các phụ thuộc
├── frontend/
│   ├── public/                   # Tài nguyên tĩnh như hình ảnh, biểu tượng, và index.html
│   ├── src/                      # Thư mục mã nguồn chính cho React
│   │   ├── components/           # Các thành phần React có thể tái sử dụng
│   │   ├── pages/                # Các trang chính của ứng dụng
│   │   ├── assets/               # Tài nguyên tĩnh như hình ảnh và video
│   │   ├── hooks/                # Các hook tùy chỉnh của React
│   │   ├── services/             # Các dịch vụ API để giao tiếp với backend
│   │   ├── contexts/             # Các context của React để quản lý state toàn cục
│   │   ├── utils/                # Các hàm tiện ích
│   │   ├── styles/               # Các tệp CSS hoặc SCSS
│   │   ├── store/                # Các tệp quản lý state (ví dụ: Redux)
│   │   └── App.js                # Tệp chính của ứng dụng React
│   └── package.json              # Thông tin dự án và các phụ thuộc
├── docs/                         # Tài liệu
└── README.md                     # Hướng dẫn thiết lập và chạy dự án

### **Cấu trúc thư mục chi tiết:**

---

### **1. Thư mục Backend (Node.js)**

#### **/backend/env**
- Chứa các tệp cấu hình môi trường.
  - Ví dụ: `development.env`, `production.env`.

#### **/backend/spec**
- Chứa các tệp kiểm thử và báo cáo.
  - Ví dụ: `config/`, `reports/`, `tests/`.

#### **/backend/src**
- Thư mục mã nguồn chính.

##### **/backend/src/config**
- Chứa các tệp cấu hình ứng dụng.
  - Ví dụ: `dbConfig.js`, `envConfig.js`.

##### **/backend/src/constants**
- Chứa các hằng số của ứng dụng.
  - Ví dụ: `envVars.js`, `httpStatusCodes.js`, `messages.js`, `paths.js`.

##### **/backend/src/controllers**
- Chứa các bộ điều khiển xử lý yêu cầu từ client.
  - Ví dụ: `productController.js`, `orderController.js`, `authController.js`.

##### **/backend/src/middlewares**
- Chứa các middleware xử lý trước khi đến controller.
  - Ví dụ: `authMiddleware.js`, `errorMiddleware.js`.

##### **/backend/src/models**
- Chứa các mô hình dữ liệu.
  - Ví dụ: `Product.js`, `Order.js`, `User.js`.

##### **/backend/src/routes**
- Chứa các tuyến đường của ứng dụng.
  - Ví dụ: `productRoutes.js`, `orderRoutes.js`, `authRoutes.js`.

##### **/backend/src/services**
- Chứa các dịch vụ logic của ứng dụng.
  - Ví dụ: `productService.js`, `orderService.js`.

##### **/backend/src/utils**
- Chứa các tiện ích chung.
  - Ví dụ: `generateToken.js`, `emailSender.js`.

##### **/backend/src/index.js**
- Ứng dụng khởi chạy.

##### **/backend/src/server.js**
- Cấu hình server trước khi khởi động bao gồm cấu hình các middleware cơ bản, kết nối database và khơi tạo các route.

#### **/backend/.eslintignore**
- Các tệp và thư mục bị ESLint bỏ qua.

#### **/backend/.prettierignore**
- Các tệp và thư mục bị Prettier bỏ qua.

#### **/backend/.prettierrc.yml**
- Cấu hình Prettier.

---

### **2. Thư mục Frontend (ReactJS)**

#### **/frontend/public**
- Chứa các tài nguyên tĩnh của ứng dụng như hình ảnh, icon, và file `index.html`.

#### **/frontend/src**
- Thư mục chính chứa mã nguồn của React.

##### **/frontend/src/components**
- Chứa các component chung trong React, được sử dụng nhiều nơi trong ứng dụng. Mỗi component có thể có một thư mục riêng chứa các tệp `.js` và `.css` của nó.
  - Ví dụ: `Navbar.js`, `Footer.js`, `ProductCard.js`.

##### **/frontend/src/pages**
- Chứa các trang chính của ứng dụng, mỗi trang tương ứng với một route trong ứng dụng React.
  - Ví dụ: `HomePage.js`, `LoginPage.js`, `ProductListPage.js`.

##### **/frontend/src/assets**
- Chứa các tài nguyên tĩnh như hình ảnh, biểu tượng, và video.
  - Ví dụ: `logo.png`, `background.jpg`.

##### **/frontend/src/hooks**
- Chứa các custom hooks được sử dụng lại trong các component của React.
  - Ví dụ: `useAuth.js`, `useFetch.js`.

##### **/frontend/src/services**
- Chứa các API service được sử dụng để kết nối React với back-end Node.js. Dùng Axios hoặc Fetch để gửi yêu cầu HTTP.
  - Ví dụ: `productService.js`, `authService.js`.

##### **/frontend/src/contexts**
- Chứa các context của React, phục vụ việc quản lý state toàn cục của ứng dụng.
  - Ví dụ: `AuthContext.js`, `CartContext.js`.

##### **/frontend/src/utils**
- Chứa các tiện ích hoặc hàm helper được sử dụng nhiều lần trong các component.
  - Ví dụ: `formatCurrency.js`, `dateUtils.js`.

##### **/frontend/src/styles**
- Chứa các file CSS hoặc SCSS chung cho toàn ứng dụng, hoặc theo từng thành phần cụ thể.
  - Ví dụ: `main.css`, `buttons.css`.

##### **/frontend/src/store**
- Chứa các tệp liên quan đến Redux hoặc các phương pháp quản lý state khác.
  - Ví dụ: `productSlice.js`, `userSlice.js`.

##### **/frontend/src/App.js**
- File chính của ứng dụng React, nơi bạn cấu hình các route và logic cơ bản của ứng dụng.

#### **/frontend/package.json**
- Tệp chứa các thông tin về dự án front-end, bao gồm các dependency cần thiết cho React.

---

### **3. File `README.md`**
- File này giải thích ngắn gọn về cách thiết lập và chạy cả front-end và back-end, giúp các thành viên mới trong nhóm có thể dễ dàng bắt đầu.

---
```
