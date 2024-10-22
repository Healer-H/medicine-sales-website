
const USERS_MESSAGES = {
	EMAIL_ALREADY_EXISTS: 'Email đã tồn tại',
	EMAIL_MUST_BE_A_STRING: 'Email phải là một chuỗi',
	EMAIL_IS_REQUIRED: 'Email là bắt buộc',
	EMAIL_IS_INVALID: 'Email không hợp lệ',
	EMAIL_OR_PASSWORD_IS_INCORECT: 'Email hoặc mật khẩu không đúng',
	LOGIN_SUCCESS: 'Đăng nhập thành công',
	REGISTER_SUCCESS: 'Đăng ký thành công',
	USER_NOT_FOUND: 'Không tìm thấy người dùng',
	EMAIL_ALREADY_VERIFIED: 'Email đã được xác minh',
	EMAIL_VERIFY_SUCCESSED: 'Xác minh email thành công',
	FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Mã quên mật khẩu là bắt buộc',
	VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Xác minh mã quên mật khẩu thành công',
	FORGOT_PASSWORD_TOKEN_IS_INVALID: 'Mã quên mật khẩu không hợp lệ',
	RESET_PASSWORD_SUCCESS: 'Đặt lại mật khẩu thành công',
	USER_NOT_VERIFIED: 'Người dùng chưa được xác minh',
	UPDATE_USER_SUCCESS: 'Cập nhật người dùng thành công',
	USERNAME_MUST_BE_STRING: 'Tên người dùng phải là một chuỗi',
	GET_PROFILE_SUCCESS: 'Lấy thông tin cá nhân thành công',
	OLD_PASSWORD_NOT_MATCH: 'Mật khẩu cũ không khớp',
	CHANGE_PASSWORD_SUCCESS: 'Đổi mật khẩu thành công',
	EMAIL_NOT_VERIFIED: 'Email chưa được xác minh',
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

module.exports = {
	USERS_MESSAGES,
	SERVERS_MESSAGES
}

