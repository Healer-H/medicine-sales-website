const Router = require('express').Router()
const Path = require('../constants/paths')
const orderControllers = require('../controllers/order.controllers')
const {
  authentication,
  authorization,
} = require('../middlewares/auth.middelwares')

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Quản lý hóa đơn
 */
/**
 * @swagger
 * /orders/add-product-to-order:
 *   post:
 *     summary: Thêm sản phẩm vào đơn hàng
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: ID của đơn hàng
 *                 example: 12345
 *               productId:
 *                 type: string
 *                 description: ID của sản phẩm
 *                 example: 67890
 *               quantity:
 *                 type: number
 *                 description: Số lượng sản phẩm
 *                 example: 2
 *     responses:
 *       201:
 *         description: Sản phẩm đã được thêm vào hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sản phẩm đã được thêm vào hóa đơn.
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
 *         description: Trạng thái sản phẩm không thể thêm vào đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sản phẩm đã hết hàng. || Hóa đơn đã được xuất. Không thể thêm sản phẩm.
 *       404:
 *         description: Không tìm thấy hóa đơn hoặc sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Không tìm thấy hóa đơn. || Không tìm thấy sản phẩm.
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /orders/create-order:
 *   post:
 *     summary: Tạo hóa đơn mới
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Hóa đơn đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn đã được tạo thành công.
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 12345
 *                     employeeId:
 *                       type: string
 *                       example: 67890
 *                     totalAmount:
 *                       type: number
 *                       example: 100000
 *                     statusExport:
 *                       type: boolean
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       example: 2021-09-30T10:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2021-09-30T10:00:00.000Z
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
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /orders/export-order/{id}:
 *   get:
 *     summary: In hóa đơn
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         description: ID của hóa đơn
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File pdf của hóa đơn
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
 *       404:
 *         description: Không tìm thấy hóa đơn
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Không tìm thấy hóa đơn.
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Cập nhật hóa đơn
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         description: ID của hóa đơn
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 description: Phương thức thanh toán
 *                 example: cash, credit_card, e-wallet
 *     responses:
 *       200:
 *         description: Hóa đơn đã được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn đã được cập nhật thành công.
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 12345
 *                     employeeId:
 *                       type: string
 *                       example: 67890
 *                     totalAmount:
 *                       type: number
 *                       example: 100000
 *                     statusExport:
 *                       type: boolean
 *                       example: false
 *                     paymentMethod:
 *                       type: string
 *                       example: cash
 *                     createdAt:
 *                       type: string
 *                       example: 2021-09-30T10:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2021-09-30T10:00:00.000Z
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
 *         description: Trạng thái sản hóa đơn không thể update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn đã được xuất. Không thể cập nhật.
 *       404:
 *         description: Hóa đơn không tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn không tồn tại.
 *       500:
 *         description: Lỗi server
 */

/**
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lấy danh sách hóa đơn
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách hóa đơn
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
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Xóa hóa đơn
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        description: ID của hóa đơn
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          example: 12345
 *     responses:
 *       200:
 *         description: Hóa đơn đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn đã được xóa thành công.
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
 *       404:
 *         description: Hóa đơn không tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn không tồn tại.
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /orders/delete-all-orders:
 *   delete:
 *     summary: Xóa tất cả hóa đơn
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tất cả hóa đơn đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn đã được xóa thành công.
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
 * /orders/delete-multiple-orders:
 *   delete:
 *     summary: Xóa một số hóa đơn
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             orderIds:
 *              type: string
 *              example: [12345, 67890]
 *     responses:
 *       200:
 *         description: Tất cả hóa đơn đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hóa đơn đã được xóa thành công.
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

Router.use(authentication)
Router.get(Path.Order.ExportOrder, orderControllers.exportOrder)
Router.patch(Path.Order.UpdateOrder, orderControllers.updateOrder)
Router.post(Path.Order.AddProductToOrder, orderControllers.addProductToOrder)
Router.post(Path.Order.CreateOrder, orderControllers.createOrder)
Router.get(Path.Order.GetAllOrders, orderControllers.getAllOrders)
Router.get(Path.Order.GetOrder, orderControllers.getOrder)
Router.delete(
  Path.Order.DeleteMultipleOrders,
  authorization,
  orderControllers.deleteMultipleOrders,
)
Router.delete(
  Path.Order.DeleteOrder,
  authorization,
  orderControllers.deleteOrder,
)
Router.delete(
  Path.Order.DeleteAllOrders,
  authorization,
  orderControllers.deleteAllOrders,
)

module.exports = Router
