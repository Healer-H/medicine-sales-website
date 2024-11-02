// services/productService.js
const Product = require('../models/product.model')
const Messages = require('../constants/messages')
const { Op } = require('sequelize')
class ProductService {
  // Thêm sản phẩm mới
  async addProduct(productData) {
    try {
      const newProduct = await Product.create(productData)
      return newProduct
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
  async getAllProducts() {
    try {
      const products = await Product.findAll()
      return products
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
}

module.exports = new ProductService()
