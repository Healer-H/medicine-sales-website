const HttpStatusCodes = require('../constants/httpStatusCodes')

// controllers/productController.js
const ProductService = require('../services/product.service')

class ProductController {
  // Thêm sản phẩm mới
  async addProduct(req, res, next) {
    try {
      const productData = req.body // Lấy dữ liệu từ request body
      const newProduct = await ProductService.addProduct(productData) // Gọi service để thêm sản phẩm
      return res.status(HttpStatusCodes.CREATED).json(newProduct) // Trả về sản phẩm mới thêm
    } catch (error) {
      next(error)
    }
  }

  // Lấy chi tiết sản phẩm
  async getProductById(req, res, next) {
    try {
      const productId = req.params.id // Lấy id sản phẩm từ request params
      const product = await ProductService.getProductById(productId) // Gọi service để lấy chi tiết sản phẩm
      return res.status(HttpStatusCodes.OK).json(product) // Trả về sản phẩm
    } catch (error) {
      next(error)
    }
  }

  // Lấy danh sách sản phẩm
  async getAllProducts(req, res, next) {
    try {
      const products = await ProductService.getAllProducts()
      return res.status(HttpStatusCodes.OK).json(products)
    } catch (error) {
      next(error)
    }
  }

  // Cập nhật sản phẩm
  async updateProduct(req, res, next) {
    try {
      const productId = req.params.id
      const productData = req.body
      const response = await ProductService.updateProduct(
        productId,
        productData,
      )
      if (!response.success) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: response.message })
      }
      return res.status(HttpStatusCodes.OK).json(response.product)
    } catch (error) {
      next(error)
    }
  }

  // Xóa sản phẩm
  async deleteProduct(req, res, next) {
    try {
      const productId = req.params.id
      const response = await ProductService.deleteProduct(productId)
      if (!response.success) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: response.message })
      }
      return res.status(HttpStatusCodes.OK).json({ message: response.message }) // Trả về thông báo thành công
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ProductController()
