const Router = require('express').Router()
const Path = require('../constants/paths')
const orderControllers = require('../controllers/order.controllers')
const { authentication } = require('../middlewares/auth.middelwares')

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
 *       200:
 *         description: Sản phẩm đã được thêm vào đơn hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sản phẩm đã được thêm vào đơn hàng thành công
 *       400:
 *         description: Đầu vào không hợp lệ
 *       404:
 *         description: Không tìm thấy đơn hàng hoặc sản phẩm
 *       500:
 *         description: Lỗi server
 */

Router.use(authentication)
Router.post(Path.Order.AddProductToOrder, orderControllers.addProductToOrder)

module.exports = Router
