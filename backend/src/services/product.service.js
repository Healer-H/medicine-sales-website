// services/productService.js
const Product = require('../models/product.model')
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
}

module.exports = new ProductService()
