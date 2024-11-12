const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.configs')
const Product = require('./product.model')
const Order = require('./order.model')

class OrderDetail extends Model {}

OrderDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      // ID của đơn hàng
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: 'id',
      },
      allowNull: false,
    },
    productId: {
      // ID của sản phẩm
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'product_Id',
      },
      allowNull: false,
    },
    quantity: {
      // Số lượng sản phẩm trong đơn hàng
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    unitPrice: {
      // Giá của mỗi đơn vị sản phẩm tại thời điểm thêm vào đơn hàng
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalPrice: {
      // Tổng giá cho từng sản phẩm trong đơn hàng (quantity * unitPrice)
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    discount: {
      // Giảm giá cho từng sản phẩm trong đơn hàng
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'OrderDetail',
    timestamps: true,
  },
)

module.exports = OrderDetail
