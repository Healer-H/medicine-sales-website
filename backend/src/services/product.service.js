// services/productService.js
const Product = require('../models/product.model')
const Messages = require('../constants/messages')
const { Op } = require('sequelize')
class ProductService {
  // Thêm sản phẩm mới
  async addProduct(productData) {
    try {
      const newProduct = await Product.create(productData)
      return {
        success: true,
        message: Messages.PRODUCTS_MESSAGES.ADD.SUCCESS,
        product: newProduct,
      }
    } catch (error) {
      throw new Error('Error while adding product: ' + error.message)
    }
  }

  // Lấy chi tiết sản phẩm
  async getProductById(productId) {
    try {
      const product = await Product.findByPk(productId)
      if (!product) {
        return {
          success: false,
          message: Messages.PRODUCTS_MESSAGES.GET.NOT_FOUND,
        }
      }
      return product
    } catch (error) {
      throw new Error('Error while retrieving product: ' + error.message)
    }
  }

  // Lấy danh sách sản phẩm
  // Lấy danh sách sản phẩm với phân trang
  async getAllProducts(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit
      const { count, rows: products } = await Product.findAndCountAll({
        offset,
        limit,
      })
      return {
        success: true,
        data: {
          totalItems: count,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          products,
        },
      }
    } catch (error) {
      throw new Error('Error while retrieving products: ' + error.message)
    }
  }

  // Cập nhật sản phẩm
  async updateProduct(productId, productData) {
    try {
      const product = await Product.findByPk(productId)
      if (!product) {
        return {
          success: false,
          message: Messages.PRODUCTS_MESSAGES.UPDATE.NOT_FOUND,
        }
      }
      await product.update(productData)
      return {
        success: true,
        message: Messages.PRODUCTS_MESSAGES.UPDATE.SUCCESS,
        product,
      }
    } catch (error) {
      throw new Error('Error while updating product: ' + error.message)
    }
  }

  async searchProduct(query) {
    try {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.like]: `%${query}%`,
          },
        },
      })
      if (products.length === 0) {
        return {
          success: false,
          message: Messages.PRODUCTS_MESSAGES.SEARCH.NO_RESULTS,
        }
      }
      return {
        success: true,
        products,
      }
    } catch (error) {
      throw new Error('Error while searching product: ' + error.message)
    }
  }

  // Xóa sản phẩm
  async deleteProduct(productId) {
    try {
      const product = await Product.findByPk(productId)
      if (!product) {
        return {
          success: false,
          message: Messages.PRODUCTS_MESSAGES.DELETE.NOT_FOUND,
        }
      }
      await product.destroy()
      return {
        success: true,
        message: Messages.PRODUCTS_MESSAGES.DELETE.SUCCESS,
      }
    } catch (error) {
      throw new Error('Error while deleting product: ' + error.message)
    }
  }

  // Lấy danh sách sản phẩm hết hạn
  async getExpiredProducts() {
    try {
      const products = await Product.findAll({
        where: {
          expiration_date: {
            [Op.lt]: new Date(),
          },
        },
      })
      return products
    } catch (error) {
      throw new Error(
        'Error while retrieving expired products: ' + error.message,
      )
    }
  }

  // Lấy danh sách sản phẩm sắp hết hàng
  async getLowStockProducts() {
    try {
      const products = await Product.findAll({
        where: {
          stock: {
            [Op.lt]: 10,
          },
        },
      })
      return products
    } catch (error) {
      throw new Error(
        'Error while retrieving low stock products: ' + error.message,
      )
    }
  }
}

module.exports = new ProductService()
