// services/productService.js
const Product = require('../models/product.model')
const OrderDetail = require('../models/orderDetail.model')
const { sequelize } = require('../config/database.configs')
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

  // Lấy danh sách sản phẩm bán chạy
  async getTopSellingProducts(startDate, endDate) {
    try {
      const whereClause = {}
      if (startDate) whereClause.createdAt = { [Op.gte]: new Date(startDate) }
      if (endDate) whereClause.createdAt = { [Op.lte]: new Date(endDate) }

      const topSellingProducts = await OrderDetail.findAll({
        attributes: [
          'productId',
          [sequelize.fn('SUM', sequelize.col('quantity')), 'totalSold'],
          [sequelize.fn('SUM', sequelize.col('totalPrice')), 'totalRevenue'],
        ],
        // where: whereClause,
        group: ['productId'],
        include: [{ model: Product, attributes: ['name'] }],
        order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
      })

      return topSellingProducts.map(product => ({
        productId: product.productId,
        productName: product.Product.name,
        totalSold: product.dataValues.totalSold,
        totalRevenue: product.dataValues.totalRevenue,
      }))
    } catch (error) {
      throw new Error(
        'Error while retrieving top selling products: ' + error.message,
      )
    }
  }
}

module.exports = new ProductService()
