const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.configs')
const User = require('./user.model')

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      // ID khách hàng (có thể là người mua hàng)
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    employeeId: {
      // ID nhân viên xử lý đơn hàng
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: false,
    },
    totalAmount: {
      // Tổng số tiền của đơn hàng
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    paymentMethod: {
      // Phương thức thanh toán (cash, credit_card, e-wallet)
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['cash', 'credit_card', 'e-wallet']],
      },
    },
    statusExport: {
      type: DataTypes.BOOLEAN,
      // Trạng thái đơn hàng (pending, completed)
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    timestamps: true,
  },
)

module.exports = Order
