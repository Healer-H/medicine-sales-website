const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.configs')

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    token: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false }, // passwordReset, verification, refreshToken
    expiration: { type: DataTypes.DATE, allowNull: false },
    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Đếm số lần nhập sai OTP
    },
  },
  {
    sequelize,
    modelName: 'Token',
    timestamps: true,
  },
)

module.exports = Token
