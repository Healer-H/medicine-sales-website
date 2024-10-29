const { sequelize } = require('../config/database.configs')
const User = require('./user.model')
const Token = require('./token.model')
const Product = require('./product.model')

// Thiết lập các mối quan hệ giữa các model
// Ví dụ: Product.belongsTo(User);
// User.hasMany(Product);

// Thiết lập quan hệ giữa các model đã được định nghĩa trong từng file riêng lẻ
// Nếu có quan hệ phức tạp hơn, có thể định nghĩa ở đây

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
  syncModels,
}

