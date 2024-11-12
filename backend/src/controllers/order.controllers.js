const HttpStatusCodes = require('../constants/httpStatusCodes')
const orderServices = require('../services/order.services')

class OrderController {
  // [POST] orders/create-order
  async createOrder(req, res, next) {
    try {
      const employeeId = req.user.id
      const response = await orderServices.createOrder(employeeId)
      res
        .status(HttpStatusCodes.CREATED)
        .json({ message: response.message, order: response.order })
    } catch (error) {
      next(error)
    }
  }

  // [PUT] orders/:id
  async updateOrder(req, res, next) {
    try {
      const orderId = req.params.id
      const dataUpdate = req.body
      const response = await orderServices.updateOrder(orderId, dataUpdate)
      if (!response.success) {
        let status
        if (response.isNotFound) {
          status = HttpStatusCodes.NOT_FOUND
        }
        status = HttpStatusCodes.FORBIDDEN
        return res.status(status).json({ message: response.message })
      }
      res.status(HttpStatusCodes.OK).json({ message: response.message })
    } catch (error) {
      next(error)
    }
  }
  // [GET] orders/print-order/:id
  async exportOrder(req, res, next) {
    try {
      const orderId = req.params.id
      const response = await orderServices.exportOrder(orderId)
      if (!response.success) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({ message: response.message })
      }
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=order-${orderId}.pdf`,
      )
      res.setHeader('Content-Type', 'application/pdf')
      res.status(HttpStatusCodes.OK).send(response.orderPdf)
    } catch (error) {
      next(error)
    }
  }

  // [POST] orders/add-product-to-order
  async addProductToOrder(req, res, next) {
    try {
      const { orderId, productId, quantity } = req.body
      const response = await orderServices.addProductToOrder(
        orderId,
        productId,
        quantity,
      )
      if (!response.success) {
        let status
        if (response.isNotFound) {
          status = HttpStatusCodes.NOT_FOUND
        }
        status = HttpStatusCodes.FORBIDDEN
        return res.status(status).json({ message: response.message })
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
