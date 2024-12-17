const USERS_MESSAGES = {
  ADMIN: {
    USER: {
      CREATE: {
        SUCCESS: 'Người dùng đã được tạo thành công.',
        EMAIL_EXIST: 'Email đã tồn tại. Vui lòng sử dụng email khác',
      },
      UPDATE: {
        SUCCESS: 'Người dùng đã được cập nhật thành công.',
        EMAIL_EXIST: 'Email đã tồn tại.',
        NOT_FOUND: 'Người dùng không tồn tại.',
        REQUIRED_FIELDS: 'Thiếu thông trường thông tin cần thiết để sửa.',
      },
      DELETE: {
        SUCCESS: 'Người dùng đã được xóa thành công.',
        NOT_FOUND: 'Người dùng không tồn tại.',
      },
      GET: {
        SUCCESS: 'Danh sách người dùng.',
        NOT_FOUND: 'Không tìm thấy người dùng.',
      },
    },
  },
  LOGIN: {
    SUCCESS: 'Đăng nhập thành công.',
    UNAUTHORIZED: 'Email hoặc mật khẩu không đúng.',
    ACCOUNT_NOT_FOUND: 'Tài khoản không tồn tại.',
    ACCOUNT_NOT_VERIFIED: 'Tài khoản chưa xác thực.',
    ACCOUNT_LOCKED: 'Tài khoản đã bị khóa.',
  },
  LOGOUT: {
    SUCCESS: 'Đăng xuất thành công.',
    ERROR: 'Có lỗi xảy ra trong quá trình đăng xuất.',
    NOT_LOGGED_IN: 'Bạn chưa đăng nhập.',
  },
  FORGOT_PASSWORD: {
    SUCCESS: 'Mã OTP đã được gửi đến email',
    EMAIL_NOT_FOUND: 'Địa chỉ email không tồn tại.',
  },
  RESET_PASSWORD: {
    SUCCESS: 'Mật khẩu đã được đặt lại thành công.',
    PASSWORD_MISMATCH: 'Các mật khẩu không khớp.',
  },
  OTP: {
    SUCCESS: 'OTP hợp lệ.',
    INVALID: 'OTP không hợp lệ.',
    EXPIRED: 'OTP đã hết hạn. Vui lòng yêu câu lại OTP.',
    NOT_PROVIDED: 'OTP chưa được cung cấp.',
    UNAUTHORIZED: 'Bạn không có quyền truy cập.',
    TOO_MANY_ATTEMPTS:
      'Bạn đã nhập sai quá nhiều lần. Vui lòng yêu cầu lại OTP.',
  },
  TOKEN: {
    SUCCESS: 'Token hợp lệ.',
    INVALID: 'Token không hợp lệ.',
    EXPIRED: 'Token đã hết hạn.',
    NOT_PROVIDED: 'Token chưa được cung cấp.',
    UNAUTHORIZED: 'Bạn không có quyền truy cập.',
  },
}

const SERVERS_MESSAGES = {
  SERVER_ERROR: 'Server error',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  DATABASE_ERROR: 'Database error',
  UNPROCESSABLE_ENTITY: 'Unprocessable entity',
  NOT_FOUND: 'Not found',
  FORBIDDEN: 'Forbidden',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  UNAUTHORIZED: 'Unauthorized',
  TOO_MANY_REQUESTS: 'Too many requests',
  RATE_LIMITED: 'Rate limited',
  INVALID_TOKEN: 'Invalid token',
  EXPIRED_TOKEN: 'Expired token',
  SESSION_NOT_FOUND: 'Session not found',
  SESSION_INVALID: 'Session invalid',
  SESSION_EXPIRED: 'Session expired',
  SESSION_ALREADY_EXISTS: 'Session already exists',
  SESSION_NOT_ACTIVE: 'Session not active',
}

