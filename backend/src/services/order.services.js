// services/OrderServices.js
const { Product, Order, OrderDetail, User } = require('../models/index.models')
const Messages = require('../constants/messages')
const renderPDF = require('../utils/pdfRenderer')

class OrderServices {
  async createOrder(employeeId) {
    try {
      const order = await Order.create({ employeeId: employeeId })
      return {
        message: Messages.ORDERS_MESSAGES.CREATE.SUCCESS,
        order,
      }
    } catch (error) {
      throw new Error(`Create order service error: ${error}`)
    }
  }

  async updateOrder(orderId, dataUpdate) {
    try {
      const order = await Order.findByPk(orderId)
      if (!order) {
        return {
          success: false,
          isNotFound: true,
          message: Messages.ORDERS_MESSAGES.UPDATE.NOT_FOUND,
        }
      }
      const isStatusExport = order.getDataValue('statusExport')
      if (isStatusExport) {
        return {
          success: false,
          message: Messages.ORDERS_MESSAGES.UPDATE.EXPORTED,
        }
      }
      await order.update(dataUpdate)
      return {
        success: true,
        message: Messages.ORDERS_MESSAGES.UPDATE.SUCCESS,
      }
    } catch (error) {
      throw new Error(`Update order service error: ${error}`)
    }
  }

  async exportOrder(orderId) {
    try {
      const order = await Order.findOne({
        where: { id: orderId },
        include: {
          model: OrderDetail,
          include: Product,
        },
      })
      if (!order) {
        return {
          success: false,
          message: Messages.ORDERS_MESSAGES.GET.NOT_FOUND,
        }
      }
      // Cập nhật trạng thái đã xuất hóa đơn
      order.update({ statusExport: true })

      // Định dạng lại dữ liệu để phù hợp với template
      const employeeId = order.getDataValue('employeeId')
      const createdAt = order.getDataValue('createdAt')
      const totalAmount = order.getDataValue('totalAmount')
      const paymentMethod = order.getDataValue('paymentMethod')
      const orderDetails = order
        .getDataValue('OrderDetails')
        .map(orderDetail => {
          return {
            productId: orderDetail.getDataValue('productId'),
            productName: orderDetail.get('Product').getDataValue('name'),
            quantity: orderDetail.getDataValue('quantity'),
            unitPrice: orderDetail.getDataValue('unitPrice'),
            totalPrice: orderDetail.getDataValue('totalPrice'),
            discount: orderDetail.getDataValue('discount'),
            finalAmount:
              orderDetail.getDataValue('totalPrice') -
              orderDetail.getDataValue('discount'),
          }
        })
      const pharmacyBrand = 'VitalCare'
      const pharmacyAddress =
        'B1.14 Đại học công nghệ thông tin, Khu phố 6, P.Linh Trung, Q.Thủ Đức, TP.HCM'
      const orderData = {
        orderId,
        employeeId,
        createdAt,
        totalAmount,
        paymentMethod,
        orderDetails,
        pharmacyBrand,
        pharmacyAddress,
      }

      // Xuất file PDF
      const orderPdf = await renderPDF('order', orderData)
      return {
        success: true,
        message: Messages.ORDERS_MESSAGES.GET.SUCCESS,
        orderPdf,
      }
    } catch (error) {
      throw new Error(`Export order service error: ${error}`)
    }
  }

  async addProductToOrder(orderId, productId, quantity) {
    try {
      const product = await Product.findByPk(productId)
      const order = await Order.findByPk(orderId)
      if (!order) {
        return {
          success: false,
          isNotFound: true,
          message: Messages.ORDERS_MESSAGES.GET.NOT_FOUND,
        }
      }
      const isStatusExport = order.getDataValue('statusExport')
      if (isStatusExport) {
        return {
          success: false,
          message: Messages.ORDERS_MESSAGES.ADD_PRODUCT.EXPORTED,
        }
      }

      if (!product) {
        return {
          success: false,
          isNotFound: true,
          message: Messages.PRODUCTS_MESSAGES.GET.NOT_FOUND,
        }
      }
      const stock = product.getDataValue('stock')
      const price = product.getDataValue('price')
      const discount = product.getDataValue('discount')
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
        discount,
      })
      let totalPrice = orderDetail.getDataValue('totalPrice')

