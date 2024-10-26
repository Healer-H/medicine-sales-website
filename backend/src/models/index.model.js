const { sequelize } = require('../config/database.configs')

// Import các model
const Product = require('./product.model')
// Import các model khác nếu có
// const User = require('./user');
// const Order = require('./order');

// Thiết lập các mối quan hệ giữa các model
// Ví dụ: Product.belongsTo(User);
// User.hasMany(Product);

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
  sequelize,
  syncModels,
  Product
  // Export các model khác nếu có
  // User,
  // Order,
}
