const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.configs')

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
    totalAmount: {
      // Tổng số tiền của đơn hàng
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      // Trạng thái đơn hàng (pending, completed, cancelled)
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'completed', 'cancelled']],
      },
    },
    paymentMethod: {
      // Phương thức thanh toán (cash, credit_card, e-wallet)
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['cash', 'credit_card', 'e-wallet']],
      },
    },
    paymentStatus: {
      // Trạng thái thanh toán (unpaid, paid, refunded)
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unpaid',
      validate: {
        isIn: [['unpaid', 'paid', 'refunded']],
      },
    },
  },
  {
    sequelize,
    modelName: 'Order',
    timestamps: true,
  },
)

module.exports = Order
