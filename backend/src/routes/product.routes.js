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
const upload = require('../middlewares/upload.middleware')

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
    'discount',
    'category',
    'status',
    'imageUrl',
  ]),
  validateProduct,
  ProductController.addProduct,
)

/**
 * @swagger
 * /products/import:
 *   post:
 *     tags:
 *       - Products
 *     summary: Import sản phẩm từ file Excel
 *     description: Upload file Excel để nhập dữ liệu sản phẩm vào hệ thống.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File Excel chứa dữ liệu sản phẩm.
 *     responses:
 *       200:
 *         description: Import thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Import thành công"
 *                 imported:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Sản phẩm A"
 *                       stock:
 *                         type: integer
 *                         example: 50
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: object
 *                         description: Dữ liệu sản phẩm lỗi
 *                       error:
 *                         type: string
 *                         description: Mô tả lỗi
 *       400:
 *         description: Lỗi do không có file upload hoặc file không hợp lệ.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vui lòng upload một file Excel"
 *       500:
 *         description: Lỗi hệ thống.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi import sản phẩm"
 */
router.post(
  Path.Product.Import,
  authorization,
  upload.single('file'),
  ProductController.importProducts,
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
 * /products/export:
 *   get:
 *     tags:
 *       - Products
 *     summary: Export danh sách sản phẩm ra file Excel
 *     description: Xuất toàn bộ sản phẩm trong hệ thống thành file Excel.
 *     responses:
 *       200:
 *         description: Xuất file thành công.
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Lỗi hệ thống khi export file.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lỗi export sản phẩm"
 */
router.get(Path.Product.Export, authorization, ProductController.exportProducts)

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
