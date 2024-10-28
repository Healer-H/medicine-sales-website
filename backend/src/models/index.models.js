const { sequelize } = require('../config/database.configs')
const User = require('./user.model')
const Token = require('./token.model')

// Thiết lập quan hệ giữa các model đã được định nghĩa trong từng file riêng lẻ
// Nếu có quan hệ phức tạp hơn, có thể định nghĩa ở đây

// Thiết lập quan hệ với User

// Đồng bộ các model với cơ sở dữ liệu
const syncModels = async () => {
  await sequelize.sync({}) // Sử dụng { force: true } để xoá và tạo lại bảng / { alter: true } để chỉnh sửa bảng
  console.log('All models were synchronized successfully.')
}

module.exports = {
  User,
  Token,
  syncModels,
}
