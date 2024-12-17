const ProductService = require('../services/product.service')
const HttpStatusCodes = require('../constants/httpStatusCodes')

// controllers/productController.js
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

  // Lấy danh sách sản phẩm với phân trang
  async getAllProducts(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 16
      const response = await ProductService.getAllProducts(page, limit)
      return res.status(HttpStatusCodes.OK).json(response.data)
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

  async searchProduct(req, res, next) {
    try {
      const query = req.query.q
      const response = await ProductService.searchProduct(query)
      if (!response.success) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: response.message })
      }
      return res.status(HttpStatusCodes.OK).json(response.products)
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

  // Import sản phẩm
  async importProducts(req, res, next) {
    try {
      const fileBuffer = req.file.buffer

      // Gọi service để xử lý import
      const response = await ProductService.importProducts(fileBuffer)

      if (response.errors.length > 0) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          success: false,
          message:
            'Một số sản phẩm không thể import được. Vui lòng kiểm tra lại.',
          errors: response.errors, // Danh sách lỗi
        })
      }

      res.status(HttpStatusCodes.OK).json({
        success: true,
        message: response.message,
        products: response.products,
      })
    } catch (error) {
      next(error)
    }
  }

  // Export sản phẩm
  async exportProducts(req, res, next) {
    try {
      const fileBuffer = await ProductService.exportProducts()
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      )
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="products.xlsx"',
      )
      res.status(HttpStatusCodes.OK).send(fileBuffer)
    } catch (error) {
      next(error)
    }
  }

  // Lấy danh sách sản phẩm bán chạy
  async getTopSellingProducts(req, res, next) {
    try {
      const { startDate, endDate } = req.query
      const response = await ProductService.getTopSellingProducts(
        startDate,
        endDate,
      )
      return res.status(HttpStatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  }

  // Lấy danh sách sản phẩm hết hạn
  async getExpiredProducts(req, res, next) {
    try {
      const products = await ProductService.getExpiredProducts()
      return res.status(HttpStatusCodes.OK).json(products)
    } catch (error) {
      next(error)
    }
  }

  // Lấy danh sách sản phẩm sắp hết hàng
  async getLowStockProducts(req, res, next) {
    try {
      const products = await ProductService.getLowStockProducts()
      return res.status(HttpStatusCodes.OK).json(products)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ProductController()
