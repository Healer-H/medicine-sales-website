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
  validateTopSellingDates,
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
 * /products/top-selling:
 *   get:
 *     summary: Lấy danh sách sản phẩm bán chạy nhất
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm bán chạy nhất
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Danh sách sản phẩm bán chạy nhất."
 *                 topSellingProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         example: "12345"
 *                       productName:
 *                         type: string
 *                         example: "Product A"
 *                       totalSold:
 *                         type: integer
 *                         example: 1000
 *                       totalRevenue:
 *                         type: number
 *                         format: float
 *                         example: 500000
 *       400:
 *         description: Đầu vào không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: "Định dạng ngày không hợp lệ. Vui lòng sử dụng định dạng YYYY-MM-DD."
 *       401:
 *         description: Không có quyền truy cập
 *       500:
 *         description: Lỗi máy chủ
 */
router.get(
  Path.Product.TopSelling,
  validateTopSellingDates,
  ProductController.getTopSellingProducts,
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
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
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
 *       500:
 *         description: Lỗi khi lấy danh sách sản phẩm
 */
router.get(Path.Product.All, ProductController.getAllProducts)

/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Lấy danh sách sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Danh sách sản phẩm
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
 *       500:
 *         description: Lỗi khi lấy danh sách sản phẩm
 */
router.get(Path.Product.All, ProductController.getAllProducts)

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
