require('dotenv').config()
const { Sequelize } = require('sequelize')

// Khởi tạo Sequelize với URI từ biến môi trường
const sequelize = new Sequelize(process.env.MYSQL_URI, {
    dialect: 'mysql', // Đảm bảo rằng bạn đang sử dụng đúng dialect
    logging: console.log, // Tắt logging nếu không cần thiết
})

// Hàm kết nối tới cơ sở dữ liệu
const databaseConnect = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected to MySQL')
    } catch (error) {
        console.error('Error connecting to MySQL:', error.message)
        process.exit(1)
    }
}

// Xuất cả các thành phần cần thiết
module.exports = { sequelize, databaseConnect }
