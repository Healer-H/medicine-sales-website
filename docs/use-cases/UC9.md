### **Business logic cho UC9: Xem sản phẩm bán chạy**

#### **Use Case Name**: Xem sản phẩm bán chạy

#### **Mô tả**:
Admin muốn xem danh sách các sản phẩm bán chạy nhất trong một khoảng thời gian nhất định (ngày/tuần/tháng/quý/năm). Dữ liệu này sẽ giúp admin hiểu rõ xu hướng mua sắm của khách hàng và đưa ra các quyết định kinh doanh phù hợp.

#### **Business Logic**:

1. **Xác định khoảng thời gian**:
   - Admin chọn khoảng thời gian muốn xem báo cáo sản phẩm bán chạy (ví dụ: từ ngày 01/09/2024 đến 30/09/2024 hoặc lựa chọn tuần/tháng/quý/năm cụ thể).

2. **Truy vấn dữ liệu đơn hàng**:
   - Hệ thống sẽ lấy tất cả các đơn hàng đã hoàn tất trong khoảng thời gian đã chọn từ bảng `Order`.

3. **Tính toán số lượng sản phẩm bán ra**:
   - Hệ thống sẽ kiểm tra bảng `OrderDetail` để tính tổng số lượng của từng sản phẩm được bán ra trong khoảng thời gian đó.
   - Dựa trên cột `quantity` của bảng `OrderDetail`, hệ thống sẽ tính tổng số lượng từng sản phẩm và sắp xếp theo thứ tự giảm dần.

4. **Truy xuất thông tin sản phẩm**:
   - Hệ thống kết hợp bảng `Product` để lấy thông tin chi tiết (tên sản phẩm, giá bán) của những sản phẩm bán chạy nhất.

5. **Hiển thị kết quả**:
   - Hệ thống trả về danh sách các sản phẩm bán chạy, bao gồm tên sản phẩm, số lượng đã bán, và tổng doanh thu của sản phẩm đó.

---

### **Thiết lập Database để hiện thực hóa UC9**

Để thực hiện UC9, cần thiết lập các bảng sau trong cơ sở dữ liệu:

#### **1. Bảng `Product` (Sản phẩm)**

| **Attribute**    | **Type**             | **Description**                     |
|------------------|----------------------|-------------------------------------|
| `id`             | `INT` (PK)           | Khóa chính của sản phẩm             |
| `name`           | `VARCHAR(255)`       | Tên sản phẩm                        |
| `price`          | `DECIMAL(10, 2)`     | Giá bán sản phẩm                    |
| `category_id`    | `INT`                | Khóa ngoại đến bảng `Category`      |

#### **2. Bảng `Order` (Đơn hàng)**

| **Attribute**    | **Type**             | **Description**                     |
|------------------|----------------------|-------------------------------------|
| `id`             | `INT` (PK)           | Khóa chính của đơn hàng             |
| `order_date`     | `DATE`               | Ngày đặt hàng                       |
| `total_amount`   | `DECIMAL(10, 2)`     | Tổng giá trị đơn hàng               |
| `status`         | `VARCHAR(50)`        | Trạng thái đơn hàng (đã thanh toán, đang xử lý,...) |

#### **3. Bảng `OrderDetail` (Chi tiết đơn hàng)**

| **Attribute**    | **Type**             | **Description**                     |
|------------------|----------------------|-------------------------------------|
| `id`             | `INT` (PK)           | Khóa chính                          |
| `order_id`       | `INT` (FK)`          | Khóa ngoại đến bảng `Order`         |
| `product_id`     | `INT` (FK)`          | Khóa ngoại đến bảng `Product`       |
| `quantity`       | `INT`                | Số lượng sản phẩm được bán trong đơn hàng |
| `unit_price`     | `DECIMAL(10, 2)`     | Giá sản phẩm tại thời điểm bán      |

#### **4. Bảng `Category` (Danh mục sản phẩm) (Không bắt buộc nhưng liên quan)**

| **Attribute**    | **Type**             | **Description**                     |
|------------------|----------------------|-------------------------------------|
| `id`             | `INT` (PK)           | Khóa chính                          |
| `name`           | `VARCHAR(255)`       | Tên danh mục sản phẩm               |
| `description`    | `TEXT`               | Mô tả danh mục                      |

---

### **Cách thực hiện truy vấn SQL để lấy danh sách sản phẩm bán chạy**

Giả sử bạn muốn lấy top 10 sản phẩm bán chạy nhất trong tháng 9/2024, bạn có thể sử dụng truy vấn SQL sau:

```sql
SELECT 
    p.id,
    p.name,
    SUM(od.quantity) AS total_quantity_sold,
    SUM(od.quantity * od.unit_price) AS total_revenue
FROM 
    OrderDetail od
JOIN 
    Product p ON od.product_id = p.id
JOIN 
    Order o ON od.order_id = o.id
WHERE 
    o.status = 'completed' 
    AND o.order_date BETWEEN '2024-09-01' AND '2024-09-30'
GROUP BY 
    p.id, p.name
ORDER BY 
    total_quantity_sold DESC
LIMIT 10;
```

### **Giải thích truy vấn:**
- **SUM(od.quantity)**: Tính tổng số lượng sản phẩm bán ra cho mỗi sản phẩm.
- **SUM(od.quantity * od.unit_price)**: Tính tổng doanh thu cho mỗi sản phẩm.
- **WHERE o.status = 'completed'**: Lọc các đơn hàng đã hoàn tất.
- **GROUP BY**: Nhóm theo sản phẩm để tính tổng số lượng và doanh thu.
- **ORDER BY**: Sắp xếp theo số lượng bán ra giảm dần để tìm các sản phẩm bán chạy nhất.
- **LIMIT 10**: Giới hạn danh sách kết quả để lấy top 10 sản phẩm bán chạy.

---