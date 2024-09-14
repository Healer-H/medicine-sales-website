### **Use Case 1: Đăng nhập vào hệ thống**

| **Use Case Name**       | Đăng nhập vào hệ thống (cho nhân viên) |
|-------------------------|-----------------------------------------|
| **Use Case ID**          | UC01                                   |
| **Use Case Description** | Nhân viên bán hàng đăng nhập vào hệ thống bằng tài khoản cá nhân để truy cập các chức năng. |
| **Actor**                | Nhân viên bán hàng                     |
| **Priority**             | Cao                                    |
| **Trigger**              | Nhân viên cần truy cập vào hệ thống.   |
| **Pre-Condition**        | Nhân viên đã có tài khoản hợp lệ.      |
| **Post-Condition**       | Nhân viên đăng nhập thành công và có thể sử dụng các tính năng của hệ thống. |

---

### **Use Case 2: Tìm kiếm sản phẩm**

| **Use Case Name**       | Tìm kiếm sản phẩm                       |
|-------------------------|-----------------------------------------|
| **Use Case ID**          | UC02                                   |
| **Use Case Description** | Nhân viên bán hàng tìm kiếm sản phẩm theo tên, mã hoặc danh mục để xem thông tin và thêm vào hóa đơn. |
| **Actor**                | Nhân viên bán hàng                     |
| **Priority**             | Cao                                    |
| **Trigger**              | Nhân viên cần tìm kiếm sản phẩm để tư vấn hoặc bán hàng. |
| **Pre-Condition**        | Nhân viên đã đăng nhập và hệ thống có dữ liệu sản phẩm. |
| **Post-Condition**       | Danh sách sản phẩm hiển thị kết quả phù hợp, và nhân viên có thể chọn sản phẩm. |

---

### **Use Case 3: Tạo hóa đơn**

| **Use Case Name**       | Tạo hóa đơn                             |
|-------------------------|-----------------------------------------|
| **Use Case ID**          | UC03                                   |
| **Use Case Description** | Nhân viên tạo hóa đơn cho khách hàng dựa trên các sản phẩm đã chọn. |
| **Actor**                | Nhân viên bán hàng                     |
| **Priority**             | Cao                                    |
| **Trigger**              | Nhân viên hoàn tất việc chọn sản phẩm và muốn tạo hóa đơn cho khách hàng. |
| **Pre-Condition**        | Nhân viên đã thêm sản phẩm vào giỏ hàng. |
| **Post-Condition**       | Hóa đơn được tạo thành công, sẵn sàng cho thanh toán. |

---

### **Use Case 4: Xử lý thanh toán**

| **Use Case Name**       | Xử lý thanh toán                        |
|-------------------------|-----------------------------------------|
| **Use Case ID**          | UC04                                   |
| **Use Case Description** | Nhân viên xử lý thanh toán cho hóa đơn qua các phương thức Momo, ZaloPay, hoặc ngân hàng. |
| **Actor**                | Nhân viên bán hàng                     |
| **Priority**             | Cao                                    |
| **Trigger**              | Nhân viên xác nhận hóa đơn đã hoàn tất và muốn tiến hành thanh toán. |
| **Pre-Condition**        | Hóa đơn đã được tạo thành công.        |
| **Post-Condition**       | Thanh toán thành công và hệ thống ghi nhận giao dịch. |

---

### **Use Case 5: Thêm sản phẩm vào hệ thống**

| **Use Case Name**       | Thêm sản phẩm vào hệ thống              |
|-------------------------|-----------------------------------------|
| **Use Case ID**          | UC05                                   |
| **Use Case Description** | Admin thêm sản phẩm mới vào hệ thống để quản lý danh mục sản phẩm. |
| **Actor**                | Admin                                  |
| **Priority**             | Trung bình                             |
| **Trigger**              | Admin muốn thêm một sản phẩm mới vào hệ thống. |
| **Pre-Condition**        | Admin đã đăng nhập và có quyền quản lý sản phẩm. |
| **Post-Condition**       | Sản phẩm mới được thêm thành công vào hệ thống và có thể hiển thị cho nhân viên bán hàng. |

---

### **Use Case 6: Xem báo cáo doanh thu**

| **Use Case Name**       | Xem báo cáo doanh thu                   |
|-------------------------|-----------------------------------------|
| **Use Case ID**          | UC06                                   |
| **Use Case Description** | Admin có thể xem báo cáo doanh thu theo các khoảng thời gian khác nhau như ngày/tuần/tháng/quý/năm. |
| **Actor**                | Admin                                  |
| **Priority**             | Trung bình                             |
| **Trigger**              | Admin muốn xem báo cáo doanh thu để phân tích hoạt động kinh doanh. |
| **Pre-Condition**        | Dữ liệu bán hàng đã được ghi nhận.     |
| **Post-Condition**       | Báo cáo doanh thu hiển thị thành công với các dữ liệu phân tích chi tiết. |

---

### **Use Case 7: Cập nhật tồn kho**

| **Use Case Name**       | Cập nhật tồn kho                        |
|-------------------------|-----------------------------------------|
| **Use Case ID**          | UC07                                   |
| **Use Case Description** | Admin hoặc nhân viên nhập hàng mới và cập nhật số lượng tồn kho của các sản phẩm trong hệ thống. |
| **Actor**                | Admin, Nhân viên bán hàng              |
| **Priority**             | Trung bình                             |
| **Trigger**              | Có sản phẩm mới nhập kho hoặc cần cập nhật số lượng. |
| **Pre-Condition**        | Sản phẩm tồn tại trong hệ thống và có số lượng tồn kho cũ. |
| **Post-Condition**       | Tồn kho được cập nhật thành công và có thể hiển thị cho nhân viên bán hàng. |

---

### **Use Case 8: Kiểm tra đơn thuốc**

| **Use Case Name**       | Kiểm tra đơn thuốc trước khi bán thuốc kê đơn |
|-------------------------|-----------------------------------------------|
| **Use Case ID**          | UC08                                          |
| **Use Case Description** | Nhân viên kiểm tra và xác thực đơn thuốc trước khi bán thuốc kê đơn cho khách hàng. |
| **Actor**                | Nhân viên bán hàng                            |
| **Priority**             | Cao                                           |
| **Trigger**              | Khách hàng muốn mua thuốc kê đơn và cung cấp đơn thuốc. |
| **Pre-Condition**        | Nhân viên đã nhận được đơn thuốc của khách hàng. |
| **Post-Condition**       | Đơn thuốc được xác thực thành công, và thuốc được bán cho khách hàng. |

---

### **Use Case 9: Xem danh sách sản phẩm bán chạy**

| **Use Case Name**       | Xem danh sách sản phẩm bán chạy            |
|-------------------------|--------------------------------------------|
| **Use Case ID**          | UC09                                       |
| **Use Case Description** | Admin xem danh sách các sản phẩm bán chạy nhất trong một khoảng thời gian nhất định. |
| **Actor**                | Admin                                      |
| **Priority**             | Thấp                                       |
| **Trigger**              | Admin muốn kiểm tra danh sách sản phẩm bán chạy để đánh giá hiệu quả kinh doanh. |
| **Pre-Condition**        | Dữ liệu bán hàng đã được ghi nhận và hệ thống có khả năng phân tích. |
| **Post-Condition**       | Danh sách sản phẩm bán chạy hiển thị đầy đủ và chính xác. |

---
