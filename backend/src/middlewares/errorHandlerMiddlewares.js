// middleware/errorHandler.js


const errorHandler = (err, req, res, next) => {
    console.error(err) // Log lỗi cho server
    const statusCode = err.statusCode || 500 // Mặc định 500 nếu không có statusCode
    const message = err.message || 'Đã xảy ra lỗi, vui lòng thử lại sau!'
    res.status(statusCode).json({ success: false, message })
}

module.exports = errorHandler
