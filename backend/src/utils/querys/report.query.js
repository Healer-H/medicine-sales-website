const { sequelize } = require('../../config/database.configs')
const { Op } = require('sequelize')
const { Order, OrderDetail, Product } = require('../../models/index.models')

class ReportQuery {
  async getRevenueData(start, end) {
    return await Order.findAll({
      where: {
        createdAt: {
          [Op.between]: [start, end],
        },
        statusExport: true,
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalRevenue'],
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'totalOrders'],
        [
          sequelize.fn('SUM', sequelize.col('OrderDetails.quantity')),
          'totalProductsSold',
        ],
      ],
      include: [
        {
          model: OrderDetail,
          attributes: [],
        },
      ],
      raw: true,
    })
  }

  async getPaymentMethodData(start, end) {
    return await Order.findAll({
      where: {
        createdAt: {
          [Op.between]: [start, end],
        },
        statusExport: true,
      },
      attributes: [
        'paymentMethod',
        [
          sequelize.fn('SUM', sequelize.col('totalAmount')),
          'revenueByPaymentMethod',
        ],
        [sequelize.fn('COUNT', sequelize.col('id')), 'ordersByPaymentMethod'],
      ],
      group: ['paymentMethod'],
      raw: true,
    })
  }

  async getTopSellingProducts(start, end) {
    return await OrderDetail.findAll({
      where: { createdAt: { [Op.between]: [start, end] } },
      attributes: [
        [sequelize.col('Product.name'), 'productName'],
        [sequelize.fn('SUM', sequelize.col('quantity')), 'quantitySold'],
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'productRevenue'],
      ],
      include: [
        {
          model: Product,
          attributes: ['name'],
        },
      ],
      group: ['productId', 'Product.name'],
      order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
      limit: 5,
      raw: true,
    })
  }

  async getDetailedTimeBreakdown(start, end, timeFormat) {
    return await Order.findAll({
      where: {
        createdAt: {
          [Op.between]: [start, end],
        },
        statusExport: true,
      },
      attributes: [
        [sequelize.literal(`DATE_FORMAT(createdAt, '${timeFormat}')`), 'date'],
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'revenue'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'orders'],
      ],
      group: ['date'],
      order: [['date', 'ASC']],
      raw: true,
    })
  }
}

module.exports = new ReportQuery()