const PRODUCTS_MESSAGES = {
  ADD: {
    SUCCESS: 'Sản phẩm đã được thêm thành công.',
  },
  CREATE: {
    SUCCESS: 'Sản phẩm đã được tạo thành công.',
  },
  UPDATE: {
    SUCCESS: 'Sản phẩm đã được cập nhật thành công.',
    NOT_FOUND: 'Sản phẩm không tồn tại.',
  },
  DELETE: {
    SUCCESS: 'Sản phẩm đã được xóa thành công.',
    NOT_FOUND: 'Sản phẩm không tồn tại.',
  },
  GET: {
    SUCCESS: 'Danh sách sản phẩm.',
    NOT_FOUND: 'Không tìm thấy sản phẩm.',
  },
  IMPORT: {
    SUCCESS: 'Dữ liệu đã được nhập thành công.',
    INVALID_FILE: 'File không hợp lệ.',
    NO_FILE: 'Không có file để nhập. Vui lòng chọn file.',
  },
  EXPORT: {
    SUCCESS: 'Dữ liệu đã được xuất thành công.',
    NO_RESULTS: 'Không có dữ liệu để xuất.',
  },
  SEARCH: {
    SUCCESS: 'Danh sách sản phẩm tìm kiếm.',
    NO_RESULTS: 'Không tìm thấy sản phẩm phù hợp.',
  },
  TOP_SELLING: {
    SUCCESS: 'Danh sách sản phẩm bán chạy nhất.',
    INVALID_DATE_FORMAT:
      'Định dạng ngày không hợp lệ. Vui lòng sử dụng định dạng YYYY-MM-DD.',
    INVALID_DATE_RANGE: 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu.',
    DATE_RANGE_TOO_LARGE: 'Khoảng thời gian không được vượt quá 1 năm.',
    END_DATE_EXCEEDS_CURRENT: 'Ngày kết thúc không được lớn hơn ngày hiện tại.',
  },
}

const ORDERS_MESSAGES = {
  CREATE: {
    SUCCESS: 'Hóa đơn đã được tạo thành công.',
  },
  UPDATE: {
    SUCCESS: 'Hóa đơn đã được cập nhật thành công.',
    NOT_FOUND: 'Hóa đơn không tồn tại.',
    EXPORTED: 'Hóa đơn đã được xuất. Không thể cập nhật.',
  },
  DELETE: {
    SUCCESS: 'Hóa đơn đã được xóa thành công.',
    NOT_FOUND: 'Hóa đơn không tồn tại.',
  },
  GET: {
    SUCCESS: 'Danh sách hóa đơn.',
    NOT_FOUND: 'Không tìm thấy hóa đơn.',
  },
  SEARCH: {
    SUCCESS: 'Danh sách hóa đơn tìm kiếm.',
    NO_RESULTS: 'Không tìm thấy hóa đơn phù hợp.',
  },
  ADD_PRODUCT: {
    SUCCESS: 'Sản phẩm đã được thêm vào hóa đơn.',
    NOT_FOUND: 'Không tìm thấy hóa đơn hoặc sản phẩm.',
    MAX_QUANTITY_REACHED: 'Sản phẩm đã đạt số lượng tối đa.',
    ALREADY_ADDED: 'Sản phẩm đã được thêm vào hóa đơn trước đó.',
    OUT_OF_STOCK: 'Sản phẩm đã hết hàng.',
    EXPORTED: 'Hóa đơn đã được xuất. Không thể thêm sản phẩm.',
  },
}

const REPORTS_MESSAGES = {
  REPORTS_REVENUE: {
    NOT_REVENUE: 'Không có doanh thu ở khoảng thời gian này.',
    INVALID_TYPE: 'Loại báo cáo không hợp lệ.',
  },
}
module.exports = {
  USERS_MESSAGES,
  SERVERS_MESSAGES,
  PRODUCTS_MESSAGES,
  ORDERS_MESSAGES,
  REPORTS_MESSAGES,
}
