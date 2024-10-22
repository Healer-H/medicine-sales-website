const EnvVars = require('../constants/envVars')
const { Sequelize } = require('sequelize')


// Khởi tạo Sequelize với URI từ biến môi trường
const sequelize = new Sequelize(EnvVars.Mysql.ConnectionString, {
    dialect: 'mysql', // Đảm bảo rằng bạn đang sử dụng đúng dialect
    logging: false, // Tắt logging nếu không cần thiết
})


// Hàm kết nối tới cơ sở dữ liệu
const databaseConnect = async (app) => {
    try {
        await sequelize.authenticate()
        console.log('Connected to MySQL')
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message)
        process.exit(1)
    }
}

module.exports = { sequelize, databaseConnect }