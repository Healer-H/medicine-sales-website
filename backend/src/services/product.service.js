// services/productService.js
const Product = require('../models/product.model')

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
        throw new Error('Product not found')
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
}

module.exports = new ProductService()
