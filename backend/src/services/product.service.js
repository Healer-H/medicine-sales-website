// services/productService.js
const Product = require('../models/product.model')
const OrderDetail = require('../models/orderDetail.model')
const { sequelize } = require('../config/database.configs')
const Messages = require('../constants/messages')
const { Op } = require('sequelize')
const { readExcelFile, createExcelFile } = require('../utils/excel')
const { validateProductData } = require('../middlewares/validate.middlewares')

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
  async getAllProducts(page = 1, limit = 12) {
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

    // Import sản phẩm từ file excel
  async importProducts(fileBuffer) {
    try {
      const errors = []
      const validProducts = []
      const columnMapping = [
        'name',
        'description',
        'price',
        'stock',
        'expiration_date',
        'prescription_required',
        'discount',
      ]

      const products = await readExcelFile(fileBuffer, columnMapping)

      // Validate từng sản phẩm
      products.forEach((product, index) => {
        const validationErrors = validateProductData(product)

        if (validationErrors.length > 0) {
          errors.push({ row: index + 2, errors: validationErrors }) // Row 2 là dòng đầu tiên chứa dữ liệu
        } else {
          Product.upsert(product)
          validProducts.push(product)
        }
      })

      return {
        message: Messages.PRODUCTS_MESSAGES.IMPORT.SUCCESS,
        validProducts,
        errors,
      }
    } catch (error) {
      throw new Error(`Error while importing products: ${error.message}`)
    }
  }

  // Export sản phẩm ra file excel
  async exportProducts() {
    try {
      const products = await Product.findAll({
        attributes: { exclude: ['prescription_required'] },
      })

      const columns = [
        { header: 'Name', key: 'name' },
        { header: 'Description', key: 'description' },
        { header: 'Price', key: 'price' },
        { header: 'Stock', key: 'stock' },
        { header: 'Expiration Date', key: 'expiration_date' },
        { header: 'Discount', key: 'discount' },
      ]

      return createExcelFile(
        products.map(p => p.toJSON()),
        columns,
      )
    } catch (error) {
      throw new Error(`Error while exporting products: ${error.message}`)
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
