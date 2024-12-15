const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product.controller')
const Path = require('../constants/paths')
const {
  authentication,
  authorization,
} = require('../middlewares/auth.middelwares')
const {
  validateProperties,
  validateProduct,
} = require('../middlewares/validate.middlewares')

router.use(authentication)

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for products in the system
 */

/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Thêm sản phẩm mới
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên sản phẩm
 *                 example: "Product Name"
 *               price:
 *                 type: number
 *                 description: Giá sản phẩm
 *                 example: 100
 *               description:
 *                 type: string
 *                 description: Mô tả sản phẩm
 *                 example: "Product Description"
 *               stock:
 *                 type: number
 *                 description: Số lượng sản phẩm
 *                 example: 100
 *               expiration_date:
 *                 type: string
 *                 format: date
 *                 description: Ngày hết hạn
 *               prescription_required:
 *                 type: boolean
 *                 description: Cần đơn thuốc
 *     responses:
 *       201:
 *         description: Sản phẩm mới đã được thêm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID của sản phẩm
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Tên sản phẩm
 *                   example: "Product Name"
 *                 price:
 *                   type: number
 *                   description: Giá sản phẩm
 *                   example: 100
 *                 description:
 *                   type: string
 *                   description: Mô tả sản phẩm
 *                   example: "Product Description"
 *       500:
 *         description: Lỗi khi thêm sản phẩm
 */
router.post(
  Path.Product.Add,
  validateProperties([
    'name',
    'price',
    'description',
    'stock',
    'expiration_date',
    'prescription_required',
  ]),
  validateProduct,
  ProductController.addProduct,
)

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Tìm kiếm sản phẩm
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Từ khóa tìm kiếm sản phẩm
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm tìm thấy
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 12345
 *                   name:
 *                     type: string
 *                     example: Sản phẩm A
 *                   price:
 *                     type: number
 *                     example: 100000
 *                   description:
 *                     type: string
 *                     example: Mô tả sản phẩm A
 *       400:
 *         description: Đầu vào không hợp lệ
 *       404:
 *         description: Không tìm thấy sản phẩm
 */
router.get(Path.Product.Search, ProductController.searchProduct)

/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Số lượng sản phẩm mỗi trang
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   description: Tổng số sản phẩm
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   description: Tổng số trang
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   description: Trang hiện tại
 *                   example: 1
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID của sản phẩm
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Tên sản phẩm
 *                         example: "Product Name"
 *                       price:
 *                         type: number
 *                         description: Giá sản phẩm
 *                         example: 100
 *                       description:
 *                         type: string
 *                         description: Mô tả sản phẩm
 *                         example: "Product Description"
 *       500:
 *         description: Lỗi khi lấy danh sách sản phẩm
 */
router.get(Path.Product.All, ProductController.getAllProducts)

/**
 * @swagger
 * /products/get-expired:
 *   get:
 *     summary: Lấy danh sách sản phẩm đã hết hạn
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm đã hết hạn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID của sản phẩm
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Tên sản phẩm
 *                     example: "Product Name"
 *                   price:
 *                     type: number
 *                     description: Giá sản phẩm
 *                     example: 100
 *                   description:
 *                     type: string
 *                     description: Mô tả sản phẩm
 *                     example: "Product Description"
 *       401:
 *         description: Người dùng chưa đăng nhập
 *       500:
 *         description: Lỗi khi lấy danh sách sản phẩm
 */
router.get(Path.Product.GetExpired, ProductController.getExpiredProducts)

/**
 * @swagger
 * /products/get-low-stock:
 *   get:
 *     summary: Lấy danh sách sản phẩm sắp hết hàng
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm sắp hết hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID của sản phẩm
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Tên sản phẩm
 *                     example: "Product Name"
 *                   price:
 *                     type: number
 *                     description: Giá sản phẩm
 *                     example: 100
 *                   description:
 *                     type: string
 *                     description: Mô tả sản phẩm
 *                     example: "Product Description"
 *       401:
 *         description: Người dùng chưa đăng nhập
 *       500:
 *         description: Lỗi khi lấy danh sách sản phẩm
 */
router.get(Path.Product.GetLowStock, ProductController.getLowStockProducts)

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Lấy chi tiết sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của sản phẩm
 *     responses:
 *       200:
 *         description: Chi tiết sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID của sản phẩm
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Tên sản phẩm
 *                   example: "Product Name"
 *                 price:
 *                   type: number
 *                   description: Giá sản phẩm
 *                   example: 100
 *                 description:
 *                   type: string
 *                   description: Mô tả sản phẩm
 *                   example: "Product Description"
 *       404:
 *         description: Không tìm thấy sản phẩm
 *       500:
 *         description: Lỗi khi lấy chi tiết sản phẩm
 */
router.get(Path.Product.Id, ProductController.getProductById)

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Cập nhật sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tên sản phẩm
 *                 example: "Product Name"
 *               price:
 *                 type: number
 *                 description: Giá sản phẩm
 *                 example: 100
 *               description:
 *                 type: string
 *                 description: Mô tả sản phẩm
 *                 example: "Product Description"
 *               stock:
 *                 type: number
 *                 description: Số lượng sản phẩm
 *                 example: 100
 *               expiration_date:
 *                 type: string
 *                 format: date
 *                 description: Ngày hết hạn
 *               prescription_required:
 *                 type: boolean
 *                 description: Cần đơn thuốc
 *     responses:
 *       200:
 *         description: Sản phẩm đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID của sản phẩm
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Tên sản phẩm
 *                   example: "Product Name"
 *                 price:
 *                   type: number
 *                   description: Giá sản phẩm
 *                   example: 100
 *                 description:
 *                   type: string
 *                   description: Mô tả sản phẩm
 *                   example: "Product Description"
 *       404:
 *         description: Không tìm thấy sản phẩm
 *       500:
 *         description: Lỗi khi cập nhật sản phẩm
 */
router.put(Path.Product.Update, authorization, ProductController.updateProduct)

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Xóa sản phẩm
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của sản phẩm
 *     responses:
 *       200:
 *         description: Sản phẩm đã được xóa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Thông báo thành công
 *                   example: "Product deleted successfully"
 *       404:
 *         description: Không tìm thấy sản phẩm
 *       500:
 *         description: Lỗi khi xóa sản phẩm
 */
router.delete(Path.Product.Id, authorization, ProductController.deleteProduct)

module.exports = router
