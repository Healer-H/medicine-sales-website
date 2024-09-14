### **Cấu trúc thư mục tổng quan:**

```
/medicine-sales-website-project
│
├── /backend
│   ├── /controllers
│   ├── /models
│   ├── /routes
│   ├── /services
│   ├── /middlewares
│   ├── /config
│   ├── /utils
│   ├── /migrations
│   ├── /seeders
│   ├── server.js
│   └── package.json
│
├── /frontend
│   ├── /public
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /assets
│   │   ├── /hooks
│   │   ├── /services
│   │   ├── /contexts
│   │   ├── /utils
│   │   ├── /styles
│   │   ├── /store
│   │   └── App.js
│   └── package.json
|
├── /docs
│
└── README.md
```

### **Chi tiết về từng phần của cấu trúc thư mục:**

---

### **1. Thư mục Backend (Node.js)**

#### **/backend/controllers**
- Chứa các **controller** xử lý logic cho từng route. Controller nhận yêu cầu từ các route, gọi các service hoặc model cần thiết, và trả về phản hồi cho client.
  - Ví dụ: `productController.js`, `orderController.js`, `authController.js`.

#### **/backend/models**
- Chứa các **model** định nghĩa cấu trúc của bảng trong cơ sở dữ liệu. Mỗi model đại diện cho một bảng trong cơ sở dữ liệu.
  - Ví dụ: `Product.js`, `Order.js`, `User.js`.

#### **/backend/routes**
- Chứa các **route** của API, định nghĩa các endpoint mà client (React) có thể gửi yêu cầu đến. Mỗi file route sẽ liên kết với controller tương ứng.
  - Ví dụ: `productRoutes.js`, `orderRoutes.js`, `authRoutes.js`.

#### **/backend/services**
- Chứa các **service** xử lý logic nghiệp vụ, đóng vai trò trung gian giữa controller và model. Dùng để tái sử dụng các đoạn mã logic phức tạp.
  - Ví dụ: `productService.js`, `orderService.js`.

#### **/backend/middlewares**
- Chứa các **middleware** cho các hoạt động như xác thực, logging, hoặc xử lý lỗi.
  - Ví dụ: `authMiddleware.js`, `errorMiddleware.js`.

#### **/backend/config**
- Chứa các tệp cấu hình liên quan đến ứng dụng, như cấu hình cơ sở dữ liệu, cài đặt môi trường.
  - Ví dụ: `dbConfig.js`, `envConfig.js`.

#### **/backend/utils**
- Chứa các **helper functions** hoặc các tiện ích khác mà nhiều phần của ứng dụng có thể dùng chung.
  - Ví dụ: `generateToken.js`, `emailSender.js`.

#### **/backend/migrations**
- Chứa các tệp **migration** để theo dõi các thay đổi trong cơ sở dữ liệu qua thời gian.
  - Ví dụ: `202309_create_users_table.js`.

#### **/backend/seeders**
- Chứa các tệp **seeder** để tạo dữ liệu mẫu trong cơ sở dữ liệu khi cần.
  - Ví dụ: `202309_seed_users.js`.

#### **/backend/server.js**
- Tệp chính khởi chạy server Node.js. Nó sẽ liên kết các route, middleware, và các thiết lập cần thiết để ứng dụng có thể hoạt động.

#### **/backend/package.json**
- File chứa các **thông tin** về dự án back-end, bao gồm các dependency cần thiết cho Node.js.

---

### **2. Thư mục Frontend (ReactJS)**

#### **/frontend/public**
- Chứa các tài nguyên tĩnh của ứng dụng như hình ảnh, icon, và file `index.html`.

#### **/frontend/src**
- Thư mục chính chứa mã nguồn của React.

##### **/frontend/src/components**
- Chứa các **component** chung trong React, được sử dụng nhiều nơi trong ứng dụng. Mỗi component có thể có một thư mục riêng chứa các tệp `.js` và `.css` của nó.
  - Ví dụ: `Navbar.js`, `Footer.js`, `ProductCard.js`.

##### **/frontend/src/pages**
- Chứa các **trang** chính của ứng dụng, mỗi trang tương ứng với một route trong ứng dụng React.
  - Ví dụ: `HomePage.js`, `LoginPage.js`, `ProductListPage.js`.

##### **/frontend/src/assets**
- Chứa các tài nguyên tĩnh như hình ảnh, biểu tượng, và video.
  - Ví dụ: `logo.png`, `background.jpg`.

##### **/frontend/src/hooks**
- Chứa các **custom hooks** được sử dụng lại trong các component của React.
  - Ví dụ: `useAuth.js`, `useFetch.js`.

##### **/frontend/src/services**
- Chứa các **API service** được sử dụng để kết nối React với back-end Node.js. Dùng **Axios** hoặc **Fetch** để gửi yêu cầu HTTP.
  - Ví dụ: `productService.js`, `authService.js`.

##### **/frontend/src/contexts**
- Chứa các **context** của React, phục vụ việc quản lý state toàn cục của ứng dụng.
  - Ví dụ: `AuthContext.js`, `CartContext.js`.

##### **/frontend/src/utils**
- Chứa các tiện ích hoặc hàm helper được sử dụng nhiều lần trong các component.
  - Ví dụ: `formatCurrency.js`, `dateUtils.js`.

##### **/frontend/src/styles**
- Chứa các **file CSS** hoặc **SCSS** chung cho toàn ứng dụng, hoặc theo từng thành phần cụ thể.
  - Ví dụ: `main.css`, `buttons.css`.

##### **/frontend/src/store**
- Chứa các tệp liên quan đến **Redux** hoặc các phương pháp quản lý state khác.
  - Ví dụ: `productSlice.js`, `userSlice.js`.

##### **/frontend/src/App.js**
- File chính của ứng dụng React, nơi bạn cấu hình các route và logic cơ bản của ứng dụng.

#### **/frontend/package.json**
- File chứa các **thông tin** về dự án front-end, bao gồm các dependency cần thiết cho React.

---

### **3. File `README.md`**
- File này giải thích ngắn gọn về cách thiết lập và chạy cả front-end và back-end, giúp các thành viên mới trong nhóm có thể dễ dàng bắt đầu.

---