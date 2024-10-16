// controllers/productController.js
const ProductService = require('../services/productService');

class ProductController {
  // Thêm sản phẩm mới
  async addProduct(req, res) {
    try {
      const productData = req.body;  // Lấy dữ liệu từ request body
      const newProduct = await ProductService.addProduct(productData);  // Gọi service để thêm sản phẩm
      return res.status(201).json(newProduct);  // Trả về sản phẩm mới thêm
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Lấy chi tiết sản phẩm 
  async getProductById(req, res) {
    try {
      const productId = req.params.id;  // Lấy id sản phẩm từ request params
      const product = await ProductService.getProductById(productId);  // Gọi service để lấy chi tiết sản phẩm
      return res.status(200).json(product);  // Trả về sản phẩm
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Lấy danh sách sản phẩm
  async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

}

module.exports = new ProductController();
