const HttpStatusCodes = require('../constants/httpStatusCodes')
const orderServices = require('../services/order.services')

class OrderController {
  async addProductToOrder(req, res, next) {
    try {
      const { orderId, productId, quantity } = req.body
      const response = await orderServices.addProductToOrder(
        orderId,
        productId,
        quantity,
      )
      if (!response.success) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: response.message })
      }
      res
        .status(HttpStatusCodes.CREATED)
        .json({ message: response.message, orderDetail: response.orderDetail })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new OrderController()
