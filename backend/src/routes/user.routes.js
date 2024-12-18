const Router = require('express').Router()
const Path = require('../constants/paths')
const userControllers = require('../controllers/user.controllers')
const {
  authentication,
  authorization,
} = require('../middlewares/auth.middelwares')

const {
  validateLogin,
  validateCreateUser,
  validateForgotPassword,
  validateRequest,
  validateResetPassword,
} = require('../middlewares/validate.middlewares')

//Swagger documentation

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API cho xác thực người dùng
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email của người dùng
 *               password:
 *                 type: string
 *                 description: Mật khẩu của người dùng
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Đầu vào không hợp lệ
 *       401:
 *         description: Không được phép
 */

/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     summary: Yêu cầu đặt lại mật khẩu
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email của người dùng
 *     responses:
 *       200:
 *         description: Email đặt lại mật khẩu đã được gửi
 *       400:
 *         description: Đầu vào không hợp lệ
 */

/**
 * @swagger
 * /user/reset-password:
 *   patch:
 *     summary: Đặt lại mật khẩu
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email của người dùng
 *               otp:
 *                 type: string
 *                 description: Mã OTP đặt lại mật khẩu
 *               newPassword:
 *                 type: string
 *                 description: Mật khẩu mới
 *     responses:
 *       200:
 *         description: Đặt lại mật khẩu thành công
 *       400:
 *         description: Đầu vào không hợp lệ
 *       401:
 *         description: Không được phép hoặc mã OTP không hợp lệ
 */

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Đăng xuất người dùng
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *       400:
 *         description: Đầu vào không hợp lệ
 *       401:
 *         description: Không được phép hoặc mã OTP không hợp lệ
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: |
 *       API cho quản lý người dùng.
 *       Danh sách tài khoản test (Dùng tại khoản đăng nhập sau đó lấy access_token bỏ vào Authorize):
 *       - Email: uit.huynhminhhieu@gmail.com - password: password123 (admin)
 *       - Email: 22520359@gm.uit.edu.vn - password: password123 (admin)
 *       - Email: 22520653@gm.uit.edu.vn - password: password123 (admin)
 *       - Email: 22520491@gm.uit.edu.vn - password: password123 (admin)
 *       - Email: employee@gmail.com - password: password123 (employee)
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Liệt kê tất cả người dùng
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *       400:
 *         description: Đầu vào không hợp lệ
 *       401:
 *         description: Token chưa được cung cấp hoặc không có quyền truy cập
 */

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: Tạo người dùng mới
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               role:
 *                 type: string
 *                 exemple: employee
 *     responses:
 *       201:
 *         description: Người dùng đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       400:
 *         description: Đầu vào không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email đã tồn tại. Vui lòng sử dụng email khác
 *       500:
 *         description: Lỗi máy chủ nội bộ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đã xảy ra lỗi khi tạo người dùng
 */

/**
 * @swagger
 * /admin/user/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của người dùng
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của người dùng cần xóa
 *     responses:
 *       200:
 *         description: Thông tin chi tiết của người dùng đã được lấy thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       400:
 *         description: Đầu vào không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email đã tồn tại. Vui lòng sử dụng email khác
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi máy chủ nội bộ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đã xảy ra lỗi khi lấy thông tin người dùng
 */

/**
 * @swagger
 * /admin/user/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của người dùng cần xóa
 *     responses:
 *       200:
 *         description: Người dùng đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Người dùng đã được xóa thành công
 *       400:
 *         description: Đầu vào không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ID người dùng không hợp lệ
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Không tìm thấy người dùng
 *       500:
 *         description: Lỗi máy chủ nội bộ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đã xảy ra lỗi khi xóa người dùng
 */

/**
 * @swagger
 * /admin/user/{id}:
 *   put:
 *     summary: Cập nhật người dùng
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của người dùng cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Người dùng đã được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       400:
 *         description: Đầu vào không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thiếu thông trường thông tin cần thiết để sửa
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Người dùng không tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đã xảy ra lỗi khi cập nhật người dùng
 */

/**
 * @swagger
 * /admin/user/{id}:
 *   patch:
 *     summary: Thay thế người dùng
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của người dùng cần thay thế
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Người dùng đã được thay thế thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       400:
 *         description: Đầu vào không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thiếu thông trường thông tin cần thiết để sửa
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Người dùng không tồn tại
 *       500:
 *         description: Lỗi máy chủ nội bộ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đã xảy ra lỗi khi thay thế người dùng
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Xem thông tin cá nhân
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin cá nhân của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 12345
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       500:
 *         description: Lỗi máy chủ nội bộ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đã xảy ra lỗi khi lấy thông tin người dùng
 */

/**
 * @swagger
 * /admin/delete-all-users:
 *   delete:
 *     summary: Xóa tất cả người dùng
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tất cả người dùng đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tất cả người dùng đã được xóa thành công
 *       401:
 *         description: Người dùng chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token chưa được cung cấp.
 *       403:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bạn không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /admin/delete-multiple-users:
 *   delete:
 *     summary: Xóa nhiều người dùng
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             userIds:
 *              type: string
 *              example: [12345, 67890]
 *     responses:
 *       200:
 *         description: Người dùng đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Người dùng đã được xóa thành công
 *       401:
 *         description: Người dùng chưa đăng nhập
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token chưa được cung cấp.
 *       403:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bạn không có quyền truy cập
 *       500:
 *         description: Lỗi server
 */
Router.post(
  Path.User.Login,
  validateLogin,
  validateRequest,
  userControllers.login,
)
Router.post(
  Path.User.ForgotPassword,
  validateForgotPassword,
  validateRequest,
  userControllers.forgotPassword,
)
Router.patch(
  Path.User.ResetPassword,
  validateResetPassword,
  validateRequest,
  userControllers.resetPassword,
)
Router.post(Path.User.Logout, authentication, userControllers.logout)
Router.get(Path.User.GetProfile, authentication, userControllers.getProfile)

Router.use(authentication, authorization)
Router.get(Path.Admin.GetAllUser, userControllers.getAllUser)
Router.get(Path.Admin.DetailUser, userControllers.getUserDetail)
Router.post(
  Path.Admin.CreateUser,
  validateCreateUser,
  validateRequest,
  userControllers.createUser,
)
Router.delete(
  Path.Admin.DeleteMultipleUsers,
  userControllers.deleteMultipleUsers,
)
Router.delete(Path.Admin.DeleteAllUsers, userControllers.deleteAllUsers)
Router.delete(Path.Admin.DeleteUser, userControllers.deleteUser)
Router.put(Path.Admin.PutUser, userControllers.putUser)
Router.patch(Path.Admin.PatchUser, userControllers.patchUser)

module.exports = Router
