const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const Path = require('../constants/paths');

// POST: Thêm sản phẩm mới
router.post(Path.Product.Add, ProductController.addProduct);

// GET: Lấy danh sách sản phẩm 
router.get(Path.Product.All, ProductController.getAllProducts);

// GET: Lấy chi tiết sản phẩm
router.get(Path.Product.Id, ProductController.getProductById);

module.exports = router;