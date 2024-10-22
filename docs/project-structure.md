### **Cấu trúc thư mục tổng quan:**
```
```
medicine-sales-website/
├── backend/                      # Main directory for backend
│   ├── env/                      # Environment configuration files
│   │   ├── development.env       # Environment variables for development
│   │   └── production.env        # Environment variables for production
│   ├── spec/                     # Test and report files
│   │   ├── config/               # Test configuration
│   │   ├── reports/              # Test report storage
│   │   └── tests/                # Test files for the project
│   ├── src/                      # Main source code directory
│   │   ├── config/               # Application configuration
│   │   ├── constants/            # Application constants
│   │   │   ├── envVars.js        # Environment variable constants
│   │   │   ├── httpStatusCodes.js# HTTP status code constants
│   │   │   ├── messages.js       # Message constants
│   │   │   └── paths.js          # Path-related constants
│   │   ├── controllers/          # Controllers handling client requests
│   │   ├── middlewares/          # Middlewares processing before reaching controllers
│   │   ├── models/               # Data models
│   │   ├── routes/               # Application routes
│   │   ├── services/             # Application logic services
│   │   ├── utils/                # General utilities
│   │   ├── index.js              # Application entry point
│   │   └── server.js             # Server configuration and startup
│   ├── .eslintignore             # Files and directories ignored by ESLint
│   ├── .prettierignore           # Files and directories ignored by Prettier
│   ├── .prettierrc.yml           # Prettier configuration
│   ├── package-lock.json         # Package version lock file (auto-generated)
│   └── package.json              # Project information and dependencies
├── frontend/
│   ├── public/                   # Static resources like images, icons, and index.html
│   ├── src/                      # Main source code directory for React
│   │   ├── components/           # Reusable React components
│   │   ├── pages/                # Main application pages
│   │   ├── assets/               # Static resources like images and videos
│   │   ├── hooks/                # Custom React hooks
│   │   ├── services/             # API services for backend communication
│   │   ├── contexts/             # React contexts for global state management
│   │   ├── utils/                # Utility functions
│   │   ├── styles/               # CSS or SCSS files
│   │   ├── store/                # State management files (e.g., Redux)
│   │   └── App.js                # Main React application file
│   └── package.json              # Project information and dependencies
├── docs/                         # Documentation
└── README.md                     # Setup and run instructions for the project
```

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
