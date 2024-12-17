const { sequelize } = require('../config/database.configs')
const User = require('./user.model')
const Token = require('./token.model')
const Product = require('./product.model')
const Order = require('./order.model')
const OrderDetail = require('./orderDetail.model')

// Thiết lập các mối quan hệ giữa các model

// models/User.js
User.hasMany(Order, { foreignKey: 'employeeId' })

// models/Order.js
Order.hasMany(OrderDetail, { foreignKey: 'orderId' })
Order.belongsTo(User, {
  foreignKey: 'employeeId',
  as: 'employee'
});
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' })

// models/Product.js
Product.hasMany(OrderDetail, { foreignKey: 'productId' })
OrderDetail.belongsTo(Product, { foreignKey: 'productId' })

// Đồng bộ các model với cơ sở dữ liệu
const syncModels = async () => {
  try {
    await sequelize.sync({ force: false })
    console.log('All models were synchronized successfully.')
  } catch (error) {
    console.error('Error synchronizing models:', error.message)
  }
}

module.exports = {
  User,
  Token,
  Product,
  Order,
  OrderDetail,
  syncModels,
}
