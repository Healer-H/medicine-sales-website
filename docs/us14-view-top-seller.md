### User Story: Xem danh sách sản phẩm bán chạy nhất

#### **Use Case Name**: Xem danh sách sản phẩm bán chạy nhất
| **Use Case ID**          | UC14                                       |
|-------------------------|--------------------------------------------|
| **Use Case Description** | Admin xem danh sách các sản phẩm bán chạy nhất trong một khoảng thời gian nhất định. |
| **Actor**                | Admin                                      |
| **Priority**             | Cao                                        |
| **Trigger**              | Admin muốn kiểm tra danh sách sản phẩm bán chạy để đánh giá hiệu quả kinh doanh. |
| **Pre-Condition**        | Dữ liệu bán hàng đã được ghi nhận và hệ thống có khả năng phân tích. |
| **Post-Condition**       | Danh sách sản phẩm bán chạy hiển thị đầy đủ và chính xác. |

---

### Business Flow

1. **Admin Request**: Admin gửi yêu cầu lấy danh sách sản phẩm bán chạy nhất qua API.
2. **Authentication & Authorization**: Hệ thống xác thực và kiểm tra quyền hạn của admin.
3. **Validate Dates**: Hệ thống kiểm tra định dạng và tính hợp lệ của `startDate` và `endDate`.
4. **Fetch Sales Data**: Hệ thống truy vấn cơ sở dữ liệu để lấy dữ liệu bán hàng.
5. **Analyze Data**: Hệ thống phân tích dữ liệu bán hàng để xác định các sản phẩm bán chạy nhất.
6. **Return Data**: Hệ thống trả về danh sách sản phẩm bán chạy nhất cho admin.

---

### Implementation Logic

1. **API Endpoint**: Tạo một endpoint mới trong `backend/src/routes/product.routes.js` để admin có thể gửi yêu cầu.
2. **Controller Method**: Thêm phương thức mới trong `ProductController` (`backend/src/controllers/product.controller.js`) để xử lý yêu cầu từ admin.
3. **Service Method**: Thêm phương thức mới trong `ProductService` (`backend/src/services/product.service.js`) để truy vấn và phân tích dữ liệu bán hàng.
4. **Database Query**: Viết truy vấn SQL để lấy dữ liệu bán hàng và tính toán sản phẩm bán chạy nhất.
5. **Response**: Trả về danh sách sản phẩm bán chạy nhất cho admin.

---

### API Documentation

#### **Endpoint**: `/products/top-selling`
- **Method**: `GET`
- **Description**: Lấy danh sách sản phẩm bán chạy nhất trong một khoảng thời gian nhất định.
- **Parameters**:
  - `startDate` (optional): Ngày bắt đầu (format: `YYYY-MM-DD`)
  - `endDate` (optional): Ngày kết thúc (format: `YYYY-MM-DD`)
- **Responses**:
  - `200 OK`: Trả về danh sách sản phẩm bán chạy nhất.
  - `400 Bad Request`: Đầu vào không hợp lệ.
  - `401 Unauthorized`: Không có quyền truy cập.
  - `500 Internal Server Error`: Lỗi máy chủ.

---
