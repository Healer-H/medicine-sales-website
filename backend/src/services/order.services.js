// services/OrderServices.js
const { Product, Order, OrderDetail } = require('../models/index.models')
const Messages = require('../constants/messages')

class OrderServices {
  async addProductToOrder(orderId, productId, quantity) {
    try {
      const product = await Product.findByPk(productId)
      const order = await Order.findByPk(orderId)
      if (!order) {
        return {
          success: false,
          message: Messages.ORDERS_MESSAGES.GET.NOT_FOUND,
        }
      }
      if (!product) {
        return {
          success: false,
          message: Messages.PRODUCTS_MESSAGES.GET.NOT_FOUND,
        }
      }
      const stock = product.getDataValue('stock')
      const price = product.getDataValue('price')
      if (quantity > stock) {
        return {
          success: false,
          message: Messages.ORDERS_MESSAGES.ADD_PRODUCT.OUT_OF_STOCK,
        }
      }

      const orderDetail = await OrderDetail.create({
        orderId,
        productId,
        quantity,
        unitPrice: price,
        totalPrice: price * quantity,
      })

      await Order.increment('totalAmount', {
        by: orderDetail.getDataValue('totalPrice'),
        where: { id: orderId },
      })

      await Product.decrement('stock', {
        by: quantity,
        where: { product_id: productId },
      })

      return {
        success: true,
        message: Messages.ORDERS_MESSAGES.ADD_PRODUCT.SUCCESS,
        orderDetail,
      }
    } catch (error) {
      throw new Error(`Add product to order service error: ${error}`)
    }
  }
}

module.exports = new OrderServices()