      if (discount > 0) {
        totalPrice = totalPrice - (totalPrice * discount) / 100
      }
      await Order.increment('totalAmount', {
        by: totalPrice,
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

  // async getAllOrders() {
  //   try {
  //     const orders = await Order.findAll({
  //       include: {
  //         model: OrderDetail,
  //         include: Product,
  //       },
  //     })
  //     return {
  //       message: Messages.ORDERS_MESSAGES.GET.SUCCESS,
  //       orders,
  //     }
  //   } catch (error) {
  //     throw new Error(`Get all orders service error: ${error}`)
  //   }
  // }
  async getAllOrders() {
    try {
      const orders = await Order.findAll({
        include: [
          {
            model: OrderDetail,
            include: Product,
          },
          {
            model: User,
            as: 'employee',
            attributes: ['id', 'name'],
          }
        ],
      });
      return {
        message: Messages.ORDERS_MESSAGES.GET.SUCCESS,
        orders,
      };
    } catch (error) {
      throw new Error(`Get all orders service error: ${error}`);
    }
  }

  async getOrder(orderId) {
    try {
      const order = await Order.findOne({
        where: { id: orderId },
        include: {
          model: OrderDetail,
          include: {
            model: Product,
            attributes: ['name', 'description', 'price'],
          },
        },
      })
      if (!order) {
        return {
          success: false,
          message: Messages.ORDERS_MESSAGES.GET.NOT_FOUND,
        }
      }
      const orderDetails = order.OrderDetails.map(orderDetail => ({
        name: orderDetail.Product.name,
        description: orderDetail.Product.description,
        unitPrice: orderDetail.Product.price,
        quantity: orderDetail.quantity,
        totalPrice: orderDetail.totalPrice,
      }))
      return {
        success: true,
        message: Messages.ORDERS_MESSAGES.GET.SUCCESS,
        order: {
          id: order.id,
          employeeId: order.employeeId,
          createdAt: order.createdAt,
          totalAmount: order.totalAmount,
          paymentMethod: order.paymentMethod,
          orderDetails,
        },
      }
    } catch (error) {
      throw new Error(`Get order service error: ${error}`)
    }
  }

  async deleteOrder(orderId) {
    try {
      const order = await Order.findByPk(orderId)
      if (!order) {
        return {
          success: false,
          message: Messages.ORDERS_MESSAGES.DELETE.NOT_FOUND,
        }
      }
      await OrderDetail.destroy({ where: { orderId } })
      await order.destroy()
      return {
        success: true,
        message: Messages.ORDERS_MESSAGES.DELETE.SUCCESS,
      }
    } catch (error) {
      throw new Error(`Delete order service error: ${error}`)
    }
  }

  async deleteMultipleOrders(orderIds) {
    try {
      await OrderDetail.destroy({ where: { id: orderIds } })
      await Order.destroy({ where: { id: orderIds } })
      return {
        success: true,
        message: Messages.ORDERS_MESSAGES.DELETE.SUCCESS,
      }
    } catch (error) {
      throw new Error(`Delete multiple orders service error: ${error}`)
    }
  }

  async deleteAllOrders() {
    try {
      await OrderDetail.destroy({ where: {} })
      await Order.destroy({ where: {} })
      return {
        success: true,
        message: Messages.ORDERS_MESSAGES.DELETE.SUCCESS,
      }
    } catch (error) {
      throw new Error(`Delete all orders service error: ${error}`)
    }
  }
}

module.exports = new OrderServices()
