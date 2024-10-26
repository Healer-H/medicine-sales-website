const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product.controller')
const Path = require('../constants/paths')

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
router.post(Path.Product.Add, ProductController.addProduct)

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

module.exports = router
